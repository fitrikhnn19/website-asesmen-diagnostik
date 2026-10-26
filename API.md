# SiDag — Dokumentasi Rute API (API Routes Reference)

> **Sistem Informasi Asesmen Diagnostik Tiga Tingkat (Three-Tier Diagnostic Assessment)**  
> Mata Pelajaran: **Matematika**  
> Instansi Pengembang: **Fakultas Keguruan dan Ilmu Pendidikan (FKIP), Universitas Lambung Mangkurat**  
> Sekolah Mitra: **SMA Negeri 7 Banjarmasin**  
> Referensi Spesifikasi: [PRD.md](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/PRD.md) & Modul Fitur [features/](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/features/)

---

## 1. Ikhtisar Arsitektur API

API SiDag dirancang dengan arsitektur RESTful JSON modular yang terhubung langsung pada server aplikasi (`serve.js`). Seluruh rute mendukung komunikasi dua arah, validasi skema, sanitasi keamanan lembar ujian, mesin evaluasi three-tier otomatis (PRD Bagian 4.4), analisis psikometrik butir soal, dan pencatatan audit integritas.

- **Base URL**: `http://localhost:3000/api`
- **Format Pertukaran Data**: `application/json; charset=UTF-8`
- **Dukungan CORS**: Diaktifkan penuh (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`)
- **Penyimpanan Data**: In-memory store dengan sinkronisasi persistensi berkas lokal ([data/database.json](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/data/database.json)) sesuai 15 tabel [PRD Bagian 6](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/PRD.md#6-database-schema).

### Format Respon Standar

**Respon Sukses (200 / 201):**
```json
{
  "success": true,
  "message": "Deskripsi status operasi (opsional)",
  "count": 10,
  "data": { ... }
}
```

**Respon Gagal / Error (400 / 401 / 403 / 404 / 409 / 500):**
```json
{
  "success": false,
  "message": "Pesan deskripsi kesalahan berbahasa Indonesia",
  "error": "Detail galat teknis (opsional)"
}
```

---

## 2. Ringkasan Rute API (Sitemap)

| Kelompok | Prefix Rute | Sasaran Pengguna / Modul | File Handler |
|---|---|---|---|
| **Autentikasi & Akun** | `/api/auth` | Login Guru & Admin, Pendaftaran, Reset Password | [api/routes/auth.js](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/api/routes/auth.js) |
| **Administrator** | `/api/admin` | Kelola Akun Guru, Audit Log, Proctoring Global, Master Data | [api/routes/admin.js](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/api/routes/admin.js) |
| **Dasbor Guru** | `/api/teacher` | Asesmen 3-Tingkat, Profil Pemahaman, Analisis Butir, Progress Siswa, Rekap & Email | [api/routes/teacher.js](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/api/routes/teacher.js) |
| **Portal Siswa** | `/api/student` | Validasi Token, Ujian Sanitasi Kunci, Autosave, Deteksi Tab, Refleksi Miskonsepsi | [api/routes/student.js](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/api/routes/student.js) |
| **Sistem & Diagnosa** | `/api/health` | Status server, uptime, dan versi sistem | [api/router.js](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/api/router.js) |

---

## 3. Rute Autentikasi & Akun Pengguna (`/api/auth`)

Sesuai **PRD 2.1 A (F-01 s.d. F-06)** dan modul [features/08-akun-pengguna.md](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/features/08-akun-pengguna.md).

### 3.1 Login Pengguna
- **Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "bambang.hermanto@sman7banjarmasin.sch.id",
    "password": "guru123",
    "role": "guru"
  }
  ```
- **Respon Sukses (200)**:
  ```json
  {
    "success": true,
    "message": "Login berhasil. Selamat datang, Bambang Hermanto, S.Pd., M.Si.!",
    "token": "sidag-tok-...",
    "user": {
      "id": "T01",
      "name": "Bambang Hermanto, S.Pd., M.Si.",
      "email": "bambang.hermanto@sman7banjarmasin.sch.id",
      "role": "guru",
      "status": "aktif"
    }
  }
  ```

### 3.2 Pendaftaran Akun Guru Baru
- **Method**: `POST`
- **Endpoint**: `/api/auth/register`
- **Body**:
  ```json
  {
    "name": "Ahmad Sanusi, M.Pd.",
    "email": "ahmad.sanusi@sman7banjarmasin.sch.id",
    "password": "passwordAman123",
    "nip": "19850512 201001 1 008",
    "subject": "Matematika",
    "classes": "XI MIPA 5"
  }
  ```
- **Respon Sukses (201)**: Akun guru terdaftar dengan status default `aktif`.

### 3.3 Ambil Profil Sesi Aktif
- **Method**: `GET`
- **Endpoint**: `/api/auth/me`
- **Headers**: `Authorization: Bearer <token>`

### 3.4 Logout
- **Method**: `POST`
- **Endpoint**: `/api/auth/logout`

### 3.5 Permintaan Lupa Password
- **Method**: `POST`
- **Endpoint**: `/api/auth/forgot-password`
- **Body**: `{ "email": "guru@sman7banjarmasin.sch.id" }`

### 3.6 Reset Password Pengguna
- **Method**: `POST`
- **Endpoint**: `/api/auth/reset-password`
- **Body**: `{ "email": "guru@sman7banjarmasin.sch.id", "new_password": "passwordBaru2026" }`

---

## 4. Rute Administrator (`/api/admin`)

Sesuai **PRD 2.1 A (F-05, F-06), 4.3 Alur Admin**, dan antarmuka [admin-dashboard.html](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/admin-dashboard.html) & [admin.js](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/admin.js).

### 4.1 Ikhtisar & Statistik Sistem (KPI)
- **Method**: `GET`
- **Endpoint**: `/api/admin/overview` atau `/api/admin/stats`
- **Respon Sukses (200)**:
  ```json
  {
    "success": true,
    "data": {
      "teachers": { "total": 8, "active": 6, "inactive": 2 },
      "assessments": { "total": 4, "running": 3, "draft": 1 },
      "attempts": { "total": 5, "completed": 5 },
      "proctoring": { "total_violations": 4, "high_severity": 2 },
      "system": { "status": "Optimal", "uptime": "342 detik", "node_version": "v24.21.0" }
    }
  }
  ```

### 4.2 Daftar Akun Guru (dengan Pencarian & Filter)
- **Method**: `GET`
- **Endpoint**: `/api/admin/teachers?search=bambang&status=aktif&subject=Matematika`
- **Query Parameters**:
  - `search` *(opsional)*: Kata kunci nama, NIP, atau email.
  - `status` *(opsional)*: `all`, `aktif`, `nonaktif`.
  - `subject` *(opsional)*: Filter mata pelajaran.

### 4.3 Tambah Akun Guru oleh Admin
- **Method**: `POST`
- **Endpoint**: `/api/admin/teachers`
- **Body**:
  ```json
  {
    "name": "Ratna Juwita, S.Pd.",
    "nip": "19900315 201502 2 004",
    "email": "ratna.juwita@sman7banjarmasin.sch.id",
    "subject": "Matematika Peminatan",
    "classes": "XI MIPA 3",
    "password": "guru123"
  }
  ```

### 4.4 Perbarui Data Akun Guru
- **Method**: `PUT`
- **Endpoint**: `/api/admin/teachers/:id`
- **Body**: `{ "name": "...", "nip": "...", "subject": "...", "classes": "..." }`

### 4.5 Ubah Status Akun Guru (Aktif / Nonaktif)
- **Method**: `PATCH`
- **Endpoint**: `/api/admin/teachers/:id/status`
- **Body**: `{ "status": "nonaktif" }` *(opsional, jika kosong otomatis melakukan toggle)*

### 4.6 Reset Password Guru oleh Admin
- **Method**: `POST`
- **Endpoint**: `/api/admin/teachers/:id/reset-password`
- **Body**: `{ "new_password": "guru123" }`

### 4.7 Hapus Akun Guru
- **Method**: `DELETE`
- **Endpoint**: `/api/admin/teachers/:id`

### 4.8 Log Pengawasan Ujian Global (Proctoring)
- **Method**: `GET`
- **Endpoint**: `/api/admin/proctoring?severity=berat&search=Budi`
- **Query Parameters**: `severity` (`all`, `ringan`, `sedang`, `berat`), `search`.
- **Method**: `DELETE`
- **Endpoint**: `/api/admin/proctoring` (Mengosongkan seluruh log proctoring ujian)

### 4.9 Log Audit Aktivitas Sistem
- **Method**: `GET`
- **Endpoint**: `/api/admin/audit-logs?role=Guru&search=rekap`
- **Method**: `DELETE`
- **Endpoint**: `/api/admin/audit-logs` (Mengosongkan seluruh jejak audit sistem)

### 4.10 Data Master Kelas & Siswa (CRUD Penuh)
- **Master Kelas**:
  - `GET /api/admin/master/classes`: Mengambil seluruh rombel sekolah
  - `POST /api/admin/master/classes`: Mendaftarkan rombel baru (`{ name, grade, academic_year, homeroom, student_count }`)
  - `PUT /api/admin/master/classes/:id`: Memperbarui data rombel
  - `DELETE /api/admin/master/classes/:id`: Menghapus rombel dari master
- **Master Siswa**:
  - `GET /api/admin/master/students`: Mengambil seluruh data siswa terdaftar
  - `POST /api/admin/master/students`: Menambahkan siswa baru (`{ nis, name, class_name }`)
  - `PUT /api/admin/master/students/:id`: Memperbarui data siswa
  - `DELETE /api/admin/master/students/:id`: Menghapus siswa dari master

---

## 5. Rute Dasbor Guru (`/api/teacher`)

Sesuai **PRD 2.1 B, D, F, G**, antarmuka [teacher-dashboard.html](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/teacher-dashboard.html) & [teacher.js](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/teacher.js), serta modul fitur [features/01-profil-pemahaman.md](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/features/01-profil-pemahaman.md) s.d. [features/07-rekap-kirim-email.md](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/features/07-rekap-kirim-email.md).

### 5.1 Ikhtisar Dasbor Guru
- **Method**: `GET`
- **Endpoint**: `/api/teacher/overview`
- **Respon**: Menampilkan ringkasan multi-kelas, asesmen aktif, distribusi profil diagnosa (Paham, Miskonsepsi, Tidak Paham), siswa perlu perhatian, dan status proctoring.

### 5.2 Manajemen Multi-Kelas & Siswa (CRUD Penuh)
- **Rombel / Kelas**:
  - `GET /api/teacher/classes`: Daftar kelas guru dengan statistik diagnostik.
  - `POST /api/teacher/classes`: Buat rombel baru (`{ name, grade, academicYear, homeroom }`).
  - `GET /api/teacher/classes/:id`: Detail rombel dan daftar siswa.
  - `PUT /api/teacher/classes/:id`: Perbarui data rombel.
  - `DELETE /api/teacher/classes/:id`: Hapus rombel.
- **Siswa Rombel**:
  - `GET /api/teacher/students`: Daftar siswa dengan filter rombel dan status.
  - `POST /api/teacher/students`: Daftarkan siswa ke rombel (`{ nis, name, class_name, status }`).
  - `PUT /api/teacher/students/:id`: Perbarui profil siswa.
  - `DELETE /api/teacher/students/:id`: Hapus siswa dari rombel.
  - `GET /api/teacher/students/:id/progress`: Riwayat perkembangan diagnostik siswa.
  - `GET /api/teacher/students/attention`: Siswa yang memerlukan intervensi remedial khusus.

### 5.3 Bank Soal Diagnostik 3-Tingkat (`/api/teacher/questions`)
- `GET /api/teacher/questions`: Mengambil butir soal 3-tingkat lengkap dengan LaTeX KaTeX, opsi Tier 1, alasan Tier 2, dan pola miskonsepsi.
- `POST /api/teacher/questions`: Menyimpan butir soal 3-tingkat baru.
- `GET /api/teacher/questions/:id`: Detail satu butir soal.
- `PUT /api/teacher/questions/:id`: Memperbarui soal, opsi Tier 1, dan alasan Tier 2.
- `DELETE /api/teacher/questions/:id`: Menghapus butir soal dari bank soal.

### 5.4 Pengelolaan Asesmen (CRUD & Terbitkan)
- `GET /api/teacher/assessments`: Daftar asesmen guru dengan token dan status.
- `POST /api/teacher/assessments`: Buat asesmen baru (otomatis menghasilkan token unik seperti `MAT-XI-4A2B`).
- `GET /api/teacher/assessments/:id`: Detail asesmen lengkap dengan butir soal.
- `PUT /api/teacher/assessments/:id`: Perbarui metadata, durasi waktu, atau petunjuk pengerjaan.
- `PATCH /api/teacher/assessments/:id/status`: Ubah status (`draf`, `terbit`, `ditutup`).
- `DELETE /api/teacher/assessments/:id`: Hapus instrumen asesmen.

### 5.5 Catatan Tindak Lanjut Remedial (`/api/teacher/follow-up-notes`)
- `GET /api/teacher/follow-up-notes`: Riwayat seluruh catatan tindak lanjut siswa miskonsepsi.
- `POST /api/teacher/follow-up-notes`: Simpan rekomendasi/catatan remedial baru.
- `PUT /api/teacher/follow-up-notes/:id`: Perbarui isi atau status catatan remedial.
- `DELETE /api/teacher/follow-up-notes/:id`: Hapus catatan remedial.

### 5.6 Profil Pemahaman — Ringkasan Kelas (Fase 1, PRD F-18 s.d. F-20)
- **Method**: `GET`
- **Endpoint**: `/api/teacher/assessments/:id/profiles`
- **Respon Sukses (200)**:
  ```json
  {
    "success": true,
    "data": {
      "assessment_id": "asm-diagno-2026",
      "assessment_title": "Asesmen Diagnostik Tiga Tingkat: Matematika (Kelas XI)",
      "token": "DIAGNO-2026",
      "total_students_completed": 34,
      "paham": { "count": 20, "percentage": 58.8 },
      "miskonsepsi": { "count": 9, "percentage": 26.5 },
      "tidak_paham": { "count": 5, "percentage": 14.7 },
      "average_score": 74.2
    }
  }
  ```

### 5.6 Profil per Siswa & Rincian Butir (Fase 1, PRD F-19)
- **Method**: `GET`
- **Endpoint**: `/api/teacher/assessments/:id/students?profile=miskonsepsi&search=Budi`
- **Respon**: Mengembalikan daftar siswa, skor, profil dominan, jumlah butir P/M/T, dan rincian jawaban per butir soal.

### 5.7 Peta Miskonsepsi Konsep (Fase 1, PRD F-23)
- **Method**: `GET`
- **Endpoint**: `/api/teacher/assessments/:id/misconceptions`
- **Respon Sukses (200)**:
  - Mengembalikan daftar konsep matematika yang diurutkan berdasarkan persentase miskonsepsi tertinggi.
  - Memuat rincian penjelasan miskonsepsi saintifik, butir soal terkait, daftar nama siswa yang mengalaminya, dan label prioritas remedial (`Prioritas Tinggi (Remedial Segera)`, `Prioritas Sedang`, `Terkendali`).

### 5.8 Analisis Psikometrik Butir Soal (Fase 2, PRD F-21 & F-22)
- **Method**: `GET`
- **Endpoint**: `/api/teacher/assessments/:id/item-analysis`
- **Respon Sukses (200)**: Tingkat Kesukaran ($P$), Daya Pembeda ($D$), Validitas ($r_{xy}$), Reliabilitas, Kategori Tindakan, dan Rekomendasi Pedagogis per butir.

### 5.9 Progress Siswa & Catatan Remedial (Fase 2, PRD F-28 s.d. F-31)
- **Method**: `GET` `/api/teacher/students/:id/progress`: Riwayat perkembangan pemahaman siswa antar asesmen (grafik time-series).
- **Method**: `GET` `/api/teacher/students/attention`: Daftar siswa yang masih mengalami miskonsepsi berulang pasca remedial.
- **Method**: `GET` `/api/teacher/follow-up-notes`: Daftar catatan tindak lanjut dan rencana remedial.
- **Method**: `POST` `/api/teacher/follow-up-notes`: Simpan catatan tindak lanjut remedial baru.

### 5.10 Pengawasan Integritas Ujian per Asesmen (Fase 3, PRD F-27)
- **Method**: `GET`
- **Endpoint**: `/api/teacher/assessments/:id/proctoring`
- **Respon**: Log kejadian anti-cheat spesifik asesmen tersebut (pindah tab, keluar fullscreen, upaya copy teks).

### 5.11 Rekap Hasil Asesmen Satu Kelas (Fase 4, PRD F-32 & F-33)
- **Method**: `GET`
- **Endpoint**: `/api/teacher/assessments/:id/recap`
- **Respon**: Rekapitulasi lengkap kelas, peringkat nilai, rata-rata, dan proporsi pemahaman siap cetak / unduh.

### 5.12 Kirim Rekapitulasi ke Email Guru (Fase 4, PRD F-34)
- **Method**: `POST`
- **Endpoint**: `/api/teacher/assessments/:id/send-email`
- **Body**: `{ "recipient_email": "bambang.hermanto@sman7banjarmasin.sch.id" }`
- **Respon**: Mencatat riwayat pengiriman ke tabel `email_logs` dan mengembalikan tanda terima pengiriman sukses.

---

## 6. Rute Pengerjaan Siswa (`/api/student`)

Sesuai **PRD 2.1 C, E (F-14 s.d. F-17, F-24 s.d. F-26), 4.2 Alur Siswa**, dan antarmuka [student-exam.html](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/student-exam.html) & [student-exam.js](file:///c:/Users/fitri/OneDrive/Documents/website-asesmen-diagnostik/student-exam.js).

### 6.1 Validasi Token Asesmen (Gateway Token-First)
- **Method**: `POST`
- **Endpoint**: `/api/student/verify-token`
- **Body**: `{ "token": "DIAGNO-2026" }`

### 6.2 Mulai Lembar Ujian (Penyaluran Soal Ter-Sanitasi)
- **Method**: `POST`
- **Endpoint**: `/api/student/start-exam`
- **Body**:
  ```json
  {
    "token": "DIAGNO-2026",
    "name": "Muhammad Fauzan Rahman",
    "class": "XI MIPA 2",
    "roll": "18"
  }
  ```
- **Fitur Keamanan Ujian**:
  - Endpoint ini **menghapus secara otomatis** kunci jawaban (`is_correct`) pada Tier 1 dan kode miskonsepsi (`misconception_id`, `is_correct`) pada Tier 2, sehingga siswa tidak dapat melihat kunci jawaban lewat *Inspect Element / DevTools*.

### 6.3 Autosave Jawaban Siswa (Tier 1 + Tier 2 + Tier 3)
- **Method**: `POST`
- **Endpoint**: `/api/student/exam/:attemptId/save-response`
- **Body**:
  ```json
  {
    "question_id": "q1",
    "tier1": "C",
    "tier2": "B",
    "tier3": "yakin",
    "flagged": false
  }
  ```

### 6.4 Pencatatan Kejadian Anti-Cheat (Real-time Proctoring Event)
- **Method**: `POST`
- **Endpoint**: `/api/student/exam/:attemptId/proctor-event`
- **Body**:
  ```json
  {
    "event_type": "pindah_tab",
    "violation_text": "Pindah Tab / Keluar Halaman Asesmen",
    "severity": "sedang"
  }
  ```

### 6.5 Submit Asesmen & Mesin Analisis 3-Tingkat (PRD 4.4)
- **Method**: `POST`
- **Endpoint**: `/api/student/exam/:attemptId/submit`
- **Body**: `{}`
- **Logika Mesin Analisis (PRD 4.4)**:
  
  $$\begin{aligned}
  \text{Benar} + \text{Benar} + \text{Yakin} &\to \mathbf{Paham} \\
  \text{Benar} + \text{Benar} + \text{Tidak Yakin} &\to \mathbf{Paham} \\
  \text{Benar} + \text{Salah} + \text{Yakin} &\to \mathbf{Miskonsepsi} \\
  \text{Benar} + \text{Salah} + \text{Tidak Yakin} &\to \mathbf{Tidak\ Paham} \\
  \text{Salah} + \text{Benar} + \text{Yakin} &\to \mathbf{Miskonsepsi} \\
  \text{Salah} + \text{Benar} + \text{Tidak Yakin} &\to \mathbf{Tidak\ Paham} \\
  \text{Salah} + \text{Salah} + \text{Yakin} &\to \mathbf{Miskonsepsi} \\
  \text{Salah} + \text{Salah} + \text{Tidak Yakin} &\to \mathbf{Tidak\ Paham}
  \end{aligned}$$

- **Respon**: Mengembalikan profil diagnostik keseluruhan siswa, persentase Paham/Miskonsepsi/Tidak Paham, serta rincian refleksi per butir soal beserta penjelasan materi.

### 6.6 Ambil Hasil Refleksi Pengerjaan Siswa
- **Method**: `GET`
- **Endpoint**: `/api/student/exam/:attemptId/results`

---

## 7. Status Pengujian Otomatis

Semua rute telah diuji dan divalidasi dengan hasil **25/25 lulus (100% Passed)** melalui skrip pengujian:
```bash
node C:\Users\fitri\.gemini\antigravity-ide\brain\7da12001-94e5-48a7-8d04-2c942d2fe51a\scratch\test-api.js
```
Semua endpoint aktif dan dapat diakses langsung pada server lokal `http://localhost:3000/api`.
