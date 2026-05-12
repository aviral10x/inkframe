import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { HoverVideoCard, VideoModal } from '../components/HoverVideoCard';
import { bestFitClients, proofOfWork, services } from '../content/inkframe';

type Project = (typeof proofOfWork)[number];

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <div className="container home-page">
        <section className="hero-grid ink-hero">
          <div>
            <AnimatedSection>
              <p className="metadata eyebrow">AI-FIRST VIDEO AGENCY</p>
              <h1 className="display-lg">INKFRAME FILMS</h1>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="hero-copy">
                AI video films for brands that need premium visuals, fast iteration, and scroll-stopping storytelling.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <div className="hero-actions">
                <a href="/reel" className="btn-primary">Watch the reel</a>
                <a href="/contact" className="btn-secondary">Start a brief</a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="hover-instruction">
                <div />
                <p className="metadata">HOVER TO PLAY · CLICK TO EXPAND</p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.25}>
            <HoverVideoCard project={proofOfWork[0]} index={0} onOpen={setActiveProject} wide />
          </AnimatedSection>
        </section>

        <section className="section-band">
          <AnimatedSection>
            <p className="metadata eyebrow">STUDIO POSITIONING</p>
            <div className="statement-grid">
              <h2 className="section-title">Cinematic direction with AI speed.</h2>
              <p>
                InkFrame Films is an AI-first video studio for fashion, beauty, automotive, luxury, and concept-led campaigns.
                We combine cinematic direction, AI generation, editing, compositing, and brand-aware art direction to create
                launch films, social ads, product worlds, and high-impact proof-of-concept visuals.
              </p>
            </div>
          </AnimatedSection>
        </section>

        <section className="section-band">
          <AnimatedSection>
            <div className="section-heading-row">
              <div>
                <p className="metadata eyebrow">WHAT WE MAKE</p>
                <h2 className="section-head">CAMPAIGN OUTPUTS</h2>
              </div>
              <span className="metadata">WEB · SOCIAL · PITCH DECKS</span>
            </div>
          </AnimatedSection>

          <div className="service-chip-grid">
            {services.map((service, index) => (
              <AnimatedSection key={service} delay={index * 0.04}>
                <div className="service-chip">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{service}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <section className="section-band">
          <AnimatedSection>
            <div className="section-heading-row">
              <div>
                <p className="metadata eyebrow">CLIENT-FACING LIBRARY</p>
                <h2 className="section-head">PROOF OF WORK</h2>
              </div>
              <a className="metadata text-link" href="/reel">OPEN FULL REEL</a>
            </div>
          </AnimatedSection>

          <div className="anthology-stack">
            <HoverVideoCard project={proofOfWork[1]} index={1} onOpen={setActiveProject} />
            <div className="anthology-2col">
              <HoverVideoCard project={proofOfWork[2]} index={2} onOpen={setActiveProject} />
              <HoverVideoCard project={proofOfWork[3]} index={3} onOpen={setActiveProject} />
            </div>
            <HoverVideoCard project={proofOfWork[4]} index={4} onOpen={setActiveProject} wide />
            <div className="anthology-2col">
              <HoverVideoCard project={proofOfWork[5]} index={5} onOpen={setActiveProject} />
              <HoverVideoCard project={proofOfWork[6]} index={6} onOpen={setActiveProject} />
            </div>
            <HoverVideoCard project={proofOfWork[7]} index={7} onOpen={setActiveProject} />
          </div>
        </section>

        <section className="section-band client-band">
          <AnimatedSection>
            <p className="metadata eyebrow">BEST-FIT CLIENTS</p>
            <div className="client-grid">
              {bestFitClients.map((client) => (
                <p key={client}>{client}</p>
              ))}
            </div>
          </AnimatedSection>
        </section>
      </div>

      <AnimatePresence>
        {activeProject && (
          <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
