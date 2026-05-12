"use client";
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const projects = [
  {
    id: 'chanel-ad',
    title: 'CHANEL N°1',
    role: 'Director · Tabletop',
    year: '2025',
    tag: 'BEAUTY COMMERCIAL',
    logline: 'Tactile luxury. A product made pure object — skin-tone symphony on softbox silk.',
    videoSrc: 'https://res.cloudinary.com/dxayta2us/video/upload/v1774291729/xtool/chanel-ad.mp4',
    poster: '/posters/chanel-ad.jpg',
    cardBg: 'linear-gradient(135deg, #1a1612 0%, #0e0c09 100%)',
    accentColor: '#C8A97A',
    accentGlow: 'rgba(200,169,122,0.15)',
    tagColor: 'rgba(200,169,122,0.6)',
    overlayGradient: 'linear-gradient(to top,rgba(10,8,5,0.97) 0%,rgba(10,8,5,0.3) 55%,transparent 100%)',
    titleFont: 'var(--font-display)',
    grain: true,
    hoverScale: 1.03,
  },
  {
    id: 'chanel',
    title: 'CHANEL CHANCE',
    role: 'Director · CGI Fantasy',
    year: '2025',
    tag: 'FRAGRANCE FILM',
    logline: 'An enchanted nocturnal world — where a moonlit forest becomes the bottle itself.',
    videoSrc: 'https://res.cloudinary.com/dxayta2us/video/upload/v1774291740/xtool/chanel.mp4',
    poster: '/posters/chanel.jpg',
    cardBg: 'linear-gradient(135deg,#070814 0%,#0a0a1a 100%)',
    accentColor: '#9B7FD4',
    accentGlow: 'rgba(155,127,212,0.2)',
    tagColor: 'rgba(155,127,212,0.7)',
    overlayGradient: 'linear-gradient(to top,rgba(5,5,18,0.97) 0%,rgba(5,5,18,0.2) 60%,transparent 100%)',
    titleFont: 'var(--font-display)',
    grain: false,
    hoverScale: 1.02,
  },
  {
    id: 'ferrari',
    title: 'FERRARI',
    role: 'Director · Automotive',
    year: '2025',
    tag: 'HERITAGE LUXURY',
    logline: 'British Racing Green. Chrome script. A marque so confident it needs no speed.',
    videoSrc: 'https://res.cloudinary.com/dxayta2us/video/upload/v1774291743/xtool/ferrari.mp4',
    poster: '/posters/ferrari.jpg',
    cardBg: 'linear-gradient(135deg,#080f08 0%,#060a06 100%)',
    accentColor: '#8AAF7A',
    accentGlow: 'rgba(138,175,122,0.12)',
    tagColor: 'rgba(138,175,122,0.6)',
    overlayGradient: 'linear-gradient(to top,rgba(4,8,4,0.97) 0%,rgba(4,8,4,0.25) 55%,transparent 100%)',
    titleFont: 'var(--font-display)',
    grain: true,
    hoverScale: 1.02,
  },
  {
    id: 'mercedes',
    title: 'MERCEDES AMG GT',
    role: 'Director · Performance',
    year: '2024',
    tag: 'AUTOMOTIVE ATTACK',
    logline: "Solaris yellow vs the void. A predator's eye from absolute darkness.",
    videoSrc: 'https://res.cloudinary.com/dxayta2us/video/upload/v1774291747/xtool/mercedes.mp4',
    poster: '/posters/mercedes.jpg',
    cardBg: 'linear-gradient(135deg,#0a0900 0%,#050500 100%)',
    accentColor: '#E8C832',
    accentGlow: 'rgba(232,200,50,0.18)',
    tagColor: 'rgba(232,200,50,0.7)',
    overlayGradient: 'linear-gradient(to top,rgba(5,5,0,0.97) 0%,rgba(5,5,0,0.15) 55%,transparent 100%)',
    titleFont: 'var(--font-mono)',
    grain: false,
    hoverScale: 1.04,
  },
  {
    id: 'theft',
    title: 'THEFT',
    role: 'Director · Narrative',
    year: '2024',
    tag: 'SHORT FILM',
    logline: 'Pawn shop. Road-worn leather. Gold that had owners once. Teal shadows, moral weight.',
    videoSrc: 'https://res.cloudinary.com/dxayta2us/video/upload/v1774291754/xtool/theft.mp4',
    poster: '/posters/theft.jpg',
    cardBg: 'linear-gradient(135deg,#060e0e 0%,#040a0c 100%)',
    accentColor: '#5A8A8A',
    accentGlow: 'rgba(90,138,138,0.15)',
    tagColor: 'rgba(90,138,138,0.65)',
    overlayGradient: 'linear-gradient(to top,rgba(3,7,8,0.98) 0%,rgba(3,7,8,0.3) 55%,transparent 100%)',
    titleFont: 'var(--font-mono)',
    grain: true,
    hoverScale: 1.02,
  },
];

type Project = typeof projects[0];

// ─── Fullscreen Lightbox Modal ────────────────────────────────────────────────
function VideoModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // Lock scroll when open
    document.body.style.overflow = 'hidden';
    // Auto-play with sound
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
    }
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  }

  return (
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0',
      }}
    >
      {/* Expanding card */}
      <motion.div
        layoutId={`card-${project.id}`}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100vw',
          height: '100dvh',
          background: project.cardBg,
          overflow: 'hidden',
          cursor: 'default',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
      >
        {/* Video fills fullscreen */}
        <motion.video
          layoutId={`video-${project.id}`}
          ref={videoRef}
          src={project.videoSrc}
          poster={project.poster}
          loop
          playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'contain',
            background: '#000',
            zIndex: 0,
          }}
        />

        {/* Top bar: title + controls */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1.5rem 2rem',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)',
          }}
        >
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              letterSpacing: '0.18em', color: project.tagColor, textTransform: 'uppercase',
            }}>{project.tag}</span>
            <h3 style={{
              fontFamily: project.titleFont, fontSize: '1.4rem',
              fontWeight: 700, color: 'var(--text-pure)', marginTop: '0.2rem', lineHeight: 1,
            }}>{project.title}</h3>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button onClick={toggleMute} style={{
              background: 'rgba(0,0,0,0.5)', border: `1px solid ${project.accentColor}55`,
              color: project.accentColor, padding: '5px 12px',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em',
              cursor: 'pointer', backdropFilter: 'blur(8px)', borderRadius: '2px',
            }}>
              {muted ? '⟨ SOUND OFF ⟩' : '⟨ SOUND ON ⟩'}
            </button>

            <button onClick={onClose} style={{
              background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)', width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: '1rem',
              cursor: 'pointer', backdropFilter: 'blur(8px)', borderRadius: '2px',
              lineHeight: 1,
            }}>
              ✕
            </button>
          </div>
        </motion.div>

        {/* Bottom: logline + meta */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ delay: 0.25, duration: 0.35 }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
            padding: '2rem 2.5rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
            color: 'rgba(232,228,220,0.6)', lineHeight: 1.6,
            maxWidth: '480px', fontStyle: 'italic',
          }}>{project.logline}</p>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(232,228,220,0.4)' }}>{project.role}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: project.accentColor, marginTop: '0.2rem' }}>{project.year}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({
  project, index, onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  function handleMouseEnter() {
    if (isTouchDevice) return;
    videoRef.current?.play().catch(() => {});
    setPlaying(true);
  }
  function handleMouseLeave() {
    if (isTouchDevice) return;
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
    setPlaying(false);
  }
  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    if (videoRef.current) { videoRef.current.muted = !videoRef.current.muted; setMuted(videoRef.current.muted); }
  }
  function handleClick() { onOpen(project); }

  const isWide = index === 0 || index === 3;

  return (
    <AnimatedSection delay={index * 0.12}>
      <motion.div
        layoutId={`card-${project.id}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          height: isWide ? '520px' : '440px',
          background: project.cardBg,
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: playing
            ? `0 0 60px ${project.accentGlow},0 20px 60px rgba(0,0,0,0.7)`
            : '0 8px 40px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.6s ease',
        }}
        whileHover={{ scale: project.hoverScale }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >

        {/* Grain */}
        {project.grain && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
            opacity: playing ? 0 : 0.035,
            transition: 'opacity 0.6s ease',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />
        )}

        {/* Video */}
        <motion.video
          layoutId={`video-${project.id}`}
          ref={videoRef}
          src={project.videoSrc}
          poster={project.poster}
          muted loop playsInline preload="none"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            filter: playing ? 'none' : 'grayscale(70%)',
            opacity: playing ? 1 : 0.5,
            transition: 'filter 0.7s ease, opacity 0.7s ease',
            zIndex: 0,
          }}
        />

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: project.overlayGradient,
          zIndex: 1,
          opacity: playing ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }} />

        {/* Tag */}
        <div style={{
          position: 'absolute', top: '2rem', left: '2rem', zIndex: 3,
          opacity: playing ? 0 : 0.8,
          transform: playing ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.18em',
            color: project.tagColor, textTransform: 'uppercase',
            borderBottom: `1px solid ${project.tagColor}`, paddingBottom: '2px',
          }}>{project.tag}</span>
        </div>

        {/* Mute toggle (desktop hover) */}
        {playing && !isTouchDevice && (
          <button onClick={toggleMute} style={{
            position: 'absolute', top: '1.8rem', right: '2rem', zIndex: 5,
            background: 'rgba(0,0,0,0.45)', border: `1px solid ${project.accentColor}55`,
            color: project.accentColor, padding: '4px 10px',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em',
            cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.2s ease',
          }}>
            {muted ? '⟨ SOUND OFF ⟩' : '⟨ SOUND ON ⟩'}
          </button>
        )}

        {/* Bottom text */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
          padding: '2.5rem',
          opacity: playing ? 0 : 1,
          transform: playing ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.45s ease, transform 0.45s ease',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h3 style={{
                fontFamily: project.titleFont,
                fontSize: isWide ? '3rem' : '2.2rem',
                fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '0.4rem',
                color: 'var(--text-pure)',
                textShadow: '0 4px 20px rgba(0,0,0,0.9)',
              }}>{project.title}</h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.08em', color: 'rgba(232,228,220,0.5)' }}>{project.role}</p>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: project.accentColor, opacity: 0.7 }}>{project.year}</span>
          </div>
        </div>

        {/* Play hint */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: playing ? 0 : 0.25,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}>
          <div style={{ width: '48px', height: '48px', border: `1px solid ${project.accentColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: `16px solid ${project.accentColor}`, marginLeft: '4px' }} />
          </div>
        </div>

        {/* "Click to expand" hint that fades in on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: playing ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', bottom: '1.5rem', right: '2rem', zIndex: 5,
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            letterSpacing: '0.15em', color: project.accentColor,
            pointerEvents: 'none',
          }}
        >
          CLICK TO EXPAND ↗
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <div className="container" style={{ paddingBottom: '120px' }}>

        {/* Hero */}
        <section className="hero-grid">
          <div>
            <AnimatedSection>
              <p className="metadata" style={{ color: 'var(--secondary-steel)', marginBottom: '1.5rem', letterSpacing: '0.2em' }}>
                DIRECTOR · VISUAL ARCHITECT
              </p>
              <h1 className="display-lg">AVIRAL</h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', marginTop: '3.5rem' }}>
                {[['5', 'FILMS'], ['3', 'BRANDS'], ['2025', 'SEASON']].map(([val, label], i) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    {i > 0 && <div style={{ width: '1px', height: '36px', background: 'var(--ghost-border)', marginRight: '-1.5rem' }} />}
                    <div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-pure)', lineHeight: 1 }}>{val}</p>
                      <p className="metadata" style={{ marginTop: '0.3rem', fontSize: '0.7rem' }}>{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '5rem', opacity: 0.3 }}>
                <div style={{ width: '40px', height: '1px', background: 'var(--text-offwhite)' }} />
                <p className="metadata" style={{ fontSize: '0.7rem' }}>HOVER TO PLAY · CLICK TO EXPAND</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: tagline + social links */}
          <AnimatedSection delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-offwhite)', lineHeight: 1.75, borderLeft: '2px solid var(--primary-amber)', paddingLeft: '2rem' }}>
                Architecting cinematic worlds through the fusion of human narrative and generative intelligence.
                Exploring the threshold where silicon meets soul.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p className="metadata" style={{ color: 'var(--secondary-steel)', fontSize: '0.7rem', marginBottom: '0.5rem' }}>FIND ME</p>
                {[
                  { label: 'X / TWITTER', href: 'https://x.com/aviral10x', handle: '@aviral10x' },
                  { label: 'INSTAGRAM', href: 'https://www.instagram.com/aviral10x', handle: '@aviral10x' },
                  { label: 'LINKEDIN', href: 'https://in.linkedin.com/in/aviral10x', handle: 'aviral10x' },
                ].map(({ label, href, handle }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.8rem 0', borderBottom: '1px solid var(--ghost-border)',
                      textDecoration: 'none', transition: 'all 0.2s ease', color: 'inherit',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0.5rem'; (e.currentTarget.querySelector('.lbl') as HTMLElement).style.color = 'var(--primary-amber)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = '0'; (e.currentTarget.querySelector('.lbl') as HTMLElement).style.color = 'rgba(232,228,220,0.7)'; }}>
                    <span className="lbl metadata" style={{ transition: 'color 0.2s ease', color: 'rgba(232,228,220,0.7)' }}>{label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary-amber)', opacity: 0.6 }}>{handle} ↗</span>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* The Anthology */}
        <section style={{ marginTop: '6rem' }}>
          <AnimatedSection>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '4rem' }}>
              <h2 className="section-head">THE ANTHOLOGY</h2>
              <span className="metadata" style={{ fontSize: '0.7rem', opacity: 0.4 }}>2024 — 2025</span>
            </div>
          </AnimatedSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <VideoCard project={projects[0]} index={0} onOpen={setActiveProject} />
            <div className="anthology-2col">
              <VideoCard project={projects[1]} index={1} onOpen={setActiveProject} />
              <VideoCard project={projects[2]} index={2} onOpen={setActiveProject} />
            </div>
            <VideoCard project={projects[3]} index={3} onOpen={setActiveProject} />
            <VideoCard project={projects[4]} index={4} onOpen={setActiveProject} />
          </div>
        </section>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeProject && (
          <VideoModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
