/**
 * SiDag - Central API Router & Dispatcher
 * Dispatches all `/api/*` endpoints to corresponding domain controllers
 * Handles JSON request body parsing, query params, CORS, and uniform responses.
 */

const handleAuthRoutes = require('./routes/auth');
const handleAdminRoutes = require('./routes/admin');
const handleTeacherRoutes = require('./routes/teacher');
const handleStudentRoutes = require('./routes/student');

function apiRouter(req, res) {
  // Setup CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Enhance res with helper method res.json
  res.json = (statusCode, payload) => {
    res.writeHead(statusCode, {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(JSON.stringify(payload, null, 2));
  };

  const parsedUrl = new URL(req.url, 'http://' + (req.headers.host || 'localhost:3000'));
  const pathname = parsedUrl.pathname.replace(/^\/api\/?/, '');
  const pathParts = pathname.split('/').filter(Boolean);
  const query = Object.fromEntries(parsedUrl.searchParams.entries());

  // Read request body for POST, PUT, PATCH
  let rawBody = '';
  req.on('data', chunk => {
    rawBody += chunk.toString();
  });

  req.on('end', () => {
    let body = {};
    if (rawBody.trim()) {
      try {
        body = JSON.parse(rawBody);
      } catch (err) {
        return res.json(400, {
          success: false,
          message: 'Format data JSON tidak valid.',
          error: err.message
        });
      }
    }

    try {
      const domain = pathParts[0]; // auth, admin, teacher, student, health
      const subParts = pathParts.slice(1);

      // Root API endpoint
      if (!domain) {
        return res.json(200, {
          name: 'SiDag API Engine',
          version: '1.0.0',
          institution: 'Fakultas Keguruan dan Ilmu Pendidikan, Universitas Lambung Mangkurat',
          partner_school: 'SMAN 7 Banjarmasin',
          description: 'REST API untuk Sistem Informasi Asesmen Diagnostik Tiga Tingkat (Matematika)',
          endpoints: {
            auth: '/api/auth',
            admin: '/api/admin',
            teacher: '/api/teacher',
            student: '/api/student',
            health: '/api/health'
          }
        });
      }

      // Health check endpoint
      if (domain === 'health') {
        return res.json(200, {
          status: 'ok',
          uptime: process.uptime(),
          timestamp: new Date().toISOString()
        });
      }

      // Dispatch to domain routers
      if (domain === 'auth') {
        return handleAuthRoutes(req, res, subParts, query, body);
      }

      if (domain === 'admin') {
        return handleAdminRoutes(req, res, subParts, query, body);
      }

      if (domain === 'teacher') {
        return handleTeacherRoutes(req, res, subParts, query, body);
      }

      if (domain === 'student') {
        return handleStudentRoutes(req, res, subParts, query, body);
      }

      return res.json(404, {
        success: false,
        message: `Endpoint domain '${domain}' tidak ditemukan. Gunakan /api/auth, /api/admin, /api/teacher, atau /api/student.`
      });
    } catch (err) {
      console.error('Unhandled API Error:', err);
      return res.json(500, {
        success: false,
        message: 'Terjadi kesalahan pada server internal.',
        error: err.message
      });
    }
  });
}

module.exports = apiRouter;
