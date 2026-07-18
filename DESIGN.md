# InkFrame Films — Design System & Narrative Architecture

Phase 1 + 2 plan. Positioning: **cinema-first** ("a film studio for brands"); AI is the *how*, told in the Method act.
Concept: **a frame of film being inked into existence.** Ink = the palette, the copy register, the darkness between cuts. Frame = the signature element, the slate metadata, the composition grid.

---

## 1. The five-act scroll (homepage)

| Act | Component | What happens | Replaces |
|---|---|---|---|
| 1. Opening Shot | `Opening.tsx` | One beat of near-black; the frame draws in; title card "InkFrame Films" resolves; headline "Films that stay with you."; subline carries commerce ("Cinematic ads, character worlds, and launch films for brands"); single scroll cue. Background: a trailer-style montage, one beat per film on the reel, with a live scene slate in the corner (muted micro-loop on desktop, still image on mobile). | Hero + rotating roles widget |
| 2. The Reel | `Reel.tsx` | Editorial sequence, not a grid. Each film is a scene: slate line in mono (`CLIENT · FORMAT · YEAR`), film title in display serif, one-line logline written as synopsis. Rhythm: full-width scene → offset pair → vertical-cut band (a 9:16 film beside a wide scene). Hover = silent preview (kept). Click = full watch view at `/film/<slug>` (linkable, indexable). | SelectedWorks + modal |
| — Interlude | `Interlude.tsx` | One establishing shot between the reel and the method: full-bleed silent loop (The Residence balcony, ping-ponged), one line ("Every brief is a new world."). Same media gating as the Opening; type over photography is bone only, since seal cannot hold AA off pure ink. | (new) |
| 3. The Method | `Method.tsx` | The offer as filmmaking process: **Concept → World → Frames → Cut → Launch**. Each stage: one sentence, deliverables as quiet mono metadata. This is where "AI-first pipeline" is said plainly. | Journal/"Campaign Systems" cards |
| 4. The Proof | `Proof.tsx` | Short and confident: 450M views in 75 days, 62+ films delivered, 413K followers built from zero (real numbers from the Aura run) + three lines: speed of iteration, cinematic quality, end-to-end (concept → posting-ready) + a quiet link to the `/aurakidzzz` case study. No carousels. | (currently missing; mounts the orphaned Stats data) |
| 5. Closing Frame | `Close.tsx` | Cut to near-black. One line: "Have a story?" One action: the inquiry form (Web3Forms kept). Footer styled as end credits: roles and names in mono, socials as quiet footnotes. | Contact + marquee |

Persistent: `Frame.tsx` (signature element, below) and a minimal top bar (wordmark + Work / Method / Contact as quiet text links; the pill nav and separate audio button go away).

**Removed entirely:** ambient Pixabay audio + toggle (cinema is silent until a film plays; also removes a third-party dependency), FloatingCTA (the frame + credits CTA do this job), rotating-word widget, "CINEMATIC AI VIDEO" marquee, per-film accent colors (one accent system-wide).

## 2. Data layer (Phase 1 contract)

`src/data/films.ts` — adding a film is a data change only:

```ts
type Film = {
  slug: string;          // route + asset basename
  title: string;
  client: string;        // 'Independent' for originals
  year: string;
  format: string;        // 'Narrative Short' | 'Brand Trailer' | ...
  logline: string;       // written like a synopsis, not a deliverable
  tags: string[];
  thumbnail: string;     // /previews/<slug>.jpg
  previewClip: string;   // /previews/<slug>.mp4  (muted hover loop, ≤2MB)
  fullVideoUrl: string;  // /videos/<slug>.mp4
  featured: boolean;     // featured films render full-width scenes
  portrait?: boolean;    // 9:16 films: staged vertical in the reel, 9:16 screen on the watch page
  order: number;
}
```

Current films: alphas-deal (featured), aura-trailer (featured), ferrari-concept, theft, drools (portrait), the-residence. SLOT-ready for the films you'll supply. Existing `/videos/*` and `/previews/*` URLs unchanged.

## 3. Palette (6 tokens, used everywhere)

Warm ink, not blue-tech dark. Exact values tuned against AA contrast during build.

| Token | Value (start) | Role |
|---|---|---|
| `--ink` | `#0B0A08` (warm near-black) | page ground, the darkness between cuts |
| `--ink-raised` | `#161310` | cards, form fields, raised surfaces |
| `--bone` | `#EAE3D6` | primary type, the paper light |
| `--bone-dim` | `#A89F8D` | secondary type, loglines, labels (AA on ink) |
| `--seal` | `#D9512F` vermilion | THE accent: slate kickers, hover states, focus rings, the scroll playhead. Never body text. Brightened from #C2391F so 11px slate text passes AA (4.7:1 on ink). |
| `--hairline` | `bone @ 12%` | the frame, rules, strokes |

Rationale for vermilion: seal-stamp red is how ink signs a finished work; it is cinematic (title cards, Kurosawa, fashion editorial) and unmistakably not the acid-green/blue of AI-tool sites. Used scarcely it reads like a stamp of authorship. Alternative on the table: deep indigo ink-bloom (`#3E4C7A` family) — moodier, but risks reading "generic dark blue tech" and sits too close to the slate-blue gradient we're deleting.

## 4. Typography (3 faces, self-hosted via @fontsource, preloaded)

| Register | Face | Usage |
|---|---|---|
| Display | **Bodoni Moda** (italic for titles) | Hero title card, act titles, film titles only. Fashion-didone = film title cards. Never under 28px (hairline serifs die small on dark). |
| Body | **Geist** | Loglines, sentences, form. Quiet, precise, not Inter-default. |
| Slate/mono | **IBM Plex Mono** | `CLIENT · FORMAT · YEAR` slates, deliverable metadata, credits footer, nav links. The clapperboard register. Uppercase, tracked +0.16em, 11–12px. |

Type scale (clamp-based): `display-xl` 56→120px (hero), `display-lg` 40→72px (act titles), `title` 28→48px (film titles), `body` 16px/1.7, `small` 14px, `slate` 11px caps. Google Fonts CDN dropped (self-host = no render-blocking third-party CSS).

## 5. Signature element (the ONE): the persistent frame

A fixed, 1px `--hairline` frame inset ~16px (24px desktop) around the viewport with slate corner ticks — every viewport is literally a framed shot. It responds to scroll: imperceptibly tightens during scenes and opens at act boundaries (2–3px shifts, transform-only); a small `--seal` tick travels along the frame edge as a scroll-progress indicator (the "playhead"). At `/film/` watch pages the frame letterboxes to the player. Static under `prefers-reduced-motion`; pure CSS/transforms, zero canvas, zero filters.

Why not the alternatives: the ink-reveal (SVG turbulence on titles) runs once and is gone, and SVG filters on text are jank-prone on mobile Safari; letterbox-bar section transitions fight natural scrolling on touch. The frame is omnipresent brand grammar at near-zero perf cost. Ink still gets its moment: the hero title card resolves from a soft defocus/darkness beat (CSS only, once, fast) — but the *system* element is the frame.

## 6. Motion rules

- Reveals are **cuts and dissolves**: opacity + ≤12px translate, `cubic-bezier(0.22, 1, 0.36, 1)`, 0.5–0.8s. No springs on text, no bounces, no parallax.
- One orchestrated entrance (hero title-card timing: darkness beat ~400ms → frame draws → title resolves → subline fades). After that, restraint: each act gets one reveal, elements within it stagger ≤80ms.
- `prefers-reduced-motion`: all reveals become instant opacity; loops/previews show posters; frame is static. Implemented centrally (global CSS media block + matchMedia guards), not per-component.
- **Zero animation libraries shipped.** GSAP and framer-motion are both removed. The hero entrance is CSS keyframes (cannot stall on a busy main thread). Scroll reveals are a 25-line IntersectionObserver hook adding `.revealed`, with the hidden pre-reveal state scoped to `@media (scripting: enabled)` so prerendered HTML stays fully visible to crawlers and no-JS users. The frame playhead is a passive scroll listener.

## 7. Performance budget & video strategy

- **hls.js and Mux are removed.** Hero uses a local ≤1.5MB muted micro-loop (`/previews/hero-montage.mp4`, a 9s six-beat montage of the reel with a live scene slate) on desktop pointers only; mobile and reduced-motion/data get a high-quality AVIF/WebP still. LCP element becomes that poster image, preloaded on the homepage only → LCP < 2.5s achievable.
- Hover previews: existing local MP4s (0.3–1.5MB ✓), `preload="none"` until first pointer intent (fixes mobile fetching videos it can never hover).
- Full films load only on the `/film/` watch page, `preload="metadata"`, poster shown instantly.
- Posters: generate AVIF + WebP + JPG fallback at 1280w and 640w (`<picture>`/`srcset`).
- Bundle target: **< 250KB gzip total JS** (from 295KB gzip + dead weight). Removing hls.js (~520KB min) + GSAP (~70KB) does most of it; `/film` route lazy-loaded.
- CLS ≈ 0: every media slot has aspect-ratio reserved.

## 8. SEO plan (hard requirement)

- Add react-router (already installed, currently dead) with routes `/`, `/film/<slug>`, and `/aurakidzzz` (the character IP case study).
- **Build-time prerender:** postbuild Node script renders each route via `react-dom/server` into real HTML (`dist/index.html`, `dist/film/<slug>/index.html`) — search engines and link unfurlers see full content; the SPA hydrates on top. No framework migration.
- Per-route meta: unique title/description, canonical, OpenGraph + Twitter cards; per-film OG image (1200×630 generated from poster frames via ffmpeg script in `scripts/`).
- JSON-LD: `Organization` (site) + `VideoObject` per film (name, description, thumbnailUrl, contentUrl, uploadDate).
- `sitemap.xml` + `robots.txt` generated in the same postbuild step.
- Vercel: filesystem hits win before rewrites, so prerendered `/film/<slug>/index.html` is served statically; rewrite rule keeps working for everything else.

## 9. Copy voice rules (the system)

- Short, declarative, confident. No "synergy / elevate / solutions / unlock". No em dashes (site rule).
- Films get **loglines, not deliverable descriptions**: what the film is about, written like a synopsis. (All new loglines will be flagged for your fact-check before they ship.)
- The word "AI" appears in the Method act and the proof line "concept to posting-ready in days, not months" territory; nowhere in the hero.
- Slate register (mono, caps) for all metadata; sentences only in body register.
- Positioning is swappable: copy lives in `src/data/copy.ts` with a `positioning: 'cinema' | 'ai'` switch that changes hero headline/subline and the title tag.

## 10. Accessibility floor

- Film cards become real `<a>` links (keyboard + SEO), visible `--seal` focus rings everywhere.
- Watch page replaces the modal: normal page semantics, no focus-trap complexity; native video controls retained.
- Labels wired with `htmlFor`; form errors announced (`aria-live="polite"`).
- Headings: one `h1` per page, acts are `h2`, films `h3`.
- Alt text per film: title + one-line description. Contrast: every text token pair checked AA.

## 11. Cleanup (ships with the redesign)

Delete: `src/content/inkframe.ts` (copy mined first), `src/lib/mux.ts`, `src/hooks/useHlsVideo.ts`, `Stats.tsx` (data moves to Act 4), `LoadingScreen.tsx`, `FloatingCTA.tsx`, `BackgroundAudio.tsx`, `journalEntries`/`explorations`, template leftovers (`src/assets/*`), `public/posters/` (unreferenced), duplicate favicon sets. Deps removed: `hls.js`, `gsap`, `tailwindcss-animate`. Deps kept: `react-router-dom` (now actually used). `/videos/*` and `/previews/*` files all stay on disk (client-facing URLs).

## 12. Build order (Phase 3)

1. Tokens + fonts + `Frame.tsx` + top bar (system foundation)
2. Act 1 Opening (hero footage prep: micro-loop + poster) → **checkpoint screenshot**
3. Act 2 Reel + `/film/<slug>` watch pages
4. Act 3 Method, Act 4 Proof, Act 5 Close + credits
5. SEO prerender + OG/sitemap scripts, a11y pass, perf pass (LCP/CLS), final "remove one decorative element" cut
