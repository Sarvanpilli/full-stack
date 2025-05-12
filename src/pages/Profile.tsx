
import React from "react";
import ProfileForm from "../components/ProfileForm";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User } from "lucide-react";

const Profile: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Your Profile</CardTitle>
          </div>
          <CardDescription>
            Step 1: Tell us about yourself to get personalized recommendations
          </CardDescription>
        </CardHeader>
        <ProfileForm />
      </Card>
    </div>
  );
};

export default Profile;
