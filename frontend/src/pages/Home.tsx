import { Button } from "@/components/ui/button";
import axios from "axios";
import { MapPin, Phone, Mail, Camera } from "lucide-react";
import CompanyCard from "@/components/CompanyCard";
import backgroundImg from "../assets/images/UIUILO.png";
import uomLogo from "../assets/images/uomLogo.png";
import { useEffect, useState } from "react";
import picture1 from "../assets/images/gallery/Gallery1.jpg";
import picture2 from "../assets/images/gallery/Gallery2.jpg";
import picture3 from "../assets/images/gallery/Gallery3.jpg";
import picture4 from "../assets/images/gallery/Gallery4.jpg";
import picture5 from "../assets/images/gallery/Gallery13.jpg";
import picture6 from "../assets/images/gallery/Gallery6.jpg";
import picture7 from "../assets/images/gallery/Gallery7.jpg";
import picture8 from "../assets/images/gallery/Gallery8.jpg";
import picture9 from "../assets/images/gallery/Gallery9.jpg";
import picture10 from "../assets/images/gallery/Gallery10.jpg";
import picture11 from "../assets/images/gallery/Gallery14.jpg";
import picture12 from "../assets/images/gallery/Gallery12.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays } from "lucide-react";

import logo from "../assets/images/UILO_logo.png";
import powaSetup from "../assets/images/powa_setup.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  picture1,
  picture2,
  picture11,
  picture3,
  picture4,
  picture5,
  picture6,
  picture7,
  picture8,
  picture9,
  picture10,
  picture12,
];

const handleScrollToCompanies = () => {
  const element = document.getElementById("participating-companies");
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  } else {
    console.error("Error");
  }
};
const handleScrollToEvent = () => {
  const element = document.getElementById("eventSchedule");
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  } else {
    console.error("Error");
  }
};
const handleScrollToMap = () => {
  const element = document.getElementById("floor-map");
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  } else {
    console.error("Error");
  }
};
const handleScrollToContact = () => {
  const element = document.getElementById("contact");
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  } else {
    console.error("Error.");
  }
};
const handleScrollToGallery = () => {
  const element = document.getElementById("gallery");
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  } else {
    console.error("Error");
  }
};

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
            08:00 am
          </time>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            The industry recruitment event kicks off today, bringing together
            top talent and leading companies for exciting opportunities and
            connections.
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
            As the industry recruitment event draws to a close, the stage is set
            for new partnerships and exciting career paths to unfold.
          </p>
        </div>
      </li>
    </ol>
  );
};

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="lg:pl-2 xl:pl-2">
        <div className="flex justify-between p-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-20 w-28" />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          <nav
            className={`${
              menuOpen ? "block" : "hidden"
            } absolute top-16 right-4 md:static md:flex md:space-x-4 text-gray-800 bg-white md:bg-transparent md:p-0 shadow-lg md:shadow-none rounded-lg`}
          >
            <ul className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
              <li>
                <Button
                  onClick={handleScrollToEvent}
                  className="lg:text-white xl:text-white"
                  variant="link"
                >
                  Event Schedule
                </Button>
              </li>
              <li>
                <Button
                  onClick={handleScrollToCompanies}
                  className="lg:text-white xl:text-white"
                  variant="link"
                >
                  Participating Companies
                </Button>
              </li>
              <li>
                <Button
                  onClick={handleScrollToMap}
                  className="lg:text-white xl:text-white"
                  variant="link"
                >
                  Floor Map
                </Button>
              </li>
              <li>
                <Button
                  onClick={handleScrollToGallery}
                  className="lg:text-white xl:text-white"
                  variant="link"
                >
                  Gallery
                </Button>
              </li>
              <li>
                <Button
                  onClick={handleScrollToContact}
                  className="lg:text-white xl:text-white"
                  variant="link"
                >
                  Contact Us
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        <div
          id="heroContent"
          className="flex items-center justify-center text-center text-white px-6 md:px-12 h-full"
        >
          <div className="flex flex-col items-center">
            <img
              className="lg:w-96 lg:h-112 w-36 h-30 shadow-lg"
              src={uomLogo}
              alt="Logo of the University of Mauritius"
            />
            <h1 className="lg:text-4xl text-blue-500 mt-0">
              INDUSTRY RECRUITMENT <span className="text-white">2025</span>
            </h1>
            <h2 className="lg:text-2xl text-sm">
              5-6 FEBRUARY 2025 -{" "}
              <span className="text-blue-500 lg:text-2xl text-sm">
                POWA, UNIVERSITY OF MAURITIUS
              </span>
            </h2>
          </div>
        </div>
        <div>
          <h1 className="mt-6 lg:mt-12 lg:text-2xl lg:pl-12 pl-3 font-extrabold-900 mb-2">
            ABOUT THE EVENT
          </h1>
          <h2 className="lg:w-3/5 pl-12 lg:text-l text-sm lg:pl-12 pl-3">
            The career fair provides students with a valuable opportunity to
            explore potential career paths, connect with employers, and gather
            information about various industries. It serves as a platform for
            students to network, seek internship or job opportunities, and gain
            insights into the current job market. The event typically features a
            diverse range of companies and organizations eager to engage with
            students and discuss potential career prospects. Attending the
            career fair is a proactive step toward building a successful and
            fulfilling professional future.
          </h2>
        </div>
      </div>
    </div>
  );
};

const EventSchedule = () => {
  return (
    <div id="eventSchedule" className="lg:pl-2 xl:pl-2">
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

interface Company {
  id: number;
  name: string;
  category: string;
  timestamp: string;
  stand: string;
}

const ParticipatingCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/companies");
        
        if (Array.isArray(response.data.companies)) {
          setCompanies(response.data.companies);
        } else {
          setError("Unexpected data format");
        }
      } catch (err) {
        setError("Failed to fetch companies data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="lg:pl-2 xl:pl-2" id="participating-companies">
      <div className="flex justify-between">
        <p className="text-3xl font-bold mb-5">Participating Companies</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((company, index) => (
          <CompanyCard key={index} name={company.name}>
            <div className="flex space-x-3">
              <p>{company.stand}</p>
            </div>
          </CompanyCard>
        ))}
      </div>
    </div>
  );
};

const Floormap = () => {
  return (
    <div className="lg:pl-2 xl:pl-2" id="floor-map">
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
    <div id="gallery" className="lg:pl-2 xl:pl-2">
      <div className="flex justify-between mb-5 ">
        <p className="text-3xl font-bold">Gallery</p>
        <Camera />
      </div>
      <Carousel opts={{ align: "start" }} className="transform scale-90">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img
                      src={image}
                      alt={`carousel-image-${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

const Contact: React.FC = () => {
  return (
    <div id="contact">
      <div className="flex justify-between">
        <p className="text-3xl font-bold mb-5">Contact Us</p>
        <CalendarDays />
      </div>

      {/* Contact Details */}
      <div className="flex flex-col lg:flex-row justify-around items-center bg-gray-100 p-6 rounded-2xl shadow-md space-y-6 lg:space-y-0">
        {/* Location */}
        <div className="flex items-center space-x-4">
          <MapPin className="text-blue-600 w-6 h-6" />
          <div>
            <h3 className="font-semibold text-lg">Location</h3>
            <p className="text-gray-600">
              Ground Floor Ex-CPDL Building, University of Mauritius
            </p>
          </div>
        </div>
        <div className="hidden lg:block border-l border-gray-300 h-16"></div>

        {/* Phone */}
        <div className="flex items-center space-x-4">
          <Phone className="text-green-600 w-6 h-6" />
          <div>
            <h3 className="font-semibold text-lg">Phone</h3>
            {/* Use tel: for phone numbers */}
            <a
              href="tel:+2304037644"
              className="text-gray-600 hover:text-green-600"
            >
              +230 403 7644
            </a>
          </div>
        </div>
        <div className="hidden lg:block border-l border-gray-300 h-16"></div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <Mail className="text-red-600 w-6 h-6" />
          <div>
            <h3 className="font-semibold text-lg">Email</h3>
            {/* Use mailto: for email */}
            <a
              href="mailto:info.uilo@uom.ac.mu"
              className="text-gray-600 hover:text-red-600"
            >
              info.uilo@uom.ac.mu
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
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
      <Separator className="mt-8 mb-8" />
    </div>
  );
};

export default Home;

// Container before - container sm:max-w-xl mx-auto max-w-xs lg:max-w-4xl md:max-w-2xl xl:max-w-6xl
