"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function HeroAtmosphere() {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 40, damping: 22 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const shape1X = useTransform(smoothMouseX, [-400, 400], [-25, 25]);
  const shape1Y = useTransform(smoothMouseY, [-400, 400], [-25, 25]);
  const shape1Rotate = useTransform(smoothMouseX, [-400, 400], [-12, 12]);

  const shape2X = useTransform(smoothMouseX, [-400, 400], [35, -35]);
  const shape2Y = useTransform(smoothMouseY, [-400, 400], [35, -35]);

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

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseX.set(clientX - w / 2);
      mouseY.set(clientY - h / 2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [device, mouseX, mouseY]);

  if (device === "mobile") return null;

  if (device === "tablet") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-10">
        <motion.div
          className="absolute right-[10%] top-[24%] w-28 h-28 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm shadow-card"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 4, 0]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute left-[12%] bottom-[24%] w-20 h-20 rounded-full border border-cyan/10 bg-cyan/[0.01] backdrop-blur-sm"
          animate={{
            y: [0, 8, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-10">
      <motion.div
        className="absolute right-[12%] top-[20%] w-40 h-40 rounded-3xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-xl shadow-glow flex flex-col justify-between p-4"
        style={{
          x: shape1X,
          y: shape1Y,
          rotate: shape1Rotate,
          transformStyle: "preserve-3d",
          perspective: 800
        }}
        animate={{
          translateY: [0, -15, 0]
        }}
        transition={{
          translateY: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan/25 to-violet/15 border border-white/5" />
        <div className="space-y-1">
          <div className="w-1/2 h-1.5 bg-white/5 rounded" />
          <div className="w-1/3 h-1 bg-white/5 rounded" />
        </div>
      </motion.div>

      <motion.div
        className="absolute left-[15%] bottom-[22%] w-32 h-32 rounded-full border border-cyan/10 bg-cyan/[0.01] backdrop-blur-lg shadow-card"
        style={{
          x: shape2X,
          y: shape2Y
        }}
        animate={{
          translateY: [0, 12, 0],
          scale: [1, 1.03, 1]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
