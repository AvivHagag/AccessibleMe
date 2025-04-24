"use client";
import HeroSearch from "@/components/main-page/HeroSearch";
import AccessibilityCategories from "@/components/main-page/accessibility-categories";
import ReviewsSection from "@/components/main-page/reviews-section";
import ReviewsResults from "@/components/search/reviews-results";
import { Category, Review } from "@/lib/types";
import { useState } from "react";
import { ReviewModal } from "@/components/ui/review-modal";

export default function MainPage({
  reviews,
  categories,
}: {
  reviews: Review[];
  categories: Category[];
}) {
  const [term, setTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const handleReviewSelect = (review: Review) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

  return (
    <main className="flex flex-col items-center gap-12 mb-24">
      <HeroSearch
        searchValue={term}
        onSearchChange={(v: string) => setTerm(v)}
      />
      {term === "" ? (
        <>
          <AccessibilityCategories categories={categories} />
          <ReviewsSection
            reviews={reviews}
            categories={categories}
            onReviewSelect={handleReviewSelect}
          />
        </>
      ) : (
        <ReviewsResults
          loading={loading}
          term={term}
          reviews={reviews}
          onReviewSelect={handleReviewSelect}
        />
      )}

      <ReviewModal
        review={selectedReview}
        isOpen={isReviewModalOpen}
        onOpenChange={setIsReviewModalOpen}
      />
    </main>
  );
}
