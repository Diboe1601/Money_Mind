import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Receipt, 
  TrendingUp, 
  FileText, 
  Users, 
  Settings,
  CreditCard,
  PieChart,
  Calendar,
  Target
} from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/", current: true },
  { name: "Transactions", icon: Receipt, href: "/transactions", current: false },
  { name: "Analytics", icon: TrendingUp, href: "/analytics", current: false },
  { name: "Reports", icon: FileText, href: "/reports", current: false },
  { name: "Budgets", icon: Target, href: "/budgets", current: false },
  { name: "Invoices", icon: CreditCard, href: "/invoices", current: false },
  { name: "Clients", icon: Users, href: "/clients", current: false },
  { name: "Calendar", icon: Calendar, href: "/calendar", current: false },
];

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-card border-r border-border">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-4 space-y-1">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant={item.current ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-11",
                item.current 
                  ? "bg-gradient-primary text-primary-foreground shadow-glow" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
        
        <div className="mt-auto px-4">
          <div className="bg-gradient-card rounded-lg p-4 shadow-card">
            <div className="flex items-center">
              <PieChart className="h-6 w-6 text-primary mr-3" />
              <div>
                <p className="text-sm font-medium">Financial Health</p>
                <p className="text-xs text-muted-foreground">85% Good</p>
              </div>
            </div>
            <div className="mt-3 bg-muted rounded-full h-2">
              <div className="bg-gradient-success h-2 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>
          
          <Button variant="ghost" className="w-full justify-start mt-4 text-muted-foreground">
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}