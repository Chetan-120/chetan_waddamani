"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { TiltCard } from "./tilt-card";

import { experiencesData } from "@/lib/content";

export function ExperienceSection() {
  return (
    <section id="experience" className="section relative overflow-hidden bg-black/60 border-b border-white/10 py-24">
      {/* Background Ambience */}
      <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-violet/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan font-mono">
            Work History
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl uppercase font-sans">
            Professional Experience
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">
            A history of practical internships and creative roles building software, exploring AI, and coordinating digital content.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {experiencesData.map((exp, idx) => (
            <TiltCard key={exp.role + exp.organization} className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                className="flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-xl transition hover:border-cyan/20"
              >
                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-cyan font-bold uppercase tracking-wider">
                      Role 0{idx + 1}
                    </span>
                    <div className="h-9 w-9 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/60">
                      <Briefcase size={15} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-tight">{exp.role}</h3>
                    <p className="text-xs font-semibold text-white/40 mt-1 uppercase tracking-wider font-mono">{exp.organization}</p>
                  </div>

                  <p className="text-xs leading-relaxed text-white/60 font-sans border-t border-white/5 pt-3">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 space-y-2 text-xs">
                  <span className="block font-bold text-[9px] uppercase tracking-wider text-white/40 font-mono">Key Learnings</span>
                  <ul className="space-y-1 text-white/70 font-sans leading-relaxed">
                    {exp.learnings.map((learn, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-cyan text-[10px] mt-0.5">•</span>
                        <span>{learn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
