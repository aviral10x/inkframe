import { Link } from 'react-router-dom';
import { proofLines } from '../data/site';
import { useReveal } from '../hooks/useReveal';

/**
 * Act 4, the Proof. Short and confident: three lines, then the receipts,
 * one page deep. The numbers strip lives on the case-study page.
 */
export function Proof() {
  const headerRef = useReveal<HTMLElement>();
  const linesRef = useReveal<HTMLDivElement>();
  const caseRef = useReveal<HTMLDivElement>();

  return (
    <section id="proof" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-40">
      <div className="max-w-[1480px] mx-auto">
        <header ref={headerRef} className="reveal mb-14 md:mb-20">
          <p className="slate text-seal">The Proof</p>
          <h2 className="font-display text-display-lg text-bone mt-4 max-w-3xl">
            Cinematic quality at iteration speed.
          </h2>
        </header>

        {/* Three lines, no carousel */}
        <div ref={linesRef} className="reveal grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {proofLines.map((p) => (
            <div key={p.lead}>
              <p className="slate text-seal">{p.lead}</p>
              <p className="text-bone text-base md:text-lg leading-relaxed mt-3 max-w-xs">{p.line}</p>
            </div>
          ))}
        </div>

        {/* The receipts, one page deep */}
        <div ref={caseRef} className="reveal border-t border-hairline mt-14 md:mt-20 pt-10 md:pt-14">
          <Link to="/aurakidzzz" className="group block">
            <p className="slate text-seal">Case Study</p>
            <p className="font-display italic text-title text-bone mt-2 group-hover:text-seal transition-colors duration-400">
              Aura Kid: zero to 450M views in 75 days.
            </p>
            <p className="slate text-bone-dim mt-3 group-hover:text-bone transition-colors duration-300">
              Read the full story
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
