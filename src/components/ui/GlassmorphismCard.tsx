
import React from "react";
import { cn } from "@/lib/utils";

interface GlassmorphismCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
}

const GlassmorphismCard = ({
  className,
  children,
  hoverEffect = true,
  ...props
}: GlassmorphismCardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl glass-morphism p-6",
        hoverEffect && "transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-futuristic-neon/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { GlassmorphismCard };
