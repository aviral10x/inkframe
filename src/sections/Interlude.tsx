import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { useWantsVideo } from '../hooks/useWantsVideo';

/**
 * The Interlude. One establishing shot between the reel and the method:
 * full-bleed, silent, looping. Desktop pointers get the motion; mobile,
 * reduced-motion, and save-data get the still. The loop only runs while
 * the band is on screen, and only loads once it is near it.
 */
export function Interlude() {
  const copyRef = useReveal<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsVideo = useWantsVideo();
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: '120px 0px' }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [wantsVideo]);

  return (
    <section aria-label="Interlude" className="relative h-[52vh] md:h-[74vh] overflow-hidden flex items-center justify-center">
      {/* The still, always present under the loop */}
      <picture>
        <source
          type="image/avif"
          srcSet="/previews/interlude-poster-640.avif 640w, /previews/interlude-poster-1280.avif 1280w"
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet="/previews/interlude-poster-640.webp 640w, /previews/interlude-poster-1280.webp 1280w"
          sizes="100vw"
        />
        <img
          src="/previews/interlude-poster-1280.jpg"
          alt="A balcony high above Dubai facing the skyline, from The Residence"
          loading="lazy"
          width={1280}
          height={720}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>

      {wantsVideo && (
        <video
          ref={videoRef}
          src="/previews/interlude.mp4"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoReady ? 1 : 0 }}
        />
      )}

      {/* Scrims: dissolve into ink at both cuts, deepen behind the copy.
          Type over photography is bone only: seal cannot hold AA off pure ink. */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 68% 58% at 50% 50%, rgb(11 10 8 / 0.72), rgb(11 10 8 / 0.3) 62%, rgb(11 10 8 / 0.12))' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 44% 32% at 50% 50%, rgb(11 10 8 / 0.85), transparent 72%)' }}
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      {/* One line, like a chapter card */}
      <div ref={copyRef} className="reveal relative z-10 text-center px-6">
        <p className="slate text-bone [text-shadow:0_1px_14px_rgb(11_10_8/0.9)]">Interlude</p>
        <h2 className="font-display italic text-display-lg text-bone mt-4 [text-shadow:0_1px_24px_rgb(11_10_8/0.85)]">
          Every brief is a new world.
        </h2>
      </div>
    </section>
  );
}
