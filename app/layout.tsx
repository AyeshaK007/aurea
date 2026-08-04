
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "AUREA — Science That Glows",
  description: "Luxury skincare with minimal science and maximum results.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body 
        suppressHydrationWarning
        className="bg-[#F8F5F1] text-[#171615] font-sans antialiased selection:bg-[#C98F78]/30"
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}