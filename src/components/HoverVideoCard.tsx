import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { driveDownload, driveThumbnail, driveView, proofOfWork } from '../content/inkframe';

type VideoProject = (typeof proofOfWork)[number];

interface HoverVideoCardProps {
  project: VideoProject;
  index: number;
  onOpen: (project: VideoProject) => void;
  wide?: boolean;
}

interface VideoModalProps {
  project: VideoProject;
  onClose: () => void;
}

export function VideoModal({ project, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
      });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function toggleMute(event: React.MouseEvent) {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <motion.div
      className="video-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="video-modal-shell"
        layoutId={`card-${project.id}`}
        onClick={(event) => event.stopPropagation()}
        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
      >
        <motion.video
          layoutId={`video-${project.id}`}
          ref={videoRef}
          src={driveDownload(project.driveId)}
          poster={driveThumbnail(project.driveId)}
          loop
          playsInline
          controls
          className="video-modal-media"
        />

        <div className="video-modal-topbar">
          <div>
            <span className="metadata" style={{ color: project.accent }}>{project.tag}</span>
            <h3>{project.title}</h3>
          </div>
          <div className="video-modal-actions">
            <button type="button" onClick={toggleMute}>
              {muted ? 'SOUND OFF' : 'SOUND ON'}
            </button>
            <a href={driveView(project.driveId)} target="_blank" rel="noopener noreferrer">
              SOURCE
            </a>
            <button type="button" onClick={onClose} aria-label="Close video">
              X
            </button>
          </div>
        </div>

        <div className="video-modal-bottom">
          <p>{project.description}</p>
          <div>
            <span>{project.role}</span>
            <strong style={{ color: project.accent }}>{project.year}</strong>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HoverVideoCard({ project, index, onOpen, wide }: HoverVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  function ensureVideoSource() {
    const video = videoRef.current;
    if (!video) return null;
    if (!video.src) {
      video.src = driveDownload(project.driveId);
      video.load();
    }
    return video;
  }

  function handleMouseEnter() {
    if (isTouchDevice) return;
    const video = ensureVideoSource();
    if (!video) return;
    video.play().catch(() => {});
    setPlaying(true);
  }

  function handleMouseLeave() {
    if (isTouchDevice) return;
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  }

  function toggleMute(event: React.MouseEvent) {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <motion.div
      className={`hover-video-card ${wide ? 'hover-video-card-wide' : ''}`}
      layoutId={`card-${project.id}`}
      onClick={() => onOpen(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: playing
          ? `0 0 60px ${project.accent}24, 0 20px 60px rgba(0,0,0,0.7)`
          : '0 8px 40px rgba(0,0,0,0.5)',
      }}
      whileHover={{ scale: wide ? 1.018 : 1.025 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.video
        className="hover-video-media"
        layoutId={`video-${project.id}`}
        ref={videoRef}
        poster={driveThumbnail(project.driveId)}
        muted
        loop
        playsInline
        preload="none"
        style={{
          filter: playing ? 'none' : 'grayscale(62%)',
          opacity: playing ? 1 : 0.58,
        }}
      />

      <div
        className="hover-video-overlay"
        style={{
          opacity: playing ? 0 : 1,
          background: `linear-gradient(to top, rgba(8,8,10,0.97) 0%, rgba(8,8,10,0.35) 55%, transparent 100%),
            linear-gradient(115deg, ${project.accent}22, transparent 42%)`,
        }}
      />

      <div className="hover-video-tag" style={{ opacity: playing ? 0 : 0.9 }}>
        <span className="metadata" style={{ color: project.accent, borderBottomColor: project.accent }}>
          {project.tag}
        </span>
      </div>

      <AnimatePresence>
        {playing && !isTouchDevice && (
          <motion.button
            type="button"
            className="hover-video-mute"
            onClick={toggleMute}
            style={{ borderColor: `${project.accent}66`, color: project.accent }}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            {muted ? 'SOUND OFF' : 'SOUND ON'}
          </motion.button>
        )}
      </AnimatePresence>

      <div className="hover-video-copy" style={{ opacity: playing ? 0 : 1 }}>
        <div>
          <h3>{project.title}</h3>
          <p>{project.role}</p>
        </div>
        <span style={{ color: project.accent }}>{project.year}</span>
      </div>

      <div className="hover-video-play" style={{ opacity: playing ? 0 : 0.26, borderColor: project.accent }}>
        <span style={{ borderLeftColor: project.accent }} />
      </div>

      <motion.div
        className="hover-video-expand metadata"
        animate={{ opacity: playing ? 0.72 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ color: project.accent }}
      >
        CLICK TO EXPAND
      </motion.div>

      <span className="hover-video-index metadata">{String(index + 1).padStart(2, '0')}</span>
    </motion.div>
  );
}
