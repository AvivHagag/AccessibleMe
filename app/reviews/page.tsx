import { Review } from "@/lib/types";
import ReviewsPage from "./reviews-page";
import { getDataByCategory } from "@/active/reviews";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "all" } = await searchParams;
  const filteredPlaces = await getDataByCategory(category);

  return (
    <main className="flex-1 min-h-[600px]">
      <ReviewsPage filteredPlaces={filteredPlaces} category={category} />
    </main>
  );
}
