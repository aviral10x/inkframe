import { useRef, useState } from 'react';
import { films } from '../data/films';
import { useWantsVideo } from '../hooks/useWantsVideo';

/* The montage cuts once per scene; the slate caption cuts with it */
const SCENE_SECONDS = 1.5;
const scenes = [...films].sort((a, b) => a.order - b.order);

/**
 * Act 1, the Opening Shot. One beat of darkness, then the title card
 * resolves over a trailer-style montage: one beat from every film on the
 * reel, with a live scene slate in the corner like a dailies reel.
 * Desktop pointers get the muted micro-loop; mobile and reduced-motion
 * get the still frame only. The entrance is pure CSS so it can never
 * stall on a busy main thread.
 */
export function Opening() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Micro-loop only for non-touch pointers without reduced-motion/data preferences
  const wantsVideo = useWantsVideo();
  const [videoReady, setVideoReady] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Poster still, the LCP element */}
      <picture>
        <source
          type="image/avif"
          srcSet="/previews/hero-poster-640.avif 640w, /previews/hero-poster-1280.avif 1280w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/previews/hero-poster-640.webp 640w, /previews/hero-poster-1280.webp 1280w"
          sizes="100vw"
        />
        <img
          src="/previews/hero-poster-1280.jpg"
          alt="Two figures close together at a candlelit bar, the opening frame of Alpha's Deal"
          width={1280}
          height={546}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>

      {/* Micro-loop fades in over the still once it can play */}
      {wantsVideo && (
        <video
          ref={videoRef}
          src="/previews/hero-montage.mp4"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          // Mounted after hydration, where the autoplay attribute alone can be ignored
          onCanPlay={(e) => {
            setVideoReady(true);
            e.currentTarget.play().catch(() => {});
          }}
          onTimeUpdate={(e) => {
            const i = Math.min(scenes.length - 1, Math.floor(e.currentTarget.currentTime / SCENE_SECONDS));
            setSceneIdx(i);
          }}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoReady ? 1 : 0 }}
        />
      )}

      {/* Scrims: center legibility + dissolve to ink at the bottom */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 48%, rgb(11 10 8 / 0.55), rgb(11 10 8 / 0.18) 60%, transparent)' }}
      />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/70 to-transparent" />

      {/* Title card */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="enter-title font-display italic text-display-xl text-bone">
          InkFrame Films
        </h1>

        <p
          className="enter-headline font-display text-bone mt-6 md:mt-8"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.125rem)' }}
        >
          Films that stay with you.
        </p>

        <p className="enter-subline text-bone/85 text-sm md:text-base max-w-md mt-5 leading-relaxed [text-shadow:0_1px_18px_rgb(11_10_8/0.9)]">
          Cinematic ads, character worlds, and launch films for brands.
        </p>
      </div>

      {/* The live slate: which film is on screen right now */}
      {wantsVideo && videoReady && (
        <p className="slate absolute bottom-10 left-6 md:left-12 z-10 text-bone/70 [text-shadow:0_1px_12px_rgb(11_10_8/0.9)]">
          SC.{String(sceneIdx + 1).padStart(2, '0')} · {scenes[sceneIdx].title}
        </p>
      )}

      {/* Scroll cue */}
      <a
        href="#work"
        aria-label="Scroll to the work"
        className="enter-late relative z-10 mx-auto mb-10 flex flex-col items-center gap-3"
      >
        <span className="slate text-bone-dim">Scroll</span>
        <span className="block w-px h-10 bg-hairline overflow-hidden">
          <span className="block w-full h-1/2 bg-seal animate-[cue_2.2s_ease-in-out_infinite]" />
        </span>
      </a>

      {/* The beat of darkness before the first frame */}
      <div className="enter-cover absolute inset-0 z-20 bg-ink pointer-events-none" />
    </section>
  );
}
