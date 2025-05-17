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
import { Place, placeReview } from "@/lib/types";
import { ThumbsUp, Share2 } from "lucide-react";
import {
  Accessibility,
  Car,
  SignpostBig,
  Volume2,
  Info,
  MapPin,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

interface ReviewModalProps {
  place: Place | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewModal({ place, isOpen, onOpenChange }: ReviewModalProps) {
  if (!place) return null;

  // Aggregate accessibility features from all reviews
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
      if (review.accessibilityFeatures.wheelchairAccess)
        aggregatedFeatures.wheelchairAccess = true;
      if (review.accessibilityFeatures.clearSignage)
        aggregatedFeatures.clearSignage = true;
      if (review.accessibilityFeatures.audioSystems)
        aggregatedFeatures.audioSystems = true;
      if (review.accessibilityFeatures.adaptedServices)
        aggregatedFeatures.adaptedServices = true;
      if (review.accessibilityFeatures.disabledParking)
        aggregatedFeatures.disabledParking = true;
      if (review.accessibilityFeatures.accessibleLocation)
        aggregatedFeatures.accessibleLocation = true;
    }
  });

  const hasAccessibilityFeatures = Object.values(aggregatedFeatures).some(
    (value) => value
  );

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
          <DialogTitle className="text-xl font-bold text-black dark:text-white px-4">
            {place.name}
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                {place.address}
              </span>
              <Badge
                variant="outline"
                className="w-fit mt-1 border-mint-medium dark:border-mint-darkest"
              >
                {place.placeTypes[0]}
              </Badge>
            </div>
            <div className="flex flex-col items-end">
              <StarRating rating={place.overallRating} />
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

            <h3 className="font-medium mb-4 text-lg border-t pt-2 border-mint-darkest text-mint-darkest dark:text-mint-darkest">
              ביקורות:
            </h3>

            <div className="space-y-6">
              {place.reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 border border-mint-medium shadow-md bg-mint-light dark:border-gray-800 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-mint-medium text-white">
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
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-sm mb-4">{review.comment}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {review.accessibilityFeatures &&
                      Object.entries(review.accessibilityFeatures)
                        .filter(([_, value]) => value === true)
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
