import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, Loader2 } from 'lucide-react';
import { nutritionService } from '../services/nutritionService';
import { useProfile } from '../context/ProfileContext';
import { toast } from '@/components/ui/use-toast';

interface NutritionData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodSearchProps {
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  onFoodAdded?: () => void;
}

const FoodSearch: React.FC<FoodSearchProps> = ({ meal, onFoodAdded }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NutritionData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { addFoodItem } = useProfile();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await nutritionService.searchFood(searchQuery);
      setSearchResults(results);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Search failed",
        description: "Could not search for foods. Please try again.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddFood = (food: NutritionData) => {
    addFoodItem({
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      meal
    });

    toast({
      title: "Food added!",
      description: `${food.name} has been added to your ${meal}.`,
    });

    if (onFoodAdded) {
      onFoodAdded();
    }

    // Clear search
    setSearchQuery('');
    setSearchResults([]);
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.length > 2) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for foods (e.g., chicken breast, apple, oatmeal)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()}>
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {searchResults.map((food, index) => (
            <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{food.name}</h4>
                    <div className="text-xs text-muted-foreground mt-1">
                      {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddFood(food)}
                    className="ml-2"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isSearching && (
        <div className="text-center py-4">
          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">Searching for foods...</p>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;