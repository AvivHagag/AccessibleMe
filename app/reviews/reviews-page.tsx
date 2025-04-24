"use client";
import { format } from "date-fns";
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
import { Review } from "@/lib/types";

interface ReviewsPageProps {
  filteredReviews: Review[];
  category: string;
}

export default function ReviewsPage({
  filteredReviews,
  category,
}: ReviewsPageProps) {
  return (
    <main className="flex flex-col items-center gap-12 my-24">
      <section className="mx-2 md:p-2 max-w-6xl bg-white/20 backdrop-blur-lg border border-white/40 rounded-xl">
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
                    filteredReviews.length === 1
                      ? "תוצאה אחת"
                      : filteredReviews.length + " " + "תוצאות"
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
                    <p className="text-muted-foreground mb-4">
                      {review.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                      {review.accessibilityFeatures.wheelchairAccess && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Accessibility className="h-5 w-5" />
                          <span className="sr-only">Wheelchair Access</span>
                        </Badge>
                      )}
                      {review.accessibilityFeatures.disabledParking && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Car className="h-5 w-5" />
                          <span className="sr-only">Disabled Parking</span>
                        </Badge>
                      )}
                      {review.accessibilityFeatures.clearSignage && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <SignpostBig className="h-5 w-5" />
                          <span className="sr-only">Clear Signage</span>
                        </Badge>
                      )}
                      {review.accessibilityFeatures.audioSystems && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Volume2 className="h-5 w-5" />
                          <span className="sr-only">Audio Systems</span>
                        </Badge>
                      )}
                      {review.accessibilityFeatures.adaptedServices && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          <Info className="h-5 w-5" />
                          <span className="sr-only">Adapted Services</span>
                        </Badge>
                      )}
                      {review.accessibilityFeatures.accessibleLocation && (
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1"
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
    </main>
  );
}

function getCategoryLabel(categoryId: string): string {
  const categories = {
    accessibleLocation: "מיקום נגיש",
    adaptedServices: "שירותים מותאמים",
    audioSystems: "מערכות שמע",
    clearSignage: "שילוט ברור",
    disabledParking: "חניית נכים",
    wheelchairAccess: "גישה לכיסאות גלגלים",
  };

  return categories[categoryId as keyof typeof categories] || categoryId;
}
