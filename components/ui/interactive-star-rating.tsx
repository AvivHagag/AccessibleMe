"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveStarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function InteractiveStarRating({
  rating,
  setRating,
  maxRating = 5,
  size = "md",
  className,
}: InteractiveStarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState(0);

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
        const starValue = index + 1;
        const isFilled = (hoverRating || rating) >= starValue;

        return (
          <button
            key={index}
            type="button"
            className="relative p-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-mint-medium rounded"
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`Rate ${starValue} out of ${maxRating}`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                "transition-colors duration-150",
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-mint-medium"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
