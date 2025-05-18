"use client";

import { FormEvent, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Prediction = {
  description: string;
  place_id: string;
};

export default function HeroSearch({
  searchValue,
  onSearchChange,
  onSelectPlace,
  onSearch,
  showDropdown,
  setShowDropdown,
}: {
  searchValue: string;
  onSearchChange: (v: string) => void;
  onSelectPlace: (placeId: string, description: string) => void;
  onSearch: () => void;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
}) {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (!searchValue.trim()) {
      setPredictions([]);
      setShowDropdown(false);
      return;
    }
    setShowDropdown(true);
    clearTimeout(debounceTimer);
    const timer = setTimeout(async () => {
      const res = await fetch(
        `/api/places/autocomplete?input=${encodeURIComponent(searchValue)}`
      );
      const data = await res.json();
      setPredictions(data.predictions || []);
    }, 300);
    setDebounceTimer(timer);
    return () => clearTimeout(timer);
  }, [searchValue, setShowDropdown]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleSelectPlace = (placeId: string, description: string) => {
    onSelectPlace(placeId, description);
  };

  return (
    <section
      className={`pt-12 md:pt-24 pb-12 ${
        searchValue === "" ? "pb-12 md:pb-24" : "pb-6 md:pb-12"
      } `}
    >
      <form
        onSubmit={handleSubmit}
        className="container px-4 md:px-6 max-w-5xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
          הוסיפו חוות דעת על מקומות נגישים
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          שתפו את החוויות שלכם, הוסיפו חוות דעת ודירוגים על נגישות של מסעדות,
          חנויות, מוסדות ציבור ועוד – עזרו לאחרים למצוא מקומות נגישים באמת
        </p>
        <div className="relative flex">
          <Button
            type="submit"
            onClick={onSearch}
            className="group h-14 px-4 sm:px-6 rounded-l-full rounded-r-none bg-white/20 text-mint-darkest hover:bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/30 dark:border-mint-darkest dark:text-mint-darkest shadow-lg focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          >
            <Search className="h-6 w-6 text-mint-darkest group-hover:text-black dark:group-hover:text-white" />
            <span className="hidden sm:blockgroup-hover:text-black dark:group-hover:text-white">
              חיפוש
            </span>
          </Button>
          <Input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="חפש מקום או קטגוריה..."
            className="w-full pl-4 pr-10 py-3 h-14 text-right rounded-r-full rounded-l-none bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 dark:border-mint-darkest dark:text-mint-darkest shadow-lg focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            dir="rtl"
          />

          {showDropdown && predictions.length > 0 && (
            <ul className="absolute z-20 mt-2 w-full bg-white/20 dark:bg-black backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border border-white/30 dark:border-mint-darkest rounded-2xl shadow-md overflow-hidden top-14 right-0">
              {predictions.map((p) => (
                <li
                  key={p.place_id}
                  className="px-4 py-2.5 hover:bg-mint-medium/50 cursor-pointer text-right text-black dark:text-white text-sm transition-colors"
                  onClick={() => handleSelectPlace(p.place_id, p.description)}
                >
                  {p.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </section>
  );
}
