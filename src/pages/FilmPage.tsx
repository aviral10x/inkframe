import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { filmBySlug, nextFilm, type Film } from '../data/films';

/**
 * The screen itself. Keyed by film slug from the parent, so switching
 * films remounts it with a fresh poster state. Playback starts on a real
 * click, with sound. Portrait films get a 9:16 screen held to the
 * viewport height; everything else letterboxes at 16:9.
 */
function Player({ film }: { film: Film }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function start() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().then(() => setStarted(true)).catch(() => {});
  }

  return (
    <div
      className={`relative bg-black overflow-hidden border border-hairline ${
        film.portrait ? 'mx-auto' : 'aspect-video'
      }`}
      // Width-driven so the 9:16 ratio holds even when narrow phones clamp it
      style={
        film.portrait
          ? { aspectRatio: '9 / 16', width: 'min(100%, calc(min(76vh, 52rem) * 9 / 16))' }
          : undefined
      }
    >
      <video
        ref={videoRef}
        src={film.fullVideoUrl}
        poster={film.thumbnail}
        preload="metadata"
        controls={started}
        controlsList="nodownload"
        playsInline
        className="absolute inset-0 w-full h-full object-contain"
      />
      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={`Play ${film.title}`}
          className="group absolute inset-0 flex items-center justify-center cursor-pointer"
        >
          <span className="absolute inset-0 bg-ink/30 group-hover:bg-ink/15 transition-colors duration-500" />
          <span className="relative flex items-center justify-center w-20 h-20 rounded-full border border-bone/60 group-hover:border-seal transition-colors duration-300">
            <span className="block w-0 h-0 ml-1.5 border-y-[11px] border-y-transparent border-l-[18px] border-l-bone group-hover:border-l-seal transition-colors duration-300" />
          </span>
        </button>
      )}
    </div>
  );
}

/**
 * The watch page. A letterboxed player with the slate above it and the
 * synopsis below.
 */
export function FilmPage() {
  const { slug = '' } = useParams();
  const film = filmBySlug(slug);

  useEffect(() => {
    if (!film) return;
    document.title = `${film.title} | InkFrame Films`;
    return () => {
      document.title = 'InkFrame Films | A Film Studio for Brands';
    };
  }, [film]);

  if (!film) return <Navigate to="/" replace />;
  const next = nextFilm(film.slug);

  return (
    <main className="min-h-screen px-6 md:px-12 lg:px-20 pt-24 md:pt-28 pb-20">
      <div className="max-w-[1280px] mx-auto">
        {/* Slate row */}
        <div className="flex items-baseline justify-between gap-6 mb-6">
          <Link to="/#work" className="slate text-bone-dim hover:text-bone transition-colors duration-300">
            Back to the reel
          </Link>
          <p className="slate text-bone-dim hidden sm:block">
            {film.client} · {film.format} · {film.year}
          </p>
        </div>

        <Player key={film.slug} film={film} />

        {/* Below the screen */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
          <div>
            <h1 className="font-display italic text-display-lg text-bone">{film.title}</h1>
            <p className="text-bone-dim text-base md:text-lg leading-relaxed max-w-2xl mt-4">
              {film.logline}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {film.tags.map((tag) => (
                <span key={tag} className="slate text-bone-dim border border-hairline px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Link
            to={`/film/${next.slug}`}
            className="group slate text-bone-dim hover:text-bone transition-colors duration-300 md:text-right"
          >
            Next scene
            <span className="block font-display italic normal-case tracking-normal text-title text-bone group-hover:text-seal transition-colors duration-300 mt-1">
              {next.title}
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
