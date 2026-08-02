"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Triggers when section enters 75% of viewport
          toggleActions: "play none none reverse",
        },
      });

      // 1. Eyebrow reveal
      tl.fromTo(
        ".phil-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
      // 2. Large Quote Lines Reveal
      .fromTo(
        ".phil-line",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.1, stagger: 0.15, ease: "power3.out" },
        "-=0.5"
      )
      // 3. Rose Gold Divider Line Expansion
      .fromTo(
        ".phil-divider",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
        "-=0.6"
      )
      // 4. Sub-descriptor Pill
      .fromTo(
        ".phil-pill",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 lg:py-48 bg-[#F8F5F1] border-t border-[#C98F78]/15 flex flex-col items-center justify-center text-center px-8 overflow-hidden"
    >
      {/* Background Subtle Glow */}
      <div className="absolute w-[500px] h-[300px] bg-gradient-to-r from-[#E9D8D0]/40 via-[#C98F78]/10 to-[#E9D8D0]/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-10 z-10">
        
        {/* Eyebrow */}
        <div className="phil-eyebrow font-sans uppercase tracking-[0.35em] text-[11px] text-[#C98F78] font-semibold opacity-0">
          The Philosophy
        </div>

        {/* Masked Large Statement */}
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

        {/* Rose Gold Animated Line Divider */}
        <div className="flex justify-center py-2">
          <div className="phil-divider w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C98F78] to-transparent origin-center" />
        </div>

        {/* Formulation Pill / Description */}
        <div className="phil-pill opacity-0 pt-2 flex flex-col items-center gap-4">
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.22em] text-[#171615]/70 max-w-xl font-medium leading-relaxed">
            Formulated with Biomimetic Peptides <span className="text-[#C98F78]">·</span> Botanical Essences <span className="text-[#C98F78]">·</span> Clinical Actives
          </p>
          <span className="font-serif text-xs italic text-[#171615]/50">
            A considered approach to modern skin health.
          </span>
        </div>

      </div>
    </section>
  );
}