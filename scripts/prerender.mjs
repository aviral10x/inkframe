/**
 * Build-time prerender. Runs after `vite build` (client) and
 * `vite build --ssr` (server bundle). Renders every route to real HTML
 * with per-route meta, OpenGraph, JSON-LD, then writes sitemap + robots.
 *
 * Output is plain static files; Vercel serves them filesystem-first and
 * the SPA hydrates on top.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { render, films } = await import(resolve(root, 'dist-ssr/entry-server.js'));

const ORIGIN = 'https://inkframefilms.com';
const SITE_NAME = 'InkFrame Films';
const HOME_TITLE = 'InkFrame Films | A Film Studio for Brands';
const HOME_DESC =
  'InkFrame Films is a film studio for brands. Cinematic ads, fashion films, and launch films, made with an AI-first pipeline.';

const template = readFileSync(resolve(root, 'dist/index.html'), 'utf8');

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function headFor(route) {
  const film = route.startsWith('/film/')
    ? films.find((f) => `/film/${f.slug}` === route)
    : null;

  const title = film ? `${film.title} | ${SITE_NAME}` : HOME_TITLE;
  const desc = film ? film.logline : HOME_DESC;
  const url = `${ORIGIN}${route === '/' ? '' : route}`;
  const image = `${ORIGIN}/og/${film ? film.slug : 'home'}.jpg`;

  const jsonLd = film
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: film.title,
        description: film.logline,
        thumbnailUrl: `${ORIGIN}${film.thumbnail}`,
        contentUrl: `${ORIGIN}${film.fullVideoUrl}`,
        uploadDate: '2026-06-01',
        genre: film.format,
        creator: { '@type': 'Organization', name: SITE_NAME },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: ORIGIN,
        logo: `${ORIGIN}/inkframe-logo.png`,
        description: HOME_DESC,
        sameAs: [
          'https://www.instagram.com/aurakidzzz/',
          'https://x.com/aviral10x',
          'https://youtube.com/@inkframefilms',
        ],
      };

  return {
    title,
    desc,
    head: [
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:type" content="${film ? 'video.other' : 'website'}" />`,
      `<meta property="og:site_name" content="${SITE_NAME}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:title" content="${esc(title)}" />`,
      `<meta property="og:description" content="${esc(desc)}" />`,
      `<meta property="og:image" content="${image}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(title)}" />`,
      `<meta name="twitter:description" content="${esc(desc)}" />`,
      `<meta name="twitter:image" content="${image}" />`,
      `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
    ].join('\n    '),
  };
}

const routes = ['/', ...films.map((f) => `/film/${f.slug}`)];

for (const route of routes) {
  const appHtml = render(route);
  const { title, desc, head } = headFor(route);

  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description"[^>]*\/>/, `<meta name="description" content="${esc(desc)}" />`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', appHtml);

  const outFile =
    route === '/'
      ? resolve(root, 'dist/index.html')
      : resolve(root, `dist${route}/index.html`);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`prerendered ${route} -> ${outFile.replace(root + '/', '')}`);
}

/* sitemap + robots */
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${ORIGIN}${r === '/' ? '' : r}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`;
writeFileSync(resolve(root, 'dist/sitemap.xml'), sitemap);
writeFileSync(
  resolve(root, 'dist/robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`
);
console.log('wrote sitemap.xml and robots.txt');
