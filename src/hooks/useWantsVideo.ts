import { useSyncExternalStore } from 'react';

/**
 * True for non-touch pointers without reduced-motion, data-saver, or a
 * slow (2G/3G) connection. The server snapshot is false, so prerendered HTML never
 * contains an ambient <video> and hydration stays clean; capable clients
 * upgrade in a re-render immediately after hydration.
 */
function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  type NetInfo = { saveData?: boolean; effectiveType?: string };
  const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
  // Data saver or a slow connection: stills only, never ambient video
  const light = conn?.saveData === true || /(^|-)2g$|^3g$/.test(conn?.effectiveType ?? '');
  return window.matchMedia('(pointer: fine)').matches && !light;
}

export function useWantsVideo() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
