
import React from "react";
import { useProfile } from "../context/ProfileContext";
import { 
  getBMICategoryColor, 
  getDietRecommendation, 
  getMotivationalMessage, 
  getTargetCalories, 
  getWorkoutRecommendation 
} from "../utils/health";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  DumbbellIcon, 
  Trophy, 
  User, 
  Youtube, 
  Flame,
  ArrowRight, 
  Target 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const ResultsView: React.FC = () => {
  const { profile, exerciseVideos, refreshVideos, isLoading } = useProfile();
  const navigate = useNavigate();
  
  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <User className="h-16 w-16 text-muted mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Profile Not Found</h2>
        <p className="text-muted-foreground mb-6">
          Please create your health profile first.
        </p>
        <Button onClick={() => navigate("/profile")}>
          Create Profile <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }
  
  const dietRecommendation = getDietRecommendation(profile);
  const workoutRecommendation = getWorkoutRecommendation(profile);
  const motivationalMessage = getMotivationalMessage(profile);
  const targetCalories = getTargetCalories(profile);
  
  const handleRefreshVideos = () => {
    refreshVideos();
    toast({
      title: "Refreshing videos",
      description: "Finding new workout videos for you..."
    });
  };
  
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Card className="overflow-hidden border-none shadow-lg">
        <div className={`bg-gradient-to-br from-primary to-accent p-6 text-white`}>
          <h1 className="text-2xl font-bold mb-2">Hi, {profile.name}!</h1>
          <p className="opacity-90">{motivationalMessage}</p>
          
          <div className="flex justify-between items-center mt-5">
            <div>
              <div className="text-sm opacity-80">Target Calories</div>
              <div className="text-2xl font-bold flex items-center gap-1">
                <Flame className="h-5 w-5" />
                {targetCalories} kcal/day
              </div>
            </div>
            
            <div>
              <div className="text-sm opacity-80">Current BMI</div>
              <div className="text-2xl font-bold">{profile.bmi?.toFixed(1)}</div>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-muted-foreground">Age</div>
              <div className="font-semibold">{profile.age} years</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Height</div>
              <div className="font-semibold">{profile.height} cm</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Weight</div>
              <div className="font-semibold">{profile.weight} kg</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <CardTitle>Diet Recommendations</CardTitle>
            </div>
            <CardDescription>Based on your goals and health profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">{dietRecommendation.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {dietRecommendation.description}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Recommended Foods:</h4>
              <ul className="space-y-2">
                {dietRecommendation.foods.map((food, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm">{food}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate("/diet")}
              >
                Go to Diet Log <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <DumbbellIcon className="h-5 w-5 text-primary" />
              <CardTitle>Workout Plan</CardTitle>
            </div>
            <CardDescription>Personalized activity recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">{workoutRecommendation.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {workoutRecommendation.description}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Recommended Activities:</h4>
              <ul className="space-y-2">
                {workoutRecommendation.exercises.map((exercise, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-secondary"></div>
                    <span className="text-sm">{exercise}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate("/workouts")}
              >
                View Workout Videos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Youtube className="h-5 w-5 text-primary" />
            <CardTitle>Recommended Videos</CardTitle>
          </div>
          <CardDescription>Exercise videos tailored to your goals</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : exerciseVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exerciseVideos.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative rounded-md overflow-hidden">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-auto object-cover aspect-video transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-medium truncate">
                    {video.title}
                  </h3>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center p-8">
              <Youtube className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-2" />
              <p>No workout videos found</p>
              <Button onClick={handleRefreshVideos} variant="outline" className="mt-4">
                Find Videos
              </Button>
            </div>
          )}
          
          {exerciseVideos.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Button onClick={handleRefreshVideos} variant="outline">
                Refresh Videos
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsView;
