import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
}

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const categories = [
  "Food & Dining",
  "Transportation", 
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Education",
  "Health & Fitness",
  "Other"
];

const categorizeExpense = (description: string): string => {
  const desc = description.toLowerCase();
  
  if (desc.includes('food') || desc.includes('restaurant') || desc.includes('coffee') || desc.includes('lunch')) {
    return "Food & Dining";
  }
  if (desc.includes('bus') || desc.includes('uber') || desc.includes('gas') || desc.includes('transport')) {
    return "Transportation";
  }
  if (desc.includes('book') || desc.includes('tuition') || desc.includes('course') || desc.includes('school')) {
    return "Education";
  }
  if (desc.includes('movie') || desc.includes('game') || desc.includes('concert')) {
    return "Entertainment";
  }
  if (desc.includes('rent') || desc.includes('electric') || desc.includes('internet') || desc.includes('phone')) {
    return "Bills & Utilities";
  }
  
  return "Other";
};

export const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid description and amount",
        variant: "destructive",
      });
      return;
    }

    const expense = {
      description: description.trim(),
      amount: parseFloat(amount),
      category: categorizeExpense(description),
      date: new Date(),
    };

    onAddExpense(expense);
    setDescription("");
    setAmount("");
    
    toast({
      title: "Expense Added",
      description: `$${expense.amount.toFixed(2)} expense added to ${expense.category}`,
    });
  };

  return (
    <Card className="bg-gradient-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="What did you spend on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20"
          >
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};