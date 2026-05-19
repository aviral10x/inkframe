import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useHlsVideo } from '../hooks/useHlsVideo';
import { Navbar } from './Navbar';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

const roles = ["Fashion Films", "AI Commercials", "Brand Campaigns", "Social Content"];

export function Hero() {
  const { videoRef } = useHlsVideo('https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8');
  const [roleIndex, setRoleIndex] = useState(0);
  const { scrollToSection } = useSmoothScroll();

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(".name-reveal", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
    )
    .fromTo(".blur-in",
      { opacity: 0, filter: "blur(10px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
      0.3
    );

    return () => clearInterval(roleInterval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-[var(--color-bg)]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
      </div>

      <Navbar />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-20">
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-[var(--color-text-primary)] mb-6">
          InkFrame Films
        </h1>
        
        <div className="blur-in text-lg md:text-xl text-[var(--color-text-primary)]/80 mb-6 flex items-center justify-center gap-2 flex-wrap">
          We create 
          <div className="inline-flex min-w-[180px] justify-center">
            <span key={roleIndex} className="font-display italic text-[var(--color-text-primary)] animate-[var(--animate-role-fade-in)] inline-block">
              {roles[roleIndex]}
            </span>
          </div>
          for brands.
        </div>
        
        <p className="blur-in text-sm md:text-base text-[var(--color-muted)] max-w-md mb-8">
          AI video films for brands that need premium visuals, fast iteration, and scroll-stopping storytelling.
        </p>

        <div className="blur-in flex items-center mt-2">
          <button
            id="hero-cta"
            onClick={() => scrollToSection('contact')}
            className="group relative flex items-center gap-0 rounded-full overflow-hidden border border-[var(--color-stroke)] hover:border-white/20 transition-all duration-500 bg-[var(--color-surface)]/60 backdrop-blur-md hover:bg-[var(--color-surface)] shadow-lg shadow-black/20"
          >
            {/* Accent gradient glow on hover */}
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(137,170,204,0.3)' }} />

            {/* Label */}
            <span className="relative text-sm font-medium text-[var(--color-text-primary)]/80 group-hover:text-[var(--color-text-primary)] transition-colors duration-300 pl-6 pr-4 py-3.5 tracking-wide">
              Get in touch
            </span>

            {/* Arrow circle */}
            <span className="relative flex items-center justify-center w-10 h-10 mr-1 rounded-full bg-[var(--color-text-primary)]/10 group-hover:bg-[var(--color-text-primary)] transition-all duration-400">
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="text-[var(--color-text-primary)] group-hover:text-[var(--color-bg)] group-hover:rotate-45 transition-all duration-400"
              >
                <path d="M2 12L12 2M12 2H4.5M12 2V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] text-[var(--color-muted)] uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-[var(--color-stroke)] overflow-hidden relative">
          <div className="w-full h-full bg-[var(--color-text-primary)]/50 absolute top-0 left-0 animate-[var(--animate-scroll-down)]" />
        </div>
      </div>
    </section>
  );
}
