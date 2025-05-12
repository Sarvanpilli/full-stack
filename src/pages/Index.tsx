
import React from "react";
import { useProfile } from "../context/ProfileContext";
import Welcome from "../components/Welcome";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Heart, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate(profile ? "/diet" : "/profile");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Welcome />
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Your Health Journey</CardTitle>
          <CardDescription>Follow these steps to achieve your goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Step 1: Complete Your Profile</h3>
                <p className="text-muted-foreground text-sm">
                  Add your details so we can personalize your experience
                </p>
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate("/profile")}
                    className={profile ? "bg-muted text-muted-foreground hover:text-foreground" : ""}
                  >
                    {profile ? "Profile Complete ✓" : "Set Up Profile"}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Step 2: Log Your Diet</h3>
                <p className="text-muted-foreground text-sm">
                  Track what you eat to get personalized recommendations
                </p>
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate("/diet")}
                    disabled={!profile}
                  >
                    Log Diet
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Step 3: View Your Results</h3>
                <p className="text-muted-foreground text-sm">
                  Get customized recommendations based on your profile and diet
                </p>
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate("/results")}
                    disabled={!profile}
                  >
                    See Results
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStartJourney} className="w-full gap-2">
            {profile ? "Continue Your Journey" : "Start Your Journey"} <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
