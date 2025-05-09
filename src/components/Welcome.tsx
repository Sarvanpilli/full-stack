
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DumbbellIcon, Heart, Salad } from "lucide-react";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <DumbbellIcon className="h-12 w-12 text-primary animate-pulse-glow" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          DIE-ATE Planner
        </h1>
        <Heart className="h-12 w-12 text-accent animate-pulse-glow" />
      </div>
      
      <p className="text-center text-lg mb-8 max-w-md">
        Your personalized fitness and nutrition companion for a healthier lifestyle.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md border">
          <DumbbellIcon className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
          <p className="text-center text-muted-foreground">
            Monitor your fitness journey with personalized metrics
          </p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md border">
          <Heart className="h-10 w-10 text-secondary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Health Insights</h3>
          <p className="text-center text-muted-foreground">
            Get personalized recommendations based on your health profile
          </p>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md border">
          <Salad className="h-10 w-10 text-accent mb-4" />
          <h3 className="text-xl font-semibold mb-2">Diet Planning</h3>
          <p className="text-center text-muted-foreground">
            Discover meal plans tailored to your goals and health needs
          </p>
        </div>
      </div>
      
      <Button 
        size="lg" 
        onClick={() => navigate("/profile")}
        className="animate-pulse-glow"
      >
        Get Started
      </Button>
    </div>
  );
};

export default Welcome;
