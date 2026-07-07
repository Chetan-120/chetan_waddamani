"use client";

import type { CSSProperties } from "react";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AnimatedGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 70, damping: 24 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      
      if (w < 768 || isTouch) {
        setDevice("mobile");
      } else if (w < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }

      if (containerRef.current) {
        rectRef.current = containerRef.current.getBoundingClientRect();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = rectRef.current || (containerRef.current ? containerRef.current.getBoundingClientRect() : null);
      if (!rect) return;
      const { clientX, clientY } = e;
      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;
      mouseX.set(relativeX);
      mouseY.set(relativeY);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isMobileOrTablet = window.innerWidth < 1024 || isTouch;

    if (!isMobileOrTablet) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (!isMobileOrTablet) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  const gridPatternSize = device === "mobile" ? 60 : device === "tablet" ? 70 : 80;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Base Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundSize: `${gridPatternSize}px ${gridPatternSize}px`,
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          willChange: "transform"
        } as CSSProperties}
      />

      {/* Interactive spotlight glow grid (Desktop only) */}
      {device === "desktop" && (
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(39, 245, 255, 0.08) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(39, 245, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: `${gridPatternSize}px ${gridPatternSize}px`,
            WebkitMaskImage: `radial-gradient(circle 280px at ${smoothMouseX}px ${smoothMouseY}px, black 30%, transparent 100%)`,
            maskImage: `radial-gradient(circle 280px at ${smoothMouseX}px ${smoothMouseY}px, black 30%, transparent 100%)`,
            willChange: "mask-image, WebkitMaskImage, transform"
          }}
        />
      )}

      {/* Sweeping laser line (Desktop only) */}
      {device === "desktop" && (
        <motion.div 
          className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent z-[1]"
          style={{ willChange: "transform" }}
          animate={{
            y: ["0%", "100%", "0%"]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
}

