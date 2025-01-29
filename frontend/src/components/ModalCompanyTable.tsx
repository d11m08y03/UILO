import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomButton from "./CustomButton";
import confetti from "canvas-confetti";


interface ModalCompanyTableProps {
  tier: string;
  companies: {
    name: string;
    table: string;
  }[];
  otherStyles?: string;
  onClose: () => void;
  handleStart: () => void;
}

function ModalCompanyTable({
  tier,
  companies,
  otherStyles,
  onClose,
  handleStart,
}: ModalCompanyTableProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentCompany = companies[currentIndex];

  const handeConfetti = () => {
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

  const handleDraw = () => {
    handleStart();
    
    if (currentIndex === companies.length - 1) {
      setIsComplete(true);
      setIsOpen(true);
      return;
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsOpen(true);
      handeConfetti();
    }, 3000);
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) onClose();
      }}
    >
      <CustomButton
        className="z-40 relative overflow-hidden"
        onClick={handleDraw}
      >
        Draw
      </CustomButton>
      <DialogContent className="sm:max-w-[425px] md:max-w-screen-sm rounded-lg">
        <DialogHeader>
          <DialogTitle>
            <div className="font-bold text-6xl flex justify-center text-center">
              {!isComplete && currentCompany.name}
              {isComplete && <span></span>}
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="my-32">
              <p className="flex justify-center text-9xl">
                {!isComplete && (<span className={`font-semibold ${otherStyles}`}>{currentCompany.table}</span>)}
                {isComplete && (
                  <div className="flex flex-col items-center">
                    <span className="text-8xl font-semibold text-black">
                      Complete!
                    </span>
                    <div className={`px-7 py-3 rounded-full mt-5 bg-black flex items-center justify-center`}>
                      <span className={`text-3xl font-semibold ${otherStyles}`}>
                        {tier}
                      </span>
                    </div>
                  </div>
                )}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ModalCompanyTable;
