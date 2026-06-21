"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (device !== "desktop" || prefersReducedMotion) return;
    if (!cardRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;

    // Maximum 8 degrees of rotation
    const factorY = (x / (width / 2)) * 8;
    const factorX = -(y / (height / 2)) * 8;

    rotateX.set(factorX);
    rotateY.set(factorY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  if (device === "mobile" || prefersReducedMotion) {
    return (
      <div ref={cardRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
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
