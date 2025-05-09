
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, DailyLog, FoodItem, ExerciseVideo } from '../types';
import { calculateBMI, getBMICategory, getTargetCalories } from '../utils/health';
import { fetchWorkoutVideos } from '../services/youtubeService';
import { toast } from '../components/ui/use-toast';

interface ProfileContextType {
  profile: UserProfile | null;
  dailyLogs: DailyLog[];
  currentLog: DailyLog | null;
  exerciseVideos: ExerciseVideo[];
  isLoading: boolean;
  createProfile: (profile: Omit<UserProfile, 'bmi' | 'bmiCategory'>) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addFoodItem: (item: FoodItem) => void;
  refreshVideos: () => Promise<void>;
}

const defaultContext: ProfileContextType = {
  profile: null,
  dailyLogs: [],
  currentLog: null,
  exerciseVideos: [],
  isLoading: false,
  createProfile: () => {},
  updateProfile: () => {},
  addFoodItem: () => {},
  refreshVideos: async () => {}
};

const ProfileContext = createContext<ProfileContextType>(defaultContext);

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [currentLog, setCurrentLog] = useState<DailyLog | null>(null);
  const [exerciseVideos, setExerciseVideos] = useState<ExerciseVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize or load from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    
    const savedLogs = localStorage.getItem('dailyLogs');
    if (savedLogs) {
      setDailyLogs(JSON.parse(savedLogs));
    }
    
    // Set up current log
    setupCurrentLog();
  }, []);
  
  // Save profile changes to localStorage
  useEffect(() => {
    if (profile) {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    }
  }, [profile]);
  
  // Save logs changes to localStorage
  useEffect(() => {
    if (dailyLogs.length > 0) {
      localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));
    }
  }, [dailyLogs]);
  
  const setupCurrentLog = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if we already have a log for today
    const existingLog = dailyLogs.find(log => log.date === today);
    
    if (existingLog) {
      setCurrentLog(existingLog);
    } else {
      // Create a new log for today
      const newLog: DailyLog = {
        date: today,
        foodItems: [],
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0
      };
      
      setCurrentLog(newLog);
      setDailyLogs(prev => [...prev, newLog]);
    }
  };
  
  const createProfile = (newProfileData: Omit<UserProfile, 'bmi' | 'bmiCategory'>) => {
    // Calculate BMI
    const bmi = calculateBMI(newProfileData.height, newProfileData.weight);
    const bmiCategory = getBMICategory(bmi);
    
    const newProfile: UserProfile = {
      ...newProfileData,
      bmi,
      bmiCategory
    };
    
    setProfile(newProfile);
    toast({
      title: "Profile created!",
      description: `Welcome, ${newProfile.name}! We've calculated your BMI as ${bmi}.`,
    });
    
    // Fetch initial exercise videos
    refreshVideos();
  };
  
  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!profile) return;
    
    const updatedProfile = { ...profile, ...updates };
    
    // Recalculate BMI if height or weight changed
    if ('height' in updates || 'weight' in updates) {
      updatedProfile.bmi = calculateBMI(updatedProfile.height, updatedProfile.weight);
      updatedProfile.bmiCategory = getBMICategory(updatedProfile.bmi);
    }
    
    setProfile(updatedProfile);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    
    // Refresh videos if goal changed
    if ('goal' in updates) {
      refreshVideos();
    }
  };
  
  const addFoodItem = (item: FoodItem) => {
    if (!currentLog) return;
    
    const updatedItems = [...currentLog.foodItems, item];
    
    // Calculate new totals
    const totalCalories = updatedItems.reduce((sum, item) => sum + item.calories, 0);
    const totalProtein = updatedItems.reduce((sum, item) => sum + item.protein, 0);
    const totalCarbs = updatedItems.reduce((sum, item) => sum + item.carbs, 0);
    const totalFat = updatedItems.reduce((sum, item) => sum + item.fat, 0);
    
    const updatedLog: DailyLog = {
      ...currentLog,
      foodItems: updatedItems,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat
    };
    
    // Update current log
    setCurrentLog(updatedLog);
    
    // Update daily logs array
    setDailyLogs(prev => 
      prev.map(log => log.date === updatedLog.date ? updatedLog : log)
    );
    
    toast({
      title: "Food added",
      description: `${item.name} has been added to your log.`,
    });
  };
  
  const refreshVideos = async () => {
    if (!profile) return;
    
    setIsLoading(true);
    
    try {
      const videos = await fetchWorkoutVideos([
        `${profile.goal === 'weightLoss' ? 'weight loss workout' : ''}`,
        `${profile.goal === 'muscleGain' ? 'muscle building workout' : ''}`,
        `${profile.goal === 'maintenance' ? 'fitness maintenance' : ''}`,
        `${profile.healthConditions.includes('diabetes') ? 'diabetes safe workouts' : ''}`,
        `${profile.healthConditions.includes('heart') ? 'heart safe cardio' : ''}`,
        `${profile.bmiCategory === 'obese' ? 'low impact workout' : ''}`,
      ].filter(kw => kw !== ''));
      
      setExerciseVideos(videos);
    } catch (error) {
      console.error('Error fetching workout videos:', error);
      toast({
        variant: "destructive",
        title: "Error fetching videos",
        description: "Could not load workout videos. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <ProfileContext.Provider
      value={{
        profile,
        dailyLogs,
        currentLog,
        exerciseVideos,
        isLoading,
        createProfile,
        updateProfile,
        addFoodItem,
        refreshVideos
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
