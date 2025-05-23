"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState, useEffect } from "react";
import AccessibilityControls from "./accessibility-controls";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <AccessibilityControls
        theme={theme}
        setTheme={setTheme}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />
      <div className="relative">
        <nav
          className={`max-w-4xl mx-auto rounded-full high-contrast:border high-contrast:border-gray-600 bg-white/80 dark:bg-transparent dark:border-[1px] dark:border-mint-teal backdrop-blur-md mt-2 shadow-md px-2 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex justify-between h-12">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/AccessibleMeLogo1.png"
                  alt="AccessibleMe Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="font-bold text-xl text-mint-teal">
                  AccessibleMe
                </span>
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-mint-darkest dark:text-white p-2"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div
                className={`flex items-center gap-2 ${
                  highContrast ? "hidden" : ""
                }`}
              >
                <div
                  className={`h-[24px] w-[44px] rounded-full p-[1px] cursor-pointer border dark:border-mint-teal  ${
                    mounted && theme === "dark"
                      ? "bg-transparent"
                      : "bg-mint-light"
                  }`}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <div
                    className={`bg-white dark:bg-mint-teal h-[20px] w-[20px] rounded-full transform transition-transform ${
                      mounted && theme === "dark"
                        ? "translate-x-[20px]"
                        : "translate-x-0"
                    }`}
                  />
                </div>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:hidden block text-mint-darkest" />
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-mint-teal hidden dark:block" />
              </div>
              <Link href="/add-review">
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent text-mint-darkest border-mint-darkest hover:text-mint-darkest hover:brightness-125 dark:text-mint-teal dark:border-mint-teal hover:dark:brightness-75 rounded-3xl"
                >
                  <span>הוספת ביקורת</span>
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <div
          className={`md:hidden absolute top-0 left-0 right-0 z-20 px-2 bg-white dark:bg-gray-900/80 backdrop-blur-md rounded-t-4xl rounded-2xl shadow-md transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 h-screen"
              : "opacity-0 h-0 pointer-events-none overflow-hidden"
          }`}
        >
          <div className="flex justify-between py-1">
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
              onClick={toggleMenu}
            >
              <Image
                src="/AccessibleMeLogo1.png"
                alt="AccessibleMe Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="font-bold text-xl text-mint-teal">
                AccessibleMe
              </span>
            </Link>
            <button
              onClick={toggleMenu}
              className="text-mint-darkest dark:text-white p-2"
              aria-label="Toggle menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-3 pb-4">
            <div
              className={`flex items-center justify-center gap-2 py-2 ${
                highContrast ? "hidden" : ""
              }`}
            >
              <div
                className={`h-[24px] w-[44px] rounded-full p-[1px] cursor-pointer border border-mintt-teal ${
                  mounted && theme === "dark"
                    ? "bg-transparent"
                    : "bg-mint-light"
                }`}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <div
                  className={`bg-white h-[20px] w-[20px] rounded-full transform transition-transform ${
                    mounted && theme === "dark"
                      ? "translate-x-[20px]"
                      : "translate-x-0"
                  }`}
                />
              </div>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:hidden block text-mint-darkest" />
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-white hidden dark:block" />
            </div>
            <Link href="/add-review" onClick={toggleMenu}>
              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent text-mint-darkest border-mint-darkest hover:text-mint-darkest hover:brightness-125 dark:text-mint-teal dark:border-mint-teal rounded-3xl"
              >
                <span>הוספת ביקורת</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
