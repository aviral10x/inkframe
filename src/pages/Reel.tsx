import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { HoverVideoCard, VideoModal } from '../components/HoverVideoCard';
import { proofOfWork } from '../content/inkframe';

type Project = (typeof proofOfWork)[number];

export default function Reel() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <div className="container page-section">
        <AnimatedSection>
          <p className="metadata eyebrow">CLIENT-FACING REEL LIBRARY</p>
          <h1 className="display-lg">PROOF OF WORK</h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="intro-copy">
            Hover to play, use the sound toggle while previewing, and click any film to expand it fullscreen.
          </p>
        </AnimatedSection>

        <div className="reel-library reel-video-library">
          {proofOfWork.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.05}>
              <HoverVideoCard
                project={project}
                index={index}
                onOpen={setActiveProject}
                wide={project.size === 'wide'}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
