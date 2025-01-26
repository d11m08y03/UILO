import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Company } from "../types"
interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Card className="w-[320px] h-[420px] lg:mt-10 mt-2">

      <img src={company.logo} alt={company.name} className="w-32 h-48 mx-auto mt-4 object-contain" />
      <Separator />
      <CardHeader>
        <CardTitle className="relative mx-auto">{company.name}</CardTitle>
        <CardDescription className="h-20 overflow-y-auto">{company.description}</CardDescription>
        {/* <Separator /> */}
      </CardHeader>
      <CardFooter className=" flex justify-center">
      <Button className="mx-auto bg-blue-500 hover:bg-white hover:text-blue-500" >
  <a href={company.detailsLink} className="block">
    See more details
  </a>
</Button>

      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
