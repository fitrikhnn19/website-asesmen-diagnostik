/**
 * SiDag - Diagnostic Assessment Data Store
 * In-memory with optional JSON file persistence
 * Implements the 15 database tables defined in PRD Section 6
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', '..', 'data');
const DATA_FILE = process.env.DATA_FILE || path.join(DATA_DIR, 'database.json');

// Initial seed data based on current application state
const initialData = {
  // Table 1: users (PRD 6.2)
  users: [
    {
      id: 'usr-admin-01',
      name: 'Administrator SiDag (FKIP ULM)',
      email: 'admin@sman7banjarmasin.sch.id',
      password_hash: 'admin123',
      role: 'admin',
      nip: '19800101 200501 1 001',
      subject: 'Sistem Informasi & Evaluasi Pendidikan',
      status: 'aktif',
      created_at: '2026-01-01T08:00:00Z'
    },
    {
      id: 'T01',
      name: 'Bambang Hermanto, S.Pd., M.Si.',
      nip: '19810415 200604 1 012',
      email: 'bambang.hermanto@sman7banjarmasin.sch.id',
      password_hash: 'guru123',
      role: 'guru',
      subject: 'Matematika Kelas XI',
      classes: 'XI MIPA 1, XI MIPA 2',
      status: 'aktif',
      created_at: '2026-01-10T08:00:00Z'
    },
    {
      id: 'T02',
      name: 'Dra. Siti Rahmawati, M.Pd.',
      nip: '19750312 200003 2 004',
      email: 'siti.rahmawati@sman7banjarmasin.sch.id',
      password_hash: 'guru123',
      role: 'guru',
      subject: 'Matematika Kelas X',
      classes: 'X-A, X-B',
      status: 'aktif',
      created_at: '2026-01-12T08:00:00Z'
    },
    {
      id: 'T03',
      name: 'Dr. Hendra Gunawan, M.Si.',
      nip: '19690822 199512 1 001',
      email: 'hendra.gunawan@sman7banjarmasin.sch.id',
      password_hash: 'guru123',
      role: 'guru',
      subject: 'Matematika Tingkat Lanjut',
      classes: 'XII MIPA 1, XII MIPA 2',
      status: 'aktif',
      created_at: '2026-01-15T08:00:00Z'
    },
    {
      id: 'T04',
      name: 'Nurul Hidayati, S.Si., M.Pd.',
      nip: '19840210 200801 2 009',
      email: 'nurul.hidayati@sman7banjarmasin.sch.id',
      password_hash: 'guru123',
      role: 'guru',
      subject: 'Matematika Kelas XI',
      classes: 'XI MIPA 3, XI MIPA 4',
      status: 'aktif',
      created_at: '2026-01-18T08:00:00Z'
    },
    {
      id: 'T05',
      name: 'Agus Santoso, M.Pd.',
      nip: '19790614 200501 1 007',
      email: 'agus.santoso@sman7banjarmasin.sch.id',
      password_hash: 'guru123',
      role: 'guru',
      subject: 'Matematika Kelas X',
      classes: 'X-C, X-D',
      status: 'aktif',
      created_at: '2026-01-22T08:00:00Z'
    },
    {
      id: 'T06',
      name: 'Dewi Sartika, S.Pd.',
      nip: '19881105 201402 2 003',
      email: 'dewi.sartika@sman7banjarmasin.sch.id',
      password_hash: 'guru123',
      role: 'guru',
      subject: 'Matematika Kelas XI',
      classes: 'XI IPS 1',
      status: 'nonaktif',
      created_at: '2026-02-02T08:00:00Z'
    },
    {
      id: 'T07',
      name: 'Rahmat Kurniawan, S.Kom., M.Pd.',
      nip: '19920518 201903 1 005',
      email: 'rahmat.kurniawan@sman7banjarmasin.sch.id',
      password_hash: 'guru123',
      role: 'guru',
      subject: 'Matematika Kelas XII',
      classes: 'XII-A, XII-B',
      status: 'aktif',
      created_at: '2026-02-05T08:00:00Z'
    },
    {
      id: 'T08',
      name: 'Endang Purwanti, M.Pd.',
      nip: '19730919 199802 2 002',
      email: 'endang.purwanti@sman7banjarmasin.sch.id',
      password_hash: 'guru123',
      role: 'guru',
      subject: 'Matematika Kelas XI',
      classes: 'XI MIPA 1',
      status: 'nonaktif',
      created_at: '2026-02-12T08:00:00Z'
    }
  ],

  // Table 2: classes (PRD 6.2)
  classes: [
    {
      id: 'CLS-01',
      teacher_id: 'T01',
      name: 'XI MIPA 2',
      grade: 'Kelas XI',
      academic_year: '2026/2027 Ganjil',
      homeroom: 'Bambang Hermanto, M.Si.',
      student_count: 34
    },
    {
      id: 'CLS-02',
      teacher_id: 'T01',
      name: 'XI MIPA 1',
      grade: 'Kelas XI',
      academic_year: '2026/2027 Ganjil',
      homeroom: 'Dra. Hj. Nurhayati, M.Pd.',
      student_count: 36
    },
    {
      id: 'CLS-03',
      teacher_id: 'T04',
      name: 'XI MIPA 3',
      grade: 'Kelas XI',
      academic_year: '2026/2027 Ganjil',
      homeroom: 'H. Sulaiman, M.Pd.',
      student_count: 32
    },
    {
      id: 'CLS-04',
      teacher_id: 'T02',
      name: 'X-1',
      grade: 'Kelas X',
      academic_year: '2026/2027 Ganjil',
      homeroom: 'Rina Marlina, S.Pd.',
      student_count: 35
    }
  ],

  // Table 3: students (PRD 6.2)
  students: [
    { id: 'S01', class_id: 'CLS-01', name: 'Aditya Pratama', student_code: '260101', roll_no: '01' },
    { id: 'S02', class_id: 'CLS-01', name: 'Ahmad Dahlan', student_code: '260102', roll_no: '02' },
    { id: 'S03', class_id: 'CLS-01', name: 'Aisyah Putri Rahayu', student_code: '260103', roll_no: '03' },
    { id: 'S04', class_id: 'CLS-01', name: 'Bagas Firmansyah', student_code: '260104', roll_no: '04' },
    { id: 'S05', class_id: 'CLS-01', name: 'Budi Pratama', student_code: '260105', roll_no: '05' },
    { id: 'S06', class_id: 'CLS-01', name: 'Citra Lestari', student_code: '260106', roll_no: '06' },
    { id: 'S07', class_id: 'CLS-01', name: 'Dian Anggraini', student_code: '260107', roll_no: '07' },
    { id: 'S08', class_id: 'CLS-01', name: 'Dimas Setiawan', student_code: '260108', roll_no: '08' },
    { id: 'S09', class_id: 'CLS-01', name: 'Eko Prasetyo', student_code: '260109', roll_no: '09' },
    { id: 'S10', class_id: 'CLS-01', name: 'Fadhil Muhammad', student_code: '260110', roll_no: '10' },
    { id: 'S11', class_id: 'CLS-01', name: 'Farah Nabila', student_code: '260111', roll_no: '11' },
    { id: 'S12', class_id: 'CLS-01', name: 'Gilang Ramadhan', student_code: '260112', roll_no: '12' },
    { id: 'S13', class_id: 'CLS-01', name: 'Hafiz Surya', student_code: '260113', roll_no: '13' },
    { id: 'S14', class_id: 'CLS-01', name: 'Indah Permata', student_code: '260114', roll_no: '14' },
    { id: 'S15', class_id: 'CLS-01', name: 'Kurnia Sandy', student_code: '260115', roll_no: '15' },
    { id: 'S16', class_id: 'CLS-01', name: 'Laila Zahra', student_code: '260116', roll_no: '16' },
    { id: 'S17', class_id: 'CLS-01', name: 'M. Rizky Ramadhan', student_code: '260117', roll_no: '17' },
    { id: 'S18', class_id: 'CLS-01', name: 'Nadya Safitri', student_code: '260118', roll_no: '18' },
    { id: 'S19', class_id: 'CLS-01', name: 'Putri Handayani', student_code: '260119', roll_no: '19' },
    { id: 'S20', class_id: 'CLS-01', name: 'Rahmat Hidayat', student_code: '260120', roll_no: '20' },
    { id: 'S21', class_id: 'CLS-01', name: 'Rian Maulana', student_code: '260121', roll_no: '21' },
    { id: 'S22', class_id: 'CLS-01', name: 'Rina Kusuma', student_code: '260122', roll_no: '22' },
    { id: 'S23', class_id: 'CLS-01', name: 'Salsabila Putri', student_code: '260123', roll_no: '23' },
    { id: 'S24', class_id: 'CLS-01', name: 'Taufik Ismail', student_code: '260124', roll_no: '24' },
    { id: 'S25', class_id: 'CLS-01', name: 'Tiara Anggraini', student_code: '260125', roll_no: '25' },
    { id: 'S26', class_id: 'CLS-01', name: 'Umar Wirahadi', student_code: '260126', roll_no: '26' },
    { id: 'S27', class_id: 'CLS-01', name: 'Vina Panduwinata', student_code: '260127', roll_no: '27' },
    { id: 'S28', class_id: 'CLS-01', name: 'Wahyu Nugroho', student_code: '260128', roll_no: '28' },
    { id: 'S29', class_id: 'CLS-01', name: 'Widya Astuti', student_code: '260129', roll_no: '29' },
    { id: 'S30', class_id: 'CLS-01', name: 'Yoga Pratama', student_code: '260130', roll_no: '30' },
    { id: 'S31', class_id: 'CLS-01', name: 'Zahra Amelia', student_code: '260131', roll_no: '31' },
    { id: 'S32', class_id: 'CLS-01', name: 'Zaki Mubarak', student_code: '260132', roll_no: '32' },
    { id: 'S33', class_id: 'CLS-01', name: 'Alifia Zahran', student_code: '260133', roll_no: '33' },
    { id: 'S34', class_id: 'CLS-01', name: 'Bayu Wicaksono', student_code: '260134', roll_no: '34' }
  ],

  // Table 4: assessments (PRD 6.2)
  assessments: [
    {
      id: 'asm-diagno-2026',
      teacher_id: 'T01',
      class_id: 'CLS-01',
      title: 'Asesmen Diagnostik Tiga Tingkat: Matematika (Kelas XI)',
      subject: 'Matematika',
      grade: 'Fase F / Kelas XI',
      school: 'SMAN 7 Banjarmasin',
      description: 'Pemetaan struktur pemahaman konsep dan miskonsepsi Transformasi Geometri pada awal pembelajaran semester ganjil.',
      token: 'DIAGNO-2026',
      duration_minutes: 30,
      status: 'terbit',
      published_at: '2026-10-23T08:00:00Z',
      instructions: 'Asesmen ini bertujuan mendiagnosis struktur pemahaman konsep dan miskonsepsi Anda pada mata pelajaran Matematika. Kerjakan secara mandiri dengan jujur tanpa bantuan alat hitung otomatis.'
    },
    {
      id: 'asm-mat-xi-1',
      teacher_id: 'T01',
      class_id: 'CLS-02',
      title: 'Asesmen Diagnostik Matematika — Kelas XI MIPA 1',
      subject: 'Matematika',
      grade: 'Fase F / Kelas XI',
      school: 'SMAN 7 Banjarmasin',
      description: 'Instrumen three-tier diagnostik transformasi geometri kelas XI MIPA 1.',
      token: 'MAT-XI',
      duration_minutes: 30,
      status: 'terbit',
      published_at: '2026-10-22T08:00:00Z',
      instructions: 'Kerjakan soal 3-tingkat berikut dengan teliti.'
    },
    {
      id: 'asm-mat-x',
      teacher_id: 'T02',
      class_id: 'CLS-04',
      title: 'Asesmen Diagnostik Matematika — Kelas X (Eksponen & Logaritma)',
      subject: 'Matematika',
      grade: 'Fase E / Kelas X',
      school: 'SMAN 7 Banjarmasin',
      description: 'Diagnostik pemahaman konsep dasar eksponen dan logaritma.',
      token: 'MAT-X',
      duration_minutes: 35,
      status: 'terbit',
      published_at: '2026-10-20T08:00:00Z',
      instructions: 'Pilihlah jawaban utama, alasan, dan keyakinan Anda.'
    },
    {
      id: 'asm-mat-xii',
      teacher_id: 'T03',
      class_id: 'CLS-03',
      title: 'Asesmen Diagnostik Kalkulus Diferensial — Kelas XII',
      subject: 'Matematika',
      grade: 'Fase F+ / Kelas XII',
      school: 'SMAN 7 Banjarmasin',
      description: 'Instrumen three-tier diagnostik turunan fungsi aljabar dan trigonometri.',
      token: 'MAT-XII',
      duration_minutes: 40,
      status: 'draf',
      published_at: null,
      instructions: 'Draf asesmen persiapan ujian sekolah.'
    }
  ],

  // Table 5: assessment_participants (PRD 6.2)
  assessment_participants: [],

  // Table 6: concepts (PRD 6.2)
  concepts: [
    { id: 'C01', subject: 'Matematika', name: 'Translasi Vektor pada Bidang Cartesius' },
    { id: 'C02', subject: 'Matematika', name: 'Refleksi Titik terhadap Garis y = -x' },
    { id: 'C03', subject: 'Matematika', name: 'Rotasi Sudut Positif Berlawanan Arah Jarum Jam' },
    { id: 'C04', subject: 'Matematika', name: 'Dilatasi Bangun Datar dan Perubahan Luas Bidang' },
    { id: 'C05', subject: 'Matematika', name: 'Komposisi Transformasi Matriks Perkalian Non-Komutatif' },
    { id: 'C06', subject: 'Matematika', name: 'Refleksi Garis Vertikal x = h dan Jarak Titik Invarian' }
  ],

  // Table 7: misconceptions (PRD 6.2)
  misconceptions: [
    { id: 'M01', concept_id: 'C01', code: 'MIS-TRANS-01', description: 'Miskonsepsi Pengurangan Translasi: Menghitung translasi dengan mengurangkan koordinat titik asal terhadap vektor (tertukar pergeseran grafik fungsi).' },
    { id: 'M02', concept_id: 'C01', code: 'MIS-TRANS-02', description: 'Miskonsepsi Perkalian Translasi: Menganggap komponen vektor translasi sebagai faktor pengali skalar koordinat.' },
    { id: 'M03', concept_id: 'C02', code: 'MIS-REFL-01', description: 'Miskonsepsi Refleksi Garis y = -x: Menegaskan tanda tanpa menukar posisi absis dan ordinat, atau tertukar dengan refleksi y = x.' },
    { id: 'M04', concept_id: 'C03', code: 'MIS-ROT-01', description: 'Miskonsepsi Rotasi Positif: Menganggap rotasi positif sudut searah jarum jam seperti putaran jam analog.' },
    { id: 'M05', concept_id: 'C04', code: 'MIS-DIL-01', description: 'Miskonsepsi Luas Dilatasi Linier: Mengalikan luas bidang dengan faktor k secara linier (Luas x k) bukan kuadratik (Luas x k²).' },
    { id: 'M06', concept_id: 'C05', code: 'MIS-KOMP-01', description: 'Miskonsepsi Komutatif Matriks: Menganggap komposisi T2 ∘ T1 dapat dikerjakan dengan perkalian urutan T1 x T2.' },
    { id: 'M07', concept_id: 'C06', code: 'MIS-REFL-02', description: 'Miskonsepsi Refleksi Vertikal x = h: Menggunakan rumus x\' = 2h - x secara terbalik atau merubah ordinat y.' }
  ],

  // Table 8: questions (PRD 6.2)
  questions: [
    {
      id: 'q1',
      assessment_id: 'asm-diagno-2026',
      concept_id: 'C01',
      order_no: 1,
      stem_latex: 'Sebuah titik $P(2, -3)$ pada bidang koordinat Cartesius ditranslasikan oleh vektor translasi $T = \\begin{pmatrix} -5 \\\\ 7 \\end{pmatrix}$. Manakah koordinat bayangan titik $P\'$ yang dihasilkan setelah pergeseran tersebut?',
      media_url: null,
      media_type: 'grafik',
      media_caption: 'Gambar 1. Pergeseran vektor posisi titik P(2, -3) oleh translasi T = (-5, 7) pada bidang Cartesius.'
    },
    {
      id: 'q2',
      assessment_id: 'asm-diagno-2026',
      concept_id: 'C02',
      order_no: 2,
      stem_latex: 'Titik $A(3, 1)$ dicerminkan terhadap garis $y = -x$. Manakah koordinat bayangan $A\'$ yang tepat beserta matriks transformasinya?',
      media_url: null,
      media_type: 'grafik',
      media_caption: 'Gambar 2. Pencerminan titik A(3, 1) terhadap garis cermin miring y = -x.'
    },
    {
      id: 'q3',
      assessment_id: 'asm-diagno-2026',
      concept_id: 'C03',
      order_no: 3,
      stem_latex: 'Titik $B(4, 2)$ dirotasikan sebesar $+90^\\circ$ dengan pusat rotasi di titik asal $O(0,0)$ pada bidang koordinat. Manakah koordinat bayangan titik $B\'$ yang terbentuk?',
      media_url: null,
      media_type: 'grafik',
      media_caption: 'Gambar 3. Rotasi sudut positif +90° titik B(4, 2) berlawanan arah putaran jarum jam terhadap titik asal O(0,0).'
    },
    {
      id: 'q4',
      assessment_id: 'asm-diagno-2026',
      concept_id: 'C04',
      order_no: 4,
      stem_latex: 'Sebuah segitiga siku-siku $ABC$ memiliki luas awal $12\\text{ cm}^2$. Segitiga tersebut didilatasi dengan faktor skala $k = 3$ dengan titik pusat dilatasi di $O(0,0)$. Berapakah luas bayangan segitiga $A\'B\'C\'$ setelah perbesaran tersebut?',
      media_url: null,
      media_type: 'grafik',
      media_caption: 'Gambar 4. Perbesaran dilatasi segitiga dengan faktor skala k = 3 dari pusat dilatasi O(0,0).'
    },
    {
      id: 'q5',
      assessment_id: 'asm-diagno-2026',
      concept_id: 'C05',
      order_no: 5,
      stem_latex: 'Sebuah titik $K(1, 2)$ ditransformasikan oleh matriks $M_1 = \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix}$ kemudian dilanjutkan oleh transformasi dengan matriks $M_2 = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$. Tentukan matriks transformasi tunggal komposisi $(M_2 \\circ M_1)$ dan koordinat bayangan akhir $K\'\'$!',
      media_url: null,
      media_type: 'grafik',
      media_caption: 'Gambar 5. Diagram skema komposisi berurutan dua transformasi linear pada bidang Cartesius.'
    },
    {
      id: 'q6',
      assessment_id: 'asm-diagno-2026',
      concept_id: 'C06',
      order_no: 6,
      stem_latex: 'Titik $C(-2, 5)$ direfleksikan terhadap garis vertikal $x = 3$. Berapakah koordinat bayangan titik $C\'$ hasil pencerminan tersebut?',
      media_url: null,
      media_type: 'grafik',
      media_caption: 'Gambar 6. Refleksi koordinat titik terhadap sumbu cermin vertikal x = 3.'
    }
  ],

  // Table 9: question_options (Tier 1 - Jawaban) (PRD 6.2)
  question_options: [
    // Q1
    { id: 'opt-q1-a', question_id: 'q1', label: 'A', content_latex: '$P\'(7, -10)$', is_correct: false },
    { id: 'opt-q1-b', question_id: 'q1', label: 'B', content_latex: '$P\'(-3, -10)$', is_correct: false },
    { id: 'opt-q1-c', question_id: 'q1', label: 'C', content_latex: '$P\'(-3, 4)$', is_correct: true },
    { id: 'opt-q1-d', question_id: 'q1', label: 'D', content_latex: '$P\'(3, -4)$', is_correct: false },
    { id: 'opt-q1-e', question_id: 'q1', label: 'E', content_latex: '$P\'(-10, -21)$', is_correct: false },
    // Q2
    { id: 'opt-q2-a', question_id: 'q2', label: 'A', content_latex: '$A\'(1, 3)$', is_correct: false },
    { id: 'opt-q2-b', question_id: 'q2', label: 'B', content_latex: '$A\'(-3, -1)$', is_correct: false },
    { id: 'opt-q2-c', question_id: 'q2', label: 'C', content_latex: '$A\'(-1, -3)$', is_correct: true },
    { id: 'opt-q2-d', question_id: 'q2', label: 'D', content_latex: '$A\'(-1, 3)$', is_correct: false },
    { id: 'opt-q2-e', question_id: 'q2', label: 'E', content_latex: '$A\'(3, -1)$', is_correct: false },
    // Q3
    { id: 'opt-q3-a', question_id: 'q3', label: 'A', content_latex: '$B\'(2, -4)$', is_correct: false },
    { id: 'opt-q3-b', question_id: 'q3', label: 'B', content_latex: '$B\'(-2, 4)$', is_correct: true },
    { id: 'opt-q3-c', question_id: 'q3', label: 'C', content_latex: '$B\'(-4, -2)$', is_correct: false },
    { id: 'opt-q3-d', question_id: 'q3', label: 'D', content_latex: '$B\'(4, -2)$', is_correct: false },
    { id: 'opt-q3-e', question_id: 'q3', label: 'E', content_latex: '$B\'(2, 4)$', is_correct: false },
    // Q4
    { id: 'opt-q4-a', question_id: 'q4', label: 'A', content_latex: '$36\\text{ cm}^2$', is_correct: false },
    { id: 'opt-q4-b', question_id: 'q4', label: 'B', content_latex: '$108\\text{ cm}^2$', is_correct: true },
    { id: 'opt-q4-c', question_id: 'q4', label: 'C', content_latex: '$72\\text{ cm}^2$', is_correct: false },
    { id: 'opt-q4-d', question_id: 'q4', label: 'D', content_latex: '$24\\text{ cm}^2$', is_correct: false },
    { id: 'opt-q4-e', question_id: 'q4', label: 'E', content_latex: '$144\\text{ cm}^2$', is_correct: false },
    // Q5
    { id: 'opt-q5-a', question_id: 'q5', label: 'A', content_latex: '$\\begin{pmatrix} 0 & 3 \\\\ 2 & 0 \\end{pmatrix}$ dan $K\'\'(6, 2)$', is_correct: true },
    { id: 'opt-q5-b', question_id: 'q5', label: 'B', content_latex: '$\\begin{pmatrix} 0 & 2 \\\\ 3 & 0 \\end{pmatrix}$ dan $K\'\'(4, 3)$', is_correct: false },
    { id: 'opt-q5-c', question_id: 'q5', label: 'C', content_latex: '$\\begin{pmatrix} 2 & 1 \\\\ 1 & 3 \\end{pmatrix}$ dan $K\'\'(4, 7)$', is_correct: false },
    { id: 'opt-q5-d', question_id: 'q5', label: 'D', content_latex: '$\\begin{pmatrix} 0 & 0 \\\\ 0 & 6 \\end{pmatrix}$ dan $K\'\'(0, 12)$', is_correct: false },
    { id: 'opt-q5-e', question_id: 'q5', label: 'E', content_latex: '$\\begin{pmatrix} 2 & 3 \\\\ 0 & 0 \\end{pmatrix}$ dan $K\'\'(8, 0)$', is_correct: false },
    // Q6
    { id: 'opt-q6-a', question_id: 'q6', label: 'A', content_latex: '$C\'(8, 5)$', is_correct: true },
    { id: 'opt-q6-b', question_id: 'q6', label: 'B', content_latex: '$C\'(4, 5)$', is_correct: false },
    { id: 'opt-q6-c', question_id: 'q6', label: 'C', content_latex: '$C\'(-2, 1)$', is_correct: false },
    { id: 'opt-q6-d', question_id: 'q6', label: 'D', content_latex: '$C\'(1, 5)$', is_correct: false },
    { id: 'opt-q6-e', question_id: 'q6', label: 'E', content_latex: '$C\'(5, -2)$', is_correct: false }
  ],

  // Table 10: question_reasons (Tier 2 - Alasan) (PRD 6.2)
  question_reasons: [
    // Q1
    { id: 'rea-q1-a', question_id: 'q1', label: 'A', content_latex: 'Translasi titik dilakukan dengan mengurangkan koordinat titik asal terhadap vektor: $x\' = x - a$ dan $y\' = y - b$.', is_correct: false, misconception_id: 'M01' },
    { id: 'rea-q1-b', question_id: 'q1', label: 'B', content_latex: 'Berdasarkan prinsip translasi, koordinat bayangan diperoleh dengan menjumlahkan masing-masing komponen: $x\' = x + a = 2 + (-5) = -3$ dan $y\' = y + b = -3 + 7 = 4$.', is_correct: true, misconception_id: null },
    { id: 'rea-q1-c', question_id: 'q1', label: 'C', content_latex: 'Vektor translasi bertindak sebagai faktor pengali skalar terhadap koordinat titik: $x\' = x \\cdot a$ dan $y\' = y \\cdot b$.', is_correct: false, misconception_id: 'M02' },
    { id: 'rea-q1-d', question_id: 'q1', label: 'D', content_latex: 'Komponen translasi $a$ menggeser sumbu $Y$ dan komponen $b$ menggeser sumbu $X$ secara terbalik.', is_correct: false, misconception_id: null },
    { id: 'rea-q1-e', question_id: 'q1', label: 'E', content_latex: 'Translasi hanya mengubah tanda positif/negatif tanpa mengubah nilai mutlak dari koordinat titik awal.', is_correct: false, misconception_id: null },
    // Q2
    { id: 'rea-q2-a', question_id: 'q2', label: 'A', content_latex: 'Pencerminan terhadap garis $y = -x$ menukar posisi absis dan ordinat serta menegasikan tandanya: $(x, y) \\to (-y, -x)$, bersesuaian dengan matriks $\\begin{pmatrix} 0 & -1 \\\\ -1 & 0 \\end{pmatrix}$.', is_correct: true, misconception_id: null },
    { id: 'rea-q2-b', question_id: 'q2', label: 'B', content_latex: 'Pencerminan terhadap garis $y = -x$ hanya mengubah tanda kedua komponen menjadi negatif tanpa menukar posisinya: $(x, y) \\to (-x, -y)$.', is_correct: false, misconception_id: 'M03' },
    { id: 'rea-q2-c', question_id: 'q2', label: 'C', content_latex: 'Pencerminan selalu menukar posisi koordinat saja $(x, y) \\to (y, x)$ karena gradien garisnya bernilai mutlak 1.', is_correct: false, misconception_id: 'M03' },
    { id: 'rea-q2-d', question_id: 'q2', label: 'D', content_latex: 'Jarak titik ke garis cermin selalu menghasilkan nilai ordinat yang tetap bertanda positif.', is_correct: false, misconception_id: null },
    { id: 'rea-q2-e', question_id: 'q2', label: 'E', content_latex: 'Garis $y = -x$ identik dengan pencerminan terhadap sumbu $X$ yang dilanjutkan refleksi sumbu $Y$.', is_correct: false, misconception_id: null },
    // Q3
    { id: 'rea-q3-a', question_id: 'q3', label: 'A', content_latex: 'Rotasi sudut positif berputar searah jarum jam seperti putaran jarum jam biasa: $(x, y) \\to (y, -x)$.', is_correct: false, misconception_id: 'M04' },
    { id: 'rea-q3-b', question_id: 'q3', label: 'B', content_latex: 'Konvensi matematika menetapkan sudut rotasi $+90^\\circ$ berlawanan arah jarum jam dengan matriks $\\begin{pmatrix} \\cos 90^\\circ & -\\sin 90^\\circ \\\\ \\sin 90^\\circ & \\cos 90^\\circ \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$, sehingga $(x, y) \\to (-y, x)$.', is_correct: true, misconception_id: null },
    { id: 'rea-q3-c', question_id: 'q3', label: 'C', content_latex: 'Rotasi $+90^\\circ$ menegaskan seluruh koordinat awal: $(x, y) \\to (-x, -y)$.', is_correct: false, misconception_id: null },
    { id: 'rea-q3-d', question_id: 'q3', label: 'D', content_latex: 'Hanya ordinat yang berubah tanda karena berputar terhadap sumbu horizontal.', is_correct: false, misconception_id: null },
    { id: 'rea-q3-e', question_id: 'q3', label: 'E', content_latex: 'Rotasi terhadap pusat $(0,0)$ selalu mempertahankan kuadran letak titik awal.', is_correct: false, misconception_id: null },
    // Q4
    { id: 'rea-q4-a', question_id: 'q4', label: 'A', content_latex: 'Perubahan luas bangun datar dua dimensi akibat dilatasi sebanding linier dengan faktor skalanya: $L\' = k \\cdot L = 3 \\cdot 12 = 36\\text{ cm}^2$.', is_correct: false, misconception_id: 'M05' },
    { id: 'rea-q4-b', question_id: 'q4', label: 'B', content_latex: 'Karena bangun berdimensi dua, perbesaran berlaku pada kedua dimensi panjang dan tinggi, sehingga luas berubah secara kuadratik: $L\' = k^2 \\cdot L = 3^2 \\cdot 12 = 9 \\cdot 12 = 108\\text{ cm}^2$.', is_correct: true, misconception_id: null },
    { id: 'rea-q4-c', question_id: 'q4', label: 'C', content_latex: 'Luas bangun setelah dilatasi adalah hasil kali faktor skala dengan keliling segitiga.', is_correct: false, misconception_id: null },
    { id: 'rea-q4-d', question_id: 'q4', label: 'D', content_latex: 'Faktor skala $k = 3$ hanya memengaruhi sisi alas sedangkan tinggi segitiga tetap konstan.', is_correct: false, misconception_id: null },
    { id: 'rea-q4-e', question_id: 'q4', label: 'E', content_latex: 'Dilatasi dari pusat $O(0,0)$ melipatgandakan luas segitiga sebesar $k^3$ seperti volume ruang.', is_correct: false, misconception_id: null },
    // Q5
    { id: 'rea-q5-a', question_id: 'q5', label: 'A', content_latex: 'Komposisi matriks bersifat komutatif sehingga urutan perkalian $M_1 \\cdot M_2$ atau $M_2 \\cdot M_1$ sama saja.', is_correct: false, misconception_id: 'M06' },
    { id: 'rea-q5-b', question_id: 'q5', label: 'B', content_latex: 'Operasi "dilanjutkan oleh $M_2$" secara aljabar linear dirumuskan sebagai perkalian dari kiri ke kanan: $(M_2 \\circ M_1) = M_2 \\cdot M_1 = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix} = \\begin{pmatrix} 0 & 3 \\\\ 2 & 0 \\end{pmatrix}$.', is_correct: true, misconception_id: null },
    { id: 'rea-q5-c', question_id: 'q5', label: 'C', content_latex: 'Dua matriks transformasi digabungkan dengan menjumlahkan elemen-elemen yang seletak: $M_2 + M_1$.', is_correct: false, misconception_id: null },
    { id: 'rea-q5-d', question_id: 'q5', label: 'D', content_latex: 'Matriks refleksi $M_2$ membatalkan efek penskalaan dari matriks pertama $M_1$.', is_correct: false, misconception_id: null },
    { id: 'rea-q5-e', question_id: 'q5', label: 'E', content_latex: 'Koordinat bayangan dihitung dengan mengalikan titik secara langsung tanpa matriks gabungan.', is_correct: false, misconception_id: null },
    // Q6
    { id: 'rea-q6-a', question_id: 'q6', label: 'A', content_latex: 'Refleksi terhadap garis vertikal $x = h$ memenuhi rumus $x\' = 2h - x = 2(3) - (-2) = 6 + 2 = 8$, sedangkan nilai ordinat $y$ tidak berubah ($y\' = y = 5$).', is_correct: true, misconception_id: null },
    { id: 'rea-q6-b', question_id: 'q6', label: 'B', content_latex: 'Jarak bayangan cukup diperoleh dengan menjumlahkan absis awal dengan nilai sumbu cermin: $x\' = x + h = -2 + 3 = 1$.', is_correct: false, misconception_id: 'M07' },
    { id: 'rea-q6-c', question_id: 'q6', label: 'C', content_latex: 'Pencerminan garis vertikal membalik tanda ordinat $y$ menjadi $-y$ dengan absis tetap.', is_correct: false, misconception_id: null },
    { id: 'rea-q6-d', question_id: 'q6', label: 'D', content_latex: 'Refleksi $x = 3$ menggeser titik sebanyak 3 satuan ke kanan searah sumbu X.', is_correct: false, misconception_id: null },
    { id: 'rea-q6-e', question_id: 'q6', label: 'E', content_latex: 'Titik pada sisi kiri garis cermin selalu menghasilkan bayangan berkoordinat negatif.', is_correct: false, misconception_id: null }
  ],

  // Table 11: attempts (PRD 6.2)
  attempts: [
    {
      id: 'att-s01',
      assessment_id: 'asm-diagno-2026',
      student_id: 'S01',
      started_at: '2026-10-23T08:05:00Z',
      submitted_at: '2026-10-23T08:26:00Z',
      status: 'selesai',
      total_score: 88,
      concept_profile: 'paham',
      pCount: 8,
      mCount: 1,
      tCount: 1,
      cheat_count: 0
    },
    {
      id: 'att-s02',
      assessment_id: 'asm-diagno-2026',
      student_id: 'S02',
      started_at: '2026-10-23T08:06:00Z',
      submitted_at: '2026-10-23T08:29:00Z',
      status: 'selesai',
      total_score: 62,
      concept_profile: 'miskonsepsi',
      pCount: 5,
      mCount: 4,
      tCount: 1,
      cheat_count: 1
    },
    {
      id: 'att-s03',
      assessment_id: 'asm-diagno-2026',
      student_id: 'S03',
      started_at: '2026-10-23T08:05:00Z',
      submitted_at: '2026-10-23T08:24:00Z',
      status: 'selesai',
      total_score: 92,
      concept_profile: 'paham',
      pCount: 9,
      mCount: 1,
      tCount: 0,
      cheat_count: 0
    },
    {
      id: 'att-s05',
      assessment_id: 'asm-diagno-2026',
      student_id: 'S05',
      started_at: '2026-10-23T08:07:00Z',
      submitted_at: '2026-10-23T08:30:00Z',
      status: 'selesai',
      total_score: 48,
      concept_profile: 'miskonsepsi',
      pCount: 3,
      mCount: 5,
      tCount: 2,
      cheat_count: 3
    },
    {
      id: 'att-s06',
      assessment_id: 'asm-diagno-2026',
      student_id: 'S06',
      started_at: '2026-10-23T08:05:00Z',
      submitted_at: '2026-10-23T08:28:00Z',
      status: 'selesai',
      total_score: 38,
      concept_profile: 'tidak-paham',
      pCount: 2,
      mCount: 2,
      tCount: 6,
      cheat_count: 0
    }
  ],

  // Table 12: responses (PRD 6.2)
  responses: [
    {
      id: 'rsp-s05-q1',
      attempt_id: 'att-s05',
      question_id: 'q1',
      tier1_option_id: 'opt-q1-a',
      tier2_reason_id: 'rea-q1-a',
      tier3_confidence: 'yakin',
      is_tier1_correct: false,
      is_tier2_correct: false,
      concept_profile: 'miskonsepsi',
      answered_at: '2026-10-23T08:12:00Z'
    },
    {
      id: 'rsp-s05-q2',
      attempt_id: 'att-s05',
      question_id: 'q2',
      tier1_option_id: 'opt-q2-b',
      tier2_reason_id: 'rea-q2-b',
      tier3_confidence: 'yakin',
      is_tier1_correct: false,
      is_tier2_correct: false,
      concept_profile: 'miskonsepsi',
      answered_at: '2026-10-23T08:16:00Z'
    },
    {
      id: 'rsp-s05-q3',
      attempt_id: 'att-s05',
      question_id: 'q3',
      tier1_option_id: 'opt-q3-b',
      tier2_reason_id: 'rea-q3-b',
      tier3_confidence: 'yakin',
      is_tier1_correct: true,
      is_tier2_correct: true,
      concept_profile: 'paham',
      answered_at: '2026-10-23T08:20:00Z'
    }
  ],

  // Table 13: item_analyses (PRD 6.2)
  item_analyses: [
    {
      id: 'ia-q1',
      assessment_id: 'asm-diagno-2026',
      question_id: 'q1',
      difficulty_index: 0.52,
      difficulty_category: 'Sedang',
      discrimination_index: 0.48,
      discrimination_category: 'Sangat Baik',
      validity_value: 0.65,
      validity_category: 'Valid Tinggi',
      reliability_value: 0.81,
      category: 'Dipertahankan',
      recommendation: 'Soal memiliki daya beda sangat baik dan reliabel. Disarankan tetap dipertahankan pada bank soal utama.'
    },
    {
      id: 'ia-q2',
      assessment_id: 'asm-diagno-2026',
      question_id: 'q2',
      difficulty_index: 0.64,
      difficulty_category: 'Sedang',
      discrimination_index: 0.42,
      discrimination_category: 'Sangat Baik',
      validity_value: 0.59,
      validity_category: 'Valid Sedang',
      reliability_value: 0.79,
      category: 'Dipertahankan',
      recommendation: 'Kualitas butir sangat baik. Pengecoh Tier 2 efektif mendeteksi miskonsepsi pertukaran garis refleksi.'
    },
    {
      id: 'ia-q3',
      assessment_id: 'asm-diagno-2026',
      question_id: 'q3',
      difficulty_index: 0.38,
      difficulty_category: 'Sukar',
      discrimination_index: 0.35,
      discrimination_category: 'Baik',
      validity_value: 0.52,
      validity_category: 'Valid Sedang',
      reliability_value: 0.75,
      category: 'Dipertahankan',
      recommendation: 'Taraf kesukaran cukup tinggi karena miskonsepsi arah jarum jam. Layak dipertahankan sebagai butir diskriminatif.'
    },
    {
      id: 'ia-q4',
      assessment_id: 'asm-diagno-2026',
      question_id: 'q4',
      difficulty_index: 0.28,
      difficulty_category: 'Sukar',
      discrimination_index: 0.22,
      discrimination_category: 'Cukup',
      validity_value: 0.44,
      validity_category: 'Valid Rendah',
      reliability_value: 0.71,
      category: 'Perlu Diperbaiki',
      recommendation: 'Perjelas gambar ilustrasi perbesaran luas segitiga. Tambahkan keterangan skala pada kisi diagram koordinat Cartesius.'
    },
    {
      id: 'ia-q5',
      assessment_id: 'asm-diagno-2026',
      question_id: 'q5',
      difficulty_index: 0.45,
      difficulty_category: 'Sedang',
      discrimination_index: 0.39,
      discrimination_category: 'Baik',
      validity_value: 0.58,
      validity_category: 'Valid Sedang',
      reliability_value: 0.78,
      category: 'Dipertahankan',
      recommendation: 'Butir soal efektif menguji sifat non-komutatif matriks komposisi linear. Pengecoh Tier 2 bekerja maksimal.'
    },
    {
      id: 'ia-q6',
      assessment_id: 'asm-diagno-2026',
      question_id: 'q6',
      difficulty_index: 0.59,
      difficulty_category: 'Sedang',
      discrimination_index: 0.44,
      discrimination_category: 'Sangat Baik',
      validity_value: 0.63,
      validity_category: 'Valid Tinggi',
      reliability_value: 0.80,
      category: 'Dipertahankan',
      recommendation: 'Daya pembeda tajam antara siswa yang memahami rumus 2h - x dan yang sekadar menebak jarak sumbu.'
    }
  ],

  // Table 14: proctoring_events (PRD 6.2)
  proctoring_events: [
    {
      id: 'proc-01',
      attempt_id: 'att-s05',
      student_name: 'Budi Pratama',
      class_name: 'XI MIPA 2',
      teacher_name: 'Bambang Hermanto, S.Pd., M.Si.',
      event_type: 'pindah_tab',
      violation_text: 'Pindah Tab Browser (Keluar jendela)',
      severity: 'berat',
      occurred_at: '2026-10-23T08:15:30Z',
      action_taken: 'Peringatan ke-3 & Notifikasi Pengawas'
    },
    {
      id: 'proc-02',
      attempt_id: 'att-s09',
      student_name: 'Eko Prasetyo',
      class_name: 'XI MIPA 2',
      teacher_name: 'Bambang Hermanto, S.Pd., M.Si.',
      event_type: 'keluar_layar_penuh',
      violation_text: 'Keluar dari Mode Fullscreen',
      severity: 'ringan',
      occurred_at: '2026-10-23T08:18:10Z',
      action_taken: 'Layar Terkunci & Kembali Otomatis'
    },
    {
      id: 'proc-03',
      attempt_id: 'att-x-01',
      student_name: 'Rangga Wijaya',
      class_name: 'X-A',
      teacher_name: 'Dra. Siti Rahmawati, M.Pd.',
      event_type: 'buka_devtools',
      violation_text: 'Membuka DevTools / Inspect Element',
      severity: 'berat',
      occurred_at: '2026-10-23T09:14:00Z',
      action_taken: 'Sesi Ujian Ditangguhkan Sementara'
    },
    {
      id: 'proc-04',
      attempt_id: 'att-xii-01',
      student_name: 'Farhan Maulana',
      class_name: 'XII MIPA 1',
      teacher_name: 'Dr. Hendra Gunawan, M.Si.',
      event_type: 'salin_teks',
      violation_text: 'Upaya Copy-Paste Teks Soal',
      severity: 'ringan',
      occurred_at: '2026-10-23T08:50:00Z',
      action_taken: 'Blokir Clipboard Otomatis'
    }
  ],

  // Table 15: follow_up_notes (PRD 6.2)
  follow_up_notes: [
    {
      id: 'fup-01',
      teacher_id: 'T01',
      student_id: 'S05',
      student_name: 'Budi Pratama',
      assessment_id: 'asm-diagno-2026',
      note: 'Diberikan bimbingan remedial khusus konsep dilatasi linier vs kuadratik dan latihan pergeseran translasi vektor $P\' = P + T$. Jadwal penguatan: Kamis, 29 Okt 2026.',
      status: 'Dijadwalkan',
      created_at: '2026-10-23T11:00:00Z'
    },
    {
      id: 'fup-02',
      teacher_id: 'T01',
      student_id: 'S06',
      student_name: 'Citra Lestari',
      assessment_id: 'asm-diagno-2026',
      note: 'Perlu penguatan konsep dasar koordinat Cartesius dan operasi bilangan bertanda negatif sebelum memasuki transformasi geometri lanjut.',
      status: 'Sedang Berjalan',
      created_at: '2026-10-23T11:15:00Z'
    },
    {
      id: 'fup-03',
      teacher_id: 'T01',
      student_id: 'S09',
      student_name: 'Eko Prasetyo',
      assessment_id: 'asm-diagno-2026',
      note: 'Mengalami kesulitan membaca notasi matriks transformasi. Direkomendasikan tutor sebaya bersama Aditya Pratama.',
      status: 'Selesai',
      created_at: '2026-10-23T11:30:00Z'
    }
  ],

  // Table 16: email_logs (PRD 6.2)
  email_logs: [
    {
      id: 'eml-01',
      teacher_id: 'T01',
      assessment_id: 'asm-diagno-2026',
      recipient_email: 'bambang.hermanto@sman7banjarmasin.sch.id',
      subject: 'Rekap Asesmen Diagnostik Matematika — XI MIPA 2',
      status: 'terkirim',
      sent_at: '2026-10-23T13:15:00Z',
      notes: 'Berisi rekap profil 34 siswa, ringkasan miskonsepsi, dan psikometrik butir soal.'
    }
  ],

  // Audit Logs (PRD 2.2 Non-fungsional Audit & Admin Activity)
  audit_logs: [
    {
      id: 'aud-01',
      time: '2026-10-23T13:15:00Z',
      time_formatted: '23 Okt 2026, 21:15',
      actor: 'Bambang Hermanto, S.Pd., M.Si.',
      role: 'Guru',
      action: 'Mengirim email rekap asesmen Matematika XI MIPA 2',
      ip: '192.168.1.45',
      status: 'Sukses'
    },
    {
      id: 'aud-02',
      time: '2026-10-23T12:30:00Z',
      time_formatted: '23 Okt 2026, 20:30',
      actor: 'Administrator SiDag (FKIP ULM)',
      role: 'Admin',
      action: 'Login ke Portal Administrator Matematika',
      ip: '192.168.1.2',
      status: 'Sukses'
    },
    {
      id: 'aud-03',
      time: '2026-10-23T06:10:00Z',
      time_formatted: '23 Okt 2026, 14:10',
      actor: 'Bambang Hermanto, S.Pd., M.Si.',
      role: 'Guru',
      action: 'Menerbitkan asesmen Matematika DIAGNO-2026',
      ip: '192.168.1.52',
      status: 'Sukses'
    },
    {
      id: 'aud-04',
      time: '2026-10-22T08:45:00Z',
      time_formatted: '22 Okt 2026, 16:45',
      actor: 'Administrator SiDag (FKIP ULM)',
      role: 'Admin',
      action: 'Menonaktifkan akun guru: Dewi Sartika, S.Pd.',
      ip: '192.168.1.2',
      status: 'Sukses'
    },
    {
      id: 'aud-05',
      time: '2026-10-22T03:20:00Z',
      time_formatted: '22 Okt 2026, 11:20',
      actor: 'Budi Pratama (Siswa)',
      role: 'Siswa',
      action: 'Terdeteksi 3x pindah tab pada asesmen DIAGNO-2026',
      ip: '192.168.1.108',
      status: 'Tercatat'
    }
  ]
};

class DataStore {
  constructor() {
    this.data = JSON.parse(JSON.stringify(initialData));
    this.initPersistence();
  }

  initPersistence() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Merge with initial data to ensure all tables exist
        this.data = { ...this.data, ...parsed };
      } else {
        this.persist();
      }
    } catch (e) {
      console.warn('Persistence initialization fallback to memory:', e.message);
    }
  }

  persist() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Error saving data to disk:', e.message);
    }
  }

  getTable(name) {
    if (!this.data[name]) {
      this.data[name] = [];
    }
    return this.data[name];
  }

  logAudit(actor, role, action, ip = '127.0.0.1', status = 'Sukses') {
    const now = new Date();
    const timeFormatted = now.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const entry = {
      id: 'aud-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      time: now.toISOString(),
      time_formatted: timeFormatted,
      actor,
      role,
      action,
      ip,
      status
    };
    this.getTable('audit_logs').unshift(entry);
    this.persist();
    return entry;
  }
}

const store = new DataStore();
module.exports = store;
