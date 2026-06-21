"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { TiltCard } from "./tilt-card";

export function LeadershipImpact() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <div className="mb-12 text-center md:mb-16">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
          Governance & Action
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Leadership & Impact
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/60">
          Representing student interests, coordinating council governance, and bridging communication gaps between administration and student bodies.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <TiltCard className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10 backdrop-blur-xl transition-all duration-300 hover:border-white/20 shadow-[0_0_20px_rgba(39,245,255,0.1)]"
            >
              <div className="space-y-6">
                {/* Icon & Role Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan font-bold uppercase tracking-wider">
                    Featured Council Role
                  </span>
                  <div className="h-12 w-12 rounded-full flex items-center justify-center border border-cyan/20 bg-cyan/5 text-cyan">
                    <Users size={20} />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Former General Secretary</h3>
                  <p className="text-sm font-semibold text-cyan/90 mt-1">IBMR College Student Council</p>
                </div>

                {/* Core Focus Categories */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                  {["Communication", "Coordination", "Teamwork", "Leadership", "Problem Solving"].map((tag) => (
                    <span 
                      key={tag} 
                      className="rounded border border-white/5 bg-white/[0.03] py-1 text-center text-[10px] font-mono text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description segments */}
                <div className="space-y-4 pt-4 border-t border-white/5 text-sm text-white/70 leading-relaxed font-sans">
                  <div>
                    <span className="block font-bold text-[10px] uppercase tracking-wider text-white/40 mb-1">Scope of Work</span>
                    <p>
                      Student council governance required acting as the primary student representative, managing inter-departmental communication, and acting as a coordinate link between students and college administration.
                    </p>
                  </div>
                  <div>
                    <span className="block font-bold text-[10px] uppercase tracking-wider text-white/40 mb-1">Coordination & Teamwork</span>
                    <p>
                      Supervised volunteer council operations, organized campus assemblies, gathered student feedback on curriculum timelines, and worked directly with administrative deans to resolve student welfare issues.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key outcomes */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <span className="block font-bold text-[10px] uppercase tracking-wider text-white/40 mb-1">Governance Impact</span>
                <p className="text-xs font-semibold text-white/90 leading-relaxed">
                  Established an open communication pipeline that resolved scheduling gaps and streamlined academic student council feedback channels.
                </p>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
}
