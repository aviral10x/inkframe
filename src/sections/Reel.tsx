import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { filmKinds, films, type Film, type FilmKind } from '../data/films';
import { useReveal } from '../hooks/useReveal';
import { useWantsVideo } from '../hooks/useWantsVideo';
import { playFilm, setSoundOn, stopFilm } from '../lib/playback';

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

/** Poster sizes per layout slot, so phones never download desktop stills */
const POSTER_SIZES = {
  wide: '(min-width: 768px) 92vw, 100vw',
  half: '(min-width: 768px) 46vw, 100vw',
  portrait: '(min-width: 768px) 30vw, 70vw',
} as const;

function Poster({ film, slot, eager, hidden }: { film: Film; slot: keyof typeof POSTER_SIZES; eager: boolean; hidden: boolean }) {
  const base = film.thumbnail.replace(/\.jpg$/, '');
  // -sm / -lg webp are 640 / 1280 wide (360 / 720 for vertical films)
  const [sm, lg] = film.portrait ? [360, 720] : [640, 1280];
  return (
    <picture>
      <source type="image/webp" srcSet={`${base}-sm.webp ${sm}w, ${base}-lg.webp ${lg}w`} sizes={POSTER_SIZES[slot]} />
      <img
        src={film.thumbnail}
        alt={`Still from ${film.title}`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-[transform,opacity] duration-700 ease-out"
        style={{ opacity: hidden ? 0 : 1, transform: hidden ? 'scale(1.02)' : 'scale(1)' }}
      />
    </picture>
  );
}

/**
 * One film, staged as a scene. Slate metadata like a clapperboard, a
 * logline like a synopsis. On desktop, hovering plays the whole film in
 * place, with sound once the browser allows it, and it resumes where it
 * left off. Click opens the watch page at the same moment.
 */
function Scene({ film, index, wide }: { film: Film; index: number; wide: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsVideo = useWantsVideo();
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState({ t: 0, d: 0 });
  const hovering = useRef(false);

  // Fetch the film's header (not the film) once the card is close to view
  useEffect(() => {
    const el = ref.current;
    if (!el || !wantsVideo) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setNear(true);
        io.disconnect();
      }
    }, { rootMargin: '600px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, wantsVideo]);

  const start = useCallback(async ({ sound = true } = {}) => {
    const v = videoRef.current;
    if (!v || !wantsVideo) return;
    hovering.current = true;
    const result = await playFilm(v, { sound });
    if (!hovering.current) return stopFilm(v);
    setMuted(v.muted);
    setPlaying(result !== 'failed');
  }, [wantsVideo]);

  const stop = useCallback(() => {
    hovering.current = false;
    const v = videoRef.current;
    if (v) stopFilm(v);
    setPlaying(false);
  }, []);

  // Follows the element itself, so a gesture that unmutes mid-play updates the chip
  const audible = playing && !muted;
  const slot = film.portrait ? 'portrait' : wide ? 'wide' : 'half';

  return (
    <div
      ref={ref}
      className="reveal relative group"
      onMouseEnter={() => start()}
      onMouseLeave={stop}
    >
      <Link
        to={`/film/${film.slug}`}
        state={{ t: progress.t, autoplay: true }}
        aria-label={`Watch ${film.title}, ${film.format}, ${film.year}`}
        className="block"
        onFocus={() => start({ sound: false })}
        onBlur={stop}
      >
        {/* The shot */}
        <div
          className={`relative overflow-hidden bg-ink-raised ${
            film.portrait ? 'aspect-[9/16]' : wide ? 'aspect-[21/10]' : 'aspect-[16/10]'
          }`}
        >
          <Poster film={film} slot={slot} eager={index === 0} hidden={playing} />
          {wantsVideo && (
            <video
              ref={videoRef}
              src={film.fullVideoUrl}
              playsInline
              preload={near ? 'metadata' : 'none'}
              aria-hidden="true"
              tabIndex={-1}
              onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
              onTimeUpdate={(e) => setProgress({ t: e.currentTarget.currentTime, d: e.currentTarget.duration || 0 })}
              onEnded={(e) => {
                e.currentTarget.currentTime = 0;
                setPlaying(false);
              }}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: playing ? 1 : 0 }}
            />
          )}

          {/* Scene number, slate corner */}
          <span className="slate absolute top-4 right-4 text-bone/50">{String(index + 1).padStart(2, '0')}</span>

          {/* Running time while it plays */}
          <span
            className="slate absolute bottom-4 left-4 text-bone/80 tabular-nums transition-opacity duration-300 [text-shadow:0_1px_10px_rgb(11_10_8/0.9)]"
            style={{ opacity: playing && progress.d ? 1 : 0 }}
          >
            {clock(progress.t)} / {clock(progress.d)}
          </span>

          {/* Watch mark */}
          <span
            className="slate absolute bottom-4 right-4 text-seal transition-opacity duration-300 [text-shadow:0_1px_10px_rgb(11_10_8/0.9)]"
            style={{ opacity: playing ? 1 : 0 }}
          >
            Watch full screen
          </span>

          {/* The playhead */}
          <span
            aria-hidden="true"
            className="absolute left-0 bottom-0 h-px bg-seal transition-opacity duration-300"
            style={{ width: `${progress.d ? (progress.t / progress.d) * 100 : 0}%`, opacity: playing ? 1 : 0 }}
          />
        </div>

        {/* The slate */}
        <div className="mt-4 md:mt-5">
          <p className="slate text-bone-dim">
            {film.client} · {film.format} · {film.year}
          </p>
          <h3 className="font-display italic text-title text-bone mt-2 group-hover:text-seal transition-colors duration-400">
            {film.title}
          </h3>
          <p className="text-bone-dim text-sm md:text-base leading-relaxed max-w-xl mt-2">{film.logline}</p>
        </div>
      </Link>

      {/* Sound, outside the link so it never opens the film */}
      {wantsVideo && (
        <button
          type="button"
          onClick={() => setSoundOn(!audible)}
          className="slate absolute top-3 left-3 px-2.5 py-1.5 bg-ink/70 backdrop-blur-sm border border-hairline text-bone hover:text-seal transition-[opacity,color] duration-300"
          style={{ opacity: playing ? 1 : 0, pointerEvents: playing ? 'auto' : 'none' }}
          aria-label={audible ? 'Mute sound' : 'Turn sound on'}
        >
          {audible ? 'Sound on' : 'Click for sound'}
        </button>
      )}
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
 * Filters narrow it to brand, narrative, or animation work; the layout
 * recomposes itself from whatever is left.
 */
export function Reel() {
  const headerRef = useReveal<HTMLElement>();
  const [kind, setKind] = useState<FilmKind | 'all'>('all');
  const ordered = [...films].sort((a, b) => a.order - b.order);
  const shown = kind === 'all' ? ordered : ordered.filter((f) => f.kinds.includes(kind));
  const bands = composeBands(shown);
  const count = countWord(ordered.length);

  return (
    <section id="work" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-40">
      <header ref={headerRef} className="reveal max-w-[1480px] mx-auto mb-12 md:mb-20">
        <p className="slate text-seal">The Reel</p>
        <h2 className="font-display text-display-lg text-bone mt-4 max-w-3xl">
          {count} films, {count.toLowerCase()} different worlds.
        </h2>
        <p className="text-bone-dim text-base md:text-lg max-w-md mt-4 leading-relaxed">
          Hover a scene to play it with sound. Open it to watch full screen.
        </p>

        {/* Filters */}
        <div role="group" aria-label="Filter the reel" className="flex flex-wrap gap-2 mt-8">
          {filmKinds.map((k) => {
            const n = k.kind === 'all' ? ordered.length : ordered.filter((f) => f.kinds.includes(k.kind as FilmKind)).length;
            const on = kind === k.kind;
            return (
              <button
                key={k.kind}
                type="button"
                aria-pressed={on}
                onClick={() => setKind(k.kind)}
                className={`slate px-4 py-2 border transition-colors duration-300 ${
                  on ? 'bg-bone text-ink border-bone' : 'text-bone-dim border-hairline hover:text-bone hover:border-bone/40'
                }`}
              >
                {k.label} <span className={on ? 'text-ink/60' : 'text-bone-dim/60'}>{n}</span>
              </button>
            );
          })}
        </div>
      </header>

      <div key={kind} className="max-w-[1480px] mx-auto flex flex-col gap-16 md:gap-24">
        {bands.map((band) => {
          const key = band.films.map((f) => f.slug).join('+');
          const scene = (film: Film, wide = false) => (
            <Scene film={film} index={shown.indexOf(film)} wide={wide} />
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
