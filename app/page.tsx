"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import PhilosophySection from "@/components/PhilosophySection";
import CollectionSection from "@/components/CollectionSection";
import IngredientLab from "@/components/IngredientLab";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".nav-container",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(
        ".hero-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.8"
      )
      .fromTo(
        ".heading-line",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.1, stagger: 0.12 },
        "-=0.65"
      )
      .fromTo(
        ".hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ".hero-bottle",
        { scale: 0.88, opacity: 0, y: 60, rotation: -6 },
        { scale: 1, opacity: 1, y: 0, rotation: 0, duration: 1.8, ease: "power2.out" },
        1.0
      )
      .fromTo(
        ".hero-circle",
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" },
        "<"
      )
      .fromTo(
        ".hero-badge",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

      gsap.to(".hero-bottle-float", {
        y: -14,
        rotation: 1.5,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.easeInOut",
      });

      gsap.to(".hero-bottle-container", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
        y: 90,
        rotation: 4,
        ease: "none",
      });
    }, containerRef);

    const handleMouseMove = (e: MouseEvent) => {
      if (!bottleRef.current) return;
      const { clientX, clientY } = e;
      const moveX = (clientX / window.innerWidth - 0.5) * 20;
      const moveY = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(bottleRef.current, {
        x: moveX,
        y: moveY,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-[#F8F5F1] text-[#171615]">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen overflow-hidden pt-32 lg:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-10rem)]">
          
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 z-10 pt-12 lg:pt-0">
            <div className="hero-eyebrow font-sans uppercase tracking-[0.3em] text-[11px] text-[#C98F78] font-semibold opacity-0">
              Skincare, Refined.
            </div>

            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[1.02] lg:leading-[0.95] font-normal tracking-tight text-[#171615] space-y-1">
              <span className="block overflow-hidden">
                <span className="heading-line block opacity-0">Glow begins</span>
              </span>
              <span className="block overflow-hidden">
                <span className="heading-line block opacity-0">with healthy</span>
              </span>
              <span className="block overflow-hidden">
                <span className="heading-line block opacity-0 text-[#C98F78]">skin.</span>
              </span>
            </h1>

            <div className="hero-desc space-y-3 opacity-0 pt-2">
              <div className="font-sans text-xs uppercase tracking-[0.25em] text-[#B88968] font-medium">
                Minimal science. Maximum results.
              </div>
              <p className="font-sans text-sm text-[#171615]/70 max-w-md leading-relaxed">
                Formulated with biomimetic peptides and botanical essences. A considered approach to radiant, healthy-looking skin.
              </p>
            </div>

            <div className="hero-cta opacity-0 pt-4">
              <button className="group flex items-center gap-4 bg-[#171615] text-[#F8F5F1] px-8 py-4 rounded-full shadow-xl hover:bg-[#171615]/90 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C98F78] inline-block" />
                <span className="font-sans text-xs uppercase tracking-[0.25em]">Shop collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C98F78]" />
              </button>
            </div>
          </div>

          <div className="hero-bottle-container lg:col-span-5 relative h-[500px] lg:h-[650px] flex items-center justify-center mt-8 lg:mt-0">
            <div className="hero-circle absolute w-[350px] lg:w-[460px] h-[350px] lg:h-[460px] bg-gradient-to-tr from-[#E9D8D0]/60 via-[#C98F78]/15 to-transparent rounded-full blur-[80px] pointer-events-none opacity-0" />

            <div className="hero-circle absolute w-[300px] lg:w-[380px] h-[300px] lg:h-[380px] rounded-full border border-[#C98F78]/20 flex items-center justify-center pointer-events-none opacity-0">
              <div className="w-[240px] lg:w-[300px] h-[240px] lg:h-[300px] rounded-full border border-dashed border-[#C98F78]/25 animate-[spin_75s_linear_infinite]" />
            </div>

            <div className="hero-bottle-float relative w-full h-[420px] lg:h-[540px] flex items-center justify-center z-10">
              <div ref={bottleRef} className="hero-bottle relative w-full h-full flex items-center justify-center opacity-0">
                <Image 
                  src="/images/Products/serum-angle.png" 
                  alt="AUREA Radiance Serum Campaign" 
                  fill
                  className="object-contain drop-shadow-[0_35px_45px_rgba(23,22,21,0.12)]"
                  priority
                />
              </div>
            </div>

            <div className="hero-circle absolute bottom-4 lg:bottom-12 w-44 lg:w-52 h-5 bg-[#171615]/10 rounded-full blur-xl pointer-events-none opacity-0" />

            <div className="hero-badge absolute bottom-2 lg:bottom-8 right-0 lg:right-2 bg-[#F8F5F1]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#C98F78]/30 shadow-sm flex items-center gap-3 z-20 opacity-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C98F78]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#171615]/80 font-semibold">
                Aurea / Radiance / 01
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 01 — Philosophy Section */}
      <PhilosophySection />

      {/* 02 — Featured Collection */}
      <CollectionSection />

      {/* 03 — Interactive Formulation Lab */}
      <IngredientLab />
    </main>
  );
}