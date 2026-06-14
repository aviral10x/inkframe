import { useEffect, useState } from 'react';
import { contactEmail, filmStyles, socials } from '../data/site';
import { useReveal } from '../hooks/useReveal';

const COOLDOWN_KEY = 'inkframe_form_last_submit';
const COOLDOWN_SECS = 300;

/**
 * Act 5, the Closing Frame. Cut to near-black, one line, one action.
 * The footer rolls like end credits.
 */
export function Close() {
  const lineRef = useReveal<HTMLDivElement>();
  const formRef = useReveal<HTMLDivElement>();
  const [form, setForm] = useState({ name: '', email: '', style: '', concept: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [cooldownLeft, setCooldownLeft] = useState(0);

  useEffect(() => {
    function remaining() {
      const last = localStorage.getItem(COOLDOWN_KEY);
      if (!last) return 0;
      const elapsed = Math.floor((Date.now() - parseInt(last, 10)) / 1000);
      return Math.max(0, COOLDOWN_SECS - elapsed);
    }
    const initial = remaining();
    if (initial > 0) {
      setSubmitted(true);
      setCooldownLeft(initial);
    }
    const tick = setInterval(() => {
      const rem = remaining();
      setCooldownLeft(rem);
      // Cooldown expired: allow another submission
      if (rem === 0) setSubmitted(false);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const data = new FormData();
      data.append('access_key', '5ef59b49-97e2-4d47-b503-5197e223d81a');
      data.append('subject', `InkFrame Inquiry ${form.style || 'General'}`);
      data.append('from_name', 'InkFrame Films Website');
      data.append('name', form.name);
      data.append('email', form.email);
      data.append('film_style', form.style || 'Not specified');
      data.append('message', form.concept || '(No details provided)');
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
        setCooldownLeft(COOLDOWN_SECS);
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

  return (
    <section id="contact" className="relative px-6 md:px-12 lg:px-20 pt-28 md:pt-44 pb-12">
      <div className="max-w-[1480px] mx-auto">
        {/* The closing line */}
        <div ref={lineRef} className="reveal mb-16 md:mb-24 text-center">
          <h2 className="font-display italic text-display-xl text-bone">Have a story?</h2>
          <p className="text-bone-dim text-base md:text-lg mt-5 max-w-md mx-auto leading-relaxed">
            Tell us what you are making. We respond with a concept route and a timeline.
          </p>
        </div>

        {/* One action */}
        <div ref={formRef} className="reveal max-w-2xl mx-auto border border-hairline bg-ink-raised/60 p-7 md:p-12">
          {submitted ? (
            <div className="text-center py-10" role="status">
              <p className="font-display italic text-title text-bone mb-4">Message sent</p>
              <p className="text-bone-dim text-base leading-relaxed max-w-md mx-auto">
                We received your inquiry and will get back within 24 hours.
              </p>
              {cooldownLeft > 0 && (
                <p className="slate text-bone-dim mt-6">
                  Next submission in{' '}
                  <span className="text-seal tabular-nums">
                    {String(Math.floor(cooldownLeft / 60)).padStart(2, '0')}:
                    {String(cooldownLeft % 60).padStart(2, '0')}
                  </span>
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Honeypot: bots fill it, Web3Forms drops the submission */}
              <input type="text" name="botcheck" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="cf-name" className="slate text-bone-dim block">Name</label>
                  <input
                    id="cf-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="w-full bg-ink border border-hairline px-4 py-3.5 text-bone text-sm placeholder:text-bone-dim/50 focus:outline-none focus:border-bone/40 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cf-email" className="slate text-bone-dim block">Email</label>
                  <input
                    id="cf-email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@brand.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="w-full bg-ink border border-hairline px-4 py-3.5 text-bone text-sm placeholder:text-bone-dim/50 focus:outline-none focus:border-bone/40 transition-colors"
                  />
                </div>
              </div>

              <fieldset className="space-y-3">
                <legend className="slate text-bone-dim">Film style</legend>
                <div className="flex flex-wrap gap-2">
                  {filmStyles.map((style) => (
                    <button
                      key={style}
                      type="button"
                      aria-pressed={form.style === style}
                      onClick={() => update('style', form.style === style ? '' : style)}
                      className={`text-xs tracking-wide px-4 py-2 border transition-colors duration-300 ${
                        form.style === style
                          ? 'bg-bone text-ink border-bone'
                          : 'bg-transparent text-bone-dim border-hairline hover:border-bone/40 hover:text-bone'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="space-y-2">
                <label htmlFor="cf-concept" className="slate text-bone-dim block">The story</label>
                <textarea
                  id="cf-concept"
                  name="message"
                  rows={4}
                  placeholder="What is the film about? References, mood, timeline."
                  value={form.concept}
                  onChange={(e) => update('concept', e.target.value)}
                  className="w-full bg-ink border border-hairline px-4 py-3.5 text-bone text-sm placeholder:text-bone-dim/50 focus:outline-none focus:border-bone/40 transition-colors resize-none"
                />
              </div>

              {error && <p className="text-seal text-sm" aria-live="polite">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="group w-full md:w-auto bg-bone text-ink text-sm font-medium px-10 py-4 hover:bg-seal transition-colors duration-300 disabled:opacity-60 disabled:pointer-events-none"
              >
                {submitting ? 'Sending...' : 'Start a film'}
              </button>
            </form>
          )}
        </div>

        {/* End credits */}
        <footer className="mt-28 md:mt-40 pb-6 text-center">
          <p className="slate text-bone-dim mb-10">Credits</p>
          <div className="space-y-6 max-w-sm mx-auto">
            <div>
              <p className="slate text-bone-dim">A film studio for brands</p>
              <p className="font-display italic text-title text-bone mt-1">InkFrame Films</p>
            </div>
            <div>
              <p className="slate text-bone-dim">Contact</p>
              <a
                href={`mailto:${contactEmail}`}
                className="text-bone text-sm hover:text-seal transition-colors duration-300 mt-1 inline-block"
              >
                {contactEmail}
              </a>
            </div>
            <div>
              <p className="slate text-bone-dim">Elsewhere</p>
              <div className="flex items-center justify-center gap-6 mt-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="slate text-bone hover:text-seal transition-colors duration-300"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="pt-8">
              <p className="slate text-bone-dim">
                Fin · © {new Date().getFullYear()} InkFrame Films
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
