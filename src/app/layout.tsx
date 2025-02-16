import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { LanguageProvider } from "@/lib/contexts/LanguageContext";
import { GameProvider } from "@/lib/contexts/GameContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Numbers Game",
  description: "A game of numbers and strategy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://tracker.emreihtiyar.me/tracker.js"
          data-website-id="cm73v74nu00015rpjjmfa6oya"
          async
          defer
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <GameProvider>
            <Navbar />
            {children}
          </GameProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
