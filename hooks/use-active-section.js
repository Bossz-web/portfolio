"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which in-page section is currently in view, for nav highlighting.
 * Uses IntersectionObserver against the given section ids.
 *
 * @param {string[]} sectionIds
 * @returns {string} The id of the section nearest the top of the viewport.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry nearest the top that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger when a section's middle band crosses the viewport center.
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      },
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
