"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GlowDivider() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div className="w-full h-[1px] bg-white/[0.08] relative overflow-hidden select-none">
      <motion.div
        className={`absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-cyan/40 to-transparent ${
          isMobile ? "blur-[1px] opacity-40" : "blur-[3px] opacity-100"
        }`}
        initial={{ left: "-40%" }}
        whileInView={{ left: "140%" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
