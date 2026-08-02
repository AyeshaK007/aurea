"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PRINCIPLES = [
  {
    number: "01",
    title: "BIOLOGY FIRST",
    description: "Formulated to align seamlessly with your skin's natural functions rather than working against them.",
  },
  {
    number: "02",
    title: "CONSIDERED FORMULAS",
    description: "A refined combination of biomimetic peptides, botanical extracts, and clinically studied actives.",
  },
  {
    number: "03",
    title: "LESS, BUT BETTER",
    description: "A highly concentrated, essential routine designed to replace a shelf full of redundant products.",
  },
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

      // 1. Header reveal
      tl.fromTo(
        ".phil-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(
        ".phil-line",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.1, stagger: 0.15, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ".phil-divider",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
        "-=0.6"
      )
      // 2. Principles 3-Column Stagger
      .fromTo(
        ".principle-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-28 lg:py-40 bg-[#F8F5F1] border-t border-[#C98F78]/15 px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20 z-10 relative">
        
        {/* Main Editorial Statement */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="phil-eyebrow font-sans uppercase tracking-[0.35em] text-[11px] text-[#C98F78] font-semibold opacity-0">
            The Philosophy
          </div>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.15] text-[#171615] tracking-tight">
            <span className="block overflow-hidden">
              <span className="phil-line block opacity-0">Skin is intelligent.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="phil-line block opacity-0 text-[#B88968] italic font-light">
                Your skincare should be too.
              </span>
            </span>
          </h2>

          <div className="flex justify-center py-2">
            <div className="phil-divider w-28 h-[1px] bg-gradient-to-r from-transparent via-[#C98F78] to-transparent origin-center" />
          </div>
        </div>

        {/* 3 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-8">
          {PRINCIPLES.map((principle) => (
            <div 
              key={principle.number}
              className="principle-card group bg-[#F8F5F1] border border-[#C98F78]/20 p-8 lg:p-10 rounded-2xl transition-all duration-500 hover:border-[#C98F78]/60 hover:shadow-[0_10px_30px_rgba(201,143,120,0.08)] flex flex-col justify-between opacity-0"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#C98F78]/15 pb-4">
                  <span className="font-serif text-xl text-[#C98F78] font-light italic">
                    {principle.number}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C98F78]/40 group-hover:bg-[#C98F78] transition-colors" />
                </div>

                <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-[#171615] font-semibold">
                  {principle.title}
                </h3>

                <p className="font-sans text-xs text-[#171615]/70 leading-relaxed font-normal">
                  {principle.description}
                </p>
              </div>

              <div className="pt-6 font-sans text-[10px] uppercase tracking-[0.2em] text-[#B88968] group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                <span>Explore Science</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}