"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accessibility,
  Car,
  SignpostBig,
  Volume2,
  Info,
  MapPin,
} from "lucide-react";
import { Category, placeReview, Place } from "@/lib/types";

export default function PlacesSection({
  reviews,
  categories,
  onPlaceSelect,
  places,
}: {
  reviews: placeReview[];
  categories: Category[];
  onPlaceSelect: (placeId: string) => void;
  places: Place[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredReviews =
    selectedCategory === "all"
      ? reviews
      : reviews.filter(
          (review) =>
            review.accessibilityFeatures[
              selectedCategory as keyof placeReview["accessibilityFeatures"]
            ]
        );

  const placeMap = new Map();

  filteredReviews.forEach((review) => {
    if (!placeMap.has(review.placeId)) {
      placeMap.set(review.placeId, {
        place: places.find((place) => place.id === review.placeId),
        address: places.find((place) => place.id === review.placeId)?.address,
        reviews: [],
        averageRating: 0,
        accessibilityFeatures: {
          wheelchairAccess: false,
          disabledParking: false,
          clearSignage: false,
          audioSystems: false,
          adaptedServices: false,
          accessibleLocation: false,
        },
      });
    }

    const placeData = placeMap.get(review.placeId);
    placeData.reviews.push(review);

    // Update accessibility features if any review has them
    Object.keys(review.accessibilityFeatures).forEach((feature) => {
      if (review.accessibilityFeatures[feature]) {
        placeData.accessibilityFeatures[feature] = true;
      }
    });
  });

  // Calculate average rating for each place
  placeMap.forEach((placeData) => {
    const totalRating = placeData.reviews.reduce(
      (sum: number, review: placeReview) => sum + review.rating,
      0
    );
    placeData.averageRating =
      placeData.reviews.length > 0 ? totalRating / placeData.reviews.length : 0;
  });

  const placesData = Array.from(placeMap.values());

  return (
    <section className="mx-2 md:p-2 max-w-6xl bg-white/20 dark:bg-black backdrop-blur-lg border border-white/40 dark:border-mint-darkest rounded-xl">
      <div className="mx-auto p-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            ביקורות משתמשים
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            מה אומרים המשתמשים על הנגישות במקום
          </p>
        </div>

        <div className="md:hidden w-full mb-8">
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            dir="rtl"
          >
            <SelectTrigger className="w-full bg-white/40 border-mint-dark text-mint-darkest">
              <SelectValue placeholder="בחר קטגוריה" />
            </SelectTrigger>
            <SelectContent className="bg-mint-lightest border-mint-dark text-mint-darkest">
              {categories
                .slice()
                .reverse()
                .map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="focus:bg-mint-medium focus:text-black"
                  >
                    {category.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden md:block w-full mb-8">
          <Tabs
            defaultValue={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <TabsList className="w-full grid grid-cols-7 bg-white/40 dark:bg-black/70 border border-mint-dark text-mint-darkest backdrop-blur-md rounded-xl">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-mint-teal data-[state=active]:text-white text-xs lg:text-base data-[state=active]:rounded-lg"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 min-h-[400px]"
          dir="rtl"
        >
          {placesData.length > 0 ? (
            placesData.map((placeData) => (
              <Card
                key={placeData.place.id}
                className="flex flex-col h-full bg-white/50 dark:bg-black dark:text-mint-darkest dark:border-mint-darkest backdrop-blur-md border-mint-medium overflow-hidden"
              >
                <div className="relative w-full h-48">
                  {placeData.place.image ? (
                    <Image
                      src={placeData.place.image}
                      alt={placeData.place.name}
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
                      <CardTitle className="text-xl">
                        {placeData.place.name}
                      </CardTitle>
                    </div>
                    <StarRating rating={placeData.averageRating} />
                  </div>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {placeData.place.placeTypes?.map(
                      (type: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {type}
                        </Badge>
                      )
                    )}
                  </div>
                  {placeData.place.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {placeData.place.description}
                    </p>
                  )}
                  {placeData.address && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {placeData.address}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {placeData.accessibilityFeatures.wheelchairAccess && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 bg-mint-medium dark:bg-mint-darkest/20"
                      >
                        <Accessibility className="h-5 w-5" />
                        <span className="sr-only">Wheelchair Access</span>
                      </Badge>
                    )}
                    {placeData.accessibilityFeatures.disabledParking && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 bg-mint-medium dark:bg-mint-darkest/20"
                      >
                        <Car className="h-5 w-5" />
                        <span className="sr-only">Disabled Parking</span>
                      </Badge>
                    )}
                    {placeData.accessibilityFeatures.clearSignage && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 bg-mint-medium dark:bg-mint-darkest/20"
                      >
                        <SignpostBig className="h-5 w-5" />
                        <span className="sr-only">Clear Signage</span>
                      </Badge>
                    )}
                    {placeData.accessibilityFeatures.audioSystems && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 bg-mint-medium dark:bg-mint-darkest/20"
                      >
                        <Volume2 className="h-5 w-5" />
                        <span className="sr-only">Audio Systems</span>
                      </Badge>
                    )}
                    {placeData.accessibilityFeatures.adaptedServices && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 bg-mint-medium dark:bg-mint-darkest/20"
                      >
                        <Info className="h-5 w-5" />
                        <span className="sr-only">Adapted Services</span>
                      </Badge>
                    )}
                    {placeData.accessibilityFeatures.accessibleLocation && (
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
                    onClick={() => onPlaceSelect(placeData.place.id)}
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
  );
}
