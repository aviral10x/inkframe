export const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/inkframefilms/' },
  { name: 'X', url: 'https://x.com/inkframefilms' },
  { name: 'YouTube', url: 'https://youtube.com/@inkframefilms' },
];

/**
 * Direct lines. Fill these in and the WhatsApp / Telegram / email / booking
 * buttons appear everywhere (contact section, floating button, film pages,
 * footer). Leave a value empty and that channel stays hidden.
 */
export const contact = {
  /** Digits only, with country code, no plus: '919876543210' */
  whatsapp: '',
  /** Username without the @ (a person, group or channel): 'inkframefilms' */
  telegram: '',
  /** Public inbox: 'hello@inkframefilms.com' */
  email: '',
  /** Calendly / Cal.com link for a discovery call */
  bookingUrl: '',
};

/* The inquiry form, step by step */
export const inquiryKinds = [
  'Brand film or ad',
  'Product commercial',
  'Fashion or beauty film',
  'Animated spot',
  'Character or IP world',
  'Social content series',
  'Narrative short',
  'Not sure yet',
];

export const budgetRanges = ['Under $2k', '$2k to $5k', '$5k to $15k', '$15k to $50k', '$50k+', 'Not sure yet'];

export const timelines = ['ASAP', 'Within 2 weeks', 'This month', 'Next 1 to 3 months', 'Just exploring'];

export const replyChannels = ['Email', 'WhatsApp', 'Telegram', 'Call'] as const;
export type ReplyChannel = (typeof replyChannels)[number];

export const proofLines = [
  { lead: 'Speed', line: 'Concept to posting-ready in days, not months.' },
  { lead: 'Craft', line: 'Cinematic light, sound, and pace in every frame.' },
  { lead: 'End to end', line: 'One team from the first idea to the final cut.' },
];

/* The Method: how a film gets made with us */
export const methodStages = [
  {
    num: 'I',
    name: 'Concept',
    line: 'Every film starts as a question: what should the audience feel?',
    deliverables: ['Concept routes', 'Treatments', 'Pitch visuals'],
  },
  {
    num: 'II',
    name: 'World',
    line: 'We build the world before a single shot: place, light, faces, mood.',
    deliverables: ['Brand worlds', 'Mood films', 'Hero shots'],
  },
  {
    num: 'III',
    name: 'Frames',
    line: 'An AI-first pipeline generates hundreds of frames a day, art-directed to the brief.',
    deliverables: ['AI-generated sequences', 'Vertical 4K assets'],
  },
  {
    num: 'IV',
    name: 'Cut',
    line: 'The edit is where the story breathes: pace, sound, restraint.',
    deliverables: ['Compositing', 'Sound design', 'Posting-ready edits'],
  },
  {
    num: 'V',
    name: 'Launch',
    line: 'Cut for the places it will live: feeds, screens, pitch rooms.',
    deliverables: ['Launch reels', 'Social cutdowns', 'Short-form batches'],
  },
];
