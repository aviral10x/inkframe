# InkFrame Films - AI Video Agency Portfolio

## Contact channels

Edit `contact` in `src/data/site.ts`. Every filled-in value shows up across the
site (contact section, floating "Message us" button, film pages, footer). Empty
values stay hidden.

```ts
export const contact = {
  whatsapp: '919876543210',          // digits with country code, no plus
  telegram: 'inkframefilms',         // username without @
  email: 'hello@inkframefilms.com',
  bookingUrl: 'https://cal.com/...', // optional
};
```

## Lead delivery (the inquiry form)

The form posts to `api/inquiry.ts` (a Vercel Function) first, then falls back
to Web3Forms from the browser, then offers the visitor one-tap WhatsApp / email
with their brief pre-filled. A lead is never lost to an error message.

Turn on the function by adding environment variables in Vercel
(Project → Settings → Environment Variables), then redeploy:

| Variable | What it is |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Create a bot with [@BotFather](https://t.me/BotFather), `/newbot`, copy the token |
| `TELEGRAM_CHAT_ID` | Message your bot once (or add it to a team group), then open `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id` |
| `RESEND_API_KEY` | Optional email copy: API key from resend.com |
| `INQUIRY_TO_EMAIL` | Where emails go, comma-separated |
| `INQUIRY_FROM_EMAIL` | Optional sender, e.g. `InkFrame <leads@inkframefilms.com>` once the domain is verified in Resend |

Configure Telegram, email, or both. With neither set, the function answers 503
and the site keeps using Web3Forms exactly as before.

## Video

Full films live in `public/videos/<slug>.mp4`: H.264 High, 1080p where the
source allows (never upscaled), 30 fps max, AAC 160k, `+faststart`. Short films
use CRF 19 (max 6 Mbps); films over 75 s are two-pass encoded to fit about
46 MB. HDR (HLG) sources are tone-mapped to SDR. Posters ship as JPG plus
`-sm.webp` / `-lg.webp` (640/1280 wide, 360/720 for vertical films).
