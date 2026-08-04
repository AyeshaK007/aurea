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
  metadataBase: new URL("https://aurea-radiance.vercel.app"),
  title: {
    default: "AUREA Radiance — Science-Backed Bio-Skincare",
    template: "%s | AUREA Radiance",
  },
  description:
    "Formulated with concentrated clinical actives and raw botanical essences to protect, restore, and elevate skin daily.",
  keywords: [
    "Skincare",
    "Radiance Serum",
    "Clinical Actives",
    "Botanical Skincare",
    "Aurea",
    "Luxury Skincare",
  ],
  authors: [{ name: "AUREA Radiance" }],
  openGraph: {
    title: "AUREA Radiance — Science-Backed Bio-Skincare",
    description:
      "Formulated with concentrated clinical actives and raw botanical essences to protect, restore, and elevate skin daily.",
    url: "https://aurea-radiance.vercel.app",
    siteName: "AUREA Radiance",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AUREA Radiance Skincare Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AUREA Radiance — Science-Backed Bio-Skincare",
    description:
      "Formulated with concentrated clinical actives and raw botanical essences to protect, restore, and elevate skin daily.",
    images: ["/og-image.png"],
  },
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