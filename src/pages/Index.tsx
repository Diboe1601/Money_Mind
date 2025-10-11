import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MetricCard } from "@/components/ui/metric-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { ExpenseBreakdown } from "@/components/charts/expense-breakdown";
import { RecentTransactions } from "@/components/recent-transactions";
import { Button } from "@/components/ui/button";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { useQuickStats } from "@/hooks/use-quick-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { AddTransactionForm } from "@/components/forms/add-transaction-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BlurText from "@/components/ui/blur-text";
import MagicBento from "@/components/ui/magic-bento";
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const { metrics, loading } = useDashboardMetrics();
  const { stats, loading: statsLoading } = useQuickStats();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('user_id', user.id)
          .single();
        
        if (profile?.first_name && profile?.last_name) {
          setUserName(`${profile.first_name} ${profile.last_name}`);
        } else if (profile?.first_name) {
          setUserName(profile.first_name);
        }
      }
    };
    
    fetchUserProfile();
  }, []);

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export will be ready shortly.",
    });
  };

  const handleViewReports = () => {
    navigate("/reports");
  };

  return (
    <div className="flex h-screen bg-gradient-dark">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <BlurText
              text={`Welcome back${userName ? `, ${userName}` : ''}! 👋`}
              delay={150}
              animateBy="words"
              direction="top"
              className="text-3xl font-bold font-heading text-foreground mb-2"
            />
            <p className="text-muted-foreground">
              Here's what's happening with your finances today.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {loading ? (
              <>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gradient-card rounded-lg p-6 shadow-card">
                    <div className="flex items-center justify-between mb-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-4" />
                    </div>
                    <Skeleton className="h-8 w-20 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
              </>
            ) : (
              <>
                <MetricCard
                  title="Total Revenue"
                  value={`$${metrics.totalRevenue.toLocaleString()}`}
                  change={{ value: metrics.revenueChange, type: "increase" }}
                  icon={<DollarSign className="h-4 w-4" />}
                />
                <MetricCard
                  title="Total Expenses"
                  value={`$${metrics.totalExpenses.toLocaleString()}`}
                  change={{ value: metrics.expensesChange, type: "increase" }}
                  icon={<TrendingDown className="h-4 w-4" />}
                />
                <MetricCard
                  title="Net Profit"
                  value={`$${metrics.netProfit.toLocaleString()}`}
                  change={{ 
                    value: metrics.profitChange, 
                    type: metrics.netProfit >= 0 ? "increase" : "decrease" 
                  }}
                  icon={<TrendingUp className="h-4 w-4" />}
                />
                <MetricCard
                  title="Active Clients"
                  value={metrics.activeClients.toString()}
                  change={{ value: metrics.clientsChange, type: "increase" }}
                  icon={<Users className="h-4 w-4" />}
                />
              </>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <AddTransactionForm />
            <Button variant="outline" onClick={() => navigate("/invoices")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline" onClick={handleViewReports}>
              <Eye className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>

          {/* Magic Bento Grid */}
          <div className="mb-8 flex justify-center">
            <MagicBento 
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="132, 0, 255"
            />
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
                    <span className="font-semibold text-success">
                      ${loading ? '0' : metrics.totalRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Expenses this month</span>
                    <span className="font-semibold text-danger">
                      ${loading ? '0' : metrics.totalExpenses.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Net Profit</span>
                      <span className={`font-bold text-lg ${
                        metrics.netProfit >= 0 ? 'text-success' : 'text-danger'
                      }`}>
                        ${loading ? '0' : metrics.netProfit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-card rounded-lg p-6 shadow-card">
                <h3 className="font-semibold font-heading text-lg mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Avg. Transaction</span>
                    <span className="font-semibold">
                      ${statsLoading ? '0' : stats.avgTransaction.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Pending Invoices</span>
                    <span className="font-semibold">
                      {statsLoading ? '0' : stats.pendingInvoices}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Overdue Payments</span>
                    <span className="font-semibold text-warning">
                      {statsLoading ? '0' : stats.overduePayments}
                    </span>
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