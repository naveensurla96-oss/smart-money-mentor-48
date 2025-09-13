import { useState, useEffect } from "react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { SavingsGoal } from "@/components/SavingsGoal";
import { FinancialInsights } from "@/components/FinancialInsights";
import { Wallet, TrendingUp } from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [savingsGoal, setSavingsGoal] = useState<number>(0);
  const [currentSavings, setCurrentSavings] = useState<number>(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    const savedGoal = localStorage.getItem("savingsGoal");
    const savedSavings = localStorage.getItem("currentSavings");

    if (savedExpenses) {
      const parsedExpenses = JSON.parse(savedExpenses).map((exp: any) => ({
        ...exp,
        date: new Date(exp.date),
      }));
      setExpenses(parsedExpenses);
    }

    if (savedGoal) setSavingsGoal(parseFloat(savedGoal));
    if (savedSavings) setCurrentSavings(parseFloat(savedSavings));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("savingsGoal", savingsGoal.toString());
  }, [savingsGoal]);

  useEffect(() => {
    localStorage.setItem("currentSavings", currentSavings.toString());
  }, [currentSavings]);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: Date.now().toString(),
    };
    setExpenses(prev => [expense, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-full">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Personal Finance Manager
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take control of your finances with intelligent expense tracking, savings goals, and smart predictions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Forms and Goals */}
          <div className="space-y-6">
            <ExpenseForm onAddExpense={handleAddExpense} />
            <SavingsGoal
              savingsGoal={savingsGoal}
              currentSavings={currentSavings}
              onSetGoal={setSavingsGoal}
              onUpdateSavings={setCurrentSavings}
            />
          </div>

          {/* Middle Column - Expense List */}
          <div>
            <ExpenseList expenses={expenses} />
          </div>

          {/* Right Column - Insights */}
          <div>
            <FinancialInsights expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
