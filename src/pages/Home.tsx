import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { HoverVideoCard, VideoModal } from '../components/HoverVideoCard';
import { bestFitClients, contactEmail, proofOfWork, servicePillars } from '../content/inkframe';

type Project = (typeof proofOfWork)[number];

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [leadForm, setLeadForm] = useState({ name: '', email: '' });
  const [leadSent, setLeadSent] = useState(false);

  const heroProject = proofOfWork[0];

  function handleLeadSubmit(event: React.FormEvent) {
    event.preventDefault();
    const subject = encodeURIComponent(`InkFrame Films lead from ${leadForm.name}`);
    const body = encodeURIComponent(
      `Name: ${leadForm.name}\nEmail: ${leadForm.email}\nInterest: Hero-page lead form\n\nPlease reach out with next steps and relevant work samples.`,
    );
    window.open(`mailto:${contactEmail}?subject=${subject}&body=${body}`);
    setLeadSent(true);
  }

  return (
    <>
      <section className="hero-stage">
        <video
          className="hero-stage-video"
          src={heroProject.fullSrc}
          poster={heroProject.posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero-stage-scrim" />
        <div className="container hero-stage-inner">
          <div className="hero-stage-copy">
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
              <div className="hero-stage-meta">
                <div className="hero-stage-tag">
                  <span className="metadata">{heroProject.tag}</span>
                  <strong>{heroProject.title}</strong>
                </div>
                <p className="metadata">DIRECT LEAD CAPTURE · CLICK ANY FILM TO EXPAND</p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.25}>
            <aside className="hero-lead-card">
              <p className="metadata">START HERE</p>
              <h2>Get a film idea pack for your brand.</h2>
              <p>
                Leave your name and email. We will open the enquiry with your details so your team can start the brief fast.
              </p>

              {leadSent ? (
                <div className="hero-lead-success">
                  <strong>Lead draft ready.</strong>
                  <p>Your mail app should have opened with your contact details prefilled.</p>
                  <button type="button" className="btn-secondary" onClick={() => setLeadSent(false)}>
                    Send another
                  </button>
                </div>
              ) : (
                <form className="hero-lead-form" onSubmit={handleLeadSubmit}>
                  <label>
                    <span className="metadata">Name</span>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={leadForm.name}
                      onChange={(event) => setLeadForm((current) => ({ ...current, name: event.target.value }))}
                    />
                  </label>
                  <label>
                    <span className="metadata">Email</span>
                    <input
                      type="email"
                      required
                      placeholder="you@brand.com"
                      value={leadForm.email}
                      onChange={(event) => setLeadForm((current) => ({ ...current, email: event.target.value }))}
                    />
                  </label>
                  <button type="submit" className="btn-primary">Get in touch</button>
                </form>
              )}
            </aside>
          </AnimatedSection>
        </div>
      </section>

      <div className="container home-page">

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
                <h2 className="section-head">CAMPAIGN SYSTEMS</h2>
              </div>
              <span className="metadata">FILMS · ADS · SOCIAL · PITCH WORLDS</span>
            </div>
          </AnimatedSection>

          <div className="service-pillar-grid">
            {servicePillars.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.06}>
                <div className="service-pillar-card">
                  <div className="service-pillar-head">
                    <span>{service.num}</span>
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.desc}</p>
                  <ul className="service-pill-list">
                    {service.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
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
