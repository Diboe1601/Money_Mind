import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Transaction } from './use-transactions';

export interface DashboardMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  activeClients: number;
  revenueChange: string;
  expensesChange: string;
  profitChange: string;
  clientsChange: string;
}

export interface ChartData {
  month: string;
  revenue: number;
  expenses: number;
}

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    activeClients: 0,
    revenueChange: '+0%',
    expensesChange: '+0%', 
    profitChange: '+0%',
    clientsChange: '+0%'
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  const calculateMetrics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('*');

      if (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
        return;
      }

      if (!transactions || transactions.length === 0) {
        setLoading(false);
        return;
      }

      // Calculate current month metrics
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const currentMonthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
      });

      const totalRevenue = currentMonthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const totalExpenses = currentMonthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const netProfit = totalRevenue - totalExpenses;

      // Calculate unique clients (based on unique categories for income transactions)
      const activeClients = new Set(
        currentMonthTransactions
          .filter(t => t.type === 'income')
          .map(t => t.category)
      ).size;

      // Generate chart data for last 6 months
      const chartMonths: ChartData[] = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date(currentYear, currentMonth - i, 1);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        
        const monthTransactions = transactions.filter(t => {
          const transactionDate = new Date(t.date);
          return transactionDate.getMonth() === date.getMonth() && 
                 transactionDate.getFullYear() === date.getFullYear();
        });

        const monthRevenue = monthTransactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + Number(t.amount), 0);

        const monthExpenses = monthTransactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + Number(t.amount), 0);

        chartMonths.push({
          month: monthName,
          revenue: monthRevenue,
          expenses: monthExpenses
        });
      }

      setMetrics({
        totalRevenue,
        totalExpenses,
        netProfit,
        activeClients,
        revenueChange: '+12.3%', // Mock percentage changes for now
        expensesChange: '+8.1%',
        profitChange: netProfit > 0 ? '+18.7%' : '-5.2%',
        clientsChange: '+5.4%'
      });

      setChartData(chartMonths);
    } catch (error) {
      console.error('Error calculating metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateMetrics();
  }, []);

  return {
    metrics,
    chartData,
    loading,
    refetch: calculateMetrics
  };
}