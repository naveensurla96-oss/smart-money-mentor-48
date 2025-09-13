import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SavingsGoalProps {
  savingsGoal: number;
  currentSavings: number;
  onSetGoal: (goal: number) => void;
  onUpdateSavings: (amount: number) => void;
}

export const SavingsGoal = ({ 
  savingsGoal, 
  currentSavings, 
  onSetGoal, 
  onUpdateSavings 
}: SavingsGoalProps) => {
  const [goalInput, setGoalInput] = useState("");
  const [savingsInput, setSavingsInput] = useState("");

  const progress = savingsGoal > 0 ? (currentSavings / savingsGoal) * 100 : 0;
  const remaining = savingsGoal - currentSavings;

  const handleSetGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const goal = parseFloat(goalInput);
    
    if (isNaN(goal) || goal <= 0) {
      toast({
        title: "Invalid Goal",
        description: "Please enter a valid savings goal amount",
        variant: "destructive",
      });
      return;
    }

    onSetGoal(goal);
    setGoalInput("");
    
    toast({
      title: "Goal Set!",
      description: `Your new savings goal is $${goal.toFixed(2)}`,
    });
  };

  const handleUpdateSavings = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(savingsInput);
    
    if (isNaN(amount) || amount < 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid savings amount",
        variant: "destructive",
      });
      return;
    }

    onUpdateSavings(currentSavings + amount);
    setSavingsInput("");
    
    toast({
      title: "Savings Updated!",
      description: `Added $${amount.toFixed(2)} to your savings`,
    });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-success text-success-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Savings Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-success-foreground/70 text-sm">Current Savings</p>
              <p className="text-2xl font-bold">${currentSavings.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-success-foreground/70 text-sm">Goal</p>
              <p className="text-2xl font-bold">
                {savingsGoal > 0 ? `$${savingsGoal.toFixed(2)}` : "Not set"}
              </p>
            </div>
          </div>
          
          {savingsGoal > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(progress, 100)} className="h-3" />
              <p className="text-sm text-success-foreground/70">
                {remaining > 0 
                  ? `$${remaining.toFixed(2)} left to reach your goal`
                  : "🎉 Goal achieved! Consider setting a new goal."
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4" />
              Set Savings Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSetGoal} className="space-y-3">
              <Input
                type="number"
                step="0.01"
                placeholder="Enter goal amount"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Set Goal
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Add to Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateSavings} className="space-y-3">
              <Input
                type="number"
                step="0.01"
                placeholder="Amount saved"
                value={savingsInput}
                onChange={(e) => setSavingsInput(e.target.value)}
                required
              />
              <Button type="submit" variant="secondary" className="w-full">
                Add Savings
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};