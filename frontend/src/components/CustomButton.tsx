import React from 'react';
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(({ 
  children, 
  className,
  variant = 'default',
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        " px-4 py-2  md:px-6 md:py-3 rounded-full font-sm md:font-medium transition-all duration-200",
        variant === 'default' && "bg-black text-white hover:bg-gray-800",
        variant === 'outline' && "border border-white text-white hover:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

CustomButton.displayName = 'CustomButton';

export default CustomButton;
