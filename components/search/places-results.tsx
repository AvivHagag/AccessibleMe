"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import {
  Accessibility,
  Car,
  SignpostBig,
  Volume2,
  Info,
  MapPin,
} from "lucide-react";
import { accessibilityFeaturesTypes, Place, placeReview } from "@/lib/types";
import Loader from "@/components/Loader";

interface PlacesResultsProps {
  loading: boolean;
  term: string;
  reviews: placeReview[];
  places: Place[];
  onPlaceSelect: (placeId: string) => void;
}

export default function PlacesResults({
  loading,
  term,
  reviews,
  places,
  onPlaceSelect,
}: PlacesResultsProps) {
  const searchFilteredPlaces = term
    ? places.filter(
        (place) =>
          place.name.toLowerCase().includes(term.toLowerCase()) ||
          place.placeTypes.some((type) =>
            type.toLowerCase().includes(term.toLowerCase())
          ) ||
          place.description?.toLowerCase().includes(term.toLowerCase()) ||
          place.address?.toLowerCase().includes(term.toLowerCase()) ||
          place.reviews.some((review) => {
            const features = review.accessibilityFeatures;
            const searchTerm = term.toLowerCase();
            return Object.keys(features).some((featureKey) => {
              if (features[featureKey as keyof typeof features]) {
                const featureType = accessibilityFeaturesTypes.find(
                  (type) => type.id === featureKey
                );
                return featureType?.label.toLowerCase().includes(searchTerm);
              }
              return false;
            });
          })
      )
    : places;

  const placeMap = new Map();

  searchFilteredPlaces.forEach((place) => {
    placeMap.set(place.id, {
      place: place,
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
  });

  reviews.forEach((review) => {
    if (placeMap.has(review.placeId)) {
      const placeData = placeMap.get(review.placeId);
      placeData.reviews.push(review);

      Object.keys(review.accessibilityFeatures).forEach((feature) => {
        if (review.accessibilityFeatures[feature]) {
          placeData.accessibilityFeatures[feature] = true;
        }
      });
    }
  });

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
          {term ? (
            <>
              <h2
                className="text-3xl font-bold tracking-normal md:text-4xl/tight"
                dir="rtl"
              >
                תוצאות חיפוש עבור "{term}"
              </h2>
              <p
                className="max-w-[900px] text-muted-foreground md:text-xl/relaxed"
                dir="rtl"
              >
                {loading
                  ? `מחפש…`
                  : `${
                      placesData.length === 1
                        ? "תוצאה אחת"
                        : placesData.length + " " + "תוצאות"
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
        {loading ? (
          <div className="flex items-center justify-center mb-24">
            <Loader size={50} color="#36d7b7" />
          </div>
        ) : (
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
                    {placeData.place.address && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {placeData.place.address}
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
                      פרטי המקום
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
                  {term ? "לא נמצאו תוצאות לחיפוש" : "אין ביקורות בקטגוריה זו"}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {term
                    ? `לא נמצאו ביקורות התואמות לחיפוש "${term}"`
                    : "לא נמצאו ביקורות בקטגוריה שבחרת. אולי תרצה להיות הראשון לכתוב ביקורת?"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
