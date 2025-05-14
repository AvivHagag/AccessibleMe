"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonStanding, Moon, Sun, ZoomIn, ZoomOut, Type } from "lucide-react";

export default function AccessibilityControls({
  theme,
  setTheme,
  highContrast,
  setHighContrast,
}: {
  theme: string | undefined;
  setTheme: (theme: "light" | "dark") => void;
  highContrast: boolean;
  setHighContrast: (highContrast: boolean) => void;
}) {
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;

    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
      document.body.classList.add("high-contrast");
      document.body.style.background = "#000";
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = "#000";
      if (theme === "dark") {
        document.documentElement.classList.remove("dark");
      }
    } else {
      document.documentElement.classList.remove("high-contrast");
      document.body.classList.remove("high-contrast");
      document.body.style.background = "";
      document.body.style.backgroundImage = "";
      document.body.style.backgroundColor = "";
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [fontSize, highContrast, theme]);

  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
    }
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const toggleTheme = () => {
    if (!highContrast) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild className="z-[100]">
          <Button
            variant="outline"
            size="icon"
            aria-label="Accessibility settings"
            className="rounded-full shadow-lg hover:bg-accent/90 transition-colors "
          >
            <PersonStanding className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-[100]"
        >
          <DropdownMenuLabel className="font-semibold">
            הגדרות נגישות
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={toggleTheme}
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50"
            disabled={highContrast}
          >
            {theme === "light" ? (
              <>
                <span>מצב כהה</span>
                <Moon className="h-4 w-4 mr-2" />
              </>
            ) : (
              <>
                <span>מצב בהיר</span>
                <Sun className="h-4 w-4 mr-2" />
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={toggleHighContrast}
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50"
          >
            <span>ניגודיות גבוהה {highContrast ? "(פעיל)" : "(כבוי)"}</span>
            <Type className="h-4 w-4 mr-2" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={increaseFontSize}
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50"
          >
            <span>הגדל גודל גופן</span>
            <ZoomIn className="h-4 w-4 mr-2" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={decreaseFontSize}
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50"
          >
            <span>הקטן גודל גופן</span>
            <ZoomOut className="h-4 w-4 mr-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
