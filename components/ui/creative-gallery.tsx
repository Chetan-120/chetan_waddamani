"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Film, ImageIcon, Layers, Eye, X, BookOpen, Clock, Heart } from "lucide-react";
import { Magnetic } from "./magnetic";
import { TiltCard } from "./tilt-card";

import { creativeGalleryData, CreativeWorkItem } from "@/lib/content";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  },
  hover: {
    y: -6,
    borderColor: "rgba(39, 245, 255, 0.25)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.6), 0 0 20px -3px rgba(39, 245, 255, 0.04)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25 }
  }
};

export function CreativeGallery() {
  const [filter, setFilter] = useState<"all" | "video" | "design" | "campaign">("all");
  const [activeDetailItem, setActiveDetailItem] = useState<CreativeWorkItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredWorks = creativeGalleryData.filter(
    (work) => filter === "all" || work.type === filter
  );

  return (
    <section id="creative" className="section relative overflow-hidden bg-black/60 border-b border-white/10">
      {/* Glow decorations */}
      <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-violet/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
            Creative Portfolio
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Digital Craft & Content
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">
            A typography-focused showcase of video production, digital campaign marketing, and graphic designs.
          </p>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {(["all", "video", "design", "campaign"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  filter === type
                    ? "bg-cyan text-black border border-cyan"
                    : "bg-white/5 text-white/60 hover:text-white border border-white/10"
                }`}
              >
                {type === "all" ? "All Projects" : type === "video" ? "Video Editing" : type === "design" ? "Graphic Design" : "Campaigns"}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid of Glassmorphic Text Cards */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => {
              const Icon = work.type === "video" ? Film : work.type === "design" ? ImageIcon : Layers;
              
              return (
                <TiltCard key={work.title} className="w-full h-full">
                  <motion.article
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    exit="exit"
                    viewport={{ once: true, margin: isMobile ? "-40px" : "-60px" }}
                    className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:backdrop-blur-xl flex flex-col justify-between min-h-[260px] space-y-4 w-full h-full"
                  >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-cyan">
                      <Icon size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{work.category}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-cyan transition duration-300">
                      {work.title}
                    </h3>
                    
                    <p className="text-xs leading-relaxed text-white/60">
                      {work.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Tool badges */}
                    <div className="flex flex-wrap gap-1">
                      {work.tools.map((tool) => (
                        <span key={tool} className="rounded border border-white/5 bg-white/[0.03] px-2.5 py-0.5 text-[9px] font-mono text-white/50">
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* View Details Button */}
                    <div className="border-t border-white/5 pt-3">
                      <button
                        onClick={() => setActiveDetailItem(work)}
                        className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-cyan transition duration-300"
                      >
                        <Eye size={12} /> View Details
                      </button>
                    </div>
                  </div>
                  </motion.article>
                </TiltCard>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Expanded Details Modal (Glassmorphic Backdrop overlay) */}
      <AnimatePresence>
        {activeDetailItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveDetailItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-ink p-6 md:p-8 space-y-6 shadow-glow"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDetailItem(null)}
                className="absolute right-4 top-4 text-white/40 hover:text-white transition duration-300"
                aria-label="Close details"
              >
                <X size={18} />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan font-mono">
                  {activeDetailItem.category}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {activeDetailItem.title}
                </h3>
              </div>

              <div className="space-y-4 py-2 border-t border-b border-white/5">
                <div className="flex gap-2.5 items-start text-sm">
                  <BookOpen size={16} className="text-cyan mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 font-mono">Role / Responsibility</h4>
                    <p className="mt-0.5 text-white/80">{activeDetailItem.details.role}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start text-sm">
                  <Clock size={16} className="text-violet mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 font-mono">Project Timeline</h4>
                    <p className="mt-0.5 text-white/80">{activeDetailItem.details.timeline}</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start text-sm">
                  <Heart size={16} className="text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 font-mono">Key Deliverables</h4>
                    <p className="mt-0.5 text-white/80">{activeDetailItem.details.deliverables}</p>
                  </div>
                </div>
              </div>

              {/* Tools summary */}
              <div className="flex flex-wrap gap-1.5">
                {activeDetailItem.tools.map((tool) => (
                  <span key={tool} className="rounded border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-mono text-white/70">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
