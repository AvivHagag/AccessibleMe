import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  className,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      aria-label={`Rating: ${rating} out of ${maxRating}`}
    >
      {[...Array(maxRating)].map((_, index) => {
        const fillPercentage = Math.min(
          100,
          Math.max(0, (rating - index) * 100)
        );

        return (
          <div key={index} className="relative" aria-hidden="true" dir="ltr">
            {fillPercentage > 0 && (
              <div
                className="absolute top-0 right-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
                dir="rtl"
              >
                <Star
                  className={cn(sizeClasses[size], "fill-primary text-primary")}
                />
              </div>
            )}
            <Star
              className={cn(sizeClasses[size], "fill-muted text-mint-medium")}
            />
          </div>
        );
      })}
    </div>
  );
}
