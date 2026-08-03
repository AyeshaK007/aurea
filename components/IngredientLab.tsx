"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const INGREDIENTS = [
  {
    id: "peptides",
    num: "01",
    name: "Biomimetic Peptides",
    role: "Cellular Communication",
    desc: "Synthesized amino acid chains designed to mimic natural signaling pathways, supporting skin firming and structural resilience.",
    stat: "+42% Density Support",
  },
  {
    id: "niacinamide",
    num: "02",
    name: "Niacinamide 5%",
    role: "Barrier & Tone Refinement",
    desc: "Ultra-pure Vitamin B3 that mitigates moisture loss, softens hyperpigmentation, and balances excess sebum production.",
    stat: "98% Purity Grade",
  },
  {
    id: "botanicals",
    num: "03",
    name: "Botanical Hydrosols",
    role: "Phyto-Nourishment",
    desc: "Cold-pressed rose water and camellia seed extracts providing soothing polyphenols to combat environmental stressors.",
    stat: "100% Organic Origin",
  },
];

export default function IngredientLab() {
  const [activeId, setActiveId] = useState("peptides");
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeIngredient = INGREDIENTS.find((i) => i.id === activeId) || INGREDIENTS[0];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lab-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="lab" 
      ref={sectionRef}
      className="py-28 lg:py-40 bg-[#F8F5F1] border-t border-[#C98F78]/15 px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 lab-content opacity-0">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-sans uppercase tracking-[0.35em] text-[11px] text-[#C98F78] font-semibold">
              03 / Formulation Lab
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#171615] tracking-tight">
              Clinical precision. <br />
              <span className="italic text-[#B88968] font-light">Botanical harmony.</span>
            </h2>
          </div>

          <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#171615]/60 max-w-xs leading-relaxed">
            Hover over key actives to explore how each compound interacts with the skin structure.
          </p>
        </div>

        {/* Interactive Lab Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#F8F5F1] border border-[#C98F78]/20 rounded-3xl p-8 lg:p-12 relative">
          
          {/* Left: Ingredient Selector List */}
          <div className="lg:col-span-5 space-y-4 z-10">
            {INGREDIENTS.map((item) => {
              const isActive = item.id === activeId;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveId(item.id)}
                  onClick={() => setActiveId(item.id)}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all duration-500 ${
                    isActive
                      ? "bg-[#F8F5F1] border-[#C98F78] shadow-[0_10px_25px_rgba(201,143,120,0.1)] translate-x-2"
                      : "border-transparent hover:border-[#C98F78]/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm italic text-[#C98F78]">{item.num}</span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#171615]/50">
                      {item.role}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#171615] mt-2 font-normal">
                    {item.name}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Center & Right: Interactive Focus Card & Dropper Asset */}
          <div className="lg:col-span-7 flex flex-col md:flex-row items-center gap-8 justify-between relative">
            
            {/* Visual Bottle Stage */}
            <div className="relative w-full h-[300px] md:h-[380px] flex items-center justify-center">
              <div className="absolute w-56 h-56 rounded-full bg-[#E9D8D0]/60 blur-3xl pointer-events-none" />
              <Image
                src="/images/Products/serum-dropper.png"
                alt="AUREA Active Formulation Dropper"
                fill
                className="object-contain drop-shadow-[0_20px_30px_rgba(23,22,21,0.12)] transition-transform duration-700"
              />
            </div>

            {/* Active Details Box */}
            <div className="w-full md:w-80 space-y-6 bg-[#F8F5F1] border border-[#C98F78]/25 p-6 rounded-2xl backdrop-blur-md z-10">
              <div className="space-y-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C98F78] font-bold">
                  Active Mechanism
                </span>
                <p className="font-sans text-xs text-[#171615]/80 leading-relaxed font-normal">
                  {activeIngredient.desc}
                </p>
              </div>

              <div className="border-t border-[#C98F78]/15 pt-4 flex items-center justify-between">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#171615]/50 font-semibold">
                  Efficacy Metric
                </span>
                <span className="font-serif text-sm text-[#171615] font-medium">
                  {activeIngredient.stat}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}