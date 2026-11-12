import { contact } from '../data/site';

export type Channel = {
  id: 'whatsapp' | 'telegram' | 'email' | 'booking';
  label: string;
  hint: string;
  href: string;
};

/**
 * Every configured way to reach the studio, with the visitor's context
 * pre-filled where the channel supports it (WhatsApp text, email body).
 * Channels left empty in `contact` are simply not offered.
 */
export function channels(message = 'Hi InkFrame, I have a film in mind.', subject = 'New film inquiry'): Channel[] {
  const list: Channel[] = [];
  if (contact.whatsapp) {
    list.push({
      id: 'whatsapp',
      label: 'WhatsApp',
      hint: 'Fastest reply',
      href: `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
    });
  }
  if (contact.telegram) {
    list.push({ id: 'telegram', label: 'Telegram', hint: 'DM the studio', href: `https://t.me/${contact.telegram.replace(/^@/, '')}` });
  }
  if (contact.email) {
    list.push({
      id: 'email',
      label: 'Email',
      hint: contact.email,
      href: `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
    });
  }
  if (contact.bookingUrl) {
    list.push({ id: 'booking', label: 'Book a call', hint: '20 minutes, no prep', href: contact.bookingUrl });
  }
  return list;
}
