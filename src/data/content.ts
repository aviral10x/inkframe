export const contactEmail = 'aviral10x@gmail.com';

// ─── Mux Integration ─────────────────────────────────────────────────────────
// muxAssetId  → from Mux Dashboard > Video > Asset ID column
// muxPlaybackId → from Mux Dashboard > click asset > "Playback IDs" tab
//                 REQUIRED for stream.mux.com and image.mux.com URLs
//                 Fill these in once you have them just replace null
// ─────────────────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 'showreel',
    title: 'Showreel',
    category: 'Agency Reel',
    year: '2026',
    description: 'A cinematic expression of brand transformation into visual experiences.',
    image: '/previews/showreel.jpg',
    previewVideo: '/previews/showreel.mp4',
    video: '/videos/showreel.mp4',
    accent: '#D4A03C',
    muxAssetId: '02lA00LhGxt4z2kUwANJrWZgjwGuinMMp8uQ5xB003EGJ4',
    muxPlaybackId: 'qOhgYpGnu62W6sRma83VBfMUoeFuBPhd4O7fOdzOYuk',
  },
  {
    id: 'aza-fashion',
    title: 'Aza Fashion',
    category: 'Fashion Campaign',
    year: '2026',
    description: 'Concept film for India\'s leading luxury multi-designer retailer. Ethereal, high-fashion aesthetic blending traditional craftsmanship with futuristic AI visuals.',
    image: '/previews/aza-fashion.jpg',
    previewVideo: '/previews/aza-fashion.mp4',
    video: '/videos/aza-fashion.mp4',
    accent: '#E6D7C3',
    muxAssetId: null, // TODO: upload to Mux (still pending)
    muxPlaybackId: null,
  },
  {
    id: 'swiss-beauty',
    title: 'Swiss Beauty',
    category: 'Beauty Film',
    year: '2026',
    description: 'High-glam AI-generated commercial focusing on textures, pigments, and luminous skin.',
    image: '/previews/swiss-beauty.jpg',
    previewVideo: '/previews/swiss-beauty.mp4',
    video: '/videos/swiss-beauty.mp4',
    accent: '#F0A7B7',
    muxAssetId: 'douLx5Yy3EQ900n010297hJ2aWZ8MxehhyptbD3zMdrCxs',
    muxPlaybackId: 'rrTveS82i5us8wBA02mddzP1YFqyikuCR01CEfC8plaoc',
  },
  {
    id: 'caneza',
    title: 'Caneza',
    category: 'Brand Film',
    year: '2026',
    description: 'International luxury perfume brand from Dubai. AI campaign focusing on masculinity, power, and refined luxury.',
    image: '/previews/caneza.jpg',
    previewVideo: '/previews/caneza.mp4',
    video: '/videos/caneza.mp4',
    accent: '#8AB7B4',
    muxAssetId: 'yVwFTmx2c016wIf42zOMkjt1KEIn9NQ8K6CKY6subEyE',
    muxPlaybackId: 's7JHfFPmI2iUZPtD9L8800bDV2cCLl5hyBDt1PbgmZmE',
  },
  {
    id: 'beyond-the-glass',
    title: 'Beyond The Glass',
    category: 'Concept Piece',
    year: '2026',
    description: 'High-concept visual study on luxury architecture and light.',
    image: '/previews/beyond-the-glass.jpg',
    previewVideo: '/previews/beyond-the-glass.mp4',
    video: '/videos/beyond-the-glass.mp4',
    accent: '#8CA6D9',
    muxAssetId: 'bG27akTIyG246qL28RfM7gnmqGZfh6XkNbvu71IvfCc',
    muxPlaybackId: '02zDFJ301zV00y2dUc35LzTH7t96eidwUy021lSW02hZPGto',
  },
  {
    id: 'melting-clock',
    title: 'Melting Clock',
    category: 'Surreal Film',
    year: '2026',
    description: 'Surrealist mood film exploring time and liquid physics.',
    image: '/previews/melting-clock.jpg',
    previewVideo: '/previews/melting-clock.mp4',
    video: '/videos/melting-clock.mp4',
    accent: '#CDA6F7',
    muxAssetId: 'hqVY41OKrhXLkapZSFCxMX9LT2100u2FjQV81tvdLQUw',
    muxPlaybackId: 'VNZ2mATLbWmSNfIs901XCzdtqTtLqqk3ZsOmIbdN01Ny00',
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
