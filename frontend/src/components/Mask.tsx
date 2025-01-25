import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

const Mask = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  variant = 'default',
  className,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "px-6 py-3 rounded-full font-medium transition-all duration-200",
        variant === 'default' && "bg-black text-white hover:bg-gray-800",
        variant === 'outline' && "border border-white text-white hover:bg-white/10",
        className
      )}
    >
    </button>
  );
});

Mask.displayName = 'Mask';

export default Mask;