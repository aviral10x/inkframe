# InkFrame Films — Site Audit (Phase 0)

Date: 2026-06-11 · Auditor: Claude Code · Scope: full repo + live dev-server review (desktop 1440×900, mobile 375×812)

---

## 1. Stack

| Layer | What's there |
|---|---|
| Framework | React 19 + TypeScript, Vite 8 (SPA, client-rendered only) |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/index.css`), no CSS modules |
| Animation | framer-motion (section reveals, modal) **and** GSAP (hero entrance, marquee) — two animation libs doing similar work |
| Video | hls.js for the hero/contact Mux stream; plain `<video>` + local MP4s for work cards |
| Routing | react-router-dom **installed but never imported** (single page, no routes) |
| Forms | Web3Forms (public access key in `Contact.tsx`, honeypot + 5-min localStorage cooldown) |
| Deploy | Vercel (`vercel.json` rewrites everything except `/api/`, `/assets/`, `/previews/`, `/videos/` to `index.html`) |
| Fonts | Google Fonts CDN: Instrument Serif (display, italic) + Inter (body) |

## 2. Current page structure (top to bottom, as mounted in `App.tsx`)

1. **Hero** (`#hero`) — full-screen Mux HLS background video (black-hole/space footage), centered `InkFrame Films` in Instrument Serif italic, rotating roles line ("We create [Fashion Films/AI Commercials/…] for brands."), subline, "Get in touch" pill CTA, SCROLL indicator. `Navbar` is rendered *inside* Hero.
2. **Navbar** (fixed) — centered pill: IF logo, "Work", "Services" (Services scrolls to `#journal`). Separate fixed audio-toggle button top-right (from `BackgroundAudio`).
3. **SelectedWorks** (`#work`) — "Client-Facing Library / Proof of Work", 4 films (Alpha's Deal, Aura, Ferrari, Theft) in a wide/pair/wide anthology layout. Hover = muted MP4 preview; click = fullscreen modal with sound + controls. "04 Films" counter.
4. **Journal** (`#journal`) — misnamed; actually **Services** ("What We Make / Campaign Systems"): 4 service-pillar cards (AI Product Commercials, Fashion & Beauty Films, Automotive & Luxury Concepts, Social Content Systems) with deliverable pills.
5. **Contact** (`#contact`) — giant "CINEMATIC AI VIDEO •" marquee, boxed inquiry form (name, email, film-style pills, concept textarea → Web3Forms), over the *same* Mux hero video flipped upside-down. Footer bar inside this section: "Accepting new projects" badge, social icons (Instagram → aurakidzzz, X → aviral10x, YouTube → @inkframefilms, mailto), copyright.
6. **FloatingCTA** — circular arrow button bottom-right, visible between hero and contact.
7. **BackgroundAudio** — ambient track from **Pixabay CDN**, starts at 12% volume on first click/keypress/touch anywhere; toggle top-right.

**Built but never mounted:** `Stats.tsx` (112M+ views / 62+ films / +24% growth), `LoadingScreen.tsx` (counter + "Direct/Generate/Deliver"). Git history shows LoadingScreen was deliberately removed.

## 3. Data layer

- **Live:** `src/data/content.ts` — `projects[]` (id, title, category, year, description, image, previewVideo, video, accent, muxAssetId, muxPlaybackId), `servicePillars[]`, `stats[]`, `socialLinks[]`, plus `journalEntries[]` and `explorations[]` which **nothing imports**.
- **Dead:** `src/content/inkframe.ts` — older parallel content file (proofOfWork, services, auraReport with full Instagram analytics, outreach copy). **Nothing imports it.** Contains useful copy/facts (Aura 112M views report, client-fit lists) worth mining, then deleting.
- **Dead:** `src/lib/mux.ts` helpers — only referenced by the dead data fields; cards actually play local MP4s.
- Mux playback IDs exist per film but are unused at runtime.

## 4. What works (keep / preserve)

- Hover-to-preview → click-to-expand modal interaction on work cards (explicitly noted as good in the brief).
- Local MP4 preview/full/poster asset pipeline per film (previews 0.3–1.5 MB, well within the ≤2 MB budget).
- Web3Forms contact flow with honeypot + cooldown — functional, no backend needed.
- Vercel rewrite config and `/videos/`, `/previews/` URL scheme (client-facing links may point at these).
- Tailwind v4 token setup is a clean base to extend.

## 5. Storytelling & UX problems (why the redesign is needed)

1. **No narrative arc.** Hero → grid → service cards → form. Inventory, not a film. Nothing builds; every section is the same "header + cards" register.
2. **The name does no work.** Nothing visual or verbal references ink or frames. Background video is generic space footage (a black hole — unrelated to any film in the portfolio or to the brand).
3. **Hero copy is category boilerplate.** "We create [rotating noun] for brands" + "premium visuals, fast iteration, scroll-stopping storytelling" — claims, not a story. The rotating-word widget reads SaaS, not cinema.
4. **Projects have no loglines.** Descriptions describe the *deliverable* ("Concept film for India's leading luxury retailer"), not what the film *is about*. No client/format/year slate line.
5. **Section naming confusion.** `#journal` is Services; nav says "Services" but scrolls to a section titled "Campaign Systems"; SelectedWorks header says "Client-Facing Library" (internal language leaking to clients).
6. **"hover to preview, click to watch"** copy is shown verbatim on mobile where hover doesn't exist (touch devices get click-to-modal only).
7. **Same Mux video used twice** (hero + contact, flipped) — the closing frame has no distinct identity.
8. **Stats (112M+ views) — the strongest proof — is unmounted.** No "why us" section exists (brief's Act 4 is currently missing entirely).
9. **FloatingCTA partially overlaps card text on mobile** (sits over bottom-right of work cards).
10. **whileInView reveals start invisible** — on anchor jumps/fast scrolls content is briefly blank; also no `prefers-reduced-motion` handling anywhere (GSAP, framer-motion, marquee, ping animations all run unconditionally).

## 6. Performance findings

| Item | Finding | Severity |
|---|---|---|
| JS bundle | **931 KB minified (295 KB gzip), single chunk** — hls.js (~520 KB share), framer-motion + gsap both bundled, react-router-dom dead weight | High |
| Hero LCP | Hero is HLS video with **no poster image** — LCP waits on Mux manifest + first segment from CDN; over slow 4G the opening frame is black | High |
| Double stream | Hero and Contact each instantiate hls.js on the **same m3u8** → 2× manifests, 2× segment downloads observed in network log | High |
| Mobile video | Full HLS stream autoplays above the fold on mobile (brief bans this) | High |
| Preview MP4s | All previews fetched (`preload="metadata"`, 206 ranges) on initial load, including mobile where hover never fires | Med |
| Images | Posters are JPEG only — no AVIF/WebP, no `srcset`; hero has no image at all | Med |
| Fonts | Render-blocking Google Fonts stylesheet; no preload of woff2, no self-hosting | Low-Med |
| External audio | Ambient track hotlinks **Pixabay CDN** (availability + ToS risk); plays on *any* first click — surprising-audio UX risk | Med |
| Asset weight | `public/videos` 52 MB / `previews` 6.4 MB; ~18 MB of MP4s belong to the 6 removed films (orphaned but still deployed); `public/posters/` (548 KB) entirely unreferenced | Med |
| CLS | Sections animate opacity/transform only; no observed layout shift — fine | OK |

## 7. SEO findings (confirmed: fetchers see almost nothing)

- Pure client-rendered SPA: HTML ships `<div id="root"></div>` only. No prerender/SSG.
- Title has no separator: "InkFrame Films AI-First Video Agency" (em dash was stripped sitewide by an earlier commit).
- Meta description exists (same missing-punctuation issue). **No** OpenGraph tags, **no** Twitter card, **no** canonical, **no** OG image, **no** JSON-LD (`Organization`/`VideoObject`), **no** sitemap/robots.
- One `<h1>` (good), but heading order below is flat `h2/h3` cards.
- No per-film URLs — films open in a modal only, so nothing is linkable/indexable.

## 8. Accessibility findings

- Modal: no focus trap, focus not moved on open/close, no `role="dialog"`/`aria-modal`; Escape works.
- Work cards are click-target `<div>`s — not keyboard reachable, no `role=button`/Enter handling.
- Form inputs use `<label>` without `htmlFor` (not programmatically associated).
- Color contrast: `--color-muted` (53% grey) on near-black ≈ 4.6:1 — passes AA for body; some 10px uppercase metadata at low opacity likely fails.
- No `prefers-reduced-motion` support (see §5.10).
- Marquee text, rotating role word: decorative motion with no pause control.

## 9. Dead code / dead deps inventory (deletable in redesign)

- `src/content/inkframe.ts` (mine copy first), `src/lib/mux.ts`, `journalEntries`, `explorations`, `muxAssetId`/`muxPlaybackId` fields
- `src/sections/Stats.tsx` (or mount it as Act 4 proof), `src/sections/LoadingScreen.tsx`
- `react-router-dom`, possibly `hls.js` (if hero stops streaming Mux), `tailwindcss-animate` (not seen in use)
- `public/posters/` (548 KB, unreferenced), 6 removed films' MP4s/JPGs (~18 MB), duplicate favicon sets (`favicon-if*`, `apple-touch-if.png`)
- `src/assets/hero.png`, `react.svg`, `vite.svg` (template leftovers, unreferenced)

## 10. Constraints to respect during rebuild

- Keep `/videos/*.mp4` and `/previews/*` URLs working (outbound client links may reference them).
- Keep Web3Forms access key + honeypot + cooldown behavior.
- Keep socials: Instagram aurakidzzz, X aviral10x, YouTube @inkframefilms, mailto aviral10x@gmail.com.
- Site-wide rule from git history: **no em dashes in copy**.
- Vercel SPA rewrite must keep excluding `/videos/`, `/previews/`, `/api/`.
- Current films data shape lives in `src/data/content.ts` — extend per brief (`client, format, logline, tags, featured, order`) rather than replace URLs.

## 11. Screenshot inventory (captured this audit)

- Desktop 1440×900: hero, work (Alpha's Deal lead), services grid, contact form, footer credits bar
- Mobile 375×812: hero (mid blur-in), work card, contact form
- Notable mobile issues: marquee crops behind nav pill; form pills stack tall; floating CTA overlaps card captions; "hover to preview" copy meaningless on touch
