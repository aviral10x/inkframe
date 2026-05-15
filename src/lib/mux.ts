/**
 * Mux utility helpers
 *
 * To activate:
 *   1. Go to Mux Dashboard → click your video → "Playback IDs" tab
 *   2. Copy the playback ID string
 *   3. Paste it into the `muxPlaybackId` field in src/data/content.ts
 *   → Thumbnails and streams will update automatically everywhere
 */

const MUX_IMAGE_BASE = 'https://image.mux.com';
const MUX_STREAM_BASE = 'https://stream.mux.com';

/**
 * Returns a Mux thumbnail URL if a playback ID is provided,
 * otherwise falls back to the local image path.
 *
 * @param playbackId  - Mux playback ID (from Mux Dashboard → Playback IDs)
 * @param fallback    - Local /public image path e.g. '/previews/showreel.jpg'
 * @param timeSeconds - Seek point for the poster frame (default: 2s)
 * @param width       - Thumbnail width for responsive sizing (default: 1200)
 */
export function muxThumbnail(
  playbackId: string | null | undefined,
  fallback: string,
  timeSeconds = 2,
  width = 1200
): string {
  if (!playbackId) return fallback;
  return `${MUX_IMAGE_BASE}/${playbackId}/thumbnail.jpg?time=${timeSeconds}&width=${width}&fit_mode=smartcrop`;
}

/**
 * Returns the HLS stream URL for a Mux playback ID.
 * Use with hls.js or a <video> tag's src attribute.
 *
 * @param playbackId - Mux playback ID
 */
export function muxStream(playbackId: string | null | undefined): string | null {
  if (!playbackId) return null;
  return `${MUX_STREAM_BASE}/${playbackId}.m3u8`;
}

/**
 * Returns an animated GIF preview from Mux (great for hover previews).
 *
 * @param playbackId  - Mux playback ID
 * @param fallback    - Local image fallback
 * @param startTime   - Start time in seconds (default: 0)
 * @param duration    - Duration of the gif in seconds (default: 3)
 * @param width       - Width of the gif (default: 600)
 */
export function muxGif(
  playbackId: string | null | undefined,
  fallback: string,
  startTime = 0,
  duration = 3,
  width = 600
): string {
  if (!playbackId) return fallback;
  return `${MUX_IMAGE_BASE}/${playbackId}/animated.gif?start=${startTime}&end=${startTime + duration}&width=${width}&fps=12`;
}
