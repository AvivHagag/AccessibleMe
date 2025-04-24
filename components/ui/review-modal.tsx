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
import { Review } from "@/lib/types";
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

interface ReviewModalProps {
  review: Review | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReviewModal({
  review,
  isOpen,
  onOpenChange,
}: ReviewModalProps) {
  if (!review) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-2xl bg-white rounded-lg p-4 shadow-lg"
        dir="rtl"
      >
        <DialogHeader className="flex flex-row justify-between items-start mb-1 space-y-0">
          <DialogTitle className="text-xl font-bold text-mint-darkest">
            {review.placeName}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 p-0 hover:bg-mint-lightest"
            >
              <X className="h-5 w-5 text-mint-darkest" />
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              נכתב על ידי {review.author}
            </span>
            <Badge variant="outline" className="w-fit mt-1 border-mint-medium">
              {review.placeType}
            </Badge>
          </div>
          <div className="flex flex-col items-end">
            <StarRating rating={review.overallRating} />
            <span className="text-sm text-muted-foreground mt-1">
              {format(review.date, "dd/MM/yyyy")}
            </span>
          </div>
        </div>

        <div className="py-3">
          <h3 className="font-medium mb-2">מאפייני נגישות</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {review.accessibilityFeatures.wheelchairAccess && (
              <Badge className="flex items-center gap-1 px-3 py-1 bg-mint-medium text-white hover:bg-mint-dark border-0">
                <Accessibility className="h-4 w-4" />
                <span>גישה לכיסאות גלגלים</span>
              </Badge>
            )}
            {review.accessibilityFeatures.clearSignage && (
              <Badge className="flex items-center gap-1 px-3 py-1 bg-mint-medium text-white hover:bg-mint-dark border-0">
                <SignpostBig className="h-4 w-4" />
                <span>שילוט ברור</span>
              </Badge>
            )}
            {review.accessibilityFeatures.audioSystems && (
              <Badge className="flex items-center gap-1 px-3 py-1 bg-mint-medium text-white hover:bg-mint-dark border-0">
                <Volume2 className="h-4 w-4" />
                <span>מערכות שמע</span>
              </Badge>
            )}
            {review.accessibilityFeatures.adaptedServices && (
              <Badge className="flex items-center gap-1 px-3 py-1 bg-mint-medium text-white hover:bg-mint-dark border-0">
                <Info className="h-4 w-4" />
                <span>שירותים מותאמים</span>
              </Badge>
            )}
            {review.accessibilityFeatures.disabledParking && (
              <Badge className="flex items-center gap-1 px-3 py-1 bg-mint-medium text-white hover:bg-mint-dark border-0">
                <Car className="h-4 w-4" />
                <span>חניית נכים</span>
              </Badge>
            )}
            {review.accessibilityFeatures.accessibleLocation && (
              <Badge className="flex items-center gap-1 px-3 py-1 bg-mint-medium text-white hover:bg-mint-dark border-0">
                <MapPin className="h-4 w-4" />
                <span>מיקום נגיש</span>
              </Badge>
            )}
          </div>

          <h3 className="font-medium mb-2">ביקורת</h3>
          <p className="text-muted-foreground mb-6">{review.description}</p>

          {/* <div className="border-t border-slate-200 pt-4 mt-4 flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ThumbsUp className="h-4 w-4" />
              מועיל (8)
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              שתף
            </Button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
