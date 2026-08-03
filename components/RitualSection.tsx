"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    step: "01",
    label: "PREPARE",
    product: "Gentle Cleanser",
    tagline: "Reset the skin without stripping.",
    desc: "A velvety botanical formula that purifies daily impurities while keeping the lipid barrier entirely intact.",
    image: "/images/Products/cleanser-front.png",
  },
  {
    step: "02",
    label: "REFINE",
    product: "Botanical Toner",
    tagline: "Balance and prepare.",
    desc: "A nutrient-dense essence that restores optimal skin pH and preps pores for deep nutrient absorption.",
    image: "/images/Products/toner-front.png",
  },
  {
    step: "03",
    label: "TREAT",
    product: "Radiance Serum",
    tagline: "Target, replenish, illuminate.",
    desc: "Concentrated biomimetic peptides and niacinamide deliver active illumination to deep surface layers.",
    image: "/images/Products/serum-front.png",
  },
  {
    step: "04",
    label: "SEAL",
    product: "Barrier Cream",
    tagline: "Lock in lasting hydration.",
    desc: "Bio-identical ceramides and plant squalane seal in active hydration for all-day moisture retention.",
    image: "/images/Products/cream-front.png",
  },
];

export default function RitualSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the section while scrolling through steps
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // Scroll distance for 4 steps
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            // Determine active index (0 to 3) based on progress
            const index = Math.min(
              Math.floor(self.progress * STEPS.length),
              STEPS.length - 1
            );
            setActiveStep(index);
          },
        },
      });

      // Step transition animations tied directly to scrub
      STEPS.forEach((_, i) => {
        if (i === 0) return; // Step 0 is starting state

        tl.to(
          `.bottle-img-${i - 1}`,
          { opacity: 0, scale: 0.8, y: -40, rotation: -8, duration: 1 },
          `step-${i}`
        )
        .fromTo(
          `.bottle-img-${i}`,
          { opacity: 0, scale: 0.85, y: 60, rotation: 8 },
          { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1 },
          `step-${i}`
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#F8F5F1] border-t border-[#C98F78]/15 flex items-center overflow-hidden py-20"
    >
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Left: Section Header & Step Text Indicators */}
        <div className="lg:col-span-5 space-y-8 z-10">
          <div className="space-y-2">
            <span className="font-sans uppercase tracking-[0.35em] text-[11px] text-[#C98F78] font-semibold">
              The Ritual
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#171615] font-normal tracking-tight">
              Four considered steps. <br />
              <span className="italic text-[#B88968] font-light">
                One complete routine.
              </span>
            </h2>
          </div>

          {/* Interactive Steps List */}
          <div className="space-y-6 pt-4">
            {STEPS.map((item, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={item.step}
                  className={`transition-all duration-500 border-l-2 pl-6 py-1 ${
                    isActive
                      ? "border-[#C98F78] opacity-100 translate-x-2"
                      : "border-[#171615]/10 opacity-35 hover:opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-sm italic text-[#C98F78]">
                      {item.step}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-semibold text-[#171615]">
                      {item.label}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#171615] mt-1 font-normal">
                    {item.product}
                  </h3>

                  {isActive && (
                    <div className="mt-2 space-y-1 transition-all duration-500">
                      <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#B88968] font-medium">
                        {item.tagline}
                      </p>
                      <p className="font-sans text-xs text-[#171615]/70 max-w-sm leading-relaxed pt-1">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Dynamic Animated Product Display */}
        <div className="lg:col-span-7 relative h-[450px] md:h-[580px] flex items-center justify-center">
          {/* Subtle Ambient Backdrop */}
          <div className="absolute w-[320px] md:w-[440px] h-[320px] md:h-[440px] rounded-full bg-gradient-to-tr from-[#E9D8D0]/50 via-[#C98F78]/10 to-transparent blur-[60px] pointer-events-none" />
          <div className="absolute w-[280px] md:w-[380px] h-[280px] md:h-[380px] rounded-full border border-[#C98F78]/25 pointer-events-none" />

          {/* Stacked Images for Smooth GSAP Crossfades */}
          <div className="relative w-full h-full flex items-center justify-center">
            {STEPS.map((item, index) => (
              <div
                key={item.step}
                className={`bottle-img-${index} absolute inset-0 flex items-center justify-center ${
                  index === 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="relative w-full h-[380px] md:h-[480px]">
                  <Image
                    src={item.image}
                    alt={item.product}
                    fill
                    className="object-contain drop-shadow-[0_25px_35px_rgba(23,22,21,0.12)]"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Floating Badge Indicator */}
          <div className="absolute bottom-4 right-4 bg-[#F8F5F1]/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#C98F78]/30 shadow-sm flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C98F78] animate-pulse" />
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#171615]/80 font-semibold">
              Step {STEPS[activeStep].step} / 04
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}