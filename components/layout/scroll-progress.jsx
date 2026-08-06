"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin accent progress bar fixed to the top of the viewport, tracking overall
 * page scroll. Uses a spring for a smooth, weighty feel.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
