import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Work', to: '/#work' },
  { label: 'Method', to: '/#method' },
  { label: 'Contact', to: '/#contact' },
];

/**
 * Minimal top bar inside the frame. The wordmark stays hidden while the
 * hero title card is on screen, then docks in once you scroll past it.
 * On film pages it is always docked.
 */
export function TopBar() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const docked = !onHome || scrolledPastHero;

  useEffect(() => {
    const onScroll = () => setScrolledPastHero(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="enter-late fixed top-3 md:top-5 inset-x-3 md:inset-x-5 z-50">
      <nav
        aria-label="Main"
        className={`flex items-center justify-between px-4 md:px-6 h-12 border-b transition-colors duration-500 ${
          docked ? 'border-hairline bg-ink/55 backdrop-blur-sm' : 'border-transparent bg-transparent'
        }`}
      >
        <Link
          to="/"
          className={`slate font-medium text-bone transition-opacity duration-700 ${docked ? 'opacity-100' : 'opacity-0'}`}
          tabIndex={docked ? 0 : -1}
        >
          InkFrame Films
        </Link>
        <div className="flex items-center gap-5 md:gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="slate text-bone-dim hover:text-bone transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
