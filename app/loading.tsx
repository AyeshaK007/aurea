export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F5F1] text-[#171615]">
      {/* Subtle pulsing background glow */}
      <div className="absolute w-64 h-64 rounded-full bg-[#E9D8D0]/50 blur-3xl animate-pulse pointer-events-none" />

      {/* Brand Monogram / Indicator */}
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Outer spinning accent ring */}
          <div className="absolute inset-0 rounded-full border border-[#C98F78]/20 border-t-[#C98F78] animate-spin" />
          
          {/* Inner core branding */}
          <span className="font-serif text-lg font-light text-[#C98F78] tracking-widest">
            A
          </span>
        </div>

        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#171615]/60 animate-pulse font-medium">
          Loading Ritual...
        </span>
      </div>
    </div>
  );
}