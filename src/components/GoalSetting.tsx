import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Goal {
  id: string;
  type: 'weight' | 'calories' | 'exercise';
  target: number;
  current: number;
  deadline?: Date;
  isCompleted: boolean;
}

const GoalSetting: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({
    type: 'weight' as 'weight' | 'calories' | 'exercise',
    target: '',
    deadline: ''
  });

  const addGoal = () => {
    if (!newGoal.target) {
      toast({
        variant: "destructive",
        title: "Missing target",
        description: "Please enter a target value for your goal.",
      });
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      type: newGoal.type,
      target: Number(newGoal.target),
      current: 0,
      deadline: newGoal.deadline ? new Date(newGoal.deadline) : undefined,
      isCompleted: false
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({ type: 'weight', target: '', deadline: '' });
    
    toast({
      title: "Goal added!",
      description: "Your new goal has been set successfully.",
    });
  };

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, current: newProgress, isCompleted: newProgress >= goal.target }
        : goal
    ));
  };

  const getGoalTypeLabel = (type: string) => {
    switch (type) {
      case 'weight': return 'Weight Loss (kg)';
      case 'calories': return 'Daily Calories';
      case 'exercise': return 'Exercise Days/Week';
      default: return type;
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>Set Your Goals</CardTitle>
          </div>
          <CardDescription>
            Define specific, measurable goals to track your progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="goal-type">Goal Type</Label>
                <Select
                  value={newGoal.type}
                  onValueChange={(value) => setNewGoal(prev => ({ ...prev, type: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight">Weight Loss</SelectItem>
                    <SelectItem value="calories">Daily Calories</SelectItem>
                    <SelectItem value="exercise">Exercise Frequency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="goal-target">Target</Label>
                <Input
                  id="goal-target"
                  type="number"
                  placeholder="Enter target value"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="goal-deadline">Deadline (Optional)</Label>
                <Input
                  id="goal-deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                />
              </div>
            </div>
            
            <Button onClick={addGoal} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </div>
        </CardContent>
      </Card>

      {goals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Goals</CardTitle>
            <CardDescription>Track your progress towards your goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium flex items-center gap-2">
                      {goal.isCompleted && <Check className="h-4 w-4 text-success" />}
                      {getGoalTypeLabel(goal.type)}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {goal.current} / {goal.target}
                    </span>
                  </div>
                  
                  <Progress 
                    value={getProgressPercentage(goal.current, goal.target)} 
                    className="mb-2"
                  />
                  
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Update progress"
                      className="flex-1"
                      onChange={(e) => {
                        if (e.target.value) {
                          updateGoalProgress(goal.id, Number(e.target.value));
                        }
                      }}
                    />
                    {goal.deadline && (
                      <span className="text-xs text-muted-foreground">
                        Due: {goal.deadline.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoalSetting;