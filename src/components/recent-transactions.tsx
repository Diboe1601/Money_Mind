import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const transactions = [
  {
    id: 1,
    description: "Client Payment - Web Development",
    amount: 5500,
    type: "income",
    date: "2024-01-15",
    category: "Services",
    status: "completed"
  },
  {
    id: 2,
    description: "Office Rent",
    amount: -2200,
    type: "expense",
    date: "2024-01-14",
    category: "Operations",
    status: "completed"
  },
  {
    id: 3,
    description: "Marketing Campaign",
    amount: -850,
    type: "expense",
    date: "2024-01-13",
    category: "Marketing",
    status: "pending"
  },
  {
    id: 4,
    description: "Software Subscription",
    amount: -199,
    type: "expense",
    date: "2024-01-12",
    category: "Technology",
    status: "completed"
  },
  {
    id: 5,
    description: "Consulting Services",
    amount: 3200,
    type: "income",
    date: "2024-01-11",
    category: "Services",
    status: "completed"
  }
];

export function RecentTransactions() {
  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-heading">Recent Transactions</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-danger/10 text-danger'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'income' ? 'text-success' : 'text-danger'
                }`}>
                  {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                </p>
                <Badge 
                  variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}