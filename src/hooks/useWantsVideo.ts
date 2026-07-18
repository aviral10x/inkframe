import { useSyncExternalStore } from 'react';

/**
 * True for non-touch pointers without reduced-motion or save-data
 * preferences. The server snapshot is false, so prerendered HTML never
 * contains an ambient <video> and hydration stays clean; capable clients
 * upgrade in a re-render immediately after hydration.
 */
function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  type NetInfo = { saveData?: boolean };
  const saveData = (navigator as Navigator & { connection?: NetInfo }).connection?.saveData === true;
  return window.matchMedia('(pointer: fine)').matches && !saveData;
}

export function useWantsVideo() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
