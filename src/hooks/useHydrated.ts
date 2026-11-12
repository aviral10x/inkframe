import { useSyncExternalStore } from 'react';

const noop = () => () => {};

/**
 * False in prerendered HTML and during hydration, true right after.
 * For anything that depends on the URL query or the browser, so the
 * first client render matches the static HTML exactly.
 */
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}
