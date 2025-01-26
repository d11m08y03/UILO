import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CompanyCardProps = {
  name: string;
  logo: string;
  field: string[];
  children?: React.ReactNode; 
};

const CompanyCard: React.FC<CompanyCardProps> = ({ name, logo, field, children }) => {
  return (
    <Card className=""> 
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={logo} alt={name} className="w-auto h-[20vh] mx-auto" /> 
        <div>{children}</div> 
        <div>
          {field.map((item, index) => (
            <Badge key={index}>{item}</Badge> 
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
