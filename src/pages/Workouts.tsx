
import React from "react";
import WorkoutVideos from "../components/WorkoutVideos";
import { useProfile } from "../context/ProfileContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { DumbbellIcon } from "lucide-react";

const Workouts: React.FC = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();

  // Redirect to profile page if profile is not set up
  React.useEffect(() => {
    if (!profile) {
      navigate("/profile");
    }
  }, [profile, navigate]);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <DumbbellIcon className="h-5 w-5 text-primary" />
            <CardTitle>Recommended Workouts</CardTitle>
          </div>
          <CardDescription>
            Exercise videos tailored to your goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WorkoutVideos />
        </CardContent>
      </Card>
    </div>
  );
};

export default Workouts;
