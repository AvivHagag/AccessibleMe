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
import {
  PersonStanding,
  Settings,
  Moon,
  Sun,
  ZoomIn,
  ZoomOut,
  Type,
} from "lucide-react";

export default function AccessibilityControls() {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;

    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Accessibility settings"
            className="rounded-full shadow-lg hover:bg-accent/90 transition-colors"
          >
            <PersonStanding className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <DropdownMenuLabel className="font-semibold">
            Accessibility Settings
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={toggleTheme}
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50"
          >
            {theme === "light" ? (
              <>
                <span>Dark Mode</span>
                <Moon className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                <span>Light Mode</span>
                <Sun className="h-4 w-4 ml-2" />
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={toggleHighContrast}
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50"
          >
            <span>High Contrast {highContrast ? "(On)" : "(Off)"}</span>
            <Type className="h-4 w-4 ml-2" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={increaseFontSize}
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50"
          >
            <span>Increase Font Size</span>
            <ZoomIn className="h-4 w-4 ml-2" />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={decreaseFontSize}
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50"
          >
            <span>Decrease Font Size</span>
            <ZoomOut className="h-4 w-4 ml-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
