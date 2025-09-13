import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, DollarSign, PieChart } from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

interface FinancialInsightsProps {
  expenses: Expense[];
}

export const FinancialInsights = ({ expenses }: FinancialInsightsProps) => {
  // Calculate spending prediction based on recent expenses
  const getPrediction = () => {
    if (expenses.length < 2) return null;
    
    const recent = expenses.slice(0, 3);
    const average = recent.reduce((sum, exp) => sum + exp.amount, 0) / recent.length;
    return average;
  };

  // Generate alerts based on spending patterns
  const getAlerts = () => {
    const alerts: string[] = [];
    
    if (expenses.length === 0) return alerts;

    const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const avgDaily = totalSpending / Math.max(1, expenses.length);

    if (avgDaily > 50) {
      alerts.push("⚠️ High daily spending detected - consider budgeting");
    }

    // Check for frequent food spending
    const foodExpenses = expenses.filter(exp => exp.category === "Food & Dining");
    if (foodExpenses.length > expenses.length * 0.4) {
      alerts.push("🍔 High food spending - try meal planning to save money");
    }

    // Check for recent expensive purchases
    const recentExpensive = expenses.slice(0, 5).some(exp => exp.amount > 100);
    if (recentExpensive) {
      alerts.push("💳 Recent high-value purchase detected - monitor spending");
    }

    if (alerts.length === 0) {
      alerts.push("✅ Your spending looks healthy - keep it up!");
    }

    return alerts;
  };

  // Get spending by category
  const getSpendingByCategory = () => {
    const categoryTotals: { [key: string]: number } = {};
    
    expenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    return Object.entries(categoryTotals)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const prediction = getPrediction();
  const alerts = getAlerts();
  const topCategories = getSpendingByCategory();

  return (
    <div className="space-y-4">
      {prediction && (
        <Card className="border-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <TrendingUp className="h-5 w-5" />
              Spending Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent">
                ${prediction.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                Predicted next expense based on recent spending
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Financial Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-muted/50 text-sm"
              >
                {alert}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {topCategories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Top Spending Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCategories.map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category}</span>
                  <Badge variant="outline">
                    ${amount.toFixed(2)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};