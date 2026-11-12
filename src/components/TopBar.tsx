import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWantsVideo } from '../hooks/useWantsVideo';
import { setSoundOn, useSound } from '../lib/playback';

const links = [
  { label: 'Work', to: '/#work' },
  { label: 'Method', to: '/#method' },
];

/* Sound for hover playback in the reel (desktop pointers only) */
function SoundToggle() {
  const { soundOn } = useSound();
  return (
    <button
      type="button"
      onClick={() => setSoundOn(!soundOn)}
      aria-pressed={soundOn}
      aria-label={soundOn ? 'Sound on. Click to mute film previews' : 'Sound off. Click to hear film previews'}
      className="slate flex items-center gap-2 text-bone-dim hover:text-bone transition-colors duration-300"
    >
      <span aria-hidden="true" className="flex items-end gap-[2px] h-3">
        {[0.5, 1, 0.7, 0.85].map((h, i) => (
          <span
            key={i}
            className={`w-[2px] bg-current origin-bottom ${soundOn ? 'animate-[eq_1.1s_ease-in-out_infinite]' : ''}`}
            style={{ height: soundOn ? `${h * 100}%` : '25%', animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
      Sound {soundOn ? 'on' : 'off'}
    </button>
  );
}

/**
 * Minimal top bar inside the frame. The wordmark stays hidden while the
 * hero title card is on screen, then docks in once you scroll past it.
 * On film pages it is always docked.
 */
export function TopBar() {
  const { pathname } = useLocation();
  const wantsVideo = useWantsVideo();
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
          {wantsVideo && <SoundToggle />}
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="slate text-bone-dim hover:text-bone transition-colors duration-300 hidden sm:inline"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/#contact"
            className="slate text-bone border border-seal/70 px-3 md:px-4 py-2 hover:bg-seal hover:text-ink transition-colors duration-300"
          >
            Start a film
          </Link>
        </div>
      </nav>
    </header>
  );
}
