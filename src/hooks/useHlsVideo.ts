import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export function useHlsVideo(src: string) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        capLevelToPlayerSize: true, // Optimizes bandwidth based on player size
        startLevel: -1 // auto
      });
      hlsRef.current = hls;
      
      hls.loadSource(src);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay was prevented
          video.muted = true;
          video.play().catch(() => console.error("Video autoplay failed completely"));
        });
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => console.error("Video autoplay failed completely"));
        });
      });
    }
  }, [src]);

  return { videoRef, hlsInstance: hlsRef.current };
}
