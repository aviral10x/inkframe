import AnimatedSection from '../components/AnimatedSection';
import { bestFitClients, servicePillars } from '../content/inkframe';

export default function Services() {
  return (
    <div className="container page-section">
      <AnimatedSection>
        <p className="metadata eyebrow">WHAT WE MAKE</p>
        <h1 className="display-lg">AI VIDEO SYSTEMS</h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <p className="intro-copy">
          Campaign films, product commercials, launch reels, social ads, and visual experiments built for brands that
          need premium output without slow production cycles.
        </p>
      </AnimatedSection>

      <div className="service-list">
        {servicePillars.map(({ num, title, desc, deliverables }, index) => (
          <AnimatedSection key={num} delay={index * 0.08}>
            <div className="service-row">
              <span className="service-num">{num}</span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <div>
                <p className="metadata">DELIVERABLES</p>
                <ul>
                  {deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.4}>
        <div className="service-cta">
          <div>
            <p className="metadata eyebrow">BEST-FIT CLIENTS</p>
            <h2>Built for premium categories and fast-moving teams.</h2>
          </div>
          <div className="fit-list">
            {bestFitClients.map((client) => (
              <span key={client}>{client}</span>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
