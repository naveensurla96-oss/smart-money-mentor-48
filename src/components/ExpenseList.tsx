import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, TrendingUp } from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

interface ExpenseListProps {
  expenses: Expense[];
}

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    "Food & Dining": "bg-orange-100 text-orange-800",
    "Transportation": "bg-blue-100 text-blue-800", 
    "Shopping": "bg-purple-100 text-purple-800",
    "Entertainment": "bg-pink-100 text-pink-800",
    "Bills & Utilities": "bg-red-100 text-red-800",
    "Education": "bg-green-100 text-green-800",
    "Health & Fitness": "bg-teal-100 text-teal-800",
    "Other": "bg-gray-100 text-gray-800"
  };
  return colors[category] || colors["Other"];
};

export const ExpenseList = ({ expenses }: ExpenseListProps) => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Recent Expenses
          <Badge variant="secondary" className="ml-auto">
            Total: ${totalAmount.toFixed(2)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {expenses.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No expenses yet. Add your first expense above!
          </p>
        ) : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{expense.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="outline" 
                      className={getCategoryColor(expense.category)}
                    >
                      {expense.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {expense.date.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">${expense.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};