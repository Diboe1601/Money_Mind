import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  status: 'completed' | 'pending' | 'cancelled';
  date: string;
  created_at: string;
  updated_at: string;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
        toast({
          title: "Error",
          description: "Failed to fetch transactions",
          variant: "destructive"
        });
        return;
      }

      setTransactions((data as Transaction[]) || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error", 
        description: "Failed to fetch transactions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to add transactions",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('transactions')
        .insert([{ ...transaction, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Error adding transaction:', error);
        toast({
          title: "Error",
          description: "Failed to add transaction",
          variant: "destructive"
        });
        return;
      }

      setTransactions(prev => [data as Transaction, ...prev]);
      toast({
        title: "Success",
        description: "Transaction added successfully"
      });
      // Add notification entry
      try {
        await supabase.from('notifications').insert([{ 
          user_id: user.id,
          title: 'Transaction added',
          description: `${transaction.type === 'income' ? 'Income' : 'Expense'}: ${transaction.description} ($${transaction.amount.toLocaleString()})`,
          type: 'success',
          read: false,
          action_label: 'View Transactions',
          action_href: '/dashboard/transactions'
        }]);
      } catch (e) {
        console.error('Error adding notification:', e);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to add transaction", 
        variant: "destructive"
      });
    }
  };

  // NEW: Update transaction status and notify on completion
  const updateTransactionStatus = async (id: string, status: Transaction['status']) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('transactions')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTransactions(prev => prev.map(t => t.id === id ? (data as Transaction) : t));

      toast({
        title: 'Transaction updated',
        description: `Status set to ${status}`
      });

      // If status changed to completed, insert a notification
      if (status === 'completed' && user) {
        try {
          await supabase.from('notifications').insert([{ 
            user_id: user.id,
            title: 'Transaction completed',
            description: `${(data as Transaction).description} marked as completed ($${(data as Transaction).amount.toLocaleString()})`,
            type: 'success',
            read: false,
            action_label: 'View Transactions',
            action_href: '/dashboard/transactions'
          }]);
        } catch (e) {
          console.error('Error adding notification:', e);
        }
      }
    } catch (error: any) {
      console.error('Error updating transaction status:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update transaction status',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    transactions,
    loading,
    addTransaction,
    updateTransactionStatus,
    refetch: fetchTransactions
  };
}