import { methodStages } from '../data/site';
import { useReveal } from '../hooks/useReveal';

function Stage({ stage, index }: { stage: (typeof methodStages)[number]; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal border-t border-hairline py-10 md:py-14 grid grid-cols-1 md:grid-cols-[88px_1fr_minmax(0,420px)] gap-4 md:gap-10 items-baseline"
      style={{ paddingLeft: `min(${index * 1.25}rem, 6vw)` }}
    >
      <span className="slate text-bone-dim">{stage.num}</span>
      <div>
        <h3 className="font-display italic text-title text-bone">{stage.name}</h3>
        <p className="text-bone-dim text-base md:text-lg leading-relaxed max-w-xl mt-3">
          {stage.line}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 md:justify-end">
        {stage.deliverables.map((d) => (
          <span key={d} className="slate text-bone-dim border border-hairline px-3 py-1.5">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Act 3, the Method. Not a list of services: how a film gets made here.
 * Five stages, one sentence each, deliverables as quiet metadata.
 */
export function Method() {
  const headerRef = useReveal<HTMLElement>();
  return (
    <section id="method" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-40">
      <header ref={headerRef} className="reveal max-w-[1480px] mx-auto mb-16 md:mb-24">
        <p className="slate text-seal">The Method</p>
        <h2 className="font-display text-display-lg text-bone mt-4 max-w-3xl">
          How a film gets made with us.
        </h2>
      </header>

      <div className="max-w-[1480px] mx-auto">
        {methodStages.map((stage, i) => (
          <Stage key={stage.name} stage={stage} index={i} />
        ))}
        <div className="border-t border-hairline" />
      </div>
    </section>
  );
}
