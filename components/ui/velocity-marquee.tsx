"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue
} from "framer-motion";

interface VelocityMarqueeProps {
  baseVelocity?: number;
  text: string;
}

export function VelocityMarquee({ baseVelocity = 1.2, text }: VelocityMarqueeProps) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false
  });

  const directionFactor = useRef<number>(1);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setDevice("mobile");
      } else if (w < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleQueryChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    handleResize();
    window.addEventListener("resize", handleResize);
    mediaQuery.addEventListener("change", handleQueryChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleQueryChange);
    };
  }, []);

  useAnimationFrame((time, delta) => {
    if (prefersReducedMotion) return;

    // Normalize speed multiplier based on standard frame duration
    const timeDelta = Math.min(delta, 32); 
    let moveBy = directionFactor.current * baseVelocity * (timeDelta / 16);

    // Speed modifiers only on Desktop
    if (device === "desktop") {
      const currentVelocity = velocityFactor.get();
      if (currentVelocity < 0) {
        directionFactor.current = -1;
      } else if (currentVelocity > 0) {
        directionFactor.current = 1;
      }
      moveBy += directionFactor.current * Math.abs(currentVelocity) * (timeDelta / 16);
    }

    baseX.set(baseX.get() - moveBy);
  });

  // Repeat text mapping coordinates
  const x = useTransform(baseX, (v) => `${(((v + 45) % 25) - 45)}%`);

  if (prefersReducedMotion) {
    return (
      <div className="relative overflow-hidden w-full border-t border-b border-white/5 py-4 bg-black/40">
        <div className="flex justify-center text-sm font-mono text-cyan/70 tracking-widest uppercase">
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full border-t border-b border-white/5 py-4 bg-black/40 select-none">
      <motion.div 
        className="flex whitespace-nowrap text-xl md:text-3xl font-extrabold tracking-wider uppercase font-sans text-white/[0.08]"
        style={{ x }}
      >
        <span className="mr-12">{text} </span>
        <span className="mr-12">{text} </span>
        <span className="mr-12">{text} </span>
        <span className="mr-12">{text} </span>
        <span className="mr-12">{text} </span>
      </motion.div>
    </div>
  );
}
