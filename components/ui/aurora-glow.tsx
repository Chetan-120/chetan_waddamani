"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

export function AuroraGlow() {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      
      if (w < 768 || isTouch) {
        setDevice("mobile");
      } else if (w < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (device === "mobile") {
    return (
      <div className="aurora-container opacity-[0.05] pointer-events-none">
        <div 
          className="aurora-layer" 
          style={{ 
            "--aurora-duration": "60s",
            filter: "blur(25px)",
            willChange: "transform"
          } as CSSProperties} 
        />
      </div>
    );
  }

  if (device === "tablet") {
    return (
      <div className="aurora-container opacity-[0.15] pointer-events-none">
        <div 
          className="aurora-layer" 
          style={{ 
            "--aurora-duration": "45s",
            filter: "blur(50px)",
            willChange: "transform"
          } as CSSProperties} 
        />
      </div>
    );
  }

  return (
    <div className="aurora-container opacity-[0.45] pointer-events-none">
      <div 
        className="aurora-layer" 
        style={{ 
          "--aurora-duration": "22s",
          filter: "blur(80px)",
          willChange: "transform"
        } as CSSProperties} 
      />
    </div>
  );
}

