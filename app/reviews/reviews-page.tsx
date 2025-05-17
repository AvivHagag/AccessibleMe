"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import {
  Accessibility,
  Car,
  SignpostBig,
  Volume2,
  Info,
  MapPin,
} from "lucide-react";
import { Place } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "@/components/ui/review-modal";

interface ReviewsPageProps {
  filteredPlaces: Place[];
  category: string;
}

const getCategoryLabel = (categoryId: string) => {
  const categories = {
    all: "הכל",
    wheelchairAccess: "גישה לכיסאות גלגלים",
    disabledParking: "חניית נכים",
    clearSignage: "שילוט ברור",
    audioSystems: "מערכות שמע",
    adaptedServices: "שירותים מותאמים",
    accessibleLocation: "מיקום נגיש",
  };
  return categories[categoryId as keyof typeof categories] || categoryId;
};

export default function ReviewsPage({
  filteredPlaces,
  category,
}: ReviewsPageProps) {
  const [isPlaceModalOpen, setisPlaceModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handlePlaceSelect = (selectedPlace: Place) => {
    setSelectedPlace(selectedPlace);
    setisPlaceModalOpen(true);
  };

  const placesWithRatings = filteredPlaces.map((place) => {
    const totalRating = place.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating =
      place.reviews.length > 0 ? totalRating / place.reviews.length : 0;

    return {
      ...place,
      averageRating,
    };
  });

  return (
    <main className="flex flex-col items-center gap-12 my-24">
      <section className="mx-2 md:p-2 max-w-6xl bg-white/20 dark:bg-black backdrop-blur-lg border border-white/40 dark:border-mint-darkest rounded-xl">
        <div className="mx-auto p-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            {category !== "all" ? (
              <>
                <h2
                  className="text-3xl font-bold tracking-normal md:text-4xl/tight"
                  dir="rtl"
                >
                  ביקורות בקטגוריית {getCategoryLabel(category)}
                </h2>
                <p
                  className="max-w-[900px] text-muted-foreground md:text-xl/relaxed"
                  dir="rtl"
                >
                  {`${
                    filteredPlaces.length === 1
                      ? "תוצאה אחת"
                      : filteredPlaces.length + " " + "תוצאות"
                  }`}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  ביקורות משתמשים
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  מה אומרים המשתמשים על הנגישות במקום
                </p>
              </>
            )}
          </div>
          <div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 min-h-[400px]"
            dir="rtl"
          >
            {placesWithRatings.length > 0 ? (
              placesWithRatings.map((place) => (
                <Card
                  key={place.id}
                  className="flex flex-col h-full bg-white/50 dark:bg-black dark:text-mint-darkest dark:border-mint-darkest backdrop-blur-md border-mint-medium overflow-hidden"
                >
                  <div className="relative w-full h-48">
                    {place.image ? (
                      <Image
                        src={place.image}
                        alt={place.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-mint-lightest dark:bg-mint-darkest/20 flex items-center justify-center">
                        <span className="text-mint-darkest">אין תמונה</span>
                      </div>
                    )}
                  </div>

                  <CardHeader className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-xl">{place.name}</CardTitle>
                      </div>
                      <StarRating rating={place.averageRating} />
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {place.placeTypes?.map((type, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                    {place.description && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {place.description}
                      </p>
                    )}
                    {place.address && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {place.address}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                      {place.reviews.some(
                        (review) =>
                          review.accessibilityFeatures.wheelchairAccess
                      ) && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-mint-medium dark:bg-mint-darkest/20"
                        >
                          <Accessibility className="h-5 w-5" />
                          <span className="sr-only">Wheelchair Access</span>
                        </Badge>
                      )}
                      {place.reviews.some(
                        (review) => review.accessibilityFeatures.disabledParking
                      ) && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-mint-medium dark:bg-mint-darkest/20"
                        >
                          <Car className="h-5 w-5" />
                          <span className="sr-only">Disabled Parking</span>
                        </Badge>
                      )}
                      {place.reviews.some(
                        (review) => review.accessibilityFeatures.clearSignage
                      ) && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-mint-medium dark:bg-mint-darkest/20"
                        >
                          <SignpostBig className="h-5 w-5" />
                          <span className="sr-only">Clear Signage</span>
                        </Badge>
                      )}
                      {place.reviews.some(
                        (review) => review.accessibilityFeatures.audioSystems
                      ) && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-mint-medium dark:bg-mint-darkest/20"
                        >
                          <Volume2 className="h-5 w-5" />
                          <span className="sr-only">Audio Systems</span>
                        </Badge>
                      )}
                      {place.reviews.some(
                        (review) => review.accessibilityFeatures.adaptedServices
                      ) && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-mint-medium dark:bg-mint-darkest/20"
                        >
                          <Info className="h-5 w-5" />
                          <span className="sr-only">Adapted Services</span>
                        </Badge>
                      )}
                      {place.reviews.some(
                        (review) =>
                          review.accessibilityFeatures.accessibleLocation
                      ) && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-mint-medium dark:bg-mint-darkest/20"
                        >
                          <MapPin className="h-5 w-5" />
                          <span className="sr-only">Accessible Location</span>
                        </Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter
                    className="flex justify-center border-t py-2"
                    dir="rtl"
                  >
                    <Button
                      variant="outline"
                      className="bg-mint-teal/70 text-white hover:bg-mint-teal w-4/5"
                      size="sm"
                      onClick={() => handlePlaceSelect(place)}
                    >
                      קרא ביקורות
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div
                className="col-span-full flex flex-col items-center justify-center p-12 text-center"
                dir="rtl"
              >
                <div className="rounded-full bg-muted/50 p-6 mb-4">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  אין ביקורות בקטגוריה זו
                </h3>
                <p className="text-muted-foreground max-w-md">
                  לא נמצאו ביקורות בקטגוריה שבחרת. אולי תרצה להיות הראשון לכתוב
                  ביקורת?
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <ReviewModal
        place={selectedPlace}
        isOpen={isPlaceModalOpen}
        onOpenChange={setisPlaceModalOpen}
      />
    </main>
  );
}
