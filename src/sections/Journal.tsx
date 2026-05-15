import { motion } from 'framer-motion';
import { servicePillars } from '../data/content';

export function Journal() {
  return (
    <section id="journal" className="bg-[var(--color-bg)] py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[var(--color-stroke)]" />
              <span className="text-xs text-[var(--color-muted)] uppercase tracking-[0.3em]">
                What We Make
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl text-[var(--color-text-primary)] mb-5 tracking-tight">
              Campaign <span className="font-display italic">Systems</span>
            </h2>
            <p className="text-[var(--color-muted)] text-base md:text-lg max-w-md leading-relaxed">
              End-to-end video production built on AI-first workflows — from concept routes to posting-ready deliverables.
            </p>
          </div>

          <span className="text-xs text-[var(--color-muted)] hidden md:block uppercase tracking-[0.2em]">
            Films · Ads · Social · Pitch Worlds
          </span>
        </motion.div>

        {/* Service Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {servicePillars.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative rounded-2xl border border-[var(--color-stroke)] bg-[var(--color-surface)]/30 hover:bg-[var(--color-surface)] p-7 md:p-9 transition-colors duration-500"
            >
              {/* Number + Title */}
              <div className="flex items-baseline gap-4 mb-5">
                <span className="text-xs text-[var(--color-muted)] tabular-nums tracking-wider font-medium opacity-50">
                  {service.num}
                </span>
                <h3 className="text-xl md:text-2xl text-[var(--color-text-primary)] tracking-tight leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[var(--color-muted)] text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                {service.desc}
              </p>

              {/* Deliverable Pills */}
              <div className="flex flex-wrap gap-2">
                {service.deliverables.map((item) => (
                  <span
                    key={item}
                    className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] group-hover:text-[var(--color-text-primary)] px-3 py-1.5 rounded-full border border-[var(--color-stroke)] group-hover:border-[var(--color-muted)]/40 transition-colors duration-500"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Subtle top-right accent line */}
              <div className="absolute top-0 right-0 w-16 h-px bg-gradient-to-l from-[var(--color-stroke)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
