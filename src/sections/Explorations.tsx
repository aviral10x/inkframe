import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { explorations } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply complex parallax on larger screens to avoid mobile jank
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!sectionRef.current || !contentRef.current || !col1Ref.current || !col2Ref.current) return;

      // Pin the center content
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax for column 1 (moves up faster)
      gsap.to(col1Ref.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Parallax for column 2 (moves down or slower)
      gsap.to(col2Ref.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  const col1Items = explorations.slice(0, 3);
  const col2Items = explorations.slice(3, 6);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-[var(--color-bg)] overflow-hidden">
      
      {/* Layer 1: Pinned Center Content */}
      <div 
        ref={contentRef} 
        className="absolute top-0 left-0 w-full h-screen z-10 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="text-center bg-[var(--color-bg)]/40 backdrop-blur-3xl px-12 py-8 rounded-[40px] border border-white/5 pointer-events-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-[var(--color-stroke)]" />
            <span className="text-xs text-[var(--color-muted)] uppercase tracking-[0.3em]">Visual Lab</span>
            <span className="w-8 h-px bg-[var(--color-stroke)]" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-[var(--color-text-primary)] mb-6">
            Creative <span className="font-display italic text-[var(--color-text-primary)]/80">playground</span>
          </h2>
          <p className="text-[var(--color-muted)] max-w-sm mx-auto mb-8">
            Surreal experiments, mood films, and AI-led visual worldbuilding — unused concepts and creative direction tests.
          </p>
          <a 
            href="https://www.instagram.com/aurakidzzz/" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-primary)] bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full transition-colors border border-white/10"
          >
            View @aurakidzzz ↗
          </a>
        </div>
      </div>

      {/* Layer 2: Parallax Columns */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden max-w-[1400px] mx-auto w-full px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-40 h-full relative pt-[50vh]">
          
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-12 md:gap-32 items-start pointer-events-auto relative z-20">
            {col1Items.map((item, i) => (
              <div 
                key={item.id} 
                className="group aspect-square w-full max-w-[320px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-105"
                style={{ transform: `rotate(${i % 2 === 0 ? '-3deg' : '2deg'})` }}
              >
                <img src={item.image} alt="Exploration" className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-12 md:gap-32 items-end pt-[20vh] md:pt-[40vh] pointer-events-auto relative z-20">
            {col2Items.map((item, i) => (
              <div 
                key={item.id} 
                className="group aspect-square w-full max-w-[320px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-105"
                style={{ transform: `rotate(${i % 2 === 0 ? '4deg' : '-2deg'})` }}
              >
                <img src={item.image} alt="Exploration" className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>
          
        </div>
      </div>
      
      {/* Fallback for mobile (if parallax is disabled) */}
      <div className="md:hidden pt-[100vh] pb-24 px-6 flex flex-col gap-12 items-center">
        {explorations.map((item) => (
          <div key={item.id} className="aspect-square w-full max-w-[320px] rounded-3xl overflow-hidden border border-white/10 shadow-xl relative z-20">
            <img src={item.image} alt="Exploration" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
