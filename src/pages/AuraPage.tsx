import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { auraProfileUrl, auraStats, auraStory, episodeAsset, episodes, type Episode } from '../data/aura';
import { useReveal } from '../hooks/useReveal';
import { useWantsVideo } from '../hooks/useWantsVideo';

/**
 * One episode, staged like a feed post. Hover or focus plays the silent
 * loop; a click plays the full episode in place, with sound. Only one
 * episode is active at a time: activating a card returns its siblings to
 * their posters, so soundtracks never overlap.
 */
function EpisodeCard({
  episode,
  active,
  onActivate,
}: {
  episode: Episode;
  active: boolean;
  onActivate: () => void;
}) {
  const ref = useReveal<HTMLDivElement>();
  const previewRef = useRef<HTMLVideoElement>(null);
  const fullRef = useRef<HTMLVideoElement>(null);
  // The canplay kick runs once per activation; re-fires after seeks must not
  // override a user's pause
  const autoplayed = useRef(false);
  const wantsPreview = useWantsVideo();
  const [previewing, setPreviewing] = useState(false);
  const asset = episodeAsset(episode);

  const preview = useCallback(() => {
    // Posters only under reduced-motion or save-data
    if (!wantsPreview) return;
    const v = previewRef.current;
    if (!v) return;
    v.muted = true;
    v.play().then(() => setPreviewing(true)).catch(() => {});
  }, [wantsPreview]);

  const stopPreview = useCallback(() => {
    const v = previewRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    setPreviewing(false);
  }, []);

  function start() {
    stopPreview();
    onActivate();
  }

  // Keep keyboard users on the player when the button swaps out under them
  useEffect(() => {
    if (active) fullRef.current?.focus();
    else autoplayed.current = false;
  }, [active]);

  return (
    <div ref={ref} className="reveal">
      <div className="relative overflow-hidden bg-ink-raised aspect-[9/16]">
        {active ? (
          <video
            ref={fullRef}
            src={asset.videoUrl}
            poster={asset.poster}
            controls
            controlsList="nodownload"
            playsInline
            preload="auto"
            autoPlay
            aria-label={`${episode.title}, an Aura episode`}
            onCanPlay={(e) => {
              if (autoplayed.current) return;
              autoplayed.current = true;
              e.currentTarget.play().catch(() => {});
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={start}
            onMouseEnter={preview}
            onMouseLeave={stopPreview}
            onFocus={preview}
            onBlur={stopPreview}
            aria-label={`Play ${episode.title}`}
            className="group absolute inset-0 cursor-pointer"
          >
            <img
              src={asset.poster}
              alt={`Still from the Aura episode ${episode.title}`}
              loading="lazy"
              width={720}
              height={1280}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: previewing ? 0 : 1 }}
            />
            <video
              ref={previewRef}
              src={asset.previewClip}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: previewing ? 1 : 0 }}
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center w-14 h-14 rounded-full border border-bone/60 bg-ink/30 group-hover:border-seal transition-colors duration-300">
                <span className="block w-0 h-0 ml-1 border-y-[8px] border-y-transparent border-l-[13px] border-l-bone group-hover:border-l-seal transition-colors duration-300" />
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="mt-4">
        <p className="slate text-bone-dim">Episode · 15s</p>
        <h3 className="font-display italic text-title text-bone mt-1">{episode.title}</h3>
        <p className="text-bone-dim text-sm leading-relaxed mt-2">{episode.logline}</p>
      </div>
    </div>
  );
}

/**
 * The case study: how an original character went from zero to 450M views
 * in 75 days. Same act grammar as the homepage, one page deep.
 */
export function AuraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wantsVideo = useWantsVideo();
  const [videoReady, setVideoReady] = useState(false);
  // One episode with sound at a time
  const [activeEpisode, setActiveEpisode] = useState<string | null>(null);
  const headRef = useReveal<HTMLDivElement>();
  const statsRef = useReveal<HTMLDivElement>();
  const storyRef = useReveal<HTMLDivElement>();
  const epHeadRef = useReveal<HTMLElement>();
  const filmRef = useReveal<HTMLDivElement>();
  const ctaRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    document.title = 'Aura Kid Case Study | InkFrame Films';
    return () => {
      document.title = 'InkFrame Films | A Film Studio for Brands';
    };
  }, []);

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
    <main className="min-h-screen">
      {/* The opening shot: the world of Aura */}
      <section className="relative h-[64vh] md:h-[78vh] overflow-hidden flex items-end">
        <img
          src="/previews/aura-trailer.jpg"
          alt="Aura, a wide-eyed animated baby, mid-adventure in a mall"
          fetchPriority="high"
          width={1280}
          height={720}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {wantsVideo && (
          <video
            ref={videoRef}
            src="/previews/aura-trailer.mp4"
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
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-ink via-ink/75 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/70 to-transparent" />

        <div ref={headRef} className="reveal relative z-10 w-full px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
          <div className="max-w-[1480px] mx-auto">
            <p className="slate text-bone [text-shadow:0_1px_14px_rgb(11_10_8/0.9)]">
              Case Study · Character IP
            </p>
            <h1 className="font-display italic text-display-xl text-bone mt-3">Aura Kid</h1>
            <p className="text-bone/90 text-base md:text-lg max-w-xl mt-4 leading-relaxed [text-shadow:0_1px_18px_rgb(11_10_8/0.9)]">
              An original character, built and grown by InkFrame. Zero to 413K followers and
              450M views in 75 days.
            </p>
            <a
              href={auraProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="slate text-bone-dim hover:text-seal transition-colors duration-300 inline-block mt-5"
            >
              @aurakidzzz on Instagram ↗
            </a>
          </div>
        </div>
      </section>

      {/* The numbers */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div
          ref={statsRef}
          className="reveal max-w-[1480px] mx-auto grid grid-cols-2 md:grid-cols-4 border-y border-hairline divide-y-0 md:divide-x divide-[var(--color-hairline)]"
        >
          {auraStats.map((stat) => (
            <div key={stat.label} className="py-8 md:py-14 md:px-10 first:md:pl-0">
              <div className="font-display italic text-display-lg text-bone">{stat.value}</div>
              <div className="slate text-bone-dim mt-3">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* How it worked, in three lines */}
        <div ref={storyRef} className="reveal max-w-[1480px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-14 md:mt-20">
          {auraStory.map((s) => (
            <div key={s.lead}>
              <p className="slate text-seal">{s.lead}</p>
              <p className="text-bone text-base md:text-lg leading-relaxed mt-3 max-w-sm">{s.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The episodes */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <header ref={epHeadRef} className="reveal max-w-[1480px] mx-auto mb-12 md:mb-16">
          <p className="slate text-seal">The Episodes</p>
          <h2 className="font-display text-display-lg text-bone mt-4 max-w-3xl">
            Small chaos, shipped daily.
          </h2>
          <p className="text-bone-dim text-base md:text-lg max-w-md mt-4 leading-relaxed">
            Four episodes from the run. Hover to preview, tap to watch with sound.
          </p>
        </header>
        <div className="max-w-[1480px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {episodes.map((e) => (
            <EpisodeCard
              key={e.slug}
              episode={e}
              active={activeEpisode === e.slug}
              onActivate={() => setActiveEpisode(e.slug)}
            />
          ))}
        </div>
      </section>

      {/* The film that opened the world */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div ref={filmRef} className="reveal max-w-[1480px] mx-auto">
          <Link to="/film/aura-trailer" className="group block">
            <div className="relative overflow-hidden bg-ink-raised aspect-[21/10]">
              <img
                src="/previews/aura-trailer.jpg"
                alt="Still from Aura, the brand trailer"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <span className="slate absolute bottom-4 right-4 text-seal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Watch
              </span>
            </div>
            <div className="mt-4 md:mt-5">
              <p className="slate text-bone-dim">AuraKidzzz · Brand Trailer · 2026</p>
              <h3 className="font-display italic text-title text-bone mt-2 group-hover:text-seal transition-colors duration-400">
                Aura
              </h3>
              <p className="text-bone-dim text-sm md:text-base leading-relaxed max-w-xl mt-2">
                The trailer that opened the world: one sneeze of destiny, one mall, one scheming villain.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* The closing frame */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-28 md:pb-40">
        <div ref={ctaRef} className="reveal max-w-[1480px] mx-auto text-center">
          <h2 className="font-display italic text-display-lg text-bone">Want a world of your own?</h2>
          <p className="text-bone-dim text-base md:text-lg mt-4 max-w-md mx-auto leading-relaxed">
            Characters, films, and the cadence to grow them. One team, end to end.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6">
            <Link
              to="/#contact"
              className="bg-bone text-ink text-sm font-medium px-10 py-4 hover:bg-seal transition-colors duration-300"
            >
              Start a character
            </Link>
            <Link to="/#work" className="slate text-bone-dim hover:text-bone transition-colors duration-300">
              Back to the reel
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
