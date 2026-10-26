/**
 * SiDag - Docker & Environment Variables Verification Suite
 * Validates that all production environment variables (PORT, HOST, NODE_ENV, DATA_DIR, etc.)
 * function flawlessly, the healthcheck script succeeds, and the Dockerfile configuration is valid.
 */

const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const TEST_PORT = 3847; // Unique port to prove PORT ENV works
const TEST_DATA_DIR = path.join(ROOT_DIR, 'data', 'test_env_data');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`  [FAIL] ${testName} - ${details}`);
    failedTests++;
  }
}

function httpGet(port, reqPath) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path: reqPath,
      method: 'GET',
      timeout: 3000
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch(e) {}
        resolve({ status: res.statusCode, data: json, raw: data });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

async function runEnvVerification() {
  console.log('\n======================================================');
  console.log('   SIDAG DOCKER & ENV PRODUCTION VERIFICATION SUITE   ');
  console.log('======================================================\n');

  // 1. Dockerfile & .dockerignore Static Analysis
  console.log('--- 1. Validating Dockerfile & Container Architecture ---');
  const dockerfilePath = path.join(ROOT_DIR, 'Dockerfile');
  const dockerignorePath = path.join(ROOT_DIR, '.dockerignore');

  assert(fs.existsSync(dockerfilePath), 'Dockerfile exists at root');
  assert(fs.existsSync(dockerignorePath), '.dockerignore exists at root');

  if (fs.existsSync(dockerfilePath)) {
    const dockerfileContent = fs.readFileSync(dockerfilePath, 'utf-8');
    assert(dockerfileContent.includes('FROM node:'), 'Uses official Node.js base image');
    assert(dockerfileContent.includes('WORKDIR /app'), 'Defines clean working directory (/app)');
    assert(dockerfileContent.includes('USER node'), 'Runs under non-root "node" user for security');
    assert(dockerfileContent.includes('HEALTHCHECK'), 'Implements container healthcheck');
    assert(dockerfileContent.includes('EXPOSE'), 'Exposes container port');
    assert(dockerfileContent.includes('ENV NODE_ENV=production'), 'Sets production NODE_ENV default');
    assert(dockerfileContent.includes('VOLUME'), 'Declares persistent data volume');
  }

  if (fs.existsSync(dockerignorePath)) {
    const dockerignoreContent = fs.readFileSync(dockerignorePath, 'utf-8');
    assert(dockerignoreContent.includes('node_modules'), '.dockerignore excludes node_modules');
    assert(dockerignoreContent.includes('.git'), '.dockerignore excludes .git metadata');
    assert(dockerignoreContent.includes('.env'), '.dockerignore excludes secret .env files');
  }

  // 2. Dynamic ENV Variables Test with Live Server
  console.log('\n--- 2. Validating Runtime ENV Injection & Server Operations ---');
  // Clean up any test directory first
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }

  console.log(`[INFO] Spawning server with PORT=${TEST_PORT}, NODE_ENV=production, DATA_DIR=${TEST_DATA_DIR}`);
  const envServer = spawn(process.execPath, [path.join(ROOT_DIR, 'serve.js')], {
    env: {
      ...process.env,
      PORT: TEST_PORT.toString(),
      HOST: '0.0.0.0',
      NODE_ENV: 'production',
      DATA_DIR: TEST_DATA_DIR,
      DATA_FILE: path.join(TEST_DATA_DIR, 'custom_db.json')
    },
    stdio: 'pipe'
  });

  let serverOutput = '';
  envServer.stdout.on('data', d => { serverOutput += d.toString(); });
  envServer.stderr.on('data', d => { serverOutput += d.toString(); });

  // Wait for server to become responsive
  let serverBooted = false;
  for (let i = 0; i < 25; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const res = await httpGet(TEST_PORT, '/api/health');
      if (res.status === 200) {
        serverBooted = true;
        break;
      }
    } catch (e) {}
  }

  assert(serverBooted, `Server successfully booted on custom PORT=${TEST_PORT}`);

  if (serverBooted) {
    // Test Health Endpoint
    const health = await httpGet(TEST_PORT, '/api/health');
    assert(health.status === 200 && health.data?.status === 'ok', 'GET /api/health responds 200 with status "ok"');
    assert(typeof health.data?.uptime === 'number' && health.data.uptime >= 0, 'Health endpoint reports container uptime');

    // Test Root Endpoint
    const rootRes = await httpGet(TEST_PORT, '/');
    assert(rootRes.status === 200 && rootRes.raw.includes('SiDag'), 'GET / correctly serves static landing page');

    // Test API Info Endpoint
    const apiRes = await httpGet(TEST_PORT, '/api');
    assert(apiRes.status === 200 && apiRes.data?.name === 'SiDag API Engine', 'GET /api returns API metadata and registered endpoints');

    // Test Data Persistence to Custom DATA_DIR
    const customDbFile = path.join(TEST_DATA_DIR, 'custom_db.json');
    assert(fs.existsSync(customDbFile), `Data file created at custom DATA_FILE: ${customDbFile}`);

    // Test Security Path Traversal Protection
    const traversalRes = await httpGet(TEST_PORT, '/../../package.json');
    assert(traversalRes.status === 403 || traversalRes.status === 404, 'Path traversal request is securely rejected (403/404)');

    // 3. Test Healthcheck Script
    console.log('\n--- 3. Validating Healthcheck Script Execution ---');
    const healthcheckScript = path.join(ROOT_DIR, 'scripts', 'healthcheck.js');
    const hcResult = await new Promise((resolve) => {
      const hcProc = spawn(process.execPath, [healthcheckScript], {
        env: { ...process.env, PORT: TEST_PORT.toString(), HOST: '127.0.0.1' },
        stdio: 'pipe'
      });
      let hcOut = '';
      hcProc.stdout.on('data', d => { hcOut += d.toString(); });
      hcProc.stderr.on('data', d => { hcOut += d.toString(); });
      hcProc.on('close', code => resolve({ code, out: hcOut }));
    });

    assert(hcResult.code === 0, 'scripts/healthcheck.js exits with code 0 (Healthy)');
    assert(hcResult.out.includes('[HEALTHCHECK OK]'), 'Healthcheck outputs [HEALTHCHECK OK]');

    // 4. Test Graceful Shutdown (SIGTERM)
    console.log('\n--- 4. Validating Graceful Container Shutdown ---');
    const shutdownPromise = new Promise((resolve) => {
      envServer.on('close', (code, signal) => {
        resolve({ code, signal });
      });
    });

    envServer.kill('SIGTERM');
    const shutdownRes = await Promise.race([
      shutdownPromise,
      new Promise(r => setTimeout(() => r({ timeout: true }), 4000))
    ]);

    assert(!shutdownRes.timeout, 'Server process stopped gracefully within 4 seconds upon SIGTERM');
  } else {
    console.error('Server output:\n', serverOutput);
  }

  // Cleanup test data directory
  if (fs.existsSync(TEST_DATA_DIR)) {
    try {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    } catch(e) {}
  }

  console.log('\n======================================================');
  console.log(`VERIFICATION SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('======================================================\n');

  process.exit(failedTests > 0 ? 1 : 0);
}

runEnvVerification().catch(err => {
  console.error('Unexpected error during verification:', err);
  process.exit(1);
});
