const http = require('http');
const fs = require('fs');
const path = require('path');
const apiRouter = require('./api/router');

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'production';

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=UTF-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Delegate API routes to API Router
  if (req.url.startsWith('/api')) {
    return apiRouter(req, res);
  }

  let reqPath = req.url === '/' ? '/index.html' : req.url;
  const decodedPath = decodeURIComponent(reqPath.split('?')[0]);
  const filePath = path.normalize(path.join(__dirname, decodedPath));

  // Security check: prevent directory traversal attacks
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('403 Forbidden: Access Denied');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('500 Server Error: ' + err.code);
      }
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': NODE_ENV === 'production' && ext !== '.html' 
          ? 'public, max-age=86400' 
          : 'no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN'
      });
      res.end(content);
    }
  });
});

if (require.main === module) {
  server.listen(PORT, HOST, () => {
    console.log(`[SiDag] Server running in ${NODE_ENV} mode at http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
  });
}

// Graceful shutdown on SIGTERM / SIGINT for Docker containers
const gracefulShutdown = (signal) => {
  console.log(`[SiDag] Received ${signal}. Starting graceful shutdown...`);
  server.close(() => {
    console.log('[SiDag] HTTP server closed cleanly. Exiting.');
    process.exit(0);
  });

  // Force close after 10s if connections remain open
  setTimeout(() => {
    console.error('[SiDag] Graceful shutdown timed out. Forcing process exit.');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = server;

