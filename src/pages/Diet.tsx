
import React from "react";
import DietLog from "../components/DietLog";
import { useProfile } from "../context/ProfileContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

const Diet: React.FC = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();

  // Redirect to profile page if profile is not set up
  React.useEffect(() => {
    if (!profile) {
      navigate("/profile");
    }
  }, [profile, navigate]);

  const handleContinue = () => {
    navigate("/results");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <CardTitle>Log Your Diet</CardTitle>
          </div>
          <CardDescription>
            Step 2: Track what you eat to get personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DietLog />
          
          <div className="flex justify-end mt-6">
            <Button onClick={handleContinue} className="gap-2">
              Continue to Results <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Diet;
