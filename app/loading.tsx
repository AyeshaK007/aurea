
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-50/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-stone-800 border-t-transparent" />
        <span className="text-xs uppercase tracking-widest text-stone-500 font-mono">
          Loading...
        </span>
      </div>
    </div>
  );
}