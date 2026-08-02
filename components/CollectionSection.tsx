"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, ArrowUpRight } from "lucide-react";

const PRODUCTS = [
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
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".collection-header",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      ).fromTo(
        ".product-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: "power3.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-28 lg:py-40 bg-[#F8F5F1] border-t border-[#C98F78]/15 px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Section Header */}
        <div className="collection-header flex flex-col md:flex-row md:items-end justify-between gap-6 opacity-0">
          <div className="space-y-3">
            <span className="font-sans uppercase tracking-[0.35em] text-[11px] text-[#C98F78] font-semibold">
              The Collection
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#171615] tracking-tight">
              Four essential steps. <br />
              <span className="italic text-[#B88968] font-light">One considered ritual.</span>
            </h2>
          </div>

          <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#171615]/60 max-w-xs leading-relaxed">
            Concentrated clinical actives paired with raw botanical essences for daily skin resilience.
          </p>
        </div>

        {/* 4 Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => {
            const isHovered = hoveredId === product.id;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="product-card group relative flex flex-col justify-between bg-[#F8F5F1] border border-[#C98F78]/20 rounded-3xl p-6 hover:border-[#C98F78]/60 transition-all duration-500 opacity-0 hover:shadow-[0_15px_35px_rgba(201,143,120,0.08)]"
              >
                {/* Header Info */}
                <div className="flex justify-between items-start z-10">
                  <div>
                    <span className="font-mono text-[10px] text-[#C98F78] uppercase tracking-wider">
                      {product.id} / FORMULA
                    </span>
                    <h3 className="font-serif text-xl text-[#171615] mt-1 font-normal group-hover:text-[#C98F78] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <button className="w-8 h-8 rounded-full border border-[#C98F78]/30 flex items-center justify-center text-[#171615] group-hover:bg-[#171615] group-hover:text-[#F8F5F1] group-hover:border-[#171615] transition-all duration-300">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Multi-Angle Stage */}
                <div className="relative h-[280px] my-6 flex items-center justify-center overflow-hidden">
                  {/* Background Soft Glow */}
                  <div className="absolute w-40 h-40 rounded-full bg-[#E9D8D0]/40 blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                  {/* Primary Front Image */}
                  <div 
                    className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center ${
                      isHovered ? "opacity-0 scale-95 rotate-3" : "opacity-100 scale-100 rotate-0"
                    }`}
                  >
                    <Image
                      src={product.frontImage}
                      alt={`${product.name} Front`}
                      fill
                      className="object-contain drop-shadow-[0_15px_25px_rgba(23,22,21,0.08)]"
                    />
                  </div>

                  {/* Hover Angle Reveal Image */}
                  <div 
                    className={`absolute inset-0 transition-all duration-700 ease-out flex items-center justify-center ${
                      isHovered ? "opacity-100 scale-105 rotate-0" : "opacity-0 scale-110 -rotate-3"
                    }`}
                  >
                    <Image
                      src={product.angleImage}
                      alt={`${product.name} Angle`}
                      fill
                      className="object-contain drop-shadow-[0_25px_35px_rgba(23,22,21,0.12)]"
                    />
                  </div>

                  {/* Angle Label Pill */}
                  <div 
                    className={`absolute bottom-2 bg-[#F8F5F1]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#C98F78]/30 text-[9px] font-sans uppercase tracking-[0.2em] text-[#C98F78] font-semibold transition-all duration-500 ${
                      isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                  >
                    {product.detailTag}
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="border-t border-[#C98F78]/15 pt-4 space-y-3 z-10">
                  <div className="font-sans text-[11px] text-[#171615]/70 font-medium line-clamp-1">
                    {product.ingredients}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#171615]/40 font-semibold">
                      {product.size}
                    </span>
                    <span className="font-serif text-base text-[#171615] font-medium">
                      {product.price}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}