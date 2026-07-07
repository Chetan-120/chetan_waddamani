"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  max?: number;
}

export function TiltCard({ children, className = "", max = 8 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

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
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleQueryChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    mediaQuery.addEventListener("change", handleQueryChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleQueryChange);
    };
  }, []);

  const handleMouseEnter = () => {
    if (device !== "desktop" || prefersReducedMotion || !cardRef.current) return;
    rectRef.current = cardRef.current.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (device !== "desktop" || prefersReducedMotion || !cardRef.current) return;

    const rect = rectRef.current || cardRef.current.getBoundingClientRect();
    if (!rectRef.current) {
      rectRef.current = rect;
    }

    const { clientX, clientY } = e;
    const { left, top, width, height } = rect;

    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;

    const factorY = (x / (width / 2)) * max;
    const factorX = -(y / (height / 2)) * max;

    rotateX.set(factorX);
    rotateY.set(factorY);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    rotateX.set(0);
    rotateY.set(0);
  };

  if (device === "mobile" || device === "tablet" || prefersReducedMotion) {
    return (
      <div ref={cardRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: springX,
        rotateY: springY,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

