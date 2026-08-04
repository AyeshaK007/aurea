import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8F5F1] text-[#171615] px-6 text-center">
      <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#C98F78] mb-4">
        Error 404
      </span>

      <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight mb-6">
        Page Not Found
      </h1>

      <p className="max-w-md text-sm md:text-base text-[#171615]/70 font-light leading-relaxed mb-10">
        The ritual or product page you are seeking does not exist or has been relocated.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-3 bg-[#171615] text-[#F8F5F1] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-transform hover:scale-105 active:scale-95"
      >
        Return to Home
      </Link>
    </main>
  );
}