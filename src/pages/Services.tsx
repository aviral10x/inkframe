import AnimatedSection from '../components/AnimatedSection';

const services = [
  {
    num: '01',
    title: 'COMMERCIAL DIRECTION',
    desc: 'Full-service direction for brand campaigns — from concept and pre-production through to final grade. Specialising in luxury, automotive, and beauty.',
    deliverables: ['Concept & treatment', 'On-set direction', 'Post-production supervision', 'Final delivery'],
    accent: '#C8A97A',
  },
  {
    num: '02',
    title: 'GENERATIVE FILM',
    desc: 'AI-native cinematic production. Using generative tools as a creative co-director to produce imagery that sits between the tactile and the synthetic.',
    deliverables: ['Generative concepting', 'AI-directed sequences', 'Hybrid live + AI compositing', 'Visual world-building'],
    accent: '#9B7FD4',
  },
  {
    num: '03',
    title: 'AUTOMOTIVE CONTENT',
    desc: 'Heritage and performance automotive films. Built on an understanding of marque identity — from the restraint of a Ferrari to the aggression of an AMG.',
    deliverables: ['Brand identity films', 'Dynamic footage', 'Studio & location shoots', 'Print & digital cut-downs'],
    accent: '#8AAF7A',
  },
  {
    num: '04',
    title: 'NARRATIVE SHORT FILM',
    desc: 'Independent short-form narrative production. Story-driven work with a strong visual language — developed from script through to festival-ready cut.',
    deliverables: ['Script development', 'Full production', 'Color grade & sound', 'Festival submission support'],
    accent: '#5A8A8A',
  },
];

export default function Services() {
  return (
    <div className="container" style={{ paddingBottom: '120px', paddingTop: '100px' }}>
      <AnimatedSection>
        <p className="metadata" style={{ color: 'var(--secondary-steel)', marginBottom: '1.5rem', letterSpacing: '0.2em' }}>
          WHAT I DO
        </p>
        <h1 className="display-lg" style={{ maxWidth: '12ch' }}>THE CRAFT</h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <p style={{ fontSize: '1.1rem', color: 'rgba(232,228,220,0.6)', maxWidth: '520px', marginTop: '2rem', lineHeight: 1.75 }}>
          Available for select collaborations in commercial direction, generative cinema, automotive content, and narrative short film.
        </p>
      </AnimatedSection>

      <div style={{ marginTop: '7rem', display: 'flex', flexDirection: 'column' }}>
        {services.map(({ num, title, desc, deliverables, accent }, i) => (
          <AnimatedSection key={num} delay={i * 0.1}>
            <div
              className="service-row"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '1rem'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0'; }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: accent, opacity: 0.7, paddingTop: '0.2rem' }}>{num}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.25rem', color: 'var(--text-pure)' }}>{title}</h3>
                <p style={{ fontSize: '1rem', color: 'rgba(232,228,220,0.6)', lineHeight: 1.75 }}>{desc}</p>
              </div>
              <div>
                <p className="metadata" style={{ color: accent, marginBottom: '1rem', fontSize: '0.7rem', opacity: 0.8 }}>DELIVERABLES</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {deliverables.map(d => (
                    <li key={d} className="metadata" style={{ color: 'rgba(232,228,220,0.45)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ width: '3px', height: '3px', background: accent, borderRadius: '50%', flexShrink: 0 }} />{d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* CTA */}
      <AnimatedSection delay={0.4}>
        <div className="service-cta" style={{ marginTop: '7rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>READY TO CREATE?</h2>
            <p style={{ color: 'rgba(232,228,220,0.5)', fontSize: '0.95rem' }}>Let's build something worth watching.</p>
          </div>
          <a href="/contact" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.1em', color: 'var(--primary-amber)', border: '1px solid var(--primary-amber)', padding: '0.9rem 2rem', textDecoration: 'none', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--primary-amber)'; (e.currentTarget as HTMLElement).style.color = 'var(--bg-true-black)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--primary-amber)'; }}>
            OPEN A DIALOGUE ↗
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
}
