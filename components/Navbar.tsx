"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, X, ArrowRight, Menu } from "lucide-react";

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Fixed Outer Wrapper */}
      <header className="nav-container fixed top-3 sm:top-6 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
        <nav className="max-w-7xl mx-auto w-full pointer-events-auto">
          <div className="bg-[#F8F5F1]/90 backdrop-blur-md border border-[#C98F78]/20 rounded-full px-4 sm:px-8 py-3 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
            
            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-[#171615] hover:text-[#C98F78] transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-serif text-lg sm:text-xl tracking-wider text-[#171615] group-hover:text-[#C98F78] transition-colors">
                AUREA
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              <Link
                href="#collection"
                onClick={(e) => handleScroll(e, "collection")}
                className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#171615]/70 hover:text-[#C98F78] transition-colors font-medium"
              >
                Shop
              </Link>
              <Link
                href="#philosophy"
                onClick={(e) => handleScroll(e, "philosophy")}
                className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#171615]/70 hover:text-[#C98F78] transition-colors font-medium"
              >
                Philosophy
              </Link>
              <Link
                href="#lab"
                onClick={(e) => handleScroll(e, "lab")}
                className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#171615]/70 hover:text-[#C98F78] transition-colors font-medium"
              >
                Ingredients
              </Link>
              <Link
                href="#ritual"
                onClick={(e) => handleScroll(e, "ritual")}
                className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#171615]/70 hover:text-[#C98F78] transition-colors font-medium"
              >
                Journal
              </Link>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="group flex items-center gap-2 border border-[#C98F78]/30 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full hover:bg-[#171615] hover:border-[#171615] transition-all duration-300 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C98F78] group-hover:text-[#F8F5F1] transition-colors" />
              <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#171615] group-hover:text-[#F8F5F1] transition-colors font-semibold">
                Cart ({cartCount})
              </span>
            </button>

          </div>
        </nav>
      </header>

      {/* Mobile Nav Overlay Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#171615]/40 backdrop-blur-md md:hidden pt-24 px-4">
          <div className="bg-[#F8F5F1] border border-[#C98F78]/20 rounded-3xl p-6 shadow-2xl flex flex-col space-y-5">
            <Link
              href="#collection"
              onClick={(e) => handleScroll(e, "collection")}
              className="font-sans text-xs uppercase tracking-[0.3em] text-[#171615] font-semibold py-2.5 border-b border-[#C98F78]/15"
            >
              Shop
            </Link>
            <Link
              href="#philosophy"
              onClick={(e) => handleScroll(e, "philosophy")}
              className="font-sans text-xs uppercase tracking-[0.3em] text-[#171615] font-semibold py-2.5 border-b border-[#C98F78]/15"
            >
              Philosophy
            </Link>
            <Link
              href="#lab"
              onClick={(e) => handleScroll(e, "lab")}
              className="font-sans text-xs uppercase tracking-[0.3em] text-[#171615] font-semibold py-2.5 border-b border-[#C98F78]/15"
            >
              Ingredients
            </Link>
            <Link
              href="#ritual"
              onClick={(e) => handleScroll(e, "ritual")}
              className="font-sans text-xs uppercase tracking-[0.3em] text-[#171615] font-semibold py-2.5"
            >
              Journal
            </Link>
          </div>
        </div>
      )}

      {/* Slide-out Cart Overlay / Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div 
            onClick={() => setIsCartOpen(false)} 
            className="absolute inset-0 bg-[#171615]/40 backdrop-blur-sm transition-opacity"
          />

          <div className="relative w-full max-w-md bg-[#F8F5F1] h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between z-10 border-l border-[#C98F78]/20">
            <div>
              <div className="flex items-center justify-between border-b border-[#C98F78]/20 pb-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#C98F78]" />
                  <h3 className="font-serif text-xl text-[#171615]">Your Selection</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-[#171615]/5 transition-colors text-[#171615]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-12 text-center space-y-4">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#171615]/50">
                  Your cart is currently empty
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    const el = document.getElementById("collection");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#C98F78] hover:underline font-semibold"
                >
                  Explore Formulas <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="border-t border-[#C98F78]/20 pt-6 space-y-4">
              <div className="flex justify-between font-serif text-lg text-[#171615]">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <button 
                disabled 
                className="w-full bg-[#171615] text-[#F8F5F1] py-4 rounded-full font-sans text-xs uppercase tracking-[0.25em] opacity-50 cursor-not-allowed"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}