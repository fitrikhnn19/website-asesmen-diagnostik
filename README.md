# SiDag — Sistem Informasi Asesmen Diagnostik Tiga Tingkat (Khusus Matematika)

Website platform asesmen diagnostik tiga tingkat (*Three-Tier Diagnostic Assessment*) khusus mata pelajaran **Matematika** untuk memetakan pemahaman dan miskonsepsi siswa secara akurat dan komprehensif.

Dilengkapi dengan bank butir soal matematika interaktif, diagram koordinat Cartesius SVG resolusi tinggi, penulisan rumus matematis LaTeX KaTeX, dan pemetaan miskonsepsi otomatis.

## 🌟 Fitur Utama

- **Landing Page Interaktif**: Penjelasan metode three-tier (Tier 1: Jawaban Utama, Tier 2: Alasan Ilmiah, Tier 3: Tingkat Keyakinan/CRI).
- **Gateway Siswa Token-First**: Akses ujian instan dengan token (contoh: `DIAGNO-2026`, `MAT-XI`, `MAT-X`).
- **Lembar Ujian Three-Tier Interaktif**: Soal matematika lengkap dengan diagram koordinat Cartesius SVG, formula KaTeX LaTeX, pengawasan anti-cheat (tab switch detection), autosave lokal, dan analisis hasil refleksi otomatis.
- **Demo Asesmen Diagnostik Matematika**: 6 butir diagnostik lengkap dengan visualisasi diagram koordinat Kartesius SVG, pilihan alasan saintifik, dan pendeteksi miskonsepsi otomatis.
- **Dashboard Analitik Guru**: Visualisasi profil pemahaman kelas, peta miskonsepsi, analisis psikometrik butir soal (kesukaran, daya pembeda, validitas), catatan tindak lanjut remedial, dan kirim rekap ke email.
- **Portal Administrator**: Pengelolaan akun guru matematika, log audit integritas ujian, dan pemantauan proctoring.

## 🚀 Cara Menjalankan

### Menggunakan Node.js
```bash
# Jalankan server lokal
node serve.js
```
Akses di browser: `http://localhost:3000`

### Menggunakan Docker & Docker Compose (Produksi)
```bash
# Build dan jalankan container
docker compose up -d --build

# Periksa status
docker compose ps
```
Akses di browser: `http://localhost:3000` (atau port yang ditentukan di `.env`).
Panduan deployment produksi lengkap, variabel environment (`ENV`), dan cloud guide tersedia di [DEPLOYMENT.md](DEPLOYMENT.md).

### Tanpa Server
Buka file `index.html` langsung di browser pilihan Anda.

## 📁 Struktur Direktori

```text
├── index.html            # Halaman utama aplikasi SiDag
├── styles.css            # Desain antarmuka & tema modern
├── app.js                # Interaktivitas, simulator, dan filter
├── serve.js              # Server HTTP lokal sederhana
├── PRD.md                # Dokumen kebutuhan produk lengkap
└── features/             # Dokumentasi modul fitur detil
```

## 🏛️ Instansi Pengembang & Mitra Sekolah

- **Instansi Pembuat & Pengembang Web**: **Fakultas Keguruan dan Ilmu Pendidikan (FKIP), Universitas Lambung Mangkurat (ULM)**
  *Fokus: Perancangan instrumen diagnostik three-tier, pemodelan miskonsepsi matematika, validasi psikometrik, dan arsitektur sistem evaluasi.*
- **Sekolah Mitra Implementasi & Asesmen**: **SMA Negeri 7 Banjarmasin**
  *Fokus: Satuan pendidikan pelaksana uji coba lapangan, pemetaan profil konsep peserta didik, dan integrasi pembelajaran matematika Kurikulum Merdeka.*

## 📄 Hak Cipta & Lisensi
Hak Cipta © 2026 SiDag &bull; FKIP Universitas Lambung Mangkurat &bull; SMAN 7 Banjarmasin. Seluruh hak cipta dilindungi undang-undang.
