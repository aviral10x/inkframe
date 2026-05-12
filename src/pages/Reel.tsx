import AnimatedSection from '../components/AnimatedSection';
import DriveEmbed from '../components/DriveEmbed';
import { proofOfWork } from '../content/inkframe';

export default function Reel() {
  return (
    <div className="container page-section">
      <AnimatedSection>
        <p className="metadata eyebrow">CLIENT-FACING REEL LIBRARY</p>
        <h1 className="display-lg">PROOF OF WORK</h1>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <p className="intro-copy">
          Use this page as the full proof-of-work library: showreel, fashion, beauty, product storytelling,
          experimental concept films, automotive, and narrative/action work.
        </p>
      </AnimatedSection>

      <div className="reel-library">
        {proofOfWork.map((project, index) => (
          <AnimatedSection key={project.id} delay={index * 0.05}>
            <article className={`reel-entry reel-entry-${project.size}`}>
              <div className="reel-entry-copy">
                <span className="metadata" style={{ color: project.accent }}>{project.category}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <span className="format-tag">{project.format}</span>
              </div>
              <DriveEmbed title={project.title} driveId={project.driveId} />
            </article>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
