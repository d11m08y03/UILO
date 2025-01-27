import { OrbitingCircles } from "@/components/ui/orbiting-circles.tsx";
import CustomButton from "@/components/CustomButton";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import Mask from "@/components/Mask";
import companiesData from "../data/dummycompanies.json";

export default function CompanyDraw() {
  const [speed, setSpeed] = useState(1);
  const [radius, setRadius] = useState(600);
  const [iconSize, seticonSize] = useState(150);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const maskRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setRadius(450);
        seticonSize(140);
      } else {
        setRadius(555);
        seticonSize(150);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleStart = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    startTimeRef.current = undefined;
    animationRef.current = requestAnimationFrame(animate);

    // Show and expand the mask after 8 seconds
    setTimeout(() => {
      if (maskRef.current) {
        // First make the mask visible
        gsap.to(maskRef.current, {
          opacity: 1,
          duration: 0,
          onComplete: () => {
            // Then expand it
            gsap.to(maskRef.current, {
              scale: 400,
              duration: 0.3,
              ease: "elastic.out",
              onComplete: () => {
                navigate("/draw-screen");
              },
            });
          },
        });
      }
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    gsap.to(".flex", {
      opacity: 1,
      duration: 1,
    });
  }, []);

  return (
    <div
      className="flex h-[100vh] w-full items-center justify-center"
      style={{ opacity: 0 }}
    >
      <div className="relative flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-background">
        <span className="mt-[45vh] z-30 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-800 bg-clip-text text-center text-3xl md:text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
          Company Draw
        </span>
        <span className="z-30 mt-2 pointer-events-none font-thin text-sm md:text-base text-black">
          We'll begin in a few seconds...
        </span>
        <div className="relative mt-4">
          <CustomButton
            className="z-40 relative overflow-hidden"
            onClick={handleStart}
          >
            Start
          </CustomButton>
          <Mask
            className="absolute inset-0 z-30 opacity-0 bg-black"
            ref={maskRef}
          />
        </div>
        <div className="mt-64 absolute inset-0 z-0 flex h-full w-full items-center justify-center">
          <OrbitingCircles
            iconSize={iconSize}
            radius={radius}
            speed={speed}
            path={false}
          >
            {companiesData.companies.map((company) => (
              // <img
              //   key={company.company_id}
              //   src={company.image}
              //   alt={company.name}
              //   style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              // />
              <div
                className="flex items-center justify-center text-center rounded-full w-[150px] h-[150px] bg-gray-400 border-2 border-gray-800 font-bold text-white text-lg p-5"
                key={company.company_id}
              >
                {company.name}
              </div>
            ))}
          </OrbitingCircles>
        </div>

        {/* <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        <Icons.whatsapp />
        <Icons.notion />
        <Icons.openai />
        <Icons.googleDrive />
      </OrbitingCircles> */}
      </div>
    </div>
  );
}
