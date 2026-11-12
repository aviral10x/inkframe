import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChannelButtons, ChannelIcon } from '../components/Channels';
import { filmBySlug } from '../data/films';
import { budgetRanges, inquiryKinds, replyChannels, socials, timelines } from '../data/site';
import { channels } from '../lib/channels';
import { useReveal } from '../hooks/useReveal';
import { useHydrated } from '../hooks/useHydrated';
import { briefText, emptyInquiry, sendInquiry, type Inquiry } from '../lib/inquiry';

const COOLDOWN_KEY = 'inkframe_form_last_submit';
const COOLDOWN_SECS = 120;
const STEPS = ['The film', 'Scope', 'You'] as const;

/* Event-time clock (kept out of render) */
const now = () => Date.now();

const field =
  'w-full bg-ink border border-hairline px-4 py-3.5 text-bone text-sm placeholder:text-bone-dim/50 focus:outline-none focus:border-bone/50 transition-colors';

function Chips({
  options,
  value,
  onPick,
  label,
}: {
  options: readonly string[];
  value: string;
  onPick: (v: string) => void;
  label: string;
}) {
  return (
    <fieldset>
      <legend className="slate text-bone-dim mb-3">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onPick(value === o ? '' : o)}
            className={`text-sm px-4 py-2.5 border transition-colors duration-300 ${
              value === o
                ? 'bg-bone text-ink border-bone'
                : 'text-bone-dim border-hairline hover:border-bone/40 hover:text-bone'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Act 5, the Closing Frame. Two ways in: message the studio directly on
 * the channel you already use, or send a three-step brief. The brief
 * starts with one click, so starting costs nothing.
 */
export function Close() {
  const lineRef = useReveal<HTMLDivElement>();
  const formRef = useReveal<HTMLDivElement>();
  const { search } = useLocation();
  const hydrated = useHydrated();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Inquiry>(emptyInquiry);
  const [botcheck, setBotcheck] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const mountedAt = useRef(0);
  const stepHeading = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    mountedAt.current = now();
  }, []);

  // Arriving from a film page: "something like this one" (after hydration,
  // because the prerendered page has no query string)
  const reference = hydrated ? (filmBySlug(new URLSearchParams(search).get('ref') ?? '')?.title ?? '') : '';
  const inquiry: Inquiry = { ...form, reference };

  const update = <K extends keyof Inquiry>(k: K, v: Inquiry[K]) => setForm((f) => ({ ...f, [k]: v }));

  function go(to: number) {
    setStep(to);
    setError('');
    requestAnimationFrame(() => stepHeading.current?.focus());
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('Add your name and email so we can reply.');
      return;
    }
    // Double-submit guard: a repeat within the cooldown is treated as sent
    const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
    if (now() - last < COOLDOWN_SECS * 1000) {
      setState('sent');
      return;
    }
    setState('sending');
    setError('');
    const res = await sendInquiry(inquiry, { botcheck, elapsedMs: now() - mountedAt.current });
    if (res.ok) {
      localStorage.setItem(COOLDOWN_KEY, String(now()));
      setState('sent');
    } else {
      setError(res.message);
      setState('failed');
    }
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(briefText(inquiry));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard blocked: the text is still visible to select */
    }
  }

  const direct = channels();
  const needsHandle = form.replyVia !== 'Email';

  return (
    <section id="contact" className="relative px-6 md:px-12 lg:px-20 pt-28 md:pt-44 pb-12">
      <div className="max-w-[1480px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,640px)] gap-14 lg:gap-20 items-start">
          {/* The pitch, and the direct lines */}
          <div ref={lineRef} className="reveal lg:sticky lg:top-28">
            <p className="slate text-seal">Start a film</p>
            <h2 className="font-display italic text-display-xl text-bone mt-4">Have a story?</h2>
            <p className="text-bone-dim text-base md:text-lg mt-5 max-w-md leading-relaxed">
              Tell us what you are making. We reply within 24 hours with a concept route, a timeline, and a quote.
            </p>

            {direct.length > 0 && (
              <div className="mt-10">
                <p className="slate text-bone-dim mb-4">Or message us directly</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                  {direct.map((c) => (
                    <a
                      key={c.id}
                      href={c.href}
                      target={c.id === 'email' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 border border-hairline px-4 py-3.5 hover:border-seal transition-colors duration-300"
                    >
                      <ChannelIcon id={c.id} className="w-5 h-5 text-bone group-hover:text-seal transition-colors" />
                      <span>
                        <span className="block text-bone text-sm">{c.label}</span>
                        <span className="block text-bone-dim text-xs mt-0.5 truncate max-w-[180px]">{c.hint}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <ol className="mt-10 space-y-3 max-w-md">
              {[
                'A reply within 24 hours, from the people who make the films',
                'A concept route, timeline, and quote before anything is made',
                'Vertical, wide, and cut-down versions for wherever it runs',
              ].map((line, i) => (
                <li key={line} className="flex gap-4 text-bone-dim text-sm leading-relaxed">
                  <span className="slate text-seal pt-0.5">0{i + 1}</span>
                  {line}
                </li>
              ))}
            </ol>
          </div>

          {/* The brief */}
          <div ref={formRef} className="reveal border border-hairline bg-ink-raised/60 p-7 md:p-10">
            {state === 'sent' ? (
              <div className="text-center py-8" role="status">
                <p className="font-display italic text-title text-bone mb-4">Brief received</p>
                <p className="text-bone-dim text-base leading-relaxed max-w-md mx-auto">
                  Thank you. We will be back within 24 hours with a first route.
                </p>
                {direct.length > 0 && (
                  <div className="mt-8">
                    <p className="slate text-bone-dim mb-4">Want to talk sooner?</p>
                    <ChannelButtons className="justify-center" message={briefText(inquiry)} />
                  </div>
                )}
              </div>
            ) : state === 'failed' ? (
              <div className="py-4" role="alert">
                <p className="font-display italic text-title text-bone">Let's get this to us another way</p>
                <p className="text-bone-dim text-sm leading-relaxed mt-3">
                  {error} Your brief is ready below. Send it in one tap, or copy it.
                </p>
                <ChannelButtons tone="solid" className="mt-6" message={briefText(inquiry)} subject={`Film inquiry from ${form.name}`} />
                <pre className="mt-6 whitespace-pre-wrap text-bone-dim text-xs leading-relaxed border border-hairline p-4 max-h-56 overflow-auto font-[inherit]">
                  {briefText(inquiry)}
                </pre>
                <div className="flex flex-wrap gap-3 mt-5">
                  <button type="button" onClick={copyBrief} className="slate px-4 py-2.5 border border-hairline text-bone hover:border-bone/40">
                    {copied ? 'Copied' : 'Copy the brief'}
                  </button>
                  <button type="button" onClick={() => setState('idle')} className="slate px-4 py-2.5 text-bone-dim hover:text-bone">
                    Try the form again
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                {/* Honeypot: hidden from people, irresistible to bots */}
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label>
                    Leave this empty
                    <input type="text" tabIndex={-1} autoComplete="off" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} />
                  </label>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mb-8">
                  <p ref={stepHeading} tabIndex={-1} className="slate text-bone focus:outline-none">
                    Step {step + 1} of 3 · {STEPS[step]}
                  </p>
                  {reference && <p className="slate text-seal truncate ml-4">Like: {reference}</p>}
                </div>
                <div className="grid grid-cols-3 gap-1.5 mb-9" aria-hidden="true">
                  {STEPS.map((s, i) => (
                    <span key={s} className={`h-px ${i <= step ? 'bg-seal' : 'bg-hairline'} transition-colors duration-500`} />
                  ))}
                </div>

                {step === 0 && (
                  <div>
                    <Chips
                      label="What are we making?"
                      options={inquiryKinds}
                      value={form.kind}
                      onPick={(v) => {
                        update('kind', v);
                        if (v) setTimeout(() => go(1), 180);
                      }}
                    />
                    <p className="text-bone-dim/70 text-xs mt-6">Pick one to continue. Takes under a minute.</p>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-8">
                    <Chips label="Budget" options={budgetRanges} value={form.budget} onPick={(v) => update('budget', v)} />
                    <Chips label="When do you need it?" options={timelines} value={form.timeline} onPick={(v) => update('timeline', v)} />
                    <div className="flex items-center justify-between pt-2">
                      <button type="button" onClick={() => go(0)} className="slate text-bone-dim hover:text-bone">
                        Back
                      </button>
                      <button type="button" onClick={() => go(2)} className="bg-bone text-ink text-sm font-medium px-8 py-3.5 hover:bg-seal transition-colors duration-300">
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="cf-name" className="slate text-bone-dim block">Name *</label>
                        <input id="cf-name" required autoComplete="name" placeholder="Your name" value={form.name} onChange={(e) => update('name', e.target.value)} className={field} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="cf-email" className="slate text-bone-dim block">Work email *</label>
                        <input id="cf-email" type="email" required autoComplete="email" placeholder="you@brand.com" value={form.email} onChange={(e) => update('email', e.target.value)} className={field} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="cf-company" className="slate text-bone-dim block">Brand or company</label>
                      <input id="cf-company" autoComplete="organization" placeholder="Who is the film for?" value={form.company} onChange={(e) => update('company', e.target.value)} className={field} />
                    </div>

                    <fieldset>
                      <legend className="slate text-bone-dim mb-3">Best way to reach you</legend>
                      <div className="flex flex-wrap gap-2">
                        {replyChannels.map((c) => (
                          <button
                            key={c}
                            type="button"
                            aria-pressed={form.replyVia === c}
                            onClick={() => update('replyVia', c)}
                            className={`text-sm px-4 py-2.5 border transition-colors duration-300 ${
                              form.replyVia === c ? 'bg-bone text-ink border-bone' : 'text-bone-dim border-hairline hover:border-bone/40 hover:text-bone'
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                      {needsHandle && (
                        <input
                          aria-label={form.replyVia === 'Telegram' ? 'Telegram username' : 'Phone number with country code'}
                          autoComplete={form.replyVia === 'Telegram' ? 'off' : 'tel'}
                          inputMode={form.replyVia === 'Telegram' ? 'text' : 'tel'}
                          placeholder={form.replyVia === 'Telegram' ? '@username' : '+91 98765 43210'}
                          value={form.handle}
                          onChange={(e) => update('handle', e.target.value)}
                          className={`${field} mt-3`}
                        />
                      )}
                    </fieldset>

                    <div className="space-y-2">
                      <label htmlFor="cf-brief" className="slate text-bone-dim block">The story</label>
                      <textarea
                        id="cf-brief"
                        rows={4}
                        placeholder="What is it about? Product, audience, references, where it will run."
                        value={form.brief}
                        onChange={(e) => update('brief', e.target.value)}
                        className={`${field} resize-none`}
                      />
                    </div>

                    <p className="text-seal text-sm min-h-5" aria-live="polite">{error}</p>

                    <div className="flex items-center justify-between gap-4">
                      <button type="button" onClick={() => go(1)} className="slate text-bone-dim hover:text-bone">
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={state === 'sending'}
                        className="bg-bone text-ink text-sm font-medium px-10 py-4 hover:bg-seal transition-colors duration-300 disabled:opacity-60 disabled:pointer-events-none"
                      >
                        {state === 'sending' ? 'Sending...' : 'Send the brief'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* End credits */}
        <footer className="mt-28 md:mt-40 pb-6 text-center">
          <p className="slate text-bone-dim mb-10">Credits</p>
          <div className="space-y-6 max-w-md mx-auto">
            <div>
              <p className="slate text-bone-dim">A film studio for brands</p>
              <p className="font-display italic text-title text-bone mt-1">InkFrame Films</p>
            </div>
            {direct.length > 0 && (
              <div>
                <p className="slate text-bone-dim">Direct</p>
                <div className="flex items-center justify-center gap-6 mt-2">
                  {direct.map((c) => (
                    <a key={c.id} href={c.href} target={c.id === 'email' ? undefined : '_blank'} rel="noopener noreferrer" className="slate text-bone hover:text-seal transition-colors duration-300">
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="slate text-bone-dim">Elsewhere</p>
              <div className="flex items-center justify-center gap-6 mt-2">
                {socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="slate text-bone hover:text-seal transition-colors duration-300">
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="pt-8">
              <p className="slate text-bone-dim">Fin · © {new Date().getFullYear()} InkFrame Films</p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
