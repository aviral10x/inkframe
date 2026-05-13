import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { contactEmail, enquiryGroups, outreachCopy } from '../content/inkframe';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', brand: '', project: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`InkFrame Films inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nBrand: ${form.brand}\nProject type: ${form.project}\n\n${form.message}`,
    );
    window.open(`mailto:${contactEmail}?subject=${subject}&body=${body}`);
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
  };

  return (
    <div className="container page-section">
      <div className="contact-grid">
        <div>
          <AnimatedSection>
            <p className="metadata eyebrow">START A BRIEF</p>
            <h1 className="display-lg">LET'S BUILD A FILM SYSTEM</h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="intro-copy contact-intro">
              Tell us what you are launching, selling, pitching, or testing. InkFrame Films is built for fast concept
              routes, cinematic AI commercials, and posting-ready social video.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.28}>
            <section className="enquiry-panel" aria-labelledby="enquiries-heading">
              <p className="metadata">ENQUIRIES</p>
              <h2 id="enquiries-heading">Who can reach out</h2>
              <p>
                For campaign films, AI product commercials, social video systems, pitch reels, and concept-led brand
                visuals, email us directly at{' '}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </p>
              <ul>
                {enquiryGroups.map((group) => (
                  <li key={group}>{group}</li>
                ))}
              </ul>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="outreach-card">
              <p className="metadata">OUTREACH COPY</p>
              <pre>{outreachCopy}</pre>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.25}>
          <div className="contact-action-stack">
            <div className="direct-email-card">
              <p className="metadata">ENQUIRIES EMAIL</p>
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </div>

            {sent ? (
              <div className="sent-state">
                <h2>Message prepared</h2>
                <p>Your mail client should have opened with the brief details. We will shape the next step from there.</p>
                <button type="button" onClick={() => setSent(false)}>Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="brief-form">
              <div className="form-row">
                <label>
                  <span className="metadata">Name</span>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    style={inputStyle}
                  />
                </label>
                <label>
                  <span className="metadata">Email</span>
                  <input
                    type="email"
                    required
                    placeholder="you@brand.com"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    style={inputStyle}
                  />
                </label>
              </div>

              <label>
                <span className="metadata">Brand / Team</span>
                <input
                  type="text"
                  required
                  placeholder="Brand, agency, or creator name"
                  value={form.brand}
                  onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))}
                  style={inputStyle}
                />
              </label>

              <label>
                <span className="metadata">Project Type</span>
                <select
                  required
                  value={form.project}
                  onChange={(e) => setForm((p) => ({ ...p, project: e.target.value }))}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="" style={{ background: '#0e0e10' }}>Select a project type</option>
                  <option value="AI product commercial" style={{ background: '#0e0e10' }}>AI product commercial</option>
                  <option value="Fashion / beauty campaign" style={{ background: '#0e0e10' }}>Fashion / beauty campaign</option>
                  <option value="Automotive concept spot" style={{ background: '#0e0e10' }}>Automotive concept spot</option>
                  <option value="Social content system" style={{ background: '#0e0e10' }}>Social content system</option>
                  <option value="Pitch / proof-of-concept reel" style={{ background: '#0e0e10' }}>Pitch / proof-of-concept reel</option>
                </select>
              </label>

              <label>
                <span className="metadata">Message</span>
                <textarea
                  rows={6}
                  required
                  placeholder="Tell us the campaign goal, timeline, references, and where the film needs to live."
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </label>

              <button type="submit" className="btn-primary">Prepare email</button>
              </form>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
