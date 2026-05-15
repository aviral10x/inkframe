import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

/**
 * FloatingCTA
 * - Hidden while hero is in view
 * - Appears as a circular pill in the bottom-right after hero scrolls away
 * - Disappears when the contact section enters the viewport
 */
export function FloatingCTA() {
  const { scrollToSection } = useSmoothScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const contact = document.getElementById('contact');

    if (!hero || !contact) return;

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        // Show once hero is no longer in view
        if (!entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    const contactObs = new IntersectionObserver(
      ([entry]) => {
        // Hide when contact section is visible
        if (entry.isIntersecting) {
          setVisible(false);
        }
      },
      { threshold: 0.15 }
    );

    heroObs.observe(hero);
    contactObs.observe(contact);

    return () => {
      heroObs.disconnect();
      contactObs.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="floating-cta"
          onClick={() => scrollToSection('contact')}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 z-40 group"
          aria-label="Get in touch"
        >
          {/* Outer glow ring on hover */}
          <span className="absolute inset-[-3px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Circle body */}
          <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-surface)] border border-[var(--color-stroke)] backdrop-blur-md shadow-lg shadow-black/40">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="text-[var(--color-text-primary)] group-hover:rotate-12 transition-transform duration-300"
            >
              <path
                d="M3 15L15 3M15 3H6M15 3V12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
