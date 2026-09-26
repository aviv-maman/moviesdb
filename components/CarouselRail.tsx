"use client";

import type { FC, ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";

interface CarouselRailProps {
  label: string;
  children: ReactNode;
  wide?: boolean;
  inlineControls?: boolean;
}

const CarouselRail: FC<CarouselRailProps> = ({ label, children, wide = false, inlineControls = false }) => {
  const id = useId();
  const railRef = useRef<HTMLElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const update = () =>
      setEdges({ start: rail.scrollLeft < 2, end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2 });
    update();
    rail.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(rail);

    return () => {
      rail.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  function scroll(direction: number) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.8,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <div className="relative min-w-0">
      <div className={inlineControls ? "absolute right-0 -top-20 flex gap-2" : "mb-3 flex justify-end gap-2"}>
        {([-1, 1] as const).map((direction) => (
          <button
            key={direction}
            type="button"
            aria-label={`${direction === -1 ? "Previous" : "Next"} ${label}`}
            aria-controls={id}
            disabled={direction === -1 ? edges.start : edges.end}
            onClick={() => scroll(direction)}
            className="flex size-9 items-center justify-center rounded-lg border bg-surface transition-colors hover:bg-default focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-30">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-4">
              <path d={direction === -1 ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"} />
            </svg>
          </button>
        ))}
      </div>
      <section
        ref={railRef}
        id={id}
        aria-label={label}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need to focus and scroll the horizontal region.
        tabIndex={0}
        className={`carousel-rail grid snap-x snap-mandatory grid-flow-col gap-4 overflow-x-auto overscroll-x-contain pb-3 focus-visible:outline-2 focus-visible:outline-accent ${wide ? "auto-cols-[88%] sm:auto-cols-[calc((100%-1rem)/2)] lg:auto-cols-[calc((100%-2rem)/3)]" : "auto-cols-[44%] sm:auto-cols-[calc((100%-2rem)/3)] md:auto-cols-[calc((100%-3rem)/4)] lg:auto-cols-[calc((100%-5rem)/6)]"}`}>
        {children}
      </section>
    </div>
  );
};

export default CarouselRail;
