import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChannelIcon } from './Channels';
import { channels } from '../lib/channels';

/**
 * A quiet way to reach the studio from anywhere: appears once the hero is
 * behind you, steps aside while the contact section is on screen, and only
 * exists when at least one direct channel is configured.
 */
export function FloatingContact() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const list = channels();

  useEffect(() => {
    const update = () => {
      const contact = document.getElementById('contact');
      const contactInView = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
      const pastHero = pathname !== '/' || window.scrollY > window.innerHeight * 0.8;
      setVisible(pastHero && !contactInView);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!list.length) return null;
  const shown = visible || open;

  return (
    <div
      className="fixed z-50 right-6 bottom-6 md:right-10 md:bottom-10 flex flex-col items-end gap-2 transition-[opacity,transform] duration-500"
      style={{ opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(12px)', pointerEvents: shown ? 'auto' : 'none' }}
    >
      {open && (
        <div id="floating-contact" className="bg-ink-raised border border-hairline p-2 min-w-[220px] shadow-[0_20px_60px_rgb(0_0_0/0.5)]">
          {list.map((c) => (
            <a
              key={c.id}
              href={c.href}
              target={c.id === 'email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-bone hover:bg-ink hover:text-seal transition-colors"
            >
              <ChannelIcon id={c.id} />
              {c.label}
            </a>
          ))}
          <Link
            to="/#contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-bone-dim hover:bg-ink hover:text-bone border-t border-hairline mt-1"
          >
            <span className="w-4 text-center" aria-hidden="true">→</span>
            Send a brief
          </Link>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="floating-contact"
        className="slate flex items-center gap-2.5 bg-bone text-ink px-4 py-3 hover:bg-seal transition-colors duration-300 shadow-[0_10px_40px_rgb(0_0_0/0.45)]"
      >
        <ChannelIcon id={list[0].id} />
        {open ? 'Close' : 'Message us'}
      </button>
    </div>
  );
}
