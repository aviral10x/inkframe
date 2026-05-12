import AnimatedSection from '../components/AnimatedSection';
import { auraHighlights } from '../content/inkframe';

const productionLoop = [
  'Concept and brand read',
  'AI generation and visual testing',
  'Editing, compositing, and sound-led pacing',
  'Final assets formatted for web, social, and pitch decks',
];

export default function About() {
  return (
    <div className="container page-section">
      <AnimatedSection>
        <p className="metadata eyebrow">THE STUDIO</p>
        <h1 className="display-lg studio-title">AI VIDEO FILMS FOR BRANDS</h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="about-grid studio-grid">
          <div className="studio-panel">
            <p className="metadata">PRODUCTION PROMISE</p>
            <h2>Cinematic AI video, edited with a brand-first eye.</h2>
            <p>
              Strong concepts, quick turnarounds, multiple creative directions, and final assets formatted for web,
              social, and pitch decks.
            </p>
          </div>

          <div className="studio-copy">
            <p>
              InkFrame Films helps brands explore premium campaign visuals without traditional production timelines.
              The studio is built for fashion, beauty, automotive, luxury, and concept-led work where taste, speed,
              and iteration all matter.
            </p>
            <p>
              The output is not raw generation. It is directed, edited, composited, and shaped into films that can sit
              in a pitch call, a product launch, or a social feed without feeling like a tech demo.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <section className="section-band">
        <AnimatedSection>
          <p className="metadata eyebrow">HOW WE BUILD</p>
          <div className="process-grid">
            {productionLoop.map((item, index) => (
              <div key={item} className="process-step">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="section-band aura-section">
        <AnimatedSection>
          <p className="metadata eyebrow">SOCIAL CONTENT CASE STUDY</p>
          <div className="aura-grid">
            <div>
              <h2 className="section-title">Aura Kidzzz</h2>
              <p>
                InkFrame Films produced the video content for Aura Kidzzz, an Instagram-first kids and family-facing
                page built around playful short-form visuals and repeatable social content.
              </p>
              <a className="btn-secondary aura-link" href="https://www.instagram.com/aurakidzzz/" target="_blank" rel="noopener noreferrer">
                View @aurakidzzz
              </a>
            </div>
            <div className="aura-facts">
              <p className="metadata">PUBLIC PROFILE SNAPSHOT</p>
              <h3>Aura Kid · 19K followers · 42 posts</h3>
              <ul>
                {auraHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
