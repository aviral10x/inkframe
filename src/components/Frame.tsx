import { useEffect, useRef } from 'react';

/**
 * The signature element: a persistent 1px frame around the viewport.
 * Every screen is a framed shot. A small seal-red tick (the playhead)
 * travels down the right edge with scroll progress.
 */
const TICK = 28;

export function Frame() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      const tick = tickRef.current;
      if (!track || !tick) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      tick.style.transform = `translateY(${progress * (track.clientHeight - TICK)}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-3 md:inset-5 z-[60]">
      {/* The frame line */}
      <div className="absolute inset-0 border border-hairline" />

      {/* Corner ticks, slightly brighter than the line */}
      {(['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r',
         'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'] as const).map((pos) => (
        <span key={pos} className={`absolute w-3 h-3 border-bone/40 ${pos}`} />
      ))}

      {/* Playhead on the right edge */}
      <div ref={trackRef} className="absolute top-0 right-0 h-full">
        <span ref={tickRef} className="absolute -right-px w-px bg-seal" style={{ height: TICK }} />
      </div>
    </div>
  );
}
