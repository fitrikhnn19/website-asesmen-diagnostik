/**
 * SiDag - Healthcheck Script for Docker & Production Monitors
 * Validates that the HTTP server and API health endpoint respond with status 200 OK.
 * Exit code 0: Healthy
 * Exit code 1: Unhealthy
 */

const http = require('http');

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST && process.env.HOST !== '0.0.0.0' ? process.env.HOST : '127.0.0.1';
const TIMEOUT_MS = 4000;

const options = {
  hostname: HOST,
  port: PORT,
  path: '/api/health',
  method: 'GET',
  timeout: TIMEOUT_MS
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', chunk => { body += chunk; });
  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const json = JSON.parse(body);
        if (json.status === 'ok') {
          process.stdout.write(`[HEALTHCHECK OK] status=200 uptime=${json.uptime}s\n`);
          process.exit(0);
        }
      } catch (e) {
        // Fallback: status code 200 is acceptable
        process.stdout.write(`[HEALTHCHECK OK] status=200 (non-json)\n`);
        process.exit(0);
      }
    }
    process.stderr.write(`[HEALTHCHECK FAIL] status=${res.statusCode}\n`);
    process.exit(1);
  });
});

req.on('timeout', () => {
  req.destroy();
  process.stderr.write(`[HEALTHCHECK TIMEOUT] No response within ${TIMEOUT_MS}ms\n`);
  process.exit(1);
});

req.on('error', (err) => {
  process.stderr.write(`[HEALTHCHECK ERROR] ${err.message}\n`);
  process.exit(1);
});

req.end();
