import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, change, icon, className }: MetricCardProps) {
  const getTrendIcon = () => {
    if (!change) return null;
    
    switch (change.type) {
      case "increase":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "decrease":
        return <TrendingDown className="h-4 w-4 text-danger" />;
      case "neutral":
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getChangeColor = () => {
    if (!change) return "";
    
    switch (change.type) {
      case "increase":
        return "text-success";
      case "decrease":
        return "text-danger";
      case "neutral":
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn("bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-heading">{value}</div>
        {change && (
          <div className={cn("flex items-center text-xs mt-1", getChangeColor())}>
            {getTrendIcon()}
            <span className="ml-1">{change.value} from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}