# Panduan Deployment & Containerisasi SiDag (Production Ready)

Dokumen ini menjelaskan arsitektur containerisasi, konfigurasi Environment Variables (`ENV`), instruksi build Docker, serta panduan deployment ke berbagai platform cloud production untuk **SiDag (Sistem Informasi Asesmen Diagnostik Tiga Tingkat Khusus Matematika)**.

---

## 🏗️ 1. Arsitektur Docker Multi-Stage Build

Container dibangun menggunakan pendekatan **Multi-Stage Build** berbasis **`node:22-alpine`** untuk menghasilkan image yang sangat ramping, cepat, aman, dan siap produksi.

```
┌────────────────────────────────────────────────────────┐
│  Stage 1: Dependencies Resolver (node:22-alpine)      │
│  - Copy package.json & package-lock.json               │
│  - npm ci --omit=dev --ignore-scripts                  │
└───────────────────────────┬────────────────────────────┘
                            │ (Hanya node_modules produksi)
┌───────────────────────────▼────────────────────────────┐
│  Stage 2: Production Runtime (node:22-alpine)          │
│  - Install libc6-compat & tzdata (Asia/Makassar)       │
│  - Set ENV (NODE_ENV=production, PORT=3000, dll.)      │
│  - User Security: USER node (Non-root privilege)       │
│  - Healthcheck Probe: node scripts/healthcheck.js      │
│  - Volume Persistence: /app/data                       │
│  - CMD: ["node", "serve.js"]                           │
└────────────────────────────────────────────────────────┘
```

### Keunggulan Desain Container:
1. **Keamanan Non-Root**: Berjalan dengan UID/GID user `node` (bukan `root`), memenuhi standar CIS Docker Benchmark dan prinsip *Least Privilege*.
2. **Ukuran Image Sangat Ramping**: Tanpa `devDependencies`, tanpa cache npm, dan tanpa file dokumentasi berlebih berkat `.dockerignore`.
3. **Healthcheck Bawaan**: Endpoint `/api/health` dipantau berkala oleh `scripts/healthcheck.js` setiap 30 detik.
4. **Graceful Shutdown**: Menangani sinyal `SIGTERM` dan `SIGINT` dari Docker/Kubernetes secara aman dengan batas toleransi 10 detik.
5. **Perlindungan Path Traversal**: Server HTTP memvalidasi normalisasi path untuk mencegah eksploitasi direktori sistem.

---

## ⚙️ 2. Daftar Lengkap Environment Variables (ENV)

Semua variabel lingkungan dapat diatur melalui file `.env`, parameter `-e` pada `docker run`, atau konfigurasi environment pada platform cloud.

| Variabel | Tipe | Nilai Default | Contoh Nilai Produksi | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| `PORT` | Number | `3000` | `3000` atau `8080` | Port HTTP yang didengarkan oleh server aplikasi. |
| `HOST` | String | `0.0.0.0` | `0.0.0.0` | Interface jaringan bind server. Wajib `0.0.0.0` di container. |
| `NODE_ENV` | String | `production` | `production` | Mode runtime Node.js (`production`, `development`, `test`). |
| `DATA_DIR` | Path | `/app/data` | `/app/data` | Direktori tempat database dan file audit log disimpan. |
| `DATA_FILE` | Path | `${DATA_DIR}/database.json` | `/app/data/database.json` | Path file JSON store database utama. |
| `SQLITE_DB_PATH` | Path | `${DATA_DIR}/sidag.db` | `/app/data/sidag.db` | Path file database SQLite untuk engine Drizzle. |
| `DATABASE_URL` | String | `file:data/sidag.db` | `file:/app/data/sidag.db` | Connection string untuk Drizzle ORM Kit. |
| `TZ` | String | `Asia/Makassar` | `Asia/Makassar` | Zona waktu container (WITA / UTC+8 sesuai SMAN 7 Banjarmasin). |
| `CORS_ORIGIN` | String | `*` | `https://sidag.sman7banjarmasin.sch.id` | Kebijakan izin domain CORS untuk akses API. |

---

## 🚀 3. Instruksi Build & Menjalankan Docker

### Prasyarat
Pastikan Docker Desktop / Docker Engine telah terpasang dan aktif di mesin Anda:
```bash
docker --version
docker compose version
```

### A. Membangun Image Docker (Build)
```bash
# Build image dengan tag website-asesmen-diagnostik:latest
docker build -t website-asesmen-diagnostik:latest .

# Atau gunakan script npm shortcut:
npm run docker:build
```

### B. Menjalankan Container Mandiri (Standalone Run)
```bash
# Buat persistent volume untuk database
docker volume create sidag_data

# Jalankan container di background
docker run -d \
  --name sidag-app \
  -p 3000:3000 \
  -v sidag_data:/app/data \
  --env-file .env \
  --restart unless-stopped \
  website-asesmen-diagnostik:latest

# Atau gunakan script npm shortcut:
npm run docker:run
```

### C. Menjalankan Menggunakan Docker Compose (Direkomendasikan)
```bash
# Jalankan container beserta logging dan volume otomatis
docker compose up -d --build

# Periksa status container & health status
docker compose ps

# Melihat live log server
docker compose logs -f app

# Menghentikan layanan
docker compose down
```

---

## 🩺 4. Verifikasi Health & Pengujian Sistem

SiDag menyertakan dua suite verifikasi otomatis untuk memastikan container dan API siap rilis:

```bash
# 1. Jalankan pengujian integrasi seluruh endpoint API (33 test cases)
npm test

# 2. Jalankan verifikasi arsitektur Docker & Environment Variables (22 checks)
npm run build
# atau:
npm run test:env

# 3. Jalankan pengecekan kesehatan container secara langsung:
npm run healthcheck
```

Endpoint HTTP Healthcheck:
- **URL**: `http://localhost:3000/api/health`
- **Metode**: `GET`
- **Contoh Respons (200 OK)**:
```json
{
  "status": "ok",
  "uptime": 128.45,
  "timestamp": "2026-10-26T07:55:00.000Z"
}
```

---

## 🌐 5. Panduan Deployment Produksi Cloud

### Opsi A: Deployment ke VPS Linux (Ubuntu/Debian + Nginx + SSL)
1. **Clone repository ke server VPS**:
   ```bash
   git clone https://github.com/fitrikhnn19/website-asesmen-diagnostik.git /opt/sidag
   cd /opt/sidag
   ```
2. **Siapkan konfigurasi `.env`**:
   ```bash
   cp .env.example .env
   # Sesuaikan PORT=3000 dan TZ=Asia/Makassar
   ```
3. **Jalankan via Docker Compose**:
   ```bash
   docker compose up -d --build
   ```
4. **Konfigurasi Reverse Proxy Nginx & Let's Encrypt**:
   ```nginx
   server {
       server_name sidag.sman7banjarmasin.sch.id;

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   Pasang sertifikat SSL gratis:
   ```bash
   sudo certbot --nginx -d sidag.sman7banjarmasin.sch.id
   ```

### Opsi B: Deployment ke Railway / Render / Fly.io (PaaS)
1. Hubungkan repository GitHub ini ke dashboard PaaS pilihan Anda.
2. Platform akan secara otomatis mendeteksi keberadaan **`Dockerfile`**.
3. Tambahkan Environment Variables pada menu Settings:
   - `PORT`: Diatur otomatis oleh PaaS atau isi `3000`
   - `NODE_ENV`: `production`
   - `TZ`: `Asia/Makassar`
4. Untuk Render/Railway, pasang *Persistent Volume* dan arahkan mount path ke `/app/data` agar riwayat ujian dan akun tersimpan permanen.

### Opsi C: Deployment ke Google Cloud Run / AWS App Runner (Serverless Container)
1. Push image ke container registry:
   ```bash
   docker tag website-asesmen-diagnostik:latest gcr.io/[PROJECT_ID]/sidag-app:latest
   docker push gcr.io/[PROJECT_ID]/sidag-app:latest
   ```
2. Deploy container:
   ```bash
   gcloud run deploy sidag-service \
     --image gcr.io/[PROJECT_ID]/sidag-app:latest \
     --platform managed \
     --region asia-southeast2 \
     --allow-unauthenticated \
     --port 3000 \
     --set-env-vars NODE_ENV=production,TZ=Asia/Makassar
   ```

---

## 💾 6. Strategi Backup Data

Data siswa, bank soal, hasil asesmen tiga tingkat, dan log audit proctoring disimpan di dalam volume `/app/data`.
Untuk melakukan backup data dari container ke komputer lokal:

```bash
# Backup file database dari container yang sedang berjalan
docker cp sidag-app:/app/data ./backup_sidag_$(date +%Y%m%d)

# Restore file database ke container
docker cp ./backup_sidag_20261026/. sidag-app:/app/data/
```

---

## 📋 7. Daftar Periksa Kesiapan Produksi (Checklist)

- [x] **Dockerfile** multi-stage yang aman dengan user non-root `node`
- [x] **.dockerignore** lengkap mencegah kebocoran secret atau bloat image
- [x] **docker-compose.yml** dengan volume persistence, restart policy, dan logging limits
- [x] **Environment Variables (`ENV`)** didukung penuh (`PORT`, `HOST`, `NODE_ENV`, `DATA_DIR`, `DATA_FILE`, `DATABASE_URL`)
- [x] **Endpoint Healthcheck** `/api/health` aktif dan diverifikasi
- [x] **Graceful Shutdown** (`SIGTERM`/`SIGINT`) aktif
- [x] **Security Hardening**: Proteksi Directory Path Traversal aktif
- [x] **Suite Pengujian Integrasi**: 33 tests lulus 100%
- [x] **Suite Verifikasi Docker & ENV**: 22 checks lulus 100%
