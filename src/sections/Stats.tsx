import { motion } from 'framer-motion';
import { stats } from '../data/content';

export function Stats() {
  return (
    <section className="bg-[var(--color-bg)] py-16 md:py-24 border-y border-[var(--color-stroke)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-[var(--color-stroke)]">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className={`flex flex-col ${i === 0 ? 'md:pr-8' : i === 2 ? 'md:pl-8' : 'md:px-8'} pt-8 md:pt-0`}
            >
              <div className="text-5xl lg:text-7xl font-display italic text-[var(--color-text-primary)] mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-[var(--color-muted)] uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
