import React from "react";
import dayjs from "dayjs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface TierTableProps {
  tier: string;
  otherStyles?: string;
  companies: {
    name: string;
    image: string;
    table: string;
    entry_at: string;
  }[];
  isLoading?: boolean;
  sortByTime?: boolean;
}

function TierTable({
  tier,
  companies,
  otherStyles,
  isLoading = false,
  sortByTime = true,
}: TierTableProps) {
  // Sort companies based on sortByTime flag
  const sortedCompanies = [...companies].sort((a, b) => {
    if (sortByTime) {
      return dayjs(a.entry_at).isAfter(dayjs(b.entry_at)) ? 1 : -1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const renderContent = () => {
    if (isLoading) {
      return sortedCompanies.map((_, index) => (
        <React.Fragment key={`skeleton-${index}`}>
          <div className="flex items-center space-x-4 mt-3 bg-white rounded-lg p-4">
            <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[32vw] bg-gray-400" />
              <Skeleton className="h-4 w-[30vw] bg-gray-400" />
            </div>
          </div>
          <Separator className="my-2 bg-transparent" />
        </React.Fragment>
      ));
    }

    return sortedCompanies.map((company) => (
      <React.Fragment key={company.name}>
        <Card className="w-full rounded-xl border-sm border-gray-100 shadow-md bg-background">
          <CardHeader>
            <div className="flex flex-row items-center">
              {/* <img
                src={company.image}
                alt={company.name}
                className="w-12 h-10 object-contain mr-4 rounded-full"
              /> */}
              {/* <div className="flex items-center justify-center text-center rounded-full w-12 h-12 bg-gray-400 font-bold text-white text-sm p-5 mr-2" >{company.name}</div> */}

              <CardTitle className="text-2xl flex-grow-0 font-regular text-gray-700">
                {company.name}
              </CardTitle>
              <div className="bg-gray-200 rounded-lg p-2 ml-auto flex items-center justify-center">
                <p className="text-md text-gray-700 font-semibold">
                  {company.table}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
        <Separator className="my-2 bg-transparent" />
      </React.Fragment>
    ));
  };

  return (
    <div className="bg-gray-100 rounded-lg h-[76vh] w-full mt-2 pt-8 flex-shrink-0">
      <h2
        className={`text-2xl md:text-4xl font-semibold leading-none flex justify-center ${otherStyles}`}
      >
        {tier}
      </h2>
      <ScrollArea className="h-[65vh] w-[39vw] pt-8 pb-3 my-auto rounded-xl mx-auto">
        <div className="bg-gray-100">
          <div className="flex flex-col items-center">{renderContent()}</div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default TierTable;
