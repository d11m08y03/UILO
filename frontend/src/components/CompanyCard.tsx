import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CompanyCardProps = {
  name: string;
  children?: React.ReactNode; 
};

const CompanyCard: React.FC<CompanyCardProps> = ({ name }) => {
  return (
    <Card className="border-l-4 border-gray-800"> 
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default CompanyCard;
