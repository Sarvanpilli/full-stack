
import { ExerciseVideo } from "../types";

// This is a mock service that would be replaced with actual YouTube API integration
export const fetchWorkoutVideos = async (keywords: string[]): Promise<ExerciseVideo[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Sample videos based on keywords
  const allVideos: Record<string, ExerciseVideo[]> = {
    "beginner weight loss workout": [
      {
        id: "UItWltVZZmE",
        title: "20 Minute Beginner Weight Loss Workout",
        thumbnailUrl: "https://i.ytimg.com/vi/UItWltVZZmE/hqdefault.jpg"
      },
      {
        id: "H3jJ29oI8Xc",
        title: "30 Min Fat Burning Workout for Beginners",
        thumbnailUrl: "https://i.ytimg.com/vi/H3jJ29oI8Xc/hqdefault.jpg"
      }
    ],
    "fat burning HIIT": [
      {
        id: "ml6cT4AZdqI",
        title: "30-Minute HIIT Cardio Workout with Warm Up",
        thumbnailUrl: "https://i.ytimg.com/vi/ml6cT4AZdqI/hqdefault.jpg"
      },
      {
        id: "BkS1-El_WlE",
        title: "20 Minute HIIT Workout - Fat Burning HIIT Cardio",
        thumbnailUrl: "https://i.ytimg.com/vi/BkS1-El_WlE/hqdefault.jpg"
      }
    ],
    "cardio for weight loss": [
      {
        id: "VWj8ZxCxrYk",
        title: "Cardio Workout for Weight Loss",
        thumbnailUrl: "https://i.ytimg.com/vi/VWj8ZxCxrYk/hqdefault.jpg"
      },
      {
        id: "gC_L9qAHVJ8",
        title: "30-Minute No-Equipment Cardio Workout",
        thumbnailUrl: "https://i.ytimg.com/vi/gC_L9qAHVJ8/hqdefault.jpg"
      }
    ],
    "beginner muscle building workout": [
      {
        id: "ixkQaZXVQjs",
        title: "The Only 8 Exercises Men Need to Build Muscle",
        thumbnailUrl: "https://i.ytimg.com/vi/ixkQaZXVQjs/hqdefault.jpg"
      },
      {
        id: "95846CBGU0M",
        title: "Beginner Muscle Building Workout",
        thumbnailUrl: "https://i.ytimg.com/vi/95846CBGU0M/hqdefault.jpg"
      }
    ],
    "hypertrophy training": [
      {
        id: "LktGPg-AkvY",
        title: "The Most Effective Training Split for Muscle Growth",
        thumbnailUrl: "https://i.ytimg.com/vi/LktGPg-AkvY/hqdefault.jpg"
      },
      {
        id: "7t3KZeE-tCQ",
        title: "Science-Based Hypertrophy Training",
        thumbnailUrl: "https://i.ytimg.com/vi/7t3KZeE-tCQ/hqdefault.jpg"
      }
    ],
    "strength training basics": [
      {
        id: "VeQS2_wLDT4",
        title: "Strength Training for Beginners",
        thumbnailUrl: "https://i.ytimg.com/vi/VeQS2_wLDT4/hqdefault.jpg"
      },
      {
        id: "1vRXWD_Q7gE",
        title: "The 5 Basic Principles of Strength Training",
        thumbnailUrl: "https://i.ytimg.com/vi/1vRXWD_Q7gE/hqdefault.jpg"
      }
    ],
    "balanced workout routine": [
      {
        id: "5ioVR5oQpHc",
        title: "Perfect Full Body Workout for Beginners",
        thumbnailUrl: "https://i.ytimg.com/vi/5ioVR5oQpHc/hqdefault.jpg"
      },
      {
        id: "UBMk30rjy0o",
        title: "20 Min FULL BODY WORKOUT for Beginners",
        thumbnailUrl: "https://i.ytimg.com/vi/UBMk30rjy0o/hqdefault.jpg"
      }
    ],
    "fitness maintenance": [
      {
        id: "PwJCJToQmps",
        title: "15 Min Daily Exercise Routine",
        thumbnailUrl: "https://i.ytimg.com/vi/PwJCJToQmps/hqdefault.jpg"
      },
      {
        id: "bSXr6V9q6rM",
        title: "10 Min Full Body Workout - Ideal For Maintaining Fitness",
        thumbnailUrl: "https://i.ytimg.com/vi/bSXr6V9q6rM/hqdefault.jpg"
      }
    ],
    "mobility and strength": [
      {
        id: "g_tea8ZNk5A",
        title: "15 Min Full Body Mobility Routine",
        thumbnailUrl: "https://i.ytimg.com/vi/g_tea8ZNk5A/hqdefault.jpg"
      },
      {
        id: "TSMbcg-EL5s",
        title: "Mobility Exercises for Better Performance",
        thumbnailUrl: "https://i.ytimg.com/vi/TSMbcg-EL5s/hqdefault.jpg"
      }
    ],
    "diabetes safe workouts": [
      {
        id: "TYGIgfNKD6o",
        title: "Exercise Tips for Type 2 Diabetes",
        thumbnailUrl: "https://i.ytimg.com/vi/TYGIgfNKD6o/hqdefault.jpg"
      },
      {
        id: "qDemFPwJzTY",
        title: "Safe and Effective Exercises for Diabetes",
        thumbnailUrl: "https://i.ytimg.com/vi/qDemFPwJzTY/hqdefault.jpg"
      }
    ],
    "exercise for high blood pressure": [
      {
        id: "qn5LfZUZ_z8",
        title: "Exercises for High Blood Pressure",
        thumbnailUrl: "https://i.ytimg.com/vi/qn5LfZUZ_z8/hqdefault.jpg"
      },
      {
        id: "Oev_5hnrachM",
        title: "Safe Workout with Hypertension",
        thumbnailUrl: "https://i.ytimg.com/vi/Oev_5hnrachM/hqdefault.jpg"
      }
    ],
    "heart safe cardio": [
      {
        id: "8P-SfsoSPO8",
        title: "Heart Healthy Cardio Workout",
        thumbnailUrl: "https://i.ytimg.com/vi/8P-SfsoSPO8/hqdefault.jpg"
      },
      {
        id: "haVuLcCzZxs",
        title: "Low Impact Cardio for Heart Health",
        thumbnailUrl: "https://i.ytimg.com/vi/haVuLcCzZxs/hqdefault.jpg"
      }
    ],
    "low impact workout": [
      {
        id: "7HqGCwt4F1I",
        title: "30 Minute Low Impact Workout",
        thumbnailUrl: "https://i.ytimg.com/vi/7HqGCwt4F1I/hqdefault.jpg"
      },
      {
        id: "50kH47ZztHs",
        title: "Apartment-Friendly Low Impact Workout",
        thumbnailUrl: "https://i.ytimg.com/vi/50kH47ZztHs/hqdefault.jpg"
      }
    ],
    "workout for underweight": [
      {
        id: "c1qxpT52WJU",
        title: "Workout Guide for Skinny Guys",
        thumbnailUrl: "https://i.ytimg.com/vi/c1qxpT52WJU/hqdefault.jpg"
      },
      {
        id: "LUJqTGJoG2Q",
        title: "How to Gain Weight and Build Muscle",
        thumbnailUrl: "https://i.ytimg.com/vi/LUJqTGJoG2Q/hqdefault.jpg"
      }
    ]
  };
  
  // Find videos matching the keywords
  let results: ExerciseVideo[] = [];
  
  for (const keyword of keywords) {
    if (allVideos[keyword]) {
      results = [...results, ...allVideos[keyword]];
      if (results.length >= 3) break; // Limit to 3 videos
    }
  }
  
  // If no specific matches, return general fitness videos
  if (results.length === 0) {
    results = [
      {
        id: "5ioVR5oQpHc",
        title: "Perfect Full Body Workout for Beginners",
        thumbnailUrl: "https://i.ytimg.com/vi/5ioVR5oQpHc/hqdefault.jpg"
      },
      {
        id: "UBMk30rjy0o",
        title: "20 Min FULL BODY WORKOUT for Beginners",
        thumbnailUrl: "https://i.ytimg.com/vi/UBMk30rjy0o/hqdefault.jpg"
      },
      {
        id: "PwJCJToQmps",
        title: "15 Min Daily Exercise Routine",
        thumbnailUrl: "https://i.ytimg.com/vi/PwJCJToQmps/hqdefault.jpg"
      }
    ];
  }
  
  // Limit to 3 videos max
  return results.slice(0, 3);
};
