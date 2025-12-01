import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useTransactions } from "@/hooks/use-transactions";
import { useMemo } from "react";

const colors = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))", 
  "hsl(var(--warning))",
  "hsl(var(--danger))",
  "hsl(var(--muted-foreground))"
];

export function ExpenseBreakdown() {
  const { transactions } = useTransactions();

  const expenseData = useMemo(() => {
    // Get all expense transactions
    const expenses = transactions.filter(t => t.type === 'expense');
    
    if (expenses.length === 0) {
      return [];
    }

    // Group by category and sum amounts
    const categoryTotals = expenses.reduce((acc, transaction) => {
      const category = transaction.category || 'Other';
      acc[category] = (acc[category] || 0) + Number(transaction.amount);
      return acc;
    }, {} as Record<string, number>);

    // Convert to chart data format
    const data = Object.entries(categoryTotals)
      .map(([name, value], index) => ({
        name,
        value: Number(value.toFixed(2)),
        color: colors[index % colors.length]
      }))
      .sort((a, b) => b.value - a.value); // Sort by value descending

    return data;
  }, [transactions]);

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="font-heading">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        {expenseData.length === 0 ? (
          <div className="h-[250px] sm:h-[300px] flex items-center justify-center text-muted-foreground text-sm">
            No expense data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => {
                  const isMobile = window.innerWidth < 640;
                  return isMobile ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`;
                }}
                labelLine={false}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}