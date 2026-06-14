import { useEffect, useRef } from 'react';

/**
 * Scroll reveal that is safe without JavaScript: elements are visible by
 * default; the hidden pre-reveal state only applies under
 * `@media (scripting: enabled)` in CSS. The observer adds `.revealed`,
 * the transition is a dissolve, not physics.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          io.disconnect();
        }
      },
      { rootMargin: '-40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
