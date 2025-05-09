
import React from "react";
import { useProfile } from "../context/ProfileContext";
import { getWorkoutRecommendation } from "../utils/health";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Youtube, DumbbellIcon, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const WorkoutVideos: React.FC = () => {
  const { profile, exerciseVideos, refreshVideos, isLoading } = useProfile();

  if (!profile) {
    return (
      <div className="text-center p-12">
        <p>Please create a profile to get workout recommendations.</p>
      </div>
    );
  }

  const workoutRecommendation = getWorkoutRecommendation(profile);

  const handleRefreshVideos = () => {
    refreshVideos();
    toast({
      title: "Refreshing videos",
      description: "Finding new workout videos for you..."
    });
  };

  // Function to create an embedded YouTube player
  const getYoutubeEmbed = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <DumbbellIcon className="h-5 w-5 text-primary" />
            <CardTitle>Your Workout Plan</CardTitle>
          </div>
          <CardDescription>
            Personalized exercise recommendations based on your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg">{workoutRecommendation.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {workoutRecommendation.description}
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="text-sm font-medium mb-2">Recommended Activities:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {workoutRecommendation.exercises.map((exercise, index) => (
                  <li key={index} className="flex items-center gap-2 bg-muted p-3 rounded-md">
                    <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      <DumbbellIcon className="h-4 w-4 text-secondary" />
                    </div>
                    <span>{exercise}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Youtube className="h-5 w-5 text-primary" />
            <CardTitle>Workout Videos</CardTitle>
          </div>
          <CardDescription>
            Watch these videos to guide your workouts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : exerciseVideos.length > 0 ? (
            <div className="space-y-8">
              {exerciseVideos.map((video) => (
                <div key={video.id} className="space-y-2">
                  <h3 className="font-medium">{video.title}</h3>
                  <div className="aspect-video w-full">
                    <iframe
                      src={getYoutubeEmbed(video.id)}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-md"
                    ></iframe>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center pt-4">
                <Button onClick={handleRefreshVideos} variant="outline">
                  Find More Videos
                </Button>
              </div>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutVideos;
