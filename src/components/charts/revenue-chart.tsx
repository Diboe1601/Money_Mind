import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/hooks/use-transactions";
import { useMemo } from "react";

// Props interface
interface RevenueChartProps {
  transactions?: Transaction[];
}

// Chart data interface
interface ChartData {
  month: string;
  revenue: number;
  expenses: number;
}

export function RevenueChart({ transactions }: RevenueChartProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="font-heading">Revenue vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[300px]" />
        </CardContent>
      </Card>
    );
  }

  const chartData: ChartData[] = useMemo(() => {
    const grouped: Record<string, { revenue: number; expenses: number }> = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).toLocaleString("default", { month: "short" });
      if (!grouped[month]) grouped[month] = { revenue: 0, expenses: 0 };
      if (t.type === "income") grouped[month].revenue += Number(t.amount);
      else if (t.type === "expense") grouped[month].expenses += Number(t.amount);
    });

    return Object.entries(grouped).map(([month, values]) => ({
      month,
      revenue: values.revenue,
      expenses: values.expenses,
    }));
  }, [transactions]);

  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = chartData.reduce((sum, item) => sum + item.expenses, 0);

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader className="flex flex-col gap-3">
        <CardTitle className="font-heading">Revenue vs Expenses</CardTitle>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[hsl(var(--primary))] flex-shrink-0" />
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              Revenue: <span className="text-foreground font-semibold">${totalRevenue.toLocaleString()}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[hsl(var(--danger))] flex-shrink-0" />
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              Expenses: <span className="text-foreground font-semibold">${totalExpenses.toLocaleString()}</span>
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ left: -10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={10}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              name="Revenue"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="hsl(var(--danger))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--danger))", strokeWidth: 2, r: 4 }}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

