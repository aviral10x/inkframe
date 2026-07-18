/**
 * The Aura Kid case study: an original character IP grown from zero.
 * Episodes follow the basename convention under /aura/:
 *   /aura/<slug>.jpg        poster still
 *   /aura/<slug>-loop.mp4   muted hover loop, keep under 2MB
 *   /aura/<slug>.mp4        full episode with sound
 */
export const auraProfileUrl = 'https://www.instagram.com/aurakidzzz/';

export const auraStats = [
  { value: '450M', label: 'Views in 75 days' },
  { value: '413K', label: 'Followers, from zero' },
  { value: '197', label: 'Episodes posted' },
  { value: '74.6M', label: 'Views on the top episode' },
];

export const auraStory = [
  {
    lead: 'The character',
    line: 'Aura is an original animated baby with a dalmatian shadow and a gift for tiny domestic chaos. One small disaster per episode, fifteen seconds at a time.',
  },
  {
    lead: 'The cadence',
    line: 'Multiple episodes a day, every day, for 75 days. An AI-first pipeline keeps the character consistent while the world keeps growing.',
  },
  {
    lead: 'The business',
    line: 'The audience became distribution: brand spots like Drools, collab requests in the DMs, and Aura Cards, the character’s own line.',
  },
];

export type Episode = {
  slug: string;
  title: string;
  logline: string;
};

export const episodes: Episode[] = [
  {
    slug: 'night-shift',
    title: 'The Night Shift',
    logline: 'Everyone in the house is asleep. Aura has other plans.',
  },
  {
    slug: 'the-picnic',
    title: 'The Picnic',
    logline: 'Grass, pigeons, and a dalmatian who takes crumbs personally.',
  },
  {
    slug: 'the-lemon',
    title: 'The Lemon',
    logline: 'First lemon. Full commitment. Instant regret.',
  },
  {
    slug: 'frozen-spoon',
    title: 'The Frozen Spoon',
    logline: 'Science said no. Aura licked it anyway.',
  },
];

export const episodeAsset = (e: Episode) => ({
  poster: `/aura/${e.slug}.jpg`,
  previewClip: `/aura/${e.slug}-loop.mp4`,
  videoUrl: `/aura/${e.slug}.mp4`,
});
