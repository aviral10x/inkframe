export const drivePreview = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
export const driveView = (id: string) => `https://drive.google.com/file/d/${id}/view`;
export const driveThumbnail = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

export const proofOfWork = [
  {
    id: 'showreel',
    title: 'Showreel',
    category: 'Overview Reel',
    format: 'Portfolio intro',
    driveId: '1iCZBzE5uQvjKgl2JFIpc6k5Nu1C34mVa',
    description: 'A compact overview reel for introducing InkFrame Films in outbound messages and pitch calls.',
    accent: '#D4A03C',
    size: 'wide',
  },
  {
    id: 'aza-fashion',
    title: 'Aza Fashion',
    category: 'Fashion Campaign',
    format: 'Vertical 4K',
    driveId: '1XEkjR0wybxPfdHcvR0eRpYEwKRI75O40',
    description: 'Premium editorial campaign visual for luxury fashion and designer retail outreach.',
    accent: '#E6D7C3',
    size: 'tall',
  },
  {
    id: 'swiss-beauty',
    title: 'Swiss Beauty',
    category: 'Beauty Film',
    format: 'Vertical 4K',
    driveId: '13e1DpsZ6nzmLhXnEevjoEzivj9aLDV-s',
    description: 'Beauty/about-film style piece for cosmetics, skincare, and personal-care brands.',
    accent: '#F0A7B7',
    size: 'tall',
  },
  {
    id: 'caneza',
    title: 'Caneza',
    category: 'Brand Video',
    format: 'Horizontal',
    driveId: '1DV0mqQfHvjdxA6S14lms9817eKqU48vS',
    description: 'Cinematic product-led storytelling for refined digital campaigns.',
    accent: '#8AB7B4',
    size: 'wide',
  },
  {
    id: 'beyond-the-glass',
    title: 'Beyond The Glass',
    category: 'Concept Piece',
    format: 'Compact frame',
    driveId: '1h8zGYzt2N9DzDW5dLpI9ln4P-NngirpW',
    description: 'Creative direction, atmosphere, and AI-led visual worldbuilding in an experimental frame.',
    accent: '#8CA6D9',
    size: 'standard',
  },
  {
    id: 'melting-clock',
    title: 'Melting Clock',
    category: 'Surreal Film',
    format: '4K concept',
    driveId: '1U-_khWbcj4-ZJprV5-R3h2xzAF6hpjEW',
    description: 'AI visual experimentation, art direction, and cinematic object transformation.',
    accent: '#CDA6F7',
    size: 'standard',
  },
  {
    id: 'ferrari-concept',
    title: 'Ferrari Concept',
    category: 'Automotive Spot',
    format: 'Luxury concept',
    driveId: '1Rh7zSdF-aWS2vy9_xbDBa1Jzy7dVfnOu',
    description: 'High-energy luxury, performance, and aspirational automotive storytelling.',
    accent: '#D62F2F',
    size: 'wide',
  },
  {
    id: 'theft',
    title: 'Theft',
    category: 'Narrative Action',
    format: 'Concept video',
    driveId: '1XbXK9TbBlVe_qazn4mphpMdHMM7M00GZ',
    description: 'Longer-form pacing, tension, and scene continuity for narrative/action concepts.',
    accent: '#5A8A8A',
    size: 'standard',
  },
] as const;

export const services = [
  'Brand films and launch reels',
  'AI product commercials',
  'Fashion and beauty campaign videos',
  'Automotive concept spots',
  'Short-form social ads',
  'Surreal visual experiments and mood films',
  'Showreels for pitches, decks, and outbound client outreach',
  'Instagram-first content systems for social pages, creators, and character-led brands',
];

export const bestFitClients = [
  'Fashion labels and designer marketplaces',
  'Beauty, skincare, and cosmetics brands',
  'Automotive and luxury lifestyle brands',
  'Consumer products launching new campaigns',
  'Agencies that need fast concept films or AI-assisted production',
];

export const servicePillars = [
  {
    num: '01',
    title: 'AI Product Commercials',
    desc: 'Campaign-ready product films with cinematic lighting, controlled art direction, and quick creative iteration.',
    deliverables: ['Concept routes', 'AI-generated sequences', 'Compositing', 'Web and social cutdowns'],
  },
  {
    num: '02',
    title: 'Fashion And Beauty Films',
    desc: 'Editorial visuals for luxury, cosmetics, skincare, personal care, and designer retail brands.',
    deliverables: ['Launch reels', 'Vertical 4K assets', 'Mood films', 'Campaign treatments'],
  },
  {
    num: '03',
    title: 'Automotive And Luxury Concepts',
    desc: 'Performance-led spots and aspirational product worlds for brands that need atmosphere before a full shoot.',
    deliverables: ['Concept films', 'Hero shots', 'Pitch visuals', 'Brand worlds'],
  },
  {
    num: '04',
    title: 'Social Content Systems',
    desc: 'Repeatable video pipelines for Instagram-first pages, creators, character-led IP, and always-on brand content.',
    deliverables: ['Short-form batches', 'Visual rules', 'Posting-ready edits', 'Ongoing creative consistency'],
  },
];

export const auraHighlights = [
  '19K followers and 42 posts at the time of the portfolio update',
  'Complete short-form video content pipeline for an Instagram-native brand',
  'Social-first edits designed for quick attention, repeat viewing, and mobile-first consumption',
  'Consistent visual direction across multiple posts so the page feels cohesive rather than one-off',
];

export const outreachCopy = `Hi [Name],

We are InkFrame Films, an AI-first video agency creating cinematic ads, fashion films, product launches, and concept reels for brands that want premium visuals without traditional production timelines.

If your team is exploring campaign films, AI product commercials, or high-performing social video, we would love to share a few ideas tailored to your brand.

Best,
InkFrame Films`;
