"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-watermark",
        { opacity: 0, y: 50 },
        {
          opacity: 0.04,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#171615] text-[#F8F5F1] pt-28 pb-12 px-8 overflow-hidden border-t border-[#C98F78]/20"
    >
      {/* Huge Background Editorial Wordmark */}
      <div className="footer-watermark absolute bottom-[-5vw] left-1/2 -translate-x-1/2 font-serif text-[26vw] leading-none text-[#F8F5F1] pointer-events-none select-none tracking-widest whitespace-nowrap opacity-0">
        AUREA
      </div>

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Brand & Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Brand Heading */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-serif text-4xl tracking-wider text-[#F8F5F1]">
              AUREA
            </h3>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#C98F78] font-medium">
              Skin, considered.
            </p>
            <p className="font-sans text-xs text-[#F8F5F1]/60 max-w-sm leading-relaxed pt-2">
              Clean, biomimetic formulations built around clinical efficacy and mindful daily ritual.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 font-sans text-xs uppercase tracking-[0.2em]">
            
            {/* SHOP */}
            <div className="space-y-4">
              <span className="text-[#C98F78] font-semibold text-[11px] block">
                SHOP
              </span>
              <ul className="space-y-2.5 text-[11px] text-[#F8F5F1]/60">
                <li className="hover:text-[#F8F5F1] transition-colors cursor-pointer">
                  All Products
                </li>
                <li className="hover:text-[#F8F5F1] transition-colors cursor-pointer">
                  Cleansers
                </li>
                <li className="hover:text-[#F8F5F1] transition-colors cursor-pointer">
                  Serums
                </li>
                <li className="hover:text-[#F8F5F1] transition-colors cursor-pointer">
                  Moisturizers
                </li>
              </ul>
            </div>

            {/* EXPLORE */}
            <div className="space-y-4">
              <span className="text-[#C98F78] font-semibold text-[11px] block">
                EXPLORE
              </span>
              <ul className="space-y-2.5 text-[11px] text-[#F8F5F1]/60">
                <li className="hover:text-[#F8F5F1] transition-colors cursor-pointer">
                  Philosophy
                </li>
                <li className="hover:text-[#F8F5F1] transition-colors cursor-pointer">
                  Ingredients
                </li>
                <li className="hover:text-[#F8F5F1] transition-colors cursor-pointer">
                  Journal
                </li>
              </ul>
            </div>

            {/* CONNECT */}
            <div className="space-y-4">
              <span className="text-[#C98F78] font-semibold text-[11px] block">
                CONNECT
              </span>
              <ul className="space-y-2.5 text-[11px] text-[#F8F5F1]/60">
                <li className="hover:text-[#F8F5F1] transition-colors cursor-pointer">
                  Instagram
                </li>
                <li className="hover:text-[#F8F5F1] transition-colors cursor-pointer">
                  Pinterest
                </li>
                <li className="hover:text-[#F8F5F1] transition-colors cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#F8F5F1]/10 pt-8 flex flex-col md:flex-row items-center justify-between font-sans text-[10px] uppercase tracking-[0.25em] text-[#F8F5F1]/40 gap-4">
          <span>&copy; 2026 AUREA</span>
          <div className="flex items-center gap-8">
            <span className="hover:text-[#F8F5F1]/70 cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="hover:text-[#F8F5F1]/70 cursor-pointer transition-colors">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}