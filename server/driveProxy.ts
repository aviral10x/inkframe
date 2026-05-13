import type { IncomingMessage, ServerResponse } from 'node:http';
import { Readable } from 'node:stream';

const DRIVE_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download';
const CONFIRM_PAGE_TYPE = 'text/html';

const PASSTHROUGH_HEADERS = [
  'accept-ranges',
  'content-length',
  'content-range',
  'etag',
  'last-modified',
];

function buildDriveUrl(id: string) {
  const url = new URL(DRIVE_DOWNLOAD_URL);
  url.searchParams.set('id', id);
  return url;
}

function buildForwardHeaders(rangeHeader?: string) {
  const headers = new Headers({
    'user-agent': 'Mozilla/5.0 InkFrameFilms/1.0',
  });

  if (rangeHeader) {
    headers.set('range', rangeHeader);
  }

  return headers;
}

function parseConfirmDownloadUrl(html: string) {
  const actionMatch = html.match(/<form[^>]+id="download-form"[^>]+action="([^"]+)"/i);
  if (!actionMatch) return null;

  const confirmUrl = new URL(actionMatch[1]);

  for (const match of html.matchAll(/<input[^>]+type="hidden"[^>]+name="([^"]+)"[^>]+value="([^"]*)"/gi)) {
    confirmUrl.searchParams.set(match[1], match[2]);
  }

  return confirmUrl;
}

function inferContentType(response: Response) {
  const upstreamType = response.headers.get('content-type');
  if (upstreamType?.startsWith('video/')) return upstreamType;

  const disposition = response.headers.get('content-disposition') ?? '';
  const lowerDisposition = disposition.toLowerCase();

  if (lowerDisposition.includes('.mp4')) return 'video/mp4';
  if (lowerDisposition.includes('.mov')) return 'video/quicktime';

  return upstreamType ?? 'application/octet-stream';
}

async function fetchDriveFile(id: string, rangeHeader?: string) {
  const initialResponse = await fetch(buildDriveUrl(id), {
    headers: buildForwardHeaders(rangeHeader),
    redirect: 'follow',
  });

  const initialType = initialResponse.headers.get('content-type') ?? '';
  if (!initialType.includes(CONFIRM_PAGE_TYPE)) {
    return initialResponse;
  }

  const confirmHtml = await initialResponse.text();
  const confirmUrl = parseConfirmDownloadUrl(confirmHtml);
  if (!confirmUrl) {
    throw new Error('Drive confirm form not found');
  }

  return fetch(confirmUrl, {
    headers: buildForwardHeaders(rangeHeader),
    redirect: 'follow',
  });
}

export async function proxyDriveVideo(
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
) {
  const upstream = await fetchDriveFile(id, req.headers.range);

  if (!upstream.ok && upstream.status !== 206) {
    res.statusCode = upstream.status;
    res.end(`Upstream Drive request failed with status ${upstream.status}`);
    return;
  }

  res.statusCode = upstream.status;
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.setHeader('Content-Type', inferContentType(upstream));

  const disposition = upstream.headers.get('content-disposition');
  if (disposition) {
    res.setHeader('Content-Disposition', disposition.replace(/^attachment/i, 'inline'));
  }

  for (const headerName of PASSTHROUGH_HEADERS) {
    const value = upstream.headers.get(headerName);
    if (value) {
      res.setHeader(headerName, value);
    }
  }

  if (req.method === 'HEAD' || !upstream.body) {
    res.end();
    return;
  }

  Readable.fromWeb(upstream.body as globalThis.ReadableStream).pipe(res);
}
