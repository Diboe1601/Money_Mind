import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MetricCard } from "@/components/ui/metric-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { ExpenseBreakdown } from "@/components/charts/expense-breakdown";
import { RecentTransactions } from "@/components/recent-transactions";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users,
  Plus,
  Download,
  Eye
} from "lucide-react";

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
              Welcome back, Alex! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your finances today.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Revenue"
              value="$67,489"
              change={{ value: "+12.3%", type: "increase" }}
              icon={<DollarSign className="h-4 w-4" />}
            />
            <MetricCard
              title="Total Expenses"
              value="$45,230"
              change={{ value: "+8.1%", type: "increase" }}
              icon={<TrendingDown className="h-4 w-4" />}
            />
            <MetricCard
              title="Net Profit"
              value="$22,259"
              change={{ value: "+18.7%", type: "increase" }}
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <MetricCard
              title="Active Clients"
              value="1,249"
              change={{ value: "+5.4%", type: "increase" }}
              icon={<Users className="h-4 w-4" />}
            />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button className="bg-gradient-primary hover:bg-primary-hover shadow-elevated">
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
            <Button variant="success">
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RevenueChart />
            <ExpenseBreakdown />
          </div>

          {/* Recent Transactions */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <RecentTransactions />
            </div>
            
            {/* Financial Summary */}
            <div className="space-y-6">
              <div className="bg-gradient-card rounded-lg p-6 shadow-card">
                <h3 className="font-semibold font-heading text-lg mb-4">Monthly Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Income this month</span>
                    <span className="font-semibold text-success">$67,489</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Expenses this month</span>
                    <span className="font-semibold text-danger">$45,230</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Net Profit</span>
                      <span className="font-bold text-success text-lg">$22,259</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-card rounded-lg p-6 shadow-card">
                <h3 className="font-semibold font-heading text-lg mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Avg. Transaction</span>
                    <span className="font-semibold">$1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Pending Invoices</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Overdue Payments</span>
                    <span className="font-semibold text-warning">5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
