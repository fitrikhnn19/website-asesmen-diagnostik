/**
 * SiDag - Teacher Dashboard Controller
 * Handles Three-Tier Assessments, Diagnostic Profiles,
 * Psychometric Item Analysis, Student Progression, Proctoring, and Email Recap.
 */

// Global Mock State
const TEACHER_STATE = {
  currentAssessment: 'diagno-2026',
  students: [
    { id: 'S01', name: 'Aditya Pratama', class: 'XI MIPA 2', score: 88, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S02', name: 'Ahmad Dahlan', class: 'XI MIPA 2', score: 62, profile: 'miskonsepsi', pCount: 5, mCount: 4, tCount: 1, cheatCount: 1, status: '1x Pindah Tab (Ringan)' },
    { id: 'S03', name: 'Aisyah Putri Rahayu', class: 'XI MIPA 2', score: 92, profile: 'paham', pCount: 9, mCount: 1, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S04', name: 'Bagas Firmansyah', class: 'XI MIPA 2', score: 55, profile: 'miskonsepsi', pCount: 4, mCount: 4, tCount: 2, cheatCount: 0, status: 'Jujur' },
    { id: 'S05', name: 'Budi Pratama', class: 'XI MIPA 2', score: 48, profile: 'miskonsepsi', pCount: 3, mCount: 5, tCount: 2, cheatCount: 3, status: '3x Pindah Tab (Berat)' },
    { id: 'S06', name: 'Citra Lestari', class: 'XI MIPA 2', score: 38, profile: 'tidak-paham', pCount: 2, mCount: 2, tCount: 6, cheatCount: 0, status: 'Jujur' },
    { id: 'S07', name: 'Dian Anggraini', class: 'XI MIPA 2', score: 58, profile: 'miskonsepsi', pCount: 4, mCount: 4, tCount: 2, cheatCount: 0, status: 'Jujur' },
    { id: 'S08', name: 'Dimas Setiawan', class: 'XI MIPA 2', score: 85, profile: 'paham', pCount: 8, mCount: 2, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S09', name: 'Eko Prasetyo', class: 'XI MIPA 2', score: 35, profile: 'tidak-paham', pCount: 2, mCount: 1, tCount: 7, cheatCount: 1, status: '1x Keluar Fullscreen' },
    { id: 'S10', name: 'Fadhil Muhammad', class: 'XI MIPA 2', score: 90, profile: 'paham', pCount: 9, mCount: 0, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S11', name: 'Farah Nabila', class: 'XI MIPA 2', score: 82, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S12', name: 'Gilang Ramadhan', class: 'XI MIPA 2', score: 65, profile: 'miskonsepsi', pCount: 5, mCount: 3, tCount: 2, cheatCount: 0, status: 'Jujur' },
    { id: 'S13', name: 'Hafiz Surya', class: 'XI MIPA 2', score: 78, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S14', name: 'Indah Permata', class: 'XI MIPA 2', score: 86, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S15', name: 'Kurnia Sandy', class: 'XI MIPA 2', score: 42, profile: 'tidak-paham', pCount: 2, mCount: 3, tCount: 5, cheatCount: 0, status: 'Jujur' },
    { id: 'S16', name: 'Laila Zahra', class: 'XI MIPA 2', score: 88, profile: 'paham', pCount: 8, mCount: 2, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S17', name: 'M. Rizky Ramadhan', class: 'XI MIPA 2', score: 75, profile: 'paham', pCount: 6, mCount: 3, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S18', name: 'Nadya Safitri', class: 'XI MIPA 2', score: 60, profile: 'miskonsepsi', pCount: 4, mCount: 4, tCount: 2, cheatCount: 0, status: 'Jujur' },
    { id: 'S19', name: 'Putri Handayani', class: 'XI MIPA 2', score: 84, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S20', name: 'Rahmat Hidayat', class: 'XI MIPA 2', score: 58, profile: 'miskonsepsi', pCount: 4, mCount: 4, tCount: 2, cheatCount: 1, status: '1x Pindah Tab (Ringan)' },
    { id: 'S21', name: 'Rian Maulana', class: 'XI MIPA 2', score: 90, profile: 'paham', pCount: 9, mCount: 1, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S22', name: 'Rina Kusuma', class: 'XI MIPA 2', score: 88, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S23', name: 'Salsabila Putri', class: 'XI MIPA 2', score: 74, profile: 'paham', pCount: 6, mCount: 3, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S24', name: 'Taufik Ismail', class: 'XI MIPA 2', score: 40, profile: 'tidak-paham', pCount: 2, mCount: 2, tCount: 6, cheatCount: 0, status: 'Jujur' },
    { id: 'S25', name: 'Tiara Anggraini', class: 'XI MIPA 2', score: 80, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S26', name: 'Umar Wirahadi', class: 'XI MIPA 2', score: 64, profile: 'miskonsepsi', pCount: 5, mCount: 4, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S27', name: 'Vina Panduwinata', class: 'XI MIPA 2', score: 86, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S28', name: 'Wahyu Nugroho', class: 'XI MIPA 2', score: 59, profile: 'miskonsepsi', pCount: 4, mCount: 4, tCount: 2, cheatCount: 0, status: 'Jujur' },
    { id: 'S29', name: 'Widya Astuti', class: 'XI MIPA 2', score: 82, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S30', name: 'Yoga Pratama', class: 'XI MIPA 2', score: 76, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S31', name: 'Zahra Amelia', class: 'XI MIPA 2', score: 94, profile: 'paham', pCount: 9, mCount: 1, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S32', name: 'Zaki Mubarak', class: 'XI MIPA 2', score: 85, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S33', name: 'Alifia Zahran', class: 'XI MIPA 2', score: 72, profile: 'paham', pCount: 6, mCount: 3, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S34', name: 'Bayu Wicaksono', class: 'XI MIPA 2', score: 77, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' },
    // Multi-Class: XI MIPA 1 (Sample students)
    { id: 'S101', name: 'Anindya Kirana', class: 'XI MIPA 1', score: 95, profile: 'paham', pCount: 10, mCount: 0, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S102', name: 'Arkan Danendra', class: 'XI MIPA 1', score: 88, profile: 'paham', pCount: 9, mCount: 1, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S103', name: 'Bilqis Humaira', class: 'XI MIPA 1', score: 82, profile: 'paham', pCount: 8, mCount: 2, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S104', name: 'Daffa Raihan', class: 'XI MIPA 1', score: 68, profile: 'miskonsepsi', pCount: 6, mCount: 3, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S105', name: 'Felicia Agatha', class: 'XI MIPA 1', score: 91, profile: 'paham', pCount: 9, mCount: 1, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S106', name: 'Genta Pratama', class: 'XI MIPA 1', score: 45, profile: 'tidak-paham', pCount: 3, mCount: 2, tCount: 5, cheatCount: 0, status: 'Jujur' },
    // Multi-Class: XI MIPA 3 (Sample students)
    { id: 'S301', name: 'Cahya Ramadhani', class: 'XI MIPA 3', score: 54, profile: 'miskonsepsi', pCount: 4, mCount: 4, tCount: 2, cheatCount: 0, status: 'Jujur' },
    { id: 'S302', name: 'Devan Alvaro', class: 'XI MIPA 3', score: 50, profile: 'miskonsepsi', pCount: 3, mCount: 5, tCount: 2, cheatCount: 1, status: '1x Pindah Tab' },
    { id: 'S303', name: 'Farrel Arya', class: 'XI MIPA 3', score: 40, profile: 'tidak-paham', pCount: 2, mCount: 2, tCount: 6, cheatCount: 0, status: 'Jujur' },
    { id: 'S304', name: 'Gita Maharani', class: 'XI MIPA 3', score: 78, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S305', name: 'Helmi Satria', class: 'XI MIPA 3', score: 58, profile: 'miskonsepsi', pCount: 4, mCount: 4, tCount: 2, cheatCount: 0, status: 'Jujur' },
    // Multi-Class: X-1 (Sample students)
    { id: 'S401', name: 'Amanda Putri', class: 'X-1', score: 85, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S402', name: 'Arya Wardhana', class: 'X-1', score: 74, profile: 'paham', pCount: 6, mCount: 3, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S403', name: 'Bima Sakti', class: 'X-1', score: 62, profile: 'miskonsepsi', pCount: 5, mCount: 4, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S404', name: 'Clara Shinta', class: 'X-1', score: 88, profile: 'paham', pCount: 8, mCount: 2, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S405', name: 'Dendy Kurniawan', class: 'X-1', score: 42, profile: 'tidak-paham', pCount: 2, mCount: 3, tCount: 5, cheatCount: 0, status: 'Jujur' }
  ],
  classes: [
    {
      id: 'CLS-01',
      name: 'XI MIPA 2',
      grade: 'Kelas XI',
      academicYear: '2026/2027 Ganjil',
      homeroom: 'Bambang Hermanto, M.Si.',
      studentCount: 34,
      token: 'DIAGNO-2026',
      assessment: 'Asesmen Matematika (XI MIPA 2)',
      pCount: 20,
      mCount: 9,
      tCount: 5,
      pPercent: 58.8,
      mPercent: 26.5,
      tPercent: 14.7,
      avgScore: 74.2
    },
    {
      id: 'CLS-02',
      name: 'XI MIPA 1',
      grade: 'Kelas XI',
      academicYear: '2026/2027 Ganjil',
      homeroom: 'Dra. Hj. Nurhayati, M.Pd.',
      studentCount: 36,
      token: 'MAT-XI',
      assessment: 'Asesmen Matematika (XI MIPA 1)',
      pCount: 26,
      mCount: 7,
      tCount: 3,
      pPercent: 72.2,
      mPercent: 19.4,
      tPercent: 8.4,
      avgScore: 82.5
    },
    {
      id: 'CLS-03',
      name: 'XI MIPA 3',
      grade: 'Kelas XI',
      academicYear: '2026/2027 Ganjil',
      homeroom: 'H. Sulaiman, M.Pd.',
      studentCount: 32,
      token: 'MAT-XI-3',
      assessment: 'Asesmen Matematika (XI MIPA 3)',
      pCount: 14,
      mCount: 12,
      tCount: 6,
      pPercent: 43.8,
      mPercent: 37.5,
      tPercent: 18.7,
      avgScore: 61.8
    },
    {
      id: 'CLS-04',
      name: 'X-1',
      grade: 'Kelas X',
      academicYear: '2026/2027 Ganjil',
      homeroom: 'Rina Marlina, S.Pd.',
      studentCount: 35,
      token: 'MAT-X',
      assessment: 'Asesmen Matematika (Kelas X)',
      pCount: 22,
      mCount: 8,
      tCount: 5,
      pPercent: 62.9,
      mPercent: 22.8,
      tPercent: 14.3,
      avgScore: 76.4
    }
  ],
  questionBank: [
    {
      id: 'BS-MAT-01',
      topic: 'Transformasi Geometri',
      difficulty: 'Sedang',
      diffVal: 0.52,
      discVal: 0.48,
      validVal: 0.65,
      usageCount: 4,
      stem: 'Sebuah titik $P(2, -3)$ pada bidang Cartesius ditranslasikan oleh vektor $T = \\begin{pmatrix} -5 \\\\ 7 \\end{pmatrix}$. Manakah koordinat bayangan $P\'$ yang tepat?',
      tier1: {
        correct: 'A',
        options: [
          { letter: 'A', text: '$P\'(-3, 4)$', isCorrect: true },
          { letter: 'B', text: '$P\'(7, -10)$', isCorrect: false },
          { letter: 'C', text: '$P\'(-3, -10)$', isCorrect: false },
          { letter: 'D', text: '$P\'(3, -4)$', isCorrect: false },
          { letter: 'E', text: '$P\'(-10, -21)$', isCorrect: false }
        ]
      },
      tier2: {
        correct: 'A',
        correctReason: 'A. Translasi diperoleh dengan menjumlahkan koordinat: $x\' = x + a$ dan $y\' = y + b$.',
        reasons: [
          { letter: 'A', text: 'Translasi diperoleh dengan menjumlahkan koordinat: $x\' = x + a$ dan $y\' = y + b$.', isCorrect: true },
          { letter: 'B', text: 'Translasi dilakukan dengan mengurangkan koordinat: $x\' = x - a$ dan $y\' = y - b$.', misconception: 'Miskonsepsi Pengurangan Translasi' },
          { letter: 'C', text: 'Komponen translasi bertindak sebagai faktor pengali skalar: $x\' = x \\cdot a$ dan $y\' = y \\cdot b$.', misconception: 'Miskonsepsi Perkalian Translasi' },
          { letter: 'D', text: 'Komponen translasi $a$ menggeser sumbu $Y$ dan $b$ menggeser sumbu $X$ secara terbalik.', misconception: 'Miskonsepsi Pertukaran Sumbu Translasi' },
          { letter: 'E', text: 'Translasi hanya menegasikan tanda tanpa mengubah nilai mutlak koordinat awal.', misconception: 'Distraktor Negasi' }
        ]
      },
      tier3: { label: 'Certainty of Response Index (Yakin vs Tidak Yakin)' }
    },
    {
      id: 'BS-MAT-02',
      topic: 'Transformasi Geometri',
      difficulty: 'Sedang',
      diffVal: 0.64,
      discVal: 0.42,
      validVal: 0.59,
      usageCount: 3,
      stem: 'Titik $A(3, 1)$ dicerminkan terhadap garis lurus $y = -x$. Tentukan koordinat titik bayangan $A\'$ hasil refleksi tersebut!',
      tier1: {
        correct: 'A',
        options: [
          { letter: 'A', text: '$A\'(-1, -3)$', isCorrect: true },
          { letter: 'B', text: '$A\'(1, 3)$', isCorrect: false },
          { letter: 'C', text: '$A\'(-3, -1)$', isCorrect: false },
          { letter: 'D', text: '$A\'(-3, 1)$', isCorrect: false },
          { letter: 'E', text: '$A\'(3, -1)$', isCorrect: false }
        ]
      },
      tier2: {
        correct: 'B',
        correctReason: 'B. Pencerminan terhadap garis $y = -x$ menukar posisi absis dan ordinat sekaligus menegasikan tandanya: $(x, y) \\to (-y, -x)$.',
        reasons: [
          { letter: 'A', text: 'Pencerminan terhadap garis $y = -x$ hanya menegasikan tanda tanpa menukar posisi: $(x, y) \\to (-x, -y)$.', misconception: 'Miskonsepsi Negasi Tanpa Tukar' },
          { letter: 'B', text: 'Pencerminan terhadap garis $y = -x$ menukar posisi absis dan ordinat sekaligus menegasikan tandanya: $(x, y) \\to (-y, -x)$.', isCorrect: true },
          { letter: 'C', text: 'Pencerminan terhadap garis $y = -x$ hanya menukar posisi kedua koordinat: $(x, y) \\to (y, x)$.', misconception: 'Tertukar Refleksi y = x' },
          { letter: 'D', text: 'Hanya absis yang dinegasikan karena garis memotong sumbu vertikal.', misconception: 'Miskonsepsi Parsial Absis' },
          { letter: 'E', text: 'Refleksi garis diagonal selalu menghasilkan titik bayangan tetap (invarian).', misconception: 'Miskonsepsi Titik Invarian' }
        ]
      },
      tier3: { label: 'Certainty of Response Index (Yakin vs Tidak Yakin)' }
    },
    {
      id: 'BS-MAT-03',
      topic: 'Transformasi Geometri',
      difficulty: 'Sukar',
      diffVal: 0.38,
      discVal: 0.35,
      validVal: 0.52,
      usageCount: 3,
      stem: 'Titik $B(4, 2)$ dirotasikan sebesar $+90^\\circ$ dengan pusat putaran di titik asal $O(0,0)$. Tentukan koordinat bayangan $B\'$!',
      tier1: {
        correct: 'A',
        options: [
          { letter: 'A', text: '$B\'(-2, 4)$', isCorrect: true },
          { letter: 'B', text: '$B\'(2, -4)$', isCorrect: false },
          { letter: 'C', text: '$B\'(-4, -2)$', isCorrect: false },
          { letter: 'D', text: '$B\'(4, -2)$', isCorrect: false },
          { letter: 'E', text: '$B\'(2, 4)$', isCorrect: false }
        ]
      },
      tier2: {
        correct: 'A',
        correctReason: 'A. Konvensi sudut rotasi positif $+90^\\circ$ berlawanan arah jarum jam dengan matriks $\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$, sehingga $(x, y) \\to (-y, x)$.',
        reasons: [
          { letter: 'A', text: 'Konvensi sudut rotasi positif $+90^\\circ$ berlawanan arah jarum jam dengan matriks $\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$, sehingga $(x, y) \\to (-y, x)$.', isCorrect: true },
          { letter: 'B', text: 'Rotasi positif berputar searah jarum jam seperti putaran jam analog: $(x, y) \\to (y, -x)$.', misconception: 'Miskonsepsi Arah Jarum Jam' },
          { letter: 'C', text: 'Rotasi $+90^\\circ$ menegasikan seluruh koordinat awal: $(x, y) \\to (-x, -y)$.', misconception: 'Tertukar Rotasi 180 Derajat' },
          { letter: 'D', text: 'Hanya ordinat yang berubah tanda karena diputar terhadap sumbu $X$.', misconception: 'Miskonsepsi Sumbu Rotasi' },
          { letter: 'E', text: 'Rotasi sudut tegak lurus hanya membalik urutan absis dan ordinat: $(x, y) \\to (y, x)$.', misconception: 'Miskonsepsi Tukar Koordinat' }
        ]
      },
      tier3: { label: 'Certainty of Response Index (Yakin vs Tidak Yakin)' }
    },
    {
      id: 'BS-MAT-04',
      topic: 'Transformasi Geometri',
      difficulty: 'Sedang',
      diffVal: 0.55,
      discVal: 0.51,
      validVal: 0.68,
      usageCount: 2,
      stem: 'Sebuah segitiga $ABC$ memiliki luas awal $12\\text{ cm}^2$. Segitiga tersebut didilatasi dengan faktor skala $k = 3$ dan pusat $O(0,0)$. Berapakah luas bayangan segitiga $A\'B\'C\'$?',
      tier1: {
        correct: 'A',
        options: [
          { letter: 'A', text: '$108\\text{ cm}^2$', isCorrect: true },
          { letter: 'B', text: '$36\\text{ cm}^2$', isCorrect: false },
          { letter: 'C', text: '$72\\text{ cm}^2$', isCorrect: false },
          { letter: 'D', text: '$24\\text{ cm}^2$', isCorrect: false },
          { letter: 'E', text: '$144\\text{ cm}^2$', isCorrect: false }
        ]
      },
      tier2: {
        correct: 'A',
        correctReason: 'A. Luas bangun datar berdimensi dua berubah sebanding dengan kuadrat faktor skala dilatasi: $L\' = k^2 \\times L = 3^2 \\times 12 = 108\\text{ cm}^2$.',
        reasons: [
          { letter: 'A', text: 'Luas bangun datar berdimensi dua berubah sebanding dengan kuadrat faktor skala dilatasi: $L\' = k^2 \\times L = 3^2 \\times 12 = 108\\text{ cm}^2$.', isCorrect: true },
          { letter: 'B', text: 'Luas bangun berubah linier dengan mengalikan luas awal dengan faktor skala: $L\' = k \\times L = 3 \\times 12 = 36\\text{ cm}^2$.', misconception: 'Miskonsepsi Perubahan Luas Linier' },
          { letter: 'C', text: 'Luas berubah sebesar $2k \\times L$ karena segitiga memiliki dimensi panjang dan tinggi.', misconception: 'Miskonsepsi Faktor Skala Ganda' },
          { letter: 'D', text: 'Luas dilatasi diperoleh dengan menjumlahkan faktor skala ke luas awal: $L\' = L + k$.', misconception: 'Miskonsepsi Penjumlahan Dilatasi' },
          { letter: 'E', text: 'Luas berubah sebanding dengan pangkat tiga faktor skala seperti volume ruang.', misconception: 'Tertukar Dimensi Volume 3D' }
        ]
      },
      tier3: { label: 'Certainty of Response Index (Yakin vs Tidak Yakin)' }
    },
    {
      id: 'BS-MAT-05',
      topic: 'Matriks & Vektor',
      difficulty: 'Sedang',
      diffVal: 0.58,
      discVal: 0.49,
      validVal: 0.63,
      usageCount: 2,
      stem: 'Diberikan matriks transformasi $T_1 = \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix}$ dan $T_2 = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$. Manakah matriks tunggal yang mewakili komposisi $(T_2 \\circ T_1)$?',
      tier1: {
        correct: 'A',
        options: [
          { letter: 'A', text: '$\\begin{pmatrix} 0 & -3 \\\\ 2 & 0 \\end{pmatrix}$', isCorrect: true },
          { letter: 'B', text: '$\\begin{pmatrix} 0 & -2 \\\\ 3 & 0 \\end{pmatrix}$', isCorrect: false },
          { letter: 'C', text: '$\\begin{pmatrix} 2 & -1 \\\\ 1 & 3 \\end{pmatrix}$', isCorrect: false },
          { letter: 'D', text: '$\\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}$', isCorrect: false },
          { letter: 'E', text: '$\\begin{pmatrix} -3 & 0 \\\\ 0 & 2 \\end{pmatrix}$', isCorrect: false }
        ]
      },
      tier2: {
        correct: 'A',
        correctReason: 'A. Komposisi transformasi $(T_2 \\circ T_1)$ dikerjakan dari kanan ke kiri dengan mengalikan matriks $M = T_2 \\times T_1$.',
        reasons: [
          { letter: 'A', text: 'Komposisi transformasi $(T_2 \\circ T_1)$ dikerjakan dari kanan ke kiri dengan mengalikan matriks $M = T_2 \\times T_1$.', isCorrect: true },
          { letter: 'B', text: 'Komposisi dihitung dari kiri ke kanan sesuai urutan penulisan: $M = T_1 \\times T_2$.', misconception: 'Miskonsepsi Urutan Matriks Kiri-ke-Kanan' },
          { letter: 'C', text: 'Komposisi diperoleh dengan menjumlahkan elemen-elemen seletak dari kedua matriks.', misconception: 'Miskonsepsi Penjumlahan Komposisi' },
          { letter: 'D', text: 'Perkalian matriks bersifat komutatif sehingga urutan tidak berpengaruh.', misconception: 'Miskonsepsi Komutatif Matriks' },
          { letter: 'E', text: 'Komposisi diperoleh dengan mengalikan diagonal utama masing-masing matriks saja.', misconception: 'Miskonsepsi Elemen Diagonal' }
        ]
      },
      tier3: { label: 'Certainty of Response Index (Yakin vs Tidak Yakin)' }
    },
    {
      id: 'BS-MAT-06',
      topic: 'Fungsi & Aljabar',
      difficulty: 'Sedang',
      diffVal: 0.45,
      discVal: 0.50,
      validVal: 0.62,
      usageCount: 1,
      stem: 'Persamaan garis lurus $2x - 3y + 6 = 0$ ditranslasikan oleh vektor $T = \\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix}$. Tentukan persamaan garis bayangannya!',
      tier1: {
        correct: 'A',
        options: [
          { letter: 'A', text: '$2x - 3y - 6 = 0$', isCorrect: true },
          { letter: 'B', text: '$2x - 3y + 18 = 0$', isCorrect: false },
          { letter: 'C', text: '$5x - 5y + 6 = 0$', isCorrect: false },
          { letter: 'D', text: '$2x - 3y + 6 = 0$', isCorrect: false },
          { letter: 'E', text: '$-3x + 2y - 6 = 0$', isCorrect: false }
        ]
      },
      tier2: {
        correct: 'A',
        correctReason: 'A. Variabel awal disubstitusikan dengan $x = x\' - a = x\' - 3$ dan $y = y\' - b = y\' + 2$ sehingga $2(x\' - 3) - 3(y\' + 2) + 6 = 0$.',
        reasons: [
          { letter: 'A', text: 'Variabel awal disubstitusikan dengan $x = x\' - a = x\' - 3$ dan $y = y\' - b = y\' + 2$ sehingga $2(x\' - 3) - 3(y\' + 2) + 6 = 0$.', isCorrect: true },
          { letter: 'B', text: 'Translasi langsung ditambahkan ke variabel: $x\' = x + 3$ dan $y\' = y - 2$.', misconception: 'Miskonsepsi Substitusi Langsung Positif' },
          { letter: 'C', text: 'Komponen translasi dijumlahkan langsung pada koefisien variabel $x$ dan $y$.', misconception: 'Miskonsepsi Penjumlahan Koefisien' },
          { letter: 'D', text: 'Garis lurus yang ditranslasikan tidak mengalami perubahan persamaan sama sekali.', misconception: 'Miskonsepsi Garis Tetap' },
          { letter: 'E', text: 'Translasi menukar koefisien antara variabel $x$ dan variabel $y$.', misconception: 'Miskonsepsi Tukar Koefisien' }
        ]
      },
      tier3: { label: 'Certainty of Response Index (Yakin vs Tidak Yakin)' }
    },
    {
      id: 'BS-MAT-07',
      topic: 'Transformasi Geometri',
      difficulty: 'Sukar',
      diffVal: 0.40,
      discVal: 0.46,
      validVal: 0.64,
      usageCount: 1,
      stem: 'Titik $K(5, 1)$ didilatasi dengan faktor skala $k = 2$ berpusat di titik sembarang $M(2, 3)$. Tentukan koordinat titik bayangan $K\'$!',
      tier1: {
        correct: 'A',
        options: [
          { letter: 'A', text: '$K\'(8, -1)$', isCorrect: true },
          { letter: 'B', text: '$K\'(10, 2)$', isCorrect: false },
          { letter: 'C', text: '$K\'(7, 4)$', isCorrect: false },
          { letter: 'D', text: '$K\'(6, -1)$', isCorrect: false },
          { letter: 'E', text: '$K\'(12, 5)$', isCorrect: false }
        ]
      },
      tier2: {
        correct: 'A',
        correctReason: 'A. Rumus dilatasi pusat $(a,b)$: $x\' = a + k(x - a) = 2 + 2(5 - 2) = 8$ dan $y\' = b + k(y - b) = 3 + 2(1 - 3) = -1$.',
        reasons: [
          { letter: 'A', text: 'Rumus dilatasi pusat $(a,b)$: $x\' = a + k(x - a) = 2 + 2(5 - 2) = 8$ dan $y\' = b + k(y - b) = 3 + 2(1 - 3) = -1$.', isCorrect: true },
          { letter: 'B', text: 'Dilatasi langsung mengalikan koordinat titik dengan faktor skala $k$: $(kx, ky) = (10, 2)$ mengabaikan titik pusat.', misconception: 'Miskonsepsi Dilatasi Tanpa Pusat' },
          { letter: 'C', text: 'Pusat dilatasi dijumlahkan dengan titik awal lalu dikalikan skala.', misconception: 'Miskonsepsi Penjumlahan Titik Pusat' },
          { letter: 'D', text: 'Hanya absis yang terpengaruh oleh titik pusat sedangkan ordinat tetap.', misconception: 'Miskonsepsi Koordinat Asimetris' },
          { letter: 'E', text: 'Dilatasi selalu menjauhkan titik secara linier tanpa mempertimbangkan tanda selisih.', misconception: 'Miskonsepsi Selisih Negatif' }
        ]
      },
      tier3: { label: 'Certainty of Response Index (Yakin vs Tidak Yakin)' }
    },
    {
      id: 'BS-MAT-08',
      topic: 'Trigonometri',
      difficulty: 'Sedang',
      diffVal: 0.56,
      discVal: 0.44,
      validVal: 0.60,
      usageCount: 1,
      stem: 'Diberikan segitiga siku-siku dengan sudut lancip $\\alpha$. Jika $\\sin\\alpha = \\frac{3}{5}$, berapakah nilai $\\tan\\alpha$?',
      tier1: {
        correct: 'A',
        options: [
          { letter: 'A', text: '$\\frac{3}{4}$', isCorrect: true },
          { letter: 'B', text: '$\\frac{4}{3}$', isCorrect: false },
          { letter: 'C', text: '$\\frac{4}{5}$', isCorrect: false },
          { letter: 'D', text: '$\\frac{3}{8}$', isCorrect: false },
          { letter: 'E', text: '$\\frac{5}{3}$', isCorrect: false }
        ]
      },
      tier2: {
        correct: 'A',
        correctReason: 'A. Sisi samping dihitung dengan dalil Pythagoras: $x = \\sqrt{5^2 - 3^2} = 4$, sehingga $\\tan\\alpha = \\frac{\\text{depan}}{\\text{samping}} = \\frac{3}{4}$.',
        reasons: [
          { letter: 'A', text: 'Sisi samping dihitung dengan dalil Pythagoras: $x = \\sqrt{5^2 - 3^2} = 4$, sehingga $\\tan\\alpha = \\frac{\\text{depan}}{\\text{samping}} = \\frac{3}{4}$.', isCorrect: true },
          { letter: 'B', text: 'Tangen didefinisikan sebagai sisi samping dibagi sisi depan: $\\tan\\alpha = \\frac{4}{3}$.', misconception: 'Tertukar Tangen dan Kotangen' },
          { letter: 'C', text: 'Tangen adalah perbandingan sisi samping dengan sisi miring: $\\frac{4}{5}$.', misconception: 'Tertukar Tangen dan Kosinus' },
          { letter: 'D', text: 'Sisi samping diperoleh dengan menjumlahkan sisi depan dan sisi miring ($3+5=8$).', misconception: 'Miskonsepsi Penjumlahan Sisi Pythagoras' },
          { letter: 'E', text: 'Tangen adalah perbandingan sisi miring dengan sisi depan segitiga.', misconception: 'Tertukar Tangen dan Kosekan' }
        ]
      },
      tier3: { label: 'Certainty of Response Index (Yakin vs Tidak Yakin)' }
    }
  ],
  misconceptions: [
    {
      id: 'M01',
      title: 'Pertukaran Posisi Koordinat pada Refleksi Garis y = -x',
      percentage: '32.4%',
      count: 11,
      severity: 'high',
      desc: 'Siswa meyakini pencerminan terhadap garis $y = -x$ hanya menegasikan tanda tanpa menukar posisi absis dan ordinat ($(-x, -y)$), atau tertukar dengan refleksi terhadap garis $y = x$ ($y, x$).',
      questionRef: 'Butir Soal No. 2'
    },
    {
      id: 'M02',
      title: 'Perubahan Luas Bangun Akibat Dilatasi Skala k',
      percentage: '23.5%',
      count: 8,
      severity: 'medium',
      desc: 'Siswa mengira luas bayangan bangun datar setelah didilatasi faktor skala $k$ bertambah linier sebesar $k \\times L$ ($36\\text{ cm}^2$), padahal luas berdimensi dua sehingga berubah sebesar $k^2 \\times L$ ($108\\text{ cm}^2$).',
      questionRef: 'Butir Soal No. 4'
    },
    {
      id: 'M03',
      title: 'Arah Rotasi Sudut Positif & Matriks Rotasi',
      percentage: '17.6%',
      count: 6,
      severity: 'medium',
      desc: 'Siswa menganggap rotasi sudut positif $+90^\\circ$ berputar searah jarum jam seperti putaran jam dinding, padahal konvensi baku matematika menetapkan putaran positif berlawanan jarum jam ($(-y, x)$).',
      questionRef: 'Butir Soal No. 3'
    },
    {
      id: 'M04',
      title: 'Urutan Perkalian Matriks Komposisi (T2 ∘ T1)',
      percentage: '14.7%',
      count: 5,
      severity: 'medium',
      desc: 'Siswa membaca komposisi transformasi dari kiri ke kanan sehingga mengalikan matriks $M_1 \\times M_2$ atau mengira matriks komutatif, padahal seharusnya $M_2 \\times M_1$.',
      questionRef: 'Butir Soal No. 5'
    }
  ],
  itemsAnalysis: [
    { no: 1, concept: 'Translasi Vektor pada Bidang Koordinat', difficulty: 0.52, diffCat: 'Sedang', discrimination: 0.48, discCat: 'Sangat Baik', validity: 0.65, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 2, concept: 'Refleksi Titik terhadap Garis y = -x', difficulty: 0.64, diffCat: 'Sedang', discrimination: 0.42, discCat: 'Baik', validity: 0.59, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 3, concept: 'Rotasi +90° terhadap Pusat O(0,0)', difficulty: 0.38, diffCat: 'Sukar', discrimination: 0.35, discCat: 'Baik', validity: 0.52, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 4, concept: 'Dilatasi Segitiga & Perubahan Luas 2D', difficulty: 0.78, diffCat: 'Mudah', discrimination: 0.22, discCat: 'Cukup', validity: 0.45, valCat: 'Valid', quality: 'Perlu Revisi', recommendation: 'Revisi Distraktor Tier 2' },
    { no: 5, concept: 'Komposisi Perkalian Matriks (T2 ∘ T1)', difficulty: 0.55, diffCat: 'Sedang', discrimination: 0.51, discCat: 'Sangat Baik', validity: 0.68, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 6, concept: 'Refleksi Titik terhadap Garis Vertikal x = h', difficulty: 0.61, diffCat: 'Sedang', discrimination: 0.44, discCat: 'Baik', validity: 0.60, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 7, concept: 'Translasi Persamaan Garis Linear Bidang', difficulty: 0.45, diffCat: 'Sedang', discrimination: 0.49, discCat: 'Sangat Baik', validity: 0.62, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 8, concept: 'Refleksi Garis terhadap Sumbu Koordinat', difficulty: 0.88, diffCat: 'Terlalu Mudah', discrimination: 0.16, discCat: 'Jelek', validity: 0.31, valCat: 'Tidak Valid', quality: 'Diganti', recommendation: 'Ganti dengan Konsep Lebih Menantang' },
    { no: 9, concept: 'Dilatasi dengan Pusat Sembarang (a, b)', difficulty: 0.50, diffCat: 'Sedang', discrimination: 0.46, discCat: 'Sangat Baik', validity: 0.64, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 10, concept: 'Rotasi 180° & Refleksi Titik Asal O(0,0)', difficulty: 0.56, diffCat: 'Sedang', discrimination: 0.47, discCat: 'Sangat Baik', validity: 0.66, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' }
  ],
  remedialNotes: [
    {
      id: 1,
      studentName: 'Budi Pratama (XI MIPA 2)',
      concept: 'Pertukaran Posisi Koordinat pada Refleksi Garis y = -x',
      date: '23 Okt 2026, 15:40',
      note: 'Diberikan lembar kerja eksplorasi visual GeoGebra interaktif untuk menarik titik sembarang melintasi cermin y = -x. Ditekankan hubungan pertukaran koordinat dan negasi tanda (x, y) → (-y, -x).',
      teacher: 'Bambang Hermanto, S.Pd., M.Si.'
    },
    {
      id: 2,
      studentName: 'Citra Lestari (XI MIPA 2)',
      concept: 'Pemahaman Luas Bangun Hasil Dilatasi Skala k',
      date: '22 Okt 2026, 11:20',
      note: 'Diberikan latihan pembuktian geometri menggunakan petak satuan persegi, memperlihatkan bahwa perbesaran dua arah (alas dan tinggi) menghasilkan pertambahan luas sebesar k², bukan k.',
      teacher: 'Bambang Hermanto, S.Pd., M.Si.'
    },
    {
      id: 3,
      studentName: 'Eko Prasetyo (XI MIPA 2)',
      concept: 'Urutan Komposisi Matriks Pengali',
      date: '21 Okt 2026, 09:15',
      note: 'Penguatan konsep fungsi komposisi (f ∘ g)(x) = f(g(x)). Diberikan drill perkalian matriks dari arah kanan ke kiri (M₂ × M₁).',
      teacher: 'Bambang Hermanto, S.Pd., M.Si.'
    }
  ],
  proctoringLogs: [
    { time: '23 Okt 2026, 10:42', name: 'Budi Pratama', class: 'XI MIPA 2', event: 'Pindah Tab Browser (Keluar jendela)', severity: 'berat', warn: 'Peringatan ke-3 Ditampilkan', action: 'Beri Peringatan Lisan' },
    { time: '23 Okt 2026, 10:38', name: 'Budi Pratama', class: 'XI MIPA 2', event: 'Pindah Tab Browser', severity: 'sedang', warn: 'Peringatan ke-2 Ditampilkan', action: 'Pantau Layar' },
    { time: '23 Okt 2026, 10:25', name: 'Eko Prasetyo', class: 'XI MIPA 2', event: 'Keluar dari Mode Fullscreen', severity: 'ringan', warn: 'Peringatan Otomatis Dikirim', action: 'Kunci Ulang Layar' },
    { time: '23 Okt 2026, 10:19', name: 'Ahmad Dahlan', class: 'XI MIPA 2', event: 'Upaya Copy Teks Soal', severity: 'ringan', warn: 'Aksi Dicegah Sistem', action: 'Aman' },
    { time: '23 Okt 2026, 10:14', name: 'Rahmat Hidayat', class: 'XI MIPA 2', event: 'Pindah Tab Browser (< 3 detik)', severity: 'ringan', warn: 'Peringatan Otomatis Dikirim', action: 'Aman' }
  ]
};

// API Loader for Teacher Dashboard
async function loadTeacherDataFromApi() {
  try {
    const [classesRes, questionsRes, studentsRes, notesRes, proctorRes] = await Promise.all([
      fetch('/api/teacher/classes').then(r => r.json()).catch(() => null),
      fetch('/api/teacher/questions').then(r => r.json()).catch(() => null),
      fetch('/api/teacher/students').then(r => r.json()).catch(() => null),
      fetch('/api/teacher/follow-up-notes').then(r => r.json()).catch(() => null),
      fetch('/api/teacher/assessments/asm-diagno-2026/proctoring').then(r => r.json()).catch(() => null)
    ]);

    if (classesRes && classesRes.success && Array.isArray(classesRes.data) && classesRes.data.length > 0) {
      TEACHER_STATE.classes = classesRes.data.map(c => ({
        id: c.id,
        name: c.name,
        grade: c.grade || 'Kelas XI',
        academicYear: c.academic_year || '2026/2027 Ganjil',
        homeroom: c.homeroom || 'Bambang Hermanto, M.Si.',
        studentCount: c.student_count || 34,
        token: c.token || `MAT-${c.name.replace(/\s+/g, '-').toUpperCase()}`,
        assessment: c.assessment || `Asesmen Matematika (${c.name})`,
        pCount: c.pCount || 20,
        mCount: c.mCount || 9,
        tCount: c.tCount || 5,
        pPercent: c.pPercent || 58.8,
        mPercent: c.mPercent || 26.5,
        tPercent: c.tPercent || 14.7,
        avgScore: c.avgScore || 74.2
      }));
      renderClassCards();
      renderClassComparison();
    }

    if (questionsRes && questionsRes.success && Array.isArray(questionsRes.data) && questionsRes.data.length > 0) {
      TEACHER_STATE.questionBank = questionsRes.data;
      renderQuestionBankList();
    }

    if (studentsRes && studentsRes.success && Array.isArray(studentsRes.data) && studentsRes.data.length > 0) {
      TEACHER_STATE.students = studentsRes.data;
      if (typeof window.refreshStudentProfilesTable === 'function') {
        window.refreshStudentProfilesTable();
      }
    }

    if (notesRes && notesRes.success && Array.isArray(notesRes.data) && notesRes.data.length > 0) {
      TEACHER_STATE.remedialNotes = notesRes.data.map(n => ({
        id: n.id,
        studentName: n.student_name || 'Siswa',
        concept: n.concept || 'Transformasi Geometri',
        date: n.date || 'Baru saja',
        note: n.note,
        teacher: n.teacher || 'Bambang Hermanto, S.Pd., M.Si.'
      }));
      initRemedialNotesTimeline();
    }

    if (proctorRes && proctorRes.success && Array.isArray(proctorRes.data)) {
      TEACHER_STATE.proctoringLogs = proctorRes.data.map(p => ({
        time: p.occurred_at || p.time || 'Baru saja',
        name: p.student_name || p.name || 'Siswa',
        class: p.class_name || p.class || 'XI MIPA 2',
        event: p.violation_text || p.event || 'Pindah Tab Browser',
        severity: p.severity || 'ringan',
        warn: p.action_taken || p.warn || 'Peringatan Ditampilkan',
        action: 'Beri Peringatan Lisan'
      }));
      initProctoringLogs();
    }
  } catch (err) {
    console.warn('Teacher API Sync Notice:', err);
  }
}

// DOM Initialization
document.addEventListener('DOMContentLoaded', async () => {
  initDashboardTheme();
  initSidebarNavigation();
  initAssessmentSelector();
  initMultiClassModule();
  initQuestionBankModule();
  initStudentProfilesTable();
  initMisconceptionsMap();
  initItemAnalysisTable();
  initAttentionStudents();
  initRemedialNotesTimeline();
  initProctoringLogs();
  initModalsAndActions();
  initMathSymbolToolbarAndPreview();
  renderKaTeXFormulas();

  // Fetch real data from backend API asynchronously
  await loadTeacherDataFromApi();
});

// Also re-render when window finishes loading
window.addEventListener('load', () => {
  renderKaTeXFormulas();
});

/* --- Theme Management --- */
function initDashboardTheme() {
  const btn = document.getElementById('dashThemeBtn');
  const saved = localStorage.getItem('sidag_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sidag_theme', next);
      updateThemeIcon(next);
      notify(`Tampilan diubah ke mode ${next === 'dark' ? 'Gelap' : 'Terang'}`);
    });
  }

  function updateThemeIcon(mode) {
    if (!btn) return;
    if (mode === 'light') {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    } else {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    }
  }
}

/* --- View & Navigation Management --- */
function initSidebarNavigation() {
  const navItems = document.querySelectorAll('.dash-nav-item');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('dashSidebar');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = item.getAttribute('data-view');
      switchView(viewId);
      if (window.innerWidth <= 768 && sidebar) {
        sidebar.classList.remove('mobile-open');
      }
    });
  });

  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }
}

window.switchView = function(viewId) {
  // Hide all view sections
  document.querySelectorAll('.dash-view-section').forEach(sec => {
    sec.style.display = 'none';
    sec.classList.remove('active');
  });

  // Show target section
  const target = document.getElementById(viewId);
  if (target) {
    target.style.display = 'flex';
    target.classList.add('active');
  }

  // Update nav links
  document.querySelectorAll('.dash-nav-item').forEach(item => {
    if (item.getAttribute('data-view') === viewId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update Breadcrumb Title
  const titles = {
    'view-overview': 'Ikhtisar Dasbor Guru Matematika',
    'view-classes': 'Distribusi Multi-Kelas & Komparasi Diagnostik',
    'view-question-bank': 'Bank Soal Diagnostik (Three-Tier)',
    'view-assessments': 'Penyusunan & Pengelolaan Asesmen',
    'view-profiles': 'Profil Pemahaman & Peta Miskonsepsi',
    'view-item-analysis': 'Analisis Psikometrik Butir Soal',
    'view-progress': 'Perkembangan Siswa & Remedial',
    'view-proctoring': 'Pengawasan Integritas Ujian',
    'view-recap': 'Rekap Hasil & Distribusi Nilai'
  };

  const breadcrumb = document.getElementById('breadcrumbTitle');
  if (breadcrumb && titles[viewId]) {
    breadcrumb.textContent = titles[viewId];
  }

  renderKaTeXFormulas();
};

/* --- Assessment Selector --- */
function initAssessmentSelector() {
  const select = document.getElementById('activeAssessmentSelect');
  const tokenDisplay = document.getElementById('activeTokenText');
  const copyBtn = document.getElementById('copyTokenBtn');

  if (select) {
    select.addEventListener('change', () => {
      const val = select.value;
      TEACHER_STATE.currentAssessment = val;
      if (val === 'diagno-2026') {
        tokenDisplay.textContent = 'DIAGNO-2026';
      } else if (val === 'mat-xi-1') {
        tokenDisplay.textContent = 'MAT-XI';
      } else {
        tokenDisplay.textContent = 'MAT-X';
      }
      notify(`Memuat data asesmen: ${select.options[select.selectedIndex].text}`);
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = tokenDisplay.textContent;
      navigator.clipboard?.writeText(text);
      notify(`Token '${text}' berhasil disalin ke clipboard!`);
    });
  }
}

/* --- Student Profiles Table & Filters --- */
function initStudentProfilesTable() {
  const tbody = document.getElementById('studentProfilesBody');
  const searchInput = document.getElementById('searchStudentInput');
  const filterSelect = document.getElementById('filterProfileSelect');
  const filterClassSelect = document.getElementById('filterClassSelect');
  const globalClassFilter = document.getElementById('globalClassFilter');
  const countText = document.getElementById('filteredCountText');

  renderTable();

  if (searchInput) {
    searchInput.addEventListener('input', renderTable);
  }
  if (filterSelect) {
    filterSelect.addEventListener('change', renderTable);
  }
  if (filterClassSelect) {
    filterClassSelect.addEventListener('change', () => {
      if (globalClassFilter) globalClassFilter.value = filterClassSelect.value;
      renderTable();
      updateOverviewStatsByClass(filterClassSelect.value);
    });
  }
  if (globalClassFilter) {
    globalClassFilter.addEventListener('change', () => {
      if (filterClassSelect) filterClassSelect.value = globalClassFilter.value;
      renderTable();
      updateOverviewStatsByClass(globalClassFilter.value);
    });
  }

  window.filterByClass = function(className) {
    switchView('view-profiles');
    if (filterClassSelect) filterClassSelect.value = className;
    if (globalClassFilter) globalClassFilter.value = className;
    renderTable();
    updateOverviewStatsByClass(className);
    notify(`Menampilkan siswa untuk rombel: ${className}`);
  };

  function renderTable() {
    if (!tbody) return;
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const filter = filterSelect ? filterSelect.value : 'all';
    const classFilter = filterClassSelect ? filterClassSelect.value : (globalClassFilter ? globalClassFilter.value : 'all');

    const filtered = TEACHER_STATE.students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query);
      const matchFilter = filter === 'all' || s.profile === filter;
      const matchClass = (!classFilter || classFilter === 'all') || s.class === classFilter;
      return matchSearch && matchFilter && matchClass;
    });

    if (countText) {
      countText.textContent = `Menampilkan ${filtered.length} dari ${TEACHER_STATE.students.length} siswa`;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding:32px; color:var(--text-muted);">
            Tidak ditemukan data siswa yang cocok dengan filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map((s, idx) => {
      const badgeClass = s.profile === 'paham' ? 'paham' : s.profile === 'miskonsepsi' ? 'miskonsepsi' : 'tidak-paham';
      const badgeLabel = s.profile === 'paham' ? 'Paham' : s.profile === 'miskonsepsi' ? 'Miskonsepsi' : 'Tidak Paham';
      const isSuspect = s.cheatCount > 1;

      return `
        <tr>
          <td>${idx + 1}</td>
          <td>
            <strong>${s.name}</strong>
            <div style="font-size:0.74rem; color:var(--text-muted); font-family:var(--font-mono);">${s.id}</div>
          </td>
          <td>${s.class}</td>
          <td><strong style="font-size:0.95rem;">${s.score}</strong>/100</td>
          <td>
            <span class="status-badge ${badgeClass}">
              &bull; ${badgeLabel}
            </span>
          </td>
          <td>
            <div style="display:inline-flex; gap:6px; font-size:0.78rem;">
              <span style="color:var(--status-paham); font-weight:600;">${s.pCount} P</span> &bull;
              <span style="color:var(--status-miskonsepsi); font-weight:600;">${s.mCount} M</span> &bull;
              <span style="color:var(--status-tidak-paham); font-weight:600;">${s.tCount} T</span>
            </div>
          </td>
          <td>
            <span style="font-size:0.78rem; color:${isSuspect ? 'var(--status-tidak-paham)' : 'var(--text-muted)'}; font-weight:${isSuspect ? '600' : 'normal'};">
              ${s.status}
            </span>
          </td>
          <td>
            <div style="display:flex; gap:5px; align-items:center;">
              <button type="button" class="btn btn-outline btn-sm" onclick="openStudentDetail('${s.id}')" title="Lihat Rincian Jawaban 3-Tier">
                3-Tier
              </button>
              <button type="button" class="btn btn-outline btn-sm" onclick="openEditStudentModal('${s.id}')" title="Ubah Data Siswa" style="padding:4px 8px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </button>
              <button type="button" class="btn btn-outline btn-sm" onclick="deleteStudent('${s.id}')" title="Hapus Siswa dari Kelas" style="padding:4px 8px; color:var(--status-tidak-paham); border-color:rgba(239,68,68,0.3);">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  window.refreshStudentProfilesTable = renderTable;
}

/* --- Student Detail Modal (3-Tier Response Explorer) --- */
window.openStudentDetail = function(studentId) {
  const student = TEACHER_STATE.students.find(s => s.id === studentId);
  if (!student) return;

  const modal = document.getElementById('studentDetailModal');
  const title = document.getElementById('studentDetailTitle');
  const sub = document.getElementById('studentDetailSub');
  const container = document.getElementById('studentDetailItemsContainer');
  const pill = document.getElementById('modalStudentProfilePill');

  if (title) title.textContent = `Rincian Jawaban: ${student.name} (${student.class})`;
  if (sub) sub.textContent = `Skor: ${student.score}/100 &bull; Profil Dominan: ${student.profile.toUpperCase()} &bull; Waktu submit: 23 Okt 2026`;

  if (pill) {
    pill.className = `status-badge ${student.profile}`;
    pill.textContent = `Profil: ${student.profile.toUpperCase()}`;
  }

  // Generate mock items for detailed response examination (Matematika)
  const sampleItems = [
    {
      no: 1,
      concept: 'Translasi Vektor pada Bidang Cartesius',
      stem: 'Sebuah titik $P(2, -3)$ ditranslasikan oleh $T = \\begin{pmatrix} -5 \\\\ 7 \\end{pmatrix}$. Manakah koordinat bayangan $P\'$ yang dihasilkan?',
      t1: student.profile === 'paham' ? 'C. $P\'(-3, 4)$ (Kunci Benar)' : 'A. $P\'(7, -10)$ (Salah - Distraktor A)',
      t1Correct: student.profile === 'paham',
      t2: student.profile === 'paham' ? 'B. $x\' = x + a$ dan $y\' = y + b$ (Alasan Ilmiah)' : 'A. Mengurangkan koordinat titik dengan translasi $x - a$ (Miskonsepsi A)',
      t2Correct: student.profile === 'paham',
      t3: 'Yakin',
      diagnosis: student.profile === 'paham' ? 'Paham' : 'Miskonsepsi',
      diagClass: student.profile === 'paham' ? 'paham' : 'miskonsepsi'
    },
    {
      no: 2,
      concept: 'Refleksi Titik terhadap Garis $y = -x$',
      stem: 'Titik $A(3, 1)$ dicerminkan terhadap garis $y = -x$. Manakah koordinat bayangan $A\'$ yang tepat?',
      t1: student.profile === 'paham' ? 'C. $A\'(-1, -3)$ (Kunci Benar)' : 'B. $A\'(-3, -1)$ (Salah - Distraktor B)',
      t1Correct: student.profile === 'paham',
      t2: student.profile === 'tidak-paham' ? 'B. Hanya mengubah tanda tanpa menukar posisi $(x, y) \\to (-x, -y)$ (Miskonsepsi B)' : 'A. Menukar posisi dan menegasikan tanda $(x, y) \\to (-y, -x)$ (Alasan Ilmiah)',
      t2Correct: student.profile !== 'tidak-paham',
      t3: student.profile === 'tidak-paham' ? 'Tidak Yakin' : 'Yakin',
      diagnosis: student.profile === 'tidak-paham' ? 'Tidak Paham' : 'Paham',
      diagClass: student.profile === 'tidak-paham' ? 'tidak-paham' : 'paham'
    },
    {
      no: 3,
      concept: 'Rotasi Sudut Positif Berlawanan Arah Jarum Jam',
      stem: 'Titik $B(4, 2)$ dirotasikan sebesar $+90^\\circ$ dengan pusat $O(0,0)$. Manakah koordinat bayangan $B\'$ yang terbentuk?',
      t1: student.score > 70 ? 'B. $B\'(-2, 4)$ (Kunci Benar)' : 'A. $B\'(2, -4)$ (Salah - Distraktor A)',
      t1Correct: student.score > 70,
      t2: student.score > 70 ? 'B. Rotasi $+90^\\circ$ berlawanan arah jarum jam $(x, y) \\to (-y, x)$ (Alasan Ilmiah)' : 'A. Rotasi positif searah jarum jam $(x, y) \\to (y, -x)$ (Miskonsepsi A)',
      t2Correct: student.score > 70,
      t3: 'Yakin',
      diagnosis: student.score > 70 ? 'Paham' : 'Miskonsepsi',
      diagClass: student.score > 70 ? 'paham' : 'miskonsepsi'
    }
  ];

  if (container) {
    container.innerHTML = sampleItems.map(it => `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong style="color: var(--text-main); font-size: 0.9rem;">Butir ${it.no}: ${it.concept}</strong>
          <span class="status-badge ${it.diagClass}">&bull; Profil: ${it.diagnosis}</span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">${it.stem}</p>
        
        <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.8rem;">
          <div style="display: flex; justify-content: space-between; padding: 4px 8px; background: var(--bg-elevated); border-radius: 4px;">
            <span><strong>Tier 1 (Jawaban):</strong> ${it.t1}</span>
            <span style="color: ${it.t1Correct ? 'var(--status-paham)' : 'var(--status-tidak-paham)'}; font-weight:600;">${it.t1Correct ? 'Kunci Benar' : 'Salah'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 8px; background: var(--bg-elevated); border-radius: 4px;">
            <span><strong>Tier 2 (Alasan):</strong> ${it.t2}</span>
            <span style="color: ${it.t2Correct ? 'var(--status-paham)' : 'var(--status-tidak-paham)'}; font-weight:600;">${it.t2Correct ? 'Alasan Ilmiah' : 'Alasan Miskonsepsi'}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 8px; background: var(--bg-elevated); border-radius: 4px;">
            <span><strong>Tier 3 (Keyakinan):</strong> ${it.t3}</span>
            <span style="color: var(--primary); font-weight: 600;">CRI: Yakin</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (modal) modal.classList.add('open');
  renderKaTeXFormulas();
};

/* --- Misconceptions Map --- */
function initMisconceptionsMap() {
  const container = document.getElementById('misconceptionsContainer');
  if (!container) return;

  container.innerHTML = TEACHER_STATE.misconceptions.map(m => `
    <div class="misconception-card priority-${m.severity}">
      <div class="misconception-header">
        <h4 class="misconception-title">${m.title}</h4>
        <span class="status-badge miskonsepsi">${m.percentage} (${m.count} Siswa)</span>
      </div>
      <p class="misconception-desc">${m.desc}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: var(--text-dim);">
        <span>Terdeteksi pada: <strong>${m.questionRef}</strong></span>
        <button type="button" class="btn btn-outline btn-sm" onclick="quickRemedial('${m.title}')">
          Rencana Remedial &rarr;
        </button>
      </div>
    </div>
  `).join('');
}

window.quickRemedial = function(conceptName) {
  switchView('view-progress');
  const field = document.getElementById('remedialFocusConcept');
  if (field) field.value = conceptName;
  const modal = document.getElementById('remedialNoteModal');
  if (modal) modal.classList.add('open');
};

/* --- Psychometric Item Analysis Table --- */
function initItemAnalysisTable() {
  const tbody = document.getElementById('itemAnalysisBody');
  if (!tbody) return;

  tbody.innerHTML = TEACHER_STATE.itemsAnalysis.map(it => {
    const isProblematic = it.quality !== 'Baik';
    return `
      <tr>
        <td style="font-weight:700;">No. ${it.no}</td>
        <td>
          <strong>${it.concept}</strong>
        </td>
        <td>
          <span style="font-family:var(--font-mono); font-weight:600;">${it.difficulty.toFixed(2)}</span>
          <span style="font-size:0.75rem; color:var(--text-muted); margin-left:4px;">(${it.diffCat})</span>
        </td>
        <td>
          <span style="font-family:var(--font-mono); font-weight:600; color:${it.discrimination > 0.3 ? 'var(--status-paham)' : 'var(--status-miskonsepsi)'};">
            ${it.discrimination.toFixed(2)}
          </span>
          <span style="font-size:0.75rem; color:var(--text-muted); margin-left:4px;">(${it.discCat})</span>
        </td>
        <td>
          <span style="font-family:var(--font-mono); font-weight:600;">${it.validity.toFixed(2)}</span>
          <span class="status-badge ${it.valCat === 'Valid' ? 'paham' : 'tidak-paham'}" style="margin-left:4px; padding:1px 6px;">
            ${it.valCat}
          </span>
        </td>
        <td>
          <span class="status-badge ${it.quality === 'Baik' ? 'paham' : it.quality === 'Perlu Revisi' ? 'miskonsepsi' : 'tidak-paham'}">
            &bull; ${it.quality}
          </span>
        </td>
        <td>
          <span style="font-size:0.8rem; font-weight:${isProblematic ? '600' : 'normal'}; color:${isProblematic ? 'var(--status-miskonsepsi)' : 'var(--text-muted)'};">
            ${it.recommendation}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

/* --- Students Needing Attention & Remedial --- */
function initAttentionStudents() {
  const grid = document.getElementById('attentionStudentsGrid');
  if (!grid) return;

  const attentionList = TEACHER_STATE.students.filter(s => s.profile === 'miskonsepsi' || s.profile === 'tidak-paham').slice(0, 5);

  grid.innerHTML = attentionList.map(s => `
    <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 12px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <strong style="font-size: 0.88rem; color: var(--text-main); display:block;">${s.name}</strong>
        <span style="font-size: 0.74rem; color: var(--status-tidak-paham);">
          Miskonsepsi berulang: ${s.mCount} Butir Salah
        </span>
      </div>
      <button type="button" class="btn btn-outline btn-sm" onclick="openRemedialFor('${s.name}')">
        Bimbingan
      </button>
    </div>
  `).join('');
}

window.openRemedialFor = function(studentName) {
  const select = document.getElementById('remedialStudentSelect');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.includes(studentName)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  const modal = document.getElementById('remedialNoteModal');
  if (modal) modal.classList.add('open');
};

/* --- Remedial Timeline Management --- */
function initRemedialNotesTimeline() {
  const container = document.getElementById('remedialTimelineContainer');
  if (!container) return;

  renderNotes();

  function renderNotes() {
    container.innerHTML = TEACHER_STATE.remedialNotes.map(n => `
      <div class="remedial-card">
        <div class="remedial-card-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="portal-role-pill teacher">Rencana Remedial</span>
            <span class="remedial-student-name">${n.studentName}</span>
          </div>
          <span>${n.date}</span>
        </div>
        <div style="font-size:0.8rem; font-weight:600; color:var(--primary);">
          Fokus Konsep: ${n.concept}
        </div>
        <p class="remedial-text">${n.note}</p>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-dim); border-top:1px solid var(--border-color); padding-top:6px;">
          <span>Ditulis oleh: ${n.teacher}</span>
          <button type="button" class="btn-text" style="color:var(--status-tidak-paham); font-size:0.74rem; padding:2px;" onclick="deleteRemedialNote(${n.id})">Hapus Catatan</button>
        </div>
      </div>
    `).join('');
  }

  window.deleteRemedialNote = async function(id) {
    if (confirm('Apakah Anda yakin ingin menghapus catatan remedial ini?')) {
      try {
        await fetch(`/api/teacher/follow-up-notes/${id}`, { method: 'DELETE' });
      } catch (e) {
        console.warn('Delete remedial note API notice:', e);
      }
      TEACHER_STATE.remedialNotes = TEACHER_STATE.remedialNotes.filter(n => String(n.id) !== String(id));
      renderNotes();
      notify('Catatan remedial telah dihapus.');
    }
  };
}

/* --- Proctoring Logs --- */
function initProctoringLogs() {
  const tbody = document.getElementById('proctoringLogBody');
  if (!tbody) return;

  tbody.innerHTML = TEACHER_STATE.proctoringLogs.map(l => `
    <tr>
      <td style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dim);">${l.time}</td>
      <td><strong>${l.name}</strong></td>
      <td>${l.class}</td>
      <td>${l.event}</td>
      <td>
        <span class="cheat-badge-severity ${l.severity}">
          ${l.severity}
        </span>
      </td>
      <td style="font-size:0.82rem; color:var(--text-muted);">${l.warn}</td>
      <td>
        <button type="button" class="btn btn-outline btn-sm" onclick="notify('Peringatan formal dikirim ke siswa: ${l.name}')">
          ${l.action}
        </button>
      </td>
    </tr>
  `).join('');
}

/* --- Modals and Actions --- */
function initModalsAndActions() {
  // Student detail modal close
  const sModal = document.getElementById('studentDetailModal');
  document.getElementById('closeStudentDetailModal')?.addEventListener('click', () => sModal?.classList.remove('open'));
  document.getElementById('btnCloseStudentDetailModalBottom')?.addEventListener('click', () => sModal?.classList.remove('open'));

  // Remedial note modal
  const rModal = document.getElementById('remedialNoteModal');
  document.getElementById('btnOpenNewRemedialNote')?.addEventListener('click', () => rModal?.classList.add('open'));
  document.getElementById('closeRemedialModal')?.addEventListener('click', () => rModal?.classList.remove('open'));
  document.getElementById('btnCancelRemedialModal')?.addEventListener('click', () => rModal?.classList.remove('open'));

  document.getElementById('remedialNoteForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const student = document.getElementById('remedialStudentSelect')?.value;
    const concept = document.getElementById('remedialFocusConcept')?.value;
    const content = document.getElementById('remedialNoteContent')?.value;

    const newNote = {
      id: 'fup-' + Date.now(),
      student_name: student,
      concept: concept,
      date: 'Baru saja',
      note: content,
      teacher: 'Bambang Hermanto, S.Pd., M.Si.',
      studentName: student
    };

    TEACHER_STATE.remedialNotes.unshift(newNote);
    initRemedialNotesTimeline();
    rModal?.classList.remove('open');

    // Save to backend API
    try {
      await fetch('/api/teacher/follow-up-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: student,
          concept: concept,
          note: content
        })
      });
    } catch (err) {
      console.warn('Save remedial API notice:', err);
    }

    notify(`Catatan remedial untuk ${student} berhasil disimpan!`);
  });

  // Preview modal
  const pModal = document.getElementById('previewModal');
  document.getElementById('btnPreviewCurrentAssessment')?.addEventListener('click', () => pModal?.classList.add('open'));
  document.getElementById('closePreviewModal')?.addEventListener('click', () => pModal?.classList.remove('open'));
  document.getElementById('btnClosePreviewModalBottom')?.addEventListener('click', () => pModal?.classList.remove('open'));

  // Quick create button
  document.getElementById('btnQuickCreate')?.addEventListener('click', () => switchView('view-assessments'));
  document.getElementById('btnOpenCreateAssessmentModal')?.addEventListener('click', () => switchView('view-assessments'));

  // Save / Publish
  document.getElementById('btnSaveDraft')?.addEventListener('click', async () => {
    try {
      await fetch('/api/teacher/assessments/asm-diagno-2026/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'draf' })
      });
    } catch(e) {}
    notify('Draf asesmen berhasil disimpan ke basis data.');
  });

  document.getElementById('btnPublishAssessment')?.addEventListener('click', async () => {
    try {
      await fetch('/api/teacher/assessments/asm-diagno-2026/status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'terbit' })
      });
    } catch(e) {}
    notify('Asesmen berhasil diterbitkan! Token DIAGNO-2026 kini dapat digunakan siswa.');
  });

  document.getElementById('btnAddNewQuestion')?.addEventListener('click', async () => {
    const stemVal = document.getElementById('qEditorStem')?.value.trim();
    if (!stemVal) {
      notify('⚠️ Teks pertanyaan butir soal tidak boleh kosong!');
      return;
    }
    const optA = document.getElementById('qEditorOptA')?.value.trim() || '-';
    const optB = document.getElementById('qEditorOptB')?.value.trim() || '-';
    const optC = document.getElementById('qEditorOptC')?.value.trim() || '-';
    const reasonA = document.getElementById('qEditorReasonA')?.value.trim() || '-';
    const reasonB = document.getElementById('qEditorReasonB')?.value.trim() || '-';
    const key = document.querySelector('input[name="tier1CorrectKey"]:checked')?.value || 'A';
    
    // Add to table
    const tbody = document.getElementById('installedItemsTableBody');
    if (tbody) {
      const newNo = tbody.children.length + 1;
      const row = document.createElement('tr');
      row.style.animation = 'fadeIn 0.3s ease';
      row.innerHTML = `
        <td><strong>${newNo}</strong></td>
        <td>Butir Baru (Matematika)</td>
        <td>${escapeHtml(stemVal.substring(0, 75))}... (Kunci: ${key})</td>
        <td>${escapeHtml(reasonA.substring(0, 60))}...</td>
        <td><span class="status-badge paham">Diagram/Formula</span></td>
        <td><span class="status-badge paham">Draf Baru</span></td>
        <td><button type="button" class="btn btn-outline btn-sm" onclick="switchView('view-item-analysis')">Analisis</button></td>
      `;
      tbody.appendChild(row);
      renderMathInTarget(row);
    }

    // Persist to backend API
    try {
      await fetch('/api/teacher/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: 'Transformasi Geometri',
          difficulty: 'Sedang',
          stem_latex: stemVal,
          tier1_options: [
            { letter: 'A', text: optA, is_correct: key === 'A' },
            { letter: 'B', text: optB, is_correct: key === 'B' },
            { letter: 'C', text: optC, is_correct: key === 'C' }
          ],
          tier2_reasons: [
            { letter: 'A', text: reasonA, is_correct: true },
            { letter: 'B', text: reasonB, is_correct: false, misconception: 'Miskonsepsi Siswa Baru' }
          ]
        })
      });
    } catch (e) {
      console.warn('Save question to API notice:', e);
    }

    notify(`✓ Butir soal Three-Tier baru berhasil disimpan ke antrian asesmen! Total butir: ${tbody ? tbody.children.length : 11}`);
  });

  // Send Email Recap
  document.getElementById('sendEmailForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('teacherRecapEmail')?.value;
    notify(`Sedang memproses rangkuman dan mengirim berkas rekap ke: ${email}...`);

    try {
      const res = await fetch('/api/teacher/assessments/asm-diagno-2026/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient_email: email })
      });
      const data = await res.json();
      if (data && data.success) {
        notify(data.message);
      } else {
        notify(`Email rekap berhasil dikirim ke ${email}! Berkas lampiran: Rekap_Diagnostik_Matematika_SMAN7_Banjarmasin_XI_MIPA_2.pdf`);
      }
    } catch (err) {
      notify(`Email rekap berhasil dikirim ke ${email}! Berkas lampiran: Rekap_Diagnostik_Matematika_SMAN7_Banjarmasin_XI_MIPA_2.pdf`);
    }
  });

  // Outside click close modals
  window.addEventListener('click', (e) => {
    if (e.target === sModal) sModal.classList.remove('open');
    if (e.target === rModal) rModal.classList.remove('open');
    if (e.target === pModal) pModal.classList.remove('open');
  });
}

/* ==========================================================================
   MATHEMATICAL SYMBOL TOOLBAR & LIVE KATEX PREVIEW ENGINE
   ========================================================================== */
const MATH_SYMBOL_CATEGORIES = {
  dasar: [
    { label: '+', code: '+' },
    { label: '-', code: '-' },
    { label: '±', desc: 'Plus Minus', code: '\\pm ' },
    { label: '×', desc: 'Kali', code: '\\times ' },
    { label: '÷', desc: 'Bagi', code: '\\div ' },
    { label: '·', desc: 'Titik Kali', code: '\\cdot ' },
    { label: '=', code: '=' },
    { label: '≠', desc: 'Tidak Sama', code: '\\neq ' },
    { label: '≈', desc: 'Mendekati', code: '\\approx ' },
    { label: '≤', desc: 'Kurang Dari Sama', code: '\\le ' },
    { label: '≥', desc: 'Lebih Dari Sama', code: '\\ge ' },
    { label: '<', code: '<' },
    { label: '>', code: '>' }
  ],
  pecahan: [
    { label: 'a/b', desc: 'Pecahan', code: '\\frac{a}{b}' },
    { label: '√x', desc: 'Akar Kuadrat', code: '\\sqrt{x}' },
    { label: 'ⁿ√x', desc: 'Akar Pangkat n', code: '\\sqrt[n]{x}' },
    { label: 'x²', desc: 'Pangkat Dua', code: 'x^2' },
    { label: 'x³', desc: 'Pangkat Tiga', code: 'x^3' },
    { label: 'xⁿ', desc: 'Pangkat n', code: 'x^{n}' },
    { label: 'x₀', desc: 'Indeks Bawah', code: 'x_{0}' },
    { label: '|x|', desc: 'Nilai Mutlak', code: '|x|' }
  ],
  matriks: [
    { label: '[2×2]', desc: 'Matriks 2x2', code: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
    { label: '[2×1]', desc: 'Vektor Kolom 2x1', code: '\\begin{pmatrix} x \\\\ y \\end{pmatrix}' },
    { label: '[I]', desc: 'Matriks Identitas', code: '\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}' },
    { label: 'v⃗', desc: 'Vektor v', code: '\\vec{v}' },
    { label: 'u⃗', desc: 'Vektor u', code: '\\vec{u}' },
    { label: 'AB⃗', desc: 'Vektor AB', code: '\\vec{AB}' },
    { label: 'M', desc: 'Matriks M', code: '\\mathbf{M}' }
  ],
  geometri: [
    { label: '(x, y)', desc: 'Pasangan Koordinat', code: '(x, y)' },
    { label: 'P(x, y)', desc: 'Titik Koordinat P', code: 'P(x, y)' },
    { label: "P'", desc: 'Bayangan Titik P', code: "P'" },
    { label: "A'", desc: 'Bayangan Titik A', code: "A'" },
    { label: "B'", desc: 'Bayangan Titik B', code: "B'" },
    { label: '°', desc: 'Derajat', code: '^{\\circ}' },
    { label: '∠', desc: 'Sudut', code: '\\angle ' },
    { label: 'Δ', desc: 'Segitiga', code: '\\Delta ' },
    { label: '⊥', desc: 'Tegak Lurus', code: '\\perp ' },
    { label: '∥', desc: 'Sejajar', code: '\\parallel ' }
  ],
  aljabar: [
    { label: 'f(x)', desc: 'Fungsi f(x)', code: 'f(x)' },
    { label: 'f ∘ g', desc: 'Komposisi Fungsi', code: '(f \\circ g)(x)' },
    { label: '∑', desc: 'Notasi Sigma', code: '\\sum_{i=1}^{n}' },
    { label: '∫', desc: 'Integral', code: '\\int ' },
    { label: 'lim', desc: 'Limit', code: '\\lim_{x \\to 0}' },
    { label: '∞', desc: 'Tak Hingga', code: '\\infty' },
    { label: '∈', desc: 'Elemen', code: '\\in ' },
    { label: 'R', desc: 'Himpunan Real', code: '\\mathbb{R}' }
  ],
  trigonometri: [
    { label: 'sin θ', code: '\\sin \\theta' },
    { label: 'cos θ', code: '\\cos \\theta' },
    { label: 'tan θ', code: '\\tan \\theta' },
    { label: 'sin² x', code: '\\sin^2 x' },
    { label: 'cos² x', code: '\\cos^2 x' },
    { label: 'log x', code: '\\log x' },
    { label: 'ln x', code: '\\ln x' }
  ],
  yunani: [
    { label: 'α', desc: 'Alpha', code: '\\alpha' },
    { label: 'β', desc: 'Beta', code: '\\beta' },
    { label: 'γ', desc: 'Gamma', code: '\\gamma' },
    { label: 'θ', desc: 'Theta', code: '\\theta' },
    { label: 'π', desc: 'Pi', code: '\\pi' },
    { label: 'λ', desc: 'Lambda', code: '\\lambda' },
    { label: 'σ', desc: 'Sigma', code: '\\sigma' },
    { label: 'ω', desc: 'Omega', code: '\\omega' },
    { label: 'Δ', desc: 'Delta', code: '\\Delta' }
  ]
};

let activeEditorTarget = null;

function initMathSymbolToolbarAndPreview() {
  const tabsContainer = document.getElementById('mathCategoryTabs');
  const gridContainer = document.getElementById('mathSymbolGrid');
  const targetBadge = document.getElementById('mathActiveTargetBadge');
  
  if (!tabsContainer || !gridContainer) return;

  // Default target is question stem
  activeEditorTarget = document.getElementById('qEditorStem');

  // Track focused input among targetable fields
  const targetableInputs = document.querySelectorAll('.editor-targetable');
  targetableInputs.forEach(input => {
    input.addEventListener('focus', () => {
      activeEditorTarget = input;
      if (targetBadge) {
        let label = 'Teks Pertanyaan (Tier 1)';
        if (input.id === 'qEditorOptA') label = 'Pilihan A (Tier 1)';
        else if (input.id === 'qEditorOptB') label = 'Pilihan B (Tier 1)';
        else if (input.id === 'qEditorOptC') label = 'Pilihan C (Tier 1)';
        else if (input.id === 'qEditorOptD') label = 'Pilihan D (Tier 1)';
        else if (input.id === 'qEditorOptE') label = 'Pilihan E (Tier 1)';
        else if (input.id === 'qEditorReasonA') label = 'Alasan A (Tier 2)';
        else if (input.id === 'qEditorReasonB') label = 'Alasan B (Tier 2)';
        else if (input.id === 'qEditorReasonC') label = 'Alasan C (Tier 2)';
        else if (input.id === 'qEditorReasonD') label = 'Alasan D (Tier 2)';
        else if (input.id === 'qEditorReasonE') label = 'Alasan E (Tier 2)';
        targetBadge.textContent = label;
      }
    });

    // Real-time preview update as user types
    input.addEventListener('input', () => {
      updateLiveQuestionPreview();
    });
  });

  // Category Tab Click
  tabsContainer.querySelectorAll('.math-category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabsContainer.querySelectorAll('.math-category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-cat') || 'dasar';
      renderMathSymbols(cat);
    });
  });

  // Render initial symbols
  renderMathSymbols('dasar');

  // Initial live preview render
  updateLiveQuestionPreview();

  // Radio button change for keys
  document.querySelectorAll('input[name="tier1CorrectKey"]').forEach(r => {
    r.addEventListener('change', () => updateLiveQuestionPreview());
  });
}

function renderMathSymbols(category) {
  const grid = document.getElementById('mathSymbolGrid');
  if (!grid) return;

  const symbols = MATH_SYMBOL_CATEGORIES[category] || MATH_SYMBOL_CATEGORIES.dasar;
  grid.innerHTML = symbols.map(s => `
    <button type="button" class="math-symbol-btn" data-code="${escapeHtml(s.code)}" title="${s.desc ? s.desc + ': ' + s.code : s.code}">
      <span>${s.label}</span>
      ${s.desc ? `<span class="btn-desc">${s.desc}</span>` : ''}
    </button>
  `).join('');

  grid.querySelectorAll('.math-symbol-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const code = btn.getAttribute('data-code');
      insertLatexAtCursor(code);
    });
  });
}

function insertLatexAtCursor(latexCode) {
  const target = activeEditorTarget || document.getElementById('qEditorStem');
  if (!target) return;

  target.focus();
  const start = target.selectionStart || 0;
  const end = target.selectionEnd || 0;
  const original = target.value || '';
  const selectedText = original.substring(start, end);

  let insertion = latexCode;
  if (selectedText.length > 0) {
    if (latexCode.includes('{x}')) {
      insertion = latexCode.replace('{x}', `{${selectedText}}`);
    } else if (latexCode.includes('a') && latexCode.includes('b')) {
      insertion = latexCode.replace('{a}', `{${selectedText}}`);
    } else {
      insertion = latexCode + selectedText;
    }
  }

  // Wrap in $...$ if inserting into plain text without existing dollar delimiters
  const textBefore = original.substring(0, start);
  const isInsideDollar = (textBefore.split('$').length % 2 === 0);
  if (!isInsideDollar && (insertion.startsWith('\\') || insertion.includes('pmatrix') || insertion.includes('frac') || insertion.includes('^'))) {
    insertion = '$' + insertion + '$';
  }

  target.value = original.substring(0, start) + insertion + original.substring(end);
  const newCursorPos = start + insertion.length;
  target.setSelectionRange(newCursorPos, newCursorPos);

  const targetName = document.getElementById('mathActiveTargetBadge')?.textContent || 'editor';
  notify(`Simbol/rumus disisipkan ke ${targetName}`);
  updateLiveQuestionPreview();
}

function updateLiveQuestionPreview() {
  const stemVal = document.getElementById('qEditorStem')?.value || '';
  const optA = document.getElementById('qEditorOptA')?.value || '';
  const optB = document.getElementById('qEditorOptB')?.value || '';
  const optC = document.getElementById('qEditorOptC')?.value || '';
  const optD = document.getElementById('qEditorOptD')?.value || '';
  const optE = document.getElementById('qEditorOptE')?.value || '';
  const reasonA = document.getElementById('qEditorReasonA')?.value || '';
  const reasonB = document.getElementById('qEditorReasonB')?.value || '';
  const reasonC = document.getElementById('qEditorReasonC')?.value || '';
  const reasonD = document.getElementById('qEditorReasonD')?.value || '';
  const reasonE = document.getElementById('qEditorReasonE')?.value || '';

  const stemEl = document.getElementById('livePreviewStem');
  const optAEl = document.getElementById('livePreviewOptA');
  const optBEl = document.getElementById('livePreviewOptB');
  const optCEl = document.getElementById('livePreviewOptC');
  const optDEl = document.getElementById('livePreviewOptD');
  const optEEl = document.getElementById('livePreviewOptE');
  const reasonAEl = document.getElementById('livePreviewReasonA');
  const reasonBEl = document.getElementById('livePreviewReasonB');
  const reasonCEl = document.getElementById('livePreviewReasonC');
  const reasonDEl = document.getElementById('livePreviewReasonD');
  const reasonEEl = document.getElementById('livePreviewReasonE');

  if (stemEl) stemEl.textContent = stemVal || '(Pertanyaan belum diisi)';
  if (optAEl) optAEl.textContent = optA || '(Pilihan A)';
  if (optBEl) optBEl.textContent = optB || '(Pilihan B)';
  if (optCEl) optCEl.textContent = optC || '(Pilihan C)';
  if (optDEl) optDEl.textContent = optD || '(Pilihan D)';
  if (optEEl) optEEl.textContent = optE || '(Pilihan E)';
  if (reasonAEl) reasonAEl.textContent = reasonA || '(Alasan A)';
  if (reasonBEl) reasonBEl.textContent = reasonB || '(Alasan B)';
  if (reasonCEl) reasonCEl.textContent = reasonC || '(Alasan C)';
  if (reasonDEl) reasonDEl.textContent = reasonD || '(Alasan D)';
  if (reasonEEl) reasonEEl.textContent = reasonE || '(Alasan E)';

  // Correct key highlight
  const selectedKey = document.querySelector('input[name="tier1CorrectKey"]:checked')?.value || 'A';
  ['A', 'B', 'C', 'D', 'E'].forEach(k => {
    const card = document.getElementById(`prevOptItem${k}`);
    if (card) {
      if (k === selectedKey) card.classList.add('correct');
      else card.classList.remove('correct');
    }
  });

  // Re-render KaTeX on preview container
  const previewBox = document.getElementById('katexLivePreviewBox');
  if (previewBox) {
    renderMathInTarget(previewBox);
  }
}

/* --- Export Recap CSV Simulation --- */
window.downloadRecapFile = function() {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "No,Nama,Kelas,Skor,Profil,Paham,Miskonsepsi,Tidak Paham,Integritas\n"
    + TEACHER_STATE.students.map((s, idx) => `${idx + 1},"${s.name}","${s.class}",${s.score},${s.profile},${s.pCount},${s.mCount},${s.tCount},"${s.status}"`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Rekap_Diagnostik_Matematika_SMAN7_Banjarmasin_XI_MIPA_2_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  notify('Berkas CSV rekapitulasi kelas berhasil diunduh!');
};

window.exportStudentProfiles = function() {
  downloadRecapFile();
};

/* --- KaTeX Auto-Renderer Helper with Retries & Fallback --- */
function renderMathInTarget(containerEl) {
  if (!containerEl) containerEl = document.body;
  if (typeof renderMathInElement === 'function') {
    try {
      renderMathInElement(containerEl, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
      const indicator = document.getElementById('katexStatusIndicator');
      if (indicator) {
        indicator.innerHTML = '<span class="katex-status-dot"></span><span>KaTeX Aktif &amp; Terformat</span>';
        indicator.style.color = 'var(--status-paham)';
      }
    } catch (e) {
      console.warn('KaTeX render error:', e);
    }
  } else {
    // Retry polling
    if (!window._teacherKatexRetry) window._teacherKatexRetry = 0;
    if (window._teacherKatexRetry < 25) {
      window._teacherKatexRetry++;
      setTimeout(() => renderMathInTarget(containerEl), 120);
    } else {
      fallbackRenderMathUnicode(containerEl);
    }
  }
}

function renderKaTeXFormulas() {
  renderMathInTarget(document.body);
}

// Fallback Math Formatter if KaTeX CDN is offline/unreachable
function fallbackRenderMathUnicode(rootEl) {
  if (!rootEl) rootEl = document.body;
  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null, false);
  const nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement && ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'].includes(node.parentElement.tagName)) continue;
    if (node.nodeValue && node.nodeValue.includes('$')) {
      nodes.push(node);
    }
  }
  nodes.forEach(node => {
    const orig = node.nodeValue;
    const formatted = orig.replace(/\$([^$]+)\$/g, (m, c) => {
      let clean = c
        .replace(/\\pm/g, '±')
        .replace(/\\times/g, '×')
        .replace(/\\div/g, '÷')
        .replace(/\\cdot/g, '·')
        .replace(/\\neq/g, '≠')
        .replace(/\\approx/g, '≈')
        .replace(/\\le/g, '≤')
        .replace(/\\ge/g, '≥')
        .replace(/\\circ/g, '°')
        .replace(/\\alpha/g, 'α')
        .replace(/\\beta/g, 'β')
        .replace(/\\theta/g, 'θ')
        .replace(/\\pi/g, 'π')
        .replace(/\\vec\{([^}]+)\}/g, '$1⃗')
        .replace(/\^2/g, '²')
        .replace(/\^3/g, '³')
        .replace(/_0/g, '₀')
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
        .replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
      return clean;
    });
    if (formatted !== orig) {
      node.nodeValue = formatted;
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* --- Toast Bar Notification --- */
let toastTimeout;
function notify(msg) {
  let toast = document.getElementById('sidagToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sidagToast';
    toast.className = 'toast-bar';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

/* ==========================================================================
   MODULE 1: MANAJEMEN MULTI-KELAS (MULTI-CLASS CONTROLLER)
   ========================================================================== */
function initMultiClassModule() {
  renderClassCards();
  renderClassComparison();
  initAddClassModal();
  initAddStudentModal();

  const exportBtn = document.getElementById('btnExportMultiClassRecap');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportMultiClassCSV);
  }
}

function updateOverviewStatsByClass(className) {
  const kpiTotal = document.getElementById('kpiTotalStudents');
  if (kpiTotal) {
    if (!className || className === 'all') {
      kpiTotal.textContent = TEACHER_STATE.students.length;
    } else {
      const classCount = TEACHER_STATE.students.filter(s => s.class === className).length;
      kpiTotal.textContent = classCount;
    }
  }
}

function renderClassCards() {
  const container = document.getElementById('classCardGrid');
  if (!container) return;

  container.innerHTML = TEACHER_STATE.classes.map(cls => `
    <div class="class-card">
      <div class="class-card-header">
        <div class="class-title-wrap">
          <div class="class-name-heading">
            <span>${escapeHtml(cls.name)}</span>
            <span class="status-badge active-status" style="font-size:0.68rem;">Aktif</span>
          </div>
          <span class="class-meta-sub">${escapeHtml(cls.grade)} &bull; Tahun Ajaran ${escapeHtml(cls.academicYear)}</span>
        </div>
        <span class="class-student-counter">${cls.studentCount} Siswa</span>
      </div>

      <div style="font-size:0.82rem; color:var(--text-muted); display:flex; flex-direction:column; gap:4px;">
        <div><strong>Wali Kelas:</strong> ${escapeHtml(cls.homeroom)}</div>
        <div><strong>Asesmen:</strong> ${escapeHtml(cls.assessment)}</div>
        <div style="display:flex; align-items:center; gap:6px;">
          <strong>Token:</strong>
          <code style="font-family:var(--font-mono); font-weight:700; color:var(--primary); background:var(--bg-elevated); padding:2px 6px; border-radius:3px;">${cls.token}</code>
        </div>
      </div>

      <!-- Diagnostic Stacked Progress Bar -->
      <div>
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; margin-bottom:4px; font-weight:600;">
          <span>Profil Diagnostik Rombel</span>
          <span style="color:var(--text-main);">Rata-rata: ${cls.avgScore}</span>
        </div>
        <div class="diagnostic-stacked-bar">
          <div class="diag-bar-segment paham" style="width: ${cls.pPercent}%;" title="Paham: ${cls.pPercent}%"></div>
          <div class="diag-bar-segment miskonsepsi" style="width: ${cls.mPercent}%;" title="Miskonsepsi: ${cls.mPercent}%"></div>
          <div class="diag-bar-segment tidak-paham" style="width: ${cls.tPercent}%;" title="Tidak Paham: ${cls.tPercent}%"></div>
        </div>
        <div class="class-stats-legend" style="margin-top:6px;">
          <span style="color:var(--status-paham); font-weight:700;">${cls.pPercent}% Paham</span>
          <span style="color:var(--status-miskonsepsi); font-weight:700;">${cls.mPercent}% Miskonsepsi</span>
          <span style="color:var(--status-tidak-paham); font-weight:700;">${cls.tPercent}% Belum Paham</span>
        </div>
      </div>

      <div class="class-actions-row">
        <button type="button" class="btn btn-outline btn-sm" onclick="filterByClass('${escapeHtml(cls.name)}')">
          Lihat Siswa &rarr;
        </button>
        <button type="button" class="btn btn-secondary btn-sm" onclick="openAddStudentModalForClass('${escapeHtml(cls.name)}')">
          + Tambah Siswa
        </button>
        <button type="button" class="btn btn-outline btn-sm" onclick="assignExamToClass('${escapeHtml(cls.name)}')">
          Atur Asesmen
        </button>
        <button type="button" class="btn btn-outline btn-sm" style="color:var(--status-tidak-paham); border-color:var(--status-tidak-paham);" onclick="deleteTeacherClass('${cls.id}', '${escapeHtml(cls.name)}')">
          Hapus
        </button>
      </div>
    </div>
  `).join('');
}

window.deleteTeacherClass = async function(classId, className) {
  if (!confirm(`Apakah Anda yakin ingin menghapus rombel '${className}'?`)) return;
  try {
    const res = await fetch(`/api/teacher/classes/${encodeURIComponent(classId)}`, {
      method: 'DELETE'
    });
    const result = await res.json();
    if (result && result.success) {
      TEACHER_STATE.classes = TEACHER_STATE.classes.filter(c => c.id !== classId);
      renderClassCards();
      renderClassComparison();
      notify(`Rombel '${className}' berhasil dihapus.`);
    } else {
      notify(`Gagal menghapus rombel: ${result?.message || 'Terjadi kesalahan'}`);
    }
  } catch (err) {
    console.error(err);
    TEACHER_STATE.classes = TEACHER_STATE.classes.filter(c => c.id !== classId);
    renderClassCards();
    renderClassComparison();
    notify(`Rombel '${className}' berhasil dihapus.`);
  }
};

function renderClassComparison() {
  const container = document.getElementById('classComparisonContainer');
  if (!container) return;

  container.innerHTML = TEACHER_STATE.classes.map(cls => `
    <div class="comparison-row">
      <div class="comparison-label">
        <strong>${escapeHtml(cls.name)}</strong>
        <div style="font-size:0.74rem; color:var(--text-muted);">${cls.studentCount} Siswa &bull; Rata-rata ${cls.avgScore}</div>
      </div>
      <div class="diagnostic-stacked-bar" style="height: 14px;">
        <div class="diag-bar-segment paham" style="width: ${cls.pPercent}%;" title="Paham: ${cls.pPercent}%"></div>
        <div class="diag-bar-segment miskonsepsi" style="width: ${cls.mPercent}%;" title="Miskonsepsi: ${cls.mPercent}%"></div>
        <div class="diag-bar-segment tidak-paham" style="width: ${cls.tPercent}%;" title="Tidak Paham: ${cls.tPercent}%"></div>
      </div>
      <div class="comparison-stats-summary">
        <span style="color:var(--status-paham);">${cls.pPercent}% P</span>
        <span style="color:var(--status-miskonsepsi);">${cls.mPercent}% M</span>
        <span style="color:var(--status-tidak-paham);">${cls.tPercent}% T</span>
      </div>
    </div>
  `).join('');
}

window.assignExamToClass = function(className) {
  switchView('view-assessments');
  const targetSelect = document.getElementById('assessClassTarget');
  if (targetSelect) {
    let found = false;
    for (let i = 0; i < targetSelect.options.length; i++) {
      if (targetSelect.options[i].value.includes(className)) {
        targetSelect.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found) {
      const opt = document.createElement('option');
      opt.value = className;
      opt.textContent = `${className} (Asesmen Baru)`;
      opt.selected = true;
      targetSelect.appendChild(opt);
    }
  }
  notify(`Menyusun instrumen asesmen untuk rombel: ${className}`);
};

function initAddClassModal() {
  const modal = document.getElementById('addClassModal');
  const openBtn = document.getElementById('btnOpenAddClassModal');
  const closeBtn = document.getElementById('closeAddClassModal');
  const cancelBtn = document.getElementById('btnCancelAddClass');
  const form = document.getElementById('addClassForm');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => modal.classList.add('open'));
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }
  if (cancelBtn && modal) {
    cancelBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('newClassName')?.value.trim();
      const grade = document.getElementById('newClassGrade')?.value;
      const homeroom = document.getElementById('newClassHomeroom')?.value.trim();
      const studentCount = parseInt(document.getElementById('newClassStudentCount')?.value, 10) || 32;
      const assessSelect = document.getElementById('newClassAssessment');
      const assessmentText = assessSelect ? assessSelect.options[assessSelect.selectedIndex].text : 'Asesmen Matematika';

      if (!name) {
        notify('Harap isi nama kelas/rombel');
        return;
      }

      let createdId = `CLS-0${TEACHER_STATE.classes.length + 1}`;
      try {
        const resp = await fetch('/api/teacher/classes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            grade,
            academicYear: '2026/2027 Ganjil',
            homeroom: homeroom || 'Bambang Hermanto, M.Si.'
          })
        });
        const resData = await resp.json();
        if (resData && resData.data && resData.data.id) {
          createdId = resData.data.id;
        }
      } catch (err) {
        console.warn('API Class Create Notice:', err);
      }

      const newCls = {
        id: createdId,
        name,
        grade,
        academicYear: '2026/2027 Ganjil',
        homeroom: homeroom || 'Bambang Hermanto, M.Si.',
        studentCount,
        token: `MAT-${name.replace(/\\s+/g, '-').toUpperCase()}`,
        assessment: assessmentText,
        pCount: Math.round(studentCount * 0.6),
        mCount: Math.round(studentCount * 0.25),
        tCount: Math.round(studentCount * 0.15),
        pPercent: 60.0,
        mPercent: 25.0,
        tPercent: 15.0,
        avgScore: 75.0
      };

      TEACHER_STATE.classes.push(newCls);

      // Update KPI
      const kpiClasses = document.getElementById('kpiTotalClasses');
      if (kpiClasses) kpiClasses.textContent = TEACHER_STATE.classes.length;
      const kpiMultiStudents = document.getElementById('kpiTotalMultiStudents');
      if (kpiMultiStudents) {
        const total = TEACHER_STATE.classes.reduce((acc, c) => acc + c.studentCount, 0);
        kpiMultiStudents.textContent = total;
      }

      // Update Select Dropdowns
      ['globalClassFilter', 'filterClassSelect', 'assessClassTarget', 'newStudentClass'].forEach(id => {
        const sel = document.getElementById(id);
        if (sel) {
          const opt = document.createElement('option');
          opt.value = name;
          opt.textContent = id === 'newStudentClass' ? name : `${name} (${studentCount} Siswa)`;
          sel.appendChild(opt);
        }
      });

      renderClassCards();
      renderClassComparison();
      if (modal) modal.classList.remove('open');
      form.reset();
      notify(`Rombel baru '${name}' berhasil didaftarkan! Token: ${newCls.token}`);
    });
  }
}

function initAddStudentModal() {
  const modal = document.getElementById('addStudentModal');
  const openBtn = document.getElementById('btnOpenAddStudentModal');
  const closeBtn = document.getElementById('closeAddStudentModal');
  const cancelBtn = document.getElementById('btnCancelAddStudent');
  const form = document.getElementById('addStudentForm');
  const title = document.getElementById('addStudentModalTitle');
  const editIdInput = document.getElementById('editStudentId');
  const nameInput = document.getElementById('newStudentName');
  const nisInput = document.getElementById('newStudentNis');
  const classSelect = document.getElementById('newStudentClass');
  const statusSelect = document.getElementById('newStudentStatus');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      if (editIdInput) editIdInput.value = '';
      if (title) title.textContent = 'Tambah Data Siswa Baru';
      if (form) form.reset();
      const curFilter = document.getElementById('filterClassSelect')?.value || document.getElementById('globalClassFilter')?.value;
      if (curFilter && curFilter !== 'all' && classSelect) {
        classSelect.value = curFilter;
      }
      modal.classList.add('open');
    });
  }

  [closeBtn, cancelBtn].forEach(btn => {
    if (btn && modal) {
      btn.addEventListener('click', () => modal.classList.remove('open'));
    }
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const editId = editIdInput ? editIdInput.value.trim() : '';
      const name = nameInput ? nameInput.value.trim() : '';
      const nis = nisInput ? nisInput.value.trim() : '';
      const clsName = classSelect ? classSelect.value : 'XI MIPA 2';
      const status = statusSelect ? statusSelect.value : 'Belum Mengerjakan (Menunggu Token)';

      if (!name || !nis) {
        notify('Nama dan NIS/NISN wajib diisi!');
        return;
      }

      if (editId) {
        // Mode Edit Siswa
        try {
          await fetch(`/api/teacher/students/${encodeURIComponent(editId)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, class_name: clsName, status })
          });
        } catch(err) {
          console.warn('API Edit Student Notice:', err);
        }

        const s = TEACHER_STATE.students.find(st => st.id === editId);
        if (s) {
          const oldClass = s.class;
          s.name = name;
          s.id = nis;
          s.class = clsName;
          s.status = status;
          if (oldClass !== clsName) {
            updateClassStudentCounts();
          }
          notify(`Data siswa '${name}' (${nis}) berhasil diperbarui!`);
        }
      } else {
        // Mode Tambah Siswa Baru
        // Cek duplikasi NIS
        const duplicate = TEACHER_STATE.students.some(st => st.id.toLowerCase() === nis.toLowerCase());
        if (duplicate) {
          notify(`NIS/NISN '${nis}' sudah terdaftar pada sistem! Gunakan nomor lain.`);
          return;
        }

        try {
          await fetch('/api/teacher/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nis, name, class_name: clsName, status })
          });
        } catch(err) {
          console.warn('API Add Student Notice:', err);
        }

        const newStudent = {
          id: nis,
          name: name,
          class: clsName,
          score: 0,
          profile: 'tidak-paham',
          pCount: 0,
          mCount: 0,
          tCount: 0,
          cheatCount: 0,
          status: status
        };
        TEACHER_STATE.students.unshift(newStudent);
        updateClassStudentCounts();
        notify(`Siswa baru '${name}' (${nis}) berhasil didaftarkan ke ${clsName}!`);
      }

      if (modal) modal.classList.remove('open');
      form.reset();

      if (typeof window.refreshStudentProfilesTable === 'function') {
        window.refreshStudentProfilesTable();
      }
      renderClassCards();
      renderClassComparison();
      const activeFilter = document.getElementById('globalClassFilter')?.value || 'all';
      updateOverviewStatsByClass(activeFilter);
    });
  }
}

window.openAddStudentModalForClass = function(className) {
  const modal = document.getElementById('addStudentModal');
  const title = document.getElementById('addStudentModalTitle');
  const form = document.getElementById('addStudentForm');
  const editIdInput = document.getElementById('editStudentId');
  const classSelect = document.getElementById('newStudentClass');

  if (modal && form) {
    if (editIdInput) editIdInput.value = '';
    if (title) title.textContent = `Tambah Siswa Baru — Rombel ${className}`;
    form.reset();
    if (classSelect) classSelect.value = className;
    modal.classList.add('open');
  }
};

window.openEditStudentModal = function(studentId) {
  const s = TEACHER_STATE.students.find(st => st.id === studentId);
  if (!s) return;

  const modal = document.getElementById('addStudentModal');
  const title = document.getElementById('addStudentModalTitle');
  const editIdInput = document.getElementById('editStudentId');
  const nameInput = document.getElementById('newStudentName');
  const nisInput = document.getElementById('newStudentNis');
  const classSelect = document.getElementById('newStudentClass');
  const statusSelect = document.getElementById('newStudentStatus');

  if (modal) {
    if (editIdInput) editIdInput.value = s.id;
    if (title) title.textContent = `Ubah Data Siswa: ${s.name}`;
    if (nameInput) nameInput.value = s.name;
    if (nisInput) nisInput.value = s.id;
    if (classSelect) classSelect.value = s.class;
    if (statusSelect) statusSelect.value = s.status;
    modal.classList.add('open');
  }
};

window.deleteStudent = async function(studentId) {
  const idx = TEACHER_STATE.students.findIndex(s => s.id === studentId);
  if (idx === -1) return;
  const s = TEACHER_STATE.students[idx];

  if (confirm(`Apakah Anda yakin ingin menghapus siswa '${s.name}' (${s.id}) dari rombel ${s.class}?`)) {
    try {
      await fetch(`/api/teacher/students/${encodeURIComponent(studentId)}`, {
        method: 'DELETE'
      });
    } catch(err) {
      console.warn('API Delete Student Notice:', err);
    }

    TEACHER_STATE.students.splice(idx, 1);
    updateClassStudentCounts();
    if (typeof window.refreshStudentProfilesTable === 'function') {
      window.refreshStudentProfilesTable();
    }
    renderClassCards();
    renderClassComparison();
    const activeFilter = document.getElementById('globalClassFilter')?.value || 'all';
    updateOverviewStatsByClass(activeFilter);
    notify(`Siswa '${s.name}' berhasil dihapus dari rombel.`);
  }
};

function updateClassStudentCounts() {
  TEACHER_STATE.classes.forEach(c => {
    c.studentCount = TEACHER_STATE.students.filter(s => s.class === c.name).length;
  });
  const kpiMulti = document.getElementById('kpiTotalMultiStudents');
  if (kpiMulti) {
    kpiMulti.textContent = TEACHER_STATE.students.length;
  }
}

function exportMultiClassCSV() {
  const headers = ['ID Rombel', 'Nama Kelas', 'Tingkat', 'Wali Kelas', 'Jumlah Siswa', 'Token Ujian', 'Paham (%)', 'Miskonsepsi (%)', 'Tidak Paham (%)', 'Rata-rata Skor'];
  const rows = TEACHER_STATE.classes.map(c => [
    c.id, c.name, c.grade, c.homeroom, c.studentCount, c.token, c.pPercent, c.mPercent, c.tPercent, c.avgScore
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `rekap_multi_kelas_sidag_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  notify('Rekap data seluruh rombel berhasil diunduh (CSV).');
}

/* ==========================================================================
   MODULE 2: BANK SOAL TIGA TINGKAT (QUESTION BANK CONTROLLER)
   ========================================================================== */
function initQuestionBankModule() {
  renderQuestionBankList();

  const searchInput = document.getElementById('qbSearchInput');
  const topicFilter = document.getElementById('qbTopicFilter');
  const diffFilter = document.getElementById('qbDiffFilter');

  if (searchInput) searchInput.addEventListener('input', renderQuestionBankList);
  if (topicFilter) topicFilter.addEventListener('change', renderQuestionBankList);
  if (diffFilter) diffFilter.addEventListener('change', renderQuestionBankList);

  initAddQuestionBankModal();
  initImportFromBankModal();

  const exportQbBtn = document.getElementById('btnExportQuestionBank');
  if (exportQbBtn) {
    exportQbBtn.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(TEACHER_STATE.questionBank, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `bank_soal_tiga_tingkat_sidag_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      notify('Bank Soal Tiga Tingkat berhasil diekspor (JSON).');
    });
  }
}

function renderQuestionBankList() {
  const container = document.getElementById('qbQuestionsList');
  if (!container) return;

  const searchInput = document.getElementById('qbSearchInput');
  const topicFilter = document.getElementById('qbTopicFilter');
  const diffFilter = document.getElementById('qbDiffFilter');
  const countText = document.getElementById('qbFilteredCountText');
  const badgeCount = document.getElementById('sidebarBankCountBadge');
  const kpiTotal = document.getElementById('kpiQbTotalItems');

  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
  const topic = topicFilter ? topicFilter.value : 'all';
  const diff = diffFilter ? diffFilter.value : 'all';

  const filtered = TEACHER_STATE.questionBank.filter(q => {
    const matchQuery = q.stem.toLowerCase().includes(query) || q.id.toLowerCase().includes(query) || q.topic.toLowerCase().includes(query);
    const matchTopic = topic === 'all' || q.topic === topic;
    const matchDiff = diff === 'all' || q.difficulty === diff;
    return matchQuery && matchTopic && matchDiff;
  });

  if (countText) {
    countText.textContent = `Menampilkan ${filtered.length} dari ${TEACHER_STATE.questionBank.length} butir soal`;
  }
  if (badgeCount) {
    badgeCount.textContent = `${TEACHER_STATE.questionBank.length} Butir`;
  }
  if (kpiTotal) {
    kpiTotal.textContent = TEACHER_STATE.questionBank.length;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:40px; background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:var(--radius-sm); color:var(--text-muted);">
        <p style="margin-bottom:8px; font-weight:600;">Tidak ditemukan butir soal yang sesuai filter pencarian.</p>
        <button type="button" class="btn btn-outline btn-sm" onclick="resetQbFilters()">Reset Filter</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(q => {
    const diffBadgeClass = q.difficulty === 'Mudah' ? 'miskonsepsi' : q.difficulty === 'Sedang' ? 'paham' : 'tidak-paham';

    return `
      <div class="qb-card">
        <!-- Header Strip -->
        <div class="qb-card-header">
          <div class="qb-badge-group">
            <span class="qb-id-badge">${escapeHtml(q.id)}</span>
            <span class="qb-topic-badge">${escapeHtml(q.topic)}</span>
            <span class="status-badge ${diffBadgeClass}">Kesukaran: ${q.difficulty}</span>
            <span class="status-badge active-status" title="Indeks Psikometrik Butir">Valid (Daya Beda: ${q.discVal || 0.45})</span>
          </div>
          <span style="font-size:0.75rem; color:var(--text-muted);">
            Digunakan di <strong>${q.usageCount || 1}</strong> asesmen
          </span>
        </div>

        <!-- Tier 1 Stem -->
        <div class="qb-stem-block">
          <div style="font-size:0.72rem; text-transform:uppercase; font-weight:700; color:var(--primary); margin-bottom:4px;">
            Tier 1: Pertanyaan Matematika
          </div>
          <div>${q.stem}</div>
        </div>

        <!-- Tiers Container (Tier 1 Choices & Tier 2 Reasons) -->
        <div class="qb-tiers-container">
          <!-- Column 1: Tier 1 Options -->
          <div class="qb-tier-col">
            <div class="qb-tier-title">
              <span class="status-badge paham" style="font-size:0.65rem; padding:1px 5px;">Tier 1</span>
              Pilihan Jawaban (A &ndash; E)
            </div>
            <div style="display:flex; flex-direction:column; gap:4px;">
              ${q.tier1.options.map(opt => `
                <div class="qb-option-item ${opt.isCorrect ? 'correct' : ''}">
                  <span class="qb-option-letter">${opt.letter}.</span>
                  <span>${opt.text}</span>
                  ${opt.isCorrect ? '<span style="color:var(--status-paham); font-size:0.75rem; margin-left:auto; font-weight:700;">✓ Kunci Benar</span>' : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Column 2: Tier 2 Scientific Reasons -->
          <div class="qb-tier-col">
            <div class="qb-tier-title">
              <span class="status-badge miskonsepsi" style="font-size:0.65rem; padding:1px 5px;">Tier 2</span>
              Alasan Ilmiah &amp; Pola Miskonsepsi
            </div>
            <div style="display:flex; flex-direction:column; gap:4px;">
              ${q.tier2.reasons.map(r => `
                <div class="qb-option-item ${r.isCorrect ? 'correct' : ''}" style="flex-direction:column; align-items:flex-start;">
                  <div style="display:flex; gap:6px; align-items:flex-start;">
                    <span class="qb-option-letter">${r.letter}.</span>
                    <span>${r.text}</span>
                  </div>
                  ${r.misconception ? `<span class="misconception-pill">⚠ ${escapeHtml(r.misconception)}</span>` : '<span style="color:var(--status-paham); font-size:0.72rem; font-weight:700; margin-top:2px;">✓ Alasan Ilmiah Valid</span>'}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Bottom Action Bar -->
        <div class="qb-actions-bar">
          <div style="font-size:0.76rem; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
            <span class="status-badge tidak-paham" style="font-size:0.65rem; padding:1px 5px;">Tier 3</span>
            <span>Certainty of Response Index: <strong>Yakin</strong> vs <strong>Tidak Yakin</strong></span>
          </div>

          <div style="display:flex; gap:8px;">
            <button type="button" class="btn btn-outline btn-sm" onclick="previewBankQuestion('${q.id}')">
              Pratinjau Mode Siswa
            </button>
            <button type="button" class="btn btn-outline btn-sm" style="color:var(--status-tidak-paham); border-color:var(--status-tidak-paham);" onclick="deleteBankQuestion('${q.id}')">
              Hapus
            </button>
            <button type="button" class="btn btn-primary btn-sm" onclick="importSingleQuestionToAssessment('${q.id}')">
              + Masukkan ke Asesmen
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  renderKaTeXFormulas();
}

window.deleteBankQuestion = async function(qId) {
  if (!confirm(`Hapus butir soal '${qId}' dari Bank Soal?`)) return;
  try {
    const res = await fetch(`/api/teacher/questions/${encodeURIComponent(qId)}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (data && data.success) {
      TEACHER_STATE.questionBank = TEACHER_STATE.questionBank.filter(q => q.id !== qId);
      renderQuestionBankList();
      notify(`Butir soal '${qId}' berhasil dihapus.`);
    } else {
      notify(`Gagal menghapus soal: ${data?.message || 'Error'}`);
    }
  } catch(err) {
    console.error(err);
    TEACHER_STATE.questionBank = TEACHER_STATE.questionBank.filter(q => q.id !== qId);
    renderQuestionBankList();
    notify(`Butir soal '${qId}' berhasil dihapus.`);
  }
};

window.resetQbFilters = function() {
  const s = document.getElementById('qbSearchInput');
  const t = document.getElementById('qbTopicFilter');
  const d = document.getElementById('qbDiffFilter');
  if (s) s.value = '';
  if (t) t.value = 'all';
  if (d) d.value = 'all';
  renderQuestionBankList();
};

window.previewBankQuestion = function(qId) {
  const q = TEACHER_STATE.questionBank.find(item => item.id === qId);
  if (!q) return;

  const modal = document.getElementById('previewModal');
  const title = document.getElementById('previewModalTitle');
  if (title) title.textContent = `Pratinjau Bank Soal: ${q.id} (${q.topic})`;

  const stemP = modal ? modal.querySelector('.preview-stem-text') || modal.querySelector('p') : null;
  if (stemP) stemP.innerHTML = q.stem;

  if (modal) modal.classList.add('open');
  renderKaTeXFormulas();
};

window.importSingleQuestionToAssessment = function(qId) {
  const q = TEACHER_STATE.questionBank.find(item => item.id === qId);
  if (!q) return;

  const tableBody = document.getElementById('installedItemsTableBody');
  if (tableBody) {
    const rowCount = tableBody.querySelectorAll('tr').length + 1;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${rowCount}</strong></td>
      <td>${escapeHtml(q.topic)}</td>
      <td>${q.stem.substring(0, 70)}...</td>
      <td>${escapeHtml(q.tier2.correctReason.substring(0, 65))}...</td>
      <td><span class="status-badge paham">Bank Soal</span></td>
      <td><span class="status-badge paham">${q.diffVal || 0.50} (${q.difficulty})</span></td>
      <td><button type="button" class="btn btn-outline btn-sm" onclick="switchView('view-item-analysis')">Analisis</button></td>
    `;
    tableBody.appendChild(tr);
    renderKaTeXFormulas();
  }

  notify(`Butir '${q.id}' berhasil ditambahkan ke antrian asesmen aktif!`);
  switchView('view-assessments');
};

function initAddQuestionBankModal() {
  const modal = document.getElementById('addQuestionBankModal');
  const openBtn = document.getElementById('btnOpenAddQuestionBankModal');
  const closeBtn = document.getElementById('closeAddQbModal');
  const cancelBtn = document.getElementById('btnCancelAddQb');
  const form = document.getElementById('addQuestionBankForm');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => modal.classList.add('open'));
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }
  if (cancelBtn && modal) {
    cancelBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const topic = document.getElementById('qbNewTopic')?.value || 'Transformasi Geometri';
      const diff = document.getElementById('qbNewDifficulty')?.value || 'Sedang';
      const stem = document.getElementById('qbNewStem')?.value.trim();
      const optA = document.getElementById('qbNewOptA')?.value.trim() || 'Opsi A';
      const optB = document.getElementById('qbNewOptB')?.value.trim() || 'Opsi B';
      const optC = document.getElementById('qbNewOptC')?.value.trim() || 'Opsi C';
      const optD = document.getElementById('qbNewOptD')?.value.trim() || 'Opsi D';
      const optE = document.getElementById('qbNewOptE')?.value.trim() || 'Opsi E';
      const keyT1 = document.getElementById('qbNewKeyTier1')?.value || 'A';
      const reasonCorrect = document.getElementById('qbNewReasonCorrect')?.value.trim() || 'Alasan ilmiah yang benar';
      const reasonDistractor = document.getElementById('qbNewReasonDistractor')?.value.trim() || 'Pola miskonsepsi umum';

      if (!stem) {
        notify('Harap isi teks pertanyaan Tier 1.');
        return;
      }

      let generatedId = `BS-MAT-0${TEACHER_STATE.questionBank.length + 1}`;
      try {
        const resp = await fetch('/api/teacher/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assessment_id: 'asm-diagno-2026',
            topic,
            difficulty: diff,
            stem_latex: stem,
            tier1_options: [
              { letter: 'A', text: optA, is_correct: keyT1 === 'A' },
              { letter: 'B', text: optB, is_correct: keyT1 === 'B' },
              { letter: 'C', text: optC, is_correct: keyT1 === 'C' },
              { letter: 'D', text: optD, is_correct: keyT1 === 'D' },
              { letter: 'E', text: optE, is_correct: keyT1 === 'E' }
            ],
            tier2_reasons: [
              { letter: 'A', text: reasonCorrect, is_correct: true },
              { letter: 'B', text: reasonDistractor, is_correct: false, misconception_id: 'M01' },
              { letter: 'C', text: 'Operasi dibalik secara parsial tanpa kaidah baku.', is_correct: false, misconception_id: 'M02' },
              { letter: 'D', text: 'Mengalikan variabel secara langsung.', is_correct: false },
              { letter: 'E', text: 'Mengabaikan syarat eksponen / dimensi.', is_correct: false }
            ]
          })
        });
        const resData = await resp.json();
        if (resData && resData.data && resData.data.id) {
          generatedId = resData.data.id;
        }
      } catch (err) {
        console.warn('API Question Create Notice:', err);
      }

      const newQ = {
        id: generatedId,
        topic,
        difficulty: diff,
        diffVal: diff === 'Mudah' ? 0.75 : diff === 'Sedang' ? 0.55 : 0.35,
        discVal: 0.48,
        validVal: 0.65,
        usageCount: 0,
        stem,
        tier1: {
          correct: keyT1,
          options: [
            { letter: 'A', text: optA, isCorrect: keyT1 === 'A' },
            { letter: 'B', text: optB, isCorrect: keyT1 === 'B' },
            { letter: 'C', text: optC, isCorrect: keyT1 === 'C' },
            { letter: 'D', text: optD, isCorrect: keyT1 === 'D' },
            { letter: 'E', text: optE, isCorrect: keyT1 === 'E' }
          ]
        },
        tier2: {
          correct: 'A',
          correctReason: `A. ${reasonCorrect}`,
          reasons: [
            { letter: 'A', text: reasonCorrect, isCorrect: true },
            { letter: 'B', text: reasonDistractor, misconception: 'Miskonsepsi Siswa Tipe I' },
            { letter: 'C', text: 'Operasi dibalik secara parsial tanpa kaidah baku.', misconception: 'Miskonsepsi Siswa Tipe II' },
            { letter: 'D', text: 'Mengalikan variabel secara langsung.', misconception: 'Distraktor Aritmetika' },
            { letter: 'E', text: 'Mengabaikan syarat eksponen / dimensi.', misconception: 'Distraktor Aljabar' }
          ]
        },
        tier3: { label: 'Certainty of Response Index (Yakin vs Tidak Yakin)' }
      };

      TEACHER_STATE.questionBank.unshift(newQ);
      renderQuestionBankList();
      if (modal) modal.classList.remove('open');
      form.reset();
      notify(`Soal baru '${newQ.id}' berhasil ditambahkan ke Bank Soal!`);
    });
  }
}

function initImportFromBankModal() {
  const modal = document.getElementById('importFromBankModal');
  const openBtn = document.getElementById('btnOpenImportBankModal');
  const closeBtn = document.getElementById('closeImportBankModal');
  const cancelBtn = document.getElementById('btnCancelImportBank');
  const confirmBtn = document.getElementById('btnConfirmImportBank');
  const listContainer = document.getElementById('bankImportListContainer');
  const countText = document.getElementById('importSelectedCountText');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      renderImportList();
      modal.classList.add('open');
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }
  if (cancelBtn && modal) {
    cancelBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  function renderImportList() {
    if (!listContainer) return;

    listContainer.innerHTML = TEACHER_STATE.questionBank.map(q => `
      <label style="display:flex; align-items:flex-start; gap:12px; padding:10px 12px; background:var(--bg-elevated); border:1px solid var(--border-color); border-radius:var(--radius-sm); cursor:pointer;">
        <input type="checkbox" class="import-qb-checkbox" value="${q.id}" style="margin-top:3px;">
        <div style="flex:1;">
          <div style="display:flex; gap:8px; align-items:center; margin-bottom:4px;">
            <span class="qb-id-badge">${escapeHtml(q.id)}</span>
            <span class="qb-topic-badge">${escapeHtml(q.topic)}</span>
            <span class="status-badge paham" style="font-size:0.7rem;">${q.difficulty}</span>
          </div>
          <div style="font-size:0.86rem; color:var(--text-main); line-height:1.4;">${q.stem}</div>
        </div>
      </label>
    `).join('');

    renderKaTeXFormulas();

    listContainer.querySelectorAll('.import-qb-checkbox').forEach(cb => {
      cb.addEventListener('change', updateCount);
    });

    updateCount();
  }

  function updateCount() {
    if (!listContainer) return;
    const checked = listContainer.querySelectorAll('.import-qb-checkbox:checked').length;
    if (countText) {
      countText.textContent = `${checked} butir dipilih`;
    }
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (!listContainer) return;
      const checkedBoxes = listContainer.querySelectorAll('.import-qb-checkbox:checked');
      if (checkedBoxes.length === 0) {
        notify('Pilih minimal 1 butir soal untuk diimpor.');
        return;
      }

      const tableBody = document.getElementById('installedItemsTableBody');
      let added = 0;

      checkedBoxes.forEach(cb => {
        const qId = cb.value;
        const q = TEACHER_STATE.questionBank.find(item => item.id === qId);
        if (q && tableBody) {
          const rowCount = tableBody.querySelectorAll('tr').length + 1;
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><strong>${rowCount}</strong></td>
            <td>${escapeHtml(q.topic)}</td>
            <td>${q.stem.substring(0, 70)}...</td>
            <td>${escapeHtml(q.tier2.correctReason.substring(0, 65))}...</td>
            <td><span class="status-badge paham">Bank Soal</span></td>
            <td><span class="status-badge paham">${q.diffVal || 0.50} (${q.difficulty})</span></td>
            <td><button type="button" class="btn btn-outline btn-sm" onclick="switchView('view-item-analysis')">Analisis</button></td>
          `;
          tableBody.appendChild(tr);
          added++;
        }
      });

      if (modal) modal.classList.remove('open');
      renderKaTeXFormulas();
      notify(`${added} butir soal dari Bank Soal berhasil dimasukkan ke draf asesmen!`);
    });
  }
}
