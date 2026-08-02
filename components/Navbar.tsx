"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  return (
    <header className="nav-container fixed top-6 left-0 right-0 z-50 flex justify-center px-8 opacity-0">
      <nav className="flex items-center justify-between w-full max-w-7xl px-8 py-4 bg-[#F8F5F1]/85 backdrop-blur-md border border-[#C98F78]/20 rounded-full shadow-[0_4px_25px_rgba(23,22,21,0.03)]">
        
        {/* Left: Brand Anchor (Slightly larger wordmark) */}
        <div className="flex items-center w-1/4">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="AUREA Logo" 
              width={140} 
              height={42} 
              className="object-contain h-8 w-auto hover:opacity-85 transition-opacity"
              priority 
            />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center justify-center gap-10 font-sans text-[12px] tracking-[0.25em] uppercase text-[#171615]/80 font-medium w-2/4">
          <Link href="/shop" className="hover:text-[#C98F78] transition-colors">Shop</Link>
          <Link href="/philosophy" className="hover:text-[#C98F78] transition-colors">Philosophy</Link>
          <Link href="/ingredients" className="hover:text-[#C98F78] transition-colors">Ingredients</Link>
          <Link href="/journal" className="hover:text-[#C98F78] transition-colors">Journal</Link>
        </div>

        {/* Right: Cart */}
        <div className="flex items-center justify-end w-1/4">
          <button className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-[#171615] hover:text-[#C98F78] transition-colors bg-[#F8F5F1] px-5 py-2.5 rounded-full border border-[#C98F78]/30 hover:border-[#C98F78]">
            <ShoppingBag className="w-3.5 h-3.5 text-[#C98F78]" />
            <span>Cart (0)</span>
          </button>
        </div>

      </nav>
    </header>
  );
}