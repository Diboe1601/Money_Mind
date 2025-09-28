import { useState, useEffect } from "react";
import { useTransactions } from "./use-transactions";

interface QuickStats {
  avgTransaction: number;
  pendingInvoices: number;
  overduePayments: number;
}

export function useQuickStats() {
  const { transactions, loading } = useTransactions();
  const [stats, setStats] = useState<QuickStats>({
    avgTransaction: 0,
    pendingInvoices: 0,
    overduePayments: 0
  });

  useEffect(() => {
    if (transactions.length === 0) return;

    // Calculate average transaction amount
    const totalAmount = transactions.reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);
    const avgTransaction = totalAmount / transactions.length;

    // Count pending transactions
    const pendingInvoices = transactions.filter(t => t.status === 'pending').length;

    // Count overdue payments (transactions older than 30 days and still pending)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const overduePayments = transactions.filter(t => 
      t.status === 'pending' && new Date(t.date) < thirtyDaysAgo
    ).length;

    setStats({
      avgTransaction: Number(avgTransaction.toFixed(2)),
      pendingInvoices,
      overduePayments
    });
  }, [transactions]);

  return { stats, loading };
}