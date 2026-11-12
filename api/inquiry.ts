/**
 * POST /api/inquiry, the contact form's primary delivery path (Vercel Function).
 *
 * Sends every inquiry to whichever channels are configured in the Vercel
 * project's environment variables:
 *   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID   instant alert in Telegram
 *   RESEND_API_KEY + INQUIRY_TO_EMAIL       email (INQUIRY_FROM_EMAIL optional)
 *
 * With nothing configured it answers 503 and the site falls back to
 * Web3Forms from the browser, exactly as before.
 */

type Payload = {
  kind?: string;
  budget?: string;
  timeline?: string;
  name?: string;
  email?: string;
  company?: string;
  replyVia?: string;
  handle?: string;
  brief?: string;
  reference?: string;
  page?: string;
  botcheck?: string;
  elapsedMs?: number;
};

const ALLOWED_HOSTS = [/(^|\.)inkframefilms\.com$/, /\.vercel\.app$/, /^localhost$/, /^127\.0\.0\.1$/];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const clip = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function allowedOrigin(req: Request) {
  const origin = req.headers.get('origin');
  if (!origin) return true; // same-origin form posts may omit it
  try {
    const host = new URL(origin).hostname;
    return ALLOWED_HOSTS.some((re) => re.test(host));
  } catch {
    return false;
  }
}

export async function POST(req: Request): Promise<Response> {
  if (!allowedOrigin(req)) return json(403, { success: false, message: 'Origin not allowed.' });

  let p: Payload;
  try {
    p = (await req.json()) as Payload;
  } catch {
    return json(400, { success: false, message: 'Invalid request.' });
  }

  // Bots: fill the hidden field, or submit faster than a person can type.
  // Answer success so they learn nothing, deliver nothing.
  if (clip(p.botcheck, 200) || (typeof p.elapsedMs === 'number' && p.elapsedMs < 2500)) {
    return json(200, { success: true });
  }

  const i = {
    kind: clip(p.kind, 80),
    budget: clip(p.budget, 40),
    timeline: clip(p.timeline, 40),
    name: clip(p.name, 120),
    email: clip(p.email, 200),
    company: clip(p.company, 160),
    replyVia: clip(p.replyVia, 20) || 'Email',
    handle: clip(p.handle, 120),
    brief: clip(p.brief, 5000),
    reference: clip(p.reference, 200),
    page: clip(p.page, 300),
  };
  if (!i.name) return json(400, { success: false, message: 'Please add your name.' });
  if (!EMAIL_RE.test(i.email)) return json(400, { success: false, message: 'Please add a valid email.' });

  const lines: [string, string][] = [
    ['What', i.kind],
    ['Budget', i.budget],
    ['Timeline', i.timeline],
    ['Name', i.name],
    ['Company', i.company],
    ['Email', i.email],
    ['Reply via', i.handle ? `${i.replyVia}: ${i.handle}` : i.replyVia],
    ['Reference', i.reference],
  ];
  const filled = lines.filter(([, v]) => v);
  const subject = `New inquiry: ${i.kind || 'Film'}${i.company ? ` for ${i.company}` : ''} (${i.name})`;

  const tasks: Promise<string>[] = [];
  const env = process.env;

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const text = [
      `<b>🎬 ${esc(subject)}</b>`,
      '',
      ...filled.map(([k, v]) => `<b>${k}:</b> ${esc(v)}`),
      i.brief ? `\n${esc(i.brief)}` : '',
      i.page ? `\n<i>${esc(i.page)}</i>` : '',
    ].join('\n');
    tasks.push(
      fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: text.slice(0, 4000), parse_mode: 'HTML', disable_web_page_preview: true }),
      }).then((r) => (r.ok ? 'telegram' : Promise.reject(new Error(`telegram ${r.status}`)))),
    );
  }

  if (env.RESEND_API_KEY && env.INQUIRY_TO_EMAIL) {
    const html = `<h2 style="font-family:Georgia,serif">${esc(subject)}</h2>
<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${filled
      .map(([k, v]) => `<tr><td style="color:#777">${k}</td><td>${esc(v)}</td></tr>`)
      .join('')}</table>
<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(i.brief || '(No brief)')}</p>
<p style="font-family:Arial,sans-serif;font-size:12px;color:#999">${esc(i.page)}</p>`;
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.INQUIRY_FROM_EMAIL || 'InkFrame Inquiries <onboarding@resend.dev>',
          to: env.INQUIRY_TO_EMAIL.split(',').map((s) => s.trim()),
          reply_to: i.email,
          subject,
          html,
        }),
      }).then((r) => (r.ok ? 'email' : Promise.reject(new Error(`resend ${r.status}`)))),
    );
  }

  if (!tasks.length) return json(503, { success: false, reason: 'not_configured' });

  const results = await Promise.allSettled(tasks);
  const delivered = results.filter((r) => r.status === 'fulfilled').map((r) => (r as PromiseFulfilledResult<string>).value);
  if (!delivered.length) {
    console.error('inquiry delivery failed', results);
    return json(502, { success: false, reason: 'delivery_failed' });
  }
  return json(200, { success: true, delivered });
}
