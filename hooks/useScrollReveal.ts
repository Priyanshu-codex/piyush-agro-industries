'use client';

import { useEffect, useRef } from 'react';

/**
 * Adds `data-visible="true"` to the element when it enters the viewport.
 * Pair with the `.scroll-reveal` CSS class defined in globals.css.
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-visible', 'true');
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  // Cast so callers can attach to any HTML element ref
  return ref as React.RefObject<HTMLDivElement>;
}
