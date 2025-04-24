"use client";

import { useState } from "react";
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
import { Category, Review } from "@/lib/types";

export default function ReviewsSection({
  reviews,
  categories,
  onReviewSelect,
}: {
  reviews: Review[];
  categories: Category[];
  onReviewSelect: (review: Review) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredReviews =
    selectedCategory === "all"
      ? reviews
      : reviews.filter(
          (review) =>
            review.accessibilityFeatures[
              selectedCategory as keyof Review["accessibilityFeatures"]
            ]
        );

  return (
    <section className="mx-2 md:p-2 max-w-6xl bg-white/20 backdrop-blur-lg border border-white/40 rounded-xl">
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
            <TabsList className="w-full grid grid-cols-7 bg-white/40 border border-mint-dark text-mint-darkest backdrop-blur-md rounded-xl">
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
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <Card
                key={review.id}
                className="flex flex-col h-full bg-white/50 backdrop-blur-md border-mint-medium"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        {review.placeName}
                      </CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {review.placeType}
                      </Badge>
                    </div>
                    <StarRating rating={review.overallRating} />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-base text-muted-foreground mb-4 line-clamp-2 overflow-hidden">
                    {review.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {review.accessibilityFeatures.wheelchairAccess && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-mint-lightestrounded-full p-1"
                      >
                        <Accessibility className="h-5 w-5" />
                        <span className="sr-only">Wheelchair Access</span>
                      </Badge>
                    )}
                    {review.accessibilityFeatures.disabledParking && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-mint-lightestrounded-full p-1"
                      >
                        <Car className="h-5 w-5" />
                        <span className="sr-only">Disabled Parking</span>
                      </Badge>
                    )}
                    {review.accessibilityFeatures.clearSignage && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-mint-lightestrounded-full p-1"
                      >
                        <SignpostBig className="h-5 w-5" />
                        <span className="sr-only">Clear Signage</span>
                      </Badge>
                    )}
                    {review.accessibilityFeatures.audioSystems && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-mint-lightestrounded-full p-1"
                      >
                        <Volume2 className="h-5 w-5" />
                        <span className="sr-only">Audio Systems</span>
                      </Badge>
                    )}
                    {review.accessibilityFeatures.adaptedServices && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-mint-lightestrounded-full p-1"
                      >
                        <Info className="h-5 w-5" />
                        <span className="sr-only">Adapted Services</span>
                      </Badge>
                    )}
                    {review.accessibilityFeatures.accessibleLocation && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-mint-lightestrounded-full p-1"
                      >
                        <MapPin className="h-5 w-5" />
                        <span className="sr-only">Accessible Location</span>
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter
                  className="flex justify-between border-t py-2"
                  dir="rtl"
                >
                  <div className="flex flex-col">
                    <div className="text-sm text-muted-foreground">
                      מאת {review.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(review.date, "dd/MM/yyyy")}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="bg-mint-teal/70 text-white hover:bg-mint-teal"
                    size="sm"
                    onClick={() => onReviewSelect(review)}
                  >
                    קרא עוד
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
