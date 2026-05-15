import { useEffect, useRef, useState } from 'react';

// Royalty-free cinematic ambient track — swap this URL for your own file
// or place an audio file at /public/audio/ambient.mp3
const AUDIO_SRC = 'https://cdn.pixabay.com/audio/2022/03/15/audio_44c3c8eea4.mp3';

function SpeakerOnIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  );
}

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [interacted, setInteracted] = useState(false);

  // Trigger on first meaningful user interaction
  useEffect(() => {
    const startOnInteract = () => {
      if (!interacted) {
        setInteracted(true);
        const audio = audioRef.current;
        if (audio) {
          audio.volume = 0.12;
          audio.play().then(() => setPlaying(true)).catch(() => {});
        }
      }
    };

    window.addEventListener('click', startOnInteract, { once: true });
    window.addEventListener('keydown', startOnInteract, { once: true });
    window.addEventListener('touchstart', startOnInteract, { once: true });

    return () => {
      window.removeEventListener('click', startOnInteract);
      window.removeEventListener('keydown', startOnInteract);
      window.removeEventListener('touchstart', startOnInteract);
    };
  }, [interacted]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.12;
      audio.play().catch(() => {});
      setPlaying(true);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="none" />

      {/* Toggle button — fixed top-right, outside the navbar pill */}
      <button
        onClick={toggle}
        title={playing ? 'Mute ambient audio' : 'Play ambient audio'}
        aria-label={playing ? 'Mute ambient audio' : 'Play ambient audio'}
        className={`fixed top-[22px] right-4 md:right-6 z-50 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 backdrop-blur-md ${
          playing
            ? 'border-white/20 bg-white/10 text-white/80 hover:text-white'
            : 'border-white/8 bg-[var(--color-surface)]/60 text-[var(--color-muted)] hover:text-[var(--color-text-primary)] hover:border-white/15'
        }`}
      >
        {/* Subtle pulse ring when playing */}
        {playing && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-white" style={{ animationDuration: '2.5s' }} />
        )}
        <span className="relative">
          {playing ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
        </span>
      </button>
    </>
  );
}
