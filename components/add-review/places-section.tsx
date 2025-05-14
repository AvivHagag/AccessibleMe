import { PlaceDetails } from "@/app/add-review/page";
import { Search } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface PlacesSectionProps {
  searchResults: PlaceDetails[] | null;
  isSearching: boolean;
  term: string;
  handleOpenReviewModal: (place: PlaceDetails) => void;
}

export default function PlacesSection({
  searchResults,
  isSearching,
  term,
  handleOpenReviewModal,
}: PlacesSectionProps) {
  return (
    <section className="w-full max-w-4xl space-y-2 py-4 bg-white/20 dark:bg-black backdrop-blur-lg border border-white/40 dark:border-mint-darkest rounded-xl">
      <h1 className="text-2xl font-bold text-center">תוצאות החיפוש</h1>
      <p className="text-muted-foreground text-center">
        בחר מקום מהרשימה על מנת לכתוב ביקורת
      </p>
      <div className="w-full space-y-4 px-4 md:px-10">
        {isSearching && <p className="text-center">מחפש…</p>}
        {!isSearching &&
          searchResults &&
          searchResults.length === 0 &&
          term.trim() && (
            <div
              className="col-span-full flex flex-col items-center justify-center pb-12 text-center"
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

        {!isSearching &&
          searchResults &&
          searchResults.map((place) => (
            <div
              key={place.id}
              className="flex flex-row border bg-white/20 dark:bg-black/40 backdrop-blur-lg border-mint-dark text-mint-darkest rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden"
              dir="rtl"
              onClick={() => handleOpenReviewModal(place)}
            >
              {place.image ? (
                <div className="relative min-w-32 sm:min-w-40 min-h-24 sm:min-h-36 h-auto">
                  <Image
                    src={place.image}
                    alt={place.name}
                    className="object-cover h-full rounded-r-lg"
                    fill
                  />
                </div>
              ) : (
                <div className="min-w-[120px] bg-gray-100 flex items-center justify-center text-gray-400 rounded-l-lg">
                  <span className="text-xs">אין תמונה</span>
                </div>
              )}

              <div className="flex-1 flex flex-col justify-between text-right p-2 sm:p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {place.name}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {place.types.slice(0, 2).map((type, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1 bg-mint-medium dark:bg-mint-darkest/20"
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
                {place.description && (
                  <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                    {place.description}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-gray-500 mb-3">
                  {place.address}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
