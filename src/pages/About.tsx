import AnimatedSection from '../components/AnimatedSection';

const skills = [
  { category: 'DIRECTION', items: ['Commercial', 'Narrative Short Film', 'Brand Films', 'Automotive'] },
  { category: 'VISUAL', items: ['Cinematography', 'Color Grading', 'Generative AI', 'VFX Supervision'] },
  { category: 'TOOLS', items: ['DaVinci Resolve', 'Runway Gen-3', 'Midjourney', 'Unreal Engine 5'] },
  { category: 'BRANDS', items: ['Chanel', 'Ferrari', 'Mercedes-AMG', 'Independent'] },
];

const timeline = [
  { year: '2025', event: 'Chanel Beauty & Fragrance dual campaign — tabletop + CGI fantasy world' },
  { year: '2025', event: 'Ferrari heritage automotive series — British Racing Green editorial' },
  { year: '2024', event: 'Mercedes-AMG GT performance film — void studio, Solaris Yellow' },
  { year: '2024', event: 'THEFT — narrative short film, pawn shop noir, festival circuit' },
];

export default function About() {
  return (
    <div style={{ paddingBottom: '120px', paddingTop: '100px' }}>

      {/* Hero */}
      <div className="container">
        <AnimatedSection>
          <p className="metadata" style={{ color: 'var(--secondary-steel)', marginBottom: '1.5rem', letterSpacing: '0.2em' }}>
            THE DIRECTOR
          </p>
          <h1 className="display-lg" style={{ maxWidth: '14ch' }}>AVIRAL</h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="about-grid">
            {/* Left: portrait placeholder / showreel frame */}
            <div>
              <div style={{
                height: '580px', background: 'var(--surface-container-low)',
                border: '1px solid var(--ghost-border)', overflow: 'hidden',
                position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {/* gradient portrait stand-in */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(160deg, #0e0a1a 0%, #06080e 50%, #0a0606 100%)',
                }} />
                <div style={{
                  position: 'relative', zIndex: 1, textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'
                }}>
                  <div style={{
                    width: '80px', height: '80px', border: '1px solid var(--primary-amber)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--primary-amber)', fontWeight: 700
                  }}>A</div>
                  <p className="metadata" style={{ color: 'var(--primary-amber)', opacity: 0.6 }}>AVIRAL</p>
                </div>
                {/* corner accents */}
                {[
                  { top: '1rem', left: '1rem', borderTop: '2px solid', borderLeft: '2px solid', width: '20px', height: '20px' },
                  { top: '1rem', right: '1rem', borderTop: '2px solid', borderRight: '2px solid', width: '20px', height: '20px' },
                  { bottom: '1rem', left: '1rem', borderBottom: '2px solid', borderLeft: '2px solid', width: '20px', height: '20px' },
                  { bottom: '1rem', right: '1rem', borderBottom: '2px solid', borderRight: '2px solid', width: '20px', height: '20px' },
                ].map((s, i) => (
                  <div key={i} style={{ position: 'absolute', borderColor: 'var(--primary-amber)', opacity: 0.5, ...s }} />
                ))}
              </div>

              {/* Social under portrait */}
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'X / TWITTER', href: 'https://x.com/aviral10x', handle: '@aviral10x' },
                  { label: 'INSTAGRAM', href: 'https://www.instagram.com/aviral10x', handle: '@aviral10x' },
                  { label: 'LINKEDIN', href: 'https://in.linkedin.com/in/aviral10x', handle: 'aviral10x' },
                ].map(({ label, href, handle }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '0.6rem 0', borderBottom: '1px solid var(--ghost-border)', textDecoration: 'none',
                      transition: 'all 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget.querySelector('.sl') as HTMLElement).style.color = 'var(--primary-amber)'}
                    onMouseLeave={e => (e.currentTarget.querySelector('.sl') as HTMLElement).style.color = 'rgba(232,228,220,0.5)'}>
                    <span className="sl metadata" style={{ color: 'rgba(232,228,220,0.5)', transition: 'color 0.2s ease' }}>{label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--primary-amber)', opacity: 0.6 }}>{handle} ↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: bio + skills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <div>
                <h2 className="section-head" style={{ marginBottom: '2rem' }}>ORIGIN</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-offwhite)', marginBottom: '1.5rem' }}>
                  I treat the algorithm as a co-director, not an automated tool. The process of generating cinematic imagery is closer to sculpting light in a darkroom than writing code — requiring an understanding of focal lengths, film stock emulation, and the psychology of framing.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(232,228,220,0.65)' }}>
                  My work sits at the threshold between the tactile and the synthetic — luxury brands, performance machines, and raw human stories, all filtered through the same obsessive visual language.
                </p>
              </div>

              {/* Skills grid */}
              <div>
                <h2 className="section-head" style={{ marginBottom: '2rem' }}>CRAFT</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  {skills.map(({ category, items }) => (
                    <div key={category}>
                      <p className="metadata" style={{ color: 'var(--primary-amber)', marginBottom: '1rem', fontSize: '0.7rem' }}>
                        {category}
                      </p>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {items.map(item => (
                          <li key={item} className="metadata" style={{ color: 'rgba(232,228,220,0.55)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ width: '3px', height: '3px', background: 'var(--primary-amber)', borderRadius: '50%', flexShrink: 0 }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Timeline */}
      <div className="container" style={{ marginTop: '8rem' }}>
        <AnimatedSection>
          <h2 className="section-head" style={{ marginBottom: '4rem' }}>TIMELINE</h2>
        </AnimatedSection>
        <div style={{ position: 'relative' }}>
          {/* vertical line */}
          <div style={{ position: 'absolute', left: '80px', top: 0, bottom: 0, width: '1px', background: 'var(--ghost-border)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {timeline.map(({ year, event }, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div style={{ display: 'flex', gap: '0', alignItems: 'flex-start', paddingBottom: '3rem' }}>
                  <div style={{ width: '80px', flexShrink: 0, paddingTop: '0.2rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary-amber)', opacity: 0.8 }}>{year}</span>
                  </div>
                  {/* dot */}
                  <div style={{ width: '9px', height: '9px', border: '1px solid var(--primary-amber)', background: 'var(--bg-true-black)',
                    flexShrink: 0, marginTop: '0.3rem', marginRight: '2rem', marginLeft: '-4px' }} />
                  <p style={{ fontSize: '1rem', color: 'rgba(232,228,220,0.7)', lineHeight: 1.6 }}>{event}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
