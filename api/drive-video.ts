import type { IncomingMessage, ServerResponse } from 'node:http';
import { proxyDriveVideo } from '../server/driveProxy';

type QueryRequest = IncomingMessage & {
  query?: Record<string, string | string[] | undefined>;
  url?: string;
};

type ResponseWithHelpers = ServerResponse & {
  status?: (code: number) => ResponseWithHelpers;
  send?: (body: string) => void;
};

function readDriveId(req: QueryRequest) {
  const queryId = req.query?.id;
  if (typeof queryId === 'string') return queryId;

  const requestUrl = new URL(req.url ?? '/', 'http://127.0.0.1');
  return requestUrl.searchParams.get('id');
}

export default async function handler(req: QueryRequest, res: ResponseWithHelpers) {
  const id = readDriveId(req);

  if (!id) {
    res.statusCode = 400;
    res.end('Missing Drive file id');
    return;
  }

  try {
    await proxyDriveVideo(req, res, id);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown proxy error';
    res.statusCode = 502;
    res.end(message);
  }
}
