import { Separator } from "@/components/ui/separator";
import logo from "../assets/images/UILO_logo.png";
import { Button } from "@/components/ui/button";
import { ScheduleTab } from "@/components/ScheduleTab";
import CompanyCard from "@/components/CompanyCard";
import accenture from "../assets/images/Accenture-Logo.png";
import dayforce from "../assets/images/Dayforce.webp"
import powaSetup from "../assets/images/powa_setup.jpg";
import { GalleryCarousel } from "@/components/GalleryCarousel";

interface Company {
  id: number;
  logo: string;
  name: string;
  description: string;
  detailsLink: string;
}

interface CompanyListingProps {
  companies: Company[];
}

const Hero = () => {
  return (
    <div className="flex flex-col lg:h-screen text-center h-[148vh] md:h-[132vh]">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-start items-center justify-start">
        {/* Left Section */}
        <div className="lg:w-1/2 p-6 flex flex-col items-center justify-start lg:items-start lg:text-left">
          <img className="w-32 h-auto mb-4" src={logo} alt="Logo UILO" />
          <h1 className="text-base font-bold mb-4 sm:text-6xl md:text-5xl lg:text-4xl">2025 Industrial Recruitment</h1>
          <p className="lg:text-xl mb-4">5-6 February 2025</p>
          <p className="lg:text-xl mb-4">Venue: Powa, University of Mauritius</p>
          <div className="mt-4 space-x-4 flex justify-center lg:justify-start">
            <Button
              className="lg:underline text-xs sm:text-sm pl-0 pr-3 bg-blue-500 lg:bg-white text-white p-2 lg:text-black"
              variant="ghost"
              onClick={() => {
                const element = document.getElementById("company-listing");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              View Companies
            </Button>
            <span>|</span>
            <Button
              className="bg-black lg:underline text-xs sm:text-sm pl-0 pr-0 ml-0 lg:bg-white text-white p-2 lg:text-black"
              variant="ghost"
              onClick={() => {
                const element = document.getElementById("floor-map");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Go to floor Map
            </Button>
          </div>
        </div>


        <div className="lg:w-1/2 bg-white">
          <ScheduleTab />
        </div>
      </div>

  
      <div className="lg:bg-gray-50 p-6 mt-18 lg:ml-20 lg:border-2 lg:border-blue-200 lg:rounded-lg lg:mt-36 mt-32">
        <h2 className="text-3xl font-bold mb-4">About This Event</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          The career fair provides students with a valuable opportunity to explore potential career paths, connect with employers, and gather information about various industries. It serves as a platform for students to network, seek internship or job opportunities, and gain insights into the current job market. The event typically features a diverse range of companies and organizations eager to engage with students and discuss potential career prospects. Attending the career fair is a proactive step toward building a successful and fulfilling professional future.
        </p>
      </div>
    </div>
  );
};

const CompanyListing = ({ companies }: CompanyListingProps) => {
  return (
    <div id="company-listing">
      <div className="w-full flex justify-center items-center lg:ml-24">
        <h1 className="text-base text-xl font-bold text-center sm:text-2xl md:text-3xl mt-44">
          Meet the participating organizations
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-6 lg:pl-32">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

const FloorMap = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center lg:mt-16" id="floor-map">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 mt-8 lg:ml-32">
  Floor Arrangement
</h1>

      <img src={powaSetup} alt="Powa setup" className="w-full lg:pl-32 mt-8 lg:mb-8" />
    </div>
  );
};

const Gallery = () => {
  return (
    <div>
      <div className="lg:ml-40">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-4">
          Gallery
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-600 mb-8">
          Check our gallery from recent events
        </h2>
      </div>
  
      <div className="mt-[-200px]">
        <GalleryCarousel />
      </div>
    </div>
  );
};



const Home = () => {
  
  const companies = [
    {
      id: 1,
      logo: accenture,
      name: "Accenture",
      description: "Software engineering",
      detailsLink: "#", 
    },
    {
      id: 2,
      logo: accenture,
      name: "Company 2",
      description: "Consulting",
      detailsLink: "#", 
    },
    {
      id: 3,
      logo: accenture,
      name: "Company 3",
      description: "Design & Development",
      detailsLink: "#", 
    },
    {
      id: 4,
      logo: accenture,
      name: "Company 4",
      description: "Marketing & Sales",
      detailsLink: "#", 
    },
    {
      id: 5,
      logo: dayforce,
      name: "Company 5",
      description: "Human Resources",
      detailsLink: "#", 
    },
    {
      id: 6,
      logo: accenture,
      name: "Company 6",
      description: "Finance & Accounting",
      detailsLink: "#", 
    },
    {
      id: 7,
      logo: accenture,
      name: "Company 7",
      description: "Customer Support",
      detailsLink: "#", 
    },
    {
      id: 8,
      logo: accenture,
      name: "Company 8",
      description: "Healthcare & Pharma",
      detailsLink: "#",
    },
    {
      id: 9,
      logo: accenture,
      name: "Company 9",
      description: "Education & Training",
      detailsLink: "#", 
    },
    {
      id: 10,
      logo: accenture,
      name: "Company 10",
      description: "Technology & Innovation",
      detailsLink: "#",
    },
  ];

  return (
    <div className="container max-w-6xl mx-auto">
      <Hero />
      <div className="mt-8 lg:mt-0">
        <CompanyListing companies={companies} />
      </div>
      {/* <Separator className="mb-5 mt-5" /> */}
      <FloorMap />
      {/* <Separator className="mb-5 mt-5" /> */}
      <Gallery />
      {/* <Separator className="mb-5 mt-5" /> */}
    </div>
  );
};

export default Home;
