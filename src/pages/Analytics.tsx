import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Analytics.tsx
import { RevenueChart } from "@/components/charts/revenue-chart"; // ✅ named import

import { ExpenseBreakdown } from "@/components/charts/expense-breakdown";
import { useTransactions } from "@/hooks/use-transactions";


const Analytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { transactions, loading } = useTransactions();

  // Generate chartData directly from transactions (real-time)
  const chartData = useMemo(() => {
    if (transactions.length === 0) return [];

    const grouped = transactions.reduce((acc: Record<string, { revenue: number; expenses: number }>, t) => {
      const month = new Date(t.date).toLocaleString("default", { month: "short" });

      if (!acc[month]) acc[month] = { revenue: 0, expenses: 0 };
      if (t.type === "income") acc[month].revenue += Number(t.amount);
      else if (t.type === "expense") acc[month].expenses += Number(t.amount);

      return acc;
    }, {});

    return Object.entries(grouped).map(([month, values]) => ({
      month,
      revenue: values.revenue,
      expenses: values.expenses,
    }));
  }, [transactions]);

  // Compute totals
  const totalRevenue = useMemo(
    () => chartData.reduce((sum, item) => sum + item.revenue, 0),
    [chartData]
  );
  const totalExpenses = useMemo(
    () => chartData.reduce((sum, item) => sum + item.expenses, 0),
    [chartData]
  );
  const netProfit = totalRevenue - totalExpenses;

  const totalExpensesFromTransactions = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    [transactions]
  );

  const feedbackMessage = useMemo(() => {
    if (loading) return "Loading real-time analytics...";
    if (transactions.length === 0) return "No analytics data available yet.";
    if (netProfit > 0)
      return `Good job! You have a net profit of $${netProfit.toLocaleString()}.`;
    if (netProfit < 0)
      return `Alert: You are running at a net loss of $${Math.abs(
        netProfit
      ).toLocaleString()}. Consider reducing expenses.`;
    return "Your revenue and expenses are balanced. Monitor trends for improvement.";
  }, [netProfit, transactions, loading]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Insights and trends from your financial data (live updates)
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Pass real-time data to chart */}
                <RevenueChart transactions={transactions} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Category-wise spending analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseBreakdown transactions={transactions} />
              </CardContent>
            </Card>
          </div>

          {/* Feedback Section */}
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>Real-time insights based on your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Total Revenue: ${totalRevenue.toLocaleString()}</p>
              <p>Total Expenses (from analytics): ${totalExpenses.toLocaleString()}</p>
              <p>
                Total Expenses (from transactions): $
                {totalExpensesFromTransactions.toLocaleString()}
              </p>
              <p>Net Profit: ${netProfit.toLocaleString()}</p>
              <p className="font-medium">{feedbackMessage}</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
