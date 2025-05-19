"use client";

import HeroSearch from "@/components/add-review/HeroSearch";
import { useState } from "react";
import { AddReviewModal } from "@/components/ui/add-review-modal";
import { useRouter } from "next/navigation";
import PlacesSection from "@/components/add-review/places-section";
import { createReview } from "@/active/reviews";

export type PlaceDetails = {
  id: string;
  name: string;
  address: string;
  types: string[];
  image: string | null;
  description?: string | null;
  accessibilityFeatures: {
    wheelchairAccess: boolean;
    disabledParking: boolean;
    clearSignage: boolean;
    audioSystems: boolean;
    adaptedServices: boolean;
    accessibleLocation: boolean;
  };
};

export default function AddReviewPage() {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<PlaceDetails[] | null>(
    null
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const onSearch = async () => {
    if (!term.trim()) return;
    setIsSearching(true);
    setSearchResults([]);
    const { predictions } = await fetch(
      `/api/places/autocomplete?input=${encodeURIComponent(term)}`
    ).then((r) => r.json());
    const results = await Promise.all(
      predictions.map(async (p: { place_id: string; description: string }) => {
        const data = await fetch(`/api/places/${p.place_id}`).then((r) =>
          r.json()
        );
        return { id: p.place_id, ...data };
      })
    );
    setSearchResults(results);
    setIsSearching(false);
    setShowDropdown(false);
  };

  const onSelectPlace = async (placeId: string, text: string) => {
    setTerm(text);
    setShowDropdown(false);
    setIsSearching(true);
    setSearchResults([]);
    const data = await fetch(`/api/places/${placeId}`).then((r) => r.json());
    const placeDetails = { id: placeId, ...data };
    setSearchResults([placeDetails]);
    setSelectedPlace(placeDetails);
    setIsSearching(false);
    setShowDropdown(false);
  };

  const handleOpenReviewModal = (place: PlaceDetails) => {
    setSelectedPlace(place);
    setReviewModalOpen(true);
  };

  const handleSubmitReview = async (review: {
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
  }) => {
    if (!selectedPlace) return;
    try {
      const newReview = {
        id: selectedPlace.id,
        comment: review.description,
        placeName: selectedPlace.name,
        placeType: selectedPlace.types[0],
        address: selectedPlace.address,
        overallRating: review.rating,
        author: review.author || "אנונימי",
        date: new Date(),
        accessibilityFeatures: review.accessibilityFeatures,
        description: selectedPlace.description || "",
        image: selectedPlace.image || "",
      };
      await createReview(newReview);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center gap-12 mb-24 min-h-screen">
      <HeroSearch
        searchValue={term}
        onSearchChange={setTerm}
        onSelectPlace={onSelectPlace}
        onSearch={onSearch}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />
      <PlacesSection
        searchResults={searchResults}
        isSearching={isSearching}
        term={term}
        handleOpenReviewModal={handleOpenReviewModal}
      />

      <AddReviewModal
        place={selectedPlace}
        isOpen={reviewModalOpen}
        onOpenChange={setReviewModalOpen}
        onSubmitReview={handleSubmitReview}
      />

      <div className="mb-32"></div>
    </main>
  );
}
