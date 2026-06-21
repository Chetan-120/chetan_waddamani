"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface FloatingBadgeProps {
  name: string;
  delay?: number;
  className?: string;
  badgeX: any;
  badgeY: any;
}

function FloatingBadge({
  name,
  delay = 0,
  className = "",
  badgeX,
  badgeY
}: FloatingBadgeProps) {
  return (
    <motion.div
      style={{ x: badgeX, y: badgeY }}
      className={`absolute z-30 pointer-events-none ${className}`}
    >
      <motion.span
        className="inline-block rounded-full border border-white/10 bg-[#050505]/60 px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-wider text-white/80 backdrop-blur-md hover:border-cyan/30 transition-colors shadow-glow select-none"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
}

export function PremiumPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 22 };

  // Subtle Parallax translation and rotation factors
  const portraitX = useSpring(useTransform(mouseX, [-400, 400], [-8, 8]), springConfig);
  const portraitY = useSpring(useTransform(mouseY, [-400, 400], [-8, 8]), springConfig);
  
  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-3, 3]), springConfig);

  // Independent badge spring mappings
  const badge1X = useSpring(useTransform(mouseX, [-400, 400], [-10, 10]), springConfig);
  const badge1Y = useSpring(useTransform(mouseY, [-400, 400], [-10, 10]), springConfig);

  const badge2X = useSpring(useTransform(mouseX, [-400, 400], [-18, 18]), springConfig);
  const badge2Y = useSpring(useTransform(mouseY, [-400, 400], [-18, 18]), springConfig);

  const badge3X = useSpring(useTransform(mouseX, [-400, 400], [-12, 12]), springConfig);
  const badge3Y = useSpring(useTransform(mouseY, [-400, 400], [-12, 12]), springConfig);

  const badge4X = useSpring(useTransform(mouseX, [-400, 400], [-20, 20]), springConfig);
  const badge4Y = useSpring(useTransform(mouseY, [-400, 400], [-20, 20]), springConfig);

  const badge5X = useSpring(useTransform(mouseX, [-400, 400], [-15, 15]), springConfig);
  const badge5Y = useSpring(useTransform(mouseY, [-400, 400], [-15, 15]), springConfig);

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
      if (device !== "desktop") return;
      const { clientX, clientY } = e;
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouseX.set(clientX - w / 2);
      mouseY.set(clientY - h / 2);
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleQueryChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    mediaQuery.addEventListener("change", handleQueryChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      mediaQuery.removeEventListener("change", handleQueryChange);
    };
  }, [device, mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative flex flex-col items-center select-none w-full">
      
      {/* Outer bounding box of portrait - aligned bottom-right and overflowing slightly */}
      <div className="relative aspect-[3/4] w-[280px] xs:w-[310px] sm:w-[340px] md:w-[390px] lg:w-[460px] xl:w-[520px] mx-auto lg:ml-auto lg:mr-[-40px] xl:mr-[-60px] overflow-visible">
        
        {/* Radial Ambient Glow behind portrait (illuminates the subject from behind) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] bg-[radial-gradient(circle,rgba(6,182,212,0.12)_0%,rgba(124,58,237,0.08)_40%,transparent_70%)] blur-[40px] pointer-events-none z-0" />

        {/* Floating Cutout Portrait (no overflow-hidden parent wrapper, no cards, no containers) */}
        <motion.div
          style={{ 
            x: device === "desktop" ? portraitX : 0, 
            y: device === "desktop" ? portraitY : 0,
            rotateX: device === "desktop" && !prefersReducedMotion ? rotateX : 0,
            rotateY: device === "desktop" && !prefersReducedMotion ? rotateY : 0,
            transformStyle: "preserve-3d",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            WebkitMaskComposite: "source-in",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            maskComposite: "intersect"
          }}
          animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          className="absolute inset-0 w-full h-full z-10"
        >
          <Image
            src="/profile-portrait.png"
            alt="Chetan Waddamani Cutout"
            fill
            className="object-cover pointer-events-none scale-[1.02] origin-bottom"
            priority
            sizes="(max-w-768px) 280px, (max-w-1024px) 390px, 520px"
          />
        </motion.div>

        {/* Floating Glass Identity Badges (Desktop & Tablet only) - positioned to avoid face */}
        {device !== "mobile" && (
          <>
            <FloatingBadge name="AI Builder" delay={0} className="top-[12%] left-[-16%]" badgeX={badge1X} badgeY={badge1Y} />
            <FloatingBadge name="Full Stack Developer" delay={1} className="top-[22%] right-[-14%]" badgeX={badge2X} badgeY={badge2Y} />
            <FloatingBadge name="AI Enthusiast" delay={2} className="top-[45%] left-[-20%]" badgeX={badge3X} badgeY={badge3Y} />
            <FloatingBadge name="Creative Creator" delay={3} className="top-[55%] right-[-18%]" badgeX={badge4X} badgeY={badge4Y} />
            <FloatingBadge name="Technology Innovator" delay={4} className="bottom-[18%] left-[-12%]" badgeX={badge5X} badgeY={badge5Y} />
          </>
        )}
      </div>

      {/* Inline Badge rows for Mobile to fit smaller viewports */}
      {device === "mobile" && (
        <div className="mt-8 flex flex-wrap gap-2 justify-center max-w-[280px]">
          <span className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-wider text-white/70">AI Builder</span>
          <span className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-wider text-white/70">Full Stack Developer</span>
          <span className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-wider text-white/70">AI Enthusiast</span>
          <span className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-wider text-white/70">Creative Creator</span>
          <span className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-wider text-white/70">Technology Innovator</span>
        </div>
      )}
    </div>
  );
}
