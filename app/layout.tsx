import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AccessibleMe – Accessibility Reviews for Everyone",
  description:
    "AccessibleMe is a collaborative platform where users can share and discover reviews about accessibility in public places. With features like star ratings, category-based filtering, and accessible UI for all users, it empowers the disabled community with trustworthy insights. Offensive content is filtered automatically to ensure a safe and inclusive experience.",
  keywords: [
    "accessibility",
    "AccessibleMe",
    "disability",
    "accessibility reviews",
    "inclusive design",
    "disabled access",
    "accessible parking",
    "accessible services",
    "public access",
    "assistive community",
    "accessible restaurants",
    "barrier-free",
    "wheelchair access",
    "accessibility database",
    "accessible places",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[linear-gradient(to_bottom,_#E5F8EF_0%,_#A5E4C2_33%,_#BDEAF1_67%,_#F3F3F3_100%)]`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1 min-h-[600px] h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
