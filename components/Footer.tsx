"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      gsap.fromTo(
        ".footer-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#171615] text-[#F8F5F1] pt-24 pb-12 px-8 border-t border-[#C98F78]/20 relative overflow-hidden"
    >
      {/* Soft Background Accent Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C98F78]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Top Grid: Newsletter & Brand Promise */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#F8F5F1]/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6 footer-anim">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C98F78]" />
              <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#C98F78] font-semibold">
                AUREA Radiance
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#F8F5F1] tracking-tight leading-tight">
              Science-backed rituals for <br />
              <span className="italic text-[#C98F78] font-light">luminous resilience.</span>
            </h2>

            <p className="font-sans text-xs text-[#F8F5F1]/60 leading-relaxed max-w-sm">
              Formulated with concentrated clinical actives and raw botanical essences. Designed to protect, restore, and elevate your skin daily.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-7 flex flex-col justify-end space-y-4 footer-anim">
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#F8F5F1]/50 font-medium flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-[#C98F78]" />
              Join the Dispatch
            </span>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row items-stretch gap-3 w-full max-w-md"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-[#1F1E1C] border border-[#C98F78]/20 rounded-full px-6 py-3.5 text-xs text-[#F8F5F1] placeholder-[#F8F5F1]/30 focus:outline-none focus:border-[#C98F78] transition-colors flex-1"
              />
              <button
                type="submit"
                className="group bg-[#C98F78] text-[#171615] px-6 py-3.5 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#D89F88] transition-all flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>

            <p className="font-sans text-[10px] text-[#F8F5F1]/40">
              By subscribing, you agree to receive editorial updates and secret formula releases.
            </p>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 footer-anim">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C98F78] font-semibold">
              Formulas
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#F8F5F1]/70">
              <li><Link href="/shop/01" className="hover:text-[#F8F5F1] transition-colors">Radiance Serum 01</Link></li>
              <li><Link href="/shop/02" className="hover:text-[#F8F5F1] transition-colors">Barrier Cream 02</Link></li>
              <li><Link href="/shop/03" className="hover:text-[#F8F5F1] transition-colors">Refining Cleanser 03</Link></li>
              <li><Link href="/shop/04" className="hover:text-[#F8F5F1] transition-colors">Essence Toner 04</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C98F78] font-semibold">
              Philosophy
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#F8F5F1]/70">
              <li><Link href="#philosophy" className="hover:text-[#F8F5F1] transition-colors">The Clinical Standard</Link></li>
              <li><Link href="#lab" className="hover:text-[#F8F5F1] transition-colors">Ingredient Lab</Link></li>
              <li><Link href="#ritual" className="hover:text-[#F8F5F1] transition-colors">Daily Rituals</Link></li>
              <li><a href="#" className="hover:text-[#F8F5F1] transition-colors">Sustainability</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C98F78] font-semibold">
              Client Care
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-[#F8F5F1]/70">
              <li><a href="#" className="hover:text-[#F8F5F1] transition-colors">Consultations</a></li>
              <li><a href="#" className="hover:text-[#F8F5F1] transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-[#F8F5F1] transition-colors">Orders & Tracking</a></li>
              <li><a href="#" className="hover:text-[#F8F5F1] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Col 4 — Socials */}
          <div className="space-y-4">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C98F78] font-semibold">
              Connect
            </h4>
            <div className="flex items-center gap-4 text-[#F8F5F1]/60">
              {/* Instagram */}
              <a href="#" className="p-2 rounded-full border border-[#F8F5F1]/10 hover:border-[#C98F78] hover:text-[#C98F78] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="p-2 rounded-full border border-[#F8F5F1]/10 hover:border-[#C98F78] hover:text-[#C98F78] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="p-2 rounded-full border border-[#F8F5F1]/10 hover:border-[#C98F78] hover:text-[#C98F78] transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Metadata & Legal */}
        <div className="pt-8 border-t border-[#F8F5F1]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[10px] uppercase tracking-[0.2em] text-[#F8F5F1]/40 footer-anim">
          <div>
            © {new Date().getFullYear()} AUREA RADIANCE INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#F8F5F1]/80 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#F8F5F1]/80 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#F8F5F1]/80 transition-colors">Cookies Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}