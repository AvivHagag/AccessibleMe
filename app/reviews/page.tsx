import { Review } from "@/lib/types";
import ReviewsPage from "./reviews-page";

const mockReviews: Review[] = [
  {
    id: "1",
    placeName: "קפה נגיש",
    placeType: "קפה",
    overallRating: 4.5,
    description:
      "מקום נגיש מאוד עם שירות מעולה. החנייה נגישה ונוחה, והכניסה רחבה מספיק לכיסא גלגלים.",
    author: "Sarah Cohen",
    date: new Date("2024-03-15"),
    accessibilityFeatures: {
      wheelchairAccess: true,
      disabledParking: true,
      clearSignage: true,
      audioSystems: false,
      adaptedServices: true,
      accessibleLocation: true,
    },
  },
  {
    id: "2",
    placeName: "מסעדת נגישות",
    placeType: "מסעדה",
    overallRating: 5,
    description:
      "חניית נכים מסודרת וקרובה לכניסה. יש מספיק מקומות חנייה נגישים.",
    author: "David Levi",
    date: new Date("2024-03-10"),
    accessibilityFeatures: {
      wheelchairAccess: true,
      disabledParking: true,
      clearSignage: true,
      audioSystems: true,
      adaptedServices: true,
      accessibleLocation: true,
    },
  },
  {
    id: "3",
    placeName: "מוזיאון נגיש",
    placeType: "מוזיאון",
    overallRating: 3.5,
    description:
      "השילוט היה ברור אבל אפשר לשפר את המיקום שלו. לא תמיד קל לראות את השלטים.",
    author: "Rachel Mizrahi",
    date: new Date("2024-03-05"),
    accessibilityFeatures: {
      wheelchairAccess: true,
      disabledParking: true,
      clearSignage: false,
      audioSystems: true,
      adaptedServices: true,
      accessibleLocation: true,
    },
  },
  {
    id: "4",
    placeName: "תיאטרון נגיש",
    placeType: "תיאטרון",
    overallRating: 4,
    description: "מערכת השמע עובדת טוב, אבל יש מקומות בהם האודיו לא מספיק חזק.",
    author: "Michael Ben",
    date: new Date("2024-02-28"),
    accessibilityFeatures: {
      wheelchairAccess: true,
      disabledParking: true,
      clearSignage: true,
      audioSystems: false,
      adaptedServices: true,
      accessibleLocation: true,
    },
  },
];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ term?: string; category?: string }>;
}) {
  const { term, category = "all" } = await searchParams;
  const filteredReviews = mockReviews.filter((review) => {
    const matchesCategory =
      category === "all"
        ? true
        : review.accessibilityFeatures[
            category as keyof typeof review.accessibilityFeatures
          ];

    return matchesCategory;
  });

  return (
    <main className="flex-1 min-h-[600px]">
      <ReviewsPage filteredReviews={filteredReviews} category={category} />
    </main>
  );
}
