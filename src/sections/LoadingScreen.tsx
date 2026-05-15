import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Direct", "Generate", "Deliver"];
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 2700;
    
    const updateCounter = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      
      if (progress < duration) {
        const percentage = Math.min(Math.floor((progress / duration) * 100), 100);
        setCount(percentage);
        frameRef.current = requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
        setTimeout(onComplete, 400);
      }
    };

    frameRef.current = requestAnimationFrame(updateCounter);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    return () => {
      cancelAnimationFrame(frameRef.current);
      clearInterval(wordInterval);
    };
  }, [onComplete, words.length]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[var(--color-bg)] flex flex-col justify-between p-8">
      {/* Top Left Label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-xs text-[var(--color-muted)] uppercase tracking-[0.3em]"
      >
        InkFrame Films
      </motion.div>

      {/* Center Rotating Words */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-[var(--color-text-primary)]/80"
          >
            {words[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Bottom Area */}
      <div>
        <div className="flex justify-end mb-4">
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-[var(--color-text-primary)] tabular-nums">
            {String(count).padStart(3, "0")}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-[3px] bg-[var(--color-stroke)]/50 w-full overflow-hidden">
          <div 
            className="h-full accent-gradient origin-left"
            style={{ 
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
              transition: 'transform 0.1s linear'
            }}
          />
        </div>
      </div>
    </div>
  );
}
