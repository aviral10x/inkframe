import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useHlsVideo } from '../hooks/useHlsVideo';

const filmStyles = [
  'Product Commercial',
  'Fashion Film',
  'Beauty Campaign',
  'Automotive Spot',
  'Luxury Brand World',
  'Social Content',
  'Concept / Mood Film',
  'Narrative Short',
  'Other',
];

/* ── Inline SVG social icons ── */
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22,7 12,13 2,7" />
    </svg>
  );
}

const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/aurakidzzz/', icon: InstagramIcon },
  { name: 'X', url: 'https://x.com/aviral10x', icon: XIcon },
  { name: 'YouTube', url: 'https://youtube.com/@inkframefilms', icon: YoutubeIcon },
  { name: 'Email', url: 'mailto:aviral10x@gmail.com', icon: MailIcon },
];

export function Contact() {
  const { videoRef } = useHlsVideo('https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8');
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    style: '',
    concept: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [cooldownSecsLeft, setCooldownSecsLeft] = useState(0);

  const COOLDOWN_KEY = 'inkframe_form_last_submit';
  const COOLDOWN_SECS = 300; // 5 minutes

  // Check cooldown on mount and tick every second
  useEffect(() => {
    function getRemainingCooldown() {
      const last = localStorage.getItem(COOLDOWN_KEY);
      if (!last) return 0;
      const elapsed = Math.floor((Date.now() - parseInt(last, 10)) / 1000);
      return Math.max(0, COOLDOWN_SECS - elapsed);
    }

    const remaining = getRemainingCooldown();
    if (remaining > 0) {
      setSubmitted(true);
      setCooldownSecsLeft(remaining);
    }

    const ticker = setInterval(() => {
      const rem = getRemainingCooldown();
      setCooldownSecsLeft(rem);
      if (rem === 0) {
        // Cooldown expired — let them resubmit
        setSubmitted(false);
      }
    }, 1000);

    return () => clearInterval(ticker);
  }, []);

  useEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('access_key', '5ef59b49-97e2-4d47-b503-5197e223d81a');
      formData.append('subject', `InkFrame Inquiry — ${form.style || 'General'}`);
      formData.append('from_name', 'InkFrame Films Website');
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('film_style', form.style || 'Not specified');
      formData.append('message', form.concept || '(No details provided)');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
        setCooldownSecsLeft(COOLDOWN_SECS);
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <section id="contact" className="relative bg-[var(--color-bg)] pt-16 md:pt-24 pb-8 overflow-hidden min-h-[100dvh] flex flex-col justify-between">

      {/* Flipped Background Video */}
      <div className="absolute inset-0 z-0 bg-[var(--color-bg)]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px]" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--color-bg)] to-transparent" />
      </div>

      <div className="relative z-10 w-full flex-1 flex flex-col">
        {/* Marquee Header */}
        <div className="w-full overflow-hidden whitespace-nowrap mb-12 md:mb-16">
          <div ref={marqueeRef} className="inline-block">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-6xl md:text-8xl lg:text-9xl font-display text-[var(--color-text-primary)]/20 mx-4 tracking-tighter">
                CINEMATIC AI VIDEO •
              </span>
            ))}
          </div>
        </div>

        {/* Form Container — boxed card */}
        <div className="flex-1 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-2xl rounded-3xl border border-[var(--color-stroke)] bg-[var(--color-bg)]/80 backdrop-blur-2xl p-8 md:p-12"
            style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)' }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-green-500/50 flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(34 197 94)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-3xl md:text-4xl text-[var(--color-text-primary)] font-display italic mb-4">
                    Message sent
                  </h3>
                  <p className="text-[var(--color-muted)] text-base mb-8 max-w-md mx-auto leading-relaxed">
                    We received your inquiry and will get back within 24 hours.
                  </p>

                  {cooldownSecsLeft > 0 ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-400/70 animate-pulse" />
                      <span className="text-xs text-[var(--color-muted)] uppercase tracking-[0.2em]">
                        Next submission in{' '}
                        <span className="tabular-nums text-amber-400">
                          {String(Math.floor(cooldownSecsLeft / 60)).padStart(2, '0')}:{String(cooldownSecsLeft % 60).padStart(2, '0')}
                        </span>
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', style: '', concept: '' }); setError(''); }}
                      className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text-primary)] transition-colors underline underline-offset-4"
                    >
                      Send another
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Honeypot — invisible to humans, bots fill it → Web3Forms drops the submission */}
                  <input type="text" name="botcheck" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />
                  {/* Form Header */}
                  <div className="mb-4">
                    <h3 className="text-3xl md:text-4xl text-[var(--color-text-primary)] tracking-tight mb-3">
                      Get in <span className="font-display italic">Touch</span>
                    </h3>
                    <p className="text-[var(--color-muted)] text-sm md:text-base leading-relaxed">
                      Tell us what you are building. We will respond with a concept route and timeline.
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-[0.2em] font-medium">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        className="w-full bg-white/5 border border-[var(--color-stroke)] rounded-xl px-4 py-3.5 text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-muted)]/60 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-[0.2em] font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@brand.com"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="w-full bg-white/5 border border-[var(--color-stroke)] rounded-xl px-4 py-3.5 text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-muted)]/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Film Style — pill selector */}
                  <div className="space-y-3">
                    <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-[0.2em] font-medium">
                      Film Style
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {filmStyles.map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => update('style', form.style === style ? '' : style)}
                          className={`text-xs tracking-wide px-4 py-2 rounded-full border transition-all duration-300 ${
                            form.style === style
                              ? 'bg-[var(--color-text-primary)] text-[var(--color-bg)] border-[var(--color-text-primary)]'
                              : 'bg-white/5 text-[var(--color-muted)] border-[var(--color-stroke)] hover:border-[var(--color-muted)]/60 hover:text-[var(--color-text-primary)]'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Concept Basics */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-[0.2em] font-medium">
                      Concept Basics
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="What is the film about? Any references, mood, or timeline?"
                      value={form.concept}
                      onChange={(e) => update('concept', e.target.value)}
                      className="w-full bg-white/5 border border-[var(--color-stroke)] rounded-xl px-4 py-3.5 text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:border-[var(--color-muted)]/60 transition-colors resize-none"
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group relative w-full md:w-auto rounded-full px-10 py-4 overflow-hidden transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
                  >
                    <span className="absolute inset-[-2px] accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-[var(--color-text-primary)] rounded-full transition-opacity" />
                    <span className="relative text-[var(--color-bg)] text-sm font-medium flex items-center justify-center gap-2">
                      {submitting ? 'Sending...' : 'Send Inquiry'} {!submitting && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                    </span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto mt-16 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[var(--color-stroke)]/50 pt-8">

        {/* Availability */}
        <div className="flex items-center gap-3 bg-[var(--color-surface)]/50 border border-[var(--color-stroke)] rounded-full px-4 py-2 backdrop-blur-md">
          <div className="relative w-2 h-2">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
            <div className="relative bg-green-500 w-2 h-2 rounded-full" />
          </div>
          <span className="text-xs text-[var(--color-text-primary)] uppercase tracking-widest font-medium">Accepting new projects</span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-1">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target={social.url.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={social.name}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text-primary)] hover:bg-white/5 transition-all duration-300"
            >
              <social.icon />
            </a>
          ))}
        </div>

        <div className="text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} InkFrame Films
        </div>
      </div>
    </section>
  );
}
