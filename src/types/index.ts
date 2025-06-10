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
  id?: string;
  name: string;
  email?: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  goal: Goal;
  healthConditions: HealthCondition[];
  bmi?: number;
  bmiCategory?: BMICategory;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FoodItem {
  id?: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  createdAt?: Date;
}

export interface DailyLog {
  id?: string;
  userId?: string;
  date: string;
  foodItems: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ExerciseVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration?: string;
  channelName?: string;
}

export interface ProgressEntry {
  id?: string;
  userId?: string;
  date: string;
  weight: number;
  notes?: string;
  createdAt?: Date;
}

export interface Goal {
  id?: string;
  userId?: string;
  type: 'weight' | 'calories' | 'exercise';
  target: number;
  current: number;
  deadline?: Date;
  isCompleted: boolean;
  createdAt?: Date;
}