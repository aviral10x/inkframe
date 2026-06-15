import { stats, proofLines } from '../data/site';
import { useReveal } from '../hooks/useReveal';

/**
 * Act 4, the Proof. Short and confident: the numbers, then three lines.
 */
export function Proof() {
  const headerRef = useReveal<HTMLElement>();
  const statsRef = useReveal<HTMLDivElement>();
  const linesRef = useReveal<HTMLDivElement>();

  return (
    <section id="proof" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-40">
      <div className="max-w-[1480px] mx-auto">
        <header ref={headerRef} className="reveal mb-14 md:mb-20">
          <p className="slate text-seal">The Proof</p>
          <h2 className="font-display text-display-lg text-bone mt-4 max-w-3xl">
            Cinematic quality at iteration speed.
          </h2>
        </header>

        {/* The numbers, one row, divided by hairlines */}
        <div
          ref={statsRef}
          className="reveal grid grid-cols-1 md:grid-cols-3 border-y border-hairline divide-y md:divide-y-0 md:divide-x divide-[var(--color-hairline)]"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="py-10 md:py-14 md:px-10 first:md:pl-0">
              <div className="font-display italic text-display-lg text-bone">{stat.value}</div>
              <div className="slate text-bone-dim mt-3">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Three lines, no carousel */}
        <div ref={linesRef} className="reveal grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-14 md:mt-20">
          {proofLines.map((p) => (
            <div key={p.lead}>
              <p className="slate text-seal">{p.lead}</p>
              <p className="text-bone text-base md:text-lg leading-relaxed mt-3 max-w-xs">{p.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
