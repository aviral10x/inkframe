export type FilmKind = 'brand' | 'narrative' | 'animation';

export const filmKinds: { kind: FilmKind | 'all'; label: string }[] = [
  { kind: 'all', label: 'All' },
  { kind: 'brand', label: 'Brand' },
  { kind: 'narrative', label: 'Narrative' },
  { kind: 'animation', label: 'Animation' },
];

export type Film = {
  slug: string;
  title: string;
  client: string;
  year: string;
  format: string;
  logline: string;
  /** Which reel filters the film appears under */
  kinds: FilmKind[];
  tags: string[];
  thumbnail: string;
  previewClip: string;
  fullVideoUrl: string;
  featured: boolean;
  /** 9:16 films: staged vertical in the reel, letterboxed on the watch page */
  portrait?: boolean;
  order: number;
};

/**
 * Adding a film is a data change, not a layout change.
 * Assets follow the basename convention:
 *   /previews/<slug>.jpg  poster still
 *   /previews/<slug>.mp4  muted hover loop, keep under 2MB
 *   /videos/<slug>.mp4    full film
 */
export const films: Film[] = [
  {
    slug: 'alphas-deal',
    title: "Alpha's Deal",
    client: 'Original Film',
    year: '2026',
    format: 'Narrative Short',
    logline: 'A father strikes a bargain to protect his daughter, and she grows up carrying what it cost him.',
    kinds: ['narrative'],
    tags: ['Narrative', 'Character', 'AI-first pipeline'],
    thumbnail: '/previews/alphas-deal.jpg',
    previewClip: '/previews/alphas-deal.mp4',
    fullVideoUrl: '/videos/alphas-deal.mp4',
    featured: true,
    order: 1,
  },
  {
    slug: 'aura-trailer',
    title: 'Aura',
    client: 'AuraKidzzz',
    year: '2026',
    format: 'Brand Trailer',
    logline: 'One sneeze of destiny sends a wide-eyed baby on a mall-wide chase, two steps ahead of a scheming villain.',
    kinds: ['brand', 'animation'],
    tags: ['Character IP', '3D Animation', '450M views'],
    thumbnail: '/previews/aura-trailer.jpg',
    previewClip: '/previews/aura-trailer.mp4',
    fullVideoUrl: '/videos/aura-trailer.mp4',
    featured: true,
    order: 2,
  },
  {
    slug: 'liquid-death',
    title: 'Liquid Death',
    client: 'Unofficial Concept',
    year: '2026',
    format: 'Collage Spot',
    logline: 'A can of mountain water torn apart and pasted back together, one cut-out mouth, eye, and fist at a time.',
    kinds: ['brand'],
    tags: ['Beverage', 'Paper Collage', 'Vertical Cut'],
    thumbnail: '/previews/liquid-death.jpg',
    previewClip: '/previews/liquid-death.mp4',
    fullVideoUrl: '/videos/liquid-death.mp4',
    featured: false,
    portrait: true,
    order: 3,
  },
  {
    slug: 'stanley',
    title: 'Stanley',
    client: 'Unofficial Concept',
    year: '2026',
    format: 'Animated Spot',
    logline: 'A city after dark, a trench coat, and one tumbler passed from kitchen window to bus stop to rooftop.',
    kinds: ['brand', 'animation'],
    tags: ['2D Animation', 'Noir', 'Vertical Cut'],
    thumbnail: '/previews/stanley.jpg',
    previewClip: '/previews/stanley.mp4',
    fullVideoUrl: '/videos/stanley.mp4',
    featured: false,
    portrait: true,
    order: 4,
  },
  {
    slug: 'starbucks',
    title: 'Starbucks',
    client: 'Unofficial Concept',
    year: '2026',
    format: 'Papercraft Spot',
    logline: 'Branch, roaster, bag, boat, barista: a coffee\'s whole journey cut from paper, until two real people lift the cups off the canvas.',
    kinds: ['brand', 'animation'],
    tags: ['Papercraft', 'Food & Beverage', 'Vertical Cut'],
    thumbnail: '/previews/starbucks.jpg',
    previewClip: '/previews/starbucks.mp4',
    fullVideoUrl: '/videos/starbucks.mp4',
    featured: false,
    portrait: true,
    order: 5,
  },
  {
    slug: 'caneza',
    title: 'Caneza',
    client: 'Caneza',
    year: '2026',
    format: 'Fragrance Film',
    logline: 'A desert festival, a black SUV over the dunes, and a fragrance called Sultan rising out of the sand.',
    kinds: ['brand'],
    tags: ['Luxury', 'Fragrance', 'Dubai'],
    thumbnail: '/previews/caneza.jpg',
    previewClip: '/previews/caneza.mp4',
    fullVideoUrl: '/videos/caneza.mp4',
    featured: false,
    order: 6,
  },
  {
    slug: 'bacca-buchi',
    title: 'Bacca Buchi',
    client: 'Unofficial Concept',
    year: '2026',
    format: 'Animated Product Spot',
    logline: 'A very tall character with very little patience, and the sneakers that finally get him moving.',
    kinds: ['brand', 'animation'],
    tags: ['3D Animation', 'Footwear', 'Vertical Cut'],
    thumbnail: '/previews/bacca-buchi.jpg',
    previewClip: '/previews/bacca-buchi.mp4',
    fullVideoUrl: '/videos/bacca-buchi.mp4',
    featured: false,
    portrait: true,
    order: 7,
  },
  {
    slug: 'the-last-happy-night',
    title: 'The Last Happy Night',
    client: 'Original Film',
    year: '2026',
    format: 'Period Drama',
    logline: 'Marseille. Edmond Dantès is toasted as the new captain at his own wedding feast, and arrested in the name of the king before the night is out.',
    kinds: ['narrative'],
    tags: ['Period Drama', 'Literary Adaptation', 'Vertical Cut'],
    thumbnail: '/previews/the-last-happy-night.jpg',
    previewClip: '/previews/the-last-happy-night.mp4',
    fullVideoUrl: '/videos/the-last-happy-night.mp4',
    featured: false,
    portrait: true,
    order: 8,
  },
  {
    slug: 'first-light',
    title: 'First Light',
    client: 'Original Film',
    year: '2026',
    format: 'Romance Short',
    logline: 'Two kids grew up under a lighthouse and swore to keep its light burning. Years and a city later, one of them comes running back.',
    kinds: ['narrative'],
    tags: ['Romance', 'Drama', 'Vertical Cut'],
    thumbnail: '/previews/first-light.jpg',
    previewClip: '/previews/first-light.mp4',
    fullVideoUrl: '/videos/first-light.mp4',
    featured: false,
    portrait: true,
    order: 9,
  },
  {
    slug: 'zer0',
    title: 'Zer0',
    client: 'Original Film',
    year: '2026',
    format: 'Action Short',
    logline: 'A station corridor, an intruder in a black helmet, and a fight with nothing to stand on.',
    kinds: ['narrative'],
    tags: ['Sci-Fi', 'Zero Gravity', 'Vertical Cut'],
    thumbnail: '/previews/zer0.jpg',
    previewClip: '/previews/zer0.mp4',
    fullVideoUrl: '/videos/zer0.mp4',
    featured: false,
    portrait: true,
    order: 10,
  },
  {
    slug: 'the-residence',
    title: 'The Residence',
    client: 'Private Listing',
    year: '2026',
    format: 'Property Film',
    logline: 'A slow morning high above Dubai, where every room turns toward the skyline.',
    kinds: ['brand'],
    tags: ['Real Estate', 'Interiors', '4K'],
    thumbnail: '/previews/the-residence.jpg',
    previewClip: '/previews/the-residence.mp4',
    fullVideoUrl: '/videos/the-residence.mp4',
    featured: false,
    order: 11,
  },
  {
    slug: 'kaizen-pilates',
    title: 'Kaizen Pilates',
    client: 'Unofficial Concept',
    year: '2026',
    format: 'Brand Film',
    logline: 'Late light through studio glass, a reformer class in full flow, and the friends who walk out of it together.',
    kinds: ['brand'],
    tags: ['Wellness', 'Lifestyle', 'Brand World'],
    thumbnail: '/previews/kaizen-pilates.jpg',
    previewClip: '/previews/kaizen-pilates.mp4',
    fullVideoUrl: '/videos/kaizen-pilates.mp4',
    featured: false,
    order: 12,
  },
  {
    slug: 'drools',
    title: 'Drools',
    client: 'Drools × Aura',
    year: '2026',
    format: 'Animated Brand Spot',
    logline: 'The pup is hungry, the house is asleep, and the smallest human in it takes breakfast seriously.',
    kinds: ['brand', 'animation'],
    tags: ['3D Animation', 'Character IP', 'Vertical Cut'],
    thumbnail: '/previews/drools.jpg',
    previewClip: '/previews/drools.mp4',
    fullVideoUrl: '/videos/drools.mp4',
    featured: false,
    portrait: true,
    order: 13,
  },
  {
    slug: 'aura-and-the-dragon',
    title: 'Aura and the Dragon',
    client: 'AuraKidzzz',
    year: '2026',
    format: 'Animated Short',
    logline: 'A baby, his Dalmatian, and a glowing egg loose in a valley of crystal falls. Somewhere out there, its mother is looking for it.',
    kinds: ['narrative', 'animation'],
    tags: ['Character IP', '3D Animation', 'Adventure'],
    thumbnail: '/previews/aura-and-the-dragon.jpg',
    previewClip: '/previews/aura-and-the-dragon.mp4',
    fullVideoUrl: '/videos/aura-and-the-dragon.mp4',
    featured: false,
    order: 14,
  },
  {
    slug: 'ferrari-concept',
    title: 'Ferrari',
    client: 'Unofficial Concept',
    year: '2026',
    format: 'Automotive Spot',
    logline: 'A man, a black horse, and the machine that shares its blood. A tribute spot with custom sound design.',
    kinds: ['brand'],
    tags: ['Automotive', 'Concept Spot', 'Sound Design'],
    thumbnail: '/previews/ferrari-concept.jpg',
    previewClip: '/previews/ferrari-concept.mp4',
    fullVideoUrl: '/videos/ferrari-concept.mp4',
    featured: false,
    order: 15,
  },
  {
    slug: 'game-intro',
    title: 'Game Intro',
    client: 'Original Concept',
    year: '2026',
    format: 'Animated Title Sequence',
    logline: 'A city in red and black, a swordswoman on the move, and a witch waiting in the gears. One cut decides it.',
    kinds: ['narrative', 'animation'],
    tags: ['2D Animation', 'Gaming', 'Motion Design'],
    thumbnail: '/previews/game-intro.jpg',
    previewClip: '/previews/game-intro.mp4',
    fullVideoUrl: '/videos/game-intro.mp4',
    featured: false,
    order: 16,
  },
  {
    slug: 'the-aftermath',
    title: 'The Aftermath',
    client: 'Original Film',
    year: '2026',
    format: 'Action Drama',
    logline: 'He came home from the war, but the pistol never left the coffee table. Then an encrypted call from Colonel Vance pulls him back in.',
    kinds: ['narrative'],
    tags: ['Action', 'War', 'Drama'],
    thumbnail: '/previews/the-aftermath.jpg',
    previewClip: '/previews/the-aftermath.mp4',
    fullVideoUrl: '/videos/the-aftermath.mp4',
    featured: false,
    order: 17,
  },
  {
    slug: 'theft',
    title: 'Theft',
    client: 'Original Film',
    year: '2026',
    format: 'Narrative Action',
    logline: 'Two masked thieves work a glass house in silence. The take is clean, until it is not.',
    kinds: ['narrative'],
    tags: ['Noir', 'Action', 'Atmosphere'],
    thumbnail: '/previews/theft.jpg',
    previewClip: '/previews/theft.mp4',
    fullVideoUrl: '/videos/theft.mp4',
    featured: false,
    order: 18,
  },
];

export const filmBySlug = (slug: string) => films.find((f) => f.slug === slug);

/**
 * The hero montage (/previews/hero-montage.mp4) cuts once every 1.5s,
 * one beat per film listed here, in this order. The live slate in the
 * Opening reads from this list, so re-cut the montage when it changes.
 */
export const heroMontage: Film[] = [
  'alphas-deal',
  'the-aftermath',
  'aura-trailer',
  'caneza',
  'theft',
  'game-intro',
  'ferrari-concept',
  'the-residence',
].map((slug) => {
  const film = filmBySlug(slug);
  if (!film) throw new Error(`heroMontage: unknown film "${slug}"`);
  return film;
});

export const nextFilm = (slug: string): Film => {
  const sorted = [...films].sort((a, b) => a.order - b.order);
  const i = sorted.findIndex((f) => f.slug === slug);
  return sorted[(i + 1) % sorted.length];
};
