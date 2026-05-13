import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { proxyDriveVideo } from './server/driveProxy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'drive-video-proxy',
      configureServer(server) {
        server.middlewares.use('/api/drive-video', async (req, res) => {
          const requestUrl = new URL(req.originalUrl ?? req.url ?? '', 'http://127.0.0.1');
          const id = requestUrl.searchParams.get('id');

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
        });
      },
    },
  ],
})
