"use client";

import { motion } from "framer-motion";

/**
 * Scroll-triggered reveal wrapper. Fades and lifts content into view once,
 * when it enters the viewport. Framer Motion automatically honors the user's
 * reduced-motion preference, so no extra guarding is needed here.
 *
 * @type {import('framer-motion').Variants}
 */
const variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/**
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {number} [props.delay=0] Stagger delay in seconds.
 * @param {string} [props.className]
 * @param {"div" | "li" | "span" | "section"} [props.as="div"] Render as a different element for correct semantics.
 */
export function Reveal({ children, delay = 0, className, as = "div" }) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Container that staggers the reveal of its children. Pair with <RevealItem />.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 * @param {number} [props.stagger=0.08]
 */
export function RevealGroup({ children, className, stagger = 0.08 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** @type {import('framer-motion').Variants} */
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 */
export function RevealItem({ children, className }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
