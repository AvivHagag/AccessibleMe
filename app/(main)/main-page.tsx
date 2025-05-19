"use client";
import HeroSearch from "@/components/main-page/HeroSearch";
import AccessibilityCategories from "@/components/main-page/accessibility-categories";
import PlacesSection from "@/components/main-page/places-section";
import PlacesResults from "@/components/search/places-results";
import { Category, Place } from "@/lib/types";
import { useState } from "react";
import { ReviewModal } from "@/components/ui/review-modal";

export default function MainPage({
  Places,
  categories,
}: {
  Places: Place[];
  categories: Category[];
}) {
  const [term, setTerm] = useState<string>("");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isPlaceModalOpen, setisPlaceModalOpen] = useState<boolean>(false);

  const handlePlaceSelect = (placeId: string) => {
    const place = Places.find((place) => place.id === placeId);

    if (place) {
      setSelectedPlace(place);
      setisPlaceModalOpen(true);
    }
  };

  const Reviews = Places.map((place) => place.reviews).flat();
  return (
    <main className="flex flex-col items-center gap-12 mb-24 min-h-screen">
      <HeroSearch
        searchValue={term}
        onSearchChange={(v: string) => setTerm(v)}
      />
      {term === "" ? (
        <>
          <AccessibilityCategories categories={categories} />
          <PlacesSection
            reviews={Reviews}
            categories={categories}
            onPlaceSelect={handlePlaceSelect}
            places={Places}
          />
        </>
      ) : (
        <PlacesResults
          term={term}
          reviews={Reviews}
          places={Places}
          onPlaceSelect={handlePlaceSelect}
        />
      )}

      <ReviewModal
        place={selectedPlace}
        isOpen={isPlaceModalOpen}
        onOpenChange={setisPlaceModalOpen}
      />
    </main>
  );
}
