"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Calendar, ChevronRight } from "lucide-react";

import { timelineJourneyData } from "@/lib/content";

export function TimelineJourney() {
  const [filter, setFilter] = useState<"all" | "experience" | "education">("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleQueryChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleQueryChange);
    return () => mediaQuery.removeEventListener("change", handleQueryChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const filteredItems = useMemo(() => {
    return timelineJourneyData.filter(
      (item) => filter === "all" || item.type === filter
    );
  }, [filter]);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="journey" className="section relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#050505] to-[#020202]">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-violet/5 blur-3xl" />

      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
            Milestones
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Visual Journey & Trajectory
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">
            A chronological roadmap detailing professional growth, key projects, and academic background.
          </p>

          {/* Filters */}
          <div className="mt-8 flex justify-center gap-2">
            {(["all", "experience", "education"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  filter === type
                    ? "bg-cyan text-black border border-cyan"
                    : "bg-white/5 text-white/60 hover:text-white border border-white/10"
                }`}
              >
                {type === "all" ? "All Milestones" : type}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative mx-auto mt-16 max-w-3xl">
          {/* Vertical progress line */}
          <div className="absolute left-4 top-2 h-[calc(100%-1.5rem)] w-px bg-white/10 md:left-1/2">
            <motion.div
              style={{ scaleY: prefersReducedMotion ? 1 : scaleY, transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-cyan via-violet to-electric"
            />
          </div>

          <motion.div layout className="space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const isEven = index % 2 === 0;
                const isActive = hoveredIdx === index;
                return (
                  <motion.div
                    key={item.title + item.date}
                    layout
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Node Dot marker: active node glows and lifts slightly, inactive nodes remain flat/static */}
                    <div 
                      className={`absolute left-[9px] top-6 z-10 flex h-4 w-4 items-center justify-center rounded-full border bg-[#050505] md:left-1/2 md:-ml-2 transition-all duration-300 ${
                        isActive 
                          ? "border-cyan shadow-[0_0_15px_rgba(39,245,255,0.85)] scale-110 -translate-y-[2px]" 
                          : "border-white/20 shadow-none scale-100"
                      }`}
                    >
                      <div className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${isActive ? "bg-cyan" : "bg-white/20"}`} />
                    </div>

                    {/* Content Panel (aligned to side) */}
                    <div className="w-full pl-12 md:w-[46%] md:pl-0">
                      <div 
                        onMouseEnter={() => setHoveredIdx(index)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        className={`rounded-xl border p-6 backdrop-blur-xl transition-all duration-300 bg-white/[0.02] ${
                          isActive 
                            ? "border-cyan/30 shadow-[0_15px_30px_rgba(0,0,0,0.6)] -translate-y-1" 
                            : "border-white/10 shadow-none"
                        } ${
                          isEven ? "md:text-right" : "md:text-left"
                        }`}
                      >
                        <div className={`flex items-center gap-2 mb-2 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}>
                          <Calendar size={13} className="text-cyan/80" />
                          <span className="text-xs font-semibold text-cyan/80 font-mono">{item.date}</span>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                            item.type === "experience" 
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                              : "bg-cyan/10 text-cyan border border-cyan/20"
                          }`}>
                            {item.type === "experience" ? <Briefcase size={10} /> : <GraduationCap size={10} />}
                            {item.type}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                        <p className="mt-1 text-sm text-white/50">{item.subtitle}</p>

                        {/* Bullets */}
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className={`mt-4 space-y-2 text-xs leading-relaxed text-white/60 ${
                            isEven ? "md:inline-block md:text-right" : "md:text-left"
                          }`}>
                            {item.bullets.map((bullet, idx) => (
                              <li key={idx} className={`flex gap-2 items-start ${
                                isEven ? "md:justify-end md:text-right" : "justify-start text-left"
                              }`}>
                                {!isEven && <ChevronRight size={12} className="text-cyan mt-0.5 shrink-0" />}
                                <span>{bullet}</span>
                                {isEven && <ChevronRight size={12} className="text-cyan mt-0.5 shrink-0 rotate-180" />}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Tag badges */}
                        {item.tags && (
                          <div className={`mt-5 flex flex-wrap gap-1.5 ${
                            isEven ? "md:justify-end" : "md:justify-start"
                          }`}>
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded border border-white/5 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-white/70"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Spacer for desktop layout alignment */}
                    <div className="hidden md:block md:w-[8%]" />
                    <div className="hidden md:block md:w-[46%]" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
