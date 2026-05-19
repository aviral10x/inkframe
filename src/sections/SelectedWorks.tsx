import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hls from 'hls.js';
import { projects } from '../data/content';
import { muxStream } from '../lib/mux';

/* ─────────────────────────────────────────────────────────────
 * MuxVideo lazily attaches hls.js on hover, cleans up on leave
 * Falls back to native HLS on Safari. Graceful fallback to static
 * poster when no playbackId exists.
 * ───────────────────────────────────────────────────────────── */
function useMuxPlayer(playbackId: string | null | undefined) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(() => {
    const video = videoRef.current;
    const src = muxStream(playbackId);
    if (!video || !src) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        startLevel: -1,
        capLevelToPlayerSize: true,
        maxBufferLength: 8,
        maxMaxBufferLength: 15,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      hlsRef.current = hls;
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.play().catch(() => {});
    }
    setIsPlaying(true);
  }, [playbackId]);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, []);

  return { videoRef, isPlaying, play, pause };
}

/* ─────────────────────────────────────────────────────────────
 * VideoModal fullscreen Mux HLS player with sound toggle
 * ───────────────────────────────────────────────────────────── */
interface ModalProject {
  title: string;
  category: string;
  year: string;
  description: string;
  accent: string;
  muxPlaybackId: string | null;
  image: string;
}

function VideoModal({ project, onClose }: { project: ModalProject; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const video = videoRef.current;
    const src = muxStream(project.muxPlaybackId);

    if (!video || !src) return;

    async function startPlayback() {
      if (!video) return;
      if (Hls.isSupported()) {
        const hls = new Hls({ startLevel: -1 });
        hls.loadSource(src!);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, async () => {
          try {
            video.muted = false;
            await video.play();
            setMuted(false);
          } catch {
            video.muted = true;
            setMuted(true);
            await video.play().catch(() => {});
          }
        });
        hlsRef.current = hls;
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src!;
        try {
          video.muted = false;
          await video.play();
        } catch {
          video.muted = true;
          await video.play().catch(() => {});
          setMuted(true);
        }
      }
    }
    void startPlayback();

    return () => {
      document.body.style.overflow = '';
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [project.muxPlaybackId]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

      {/* Video Container */}
      <motion.div
        className="relative w-full max-w-6xl mx-4 aspect-video rounded-2xl overflow-hidden border border-white/10"
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          poster={project.image}
          muted={muted}
          loop
          playsInline
          preload="auto"
          controls
          controlsList="nodownload noplaybackrate"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between z-10 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
          <div className="pointer-events-auto">
            <span className="text-xs uppercase tracking-[0.2em] font-medium mr-3" style={{ color: project.accent }}>
              {project.category}
            </span>
            <span className="text-white/90 text-lg font-display italic">{project.title}</span>
          </div>
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              type="button"
              onClick={toggleMute}
              className="text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              {muted ? 'Sound Off' : 'Sound On'}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between z-10 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
          <p className="text-white/60 text-sm max-w-lg leading-relaxed">{project.description}</p>
          <span className="text-xs tabular-nums" style={{ color: project.accent }}>{project.year}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * HoverVideoCard shows local poster, streams HLS on hover,
 * click-to-expand into modal. Exact feel of the original but
 * using adaptive bitrate streaming.
 * ───────────────────────────────────────────────────────────── */
interface CardProject {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  accent: string;
  muxPlaybackId: string | null;
}

function HoverVideoCard({
  project,
  index,
  wide = false,
  onOpen,
}: {
  project: CardProject;
  index: number;
  wide?: boolean;
  onOpen: (p: CardProject) => void;
}) {
  const { videoRef, isPlaying, play, pause } = useMuxPlayer(project.muxPlaybackId);
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  function handleEnter() {
    if (isTouchDevice) return;
    play();
  }

  function handleLeave() {
    if (isTouchDevice) return;
    pause();
  }

  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer border border-[var(--color-stroke)] bg-black ${wide ? 'min-h-[480px] md:min-h-[540px]' : 'min-h-[400px] md:min-h-[460px]'}`}
      style={{
        borderRadius: '1.25rem',
        boxShadow: isPlaying
          ? `0 0 60px ${project.accent}18, 0 20px 60px rgba(0,0,0,0.6)`
          : '0 8px 40px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.6s ease',
      }}
      whileHover={{ scale: wide ? 1.012 : 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={() => onOpen(project)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      {/* Local poster thumbnail */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: 'transform 0.8s cubic-bezier(0.25,1,0.5,1), opacity 0.8s ease',
          transform: isPlaying ? 'scale(1.03)' : 'scale(1)',
          opacity: isPlaying ? 0 : 1,
        }}
        loading="lazy"
      />

      {/* Streaming HLS video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: 'transform 0.8s cubic-bezier(0.25,1,0.5,1), opacity 0.6s ease',
          transform: isPlaying ? 'scale(1.03)' : 'scale(1)',
          opacity: isPlaying ? 1 : 0,
        }}
      />

      {/* Gradient scrim */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to top, rgba(8,8,10,0.45) 0%, rgba(8,8,10,0.06) 34%, transparent 56%)',
          opacity: isPlaying ? 0 : 0.9,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Category tag top left */}
      <div
        className="absolute top-5 left-5 z-[2]"
        style={{ opacity: isPlaying ? 0 : 0.9, transition: 'opacity 0.4s ease' }}
      >
        <span
          className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium px-3 py-1.5 rounded-full border backdrop-blur-sm"
          style={{ color: project.accent, borderColor: `${project.accent}50`, background: 'rgba(0,0,0,0.3)' }}
        >
          {project.category}
        </span>
      </div>

      {/* Index top right */}
      <span
        className="absolute top-5 right-5 text-[10px] tracking-[0.15em] tabular-nums text-white/30 z-[2]"
        style={{ opacity: isPlaying ? 0 : 1, transition: 'opacity 0.4s ease' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Play indicator center */}
      <div
        className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none"
        style={{ opacity: isPlaying ? 0 : 0.2, transition: 'opacity 0.4s ease' }}
      >
        <div
          className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
          style={{ borderColor: project.accent }}
        >
          <span
            className="block w-0 h-0 ml-1"
            style={{
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderLeft: `14px solid ${project.accent}`,
            }}
          />
        </div>
      </div>

      {/* "Click to expand" visible during playback */}
      <motion.div
        className="absolute top-5 left-1/2 -translate-x-1/2 z-[2] text-[10px] uppercase tracking-[0.2em] tabular-nums"
        animate={{ opacity: isPlaying ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ color: project.accent }}
      >
        Click to expand
      </motion.div>

      {/* Bottom info title, role, year */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between z-[2]"
        style={{ opacity: isPlaying ? 0 : 1, transition: 'opacity 0.4s ease' }}
      >
        <div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-display italic leading-tight">
            {project.title}
          </h3>
          <p className="text-white/50 text-xs md:text-sm mt-1 max-w-md leading-relaxed">
            {project.description.length > 90 ? project.description.slice(0, 90) + '...' : project.description}
          </p>
        </div>
        <span className="text-xs tabular-nums shrink-0 ml-4" style={{ color: project.accent }}>
          {project.year}
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * SelectedWorks anthology layout:
 * Full-width → 2-col → Full-width → 2-col → Full-width
 * Exactly like the original, but cleaner with Mux CDN.
 * ───────────────────────────────────────────────────────────── */
export function SelectedWorks() {
  const [activeProject, setActiveProject] = useState<CardProject | null>(null);

  // Anthology pattern: wide, [pair], wide, [pair], wide, [pair], wide, final
  const rows: { type: 'wide' | 'pair'; items: typeof projects } [] = [];
  let idx = 0;

  while (idx < projects.length) {
    if (idx === 0 || rows.length % 2 === 0) {
      // Wide row
      rows.push({ type: 'wide', items: [projects[idx]] });
      idx++;
    } else {
      // Pair row but if only 1 item left, make it wide instead
      const pair = projects.slice(idx, idx + 2);
      if (pair.length === 1) {
        rows.push({ type: 'wide', items: pair });
      } else {
        rows.push({ type: 'pair', items: pair });
      }
      idx += pair.length;
    }
  }

  return (
    <section id="work" className="bg-[var(--color-bg)] py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[var(--color-stroke)]" />
              <span className="text-xs text-[var(--color-muted)] uppercase tracking-[0.3em]">
                Client-Facing Library
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl text-[var(--color-text-primary)] mb-5 tracking-tight">
              Proof of <span className="font-display italic">Work</span>
            </h2>
            <p className="text-[var(--color-muted)] text-base md:text-lg max-w-md leading-relaxed">
              Campaign films, product commercials, and visual experiments hover to preview, click to watch.
            </p>
          </div>

          <span className="text-sm text-[var(--color-muted)] hidden md:block tabular-nums font-medium">
            {String(projects.length).padStart(2, '0')} Films
          </span>
        </motion.div>

        {/* Anthology Stack */}
        <div className="flex flex-col gap-5 md:gap-6">
          {rows.map((row, rowIdx) => {
            if (row.type === 'wide') {
              const project = row.items[0];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <HoverVideoCard
                    project={project}
                    index={projects.indexOf(project)}
                    wide
                    onOpen={setActiveProject}
                  />
                </motion.div>
              );
            }

            return (
              <div key={`pair-${rowIdx}`} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {row.items.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <HoverVideoCard
                      project={project}
                      index={projects.indexOf(project)}
                      onOpen={setActiveProject}
                    />
                  </motion.div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {activeProject && (
          <VideoModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
