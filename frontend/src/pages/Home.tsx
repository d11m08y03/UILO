import { MapPin, Phone, Mail, Camera } from "lucide-react";
import CompanyCard from "@/components/CompanyCard";
import picture1 from "../assets/images/gallery/Gallery1.jpg";
import picture2 from "../assets/images/gallery/Gallery2.jpg";
import picture3 from "../assets/images/gallery/Gallery3.jpg";
import picture4 from "../assets/images/gallery/Gallery4.jpg";
import picture5 from "../assets/images/gallery/Gallery13.jpg";
import picture7 from "../assets/images/gallery/Gallery7.jpg";
import picture8 from "../assets/images/gallery/Gallery8.jpg";
import picture9 from "../assets/images/gallery/Gallery9.jpg";
import picture10 from "../assets/images/gallery/Gallery10.jpg";
import picture11 from "../assets/images/gallery/Gallery14.jpg";
import picture12 from "../assets/images/gallery/Gallery12.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, CalendarDays, Map } from "lucide-react";
import companies from "@/lib/companies";
import logo from "../assets/images/UILO_logo.png";
import powaSetup from "../assets/images/SetUpPowa.jpg";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion"; 
import PlayButton from "@/components/PlayBtn";
import uomLogo from "../assets/images/uomLogo.png";
import backgroundImg from "../assets/images/output-onlinepngtools.png";

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
            09:00 am
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
  const menuRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="h-full min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="lg:pl-2 xl:pl-2">
        {/* Header */}
        <div className="flex justify-between items-center p-4 relative">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img src={logo} alt="Logo" className="h-14 w-24 md:h-16 md:w-28 lg:h-20 lg:w-32" />
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              ref={buttonRef}
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
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav
            ref={menuRef}
            className={`${
              menuOpen ? "block" : "hidden"
            } absolute top-14 left-0 w-full bg-white shadow-md md:shadow-none md:static md:flex md:space-x-6 md:bg-transparent md:block justify-end`}
          >
         <div className="flex justify-start flex-col">
  <ul className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 text-center">
    {[
      { label: "Event Schedule", onClick: handleScrollToEvent },
      { label: "Participating Companies", onClick: handleScrollToCompanies },
      { label: "Floor Map", onClick: handleScrollToMap },
      { label: "Gallery", onClick: handleScrollToGallery },
      { label: "Contact Us", onClick: handleScrollToContact },
    ].map((item, index) => (
      <li key={index}>
        <button
          onClick={item.onClick}
          className="text-black md:text-white text-sm md:text-lg hover:text-blue-500 ml-5"
        >
          {item.label}
        </button>
      </li>
    ))}
  </ul>
</div>

          </nav>
        </div>

        {/* Hero Content */}
        <div
          id="heroContent"
          className="flex flex-col items-center justify-center text-center text-white px-4 md:px-8 flex-grow gap-y-4"
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* UOM Logo */}
            <img
  className="w-48 h-auto max-w-[90%] md:w-56 lg:w-72"
  src={uomLogo}
  alt="University of Mauritius Logo"
/>

            {/* Event Title */}
            <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-blue-500 mt-3">
              INDUSTRY RECRUITMENT <span className="text-white">2025</span>
            </h1>
            {/* Date & Location */}
            <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold">
              5-6 FEBRUARY 2025 -{" "}
              <span className="text-blue-600 md:text-lg lg:text-xl">
                POWA, UNIVERSITY OF MAURITIUS
              </span>
            </h2>

            <PlayButton />
          </motion.div>
        </div>

        {/* About the Event */}
        <motion.div
          className="p-6 text-center md:text-left"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-blue-500 font-bold mb-4">
            ABOUT THE EVENT
          </h1>
          <p className="max-w-3xl mx-auto md:mx-0 text-sm sm:text-md md:text-lg lg:text-xl text-blue-600 leading-relaxed">
            The career fair offers students a chance to explore career paths, connect
            with employers, and learn about various industries. It's a platform for
            networking, seeking internships or jobs, and understanding the job market.
            The event features a diverse range of companies eager to discuss career
            prospects. Attending is a proactive step toward a successful professional
            future.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const tabAnimation = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const EventSchedule = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div id="eventSchedule" ref={ref} className="lg:pl-2 xl:pl-2">
      {/* Title Section - Animates When in View */}
      <motion.div
        className="flex items-center justify-center space-x-2 mb-5"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <p className="text-xl lg:text-3xl xl:text-3xl font-bold">Event Schedule</p>
        <motion.div
          animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
        >
          <CalendarDays className="mb-4 h-10 w-10" />
        </motion.div>
      </motion.div>

      {/* Tabs Section */}
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2 bg-[#dcf5fd]">
          <TabsTrigger value="account">Day 1</TabsTrigger>
          <TabsTrigger value="password">Day 2</TabsTrigger>
        </TabsList>

        {/* Day 1 Content - Scroll Reveal */}
        <TabsContent value="account">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={tabAnimation}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex space-x-5 p-2">
                  <p className="text-lg">5th February 2025</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TimeLine />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Day 2 Content - Scroll Reveal */}
        <TabsContent value="password">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={tabAnimation}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex space-x-5 p-2">
                  <p className="text-lg">6th February 2025</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TimeLine />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};







const ParticipatingCompanies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="lg:p-2 xl:p-2 bg-[#dcf5fd]" id="participating-companies">
 <motion.div
  className="flex justify-center items-center space-x-3 mb-5"
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ delay: 0.3, duration: 0.8 }}
>
  <p className="text-xl lg:text-3xl xl:text-3xl font-bold">Participating Companies</p>
  <motion.div
    animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
  >
    <Building className="w-10 h-10" />
  </motion.div>
</motion.div>


      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 m-2"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.5, duration: 0.8 },
          },
        }}
      >
        {companies.map((company, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.2, duration: 0.4 },
              },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-100 ease-in-out"
          >
            <CompanyCard
              name={company.name}
              tier={company.tier}  // Correctly passing tier
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};



const Floormap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      id="floor-map"
      ref={ref}
      className="border rounded-lg p-4 bg-[#dcf5fd] lg:pl-6 xl:pl-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Title and Map Icon Section */}
      <motion.div
        className="flex items-center justify-center space-x-3 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="text-3xl font-bold">Floor Map</p>
        <motion.div
          animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
        >
          <Map className="w-10 h-10" />
        </motion.div>
      </motion.div>

      {/* Image Section with Animation */}
      <motion.img
        src={powaSetup}
        alt="Powa setup"
        className="w-full rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
      />
    </motion.div>
  );
};




const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      id="gallery"
      ref={ref}
      className="lg:p-4 xl:p-6 bg-[#dcf5fd]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Title Section */}
      <motion.div
        className="flex items-center justify-center mb-5 space-x-3"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="text-xl lg:text-3xl xl:text-3xl font-bold">Gallery</p>
        <motion.div
          animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
        >
          <Camera className="w-10 h-10" />
        </motion.div>
      </motion.div>

      {/* Carousel with Image Animations */}
      <motion.div
        className="transform scale-100 lg:scale-105"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <Carousel opts={{ align: "start" }} className="transform scale-95">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <motion.img
                        src={image}
                        alt={`carousel-image-${index + 1}`}
                        className="w-full h-full object-cover rounded-md shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
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
      </motion.div>
    </motion.div>
  );
};



const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      id="contact"
      className="bg-[#dcf5fd] border border-white p-6 rounded-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center justify-center mb-5 space-x-3"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="text-xl lg:text-3xl xl:text-3xl font-bold">Contact Us</p>
        <motion.div
          animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
        >
          <CalendarDays className="w-10 h-10" />
        </motion.div>
      </motion.div>
      <motion.div
        className="flex flex-col lg:flex-row justify-around items-center bg-[#dcf5fd] p-6 rounded-2xl shadow-md space-y-6 lg:space-y-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <motion.div
          className="flex flex-col lg:flex-row items-center space-x-4 lg:space-x-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={isInView ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            <MapPin className="text-blue-600 h-10 w-10" />
          </motion.div>
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-lg">Location</h3>
            <p className="text-gray-600">
              Ground Floor Ex-CPDL Building, University of Mauritius
            </p>
          </div>
        </motion.div>

        {/* Divider on large screens */}
        <div className="hidden lg:block border-l border-gray-300 h-16"></div>

        {/* Phone */}
        <motion.div
          className="flex flex-col lg:flex-row items-center space-x-4 lg:space-x-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={isInView ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            <Phone className="text-green-600 w-6 h-6" />
          </motion.div>
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-lg">Phone</h3>
            <a
              href="tel:+2304037644"
              className="text-gray-600 hover:text-green-600 transition-colors duration-300"
            >
              +230 403 7644
            </a>
          </div>
        </motion.div>

        {/* Divider on large screens */}
        <div className="hidden lg:block border-l border-gray-300 h-16"></div>

        {/* Email */}
        <motion.div
          className="flex flex-col lg:flex-row items-center space-x-4 lg:space-x-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={isInView ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mail className="text-red-600 w-6 h-6" />
          </motion.div>
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-lg">Email</h3>
            <a
              href="mailto:info.uilo@uom.ac.mu"
              className="text-gray-600 hover:text-red-600 transition-colors duration-300"
            >
              info.uilo@uom.ac.mu
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


const Footer=()=>{
  return (
    <div className="flex flex-col justify-center items-center h-32 bg-[#dcf5fd]">
      <h1>© Copyright UILO. All Rights Reserved</h1>
      <h2 className="text-sm">Designed & Developed by <span className="text-blue-500">UoM Computer Club</span></h2>
    </div>
  );
}


const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      {/* <Separator className="mt-8 mb-8 bg-[#dcf5fd]" /> */}
      <EventSchedule />
      {/* <Separator className="mt-8 mb-8 bg-[#dcf5fd]" /> */}
      <ParticipatingCompanies />
      {/* <Separator className="mt-8 mb-8 bg-[#dcf5fd]" /> */}
      <Floormap />
      {/* <Separator className="mt-8 mb-8 bg-[#dcf5fd]" /> */}
      <Gallery />
      {/* <Separator className="mt-8 mb-8 bg-[#dcf5fd]" /> */}
      <Contact />
      {/* <Separator className="mt-8 mb-8 bg-[#dcf5fd]" /> */}
      <Footer />
    </div>
  );
};

export default Home;

