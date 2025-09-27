import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";

const Budgets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const budgets = [
    {
      category: "Food & Dining",
      spent: 850,
      budget: 1200,
      color: "bg-green-500",
    },
    {
      category: "Transportation",
      spent: 420,
      budget: 500,
      color: "bg-blue-500",
    },
    {
      category: "Entertainment",
      spent: 180,
      budget: 300,
      color: "bg-purple-500",
    },
    {
      category: "Shopping",
      spent: 650,
      budget: 600,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
              <p className="text-muted-foreground">
                Track and manage your spending limits
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Budget
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {budgets.map((budget, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Target className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{budget.category}</CardTitle>
                      <CardDescription>
                        ${budget.spent} of ${budget.budget} spent
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress 
                      value={(budget.spent / budget.budget) * 100} 
                      className="h-3"
                    />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {Math.round((budget.spent / budget.budget) * 100)}% used
                      </span>
                      <span className={budget.spent > budget.budget ? "text-red-500" : "text-green-500"}>
                        ${budget.budget - budget.spent} remaining
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Budgets;