"use client";

import { useEffect, useRef, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Droplets,
  Sun,
  Moon,
  Clock,
} from "lucide-react";

interface ProductData {
  id: string;
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

const PRODUCTS_DATABASE: Record<string, ProductData> = {
  "01": {
    id: "01",
    name: "Radiance Bio-Serum",
    category: "Cellular Renewal & Glow",
    tagline: "Concentrated micro-peptide treatment engineered for instant radiance and epidermal barrier recovery.",
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
      { name: "Niacinamide (Vitamin B3)", concentration: "5.0%", role: "Lipid barrier fortification & tone balance" },
      { name: "Biomimetic Hexapeptide-8", concentration: "3.0%", role: "Expression line smoothing & elasticity support" },
      { name: "Multi-Weight Hyaluronate", concentration: "2.0%", role: "Deep dermal hydration retention" },
    ],
    routine: {
      morning: "Apply 3–4 drops after cleansing. Gently press into face, neck, and décolletage before moisturizer and SPF.",
      evening: "Press 4–5 drops onto damp skin following essence toner. Follow with Barrier Repair Cream to lock in active hydration.",
      frequency: "Daily (AM & PM)",
    },
    clinicalResults: [
      { metric: "94%", detail: "Reported immediate boost in surface hydration and softness after 1 application." },
      { metric: "88%", detail: "Observed visible reduction in redness and pore visibility over 28 days." },
      { metric: "+32%", detail: "Measured increase in skin barrier lipid density via corneometer testing." },
    ],
    inci: "Aqua/Water/Eau, Niacinamide, Glycerin, Propanediol, Acetyl Hexapeptide-8, Sodium Hyaluronate, Centella Asiatica Extract, Ferula Foetida Root Extract, Hydrolyzed Sodium Hyaluronate, Ethylhexylglycerin, Phenoxyethanol, Xanthan Gum, Citric Acid.",
  },
  "02": {
    id: "02",
    name: "Barrier Repair Cream",
    category: "Deep Moisture & Lipid Support",
    tagline: "Ceramide-fortified cream that mimics natural skin lipids for long-lasting barrier resilience.",
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
      { name: "Bio-Identical Ceramide NP/AP/EOP", concentration: "4.5%", role: "Structural barrier matrix repair" },
      { name: "Plant-Derived Squalane", concentration: "6.0%", role: "Emollient moisture sealing" },
      { name: "Phytosphingosine", concentration: "1.0%", role: "Microbiome balance and anti-irritation" },
    ],
    routine: {
      morning: "Warm a pea-sized amount between fingertips and press lightly over serum. Allow 60 seconds to absorb before sunscreen.",
      evening: "Apply a generous layer as the final step in your night ritual to lock in active water retention.",
      frequency: "Daily (AM & PM)",
    },
    clinicalResults: [
      { metric: "96%", detail: "Showed accelerated barrier recovery within 72 hours of continuous use." },
      { metric: "91%", detail: "Noted sustained 24-hour hydration lock during cold environment exposure." },
      { metric: "-41%", detail: "Reduction in Transepidermal Water Loss (TEWL) after 14 days." },
    ],
    inci: "Aqua/Water/Eau, Caprylic/Capric Triglyceride, Squalane, Cetearyl Alcohol, Glycerin, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Tocopherol, Carbomer, Sodium Lauroyl Lactylate, Ethylhexylglycerin.",
  },
  "03": {
    id: "03",
    name: "Gentle Refining Cleanser",
    category: "Purifying & Soothing",
    tagline: "Amino acid-based emulsion cleanser that purifies without stripping essential skin lipids.",
    price: "$58",
    size: "150 ml / 5.1 fl. oz.",
    description:
      "A silky, pH-balanced cleanser that melts away makeup, pollution particles, and excess sebum while preserving skin moisture.",
    images: [
      { label: "Front View", src: "/images/Products/cleanser-front.png" },
      { label: "Angle Form", src: "/images/Products/cleanser-angle.png" },
      { label: "Close Detail", src: "/images/Products/cleanser-front.png" },
    ],
    keyActives: [
      { name: "Apple Amino Acid Surfactant", concentration: "8.0%", role: "Ultra-gentle lipid-safe cleansing" },
      { name: "Camellia Sinensis Seed Oil", concentration: "3.5%", role: "Soothing oil dissolution" },
      { name: "Colloidal Oatmeal", concentration: "2.0%", role: "Calms reactive micro-redness" },
    ],
    routine: {
      morning: "Massage 1 pump onto damp skin using light circular motions for 30 seconds. Rinse thoroughly with lukewarm water.",
      evening: "Use as step 1 or 2 of double cleansing. Massage over dry skin to dissolve makeup, then add warm water to emulsify.",
      frequency: "Daily (AM & PM)",
    },
    clinicalResults: [
      { metric: "98%", detail: "Agreed skin felt soft, supple, and never tight post-cleansing." },
      { metric: "92%", detail: "Effectively removed water-resistant sunscreen without oil residue." },
      { metric: "100%", detail: "Dermatologically verified non-comedogenic across sensitive skin subjects." },
    ],
    inci: "Aqua/Water/Eau, Sodium Cocoyl Apple Amino Acids, Camellia Sinensis Seed Oil, Glycerin, Cetearyl Glucoside, Colloidal Oatmeal, Allantoin, Panthenol, Phenoxyethanol, Ethylhexylglycerin, Citric Acid.",
  },
  "04": {
    id: "04",
    name: "Hydrating Essence Toner",
    category: "pH Balance & Preparation",
    tagline: "Cell-nourishing mist that primes the skin layer for enhanced active ingredient permeability.",
    price: "$64",
    size: "120 ml / 4.0 fl. oz.",
    description:
      "Infused with steam-distilled organic Rose Hydrosol and low-molecular Hyaluronic Acid. Instantly restores skin pH and prepares skin cells for maximum absorption of subsequent steps.",
    images: [
      { label: "Front View", src: "/images/Products/toner-front.png" },
      { label: "Spray Angle", src: "/images/Products/toner-angle.png" },
      { label: "Macro Detail", src: "/images/Products/toner-front.png" },
    ],
    keyActives: [
      { name: "Organic Damask Rose Hydrosol", concentration: "65.0%", role: "Natural toning & aromatic calming" },
      { name: "Hydrolyzed Hyaluronic Acid", concentration: "1.5%", role: "Instant epidermal moisture infusion" },
      { name: "Betaine & Ectoin", concentration: "2.0%", role: "Osmoprotectant cellular stress shield" },
    ],
    routine: {
      morning: "Mist 3–4 sprays directly over clean face or pat into skin using palms prior to applying Radiance Bio-Serum.",
      evening: "Layer 2–3 applications (the '7-skin method' condensed) for intense overnight moisture priming.",
      frequency: "Daily (AM & PM)",
    },
    clinicalResults: [
      { metric: "+55%", detail: "Immediate increase in stratum corneum hydration levels." },
      { metric: "95%", detail: "Felt skin stayed comfortable and hydrated throughout dry office hours." },
      { metric: "90%", detail: "Noted improved absorption speed for subsequent serums and creams." },
    ],
    inci: "Rosa Damascena Flower Water, Aqua/Water/Eau, Glycerin, Propanediol, Betaine, Ectoin, Hydrolyzed Hyaluronic Acid, Sodium Citrate, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
  },
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id || "01";
  const product = PRODUCTS_DATABASE[productId] || PRODUCTS_DATABASE["01"];

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"morning" | "evening" | "results">("morning");
  const [openInci, setOpenInci] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    gsap.registerPlugin();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".detail-animate",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [productId]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F5F1] pt-28 pb-32 text-[#171615]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Top Navigation Back Button */}
        <div className="detail-animate mb-10 opacity-0">
          <Link
            href="/#collection"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#C98F78] hover:text-[#171615] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Collection
          </Link>
        </div>

        {/* Primary Product Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Gallery Canvas Stage (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Stage Image */}
            <div className="detail-animate relative w-full h-[380px] sm:h-[500px] bg-[#F4EFEA] border border-[#C98F78]/25 rounded-3xl overflow-hidden flex items-center justify-center p-8 opacity-0">
              <div className="absolute w-60 h-60 rounded-full bg-[#E9D8D0]/60 blur-3xl pointer-events-none" />
              
              <Image
                src={product.images[activeImageIndex].src}
                alt={product.images[activeImageIndex].label}
                fill
                priority
                className="object-contain p-6 transition-all duration-700 drop-shadow-[0_20px_30px_rgba(23,22,21,0.12)]"
              />

              <div className="absolute bottom-4 left-4 bg-[#F8F5F1]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C98F78]/30 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C98F78]">
                {product.images[activeImageIndex].label}
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="detail-animate grid grid-cols-3 gap-4 opacity-0">
              {product.images.map((img, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-24 rounded-2xl border transition-all duration-300 flex items-center justify-center overflow-hidden bg-[#F4EFEA]/60 p-2 cursor-pointer ${
                      isActive
                        ? "border-[#C98F78] ring-2 ring-[#C98F78]/20 bg-[#E9D8D0]/40"
                        : "border-[#C98F78]/20 hover:border-[#C98F78]/50"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                );
              })}
            </div>

          </div>

          {/* RIGHT: Meta, Actives, CTA (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Header Meta */}
            <div className="detail-animate space-y-3 opacity-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C98F78] font-semibold">
                  FORMULA {product.id}
                </span>
                <span className="font-mono text-xs text-[#171615]/50">{product.size}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#171615] leading-[1.1]">
                {product.name}
              </h1>

              <p className="font-sans text-xs uppercase tracking-[0.18em] text-[#B88968] font-medium">
                {product.category}
              </p>

              <div className="font-serif text-2xl text-[#171615] pt-1">{product.price}</div>
            </div>

            {/* Description */}
            <div className="detail-animate font-sans text-xs sm:text-sm text-[#171615]/80 leading-relaxed border-t border-[#C98F78]/20 pt-6 opacity-0">
              {product.description}
            </div>

            {/* Key Actives List */}
            <div className="detail-animate space-y-3 bg-[#E9D8D0]/30 border border-[#C98F78]/25 p-5 rounded-2xl opacity-0">
              <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.25em] text-[#C98F78] font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Key Clinical Actives
              </div>

              <div className="space-y-2.5">
                {product.keyActives.map((active, i) => (
                  <div key={i} className="flex items-start justify-between text-xs border-b border-[#C98F78]/15 pb-2 last:border-0 last:pb-0">
                    <div>
                      <span className="font-medium text-[#171615] block">{active.name}</span>
                      <span className="text-[11px] text-[#171615]/60">{active.role}</span>
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-[#C98F78] bg-[#F8F5F1] px-2 py-0.5 rounded border border-[#C98F78]/20 shrink-0 ml-2">
                      {active.concentration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Add To Cart CTA */}
            <div className="detail-animate space-y-4 pt-2 opacity-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#C98F78]/30 rounded-full bg-[#F8F5F1] px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 flex items-center justify-center font-mono text-sm text-[#171615]/70 hover:text-[#171615]"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs w-8 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center font-mono text-sm text-[#171615]/70 hover:text-[#171615]"
                  >
                    +
                  </button>
                </div>

                <button className="flex-1 bg-[#171615] text-[#F8F5F1] py-4 px-8 rounded-full font-sans text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#C98F78] transition-colors duration-300 shadow-md">
                  Add to Ritual — {(parseFloat(product.price.replace("$", "")) * quantity).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 font-sans text-[10px] uppercase tracking-[0.15em] text-[#171615]/60 pt-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C98F78]" /> Dermatological Tested
                </span>
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-[#C98F78]" /> Fragrance Free
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* LOWER SECTION: Routine & Clinical Stepper + Accordion */}
        <div className="mt-20 pt-16 border-t border-[#C98F78]/20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Interactive Routine & Results Tab Box (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 border-b border-[#C98F78]/20 pb-4">
              <button
                onClick={() => setActiveTab("morning")}
                className={`flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-semibold pb-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === "morning"
                    ? "border-[#C98F78] text-[#C98F78]"
                    : "border-transparent text-[#171615]/50 hover:text-[#171615]"
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Morning Ritual
              </button>

              <button
                onClick={() => setActiveTab("evening")}
                className={`flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-semibold pb-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === "evening"
                    ? "border-[#C98F78] text-[#C98F78]"
                    : "border-transparent text-[#171615]/50 hover:text-[#171615]"
                }`}
              >
                <Moon className="w-3.5 h-3.5" /> Evening Ritual
              </button>

              <button
                onClick={() => setActiveTab("results")}
                className={`flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] font-semibold pb-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === "results"
                    ? "border-[#C98F78] text-[#C98F78]"
                    : "border-transparent text-[#171615]/50 hover:text-[#171615]"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Clinical Results
              </button>
            </div>

            {/* Tab Content Display */}
            <div className="bg-[#F4EFEA]/60 border border-[#C98F78]/20 p-6 sm:p-8 rounded-3xl min-h-[180px] flex items-center">
              {activeTab === "morning" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C98F78]">
                    <Clock className="w-3.5 h-3.5" /> Frequency: {product.routine.frequency}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#171615]/80 leading-relaxed">
                    {product.routine.morning}
                  </p>
                </div>
              )}

              {activeTab === "evening" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C98F78]">
                    <Clock className="w-3.5 h-3.5" /> Frequency: {product.routine.frequency}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#171615]/80 leading-relaxed">
                    {product.routine.evening}
                  </p>
                </div>
              )}

              {activeTab === "results" && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {product.clinicalResults.map((res, i) => (
                    <div key={i} className="bg-[#F8F5F1] p-4 rounded-2xl border border-[#C98F78]/20 space-y-1">
                      <div className="font-serif text-3xl text-[#C98F78] font-semibold">{res.metric}</div>
                      <p className="font-sans text-[11px] text-[#171615]/75 leading-tight">{res.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Collapsible INCI / Ingredients Accordion (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-[#C98F78] font-semibold mb-2">
              Formula Transparency
            </h3>

            <div className="border border-[#C98F78]/25 rounded-2xl bg-[#F8F5F1] overflow-hidden">
              <button
                onClick={() => setOpenInci(!openInci)}
                className="w-full p-5 flex items-center justify-between text-left font-serif text-lg text-[#171615] cursor-pointer hover:bg-[#E9D8D0]/20 transition-colors"
              >
                <span>Full Ingredients List (INCI)</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#C98F78] transition-transform duration-300 ${
                    openInci ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {openInci && (
                <div className="p-5 border-t border-[#C98F78]/15 bg-[#F4EFEA]/40 font-mono text-[11px] text-[#171615]/70 leading-relaxed">
                  {product.inci}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}