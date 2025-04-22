"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

export default function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
          גלו מקומות נגישים בקלות
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          חפשו, שתפו ודרגו נגישות של מסעדות, חנויות, מוסדות ציבור ועוד – בנו יחד
          קהילה שעוזרת לכולנו לבחור מקומות נגישים ובאמת מתאימים
        </p>

        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search className="absolute right-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="חפש מקום או קטגוריה (לדוגמה: מסעדה, חניית נכים...)"
                className="w-full pl-4 pr-10 py-3 h-14 text-right rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                dir="rtl"
              />
            </div>
            <Button
              type="submit"
              className="mt-4 py-3 h-12 px-8 rounded-full text-lg font-medium bg-black hover:bg-black/90 text-white"
            >
              חפש עכשיו
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
