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
    <main className="flex-1 min-h-screen">
      <ReviewsPage filteredPlaces={filteredPlaces} category={category} />
    </main>
  );
}
