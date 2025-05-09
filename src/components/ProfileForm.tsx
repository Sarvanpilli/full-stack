
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { Gender, Goal, HealthCondition } from "../types";
import { calculateBMI, getBMICategory } from "../utils/health";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, UserIcon } from "lucide-react";

const ProfileForm: React.FC = () => {
  const { profile, createProfile, updateProfile } = useProfile();
  const navigate = useNavigate();
  
  const [name, setName] = useState(profile?.name || "");
  const [age, setAge] = useState<number | "">(profile?.age || "");
  const [gender, setGender] = useState<Gender>(profile?.gender || "other");
  const [height, setHeight] = useState<number | "">(profile?.height || "");
  const [weight, setWeight] = useState<number | "">(profile?.weight || "");
  const [goal, setGoal] = useState<Goal>(profile?.goal || "maintenance");
  const [healthConditions, setHealthConditions] = useState<HealthCondition[]>(
    profile?.healthConditions || []
  );
  
  const handleHealthConditionChange = (condition: HealthCondition) => {
    if (condition === "none") {
      setHealthConditions(["none"]);
      return;
    }
    
    // If selecting any condition other than "none", remove "none" from the array
    const newConditions = healthConditions.includes(condition)
      ? healthConditions.filter((c) => c !== condition)
      : [...healthConditions.filter((c) => c !== "none"), condition];
    
    setHealthConditions(newConditions.length ? newConditions : ["none"]);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !age || !height || !weight) {
      return;
    }
    
    const profileData = {
      name,
      age: Number(age),
      gender,
      height: Number(height),
      weight: Number(weight),
      goal,
      healthConditions,
    };
    
    if (profile) {
      updateProfile(profileData);
    } else {
      createProfile(profileData);
    }
    
    navigate("/results");
  };
  
  // Calculate BMI for preview as the user inputs data
  const previewBMI = height && weight 
    ? calculateBMI(Number(height), Number(weight))
    : null;
  
  const previewBMICategory = previewBMI 
    ? getBMICategory(previewBMI)
    : null;

  const getBMICategoryText = (category: string | null) => {
    switch (category) {
      case 'underweight':
        return { text: 'Underweight', color: 'text-info' };
      case 'normal':
        return { text: 'Normal', color: 'text-success' };
      case 'overweight':
        return { text: 'Overweight', color: 'text-warning' };
      case 'obese':
        return { text: 'Obese', color: 'text-destructive' };
      case 'severelyObese':
        return { text: 'Severely Obese', color: 'text-destructive' };
      default:
        return { text: '—', color: 'text-muted-foreground' };
    }
  };
  
  const categoryInfo = getBMICategoryText(previewBMICategory);
  
  return (
    <Card className="w-full max-w-lg mx-auto animate-fade-in shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-primary" />
          <CardTitle>Your Health Profile</CardTitle>
        </div>
        <CardDescription>
          Enter your details to get personalized health recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="30"
                  min={10}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Gender</Label>
                <RadioGroup
                  value={gender}
                  onValueChange={(value) => setGender(value as Gender)}
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  min={50}
                  max={250}
                  value={height}
                  onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  min={20}
                  max={300}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
                  required
                />
              </div>
            </div>
            
            {height && weight && (
              <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                <span className="text-sm">Current BMI:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{previewBMI?.toFixed(1)}</span>
                  <span className={`text-sm ${categoryInfo.color}`}>
                    ({categoryInfo.text})
                  </span>
                </div>
              </div>
            )}
            
            <Separator className="my-4" />
            
            <div className="grid gap-2">
              <Label>Your Goal</Label>
              <RadioGroup
                value={goal}
                onValueChange={(value) => setGoal(value as Goal)}
                className="grid gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weightLoss" id="weightLoss" />
                  <Label htmlFor="weightLoss">Weight Loss</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintenance" id="maintenance" />
                  <Label htmlFor="maintenance">Maintenance / Health</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="muscleGain" id="muscleGain" />
                  <Label htmlFor="muscleGain">Muscle Gain</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid gap-2">
              <Label>Health Conditions (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="none"
                    checked={healthConditions.includes("none")}
                    onCheckedChange={() => handleHealthConditionChange("none")}
                  />
                  <Label htmlFor="none">None</Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="diabetes"
                    checked={healthConditions.includes("diabetes")}
                    onCheckedChange={() => handleHealthConditionChange("diabetes")}
                    disabled={healthConditions.includes("none")}
                  />
                  <Label htmlFor="diabetes">Diabetes</Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="hypertension"
                    checked={healthConditions.includes("hypertension")}
                    onCheckedChange={() => handleHealthConditionChange("hypertension")}
                    disabled={healthConditions.includes("none")}
                  />
                  <Label htmlFor="hypertension">Hypertension</Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="thyroid"
                    checked={healthConditions.includes("thyroid")}
                    onCheckedChange={() => handleHealthConditionChange("thyroid")}
                    disabled={healthConditions.includes("none")}
                  />
                  <Label htmlFor="thyroid">Thyroid Issues</Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="heart"
                    checked={healthConditions.includes("heart")}
                    onCheckedChange={() => handleHealthConditionChange("heart")}
                    disabled={healthConditions.includes("none")}
                  />
                  <Label htmlFor="heart">Heart Condition</Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="other"
                    checked={healthConditions.includes("other")}
                    onCheckedChange={() => handleHealthConditionChange("other")}
                    disabled={healthConditions.includes("none")}
                  />
                  <Label htmlFor="other">Other</Label>
                </div>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            {profile ? "Update Profile" : "Create Profile"} 
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
