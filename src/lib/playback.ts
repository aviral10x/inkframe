import { useSyncExternalStore } from 'react';

/**
 * One film plays at a time, with sound when the browser allows it.
 *
 * Browsers only let a page start audio after a real user gesture (a click,
 * tap, or key press; hovering and scrolling do not count). So:
 *  - the visitor's sound preference lives here (on by default, remembered)
 *  - after the first gesture anywhere on the page, hover playback is audible
 *  - before that, playback starts muted and the card offers "Click for sound"
 */

type SoundState = { soundOn: boolean; activated: boolean };

const SOUND_KEY = 'inkframe_sound';
const SERVER_STATE: SoundState = { soundOn: true, activated: false };

let state: SoundState = SERVER_STATE;
let initialised = false;
const listeners = new Set<() => void>();
let active: HTMLVideoElement | null = null;

function set(next: Partial<SoundState>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

function init() {
  if (initialised || typeof window === 'undefined') return;
  initialised = true;
  type UA = { userActivation?: { hasBeenActive: boolean } };
  state = {
    soundOn: localStorage.getItem(SOUND_KEY) !== 'off',
    activated: (navigator as Navigator & UA).userActivation?.hasBeenActive ?? false,
  };
  if (state.activated) return;

  const onGesture = () => {
    set({ activated: true });
    // The gesture itself unlocks audio: lift the mute on whatever is playing
    if (active && !active.paused && state.soundOn) {
      active.muted = false;
      fadeTo(active, 1);
    }
    ['pointerdown', 'keydown', 'touchend'].forEach((t) => window.removeEventListener(t, onGesture, true));
  };
  ['pointerdown', 'keydown', 'touchend'].forEach((t) => window.addEventListener(t, onGesture, true));
}

function subscribe(listener: () => void) {
  init();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSound() {
  return useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);
}

/** Called from a click handler, so turning sound on is always allowed */
export function setSoundOn(on: boolean) {
  localStorage.setItem(SOUND_KEY, on ? 'on' : 'off');
  set({ soundOn: on, activated: true });
  if (active && !active.paused) {
    active.muted = !on;
    if (on) fadeTo(active, 1);
  }
}

/* Short volume ramps so audio never snaps in or out */
const fades = new WeakMap<HTMLVideoElement, number>();
function fadeTo(v: HTMLVideoElement, target: number, ms = 350, done?: () => void) {
  cancelAnimationFrame(fades.get(v) ?? 0);
  const from = v.volume;
  const t0 = performance.now();
  const step = (now: number) => {
    // rAF timestamps can predate t0, so clamp both the progress and the volume
    const k = Math.min(1, Math.max(0, (now - t0) / ms));
    v.volume = Math.min(1, Math.max(0, from + (target - from) * k));
    if (k < 1) fades.set(v, requestAnimationFrame(step));
    else done?.();
  };
  fades.set(v, requestAnimationFrame(step));
}

export type PlayResult = 'sound' | 'muted' | 'blocked' | 'failed';

/**
 * Play a film in place. Pauses whatever else was playing. Resolves to
 * 'blocked' when sound was wanted but the browser required a gesture first.
 */
export async function playFilm(v: HTMLVideoElement, { sound = true } = {}): Promise<PlayResult> {
  if (active && active !== v) stopFilm(active);
  active = v;
  const wantSound = sound && state.soundOn;
  v.muted = !wantSound;
  v.volume = wantSound ? 0 : 1;
  try {
    await v.play();
    if (wantSound) fadeTo(v, 1);
    return wantSound ? 'sound' : 'muted';
  } catch (err) {
    if (wantSound && (err as DOMException)?.name === 'NotAllowedError') {
      v.muted = true;
      v.volume = 1;
      try {
        await v.play();
        return 'blocked';
      } catch {
        return 'failed';
      }
    }
    return 'failed';
  }
}

/** Fade out and pause, keeping the position so the film resumes where it left off */
export function stopFilm(v: HTMLVideoElement) {
  if (active === v) active = null;
  if (v.paused) return;
  if (v.muted || v.volume === 0) {
    v.pause();
    return;
  }
  fadeTo(v, 0, 200, () => v.pause());
}

/** Unmute the film that is playing right now (from a click, so it is allowed) */
export function unmuteActive() {
  setSoundOn(true);
}
