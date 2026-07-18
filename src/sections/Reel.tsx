import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { films, type Film } from '../data/films';
import { useReveal } from '../hooks/useReveal';
import { useWantsVideo } from '../hooks/useWantsVideo';

/**
 * One film, staged as a scene. Slate metadata like a clapperboard,
 * a logline like a synopsis. Hover or focus plays the silent preview;
 * click opens the watch page. Portrait films keep their 9:16 frame.
 */
function Scene({ film, index, wide }: { film: Film; index: number; wide: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsPreview = useWantsVideo();
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    // Posters only under reduced-motion or save-data
    if (!wantsPreview) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().then(() => setPlaying(true)).catch(() => {});
  }, [wantsPreview]);

  const stop = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    setPlaying(false);
  }, []);

  return (
    <div ref={ref} className="reveal">
      <Link
        to={`/film/${film.slug}`}
        aria-label={`Watch ${film.title}, ${film.format}, ${film.year}`}
        className="group block"
        onMouseEnter={play}
        onMouseLeave={stop}
        onFocus={play}
        onBlur={stop}
      >
        {/* The shot */}
        <div
          className={`relative overflow-hidden bg-ink-raised ${
            film.portrait ? 'aspect-[9/16]' : wide ? 'aspect-[21/10]' : 'aspect-[16/10]'
          }`}
        >
          <img
            src={film.thumbnail}
            alt={`Still from ${film.title}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 w-full h-full object-cover transition-[transform,opacity] duration-700 ease-out"
            style={{ opacity: playing ? 0 : 1, transform: playing ? 'scale(1.02)' : 'scale(1)' }}
          />
          <video
            ref={videoRef}
            src={film.previewClip}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: playing ? 1 : 0 }}
          />

          {/* Scene number, slate corner */}
          <span className="slate absolute top-4 right-4 text-bone/50">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Watch mark, appears on hover/focus */}
          <span
            className="slate absolute bottom-4 right-4 text-seal transition-opacity duration-300"
            style={{ opacity: playing ? 1 : 0 }}
          >
            Watch
          </span>

        </div>

        {/* The slate */}
        <div className="mt-4 md:mt-5 flex items-baseline justify-between gap-6">
          <div>
            <p className="slate text-bone-dim">
              {film.client} · {film.format} · {film.year}
            </p>
            <h3 className="font-display italic text-title text-bone mt-2 group-hover:text-seal transition-colors duration-400">
              {film.title}
            </h3>
            <p className="text-bone-dim text-sm md:text-base leading-relaxed max-w-xl mt-2">
              {film.logline}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * Act 2, the Reel. An editorial sequence: featured films run full-width,
 * the rest sit in bands of two. A band holding a portrait film stages it
 * as the vertical cut beside a wide scene; the others offset like spreads.
 * Rhythm over uniformity, and the layout composes itself from the data.
 */
export function Reel() {
  const headerRef = useReveal<HTMLElement>();
  const ordered = [...films].sort((a, b) => a.order - b.order);
  const featured = ordered.filter((f) => f.featured);
  const rest = ordered.filter((f) => !f.featured);

  const bands: Film[][] = [];
  for (let i = 0; i < rest.length; i += 2) bands.push(rest.slice(i, i + 2));

  return (
    <section id="work" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-40">
      <header ref={headerRef} className="reveal max-w-[1480px] mx-auto mb-16 md:mb-24">
        <p className="slate text-seal">The Reel</p>
        <h2 className="font-display text-display-lg text-bone mt-4 max-w-3xl">
          Six films, six different worlds.
        </h2>
        <p className="text-bone-dim text-base md:text-lg max-w-md mt-4 leading-relaxed">
          Open a scene to watch the film.
        </p>
      </header>

      <div className="max-w-[1480px] mx-auto flex flex-col gap-16 md:gap-24">
        {/* Featured scenes, full width, one per viewport */}
        {featured.map((film) => (
          <Scene key={film.slug} film={film} index={ordered.indexOf(film)} wide />
        ))}

        {bands.map((band) => {
          const key = band.map((f) => f.slug).join('+');

          // The vertical cut: a 9:16 film beside a wide scene, centered on it
          if (band.length === 2 && band.some((f) => f.portrait)) {
            return (
              <div key={key} className="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-16 md:items-center">
                {band.map((film) => (
                  <div key={film.slug} className={film.portrait ? 'md:col-span-2' : 'md:col-span-3'}>
                    <Scene film={film} index={ordered.indexOf(film)} wide={false} />
                  </div>
                ))}
              </div>
            );
          }

          // The pair, offset for editorial rhythm
          return (
            <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {band.map((film, i) => (
                <div key={film.slug} className={i % 2 === 1 ? 'md:mt-20' : ''}>
                  <Scene film={film} index={ordered.indexOf(film)} wide={false} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
