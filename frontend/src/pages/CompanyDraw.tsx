import { OrbitingCircles } from "@/components/ui/orbiting-circles.tsx";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import ModalCompanyTable from "@/components/ModalCompanyTable";

interface CompanyDrawDataProps {
  tier: string;
  otherStyles?: string;
  radiusSize: number;
  bubbleStyle: string;
  doubleBubble: boolean;
  companies: {
    name: string;
    image: string;
    table: string;
  }[];
}

export default function CompanyDraw() {
  const location = useLocation();
  const { tier, companies, otherStyles, radiusSize, bubbleStyle, doubleBubble} = location.state as CompanyDrawDataProps;
  console.log("entire state:", location.state);
  
  const [speed, setSpeed] = useState(1);
  // const [radius, setRadius] = useState(600);
  const [iconSize, seticonSize] = useState(150);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();

  // console.log("radius: " + radius)
  // console.log("tier: " + tier.toString())

  // useEffect(() => {
    // const handleResize = () => {
    //   if (window.innerWidth <= 768) {
    //     setRadius(450);
    //     seticonSize(140);
    //   } else {
    //     setRadius(500);
    //     seticonSize(150);
    //   }
    // };

  //   handleResize(); // Initial check
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const animate = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const progress = (timestamp - startTimeRef.current) / 5000; // 10 seconds

    if (progress < 1) {
      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const currentSpeed = 1 + 19 * easeInOutQuad(progress);
      setSpeed(currentSpeed);
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setSpeed(20);
      startTimeRef.current = undefined;
    }
  };

  const handleStop = () => {
    // Cancel the animation and reset the speed
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    startTimeRef.current = undefined;
    setSpeed(1);
  };

  const handleStart = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    startTimeRef.current = undefined;
    animationRef.current = requestAnimationFrame(animate);

    // Show and expand the mask after 8 seconds
    // setTimeout(() => {
    //   if (maskRef.current) {
    //     // First make the mask visible
    //     gsap.to(maskRef.current, {
    //       opacity: 1,
    //       duration: 0,
    //       onComplete: () => {
    //         // Then expand it
    //         // gsap.to(maskRef.current, {
    //         //   scale: 400,
    //         //   duration: 0.3,
    //         //   ease: "elastic.out",
    //         //   onComplete: () => {
    //         //     // navigate("/draw-screen");

    //         //   },
    //         // });

    //       },
    //     });
    //   }
    // }, 4000);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    gsap.to(".inital-fade", {
      opacity: 1,
      duration: 1,
    });
  }, []);

  return (
    <div
      className="flex inital-fade h-[100vh] w-full items-center justify-center relative"
      style={{ opacity: 0 }}
    >
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0" />
      <div className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden z-10">
        <div className={`mt-[45vh] w-48 h-12 rounded-full flex items-center justify-center`}>
          <span className={`font-semibold text-5xl ${otherStyles}`}>{tier}</span>
        </div>
        <span className="z-30 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-800 bg-clip-text text-center text-3xl md:text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
          Company Draw
        </span>
        <span className="z-30 mt-2 pointer-events-none font-thin text-sm md:text-base text-black">
          We'll begin in a few seconds...
        </span>
        <div className="mt-4">
          <ModalCompanyTable 
          tier={tier}
          companies={companies}
          otherStyles={otherStyles}
          handleStart={handleStart}
          onClose={handleStop}
          />
        </div>
        <div className="mt-64 absolute inset-0 z-0 flex h-full w-full items-center justify-center">
          <OrbitingCircles
            iconSize={iconSize}
            radius={radiusSize}
            speed={speed}
            path={true}
          >
            {companies.map((company) => (
              <div
                className={`flex items-center justify-center text-center rounded-full w-[150px] h-[150px] font-bold text-white text-lg p-5 ${bubbleStyle}`}
                key={company.name}
              >
                {company.name}
              </div>
            ))}
          </OrbitingCircles>
          {/* {doubleBubble && <OrbitingCircles
            iconSize={iconSize}
            radius={400}
            speed={0.5}
            path={true}
          >
            {companies.map((company) => (
              <div
                className="flex items-center justify-center text-center rounded-full w-[150px] h-[150px] bg-gray-400 border-2 border-gray-800 font-bold text-white text-lg p-5"
                key={company.name}
              >
                {company.name}
              </div>
            ))}
          </OrbitingCircles>} */}
        </div>
      </div>
    </div>
  );
}
