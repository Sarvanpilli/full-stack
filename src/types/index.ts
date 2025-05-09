
export type Gender = 'male' | 'female' | 'other';

export type Goal = 'weightLoss' | 'muscleGain' | 'maintenance';

export type HealthCondition = 
  | 'none' 
  | 'diabetes' 
  | 'hypertension' 
  | 'thyroid' 
  | 'heart' 
  | 'other';

export type BMICategory = 
  | 'underweight' 
  | 'normal' 
  | 'overweight' 
  | 'obese' 
  | 'severelyObese';

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  goal: Goal;
  healthConditions: HealthCondition[];
  bmi?: number;
  bmiCategory?: BMICategory;
}

export interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface DailyLog {
  date: string;
  foodItems: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface ExerciseVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
}
