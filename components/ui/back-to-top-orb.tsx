"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTopOrb() {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasPulsed, setHasPulsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  // Magnetic values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateVal = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 15, mass: 0.15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotate = useSpring(rotateVal, springConfig);

  // Scroll Progress
  const [scrollProgress, setScrollProgress] = useState(0);

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

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScrollable = docHeight - winHeight;
      const scrollPercent = totalScrollable > 0 ? scrollTop / totalScrollable : 0;
      
      setScrollProgress(Math.min(1, Math.max(0, scrollPercent)));

      // State 1 & 2: Beyond 20% scroll
      setIsVisible(scrollPercent > 0.2);

      // State 4: Near bottom (85% to 98%)
      setIsNearBottom(scrollPercent > 0.85 && scrollPercent < 0.98);

      // State 5: Footer reached
      // Check if scroll is at 98% or very close to bottom
      const atBottom = scrollPercent >= 0.98 || (winHeight + scrollTop >= docHeight - 25);
      if (atBottom) {
        if (!hasPulsed) {
          setIsExpanded(true);
          setHasPulsed(true);
        }
      } else if (scrollPercent < 0.94) {
        // Reset state when scrolling up
        setHasPulsed(false);
        setIsExpanded(false);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleQueryChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    mediaQuery.addEventListener("change", handleQueryChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleQueryChange);
    };
  }, [hasPulsed]);

  // Handle auto-collapse when expanded at the footer
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (device === "mobile" || prefersReducedMotion || !containerRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const range = isExpanded ? 120 : 80;

    if (distance < range) {
      // Magnetic pull: move up to 35% of distance
      x.set(distanceX * 0.35);
      y.set(distanceY * 0.35);

      // Subtle rotation response based on cursor angle
      const angle = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
      rotateVal.set(angle * 0.12);
    } else {
      x.set(0);
      y.set(0);
      rotateVal.set(0);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    rotateVal.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Add ripple
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const id = Date.now();
    
    setRipples((prev) => [...prev, { x: clickX, y: clickY, id }]);
  };

  const handleRippleComplete = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  // Circumference for stroke dash calculations
  // radius = 22px
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <motion.a
      ref={containerRef}
      href="#home"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        x: prefersReducedMotion ? 0 : springX,
        y: prefersReducedMotion ? 0 : springY,
        rotate: prefersReducedMotion ? 0 : springRotate,
        scale: isVisible ? (prefersReducedMotion ? 1 : (isHovered ? 1.05 : 1)) : 0,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      animate={{
        width: isExpanded 
          ? (device === "mobile" ? 136 : 170) 
          : (device === "mobile" ? 44 : 52),
        height: device === "mobile" ? 44 : 52,
      }}
      transition={prefersReducedMotion ? { duration: 0.1 } : { type: "spring", stiffness: 150, damping: 20 }}
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-45 flex items-center justify-start overflow-hidden rounded-full p-[1.5px] select-none cursor-pointer transition-shadow duration-300 ${
        isNearBottom || isExpanded
          ? "shadow-[0_0_25px_rgba(39,245,255,0.45)]" 
          : "shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(255,255,255,0.03)]"
      }`}
    >
      {/* Aurora Gradient Border Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan/40 via-violet/40 to-rose-500/20 rounded-full" />
      
      {/* Glass Inner Container */}
      <div className="relative w-full h-full flex items-center bg-ink/75 backdrop-blur-xl rounded-full overflow-hidden">
        {/* Shiny Glass Reflection Sheet */}
        {!prefersReducedMotion && (
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
        )}
        
        {/* Ripple Effects Canvas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full z-0">
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onAnimationComplete={() => handleRippleComplete(ripple.id)}
              className="absolute rounded-full bg-cyan/35 pointer-events-none"
              style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
              }}
            />
          ))}
        </div>

        {/* Circular Progress & Arrow (aligned left, constant sizing) */}
        <div 
          className="relative flex items-center justify-center flex-shrink-0 z-10"
          style={{ 
            width: device === "mobile" ? 40 : 48, 
            height: device === "mobile" ? 40 : 48,
            marginLeft: device === "mobile" ? 1 : 1 
          }}
        >
          {/* SVG Progress Circle */}
          <svg className="absolute inset-0 -rotate-90 w-full h-full p-1" viewBox="0 0 48 48">
            {/* Background path */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-white/[0.06]"
              strokeWidth="2.5"
              fill="transparent"
            />
            {/* Progress path */}
            <motion.circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-cyan"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
            />
          </svg>

          {/* Arrow Icon */}
          <ArrowUp className="text-white w-4 h-4 z-20 group-hover:translate-y-[-2px] transition-transform duration-300" />
        </div>

        {/* Dynamic Island Text Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -12, filter: "blur(2px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -12, filter: "blur(2px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="pr-6 pl-1 text-[10px] font-mono font-bold tracking-widest text-cyan/90 whitespace-nowrap select-none z-10"
            >
              BACK TO TOP
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Aurora Pulsing Glow Layer Behind Orb */}
      {!prefersReducedMotion && (isNearBottom || isExpanded) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: [0.3, 0.65, 0.3], 
            scale: [0.95, 1.15, 0.95] 
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -inset-4 bg-gradient-to-tr from-cyan/30 via-violet/20 to-transparent blur-[16px] -z-10 rounded-full pointer-events-none"
        />
      )}
    </motion.a>
  );
}
