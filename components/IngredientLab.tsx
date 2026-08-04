"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  category: string;
  percentage: string;
  role: string;
  description: string;
  benefits: string[];
}

const ingredients: Ingredient[] = [
  {
    id: "peptides",
    name: "Biomimetic Hexapeptide-8",
    category: "Cellular Repair",
    percentage: "5.0%",
    role: "Collagen Support & Line Smoothing",
    description:
      "A peptide sequence designed to relax micro-tension in the skin, reducing expression lines and encouraging natural collagen synthesis.",
    benefits: ["Smoothes surface expression lines", "Enhances dermal elasticity", "Reinforces skin scaffold"],
  },
  {
    id: "niacinamide",
    name: "Ultra-Pure Niacinamide",
    category: "Barrier Strength",
    percentage: "4.0%",
    role: "Tone Refinement & Lipid Barrier",
    description:
      "High-grade Vitamin B3 that calms inflammation, minimizes pore appearance, and stimulates essential ceramide synthesis.",
    benefits: ["Fades post-inflammatory redness", "Tightens dilated pores", "Locks in cellular moisture"],
  },
  {
    id: "hyaluronic",
    name: "Multi-Weight Hyaluronic Acid",
    category: "Deep Hydration",
    percentage: "2.5%",
    role: "Multi-Depth Moisture Plumping",
    description:
      "Three distinct molecular weights designed to penetrate shallow, medium, and deep epidermal layers for instant surface plumping and long-term retention.",
    benefits: ["Immediate surface radiance", "24-hour hydration lock", "Soothes dry micro-cracks"],
  },
  {
    id: "centella",
    name: "Fermented Centella Asiatica",
    category: "Botanical Calming",
    percentage: "3.0%",
    role: "Soothing & Anti-Redness",
    description:
      "Biologically fermented tiger grass extract rich in Madecassoside to instantly pacify stressed or reactive skin environments.",
    benefits: ["Pacifies immediate flare-ups", "Accelerates barrier repair", "Protects against urban stress"],
  },
];

export default function IngredientLab() {
  const [selectedId, setSelectedId] = useState<string>(ingredients[0].id);
  const sectionRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const activeIngredient = ingredients.find((i) => i.id === selectedId) || ingredients[0];

  // Initialize ScrollTrigger header reveal
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lab-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth GSAP fade-and-slide transition when changing ingredients
  useEffect(() => {
    if (!detailPanelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".detail-content",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
        }
      );
    }, detailPanelRef);

    return () => ctx.revert();
  }, [selectedId]);

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#F8F5F1] relative border-t border-[#C98F78]/15 select-none"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="lab-header max-w-2xl mb-14 sm:mb-16 space-y-3 opacity-0">
          <div className="font-sans uppercase tracking-[0.3em] text-[10px] sm:text-[11px] text-[#C98F78] font-semibold">
            03 / Formulation Lab
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#171615] leading-[1.1]">
            Active Concentration Transparency
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#171615]/70 leading-relaxed pt-1">
            Hover or tap any key active component to inspect its targeted biochemical mechanism.
          </p>
        </div>

        {/* Interactive Lab Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Ingredient Selector List */}
          <div className="lg:col-span-5 space-y-3" role="tablist" aria-label="Active Ingredients">
            {ingredients.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  id={`tab-${item.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${item.id}`}
                  onClick={() => setSelectedId(item.id)}
                  onMouseEnter={() => {
                    if (!isSelected) setSelectedId(item.id);
                  }}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C98F78] ${
                    isSelected
                      ? "bg-[#171615] text-[#F8F5F1] border-[#171615] shadow-lg translate-x-1 sm:translate-x-2"
                      : "bg-[#F8F5F1] text-[#171615] border-[#C98F78]/25 hover:border-[#C98F78] hover:bg-[#E9D8D0]/30"
                  }`}
                >
                  <div className="space-y-1">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.2em] block ${
                        isSelected ? "text-[#C98F78]" : "text-[#B88968]"
                      }`}
                    >
                      {item.category}
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl">{item.name}</h4>
                  </div>

                  <div
                    className={`px-3 py-1 rounded-full font-mono text-xs font-semibold shrink-0 ml-4 ${
                      isSelected
                        ? "bg-[#C98F78] text-[#F8F5F1]"
                        : "bg-[#E9D8D0]/60 text-[#171615]"
                    }`}
                  >
                    {item.percentage}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Detail Display Panel */}
          <div
            ref={detailPanelRef}
            id={`panel-${activeIngredient.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeIngredient.id}`}
            className="lg:col-span-7 bg-[#E9D8D0]/40 border border-[#C98F78]/30 rounded-3xl p-7 sm:p-10 shadow-sm min-h-[380px] flex flex-col justify-between"
          >
            <div>
              <div className="detail-content flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#C98F78]" />
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C98F78] font-semibold">
                  Active Specification — {activeIngredient.percentage} Concentration
                </span>
              </div>

              <h3 className="detail-content font-serif text-2xl sm:text-4xl text-[#171615] mb-2">
                {activeIngredient.name}
              </h3>

              <p className="detail-content font-sans text-xs uppercase tracking-[0.2em] text-[#B88968] font-medium mb-6">
                Primary Role: {activeIngredient.role}
              </p>

              <p className="detail-content font-sans text-xs sm:text-sm text-[#171615]/80 leading-relaxed mb-8 border-t border-[#C98F78]/20 pt-6">
                {activeIngredient.description}
              </p>
            </div>

            <div className="detail-content space-y-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#171615]/60 font-semibold block">
                Key Clinical Benefits
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeIngredient.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 bg-[#F8F5F1] p-3 rounded-xl border border-[#C98F78]/20"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C98F78] shrink-0" />
                    <span className="font-sans text-xs text-[#171615]/85">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}