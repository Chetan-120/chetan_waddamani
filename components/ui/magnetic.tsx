"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface MagneticProps {
  children: React.ReactNode;
  range?: number;
}

export function Magnetic({ children, range = 50 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isMobileOrTablet = window.innerWidth < 1024;
    if (!isTouch && !isMobileOrTablet) {
      setEnabled(true);
    }
  }, []);

  const handleMouseEnter = () => {
    if (!enabled || !ref.current) return;
    rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    
    const rect = rectRef.current || ref.current.getBoundingClientRect();
    if (!rectRef.current) {
      rectRef.current = rect;
    }
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = rect;
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    if (distance < range) {
      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    if (!enabled) return;
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={enabled ? { x: springX, y: springY } : {}}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

