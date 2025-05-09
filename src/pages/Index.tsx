
import React from "react";
import { useProfile } from "../context/ProfileContext";
import Welcome from "../components/Welcome";
import ResultsView from "../components/ResultsView";

const Index: React.FC = () => {
  const { profile } = useProfile();

  return (
    <div>
      {profile ? <ResultsView /> : <Welcome />}
    </div>
  );
};

export default Index;
