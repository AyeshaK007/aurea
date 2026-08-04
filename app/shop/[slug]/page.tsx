import type { Metadata } from "next";
import { ProductClientView } from "@/app/shop/[slug]/ProductClientView";

export interface ProductData {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  price: string;
  size: string;
  description: string;
  images: { label: string; src: string }[];
  keyActives: { name: string; concentration: string; role: string }[];
  routine: {
    morning: string;
    evening: string;
    frequency: string;
  };
  clinicalResults: { metric: string; detail: string }[];
  inci: string;
}

export const PRODUCTS_DATABASE: Record<string, ProductData> = {
  "radiance-bio-serum": {
    id: "01",
    slug: "radiance-bio-serum",
    name: "Radiance Bio-Serum",
    category: "Cellular Renewal & Glow",
    tagline:
      "Concentrated micro-peptide treatment engineered for instant radiance and epidermal barrier recovery.",
    price: "$82",
    size: "30 ml / 1.0 fl. oz.",
    description:
      "A biomimetic elixir formulated with a 5% Niacinamide complex and bio-identical peptides. It targets micro-inflammation, refines pore structure, and restores surface luminosity without disturbing the delicate acid mantle.",
    images: [
      { label: "Front View", src: "/images/Products/serum-front.png" },
      { label: "Angle Active", src: "/images/Products/serum-angle.png" },
      { label: "Texture Close-up", src: "/images/Products/serum-front.png" },
    ],
    keyActives: [
      {
        name: "Niacinamide (Vitamin B3)",
        concentration: "5.0%",
        role: "Lipid barrier fortification & tone balance",
      },
      {
        name: "Biomimetic Hexapeptide-8",
        concentration: "3.0%",
        role: "Expression line smoothing & elasticity support",
      },
      {
        name: "Multi-Weight Hyaluronate",
        concentration: "2.0%",
        role: "Deep dermal hydration retention",
      },
    ],
    routine: {
      morning:
        "Apply 3–4 drops after cleansing. Gently press into face, neck, and décolletage before moisturizer and SPF.",
      evening:
        "Press 4–5 drops onto damp skin following essence toner. Follow with Barrier Repair Cream to lock in active hydration.",
      frequency: "Daily (AM & PM)",
    },
    clinicalResults: [
      {
        metric: "94%",
        detail:
          "Reported immediate boost in surface hydration and softness after 1 application.",
      },
      {
        metric: "88%",
        detail:
          "Observed visible reduction in redness and pore visibility over 28 days.",
      },
      {
        metric: "+32%",
        detail:
          "Measured increase in skin barrier lipid density via corneometer testing.",
      },
    ],
    inci: "Aqua/Water/Eau, Niacinamide, Glycerin, Propanediol, Acetyl Hexapeptide-8, Sodium Hyaluronate, Centella Asiatica Extract, Ferula Foetida Root Extract, Hydrolyzed Sodium Hyaluronate, Ethylhexylglycerin, Phenoxyethanol, Xanthan Gum, Citric Acid.",
  },
  "barrier-repair-cream": {
    id: "02",
    slug: "barrier-repair-cream",
    name: "Barrier Repair Cream",
    category: "Deep Moisture & Lipid Support",
    tagline:
      "Ceramide-fortified cream that mimics natural skin lipids for long-lasting barrier resilience.",
    price: "$95",
    size: "50 ml / 1.7 fl. oz.",
    description:
      "Formulated with an identical 3:1:1 ratio of Ceramides, Cholesterol, and Free Fatty Acids. Restores micro-fissures caused by environmental aggressors and harsh cleansing routines.",
    images: [
      { label: "Front View", src: "/images/Products/cream-front.png" },
      { label: "Open Texture", src: "/images/Products/cream-open.png" },
      { label: "Angle View", src: "/images/Products/cream-front.png" },
    ],
    keyActives: [
      {
        name: "Bio-Identical Ceramide NP/AP/EOP",
        concentration: "4.5%",
        role: "Structural barrier matrix repair",
      },
      {
        name: "Plant-Derived Squalane",
        concentration: "6.0%",
        role: "Emollient moisture sealing",
      },
      {
        name: "Phytosphingosine",
        concentration: "1.0%",
        role: "Microbiome balance and anti-irritation",
      },
    ],
    routine: {
      morning:
        "Warm a pea-sized amount between fingertips and press lightly over serum. Allow 60 seconds to absorb before sunscreen.",
      evening:
        "Apply a generous layer as the final step in your night ritual to lock in active water retention.",
      frequency: "Daily (AM & PM)",
    },
    clinicalResults: [
      {
        metric: "96%",
        detail:
          "Showed accelerated barrier recovery within 72 hours of continuous use.",
      },
      {
        metric: "91%",
        detail:
          "Noted sustained 24-hour hydration lock during cold environment exposure.",
      },
      {
        metric: "-41%",
        detail:
          "Reduction in Transepidermal Water Loss (TEWL) after 14 days.",
      },
    ],
    inci: "Aqua/Water/Eau, Caprylic/Capric Triglyceride, Squalane, Cetearyl Alcohol, Glycerin, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Tocopherol, Carbomer, Sodium Lauroyl Lactylate, Ethylhexylglycerin.",
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS_DATABASE[slug] || PRODUCTS_DATABASE["radiance-bio-serum"];

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS_DATABASE[slug] || PRODUCTS_DATABASE["radiance-bio-serum"];

  return <ProductClientView product={product} />;
}