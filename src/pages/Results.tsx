
import React from "react";
import ResultsView from "../components/ResultsView";
import { useProfile } from "../context/ProfileContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Trophy } from "lucide-react";

const Results: React.FC = () => {
  const { profile, dailyLogs } = useProfile();
  const navigate = useNavigate();

  // Redirect to diet page if no logs are present
  React.useEffect(() => {
    if (!profile) {
      navigate("/profile");
    } else if (dailyLogs.length === 0) {
      navigate("/diet");
    }
  }, [profile, dailyLogs, navigate]);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <CardTitle>Your Personalized Results</CardTitle>
          </div>
          <CardDescription>
            Step 3: Review your progress and get recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResultsView />
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
