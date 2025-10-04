import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, TrendingUp, Loader2 } from "lucide-react";
import { useTransactions } from "@/hooks/use-transactions";
import { generateMonthlyFinancialReport, generateTaxSummary, generatePerformanceAnalytics } from "@/lib/report-generator";
import { toast } from "@/hooks/use-toast";

const Reports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);
  const { transactions, loading } = useTransactions();

  const handleDownloadReport = async (reportType: string) => {
    if (transactions.length === 0) {
      toast({
        title: "No Data",
        description: "No transactions found to generate report",
        variant: "destructive"
      });
      return;
    }

    setGeneratingReport(reportType);

    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing
      
      switch (reportType) {
        case "Monthly Financial Report":
          generateMonthlyFinancialReport(transactions);
          break;
        case "Tax Summary":
          generateTaxSummary(transactions);
          break;
        case "Performance Analytics":
          generatePerformanceAnalytics(transactions);
          break;
      }

      toast({
        title: "Success",
        description: `${reportType} downloaded successfully`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive"
      });
    } finally {
      setGeneratingReport(null);
    }
  };

  const reports = [
    {
      title: "Monthly Financial Report",
      description: "Comprehensive overview of income and expenses",
      icon: FileText,
      type: "PDF",
    },
    {
      title: "Tax Summary",
      description: "Annual tax preparation summary",
      icon: Calendar,
      type: "PDF",
    },
    {
      title: "Performance Analytics",
      description: "Business performance metrics and KPIs",
      icon: TrendingUp,
      type: "PDF",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Generate and download financial reports
            </p>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reports.map((report, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <report.icon className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription>{report.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleDownloadReport(report.title)}
                      disabled={generatingReport === report.title || transactions.length === 0}
                    >
                      {generatingReport === report.title ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download {report.type}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Reports;