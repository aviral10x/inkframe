import AnimatedSection from '../components/AnimatedSection';

const reelProjects = [
  { title: 'CHANEL N°1', tag: 'BEAUTY', year: '2025', accent: '#C8A97A', poster: '/posters/chanel-ad.jpg' },
  { title: 'CHANEL CHANCE', tag: 'FRAGRANCE', year: '2025', accent: '#9B7FD4', poster: '/posters/chanel.jpg' },
  { title: 'FERRARI', tag: 'AUTOMOTIVE', year: '2025', accent: '#8AAF7A', poster: '/posters/ferrari.jpg' },
  { title: 'MERCEDES AMG GT', tag: 'AUTOMOTIVE', year: '2024', accent: '#E8C832', poster: '/posters/mercedes.jpg' },
  { title: 'THEFT', tag: 'NARRATIVE', year: '2024', accent: '#5A8A8A', poster: '/posters/theft.jpg' },
];

export default function Reel() {
  return (
    <div className="container" style={{ paddingBottom: '120px', paddingTop: '100px' }}>
      <AnimatedSection>
        <p className="metadata" style={{ color: 'var(--secondary-steel)', marginBottom: '1.5rem', letterSpacing: '0.2em' }}>
          THE WORK
        </p>
        <h1 className="display-lg">THE REEL</h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <p style={{ fontSize: '1.1rem', color: 'rgba(232,228,220,0.5)', maxWidth: '480px', marginTop: '2rem', lineHeight: 1.75 }}>
          Five films. Three brands. One visual language.
        </p>
      </AnimatedSection>

      {/* Full reel embed placeholder */}
      <AnimatedSection delay={0.3}>
        <div style={{ marginTop: '5rem', position: 'relative', paddingBottom: '56.25%', background: 'var(--surface-container-low)', border: '1px solid var(--ghost-border)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
            <div style={{ width: '64px', height: '64px', border: '1px solid var(--primary-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderLeft: '22px solid var(--primary-amber)', marginLeft: '4px' }} />
            </div>
            <p className="metadata" style={{ color: 'var(--primary-amber)', opacity: 0.7 }}>FULL SHOWREEL — 2025</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(232,228,220,0.3)' }}>
              Coming soon — follow <a href="https://x.com/aviral10x" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-amber)', opacity: 0.7 }}>@aviral10x</a> for the drop
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Individual film stills grid */}
      <AnimatedSection delay={0.4}>
        <h2 className="section-head" style={{ marginTop: '7rem', marginBottom: '3rem' }}>INDIVIDUAL FILMS</h2>
      </AnimatedSection>

      <div className="reel-grid">
        {reelProjects.map((p, i) => (
          <AnimatedSection key={p.title} delay={i * 0.08}>
            <div style={{ position: 'relative', paddingBottom: '66%', background: 'var(--surface-container-low)', overflow: 'hidden', cursor: 'pointer' }}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                if (img) { img.style.opacity = '0.7'; img.style.filter = 'grayscale(0%) scale(1.05)'; }
                const ov = e.currentTarget.querySelector('.ov') as HTMLElement;
                if (ov) ov.style.opacity = '1';
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                if (img) { img.style.opacity = '0.45'; img.style.filter = 'grayscale(60%) scale(1)'; }
                const ov = e.currentTarget.querySelector('.ov') as HTMLElement;
                if (ov) ov.style.opacity = '0';
              }}>
              <img src={p.poster} alt={p.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                  filter: 'grayscale(60%) scale(1)', opacity: 0.45, transition: 'all 0.6s ease' }} />
              <div className="ov" style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${p.accent}22, transparent)`, opacity: 0, transition: 'opacity 0.4s ease' }} />
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: p.accent, letterSpacing: '0.15em' }}>{p.tag} · {p.year}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, marginTop: '0.25rem', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>{p.title}</h3>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Social follow */}
      <AnimatedSection delay={0.5}>
        <div style={{ marginTop: '6rem', display: 'flex', gap: '4rem', borderTop: '1px solid var(--ghost-border)', paddingTop: '3rem' }}>
          {[
            { label: 'INSTAGRAM', href: 'https://www.instagram.com/aviral10x' },
            { label: 'X / TWITTER', href: 'https://x.com/aviral10x' },
            { label: 'LINKEDIN', href: 'https://in.linkedin.com/in/aviral10x' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="metadata"
              style={{ fontSize: '1rem', textDecoration: 'none', color: 'rgba(232,228,220,0.7)', transition: 'color 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary-amber)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(232,228,220,0.7)'; }}>
              {label} ↗
            </a>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
