
import React, { useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { FoodItem } from "../types";
import { getTargetCalories } from "../utils/health";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Heart, Plus, Utensils } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DietLog: React.FC = () => {
  const { profile, currentLog, addFoodItem } = useProfile();
  
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState<number | "">("");
  const [protein, setProtein] = useState<number | "">("");
  const [carbs, setCarbs] = useState<number | "">("");
  const [fat, setFat] = useState<number | "">("");
  const [meal, setMeal] = useState<"breakfast" | "lunch" | "dinner" | "snack">("breakfast");
  
  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!foodName || calories === "" || protein === "" || carbs === "" || fat === "") {
      return;
    }
    
    const newFood: FoodItem = {
      name: foodName,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
      meal,
    };
    
    addFoodItem(newFood);
    
    // Reset form
    setFoodName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setMeal("breakfast");
  };
  
  const targetCalories = profile ? getTargetCalories(profile) : 2000;
  const currentCalories = currentLog?.totalCalories || 0;
  const caloriePercentage = Math.min(Math.round((currentCalories / targetCalories) * 100), 100);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <CardTitle>Today's Diet Log</CardTitle>
          </div>
          <CardDescription>Track your meals and nutrition</CardDescription>
        </CardHeader>
        <CardContent>
          {profile && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Calorie Target: {targetCalories}</span>
                  <span>
                    {currentCalories} / {targetCalories} kcal
                  </span>
                </div>
                <Progress value={caloriePercentage} className="h-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center py-2">
                <div>
                  <p className="text-xs text-muted-foreground">Protein</p>
                  <p className="font-semibold">{currentLog?.totalProtein || 0}g</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Carbs</p>
                  <p className="font-semibold">{currentLog?.totalCarbs || 0}g</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fat</p>
                  <p className="font-semibold">{currentLog?.totalFat || 0}g</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Today's Food</h3>
                
                {currentLog && currentLog.foodItems.length > 0 ? (
                  <div className="space-y-2">
                    {currentLog.foodItems.map((food, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center p-3 bg-muted rounded-md"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 bg-secondary/20 rounded text-secondary-foreground">
                              {food.meal}
                            </span>
                            <span className="font-medium">{food.name}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Protein: {food.protein}g | Carbs: {food.carbs}g | Fat: {food.fat}g
                          </div>
                        </div>
                        <div className="text-sm font-semibold">{food.calories} kcal</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 text-muted-foreground">
                    <Utensils className="mx-auto h-10 w-10 opacity-20 mb-2" />
                    <p>No food logged today</p>
                    <p className="text-sm">Add your meals below</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            <CardTitle>Add Food</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddFood} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="foodName">Food Name</Label>
              <Input
                id="foodName"
                placeholder="e.g., Grilled Chicken Salad"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="calories">Calories (kcal)</Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="350"
                  min={0}
                  value={calories}
                  onChange={(e) => setCalories(e.target.value ? Number(e.target.value) : "")}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="meal">Meal</Label>
                <Select
                  value={meal}
                  onValueChange={(value) => setMeal(value as any)}
                >
                  <SelectTrigger id="meal">
                    <SelectValue placeholder="Select meal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  placeholder="30"
                  min={0}
                  value={protein}
                  onChange={(e) => setProtein(e.target.value ? Number(e.target.value) : "")}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  placeholder="20"
                  min={0}
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value ? Number(e.target.value) : "")}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="fat">Fat (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  placeholder="15"
                  min={0}
                  value={fat}
                  onChange={(e) => setFat(e.target.value ? Number(e.target.value) : "")}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Add Food Item
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DietLog;
