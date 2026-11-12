import type { ReplyChannel } from '../data/site';

export type Inquiry = {
  kind: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  replyVia: ReplyChannel;
  handle: string;
  brief: string;
  reference: string;
};

export const emptyInquiry: Inquiry = {
  kind: '',
  budget: '',
  timeline: '',
  name: '',
  email: '',
  company: '',
  replyVia: 'Email',
  handle: '',
  brief: '',
  reference: '',
};

/** Plain-text version of the brief, for WhatsApp / email fallbacks and the inbox */
export function briefText(i: Inquiry): string {
  return [
    `Hi InkFrame, I'd like to start a film.`,
    '',
    i.kind && `What: ${i.kind}`,
    i.budget && `Budget: ${i.budget}`,
    i.timeline && `Timeline: ${i.timeline}`,
    i.reference && `Reference: ${i.reference}`,
    i.name && `Name: ${i.name}${i.company ? `, ${i.company}` : ''}`,
    i.email && `Email: ${i.email}`,
    i.handle && `${i.replyVia}: ${i.handle}`,
    i.brief && `\n${i.brief}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export type SendResult = { ok: true; via: 'api' | 'web3forms' } | { ok: false; message: string };

const WEB3FORMS_KEY = '5ef59b49-97e2-4d47-b503-5197e223d81a';

/**
 * Delivery, most reliable first:
 *  1. /api/inquiry, the site's own function: Telegram alert + email (Vercel env)
 *  2. Web3Forms from the browser, used when the function is not configured
 *     or fails. The caller offers WhatsApp / email links if both fail, so a
 *     lead is never lost to an error message.
 */
export async function sendInquiry(i: Inquiry, extra: { botcheck: string; elapsedMs: number }): Promise<SendResult> {
  const payload = { ...i, ...extra, page: typeof location !== 'undefined' ? location.href : '' };

  try {
    const res = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true, via: 'api' };
    if (res.status === 400) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, message: body.message || 'Please check the form and try again.' };
    }
    // 404 (no function), 503 (not configured), 5xx: fall through to Web3Forms
  } catch {
    // Network or function unavailable: fall through
  }

  try {
    const data = new FormData();
    data.append('access_key', WEB3FORMS_KEY);
    data.append('subject', `InkFrame inquiry: ${i.kind || 'General'}${i.company ? ` for ${i.company}` : ''}`);
    data.append('from_name', 'InkFrame Films Website');
    data.append('botcheck', extra.botcheck);
    data.append('name', i.name);
    data.append('email', i.email);
    data.append('company', i.company || '-');
    data.append('what', i.kind || 'Not specified');
    data.append('budget', i.budget || 'Not specified');
    data.append('timeline', i.timeline || 'Not specified');
    data.append('reply_via', i.handle ? `${i.replyVia}: ${i.handle}` : i.replyVia);
    data.append('reference', i.reference || '-');
    data.append('message', i.brief || '(No details provided)');
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
    const json = await res.json().catch(() => ({ success: false }));
    if (json.success) return { ok: true, via: 'web3forms' };
  } catch {
    // fall through
  }

  return { ok: false, message: 'Our form could not send that just now.' };
}
