interface NutritionData {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

interface FoodSearchResult {
  fdcId: number;
  description: string;
  brandOwner?: string;
  ingredients?: string;
  foodNutrients: Array<{
    nutrientId: number;
    nutrientName: string;
    value: number;
    unitName: string;
  }>;
}

class NutritionService {
  private apiKey = import.meta.env.VITE_USDA_API_KEY;
  private baseURL = 'https://api.nal.usda.gov/fdc/v1';

  async searchFood(query: string): Promise<NutritionData[]> {
    if (!this.apiKey) {
      // Fallback to local database if no API key
      return this.searchLocalDatabase(query);
    }

    try {
      const response = await fetch(
        `${this.baseURL}/foods/search?query=${encodeURIComponent(query)}&api_key=${this.apiKey}&pageSize=10`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch nutrition data');
      }

      const data = await response.json();
      return this.parseNutritionData(data.foods);
    } catch (error) {
      console.error('Nutrition API error:', error);
      return this.searchLocalDatabase(query);
    }
  }

  private parseNutritionData(foods: FoodSearchResult[]): NutritionData[] {
    return foods.map(food => {
      const nutrients = food.foodNutrients;
      
      const getNutrientValue = (nutrientId: number) => {
        const nutrient = nutrients.find(n => n.nutrientId === nutrientId);
        return nutrient ? nutrient.value : 0;
      };

      return {
        name: food.description,
        calories: getNutrientValue(1008), // Energy
        protein: getNutrientValue(1003), // Protein
        carbs: getNutrientValue(1005), // Carbohydrate
        fat: getNutrientValue(1004), // Total lipid (fat)
        fiber: getNutrientValue(1079), // Fiber
        sugar: getNutrientValue(2000), // Sugars
        sodium: getNutrientValue(1093) // Sodium
      };
    });
  }

  private searchLocalDatabase(query: string): NutritionData[] {
    const localFoods: NutritionData[] = [
      { name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      { name: "Brown Rice (100g)", calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
      { name: "Broccoli (100g)", calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
      { name: "Salmon (100g)", calories: 208, protein: 20, carbs: 0, fat: 13 },
      { name: "Sweet Potato (100g)", calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
      { name: "Greek Yogurt (100g)", calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
      { name: "Almonds (100g)", calories: 579, protein: 21, carbs: 22, fat: 50 },
      { name: "Banana (100g)", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
      { name: "Oats (100g)", calories: 389, protein: 17, carbs: 66, fat: 7 },
      { name: "Eggs (100g)", calories: 155, protein: 13, carbs: 1.1, fat: 11 }
    ];

    return localFoods.filter(food => 
      food.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getFoodDetails(fdcId: number): Promise<NutritionData | null> {
    if (!this.apiKey) return null;

    try {
      const response = await fetch(
        `${this.baseURL}/food/${fdcId}?api_key=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch food details');
      }

      const food = await response.json();
      return this.parseNutritionData([food])[0];
    } catch (error) {
      console.error('Food details error:', error);
      return null;
    }
  }
}

export const nutritionService = new NutritionService();