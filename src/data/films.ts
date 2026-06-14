export type Film = {
  slug: string;
  title: string;
  client: string;
  year: string;
  format: string;
  logline: string;
  tags: string[];
  thumbnail: string;
  previewClip: string;
  fullVideoUrl: string;
  featured: boolean;
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
    tags: ['Character IP', '3D Animation', '112M+ views'],
    thumbnail: '/previews/aura-trailer.jpg',
    previewClip: '/previews/aura-trailer.mp4',
    fullVideoUrl: '/videos/aura-trailer.mp4',
    featured: true,
    order: 2,
  },
  {
    slug: 'ferrari-concept',
    title: 'Ferrari',
    client: 'Unofficial Concept',
    year: '2026',
    format: 'Automotive Spot',
    logline: 'A man, a black horse, and the machine that shares its blood. A tribute spot with custom sound design.',
    tags: ['Automotive', 'Concept Spot', 'Sound Design'],
    thumbnail: '/previews/ferrari-concept.jpg',
    previewClip: '/previews/ferrari-concept.mp4',
    fullVideoUrl: '/videos/ferrari-concept.mp4',
    featured: false,
    order: 3,
  },
  {
    slug: 'theft',
    title: 'Theft',
    client: 'Original Film',
    year: '2026',
    format: 'Narrative Action',
    logline: 'Two masked thieves work a glass house in silence. The take is clean, until it is not.',
    tags: ['Noir', 'Action', 'Atmosphere'],
    thumbnail: '/previews/theft.jpg',
    previewClip: '/previews/theft.mp4',
    fullVideoUrl: '/videos/theft.mp4',
    featured: false,
    order: 4,
  },
];

export const filmBySlug = (slug: string) => films.find((f) => f.slug === slug);

export const nextFilm = (slug: string): Film => {
  const sorted = [...films].sort((a, b) => a.order - b.order);
  const i = sorted.findIndex((f) => f.slug === slug);
  return sorted[(i + 1) % sorted.length];
};
