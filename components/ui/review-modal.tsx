"use client";

import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Place } from "@/lib/types";
import {
  Accessibility,
  Car,
  SignpostBig,
  Volume2,
  Info,
  MapPin,
  X,
  VolumeOff,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { useState } from "react";

interface ReviewModalProps {
  place: Place | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewModal({ place, isOpen, onOpenChange }: ReviewModalProps) {
  const [isReading, setIsReading] = useState(false);
  if (!place) return null;
  const aggregatedFeatures = {
    wheelchairAccess: false,
    clearSignage: false,
    audioSystems: false,
    adaptedServices: false,
    disabledParking: false,
    accessibleLocation: false,
  };

  place.reviews.forEach((review) => {
    if (review.accessibilityFeatures) {
      if (
        review.accessibilityFeatures &&
        (review.accessibilityFeatures as { wheelchairAccess: boolean })
          .wheelchairAccess
      )
        aggregatedFeatures.wheelchairAccess = true;
      if (
        review.accessibilityFeatures &&
        (review.accessibilityFeatures as { clearSignage: boolean }).clearSignage
      )
        aggregatedFeatures.clearSignage = true;
      if (
        review.accessibilityFeatures &&
        (review.accessibilityFeatures as { audioSystems: boolean }).audioSystems
      )
        aggregatedFeatures.audioSystems = true;
      if (
        review.accessibilityFeatures &&
        (review.accessibilityFeatures as { adaptedServices: boolean })
          .adaptedServices
      )
        aggregatedFeatures.adaptedServices = true;
      if (
        review.accessibilityFeatures &&
        (review.accessibilityFeatures as { disabledParking: boolean })
          .disabledParking
      )
        aggregatedFeatures.disabledParking = true;
      if (
        review.accessibilityFeatures &&
        (review.accessibilityFeatures as { accessibleLocation: boolean })
          .accessibleLocation
      )
        aggregatedFeatures.accessibleLocation = true;
    }
  });

  const hasAccessibilityFeatures = Object.values(aggregatedFeatures).some(
    (value) => value
  );

  const readReviews = () => {
    if ("speechSynthesis" in window) {
      if (isReading) {
        window.speechSynthesis.cancel();
        setIsReading(false);
        return;
      }

      const reviewsText = place.reviews
        .map((review) => {
          const author = review.author || "אנונימי";
          const comment = review.comment || "";
          return `${author} כתב: ${comment}`;
        })
        .join(". ");

      const utterance = new SpeechSynthesisUtterance(reviewsText);
      const voices = window.speechSynthesis.getVoices();
      const hebrewVoice =
        voices.find(
          (voice) => voice.lang.includes("he") && voice.name.includes("Google")
        ) || voices.find((voice) => voice.lang.includes("he"));

      if (hebrewVoice) {
        utterance.voice = hebrewVoice;
      }

      utterance.lang = "he-IL";
      utterance.rate = 0.85;
      utterance.pitch = 1.2;
      utterance.volume = 1.0;

      utterance.onend = () => {
        setIsReading(false);
      };

      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          const updatedVoices = window.speechSynthesis.getVoices();
          const hebrewVoice =
            updatedVoices.find(
              (voice) =>
                voice.lang.includes("he") && voice.name.includes("Google")
            ) || updatedVoices.find((voice) => voice.lang.includes("he"));

          if (hebrewVoice) {
            utterance.voice = hebrewVoice;
          }
          window.speechSynthesis.speak(utterance);
        };
      } else {
        window.speechSynthesis.speak(utterance);
      }

      setIsReading(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-2xl max-h-[85%] sm:max-h-[90%] overflow-x-hidden overflow-y-auto bg-white dark:bg-black rounded-lg shadow-lg p-0 z-40"
        dir="rtl"
      >
        <DialogHeader className="flex justify-between items-start p-0 sticky top-0 bg-white dark:bg-black z-10">
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
              className="group absolute top-1 left-2 rounded-lg h-8 w-8 p-0 hover:bg-mint-lightest dark:bg-black "
            >
              <X className="h-6 w-6 text-mint-darkest dark:text-mint-darkest group-hover:dark:text-white" />
            </Button>
          </DialogClose>
          <DialogTitle className="text-xl font-bold text-black dark:text-white px-4">
            {place.name}
          </DialogTitle>
        </DialogHeader>

        <div className="px-2 space-y-4 pb-4">
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center mb-4">
            <div className="flex flex-col">
              <span className="flex items-center text-sm text-muted-foreground">
                {place.address}
                <MapPin className="inline-block mr-2" />
              </span>
              <Badge
                variant="outline"
                className="w-fit mt-1 border-mint-medium dark:border-mint-darkest"
              >
                {place.placeTypes[0]}
              </Badge>
            </div>
            <div className="flex flex-col mt-4 sm:mt-0 sm:items-end">
              <StarRating rating={place.overallRating} size="md" />
              <span className="text-sm text-muted-foreground mt-1">
                {place.reviews.length} ביקורות
              </span>
            </div>
          </div>

          {place.description && (
            <div className="py-2 mb-2">
              <p className="text-muted-foreground">{place.description}</p>
            </div>
          )}

          <div className="py-3">
            {hasAccessibilityFeatures && (
              <>
                <h3 className="font-medium mb-2">מאפייני נגישות</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {aggregatedFeatures.wheelchairAccess && (
                    <Badge className="flex items-center gap-1 px-3 py-1 bg-mint-medium dark:bg-mint-darkest/20 text-white hover:bg-mint-dark border-0">
                      <Accessibility className="h-4 w-4" />
                      <span>גישה לכיסאות גלגלים</span>
                    </Badge>
                  )}
                  {aggregatedFeatures.clearSignage && (
                    <Badge className="flex items-center gap-1 px-3 py-1 bg-mint-medium dark:bg-mint-darkest/20 text-white hover:bg-mint-dark border-0">
                      <SignpostBig className="h-4 w-4" />
                      <span>שילוט ברור</span>
                    </Badge>
                  )}
                  {aggregatedFeatures.audioSystems && (
                    <Badge className="flex items-center gap-1 px-3 py-1 bg-mint-medium dark:bg-mint-darkest/20 text-white hover:bg-mint-dark border-0">
                      <Volume2 className="h-4 w-4" />
                      <span>מערכות שמע</span>
                    </Badge>
                  )}
                  {aggregatedFeatures.adaptedServices && (
                    <Badge className="flex items-center gap-1 px-3 py-1 bg-mint-medium dark:bg-mint-darkest/20 text-white hover:bg-mint-dark border-0">
                      <Info className="h-4 w-4" />
                      <span>שירותים מותאמים</span>
                    </Badge>
                  )}
                  {aggregatedFeatures.disabledParking && (
                    <Badge className="flex items-center gap-1 px-3 py-1 bg-mint-medium dark:bg-mint-darkest/20 text-white hover:bg-mint-dark border-0">
                      <Car className="h-4 w-4" />
                      <span>חניית נכים</span>
                    </Badge>
                  )}
                  {aggregatedFeatures.accessibleLocation && (
                    <Badge className="flex items-center gap-1 px-3 py-1 bg-mint-medium dark:bg-mint-darkest/20 text-white hover:bg-mint-dark border-0">
                      <MapPin className="h-4 w-4" />
                      <span>מיקום נגיש</span>
                    </Badge>
                  )}
                </div>
              </>
            )}

            <div className="flex flex-row justify-between items-center mb-4 gap-2 border-t pt-2 border-mint-darkest">
              <h3 className="font-medium text-lg  text-mint-darkest dark:text-mint-darkest">
                ביקורות:
              </h3>
              <Button
                variant={isReading ? "destructive" : "ghost"}
                size="sm"
                dir="rtl"
                onClick={readReviews}
                className={`flex items-center gap-2   ${
                  isReading
                    ? "border-none text-white"
                    : "bg-mint-medium text-white hover:bg-mint-dark dark:bg-mint-darkest/20 hover:dark:bg-black dark:border-mint-darkest dark:border"
                }`}
              >
                {isReading ? "הפסק קריאה" : "קרא ביקורות"}
                {isReading ? (
                  <VolumeOff className="h-4 w-4 mr-2" />
                ) : (
                  <Volume2 className="h-4 w-4 mr-2" />
                )}
              </Button>
            </div>

            <div className="space-y-6">
              {place.reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 border border-mint-medium shadow-md bg-mint-light dark:border-gray-800 dark:bg-mint-medium/10 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-mint-medium dark:bg-black dark:text-mint-darkest text-white">
                            {review.author
                              ? review.author.substring(0, 2)
                              : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex flex-col">
                            <p className="font-medium">
                              {review.author || "אנונימי"}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {format(review.createdAt, "dd/MM/yyyy")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size="md" />
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-sm mb-4">{review.comment}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {review.accessibilityFeatures &&
                      Object.entries(review.accessibilityFeatures)
                        .filter(([, value]) => value === true)
                        .map(([key]) => {
                          let icon = null;
                          let label = "";

                          switch (key) {
                            case "wheelchairAccess":
                              icon = <Accessibility className="h-4 w-4" />;
                              label = "גישה לכיסאות גלגלים";
                              break;
                            case "clearSignage":
                              icon = <SignpostBig className="h-4 w-4" />;
                              label = "שילוט ברור";
                              break;
                            case "audioSystems":
                              icon = <Volume2 className="h-4 w-4" />;
                              label = "מערכות שמע";
                              break;
                            case "adaptedServices":
                              icon = <Info className="h-4 w-4" />;
                              label = "שירותים מותאמים";
                              break;
                            case "disabledParking":
                              icon = <Car className="h-4 w-4" />;
                              label = "חניית נכים";
                              break;
                            case "accessibleLocation":
                              icon = <MapPin className="h-4 w-4" />;
                              label = "מיקום נגיש";
                              break;
                          }

                          return (
                            <Badge
                              key={key}
                              className="flex items-center gap-1 px-3 py-1 bg-mint-medium dark:bg-mint-darkest/20 text-white hover:bg-mint-dark border-0"
                            >
                              {icon}
                              <span>{label}</span>
                            </Badge>
                          );
                        })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
