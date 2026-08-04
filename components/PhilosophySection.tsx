"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ShieldCheck, Leaf } from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Biomimetic Synergy",
    tagline: "Formulated to mirror natural skin biology",
    description:
      "Our formulas use bio-identical active structures that integrate seamlessly with your skin's natural barrier for optimal bio-availability.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Clinical Rigor",
    tagline: "Efficacy backed by rigorous dermatological testing",
    description:
      "Every batch undergoes extensive clinical trials to ensure active concentration stability and non-irritating potency across all skin types.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Botanical Purity",
    tagline: "Sustainably harvested botanical actives",
    description:
      "Cold-extracted plant extracts preserved at peak potency to nourish, calm, and restore environmental resilience to damaged skin cells.",
    icon: Leaf,
  },
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".philosophy-header",
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

      // Staggered cards reveal
      gsap.fromTo(
        ".philosophy-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".philosophy-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#F8F5F1] relative border-t border-[#C98F78]/15"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="philosophy-header max-w-2xl mb-16 sm:mb-20 space-y-3 opacity-0">
          <div className="font-sans uppercase tracking-[0.3em] text-[10px] sm:text-[11px] text-[#C98F78] font-semibold">
            01 / Philosophy
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#171615] leading-[1.1]">
            Rooted in science. Elevated by nature.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#171615]/70 leading-relaxed pt-1">
            We discard non-essential fillers in favor of concentrated actives engineered to respect your skin's biological balance.
          </p>
        </div>

        {/* 3 Principles Staggered Grid */}
        <div className="philosophy-grid grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {principles.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.number}
                className="philosophy-card group bg-[#F8F5F1] border border-[#C98F78]/25 rounded-3xl p-7 sm:p-8 hover:border-[#C98F78] hover:shadow-[0_15px_30px_rgba(201,143,120,0.12)] transition-all duration-500 opacity-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C98F78] font-semibold">
                      {item.number}
                    </span>
                    <div className="p-2.5 rounded-full bg-[#E9D8D0]/50 text-[#C98F78] group-hover:bg-[#C98F78] group-hover:text-[#F8F5F1] transition-colors duration-300">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-[#171615] mb-2 group-hover:text-[#C98F78] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#B88968] font-medium mb-4">
                    {item.tagline}
                  </p>

                  <p className="font-sans text-xs text-[#171615]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-[#C98F78]/15 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C98F78]" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#171615]/50">
                    Aurea Standard
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}