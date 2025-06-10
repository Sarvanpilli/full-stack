import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useProfile } from '../context/ProfileContext';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ProgressChart: React.FC = () => {
  const { dailyLogs, profile } = useProfile();

  // Prepare data for charts
  const chartData = dailyLogs
    .slice(-7) // Last 7 days
    .map(log => ({
      date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      calories: log.totalCalories,
      protein: log.totalProtein,
      carbs: log.totalCarbs,
      fat: log.totalFat
    }));

  const averageCalories = chartData.length > 0 
    ? Math.round(chartData.reduce((sum, day) => sum + day.calories, 0) / chartData.length)
    : 0;

  const targetCalories = profile ? getTargetCalories(profile) : 2000;
  const caloriesTrend = averageCalories - targetCalories;

  const getTrendIcon = (trend: number) => {
    if (trend > 50) return <TrendingUp className="h-4 w-4 text-destructive" />;
    if (trend < -50) return <TrendingDown className="h-4 w-4 text-info" />;
    return <Minus className="h-4 w-4 text-success" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Weekly Progress Overview
            {getTrendIcon(caloriesTrend)}
          </CardTitle>
          <CardDescription>
            Your nutrition trends over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{averageCalories}</p>
              <p className="text-sm text-muted-foreground">Avg Calories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">
                {chartData.length > 0 ? Math.round(chartData.reduce((sum, day) => sum + day.protein, 0) / chartData.length) : 0}g
              </p>
              <p className="text-sm text-muted-foreground">Avg Protein</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">
                {chartData.length > 0 ? Math.round(chartData.reduce((sum, day) => sum + day.carbs, 0) / chartData.length) : 0}g
              </p>
              <p className="text-sm text-muted-foreground">Avg Carbs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">
                {chartData.length > 0 ? Math.round(chartData.reduce((sum, day) => sum + day.fat, 0) / chartData.length) : 0}g
              </p>
              <p className="text-sm text-muted-foreground">Avg Fat</p>
            </div>
          </div>

          {chartData.length > 0 ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Daily Calories</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="calories" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Macronutrient Breakdown</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="protein" fill="hsl(var(--secondary))" />
                    <Bar dataKey="carbs" fill="hsl(var(--accent))" />
                    <Bar dataKey="fat" fill="hsl(var(--warning))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No data available yet. Start logging your meals to see progress!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressChart;