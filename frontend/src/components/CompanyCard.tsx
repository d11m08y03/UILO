import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type CompanyCardProps = {
  name: string;
  tier: "Gold" | "Silver" | "Bronze"; // Tier types are kept as uppercase to match the data
  children?: React.ReactNode; 
};

const CompanyCard: React.FC<CompanyCardProps> = ({ name, tier }) => {
  // Map tier to corresponding border color
  const borderColor = {
    gold: "border-[#FFD700]",  // Gold tier
    silver: "border-[#C0C0C0]", // Silver tier
    bronze: "border-[#cd7f32]", // Bronze tier
  };

  return (
    <Card className={`border-l-4 ${borderColor[tier.toLowerCase() as keyof typeof borderColor]} h-20`}>
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default CompanyCard;
