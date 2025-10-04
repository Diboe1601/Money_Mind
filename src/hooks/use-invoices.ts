import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Invoice {
  id: string;
  user_id: string;
  invoice_number: string;
  client_name: string;
  amount: number;
  description: string | null;
  due_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("No user found");
      }

      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setInvoices(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching invoices",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addInvoice = async (invoice: Omit<Invoice, "id" | "user_id" | "created_at" | "updated_at">) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("No user found");
      }

      const { data, error } = await supabase
        .from("invoices")
        .insert([{ ...invoice, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setInvoices([data, ...invoices]);
      toast({
        title: "Success",
        description: "Invoice created successfully",
      });
      return data;
    } catch (error: any) {
      toast({
        title: "Error creating invoice",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchInvoices();

    // Set up real-time subscription
    const channel = supabase
      .channel('invoices-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'invoices'
        },
        () => {
          fetchInvoices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { invoices, loading, addInvoice, refetch: fetchInvoices };
};
