"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InteractiveStarRating } from "@/components/ui/interactive-star-rating";
import { PlaceDetails } from "@/app/add-review/page";
import {
  Accessibility,
  Car,
  SignpostBig,
  Volume2,
  Info,
  MapPin,
  X,
  CheckIcon,
  OctagonAlertIcon,
} from "lucide-react";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { validateReview } from "@/lib/contentModeration";
import Loader from "../Loader";

interface AddReviewModalProps {
  place: PlaceDetails | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitReview: (review: {
    rating: number;
    author: string;
    accessibilityFeatures: {
      wheelchairAccess: boolean;
      disabledParking: boolean;
      clearSignage: boolean;
      audioSystems: boolean;
      adaptedServices: boolean;
      accessibleLocation: boolean;
    };
    description: string;
  }) => void;
}

export function AddReviewModal({
  place,
  isOpen,
  onOpenChange,
  onSubmitReview,
}: AddReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [errorDescription, setErrorDescription] = useState<boolean>(false);
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessibilityFeatures, setAccessibilityFeatures] = useState({
    wheelchairAccess: false,
    disabledParking: false,
    clearSignage: false,
    audioSystems: false,
    adaptedServices: false,
    accessibleLocation: false,
  });

  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setDescription("");
      setAuthor("");
      setErrorDescription(false);
      setAccessibilityFeatures({
        wheelchairAccess: false,
        disabledParking: false,
        clearSignage: false,
        audioSystems: false,
        adaptedServices: false,
        accessibleLocation: false,
      });
    }
  }, [isOpen]);

  const handleFeatureToggle = (feature: keyof typeof accessibilityFeatures) => {
    setAccessibilityFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const accessibilityFeatureCards = [
    {
      id: "wheelchairAccess",
      label: "גישה לכיסאות גלגלים",
      icon: <Accessibility className="h-6 w-6 mb-2" />,
    },
    {
      id: "disabledParking",
      label: "חניית נכים",
      icon: <Car className="h-6 w-6 mb-2" />,
    },
    {
      id: "clearSignage",
      label: "שילוט ברור",
      icon: <SignpostBig className="h-6 w-6 mb-2" />,
    },
    {
      id: "audioSystems",
      label: "מערכות שמע",
      icon: <Volume2 className="h-6 w-6 mb-2" />,
    },
    {
      id: "adaptedServices",
      label: "שירותים מותאמים",
      icon: <Info className="h-6 w-6 mb-2" />,
    },
    {
      id: "accessibleLocation",
      label: "מיקום נגיש",
      icon: <MapPin className="h-6 w-6 mb-2" />,
    },
  ];

  const handleSubmit = () => {
    const { isClean } = validateReview(description);
    if (!isClean) {
      setErrorDescription(true);
      return;
    }
    setIsLoading(true);
    onSubmitReview({
      rating,
      author,
      accessibilityFeatures,
      description,
    });
  };

  if (!place) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-2xl max-h-[95vh] bg-white dark:bg-black rounded-lg shadow-lg p-0 z-40"
        dir="rtl"
      >
        <DialogHeader className="flex justify-between items-start p-0">
          {place.image && (
            <div className="relative w-full h-48 md:h-64">
              <Image
                src={place.image}
                alt={place.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
          )}
          <DialogClose asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-1 left-2 rounded-lg h-8 w-8 p-0 hover:bg-mint-lightest dark:hover:bg-mint-teal/10"
            >
              <X className="h-6 w-6 text-mint-darkest dark:text-mint-darkest" />
            </Button>
          </DialogClose>
          <DialogTitle className="text-xl font-bold text-black dark:text-white px-2">
            הוספת ביקורת: {place.name}
          </DialogTitle>
        </DialogHeader>

        <div className="px-2 space-y-4 overflow-y-auto max-h-[60vh]">
          <div className="flex justify-between items-center">
            <div className="flex flex-col text-right">
              <span className="text-sm text-muted-foreground">
                {place.address}
                <MapPin className="inline-block mr-2" />
              </span>
              <Badge
                variant="outline"
                className="w-fit mt-1 border-mint-medium dark:border-mint-darkest"
              >
                {place.types[0]}
              </Badge>
            </div>
          </div>
          {isLoading ? (
            <div className="flex flex-col justify-center items-center pb-32">
              <Loader loading={isLoading} size={50} />
              <p className="text-base mt-4 text-mint-teal">
                מעלה את הביקורת שלך ..
              </p>
            </div>
          ) : (
            <>
              <div className=" border-gray-200 dark:border-gray-800">
                <div className="flex flex-row gap-2 items-center">
                  <h3 className="font-medium">דירוג כללי:</h3>
                  <span>{rating}/5</span>
                </div>
                <div className="flex items-center">
                  <InteractiveStarRating
                    rating={rating}
                    setRating={setRating}
                  />
                </div>
              </div>

              <div className=" border-gray-200 dark:border-gray-800">
                <h3 className="font-medium mb-1">מאפייני נגישות</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  בחר את מאפייני הנגישות הקיימים במקום. לחץ על הקטגוריות
                  הרלוונטיות כדי לסמן אותן.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-2">
                  {accessibilityFeatureCards.map((feature) => {
                    const isSelected =
                      accessibilityFeatures[
                        feature.id as keyof typeof accessibilityFeatures
                      ];
                    return (
                      <div
                        key={feature.id}
                        onClick={() =>
                          handleFeatureToggle(
                            feature.id as keyof typeof accessibilityFeatures
                          )
                        }
                        className={cn(
                          "relative flex flex-col items-center text-center rounded-lg p-3 transition-all cursor-pointer border",
                          isSelected
                            ? "bg-mint-light dark:bg-mint-darkest/30 border-mint-medium dark:border-mint-darkest"
                            : "bg-white/50 dark:bg-black/50 border-gray-200 dark:border-gray-800 hover:bg-mint-lightest/50 dark:hover:bg-mint-darkest/20"
                        )}
                      >
                        <div
                          className={cn(
                            "transition-colors",
                            isSelected
                              ? "text-mint-dark dark:text-mint-lightest"
                              : "text-mint-medium dark:text-mint-medium"
                          )}
                        >
                          {feature.icon}
                        </div>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            isSelected
                              ? "text-mint-darkest dark:text-mint-lightest"
                              : "text-gray-700 dark:text-gray-300"
                          )}
                        >
                          {feature.label}
                        </span>
                        {isSelected && (
                          <Badge className="absolute -top-2 -right-2 bg-mint-medium dark:bg-mint-darkest text-white p-1">
                            <CheckIcon className="h-5 w-5" />
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className=" border-gray-200 dark:border-gray-800">
                <h3 className="font-medium mb-2">האם ברצונך להוסיף שם?</h3>
                <Input
                  placeholder="כתוב את השם שלך כאן..."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="bg-mint-light dark:bg-mint-darkest/30"
                />
              </div>
              <div className=" border-gray-200 dark:border-gray-800">
                <h3 className="font-medium mb-2">הביקורת שלך</h3>
                <Textarea
                  placeholder="כתוב את הביקורת שלך כאן..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-32 resize-none bg-mint-light dark:bg-mint-darkest/30"
                />
                {errorDescription && (
                  <div className="flex items-center mt-1 text-sm text-red-500">
                    <p>
                      הביקורת שלך מכילה תוכן לא הולם. אנא עדכן אותה לפני השליחה!
                    </p>
                    <OctagonAlertIcon className="h-5 w-5 mr-2" />
                  </div>
                )}
              </div>
            </>
          )}
          <DialogFooter className="my-4 pb-4">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="ml-2"
              disabled={isLoading}
            >
              ביטול
            </Button>
            <Button
              className="bg-mint-medium hover:bg-mint-dark text-white"
              onClick={handleSubmit}
              disabled={rating === 0 || description === "" || isLoading}
            >
              שלח ביקורת
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
