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

    // Guard GSAP pinned scroll animations for viewports >= 1024px
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * STEPS.length),
              STEPS.length - 1
            );
            setActiveStep(index);
          },
        },
      });

      STEPS.forEach((_, i) => {
        if (i === 0) return;

        tl.addLabel(`step-${i}`)
          .to(
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
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, []);

  return (
    <section
      id="ritual"
      ref={sectionRef}
      className="relative min-h-screen bg-[#F8F5F1] border-t border-[#C98F78]/15 py-14 sm:py-24 lg:py-0 lg:flex lg:items-center overflow-hidden"
    >
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        {/* Left: Section Header & Step Text Indicators */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 z-10">
          <div className="space-y-2">
            <span className="font-sans uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[10px] sm:text-[11px] text-[#C98F78] font-semibold">
              The Ritual
            </span>
            <h2 className="font-serif text-2xl min-[390px]:text-3xl lg:text-5xl text-[#171615] font-normal tracking-tight leading-[1.15]">
              Four considered steps. <br className="hidden sm:inline" />
              <span className="italic text-[#B88968] font-light">
                One complete routine.
              </span>
            </h2>
          </div>

          {/* Interactive Steps List (Clickable/Tappable on mobile) */}
          <div className="space-y-4 sm:space-y-6 pt-2 sm:pt-4">
            {STEPS.map((item, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(index)}
                  className={`transition-all duration-300 border-l-2 pl-4 sm:pl-6 py-1 cursor-pointer ${
                    isActive
                      ? "border-[#C98F78] opacity-100 translate-x-1 sm:translate-x-2"
                      : "border-[#171615]/10 opacity-40 hover:opacity-75"
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="font-serif text-xs sm:text-sm italic text-[#C98F78]">
                      {item.step}
                    </span>
                    <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-[#171615]">
                      {item.label}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-2xl text-[#171615] mt-0.5 sm:mt-1 font-normal">
                    {item.product}
                  </h3>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100 mt-2"
                        : "grid-rows-[0fr] opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="overflow-hidden space-y-1">
                      <p className="font-sans text-[10.5px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#B88968] font-medium">
                        {item.tagline}
                      </p>
                      <p className="font-sans text-xs text-[#171615]/70 max-w-sm leading-relaxed pt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Dynamic Animated Product Display */}
        <div className="lg:col-span-7 relative h-[300px] min-[390px]:h-[360px] sm:h-[480px] lg:h-[580px] flex items-center justify-center">
          {/* Ambient Backdrop */}
          <div className="absolute w-[240px] sm:w-[380px] lg:w-[440px] h-[240px] sm:h-[380px] lg:h-[440px] rounded-full bg-gradient-to-tr from-[#E9D8D0]/50 via-[#C98F78]/10 to-transparent blur-[40px] sm:blur-[60px] pointer-events-none" />
          <div className="absolute w-[200px] sm:w-[320px] lg:w-[380px] h-[200px] sm:h-[320px] lg:h-[380px] rounded-full border border-[#C98F78]/25 pointer-events-none" />

          {/* Product Image Stage */}
          <div className="relative w-full h-full flex items-center justify-center">
            {STEPS.map((item, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={item.step}
                  className={`bottle-img-${index} absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${
                    isActive
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-90 translate-y-6 pointer-events-none"
                  }`}
                >
                  <div className="relative w-full h-[260px] min-[390px]:h-[320px] sm:h-[420px] lg:h-[480px]">
                    <Image
                      src={item.image}
                      alt={item.product}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain drop-shadow-[0_20px_30px_rgba(23,22,21,0.12)] p-2"
                      priority={index === 0}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Pill Indicator */}
          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-[#F8F5F1]/90 backdrop-blur-md px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full border border-[#C98F78]/30 shadow-sm flex items-center gap-2 sm:gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C98F78] animate-pulse" />
            <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#171615]/80 font-semibold">
              Step {STEPS[activeStep].step} / 04
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}