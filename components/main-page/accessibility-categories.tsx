"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Category } from "@/lib/types";
import {
  Accessibility,
  Car,
  SignpostBig,
  Volume2,
  Info,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccessibilityCategories({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();

  const handleCardClick = (category: string) => {
    router.push(`/reviews?category=${category}`);
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    wheelchairAccess: (
      <Accessibility className="h-8 w-8 mb-2 text-primary dark:text-mint-darkest" />
    ),
    disabledParking: (
      <Car className="h-8 w-8 mb-2 text-primary dark:text-mint-darkest" />
    ),
    clearSignage: (
      <SignpostBig className="h-8 w-8 mb-2 text-primary dark:text-mint-darkest" />
    ),
    audioSystems: (
      <Volume2 className="h-8 w-8 mb-2 text-primary dark:text-mint-darkest" />
    ),
    adaptedServices: (
      <Info className="h-8 w-8 mb-2 text-primary dark:text-mint-darkest" />
    ),
    accessibleLocation: (
      <MapPin className="h-8 w-8 mb-2 text-primary dark:text-mint-darkest" />
    ),
  };

  return (
    <section className="mx-2 md:p-2 max-w-6xl bg-white/20 dark:bg-black/10 dark:backdrop-blur-0 backdrop-blur-lg border border-white/40 dark:border-mint-darkest rounded-xl">
      <div className="mx-auto p-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              קטגוריות נגישות
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              אנחנו מדרגים מקומות על פי מאפייני הנגישות החשובים הבאים
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 w-full gap-12 mt-8">
          {categories
            .filter((category) => category.id !== "all")
            .map((category: Category) => (
              <Card
                key={category.id}
                className="flex flex-col items-center text-center bg-white/50 dark:bg-black dark:text-mint-darkest dark:border-mint-darkest backdrop-blur-md p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleCardClick(category.id)}
              >
                {categoryIcons[category.id]}
                <CardTitle className="text-sm">{category.label}</CardTitle>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
