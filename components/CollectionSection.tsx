"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  ingredients: string;
  size: string;
  price: string;
  frontImage: string;
  angleImage: string;
  detailTag: string;
}

const PRODUCTS: Product[] = [
  {
    id: "01",
    name: "Radiance Serum",
    category: "Brightening & Repair",
    ingredients: "Niacinamide 5% · Biomimetic Peptides",
    size: "30 ml / 1.0 fl. oz.",
    price: "$82",
    frontImage: "/images/Products/serum-front.png",
    angleImage: "/images/Products/serum-angle.png",
    detailTag: "Dropper Active",
  },
  {
    id: "02",
    name: "Barrier Repair Cream",
    category: "Deep Moisture & Lipid Support",
    ingredients: "Ceramides Complex · Plant Squalane",
    size: "50 ml / 1.7 fl. oz.",
    price: "$95",
    frontImage: "/images/Products/cream-front.png",
    angleImage: "/images/Products/cream-open.png",
    detailTag: "Texture Open",
  },
  {
    id: "03",
    name: "Gentle Refining Cleanser",
    category: "Purifying & Soothing",
    ingredients: "Amino Acids · Camellia Seed Oil",
    size: "150 ml / 5.1 fl. oz.",
    price: "$58",
    frontImage: "/images/Products/cleanser-front.png",
    angleImage: "/images/Products/cleanser-angle.png",
    detailTag: "Form Angle",
  },
  {
    id: "04",
    name: "Hydrating Essence Toner",
    category: "pH Balance & Preparation",
    ingredients: "Rose Hydrosol · Hyaluronic Acid",
    size: "120 ml / 4.0 fl. oz.",
    price: "$64",
    frontImage: "/images/Products/toner-front.png",
    angleImage: "/images/Products/toner-angle.png",
    detailTag: "Spray Mist",
  },
];

export default function CollectionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".collection-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        ".product-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (id: string) => {
    if (hoveredId !== id) {
      setHoveredId(id);
    }
  };

  return (
    <section 
      id="collection"
      ref={sectionRef} 
      className="py-14 sm:py-28 lg:py-40 bg-[#F8F5F1] border-t border-[#C98F78]/15 px-4 sm:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-16">
        
        {/* Editorial Section Header */}
        <div className="collection-header flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 opacity-0">
          <div className="space-y-2 sm:space-y-3">
            <span className="font-sans uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[10px] sm:text-[11px] text-[#C98F78] font-semibold">
              The Collection
            </span>
            <h2 className="font-serif text-2xl min-[390px]:text-3xl md:text-5xl font-normal text-[#171615] tracking-tight leading-[1.15]">
              Four essential steps. <br className="hidden min-[390px]:inline" />
              <span className="italic text-[#B88968] font-light">One considered ritual.</span>
            </h2>
          </div>

          <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#171615]/60 max-w-xs leading-relaxed">
            Concentrated clinical actives paired with raw botanical essences for daily skin resilience.
          </p>
        </div>

        {/* Product Grid: 2-column layout on mobile, 4-column on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
          {PRODUCTS.map((product) => {
            const isHovered = hoveredId === product.id;

            return (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                onClick={() => handleCardClick(product.id)}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="product-card group relative flex flex-col justify-between bg-[#F8F5F1] border border-[#C98F78]/20 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 active:scale-[0.98] sm:active:scale-100 hover:border-[#C98F78]/60 transition-all duration-300 opacity-0 hover:shadow-[0_15px_35px_rgba(201,143,120,0.08)] cursor-pointer"
              >
                {/* Header Info */}
                <div className="flex justify-between items-start z-10 gap-1">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] text-[#C98F78] uppercase tracking-wider block">
                      {product.id} / FORMULA
                    </span>
                    <h3 className="font-serif text-sm min-[390px]:text-base sm:text-xl text-[#171615] mt-0.5 sm:mt-1 font-normal group-hover:text-[#C98F78] transition-colors leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full border border-[#C98F78]/30 flex items-center justify-center text-[#171615] group-hover:bg-[#171615] group-hover:text-[#F8F5F1] group-hover:border-[#171615] transition-all duration-300">
                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>

                {/* Multi-Angle Stage */}
                <div className="relative h-[180px] min-[390px]:h-[210px] sm:h-[280px] my-3 sm:my-6 flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-[#F4EFEA]/40 transition-colors duration-500 group-hover:bg-[#E9D8D0]/30">
                  {/* Background Soft Glow */}
                  <div className="absolute w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#E9D8D0]/50 blur-xl sm:blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                  {/* Primary Front Image */}
                  <div 
                    className={`absolute inset-0 transition-all duration-500 ease-out flex items-center justify-center ${
                      isHovered ? "opacity-0 scale-95 rotate-3" : "opacity-100 scale-100 rotate-0"
                    }`}
                  >
                    <Image
                      src={product.frontImage}
                      alt={`${product.name} Front`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain drop-shadow-[0_10px_20px_rgba(23,22,21,0.08)] p-2 sm:p-3"
                    />
                  </div>

                  {/* Hover/Tap Angle Reveal Image */}
                  <div 
                    className={`absolute inset-0 transition-all duration-500 ease-out flex items-center justify-center ${
                      isHovered ? "opacity-100 scale-105 rotate-0" : "opacity-0 scale-110 -rotate-3 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={product.angleImage}
                      alt={`${product.name} Angle`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain drop-shadow-[0_18px_28px_rgba(23,22,21,0.12)] p-2 sm:p-3"
                    />
                  </div>

                  {/* Angle Label Pill */}
                  <div 
                    className={`absolute bottom-2 sm:bottom-3 bg-[#F8F5F1]/90 backdrop-blur-md px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#C98F78]/30 text-[8px] sm:text-[9px] font-sans uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#C98F78] font-semibold transition-all duration-300 ${
                      isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    {product.detailTag}
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="border-t border-[#C98F78]/15 pt-2.5 sm:pt-4 space-y-1.5 sm:space-y-3 z-10">
                  <div className="font-sans text-[10px] sm:text-[11px] text-[#171615]/70 font-medium line-clamp-1">
                    {product.ingredients}
                  </div>

                  <div className="flex items-center justify-between pt-0.5">
                    <span className="font-sans text-[8.5px] sm:text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#171615]/50 font-semibold truncate max-w-[65%]">
                      {product.size}
                    </span>
                    <span className="font-serif text-sm sm:text-base text-[#171615] font-medium">
                      {product.price}
                    </span>
                  </div>
                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}