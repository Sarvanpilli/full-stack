
import React from "react";
import { useProfile } from "../context/ProfileContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar, Check, Info } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Log: React.FC = () => {
  const { dailyLogs } = useProfile();
  const navigate = useNavigate();
  
  const sortedLogs = [...dailyLogs].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>Your Diet History</CardTitle>
          </div>
          <CardDescription>
            Track your nutrition progress over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sortedLogs.length > 0 ? (
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Calories</TableHead>
                    <TableHead>Protein</TableHead>
                    <TableHead>Carbs</TableHead>
                    <TableHead>Fat</TableHead>
                    <TableHead>Items</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedLogs.map((log) => (
                    <TableRow key={log.date}>
                      <TableCell className="font-medium">{formatDate(log.date)}</TableCell>
                      <TableCell>{log.totalCalories} kcal</TableCell>
                      <TableCell>{log.totalProtein}g</TableCell>
                      <TableCell>{log.totalCarbs}g</TableCell>
                      <TableCell>{log.totalFat}g</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span>{log.foodItems.length}</span>
                          {log.foodItems.length > 0 && (
                            <Check className="h-4 w-4 ml-1 text-success" />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 flex justify-center">
                <Button onClick={() => navigate("/diet")} variant="outline">
                  Update Today's Log
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-2" />
              <p>No logs found</p>
              <p className="text-muted-foreground text-sm mb-4">
                Start logging your meals to see your progress
              </p>
              <Button onClick={() => navigate("/diet")}>
                Start Logging
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-muted">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium">Tracking Tips</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Consistent tracking is key to achieving your health goals. Try to log your meals soon after eating for the most accurate records.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Log;
