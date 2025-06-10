import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProfile } from '../context/ProfileContext';
import { getTargetCalories } from '../utils/health';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const HealthInsights: React.FC = () => {
  const { profile, dailyLogs, currentLog } = useProfile();

  if (!profile) return null;

  const targetCalories = getTargetCalories(profile);
  const recentLogs = dailyLogs.slice(-7); // Last 7 days
  
  const insights = generateInsights(profile, recentLogs, currentLog, targetCalories);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          Health Insights
        </CardTitle>
        <CardDescription>
          Personalized recommendations based on your recent activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
              <div className={`p-1 rounded-full ${insight.type === 'positive' ? 'bg-success/10' : insight.type === 'warning' ? 'bg-warning/10' : 'bg-info/10'}`}>
                {insight.type === 'positive' && <CheckCircle className="h-4 w-4 text-success" />}
                {insight.type === 'warning' && <AlertTriangle className="h-4 w-4 text-warning" />}
                {insight.type === 'info' && <Info className="h-4 w-4 text-info" />}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{insight.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                {insight.recommendation && (
                  <p className="text-xs text-primary mt-2 font-medium">{insight.recommendation}</p>
                )}
              </div>
              <Badge variant={insight.type === 'positive' ? 'default' : insight.type === 'warning' ? 'destructive' : 'secondary'}>
                {insight.category}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface Insight {
  title: string;
  description: string;
  recommendation?: string;
  type: 'positive' | 'warning' | 'info';
  category: string;
}

const generateInsights = (profile: any, recentLogs: any[], currentLog: any, targetCalories: number): Insight[] => {
  const insights: Insight[] = [];

  // Calorie tracking insights
  if (recentLogs.length > 0) {
    const avgCalories = recentLogs.reduce((sum, log) => sum + log.totalCalories, 0) / recentLogs.length;
    const calorieDeviation = Math.abs(avgCalories - targetCalories);
    
    if (calorieDeviation > 300) {
      insights.push({
        title: avgCalories > targetCalories ? "Consistently Over Target" : "Consistently Under Target",
        description: `Your average daily intake is ${Math.round(calorieDeviation)} calories ${avgCalories > targetCalories ? 'above' : 'below'} your target.`,
        recommendation: avgCalories > targetCalories ? "Consider smaller portions or lower-calorie alternatives." : "Try adding healthy, calorie-dense foods like nuts or avocados.",
        type: 'warning',
        category: 'Calories'
      });
    } else {
      insights.push({
        title: "Great Calorie Management",
        description: "You're staying close to your daily calorie target!",
        type: 'positive',
        category: 'Calories'
      });
    }
  }

  // Protein intake insights
  if (recentLogs.length > 0) {
    const avgProtein = recentLogs.reduce((sum, log) => sum + log.totalProtein, 0) / recentLogs.length;
    const proteinTarget = profile.weight * (profile.goal === 'muscleGain' ? 2.2 : 1.6); // g per kg body weight
    
    if (avgProtein < proteinTarget * 0.8) {
      insights.push({
        title: "Low Protein Intake",
        description: `You're averaging ${Math.round(avgProtein)}g protein daily, below the recommended ${Math.round(proteinTarget)}g.`,
        recommendation: "Add lean meats, fish, eggs, or plant-based proteins to your meals.",
        type: 'warning',
        category: 'Protein'
      });
    }
  }

  // Consistency insights
  const loggedDays = recentLogs.filter(log => log.foodItems.length > 0).length;
  if (loggedDays >= 5) {
    insights.push({
      title: "Excellent Tracking Consistency",
      description: `You've logged food for ${loggedDays} out of the last 7 days.`,
      type: 'positive',
      category: 'Habits'
    });
  } else if (loggedDays < 3) {
    insights.push({
      title: "Improve Tracking Consistency",
      description: "Regular food logging helps you stay on track with your goals.",
      recommendation: "Try setting daily reminders to log your meals.",
      type: 'info',
      category: 'Habits'
    });
  }

  // BMI-specific insights
  if (profile.bmiCategory === 'obese' || profile.bmiCategory === 'severelyObese') {
    insights.push({
      title: "Focus on Gradual Changes",
      description: "Small, sustainable changes are more effective than drastic diet modifications.",
      recommendation: "Aim for 1-2 pounds of weight loss per week through consistent habits.",
      type: 'info',
      category: 'Weight'
    });
  }

  // Health condition insights
  if (profile.healthConditions.includes('diabetes')) {
    const avgCarbs = recentLogs.length > 0 
      ? recentLogs.reduce((sum, log) => sum + log.totalCarbs, 0) / recentLogs.length 
      : 0;
    
    if (avgCarbs > 150) {
      insights.push({
        title: "Monitor Carbohydrate Intake",
        description: "Your average carb intake may be high for diabetes management.",
        recommendation: "Consider focusing on complex carbs and monitoring blood sugar responses.",
        type: 'warning',
        category: 'Health'
      });
    }
  }

  return insights;
};

export default HealthInsights;