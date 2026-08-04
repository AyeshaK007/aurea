'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 8 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          ease: 'power2.out',
          onComplete: () => {
            // Recalculate GSAP ScrollTrigger positions after page transition finishes
            ScrollTrigger.refresh();
          }
        }
      );
    }
  }, [pathname]);

  return <div ref={containerRef}>{children}</div>;
}