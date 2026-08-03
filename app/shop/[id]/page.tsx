"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRODUCTS, Product } from "@/data/products";
import { ArrowLeft, Plus, Minus, Check, ArrowRight, ShieldCheck, Truck } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const product: Product = PRODUCTS[id] || PRODUCTS["radiance-serum"];

  // Gallery state
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "50ml");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Animation refs
  const pageRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset selected image and size when product changes
    setSelectedImage(0);
    setSelectedSize(product.sizes[0] || "50ml");
    setQuantity(1);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pdp-fade",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power2.out" }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [id, product]);

  const handleImageSwitch = (index: number) => {
    if (index === selectedImage) return;
    gsap.to(mainImageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.25,
      onComplete: () => {
        setSelectedImage(index);
        gsap.to(mainImageRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
        });
      },
    });
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  // Recommendations (exclude current product)
  const recommendations = Object.values(PRODUCTS)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <main ref={pageRef} className="bg-[#F8F5F1] text-[#171615] min-h-screen">
      <Navbar />

      <div className="pt-28 lg:pt-36 pb-20 max-w-7xl mx-auto px-8">
        
        {/* Back Link */}
        <button
          onClick={() => router.back()}
          className="pdp-fade inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#171615]/60 hover:text-[#C98F78] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </button>

        {/* Top Split: Gallery & Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Product Images */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Stage Image */}
            <div className="pdp-fade relative h-[420px] md:h-[540px] bg-[#F3ECE7] rounded-2xl border border-[#C98F78]/15 flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute w-72 h-72 rounded-full bg-[#E9D8D0]/40 blur-3xl pointer-events-none" />
              
              <div ref={mainImageRef} className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-[0_25px_35px_rgba(23,22,21,0.12)]"
                  priority
                />
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="pdp-fade flex items-center gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleImageSwitch(idx)}
                    className={`relative w-20 h-20 rounded-xl bg-[#F3ECE7] border transition-all duration-300 p-2 overflow-hidden ${
                      selectedImage === idx
                        ? "border-[#C98F78] ring-1 ring-[#C98F78]/50 scale-105"
                        : "border-[#C98F78]/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Buy Box & Product Details */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Brand Header & Price */}
            <div className="pdp-fade space-y-2 border-b border-[#C98F78]/15 pb-6">
              <span className="font-sans uppercase tracking-[0.35em] text-[11px] text-[#C98F78] font-semibold">
                AUREA
              </span>
              <h1 className="font-serif text-3xl md:text-5xl text-[#171615] font-normal tracking-tight">
                {product.name}
              </h1>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#B88968] font-medium">
                {product.subtitle}
              </p>
              <div className="pt-2 font-serif text-2xl text-[#171615]">
                ${product.price} <span className="font-sans text-xs text-[#171615]/50">USD</span>
              </div>
            </div>

            {/* Description */}
            <p className="pdp-fade font-sans text-xs text-[#171615]/75 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="pdp-fade space-y-3">
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#171615]/70 font-semibold block">
                  Volume
                </span>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 border ${
                        selectedSize === size
                          ? "bg-[#171615] text-[#F8F5F1] border-[#171615]"
                          : "bg-transparent text-[#171615] border-[#C98F78]/30 hover:border-[#171615]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart */}
            <div className="pdp-fade space-y-4 pt-2">
              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center border border-[#C98F78]/30 rounded-full px-4 py-3 bg-[#F8F5F1]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#171615]/60 hover:text-[#171615] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-sans text-xs font-semibold px-4 w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#171615]/60 hover:text-[#171615] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-8 rounded-full font-sans text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-md flex items-center justify-center gap-3 ${
                    addedToCart
                      ? "bg-[#C98F78] text-[#F8F5F1]"
                      : "bg-[#171615] text-[#F8F5F1] hover:bg-[#171615]/90"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C98F78]" />
                      <span>Add to Bag — ${(product.price * quantity).toFixed(0)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.2em] text-[#171615]/50 pt-2 border-t border-[#C98F78]/10">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C98F78]" /> Complimentary Express Shipping
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C98F78]" /> Dermatologist Tested
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Editorial Accordion / Breakdown Section */}
        <div className="mt-24 pt-16 border-t border-[#C98F78]/20 grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* THE FORMULA */}
          <div className="pdp-fade space-y-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C98F78] font-semibold block">
              01 / Formulation
            </span>
            <h3 className="font-serif text-2xl text-[#171615]">The Formula</h3>
            <p className="font-sans text-xs text-[#171615]/70 leading-relaxed">
              {product.formula}
            </p>
          </div>

          {/* KEY INGREDIENTS */}
          <div className="pdp-fade space-y-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C98F78] font-semibold block">
              02 / Key Actives
            </span>
            <h3 className="font-serif text-2xl text-[#171615]">Key Ingredients</h3>
            <ul className="space-y-2 pt-1">
              {product.ingredients.map((ing) => (
                <li key={ing} className="font-sans text-xs text-[#171615]/80 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#C98F78]" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* HOW TO USE */}
          <div className="pdp-fade space-y-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C98F78] font-semibold block">
              03 / Application
            </span>
            <h3 className="font-serif text-2xl text-[#171615]">How to Use</h3>
            <div className="space-y-3 pt-1 font-sans text-xs text-[#171615]/75 leading-relaxed">
              <div>
                <span className="font-semibold text-[#B88968] block uppercase tracking-wider text-[10px]">
                  Morning Routine
                </span>
                <p>{product.usage.morning}</p>
              </div>
              <div>
                <span className="font-semibold text-[#B88968] block uppercase tracking-wider text-[10px]">
                  Evening Routine
                </span>
                <p>{product.usage.evening}</p>
              </div>
            </div>
          </div>

        </div>

        {/* YOU MAY ALSO LIKE */}
        <div className="mt-28 pt-16 border-t border-[#C98F78]/20 space-y-12">
          <div className="text-center space-y-2">
            <span className="font-sans uppercase tracking-[0.35em] text-[11px] text-[#C98F78] font-semibold">
              Synergistic Care
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#171615]">
              You May Also Like
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendations.map((item) => (
              <Link
                key={item.id}
                href={`/shop/${item.id}`}
                className="group bg-[#F3ECE7] border border-[#C98F78]/15 rounded-2xl p-6 transition-all duration-500 hover:border-[#C98F78]/50 flex flex-col justify-between"
              >
                <div className="relative h-60 w-full mb-4 flex items-center justify-center">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-[#C98F78]/10">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xl text-[#171615] group-hover:text-[#C98F78] transition-colors">
                      {item.name}
                    </h4>
                    <span className="font-serif text-sm text-[#171615]">${item.price}</span>
                  </div>
                  <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#B88968]">
                    {item.subtitle}
                  </p>
                  <div className="flex items-center gap-2 pt-2 text-[10px] uppercase tracking-[0.2em] text-[#171615]/60 group-hover:text-[#171615] transition-colors">
                    <span>View Product</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}