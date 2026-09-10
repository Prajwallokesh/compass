import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'sync-team-middleware',
      configureServer(server) {
        server.middlewares.use('/api/sync-team', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                fs.writeFileSync(
                  path.resolve(import.meta.dirname, 'src/data/team.json'),
                  JSON.stringify(data, null, 2)
                );
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: true }));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: String(err) }));
              }
            });
          } else {
            res.writeHead(405);
            res.end();
          }
        });
      },
    },
  ],
})
