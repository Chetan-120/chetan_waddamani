"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2, ChevronRight, Mic, Users, Github, ExternalLink, AlertCircle, Lightbulb, Trophy } from "lucide-react";
import { Magnetic } from "./magnetic";

// ────────────────────────────────────────────────────────
// MOCKUPS
// ────────────────────────────────────────────────────────

function UnifiedDashboard() {
  return (
    <div className="flex flex-col h-full bg-[#050505] text-left p-4 font-sans select-none justify-between text-white">
      {/* Top Status Bar */}
      <div className="w-full flex justify-between text-[9px] text-white/30 font-mono pt-1">
        <span>09:41</span>
        <div className="flex gap-1.5 items-center">
          <span>5G</span>
          <div className="w-5 h-2.5 border border-white/20 rounded-sm p-0.5 flex items-center">
            <div className="w-full h-full bg-cyan rounded-2xs" />
          </div>
        </div>
      </div>

      {/* Header section: Welcome text + status */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <span className="block text-[8px] uppercase tracking-wider font-semibold font-mono text-cyan/70">Safety Link Active</span>
          <h4 className="text-sm font-extrabold text-white leading-tight mt-0.5 font-sans">Welcome, Chetan</h4>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[7px] font-mono text-emerald-400">
          <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          SECURED
        </div>
      </div>

      {/* SOS Trigger Widget */}
      <div className="bg-gradient-to-b from-rose-500/5 to-transparent border border-rose-500/10 rounded-xl p-3 flex flex-col items-center justify-center my-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05),transparent_60%)] pointer-events-none" />
        
        {/* Pulsing Button Rings */}
        <div className="relative flex items-center justify-center h-20 w-20">
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0, 0.25] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-rose-600/15 blur-sm"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute h-16 w-16 rounded-full bg-rose-600/10 border border-rose-500/20"
          />
          <div className="relative h-12 w-12 rounded-full border border-rose-500/40 bg-rose-600 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <span className="text-white text-xs font-black font-mono tracking-wider">SOS</span>
          </div>
        </div>
        
        <span className="text-[7px] text-rose-400 font-mono font-bold uppercase tracking-widest mt-2">Emergency Pipeline Standby</span>
      </div>

      {/* App Cards Section */}
      <div className="flex-1 space-y-2 flex flex-col justify-end pb-2">
        {/* Safety Status card */}
        <div className="rounded-lg border border-white/5 bg-white/[0.01] p-2 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="block text-[7px] font-bold text-white/40 font-mono uppercase">Geo-Tracking</span>
            <span className="block text-[8px] font-semibold text-white/80 font-mono">12.9716° N, 77.5946° E</span>
          </div>
          <span className="text-[7px] font-mono text-cyan font-bold bg-cyan/10 px-1.5 py-0.5 rounded border border-cyan/25 animate-pulse">ACTIVE</span>
        </div>

        {/* AI Assistant card */}
        <div className="rounded-lg border border-white/5 bg-white/[0.01] p-2 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="block text-[7px] font-bold text-white/40 font-mono uppercase">AI Voice Companion</span>
            <span className="block text-[8px] font-semibold text-white/80 font-sans">Distress check active</span>
          </div>
          <div className="flex gap-1 items-center h-3">
            {[0.4, 0.8, 0.5, 0.3].map((h, i) => (
              <motion.span
                key={i}
                className="w-0.5 bg-violet rounded-full"
                animate={{ height: ["3px", "8px", "3px"] }}
                transition={{ duration: 0.6 + i * 0.1, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                style={{ height: `${h * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Trusted Contacts card */}
        <div className="rounded-lg border border-white/5 bg-white/[0.01] p-2 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="block text-[7px] font-bold text-white/40 font-mono uppercase">Trusted Circles</span>
            <span className="block text-[8px] font-semibold text-white/80 font-sans">3 Active Peers Connected</span>
          </div>
          <div className="flex -space-x-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-3.5 w-3.5 rounded-full border border-black bg-white/10 flex items-center justify-center text-[5px] text-white/60 font-mono">
                P{i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NoteSyncerDashboard() {
  return (
    <div className="flex flex-col h-full bg-[#050505] text-left p-4 font-sans select-none justify-between text-white">
      {/* Browser tab bar */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[8px] text-white/30 font-mono">
        <span className="text-cyan">notesyncer.app/dashboard</span>
        <span className="text-[7px]">SECURE SESSION</span>
      </div>
      
      {/* Main folder content */}
      <div className="flex-1 my-3 space-y-2 overflow-hidden flex flex-col justify-center">
        <div className="text-[9px] font-bold text-white/80 uppercase font-mono tracking-wider">Indexed Documents</div>
        
        {/* Document list */}
        <div className="space-y-1">
          {[
            { name: "DBMS_Unit3_Notes.pdf", size: "2.4 MB", type: "PDF" },
            { name: "Software_Engineering_Syllabus.docx", size: "1.2 MB", type: "DOCX" },
            { name: "Java_Programming_Lab_Manual.pdf", size: "4.8 MB", type: "PDF" }
          ].map((doc, idx) => (
            <div key={idx} className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded p-1.5 text-[8px] font-mono">
              <span className="text-white/70 truncate w-32">{doc.name}</span>
              <span className="text-cyan">{doc.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="border-t border-white/5 pt-2 flex justify-between items-center text-[7px] font-mono">
        <span className="text-emerald-400">● 128-bit Encrypted</span>
        <span className="bg-cyan/15 border border-cyan/25 text-cyan px-1 rounded">UPLOAD FILE</span>
      </div>
    </div>
  );
}

function BrainBattleDashboard() {
  return (
    <div className="flex flex-col h-full bg-[#050505] text-left p-4 font-sans select-none justify-between text-white">
      {/* Browser tab bar */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[8px] text-white/30 font-mono">
        <span className="text-cyan">brainbattle.app/play</span>
        <span className="text-[7px] text-violet">ROUND 3/5</span>
      </div>

      {/* Leaderboard content */}
      <div className="flex-1 my-3 space-y-2 overflow-hidden flex flex-col justify-center">
        <div className="text-[9px] font-bold text-white/80 uppercase font-mono tracking-wider text-center">QUIZ LEADERBOARD</div>
        
        {/* Score list */}
        <div className="space-y-1">
          {[
            { rank: "1st", user: "Chetan (You)", score: "280 pts", color: "text-cyan" },
            { rank: "2nd", user: "Jane Doe", score: "240 pts", color: "text-white/70" },
            { rank: "3rd", user: "John Smith", score: "210 pts", color: "text-white/70" }
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded p-1.5 text-[8px] font-mono">
              <div className="flex gap-2">
                <span className="text-white/40">{item.rank}</span>
                <span className={item.color}>{item.user}</span>
              </div>
              <span className="font-bold text-white/80">{item.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="border-t border-white/5 pt-2 flex justify-between items-center text-[7px] font-mono">
        <span className="text-white/30">Next Question in 4s</span>
        <span className="bg-violet/25 border border-violet/30 text-violet px-1.5 py-0.5 rounded font-bold">PLAYING</span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// MOCKUP CAROUSEL / WRAPPER WITH TILT & FLOAT
// ────────────────────────────────────────────────────────

interface PreviewMockupProps {
  type: "phone" | "browser";
  children: React.ReactNode;
  prefersReducedMotion: boolean;
  device: "desktop" | "mobile";
}

function PreviewMockup({ type, children, prefersReducedMotion, device }: PreviewMockupProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (device === "mobile" || prefersReducedMotion) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    const rotX = (y / (height / 2)) * -6;
    const rotY = (x / (width / 2)) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const isPhone = type === "phone";

  return (
    <div className="flex justify-center items-center relative py-6 w-full">
      {/* Backing Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 bg-gradient-to-tr from-cyan/15 to-violet/15 blur-[40px] opacity-70 rounded-full pointer-events-none" />

      {/* Slow floating motion wrapper */}
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        className="relative"
      >
        {/* Interactive mouse tilt wrapper */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ 
            rotateX: prefersReducedMotion ? 0 : rotateX, 
            rotateY: prefersReducedMotion ? 0 : rotateY 
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          className="relative cursor-pointer"
        >
          {isPhone ? (
            /* Smartphone Mockup Frame */
            <div className="w-[260px] h-[520px] relative border-[8px] border-black bg-[#050505] rounded-[36px] shadow-2xl overflow-hidden flex flex-col pointer-events-none">
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#080808] border border-white/5 mr-4" />
                <div className="w-1 h-1 rounded-full bg-[#0c0c0c] border border-white/5" />
              </div>
              {/* Screen */}
              <div className="w-full h-full relative z-10 overflow-hidden">
                {children}
              </div>
              {/* Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-20" />
            </div>
          ) : (
            /* Browser Mockup Frame */
            <div className="w-[310px] h-[225px] relative border-[6px] border-black bg-[#050505] rounded-xl shadow-2xl overflow-hidden flex flex-col pointer-events-none">
              {/* Top controls */}
              <div className="w-full flex items-center justify-between bg-[#0b0b0b] px-3 py-1.5 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="w-16 h-2 bg-white/5 rounded-xs" />
              </div>
              {/* Screen */}
              <div className="w-full h-full relative z-10 overflow-hidden">
                {children}
              </div>
              {/* Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none z-20" />
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

import { projectsData, ProjectItem } from "@/lib/content";

const MOCKUP_MAP: Record<string, React.ReactNode> = {
  rakshika: <UnifiedDashboard />,
  notesyncer: <NoteSyncerDashboard />,
  "brain battle": <BrainBattleDashboard />
};

export function CaseStudies() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDevice(window.innerWidth < 1024 ? "mobile" : "desktop");
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

  return (
    <section id="projects" className="section relative overflow-hidden bg-black border-b border-white/10 py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-lines bg-[size:72px_72px] opacity-[0.02] pointer-events-none" />
      <div className="absolute left-1/3 top-1/4 h-80 w-80 rounded-full bg-cyan/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan font-mono">
            Selected Works
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl uppercase font-sans">
            Project Showcases
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">
            A unified overview of the problems, technical solutions, and concrete outcomes behind key software projects.
          </p>
        </div>

        <div className="space-y-16">
          {projectsData.map((project, idx) => {
            return (
              <div 
                key={project.title}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10 backdrop-blur-xl transition duration-500 hover:border-cyan/20 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(39,245,255,0.02)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column: Details */}
                  <div className="lg:col-span-7 space-y-6 select-text">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-cyan/70 uppercase tracking-widest">
                        Project 0{idx + 1} &mdash; {project.category}
                      </span>
                      <h3 className="text-3xl font-bold text-white tracking-tight mt-1">{project.title}</h3>
                      <p className="text-sm leading-relaxed text-white/60 mt-3">{project.description}</p>
                    </div>

                    {/* Problem / Solution fields */}
                    <div className="space-y-3 pt-4 border-t border-white/5 text-xs text-white/70">
                      <div className="flex gap-2.5 items-start">
                        <AlertCircle size={14} className="text-rose-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="block font-bold text-[9px] uppercase tracking-wider text-white/40 mb-0.5">Problem</span>
                          <p className="leading-relaxed">{project.problem}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2.5 items-start">
                        <CheckCircle2 size={14} className="text-cyan mt-0.5 shrink-0" />
                        <div>
                          <span className="block font-bold text-[9px] uppercase tracking-wider text-white/40 mb-0.5">Solution</span>
                          <p className="leading-relaxed">{project.solution}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tech pills & links */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span key={t} className="rounded border border-white/5 bg-white/[0.04] px-2.5 py-1 text-xs font-mono text-white/75">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <Magnetic>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 items-center justify-center gap-1.5 rounded border border-white/10 bg-white/5 px-4 text-xs font-semibold text-white/80 hover:bg-white/10 transition duration-300"
                          >
                            <Github size={13} /> GitHub
                          </a>
                        </Magnetic>

                        {project.liveUrl && (
                          <Magnetic>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-9 items-center justify-center gap-1.5 rounded border border-cyan/40 bg-cyan/10 px-4 text-xs font-semibold text-cyan hover:bg-cyan/20 transition duration-300"
                            >
                              <ExternalLink size={13} /> Live Demo
                            </a>
                          </Magnetic>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Premium Mockup Graphic */}
                  <div className="lg:col-span-5 flex justify-center items-center">
                    <PreviewMockup 
                      type={project.mockupType}
                      prefersReducedMotion={prefersReducedMotion}
                      device={device}
                    >
                      {MOCKUP_MAP[project.title.toLowerCase()] || null}
                    </PreviewMockup>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
