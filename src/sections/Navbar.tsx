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
          className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 overflow-hidden shrink-0"
          aria-label="InkFrame Films — back to top"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="18" fill="#0d1117"/>
            {/* I — vertical */}
            <rect x="9.5" y="10" width="2.5" height="16" fill="#f0ece4"/>
            {/* I — top serif */}
            <rect x="7.8" y="10" width="5.9" height="1.6" fill="#f0ece4"/>
            {/* I — bottom serif */}
            <rect x="7.8" y="24.4" width="5.9" height="1.6" fill="#f0ece4"/>
            {/* F — vertical */}
            <rect x="15.5" y="10" width="2.4" height="16" fill="#f0ece4"/>
            {/* F — top serif */}
            <rect x="14" y="10" width="3.5" height="1.6" fill="#f0ece4"/>
            {/* F — bottom serif */}
            <rect x="14" y="24.4" width="3.5" height="1.6" fill="#f0ece4"/>
            {/* F — top horizontal bar */}
            <rect x="15.5" y="10" width="9" height="2.2" fill="#f0ece4"/>
            {/* F — middle horizontal bar */}
            <rect x="15.5" y="17" width="6.5" height="2" fill="#f0ece4"/>
          </svg>
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

      </div>
    </nav>
  );
}
