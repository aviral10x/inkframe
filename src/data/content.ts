export const contactEmail = 'aviral10x@gmail.com';

// ─── Mux Integration ─────────────────────────────────────────────────────────
// muxAssetId  → from Mux Dashboard > Video > Asset ID column
// muxPlaybackId → from Mux Dashboard > click asset > "Playback IDs" tab
//                 REQUIRED for stream.mux.com and image.mux.com URLs
//                 Fill these in once you have them just replace null
// ─────────────────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 'alphas-deal',
    title: 'Alpha\'s Deal',
    category: 'Narrative Short',
    year: '2026',
    description: 'Character-driven narrative short film built with an AI-first pipeline, exploring tension, pacing, and cinematic mood.',
    image: '/previews/alphas-deal.jpg',
    previewVideo: '/previews/alphas-deal.mp4',
    video: '/videos/alphas-deal.mp4',
    accent: '#D4A03C',
    muxAssetId: null,
    muxPlaybackId: null,
  },
  {
    id: 'aura-trailer',
    title: 'Aura',
    category: 'Brand Trailer',
    year: '2026',
    description: 'Brand trailer for Aura, our Instagram-native character IP. The short-form video system behind 112M+ views and 76K followers in 90 days.',
    image: '/previews/aura-trailer.jpg',
    previewVideo: '/previews/aura-trailer.mp4',
    video: '/videos/aura-trailer.mp4',
    accent: '#CDA6F7',
    muxAssetId: null,
    muxPlaybackId: null,
  },
  {
    id: 'ferrari-concept',
    title: 'Ferrari',
    category: 'Automotive Spot',
    year: '2026',
    description: 'Unofficial concept spot for Ferrari. High-speed AI generation and custom sound design.',
    image: '/previews/ferrari-concept.jpg',
    previewVideo: '/previews/ferrari-concept.mp4',
    video: '/videos/ferrari-concept.mp4',
    accent: '#D62F2F',
    muxAssetId: 'easS017BQR6Ax00fLFsCgtXZgr5mEovMwBEGzi5evKH3U',
    muxPlaybackId: 'dIG2jRPMQRYvt9hd3A6VKon9YFeWXKJTC01OkjQ9Gg9A',
  },
  {
    id: 'theft',
    title: 'Theft',
    category: 'Narrative Action',
    year: '2026',
    description: 'Noir-inspired AI short film demonstrating character consistency and atmospheric lighting.',
    image: '/previews/theft.jpg',
    previewVideo: '/previews/theft.mp4',
    video: '/videos/theft.mp4',
    accent: '#5A8A8A',
    muxAssetId: 'DsbvW6BXernzdH0001I14DzZhV3o6Lf00Vx6guLGfErO9M',
    muxPlaybackId: 'yTP5GtZp2LrFnF2hSDS81a9PhwQPNV101skIdki02cyXE',
  },
];

export const journalEntries = [
  {
    id: 'j1',
    title: 'How AI video is changing fashion campaign production',
    readTime: '4 min read',
    date: 'May 12, 2026',
    image: '/previews/aza-fashion.jpg'
  },
  {
    id: 'j2',
    title: 'Building cinematic direction with AI-first workflows',
    readTime: '6 min read',
    date: 'Apr 28, 2026',
    image: '/previews/beyond-the-glass.jpg'
  },
  {
    id: 'j3',
    title: 'Scaling a social content system to 112M views',
    readTime: '5 min read',
    date: 'Apr 15, 2026',
    image: '/previews/swiss-beauty.jpg'
  },
  {
    id: 'j4',
    title: 'Why brands need concept films before full production',
    readTime: '3 min read',
    date: 'Mar 30, 2026',
    image: '/previews/ferrari-concept.jpg'
  }
];

export const explorations = [
  { id: 'e1', image: '/previews/showreel.jpg' },
  { id: 'e2', image: '/previews/melting-clock.jpg' },
  { id: 'e3', image: '/previews/beyond-the-glass.jpg' },
  { id: 'e4', image: '/previews/theft.jpg' },
  { id: 'e5', image: '/previews/caneza.jpg' },
  { id: 'e6', image: '/previews/aza-fashion.jpg' }
];

export const stats = [
  { label: 'Total Views', value: '112M+' },
  { label: 'Films Delivered', value: '62+' },
  { label: 'Follower Growth', value: '+24%' }
];

export const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/aurakidzzz/' },
  { name: 'Email', url: 'mailto:aviral10x@gmail.com' },
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
