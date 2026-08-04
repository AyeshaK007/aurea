"use client";

import { useEffect, useRef, useState } from "react";
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
  ShoppingBag,
} from "lucide-react";
import type { ProductData } from "./page";

export function ProductClientView({ product }: { product: ProductData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"morning" | "evening" | "results">("morning");
  const [openInci, setOpenInci] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
  const mm = gsap.matchMedia();

  // 1. Standard animations for users with NO reduced motion preference
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.fromTo(
      ".detail-animate",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  });

  // 2. Accessible fallback for users who PREFER reduced motion
  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(".detail-animate", {
      opacity: 1,
      y: 0,
    });
  });

  // Revert/cleanup all matchMedia animations on unmount
  return () => mm.revert();
}, [product]);

  const rawPrice = parseFloat(product.price.replace("$", ""));
  const totalPrice = (rawPrice * quantity).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F5F1] pt-20 sm:pt-28 pb-28 lg:pb-32 text-[#171615]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="detail-animate mb-6 sm:mb-10 opacity-0">
          <Link
            href="/#collection"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#C98F78] hover:text-[#171615] transition-colors py-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="detail-animate relative w-full h-[300px] sm:h-[420px] lg:h-[500px] bg-[#F4EFEA] border border-[#C98F78]/25 rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center p-4 sm:p-8 opacity-0">
              <div className="absolute w-48 sm:w-60 h-48 sm:h-60 rounded-full bg-[#E9D8D0]/60 blur-3xl pointer-events-none" />
              <Image
                src={product.images[activeImageIndex].src}
                alt={product.images[activeImageIndex].label}
                fill
                priority
                className="object-contain p-4 sm:p-6 transition-all duration-700 drop-shadow-[0_20px_30px_rgba(23,22,21,0.12)]"
              />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-[#F8F5F1]/90 backdrop-blur-md px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#C98F78]/30 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C98F78]">
                {product.images[activeImageIndex].label}
              </div>
            </div>

            <div className="detail-animate grid grid-cols-3 gap-3 sm:gap-4 opacity-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-20 sm:h-24 rounded-xl sm:rounded-2xl border transition-all duration-300 flex items-center justify-center overflow-hidden bg-[#F4EFEA]/60 p-1.5 sm:p-2 cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-[#C98F78] ring-2 ring-[#C98F78]/20 bg-[#E9D8D0]/40"
                      : "border-[#C98F78]/20 hover:border-[#C98F78]/50"
                  }`}
                >
                  <Image src={img.src} alt={img.label} fill className="object-contain p-1.5 sm:p-2" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="detail-animate space-y-2.5 sm:space-y-3 opacity-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C98F78] font-semibold">
                  FORMULA {product.id}
                </span>
                <span className="font-mono text-[11px] sm:text-xs text-[#171615]/50">{product.size}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171615] leading-[1.1]">
                {product.name}
              </h1>
              <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#B88968] font-medium">
                {product.category}
              </p>
              <div className="font-serif text-2xl text-[#171615] pt-1">{product.price}</div>
            </div>

            <div className="detail-animate font-sans text-xs sm:text-sm text-[#171615]/80 leading-relaxed border-t border-[#C98F78]/20 pt-5 sm:pt-6 opacity-0">
              {product.description}
            </div>

            <div className="detail-animate space-y-3 bg-[#E9D8D0]/30 border border-[#C98F78]/25 p-4 sm:p-5 rounded-2xl opacity-0">
              <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.25em] text-[#C98F78] font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Key Clinical Actives
              </div>
              <div className="space-y-2.5">
                {product.keyActives.map((active, i) => (
                  <div key={i} className="flex items-start justify-between text-xs border-b border-[#C98F78]/15 pb-2 last:border-0 last:pb-0 gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="font-medium text-[#171615] block truncate">{active.name}</span>
                      <span className="text-[11px] text-[#171615]/60 block leading-tight">{active.role}</span>
                    </div>
                    <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#C98F78] bg-[#F8F5F1] px-2 py-0.5 rounded border border-[#C98F78]/20 shrink-0">
                      {active.concentration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-animate space-y-4 pt-2 opacity-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center border border-[#C98F78]/30 rounded-full bg-[#F8F5F1] px-2 sm:px-3 py-1.5 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="min-w-[32px] h-8 flex items-center justify-center font-mono text-sm text-[#171615]/70 hover:text-[#171615]"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs w-6 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="min-w-[32px] h-8 flex items-center justify-center font-mono text-sm text-[#171615]/70 hover:text-[#171615]"
                  >
                    +
                  </button>
                </div>
                <button className="flex-1 bg-[#171615] text-[#F8F5F1] py-3.5 sm:py-4 px-4 sm:px-8 rounded-full font-sans text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C98F78] transition-all truncate">
                  Add to Ritual — {totalPrice}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 sm:gap-6 font-sans text-[10px] uppercase tracking-[0.12em] text-[#171615]/60 pt-1">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#C98F78]" /> Dermatologist Tested</span>
                <span className="flex items-center gap-1.5"><Droplets className="w-3.5 h-3.5 text-[#C98F78]" /> Fragrance Free</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-20 pt-10 sm:pt-16 border-t border-[#C98F78]/20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4 sm:gap-6 border-b border-[#C98F78]/20 pb-3 overflow-x-auto">
              <button
                onClick={() => setActiveTab("morning")}
                className={`flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] font-semibold pb-2 border-b-2 whitespace-nowrap ${
                  activeTab === "morning" ? "border-[#C98F78] text-[#C98F78]" : "border-transparent text-[#171615]/50"
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> Morning Ritual
              </button>
              <button
                onClick={() => setActiveTab("evening")}
                className={`flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] font-semibold pb-2 border-b-2 whitespace-nowrap ${
                  activeTab === "evening" ? "border-[#C98F78] text-[#C98F78]" : "border-transparent text-[#171615]/50"
                }`}
              >
                <Moon className="w-3.5 h-3.5" /> Evening Ritual
              </button>
              <button
                onClick={() => setActiveTab("results")}
                className={`flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] font-semibold pb-2 border-b-2 whitespace-nowrap ${
                  activeTab === "results" ? "border-[#C98F78] text-[#C98F78]" : "border-transparent text-[#171615]/50"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Clinical Results
              </button>
            </div>

            <div className="bg-[#F4EFEA]/60 border border-[#C98F78]/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl min-h-[160px] flex items-center">
              {activeTab === "morning" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C98F78]">
                    <Clock className="w-3.5 h-3.5" /> Frequency: {product.routine.frequency}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#171615]/80 leading-relaxed">{product.routine.morning}</p>
                </div>
              )}
              {activeTab === "evening" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C98F78]">
                    <Clock className="w-3.5 h-3.5" /> Frequency: {product.routine.frequency}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#171615]/80 leading-relaxed">{product.routine.evening}</p>
                </div>
              )}
              {activeTab === "results" && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {product.clinicalResults.map((res, i) => (
                    <div key={i} className="bg-[#F8F5F1] p-4 rounded-xl border border-[#C98F78]/20 space-y-1">
                      <div className="font-serif text-2xl text-[#C98F78] font-semibold">{res.metric}</div>
                      <p className="font-sans text-[11px] text-[#171615]/75 leading-tight">{res.detail}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-[#C98F78] font-semibold mb-2">Formula Transparency</h3>
            <div className="border border-[#C98F78]/25 rounded-2xl bg-[#F8F5F1] overflow-hidden">
              <button
                onClick={() => setOpenInci(!openInci)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-serif text-base text-[#171615]"
              >
                <span>Full Ingredients List (INCI)</span>
                <ChevronDown className={`w-4 h-4 text-[#C98F78] transition-transform ${openInci ? "rotate-180" : ""}`} />
              </button>
              {openInci && (
                <div className="p-4 sm:p-5 border-t border-[#C98F78]/15 bg-[#F4EFEA]/40 font-mono text-[10px] text-[#171615]/70 leading-relaxed break-words">
                  {product.inci}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#F8F5F1]/95 backdrop-blur-md border-t border-[#C98F78]/30 p-3.5 z-40 lg:hidden shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-sans text-[10px] uppercase text-[#171615]/60 truncate max-w-[120px]">{product.name}</span>
            <span className="font-serif text-lg font-semibold text-[#171615]">{totalPrice}</span>
          </div>
          <button className="flex-1 max-w-[220px] bg-[#171615] text-[#F8F5F1] py-3 px-4 rounded-full font-sans text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2">
            <ShoppingBag className="w-3.5 h-3.5" /> Add to Ritual
          </button>
        </div>
      </div>
    </div>
  );
}