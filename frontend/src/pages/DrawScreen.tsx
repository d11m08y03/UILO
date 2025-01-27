import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import TierTable from "@/components/TierTable";
import companiesData from "../data/dummycompanies.json";
import confetti from "canvas-confetti";

export default function DrawScreen() {
  const [currentTier, setCurrentTier] = React.useState(0); // 0: Bronze, 1: Silver, 2: Gold
  const [isLoading, setIsLoading] = useState(false);
  const [sortByTime, setSortByTime] = useState(true);

  const handlePrevious = () => {
    setCurrentTier((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentTier((prev) => (prev < 2 ? prev + 1 : prev));
  };

  const handleShuffle = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSortByTime((prev) => !prev);
      setIsLoading(false);
    }, 2000);
    setTimeout(() => {
      handleClick();
    }, 1800);
  };

  const handleClick = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  useEffect(() => {
    gsap.to(".black-screen", {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        const screen = document.querySelector(".black-screen");
        screen?.remove();
      },
    });
  }, []);

  // useEffect(() => {
  //   gsap.from(".title", {
  //     opacity: 0,
  //     duration: 1,
  //     y: 100,
  //     ease: "power4.out",
  //   });
  // }, []);

  return (
    <>
      <div
        className="black-screen bg-black w-full h-[100vh] absolute z-50"
        style={{ opacity: 1 }}
      ></div>
      <div className="w-full h-[12vh] bg-white">
        <span className="z-30 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-800 to-gray-600 bg-clip-text text-center text-4xl md:text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-black flex justify-center pt-6 md:pt-3 lg:pt-5 title">
          Company Draw
        </span>
      </div>
      <div className="bg-white w-full h-[88vh]">
        <div className="relative flex items-center justify-center">
          <button
            onClick={handlePrevious}
            className="absolute left-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 disabled:opacity-50"
            disabled={currentTier === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div
            id="tier-container"
            className="w-[44vw] overflow-x-hidden scroll-smooth"
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentTier * 100}%)` }}
            >
              <TierTable
                tier="Bronze"
                otherStyles="bg-gradient-to-br from-[#DAA520] to-[#831704] bg-clip-text text-transparent"
                companies={companiesData.companies
                  .filter((company) => company.tier === "bronze")
                  .map(({ name, image, table, entry_at }) => ({
                    name,
                    image,
                    table,
                    entry_at,
                  }))}
                isLoading={isLoading}
                sortByTime={sortByTime}
              />
              <TierTable
                tier="Silver"
                otherStyles="bg-gradient-to-br from-[#C7C9CB] to-[#848B98] bg-clip-text text-transparent"
                companies={companiesData.companies
                  .filter((company) => company.tier === "silver")
                  .map(({ name, image, table, entry_at }) => ({
                    name,
                    image,
                    table,
                    entry_at,
                  }))}
                isLoading={isLoading}
                sortByTime={sortByTime}
              />
              <TierTable
                tier="Gold"
                otherStyles="bg-gradient-to-br from-[#a28834] to-[#D4AF37] bg-clip-text text-transparent"
                companies={companiesData.companies
                  .filter((company) => company.tier === "gold")
                  .map(({ name, image, table, entry_at }) => ({
                    name,
                    image,
                    table,
                    entry_at,
                  }))}
                isLoading={isLoading}
                sortByTime={sortByTime}
              />
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 disabled:opacity-50"
            disabled={currentTier === 2}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <Button
          onClick={handleShuffle}
          className="rounded-full font-bold text-lg mx-auto flex my-5 shadow-md shadow-gray-400 bg-foreground text-background px-7 py-7 hover:bg-gray-800"
        >
          Shuffle
        </Button>
      </div>
    </>
  );
}
