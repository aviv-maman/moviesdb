"use client";

import { Children, type ReactNode, useEffect, useId, useRef, useState } from "react";

export default function ScrollCarousel({ children, label }: { children: ReactNode; label: string }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const trackId = useId();
  const slides = Children.toArray(children);
  const slideCount = slides.length;
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function updateControls() {
      if (!track) return;
      setCanGoBack(track.scrollLeft > 1);
      setCanGoForward(slideCount > 0 && track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
    }
    updateControls();
    track.addEventListener("scroll", updateControls, { passive: true });
    const observer = new ResizeObserver(updateControls);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", updateControls);
      observer.disconnect();
    };
  }, [slideCount]);

  function move(direction: number) {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * (track.clientWidth + 16) });
  }

  return (
    <section aria-label={label} aria-roledescription="carousel" className="min-w-0">
      <div className="mb-2 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Previous slide"
          aria-controls={trackId}
          disabled={!canGoBack}
          onClick={() => move(-1)}
          className="rounded-full border px-3 py-1 focus-visible:outline-2 disabled:opacity-40">
          <span aria-hidden="true">&larr;</span>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          aria-controls={trackId}
          disabled={!canGoForward}
          onClick={() => move(1)}
          className="rounded-full border px-3 py-1 focus-visible:outline-2 disabled:opacity-40">
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
      <ul
        ref={trackRef}
        id={trackId}
        aria-label={label}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: The scroll container must be keyboard accessible.
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 motion-reduce:scroll-auto focus-visible:outline-2"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}>
        {slides.map((slide, index) => (
          <li
            key={typeof slide === "object" && slide !== null && "key" in slide ? slide.key : index}
            className="min-w-0 shrink-0 basis-full snap-start min-[389px]:basis-[calc((100%-1rem)/2)] min-[641px]:basis-[calc((100%-2rem)/3)] min-[825px]:basis-[calc((100%-3rem)/4)] min-[1025px]:basis-[calc((100%-4rem)/5)] min-[1281px]:basis-[calc((100%-5rem)/6)]">
            {slide}
          </li>
        ))}
      </ul>
    </section>
  );
}
