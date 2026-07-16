"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, AnimatePresence, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Mail,
  Menu,
  Send,
  X,
  Sparkles,
  Github,
  Linkedin,
  Instagram
} from "lucide-react";
import {
  navItems,
  roles,
  skillGroups,
  certifications,
  socials
} from "@/lib/content";

// Import custom upgraded modules
import { Magnetic } from "./ui/magnetic";
import { TimelineJourney } from "./ui/timeline-journey";
import { ExperienceSection } from "./ui/experience-section";
import { CaseStudies } from "./ui/case-study";
import { CreativeGallery } from "./ui/creative-gallery";
import { AuroraGlow } from "./ui/aurora-glow";
import { AnimatedGrid } from "./ui/animated-grid";
import { HeroAtmosphere } from "./ui/hero-atmosphere";
import { GlowDivider } from "./ui/glow-divider";
import { VelocityMarquee } from "./ui/velocity-marquee";
import { PremiumPortrait } from "./ui/premium-portrait";
import { BackToTopOrb } from "./ui/back-to-top-orb";
import { LeadershipImpact } from "./ui/leadership-impact";

gsap.registerPlugin(ScrollTrigger);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

function Section({ id, className, children }: { id: string; className?: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={fadeUp}
    >
      {children}
    </motion.section>
  );
}

function HeadingReveal({ eyebrow, title }: { eyebrow: string; title: string }) {
  const words = title.split(" ");
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16 select-none">
      <motion.p
        className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan"
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.28em" }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {eyebrow}
      </motion.p>
      <h2 className="overflow-hidden flex flex-wrap justify-center text-3xl font-semibold tracking-normal text-white md:text-5xl">
        {words.map((word, idx) => (
          <span key={idx} className="relative overflow-hidden inline-block mr-[0.25em] last:mr-0 pb-1">
            <motion.span
              className="inline-block animate-gradient-text"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.05
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
}

function useRotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 1900);

    return () => window.clearInterval(timer);
  }, []);

  return roles[index];
}

function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1250);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink"
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full border border-cyan/20" />
        <motion.div
          className="absolute inset-2 rounded-full border border-transparent border-t-cyan"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.15, ease: "linear" }}
        />
        <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-white">
          CW
        </div>
      </div>
    </motion.div>
  );
}

function ParticleField() {
  const [count, setCount] = useState(32);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      if (w < 768 || isTouch) {
        setCount(6);
      } else if (w < 1024) {
        setCount(12);
      } else {
        setCount(32);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className="particle"
          style={
            {
              "--x": `${(index * 37) % 100}%`,
              "--y": `${(index * 19) % 100}%`,
              "--delay": `${(index % 9) * 0.45}s`,
              "--size": `${index % 4 === 0 ? 3 : 2}px`
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ["home", "about", "experience", "journey", "projects", "skills", "leadership", "creative", "contact"];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] bg-ink/55 backdrop-blur-sm md:backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] overflow-hidden">
      {/* Glass Reflection sheet highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none z-0" />
      
      {/* Subtle border light sweep (cycles every 18 seconds) */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.2px] bg-gradient-to-r from-transparent via-cyan/40 to-transparent translate-x-[-100%] animate-border-sweep pointer-events-none z-10" />

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8 relative z-10">
        <Magnetic>
          <a href="#home" className="flex items-center gap-3 font-semibold group select-none">
            <span className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm md:backdrop-blur-md text-sm font-bold tracking-[-0.02em] text-white transition-all duration-300 group-hover:scale-1.03 group-hover:border-cyan/30 group-hover:text-cyan group-hover:shadow-[0_0_15px_rgba(39,245,255,0.25)]">
              CW
            </span>
            <span className="hidden text-sm text-white/80 group-hover:text-white sm:block transition duration-300">
              Chetan Waddamani
            </span>
          </a>
        </Magnetic>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const lowercased = item.toLowerCase();
            const isActive = activeSection === lowercased ||
              (lowercased === "projects" && (activeSection === "spotlight" || activeSection === "projects")) ||
              (lowercased === "creative" && activeSection === "creative");

            return (
              <Magnetic key={item}>
                <a
                  href={`#${lowercased}`}
                  className={`relative text-sm transition py-1 px-2 font-medium transition-colors duration-300 ${isActive ? "text-cyan" : "text-white/[0.58] hover:text-white"
                    }`}
                >
                  {item}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-cyan"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </Magnetic>
            );
          })}
        </div>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded border border-white/[0.12] bg-white/[0.08] md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-white/[0.08] bg-ink/95 px-5 py-4 md:hidden">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-3 text-sm text-white/70"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}



const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};

const heroItemFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const heroGlowFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

function Hero() {
  const role = useRotatingRole();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 22 };
  const glowX = useSpring(useTransform(mouseX, [-400, 400], [-20, 20]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-400, 400], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const xVal = clientX - width / 2;
    const yVal = clientY - height / 2;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-hidden border-b border-white/10"
    >
      <Image
        src="/hero-ai-atmosphere.png"
        alt=""
        fill
        priority
        className="object-cover opacity-35 pointer-events-none"
        sizes="100vw"
      />

      {/* Ambient backgrounds linked to mouse movement */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(47,124,255,0.12),transparent_40%),linear-gradient(180deg,rgba(5,5,5,0.2),#050505_95%)] pointer-events-none"
      />
      <div className="absolute inset-0 bg-grid-lines bg-[size:72px_72px] opacity-[0.06] pointer-events-none" />

      {/* Floating Blobs (with breathing scale/opacity effects) */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="ambient-glow-1 absolute left-1/4 top-1/4 h-80 w-80 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="ambient-glow-2 absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full pointer-events-none"
      />

      <ParticleField />
      <HeroAtmosphere />

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-12 pt-20 sm:pt-28 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pb-16"
      >
        <div className="max-w-5xl">
          <motion.div
            variants={heroItemFadeUp}
            className="mb-3 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan"
          >
            <Sparkles size={12} className="animate-pulse" /> AI Builder & Creator
          </motion.div>
          <motion.h1
            variants={heroItemFadeUp}
            className="max-w-6xl text-5xl font-extrabold leading-[0.9] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
          >
            CHETAN
            <span className="block animate-gradient-text font-sans">WADDAMANI</span>
          </motion.h1>
          <motion.div
            variants={heroItemFadeUp}
            className="mt-4 sm:mt-7 h-12 overflow-hidden text-2xl font-bold tracking-tight text-cyan md:text-4xl"
          >
            <span className="block">
              {role}
            </span>
          </motion.div>
          <motion.p
            variants={heroItemFadeUp}
            className="mt-4 sm:mt-6 max-w-2xl text-base leading-8 text-white/[0.68] md:text-lg"
          >
            Building practical web applications, exploring AI solutions, and
            creating digital experiences with a focus on problem-solving,
            creativity, and continuous learning.
          </motion.p>

          <motion.div
            variants={heroItemFadeUp}
            className="mt-6 sm:mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <Magnetic>
              <a className="primary-button" href="#projects">
                Explore Projects <ArrowDown size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="secondary-button" href="#contact">
                Contact Engine <Mail size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="secondary-button" href="/Chetan CV.pdf" download>
                Download Credentials <Download size={16} />
              </a>
            </Magnetic>
          </motion.div>

          {/* Social media connections directly in Hero */}
          <motion.div
            variants={heroItemFadeUp}
            className="mt-6 sm:mt-8 flex gap-4 items-center"
          >
            <Magnetic>
              <a
                href="https://github.com/Chetan-120"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition duration-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="https://www.linkedin.com/in/chetan-waddamani/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-[#0077B5] hover:border-[#0077B5]/40 hover:shadow-[0_0_15px_rgba(0,119,181,0.35)] transition duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </Magnetic>


            <Magnetic>
              <a
                href="mailto:waddamanic@gmail.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-cyan hover:border-cyan/40 hover:shadow-[0_0_15px_rgba(39,245,255,0.35)] transition duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <PremiumPortrait />
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" className="section bg-black border-b border-white/10">
      <HeadingReveal eyebrow="About Me" title="Combining Code, AI & Leadership" />
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 px-5 md:px-8">
        {[
          "I build technology that simplifies complex problems. Currently pursuing my Master of Computer Applications (MCA), I bridge core database engines, responsive UI layers, and generative intelligence workflows.",
          "Leadership runs deep in my projects. As a former General Secretary, I balance technical project sprints with team coordination, public outreach, and high-impact digital campaign design.",
          "I look at technology as a creative canvas. From video production and brand marketing edits to building zero-latency SOS emergency routing APIs, I focus on systems that deliver measurable human outcomes."
        ].map((copy, index) => (
          <motion.p
            key={copy}
            className="glass-panel text-sm leading-7 text-white/70 p-6 flex flex-col justify-between hover:border-cyan/20 transition duration-300"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
          >
            {copy}
          </motion.p>
        ))}
      </div>
    </Section>
  );
}



function Skills() {
  return (
    <Section id="skills" className="section bg-black/40 border-b border-white/10">
      <HeadingReveal
        eyebrow="Competencies"
        title="Technical Stack & Skill Set"
      />
      <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3 md:px-8">
        {skillGroups.map((group, idx) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.title}
              className="glass-panel hover:border-cyan/20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: idx * 0.06 }}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="icon-tile">
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span className="skill-pill bg-white/[0.03] border-white/5 text-xs text-white/80" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="mx-auto mt-12 max-w-7xl px-5 md:px-8">
        <div className="cert-strip flex flex-wrap gap-2 justify-center bg-white/[0.02]">
          {certifications.map((cert) => (
            <span key={cert} className="rounded border border-violet/20 bg-violet/10 px-3 py-1 text-xs text-white/75">
              {cert}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Leadership() {
  return (
    <Section id="leadership" className="section bg-black border-b border-white/10">
      <LeadershipImpact />
    </Section>
  );
}

function VisionContact() {
  return (
    <Section id="contact" className="section relative overflow-hidden bg-black/90 py-24">
      <div className="mx-auto max-w-3xl px-5 text-center space-y-8 select-text">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="space-y-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan font-mono">
            Get In Touch
          </p>
          <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl font-sans uppercase">
            Let&apos;s Create Impact Through Technology
          </h2>
          <p className="text-sm leading-relaxed text-white/70 max-w-2xl mx-auto font-sans">
            Whether you are looking for a collaborative developer, AI enthusiast, or creative contributor, I am open to opportunities involving web development, AI solutions, and digital experiences.
          </p>
        </motion.div>

        {/* Dynamic centered glassmorphic action buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-wrap gap-4 justify-center pt-6"
        >
          <Magnetic>
            <a
              href="mailto:waddamanic@gmail.com"
              className="primary-button text-xs py-3 px-6 font-mono"
            >
              Email Me
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="https://www.linkedin.com/in/chetan-waddamani/"
              target="_blank"
              rel="noreferrer"
              className="secondary-button text-xs py-3 px-6 font-mono"
            >
              LinkedIn
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="https://github.com/Chetan-120"
              target="_blank"
              rel="noreferrer"
              className="secondary-button text-xs py-3 px-6 font-mono"
            >
              GitHub
            </a>
          </Magnetic>

          <Magnetic>
            <a
              href="/Chetan CV.pdf"
              download
              className="secondary-button text-xs py-3 px-6 font-mono border-violet/30 hover:border-violet/50"
            >
              Resume
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </Section>
  );
}

export function PortfolioExperience() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const isMobileOrTouch = window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0;
    
    let lenis: Lenis | null = null;
    let tickerCb: ((time: number) => void) | null = null;

    if (!isMobileOrTouch) {
      // Initialize Lenis smooth scroll
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false
      });

      lenis.on("scroll", ScrollTrigger.update);

      tickerCb = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.hash.startsWith("#") && anchor.getAttribute("target") !== "_blank") {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash) as HTMLElement;
        if (targetElement) {
          if (lenis) {
            lenis.scrollTo(targetElement, { offset: -20, duration: 1.4 });
          } else {
            const yOffset = -20;
            const rect = targetElement.getBoundingClientRect();
            const y = rect.top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Float targets
    gsap.utils.toArray<HTMLElement>("[data-float]").forEach((element, index) => {
      gsap.to(element, {
        y: index % 2 === 0 ? -18 : 18,
        duration: 2.6 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      if (tickerCb) {
        gsap.ticker.remove(tickerCb);
      }
      if (lenis) {
        lenis.destroy();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Loader />
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header />
      <main className="bg-ink relative min-h-screen overflow-hidden">
        <AuroraGlow />
        <AnimatedGrid />

        {/* Subtle page-wide drifting ambient background glows */}
        <div className="pointer-events-none absolute -left-40 top-[10%] h-[500px] w-[500px] rounded-full bg-cyan/5 blur-[120px] mix-blend-screen" />
        <div className="pointer-events-none absolute -right-40 top-[30%] h-[600px] w-[600px] rounded-full bg-violet/5 blur-[130px] mix-blend-screen" />
        <div className="pointer-events-none absolute left-[20%] top-[60%] h-[550px] w-[550px] rounded-full bg-rose-500/5 blur-[120px] mix-blend-screen" />
        <div className="pointer-events-none absolute right-[10%] top-[80%] h-[500px] w-[500px] rounded-full bg-cyan/5 blur-[120px] mix-blend-screen" />

        <Hero />
        <GlowDivider />
        <About />
        <GlowDivider />
        <ExperienceSection />
        <VelocityMarquee text="AI INTEGRATIONS • FULL STACK SYSTEMS • CREATIVE BRANDING • PRODUCT LEADERSHIP • ZERO LATENCY PIPELINES •" />
        <TimelineJourney />
        <GlowDivider />
        <CaseStudies />
        <VelocityMarquee text="REACT • NEXT.JS • TYPESCRIPT • PYTHON • GENERATIVE AI • SQL CONDUITS • UI ENGINE •" />
        <Skills />
        <GlowDivider />
        <Leadership />
        <GlowDivider />
        <CreativeGallery />
        <GlowDivider />
        <VisionContact />
      </main>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-white/[0.46] font-mono bg-black select-none">
        © 2026 Chetan Waddamani. Built for recruitment impact.
      </footer>
      <BackToTopOrb />
    </>
  );
}
