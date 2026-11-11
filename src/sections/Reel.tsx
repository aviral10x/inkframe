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

type Band =
  | { kind: 'scene'; films: [Film] }
  | { kind: 'strip'; films: Film[] }
  | { kind: 'cut'; films: Film[] }
  | { kind: 'pair'; films: [Film, Film] };

/**
 * Composes the reel from the ordered data, so the layout follows the order:
 *  - featured films (and any wide film left on its own) run full-width
 *  - consecutive vertical films (up to three) sit side by side as a strip
 *  - a lone vertical film stands beside its wide neighbour (the vertical cut)
 *  - two wide films become an offset pair
 */
function composeBands(ordered: Film[]): Band[] {
  const bands: Band[] = [];
  const free = (f?: Film) => !!f && !f.featured;
  let i = 0;

  while (i < ordered.length) {
    const film = ordered[i];
    const next = ordered[i + 1];

    if (film.featured) {
      bands.push({ kind: 'scene', films: [film] });
      i += 1;
      continue;
    }

    if (film.portrait) {
      const run: Film[] = [];
      while (run.length < 3 && free(ordered[i + run.length]) && ordered[i + run.length].portrait) {
        run.push(ordered[i + run.length]);
      }
      if (run.length >= 2) {
        bands.push({ kind: 'strip', films: run });
        i += run.length;
      } else if (free(next) && !next.portrait) {
        bands.push({ kind: 'cut', films: [film, next] });
        i += 2;
      } else {
        bands.push({ kind: 'cut', films: [film] });
        i += 1;
      }
      continue;
    }

    // A wide film: pair it with a wide neighbour, or stand it beside a lone vertical
    if (free(next) && !next.portrait) {
      bands.push({ kind: 'pair', films: [film, next] });
      i += 2;
      continue;
    }
    const after = ordered[i + 2];
    if (free(next) && next.portrait && !(free(after) && after.portrait)) {
      bands.push({ kind: 'cut', films: [film, next] });
      i += 2;
      continue;
    }
    bands.push({ kind: 'scene', films: [film] });
    i += 1;
  }

  return bands;
}

const NUMBER_WORDS = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
  'Eighteen', 'Nineteen', 'Twenty', 'Twenty-one', 'Twenty-two', 'Twenty-three',
  'Twenty-four', 'Twenty-five',
];
const countWord = (n: number) => NUMBER_WORDS[n] ?? String(n);

/**
 * Act 2, the Reel. An editorial sequence, not a grid: full-width scenes,
 * vertical strips, vertical cuts beside a wide scene, and offset pairs.
 * Rhythm over uniformity, and the layout composes itself from the data.
 */
export function Reel() {
  const headerRef = useReveal<HTMLElement>();
  const ordered = [...films].sort((a, b) => a.order - b.order);
  const bands = composeBands(ordered);
  const count = countWord(ordered.length);

  return (
    <section id="work" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-40">
      <header ref={headerRef} className="reveal max-w-[1480px] mx-auto mb-16 md:mb-24">
        <p className="slate text-seal">The Reel</p>
        <h2 className="font-display text-display-lg text-bone mt-4 max-w-3xl">
          {count} films, {count.toLowerCase()} different worlds.
        </h2>
        <p className="text-bone-dim text-base md:text-lg max-w-md mt-4 leading-relaxed">
          Open a scene to watch the film.
        </p>
      </header>

      <div className="max-w-[1480px] mx-auto flex flex-col gap-16 md:gap-24">
        {bands.map((band) => {
          const key = band.films.map((f) => f.slug).join('+');
          const scene = (film: Film, wide = false) => (
            <Scene film={film} index={ordered.indexOf(film)} wide={wide} />
          );

          // Full-width scene, one per viewport
          if (band.kind === 'scene') {
            return <div key={key}>{scene(band.films[0], true)}</div>;
          }

          // Vertical films side by side, the middle one dropped a beat.
          // On phones the strip becomes a swipe row, the next card peeking in.
          if (band.kind === 'strip') {
            return (
              <div
                key={key}
                className="flex gap-5 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 scroll-px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-6 md:gap-x-8 md:gap-y-16 md:overflow-visible md:mx-0 md:px-0"
              >
                {band.films.map((film, i) => (
                  <div
                    key={film.slug}
                    className={`shrink-0 w-[68vw] snap-start md:w-auto md:col-span-2 ${
                      band.films.length === 2 && i === 0 ? 'md:col-start-2' : ''
                    } ${band.films.length === 3 && i === 1 ? 'md:mt-20' : ''}`}
                  >
                    {scene(film)}
                  </div>
                ))}
              </div>
            );
          }

          // The vertical cut: a 9:16 film beside a wide scene, centered on it
          if (band.kind === 'cut') {
            return (
              <div key={key} className="grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-16 md:items-center">
                {band.films.map((film) => (
                  <div
                    key={film.slug}
                    className={
                      film.portrait
                        ? `w-[78%] md:w-auto md:col-span-2 ${band.films.length === 1 ? 'md:col-start-2' : ''}`
                        : 'md:col-span-3'
                    }
                  >
                    {scene(film)}
                  </div>
                ))}
              </div>
            );
          }

          // The pair, offset for editorial rhythm
          return (
            <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {band.films.map((film, i) => (
                <div key={film.slug} className={i % 2 === 1 ? 'md:mt-20' : ''}>
                  {scene(film)}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
