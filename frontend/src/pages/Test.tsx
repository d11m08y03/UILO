import { Button } from "@/components/ui/button";
import logo from "../assets/images/UILO_logo.png"
import CompanyCard from "@/components/CompanyCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Building2,
  CalendarDays,
  Camera,
  Contact2,
  Map,
} from "lucide-react";

import accentureLogo from "../assets/images/accenture.png";
import powaSetup from "../assets/images/powa_setup.jpg";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import photo1 from "../assets/images/gallery/a1.jpg";
import photo2 from "../assets/images/gallery/f1.jpg";
import photo3 from "../assets/images/gallery/f2.jpg";
import photo4 from "../assets/images/gallery/f3.jpg";
import photo5 from "../assets/images/gallery/f4.jpg";

const TimeLine = () => {
  return (
    <ol className="items-center sm:flex">
      <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
          <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
            <svg
              className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div className="mt-3 sm:pe-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Start Of Event
          </h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            09:00 am
          </time>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Get started with dozens of web components and interactive elements.
          </p>
        </div>
      </li>
      <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
          <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
            <svg
              className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div className="mt-3 sm:pe-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            End Of Event 
          </h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            04:00 pm
          </time>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Get started with dozens of web components and interactive elements.
          </p>
        </div>
      </li>
    </ol>
  );
};

const Hero = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
         <p className="text-5xl font-bold">2025 Industrial Recruitment</p>
        <img className="h-12 ml-4" src={logo} alt="Logo" />
      </div>
     
      <p className="mt-6">
        The career fair offers students a chance to explore career paths,
        connect with employers, and learn about various industries. It provides
        networking opportunities for internships and jobs, along with insights
        into the job market. Attending is a proactive step toward building a
        successful professional future.
      </p>
      
      <div className="flex space-x-3 mt-6">
        <Button>
          <Building /> Companies
        </Button>

        <Button>
          <Map /> Floor Map
        </Button>
      </div>
    </div>
  );
};

const EventSchedule = () => {
  return (
    <div>
      <div className="flex justify-between ">
        <p className="text-3xl font-bold mb-5">Event Schedule</p>
        <CalendarDays />
      </div>
      <Tabs defaultValue="account" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Day 1</TabsTrigger>
          <TabsTrigger value="password">Day 2</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="">
            <CardHeader>
              <CardTitle className="flex space-x-5">
                <p className="text-lg">5th February 2025</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TimeLine />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle className="flex space-x-5">
                <p className="text-lg">6th February 2025</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TimeLine />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ParticipatingCompanies = () => {
  return (
    <div className="">
      <div className="flex justify-between ">
        <p className="text-3xl font-bold mb-5">Participating Companies</p>
        <Building2 />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {companies.map((company, index) => (
          <CompanyCard
            key={index}
            name={company.name}
            logo={company.logo} field={[]}          >
            <div className="flex space-x-3">
              {company.field.map((field, idx) => (
                <Badge key={idx} className="text-xs mt-10">{field}</Badge>
              ))}
            </div>
          </CompanyCard>
        ))}
      </div>
    </div>
  );
};


const Floormap = () => {
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-3xl font-bold mb-5">Floor Map</p>
        <CalendarDays />
      </div>
      <img src={powaSetup} alt="Powa setup" className="w-full" />
    </div>
  );
};

const Gallery = () => {
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-3xl font-bold mb-5">Gallery</p>
        <Camera />
      </div>

      <div>
        <Carousel>
          <CarouselContent>
            <CarouselItem className="flex space-x-3 justify-center">
              <img src={photo1} />
              <img src={photo1} />
              <img src={photo1} />
              <img src={photo1} />
            </CarouselItem>
            <CarouselItem>
              <img src={photo2} />
            </CarouselItem>
            <CarouselItem>
              <img src={photo3} />
            </CarouselItem>
            <CarouselItem>
              <img src={photo4} />
            </CarouselItem>
            <CarouselItem>
              <img src={photo5} />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-3xl font-bold mb-3">Contact Us</p>
        <Contact2 />
      </div>
    </div>
  );
};

const Test = () => {
  return (
    <div>
      <Hero />
      <Separator className="mt-8 mb-8" />
      <EventSchedule />
      <Separator className="mt-8 mb-8" />
      <ParticipatingCompanies />
      <Separator className="mt-8 mb-8" />
      <Floormap />
      <Separator className="mt-8 mb-8" />
      <Gallery />
      <Separator className="mt-8 mb-8" />
      <Contact />
    </div>
  );
};

export default Test;

const companies = [
  { name: "Mauritius Union Assurance (MUA)", field: ["Insurance", "Finance"], logo: logo },
  { name: "SICOM", field: ["Insurance"], logo: accentureLogo },
  { name: "VISTRA", field: ["Corporate Services"], logo: accentureLogo },
  { name: "Aspen Global Incorporated", field: ["Pharmaceuticals"], logo: accentureLogo },
  { name: "RAPP INDIAN OCEAN", field: ["Marketing"], logo: accentureLogo },
  { name: "Aberdeen Operations Ltd", field: ["Finance"], logo: accentureLogo },
  { name: "IQ EQ", field: ["Corporate Services"], logo: accentureLogo },
  { name: "Bolt Talent", field: ["Recruitment"], logo: accentureLogo },
  { name: "Axis", field: ["Corporate Services", "Finance"], logo: accentureLogo },
  { name: "BDO Solutions", field: ["Accounting"], logo: accentureLogo },
  { name: "Business at Work (BAW)", field: ["Consulting"], logo: accentureLogo },
  { name: "Spoon Consulting Limited", field: ["IT Consulting"], logo: accentureLogo },
  { name: "Accenture", field: ["IT Consulting"], logo: accentureLogo },
  { name: "2Cana Solutions", field: ["Software Development"], logo: accentureLogo },
  { name: "BOURBON OFFSHORE GREENMAR", field: ["Maritime Services"], logo: accentureLogo },
  { name: "IPCS", field: ["Consulting"], logo: accentureLogo },
  { name: "KPMG", field: ["Accounting", "Consulting"], logo: accentureLogo },
  { name: "Deloitte", field: ["Accounting", "Consulting"], logo: accentureLogo},
  { name: "TRIDENT TRUST COMPANY LIMITED", field: ["Trust Services"], logo: accentureLogo },
  { name: "Rogers Capital", field: ["Finance", "Consulting"], logo: accentureLogo},
  { name: "Currimjee Jeewanjee Ltd", field: ["Conglomerate", "Finance"], logo: accentureLogo },
  { name: "CIEL TEXTILE", field: ["Textiles"], logo: accentureLogo},
  { name: "Comfort EasyFront", field: ["Consumer Goods"], logo: accentureLogo},
  { name: "FRCI", field: ["IT Services"], logo: accentureLogo},
  { name: "AVIPRO", field: ["Agriculture"], logo: accentureLogo },
  { name: "DTOS", field: ["Corporate Services"], logo: accentureLogo },
  { name: "Checkout", field: ["Payments", "Finance"], logo: accentureLogo},
  { name: "Information Technology ELCA Ltd", field: ["IT Services"], logo: accentureLogo },
  { name: "HR CAPITALS LIMITED", field: ["Recruitment"], logo: accentureLogo },
  { name: "DayForce (Mauritius) Ltd", field: ["Software Solutions"], logo: accentureLogo },
  { name: "HFM Markets", field: ["Finance"], logo: accentureLogo },
  { name: "ARUP (Mauritius) Ltd", field: ["Engineering"], logo: accentureLogo }
];
