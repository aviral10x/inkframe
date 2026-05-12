import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // mailto fallback — replace with your preferred form handler
    const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.project}\n\n${form.message}`);
    window.open(`mailto:aviral10x@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--ghost-border)',
    color: 'var(--text-pure)',
    padding: '1rem 0',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.3s ease',
    background: 'none',
  };

  return (
    <div style={{ paddingBottom: '120px', paddingTop: '100px' }}>
      <div className="container">
        <div className="contact-grid">

          {/* Left: heading + info */}
          <div>
            <AnimatedSection>
              <p className="metadata" style={{ color: 'var(--secondary-steel)', marginBottom: '1.5rem', letterSpacing: '0.2em' }}>
                LET'S WORK
              </p>
              <h1 className="display-lg" style={{ maxWidth: '9ch' }}>OPEN A DIALOGUE</h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p style={{ fontSize: '1.1rem', color: 'rgba(232,228,220,0.55)', lineHeight: 1.8, marginTop: '2.5rem', maxWidth: '420px' }}>
                Available for select commercial, automotive, and narrative projects. I work with a small number of clients at a time — if the work is right, let's talk.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <p className="metadata" style={{ color: 'var(--primary-amber)', fontSize: '0.7rem', marginBottom: '0.5rem' }}>RESPONSE TIME</p>
                  <p style={{ color: 'rgba(232,228,220,0.6)', fontSize: '0.95rem' }}>Within 48 hours</p>
                </div>
                <div>
                  <p className="metadata" style={{ color: 'var(--primary-amber)', fontSize: '0.7rem', marginBottom: '0.5rem' }}>BASED IN</p>
                  <p style={{ color: 'rgba(232,228,220,0.6)', fontSize: '0.95rem' }}>India · Available worldwide</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <p className="metadata" style={{ color: 'var(--secondary-steel)', fontSize: '0.7rem', marginBottom: '0.5rem' }}>ELSEWHERE</p>
                {[
                  { label: 'X / TWITTER', href: 'https://x.com/aviral10x', handle: '@aviral10x' },
                  { label: 'INSTAGRAM', href: 'https://www.instagram.com/aviral10x', handle: '@aviral10x' },
                  { label: 'LINKEDIN', href: 'https://in.linkedin.com/in/aviral10x', handle: 'aviral10x' },
                ].map(({ label, href, handle }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0',
                      borderBottom: '1px solid var(--ghost-border)', textDecoration: 'none', transition: 'all 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget.querySelector('.cl') as HTMLElement).style.color = 'var(--primary-amber)'}
                    onMouseLeave={e => (e.currentTarget.querySelector('.cl') as HTMLElement).style.color = 'rgba(232,228,220,0.45)'}>
                    <span className="cl metadata" style={{ color: 'rgba(232,228,220,0.45)', transition: 'color 0.2s ease' }}>{label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--primary-amber)', opacity: 0.6 }}>{handle} ↗</span>
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right: form */}
          <AnimatedSection delay={0.3}>
            {sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '1.5rem', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', border: '1px solid var(--primary-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>✓</div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>MESSAGE SENT</h2>
                <p style={{ color: 'rgba(232,228,220,0.5)', maxWidth: '280px', lineHeight: 1.7 }}>Your mail client should have opened. I'll be in touch within 48 hours.</p>
                <button onClick={() => setSent(false)} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--primary-amber)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em', marginTop: '1rem', opacity: 0.7 }}>
                  SEND ANOTHER ↺
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div className="form-row">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="metadata" htmlFor="name" style={{ fontSize: '0.7rem', color: 'rgba(232,228,220,0.4)' }}>NAME</label>
                    <input id="name" type="text" required placeholder="Your name" value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderBottomColor = 'var(--primary-amber)'}
                      onBlur={e => e.currentTarget.style.borderBottomColor = 'var(--ghost-border)'} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="metadata" htmlFor="email" style={{ fontSize: '0.7rem', color: 'rgba(232,228,220,0.4)' }}>EMAIL</label>
                    <input id="email" type="email" required placeholder="your@email.com" value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => e.currentTarget.style.borderBottomColor = 'var(--primary-amber)'}
                      onBlur={e => e.currentTarget.style.borderBottomColor = 'var(--ghost-border)'} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label className="metadata" htmlFor="project" style={{ fontSize: '0.7rem', color: 'rgba(232,228,220,0.4)' }}>PROJECT TYPE</label>
                  <select id="project" value={form.project} onChange={e => setForm(p => ({ ...p, project: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => e.currentTarget.style.borderBottomColor = 'var(--primary-amber)'}
                    onBlur={e => e.currentTarget.style.borderBottomColor = 'var(--ghost-border)'}>
                    <option value="" style={{ background: '#0e0e10' }}>Select a project type</option>
                    <option value="Commercial" style={{ background: '#0e0e10' }}>Commercial Direction</option>
                    <option value="Automotive" style={{ background: '#0e0e10' }}>Automotive Content</option>
                    <option value="Generative" style={{ background: '#0e0e10' }}>Generative Film</option>
                    <option value="Narrative" style={{ background: '#0e0e10' }}>Narrative Short Film</option>
                    <option value="Other" style={{ background: '#0e0e10' }}>Other</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label className="metadata" htmlFor="message" style={{ fontSize: '0.7rem', color: 'rgba(232,228,220,0.4)' }}>MESSAGE</label>
                  <textarea id="message" rows={5} required placeholder="Tell me about the project..."
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => e.currentTarget.style.borderBottomColor = 'var(--primary-amber)'}
                    onBlur={e => e.currentTarget.style.borderBottomColor = 'var(--ghost-border)'} />
                </div>

                <button type="submit"
                  style={{ alignSelf: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
                    letterSpacing: '0.12em', color: 'var(--bg-true-black)', background: 'var(--primary-amber)',
                    border: '1px solid var(--primary-amber)', padding: '0.9rem 2.5rem', cursor: 'pointer',
                    transition: 'all 0.3s ease', marginTop: '0.5rem' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--primary-amber)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--primary-amber)'; (e.currentTarget as HTMLElement).style.color = 'var(--bg-true-black)'; }}>
                  SEND TRANSMISSION ↗
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
