"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function HeroSearch({
  searchValue,
  onSearchChange,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <section
      className={`pt-12 md:pt-24 pb-12 ${
        searchValue === "" ? "pb-12 md:pb-24" : "pb-6 md:pb-12"
      } `}
    >
      <div className="container px-4 md:px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
          גלו מקומות נגישים בקלות
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          חפשו, שתפו ודרגו נגישות של מסעדות, חנויות, מוסדות ציבור ועוד – בנו יחד
          קהילה שעוזרת לכולנו לבחור מקומות נגישים ובאמת מתאימים
        </p>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="relative">
              <Search className="absolute right-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="חפש מקום או קטגוריה (לדוגמה: מסעדה, חניית נכים...)"
                className="w-full pl-4 pr-10 py-3 h-14 text-right rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                dir="rtl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
