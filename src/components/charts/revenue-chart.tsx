import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { Skeleton } from "@/components/ui/skeleton";

export function RevenueChart() {
  const { chartData, loading } = useDashboardMetrics();

  if (loading) {
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
  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="font-heading">Revenue vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
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