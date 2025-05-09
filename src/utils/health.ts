
import { BMICategory, Gender, Goal, HealthCondition, UserProfile } from "../types";

export const calculateBMI = (height: number, weight: number): number => {
  // Convert height from cm to m
  const heightInM = height / 100;
  
  // BMI formula: weight (kg) / (height (m))^2
  const bmi = weight / (heightInM * heightInM);
  
  // Return rounded to 1 decimal place
  return Math.round(bmi * 10) / 10;
};

export const getBMICategory = (bmi: number): BMICategory => {
  if (bmi < 18.5) return 'underweight';
  if (bmi >= 18.5 && bmi < 24.9) return 'normal';
  if (bmi >= 25 && bmi < 29.9) return 'overweight';
  if (bmi >= 30 && bmi < 39.9) return 'obese';
  return 'severelyObese';
};

export const getBMICategoryColor = (category: BMICategory): string => {
  switch (category) {
    case 'underweight':
      return 'text-info';
    case 'normal':
      return 'text-success';
    case 'overweight':
      return 'text-warning';
    case 'obese':
    case 'severelyObese':
      return 'text-destructive';
    default:
      return 'text-foreground';
  }
};

export const getTargetCalories = (profile: UserProfile): number => {
  const { gender, age, height, weight, goal, bmi } = profile;
  
  // Base metabolic rate (BMR) using Mifflin-St Jeor Equation
  let bmr = 0;
  
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  // Activity multiplier (assuming moderate activity)
  const activityMultiplier = 1.375;
  
  // Total Daily Energy Expenditure
  let tdee = bmr * activityMultiplier;
  
  // Adjust based on goals
  switch (goal) {
    case 'weightLoss':
      return Math.round(tdee - 500); // 500 calorie deficit
    case 'muscleGain':
      return Math.round(tdee + 300); // 300 calorie surplus
    case 'maintenance':
    default:
      return Math.round(tdee);
  }
};

export const getDietRecommendation = (
  profile: UserProfile
): { title: string; description: string; foods: string[] } => {
  const { goal, healthConditions, bmiCategory } = profile;
  
  // Base recommendations by goal
  let recommendation = {
    title: "",
    description: "",
    foods: [] as string[]
  };
  
  // Set based on goal
  switch (goal) {
    case 'weightLoss':
      recommendation = {
        title: "Caloric Deficit Diet",
        description: "Focus on high protein, low calorie dense foods that keep you full longer.",
        foods: [
          "Lean proteins (chicken breast, turkey, fish)",
          "Leafy greens and fibrous vegetables",
          "Berries and low-sugar fruits",
          "Greek yogurt and cottage cheese",
          "Legumes and beans"
        ]
      };
      break;
      
    case 'muscleGain':
      recommendation = {
        title: "Muscle Building Diet",
        description: "Prioritize protein intake and maintain a slight caloric surplus.",
        foods: [
          "Protein-rich foods (lean meats, fish, eggs)",
          "Complex carbs (brown rice, sweet potatoes, oats)",
          "Healthy fats (avocados, nuts, olive oil)",
          "Dairy or alternatives (milk, yogurt, protein shakes)",
          "Nutrient-dense fruits and vegetables"
        ]
      };
      break;
      
    case 'maintenance':
      recommendation = {
        title: "Balanced Maintenance Diet",
        description: "Focus on nutrient-dense whole foods in balanced proportions.",
        foods: [
          "Varied protein sources (both animal and plant-based)",
          "Whole grains and complex carbohydrates",
          "Healthy fats in moderation",
          "Abundant fruits and vegetables",
          "Limited processed foods and added sugars"
        ]
      };
      break;
  }
  
  // Adjust for health conditions
  if (healthConditions.includes('diabetes')) {
    recommendation.description += " With diabetes, focus on low glycemic index foods and consistent meal timing.";
    recommendation.foods = recommendation.foods.filter(food => 
      !food.toLowerCase().includes("sugar") && 
      !food.toLowerCase().includes("rice") &&
      !food.toLowerCase().includes("potato")
    );
    recommendation.foods.push("Low glycemic index foods", "Fiber-rich vegetables", "Controlled portions of whole grains");
  }
  
  if (healthConditions.includes('hypertension')) {
    recommendation.description += " For hypertension, limit sodium intake and focus on potassium-rich foods.";
    recommendation.foods.push("Low-sodium options", "Potassium-rich foods (bananas, spinach)", "Limit processed foods");
  }
  
  if (healthConditions.includes('thyroid')) {
    recommendation.description += " With thyroid issues, focus on selenium and iodine-rich foods, and consistent calorie intake.";
    recommendation.foods.push("Selenium-rich foods (Brazil nuts, seafood)", "Iodine sources (seaweed, fish)", "Anti-inflammatory foods");
  }
  
  if (healthConditions.includes('heart')) {
    recommendation.description += " For heart health, emphasize omega-3 fatty acids and limit saturated fats.";
    recommendation.foods.push("Omega-3 rich foods (fatty fish, flaxseeds)", "Heart-healthy oils", "Limited saturated fats");
  }
  
  return recommendation;
};

export const getWorkoutRecommendation = (
  profile: UserProfile
): { title: string; description: string; exercises: string[]; videoKeywords: string[] } => {
  const { goal, healthConditions, bmiCategory } = profile;
  
  // Base recommendations by goal
  let recommendation = {
    title: "",
    description: "",
    exercises: [] as string[],
    videoKeywords: [] as string[]
  };
  
  // Set based on goal
  switch (goal) {
    case 'weightLoss':
      recommendation = {
        title: "Fat Loss Focused Workouts",
        description: "Combine cardio and strength training for optimal fat loss.",
        exercises: [
          "HIIT (High-Intensity Interval Training)",
          "Circuit training",
          "Strength training 2-3 times per week",
          "Steady-state cardio 2-3 times per week",
          "Active recovery days with walking or swimming"
        ],
        videoKeywords: ["beginner weight loss workout", "fat burning HIIT", "cardio for weight loss"]
      };
      break;
      
    case 'muscleGain':
      recommendation = {
        title: "Muscle Building Regimen",
        description: "Focus on progressive overload and adequate recovery.",
        exercises: [
          "Compound lifts (squats, deadlifts, bench press)",
          "Progressive overload training",
          "Split routines focusing on different muscle groups",
          "Limited cardio to preserve energy for lifting",
          "Rest days between intense workouts"
        ],
        videoKeywords: ["beginner muscle building workout", "hypertrophy training", "strength training basics"]
      };
      break;
      
    case 'maintenance':
      recommendation = {
        title: "Balanced Fitness Routine",
        description: "Maintain current fitness with varied activities.",
        exercises: [
          "Mixed cardio and strength sessions",
          "Flexibility and mobility work",
          "Recreational sports or activities",
          "Consistent routine with varied intensity",
          "Regular active recovery days"
        ],
        videoKeywords: ["balanced workout routine", "fitness maintenance", "mobility and strength"]
      };
      break;
  }
  
  // Adjust for health conditions
  if (healthConditions.includes('diabetes')) {
    recommendation.description += " For diabetes, maintain consistent activity to help regulate blood sugar.";
    recommendation.exercises.push("Regular walking after meals", "Consistent daily activity", "Blood sugar monitoring before/after exercise");
    recommendation.videoKeywords.push("diabetes safe workouts");
  }
  
  if (healthConditions.includes('hypertension')) {
    recommendation.description += " With hypertension, focus on moderate intensity and avoid heavy lifting.";
    recommendation.exercises = recommendation.exercises.filter(ex => !ex.toLowerCase().includes("HIIT"));
    recommendation.exercises.push("Moderate intensity cardio", "Controlled breathing exercises", "Limited heavy lifting");
    recommendation.videoKeywords.push("exercise for high blood pressure");
  }
  
  if (healthConditions.includes('heart')) {
    recommendation.description += " For heart conditions, prioritize doctor-approved cardio and monitor intensity.";
    recommendation.exercises.push("Heart-rate monitored activities", "Supervised exercise when possible", "Gradual progression in intensity");
    recommendation.videoKeywords.push("heart safe cardio");
  }
  
  // Adjust for BMI category
  if (bmiCategory === 'obese' || bmiCategory === 'severelyObese') {
    recommendation.description += " Start with low-impact exercises to protect joints.";
    recommendation.exercises.push("Swimming or water exercises", "Recumbent bike", "Seated or supported movements");
    recommendation.videoKeywords.push("low impact workout");
  }
  
  if (bmiCategory === 'underweight') {
    recommendation.description += " Focus on strength building and adequate fueling before workouts.";
    recommendation.exercises.push("Focus on strength over cardio", "Ensure adequate pre-workout nutrition", "Gradual increase in training volume");
    recommendation.videoKeywords.push("workout for underweight");
  }
  
  return recommendation;
};

export const getMotivationalMessage = (profile: UserProfile): string => {
  const { goal, bmiCategory } = profile;
  
  const messages = [
    "Every small step is progress. Celebrate your journey!",
    "Your dedication today builds your strength for tomorrow.",
    "Focus on consistency rather than perfection.",
    "You're stronger than you think. Keep pushing forward!",
    "Health is a lifelong journey, not a destination."
  ];
  
  // Add goal-specific messages
  switch (goal) {
    case 'weightLoss':
      messages.push(
        "Small sustainable changes lead to remarkable transformations.",
        "Focus on how you feel, not just the numbers on the scale."
      );
      break;
    case 'muscleGain':
      messages.push(
        "Growth happens during recovery. Rest is part of the process.",
        "Strength builds slowly but surely with consistent effort."
      );
      break;
    case 'maintenance':
      messages.push(
        "Maintaining health is an achievement worth celebrating daily.",
        "Balance is the true measure of sustainable wellness."
      );
      break;
  }
  
  // Pick a random message
  return messages[Math.floor(Math.random() * messages.length)];
};
