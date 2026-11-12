import { channels, type Channel } from '../lib/channels';

export function ChannelIcon({ id, className = 'w-4 h-4' }: { id: Channel['id']; className?: string }) {
  const common = { className, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, 'aria-hidden': true } as const;
  switch (id) {
    case 'whatsapp':
      return (
        <svg {...common}>
          <path d="M3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" strokeLinejoin="round" />
          <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2.1-1-.9.9a4.6 4.6 0 0 1-2.8-2.8l.9-.9-1-2.1L9 8.5z" strokeLinejoin="round" />
        </svg>
      );
    case 'telegram':
      return (
        <svg {...common}>
          <path d="M21 4L3 11.2l5.6 2.1L18 7.2l-7.4 7.4v5.2l3.2-3.4 4.4 3.3L21 4z" strokeLinejoin="round" />
        </svg>
      );
    case 'email':
      return (
        <svg {...common}>
          <rect x="3" y="5.5" width="18" height="13" rx="1" />
          <path d="M3.5 6.5l8.5 6.5 8.5-6.5" strokeLinejoin="round" />
        </svg>
      );
    case 'booking':
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15" rx="1" />
          <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeLinecap="round" />
        </svg>
      );
  }
}

/** A row of channel buttons. `tone="solid"` for the primary placements. */
export function ChannelButtons({
  message,
  subject,
  tone = 'line',
  className = '',
}: {
  message?: string;
  subject?: string;
  tone?: 'line' | 'solid';
  className?: string;
}) {
  const list = channels(message, subject);
  if (!list.length) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {list.map((c) => (
        <a
          key={c.id}
          href={c.href}
          target={c.id === 'email' ? undefined : '_blank'}
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2.5 px-4 py-2.5 border text-sm transition-colors duration-300 ${
            tone === 'solid'
              ? 'border-bone/30 text-bone hover:border-seal hover:text-seal'
              : 'border-hairline text-bone-dim hover:text-bone hover:border-bone/40'
          }`}
        >
          <ChannelIcon id={c.id} />
          {c.label}
        </a>
      ))}
    </div>
  );
}
