import { useEffect, useState } from 'react';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollToSection } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work', target: 'work' },
    { label: 'Services', target: 'journal' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div 
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-[var(--color-surface)] px-2 py-2 transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        {/* Logo — circular IF monogram */}
        <button 
          onClick={() => scrollToSection('hero')}
          className="w-9 h-9 rounded-full bg-[var(--color-bg)] border border-[var(--color-stroke)] flex items-center justify-center transition-transform duration-300 hover:scale-110 overflow-hidden shrink-0"
        >
          <span className="font-display italic text-[13px] text-[var(--color-text-primary)] leading-none tracking-tight">IF</span>
        </button>

        <div className="w-px h-5 bg-[var(--color-stroke)] mx-3 hidden md:block" />

        {/* Links */}
        <div className="flex gap-1 mx-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.target)}
              className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[var(--color-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-stroke)]/50 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-[var(--color-stroke)] mx-3 hidden md:block" />

        {/* CTA */}
        <button 
          onClick={() => scrollToSection('contact')}
          className="relative group text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[var(--color-text-primary)] overflow-hidden"
        >
          <span className="absolute inset-[-2px] accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <div className="absolute inset-0 bg-[var(--color-surface)] rounded-full backdrop-blur-md -z-10 transition-opacity group-hover:opacity-90" />
          <span className="flex items-center gap-1">
            Get in touch <span>↗</span>
          </span>
        </button>
      </div>
    </nav>
  );
}
