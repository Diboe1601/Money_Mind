import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";
import { useBudgets } from "@/hooks/use-budgets";
import { CreateBudgetForm } from "@/components/forms/create-budget-form";

const Budgets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { budgets, loading, addBudget } = useBudgets();

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
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Budget
            </Button>
          </div>
          
          {loading ? (
            <div className="text-center py-12">Loading budgets...</div>
          ) : budgets.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No budgets yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first budget to start tracking your spending
                </p>
                <Button onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Budget
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {budgets.map((budget) => (
                <Card key={budget.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Target className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{budget.category}</CardTitle>
                        <CardDescription>
                          ${budget.spent.toFixed(2)} of ${budget.amount.toFixed(2)} spent
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Progress 
                        value={(budget.spent / budget.amount) * 100} 
                        className="h-3"
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {Math.round((budget.spent / budget.amount) * 100)}% used
                        </span>
                        <span className={budget.spent > budget.amount ? "text-red-500" : "text-green-500"}>
                          ${(budget.amount - budget.spent).toFixed(2)} remaining
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <CreateBudgetForm 
            open={createDialogOpen}
            onOpenChange={setCreateDialogOpen}
            onSubmit={addBudget}
          />
        </main>
      </div>
    </div>
  );
};

export default Budgets;