/**
 * SiDag - Student Facing Assessment Engine
 * Sistem Informasi Asesmen Diagnostik Tiga Tingkat (Three-Tier)
 * Implementasi Penuh PRD: Gateway Token, Briefing, Pengerjaan 3-Tier, Anti-Cheat, Autosave, & Hasil Refleksi
 */

// ============================================================================
// ============================================================================
// 1. DATA SOAL ASESMEN DIAGNOSTIK 3-TINGKAT (MOCK DATA MATEMATIKA)
// ============================================================================
const ASSESSMENTS_DATABASE = {
  'DIAGNO-2026': {
    token: 'DIAGNO-2026',
    title: 'Asesmen Diagnostik Tiga Tingkat: Matematika (Kelas XI)',
    subject: 'Matematika',
    grade: 'Fase F / Kelas XI',
    school: 'SMAN 7 Banjarmasin',
    developerInstitution: 'Fakultas Keguruan dan Ilmu Pendidikan, Universitas Lambung Mangkurat',
    teacher: 'Bambang Hermanto, S.Pd., M.Si.',
    durationMinutes: 30,
    instructions: 'Asesmen ini bertujuan mendiagnosis struktur pemahaman konsep dan miskonsepsi Anda pada mata pelajaran Matematika. Kerjakan secara mandiri dengan jujur tanpa bantuan alat hitung otomatis.',
    questions: [
      {
        id: 'q1',
        number: 1,
        concept: 'Translasi Vektor pada Bidang Cartesius',
        stem: 'Sebuah titik $P(2, -3)$ pada bidang koordinat Cartesius ditranslasikan oleh vektor translasi $T = \\begin{pmatrix} -5 \\\\ 7 \\end{pmatrix}$. Manakah koordinat bayangan titik $P\'$ yang dihasilkan setelah pergeseran tersebut?',
        mediaSvg: `
          <svg viewBox="0 0 460 220" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPatternQ1" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" stroke-width="0.7" opacity="0.6"/>
              </pattern>
              <marker id="arrowVec" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b"/>
              </marker>
            </defs>
            <rect width="460" height="220" fill="#0f172a" rx="8"/>
            <rect width="460" height="220" fill="url(#gridPatternQ1)" rx="8"/>
            <!-- Sumbu X dan Y (Origin at 230, 110) -->
            <line x1="30" y1="110" x2="430" y2="110" stroke="#94a3b8" stroke-width="1.8"/>
            <line x1="230" y1="20" x2="230" y2="200" stroke="#94a3b8" stroke-width="1.8"/>
            <polygon points="434,110 424,105 424,115" fill="#94a3b8"/>
            <polygon points="230,16 225,26 235,26" fill="#94a3b8"/>
            <text x="430" y="126" fill="#cbd5e1" font-size="12" font-family="JetBrains Mono" font-weight="700">X</text>
            <text x="216" y="24" fill="#cbd5e1" font-size="12" font-family="JetBrains Mono" font-weight="700">Y</text>
            <text x="220" y="124" fill="#64748b" font-size="11" font-family="JetBrains Mono">O(0,0)</text>
            <!-- Titik Asal P(2, -3) -> pixel (230 + 2*18 = 266, 110 - (-3)*18 = 164) -->
            <circle cx="266" cy="164" r="6" fill="#38bdf8"/>
            <text x="278" y="172" fill="#38bdf8" font-size="12" font-weight="700" font-family="Plus Jakarta Sans">P(2, -3)</text>
            <!-- Titik Bayangan P'(-3, 4) -> pixel (230 - 3*18 = 176, 110 - 4*18 = 38) -->
            <circle cx="176" cy="38" r="6" fill="#10b981"/>
            <text x="110" y="42" fill="#10b981" font-size="12" font-weight="700" font-family="Plus Jakarta Sans">P\'(-3, 4)</text>
            <!-- Vector panah translasi -->
            <line x1="266" y1="164" x2="176" y2="38" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6 3" marker-end="url(#arrowVec)"/>
            <!-- Komponen translasi putus-putus -->
            <line x1="266" y1="164" x2="176" y2="164" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3 3"/>
            <line x1="176" y1="164" x2="176" y2="44" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="3 3"/>
            <text x="220" y="180" fill="#f43f5e" font-size="11" font-weight="700" text-anchor="middle">Δx = -5 (kiri)</text>
            <text x="140" y="105" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">Δy = +7 (atas)</text>
          </svg>
        `,
        mediaCaption: 'Gambar 1. Pergeseran vektor posisi titik P(2, -3) oleh translasi T = (-5, 7) pada bidang Cartesius.',
        tier1: {
          key: 'C',
          options: [
            { id: 'A', text: '$P\'(7, -10)$' },
            { id: 'B', text: '$P\'(-3, -10)$' },
            { id: 'C', text: '$P\'(-3, 4)$' },
            { id: 'D', text: '$P\'(3, -4)$' },
            { id: 'E', text: '$P\'(-10, -21)$' }
          ]
        },
        tier2: {
          key: 'B',
          options: [
            { id: 'A', text: 'Translasi titik dilakukan dengan mengurangkan koordinat titik asal terhadap vektor translasi: $x\' = x - a$ dan $y\' = y - b$.' },
            { id: 'B', text: 'Berdasarkan prinsip translasi, koordinat bayangan diperoleh dengan menjumlahkan masing-masing komponen: $x\' = x + a = 2 + (-5) = -3$ dan $y\' = y + b = -3 + 7 = 4$.' },
            { id: 'C', text: 'Vektor translasi bertindak sebagai faktor pengali skalar terhadap koordinat titik: $x\' = x \\cdot a$ dan $y\' = y \\cdot b$.' },
            { id: 'D', text: 'Komponen translasi $a$ menggeser sumbu $Y$ dan komponen $b$ menggeser sumbu $X$ secara terbalik.' },
            { id: 'E', text: 'Translasi hanya mengubah tanda positif/negatif tanpa mengubah nilai mutlak dari koordinat titik awal.' }
          ]
        },
        misconceptionNote: 'Miskonsepsi Pengurangan Translasi: Sebagian siswa keliru menggunakan rumus pengurangan $x\' = x - a$ (karena tertukar dengan rumus pergeseran persamaan fungsi $f(x - a)$) atau keliru saat menjumlahkan bilangan negatif $(-3 + 7)$.'
      },
      {
        id: 'q2',
        number: 2,
        concept: 'Refleksi Titik terhadap Garis $y = -x$',
        stem: 'Titik $A(3, 1)$ dicerminkan terhadap garis $y = -x$. Manakah koordinat bayangan $A\'$ yang tepat beserta matriks transformasinya?',
        mediaSvg: `
          <svg viewBox="0 0 460 220" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPatternQ2" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" stroke-width="0.7" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="460" height="220" fill="#0f172a" rx="8"/>
            <rect width="460" height="220" fill="url(#gridPatternQ2)" rx="8"/>
            <!-- Sumbu X dan Y (Origin at 230, 110) -->
            <line x1="30" y1="110" x2="430" y2="110" stroke="#94a3b8" stroke-width="1.8"/>
            <line x1="230" y1="20" x2="230" y2="200" stroke="#94a3b8" stroke-width="1.8"/>
            <text x="430" y="126" fill="#cbd5e1" font-size="12" font-family="JetBrains Mono" font-weight="700">X</text>
            <text x="216" y="24" fill="#cbd5e1" font-size="12" font-family="JetBrains Mono" font-weight="700">Y</text>
            <!-- Garis Cermin y = -x (gradien -1 melalui 230,110) -->
            <line x1="130" y1="10" x2="330" y2="210" stroke="#f43f5e" stroke-width="2.5" stroke-dasharray="6 4"/>
            <text x="335" y="205" fill="#f43f5e" font-size="12" font-weight="800" font-family="JetBrains Mono">Garis y = -x</text>
            <!-- Titik A(3, 1) -> pixel (230 + 3*22 = 296, 110 - 1*22 = 88) -->
            <circle cx="296" cy="88" r="6" fill="#38bdf8"/>
            <text x="306" y="86" fill="#38bdf8" font-size="12" font-weight="700">A(3, 1)</text>
            <!-- Titik Bayangan A'(-1, -3) -> pixel (230 - 1*22 = 208, 110 - (-3)*22 = 176) -->
            <circle cx="208" cy="176" r="6" fill="#10b981"/>
            <text x="135" y="184" fill="#10b981" font-size="12" font-weight="700">A\'(-1, -3)</text>
            <!-- Garis hubung tegak lurus cermin -->
            <line x1="296" y1="88" x2="208" y2="176" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4 3"/>
            <!-- Simbol siku-siku di titik potong (252, 132) -->
            <path d="M 246 126 L 252 120 L 258 126" fill="none" stroke="#fbbf24" stroke-width="1.5"/>
            <text x="264" y="148" fill="#fbbf24" font-size="10">d = d\' (tegak lurus)</text>
          </svg>
        `,
        mediaCaption: 'Gambar 2. Pencerminan titik A(3, 1) terhadap garis cermin miring y = -x.',
        tier1: {
          key: 'C',
          options: [
            { id: 'A', text: '$A\'(1, 3)$' },
            { id: 'B', text: '$A\'(-3, -1)$' },
            { id: 'C', text: '$A\'(-1, -3)$' },
            { id: 'D', text: '$A\'(-1, 3)$' },
            { id: 'E', text: '$A\'(3, -1)$' }
          ]
        },
        tier2: {
          key: 'A',
          options: [
            { id: 'A', text: 'Pencerminan terhadap garis $y = -x$ menukar posisi absis dan ordinat serta menegasikan tandanya: $(x, y) \\to (-y, -x)$, bersesuaian dengan matriks $\\begin{pmatrix} 0 & -1 \\\\ -1 & 0 \\end{pmatrix}$.' },
            { id: 'B', text: 'Pencerminan terhadap garis $y = -x$ hanya mengubah tanda kedua komponen menjadi negatif tanpa menukar posisinya: $(x, y) \\to (-x, -y)$.' },
            { id: 'C', text: 'Pencerminan selalu menukar posisi koordinat saja $(x, y) \\to (y, x)$ karena gradien garisnya bernilai mutlak 1.' },
            { id: 'D', text: 'Jarak titik ke garis cermin selalu menghasilkan nilai ordinat yang tetap bertanda positif.' },
            { id: 'E', text: 'Garis $y = -x$ identik dengan pencerminan terhadap sumbu $X$ yang dilanjutkan refleksi sumbu $Y$.' }
          ]
        },
        misconceptionNote: 'Miskonsepsi Refleksi Garis $y = -x$: Siswa sering tertukar antara refleksi terhadap $y = x$ ($x\' = y, y\' = x$) dan refleksi terhadap titik asal $(0,0)$ ($x\' = -x, y\' = -y$). Pada garis $y = -x$, posisi harus ditukar DAN kedua tandanya dinegasikan: $(x, y) \\to (-y, -x)$.'
      },
      {
        id: 'q3',
        number: 3,
        concept: 'Rotasi Sudut Positif Berlawanan Arah Jarum Jam',
        stem: 'Titik $B(4, 2)$ dirotasikan sebesar $+90^\\circ$ dengan pusat rotasi di titik asal $O(0,0)$ pada bidang koordinat. Manakah koordinat bayangan titik $B\'$ yang terbentuk?',
        mediaSvg: `
          <svg viewBox="0 0 460 220" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPatternQ3" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" stroke-width="0.7" opacity="0.6"/>
              </pattern>
              <marker id="rotArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8"/>
              </marker>
            </defs>
            <rect width="460" height="220" fill="#0f172a" rx="8"/>
            <rect width="460" height="220" fill="url(#gridPatternQ3)" rx="8"/>
            <!-- Sumbu X dan Y (Origin at 230, 140) -->
            <line x1="30" y1="140" x2="430" y2="140" stroke="#94a3b8" stroke-width="1.8"/>
            <line x1="230" y1="20" x2="230" y2="200" stroke="#94a3b8" stroke-width="1.8"/>
            <text x="430" y="156" fill="#cbd5e1" font-size="12" font-family="JetBrains Mono" font-weight="700">X</text>
            <text x="216" y="24" fill="#cbd5e1" font-size="12" font-family="JetBrains Mono" font-weight="700">Y</text>
            <circle cx="230" cy="140" r="4" fill="#f59e0b"/>
            <text x="214" y="156" fill="#f59e0b" font-size="11" font-family="JetBrains Mono">O(0,0)</text>
            <!-- Titik B(4, 2) -> pixel (230 + 4*24 = 326, 140 - 2*24 = 92) -->
            <line x1="230" y1="140" x2="326" y2="92" stroke="#f59e0b" stroke-width="2"/>
            <circle cx="326" cy="92" r="6" fill="#f59e0b"/>
            <text x="334" y="94" fill="#f59e0b" font-size="12" font-weight="700">B(4, 2)</text>
            <!-- Titik Bayangan B'(-2, 4) -> pixel (230 - 2*24 = 182, 140 - 4*24 = 44) -->
            <line x1="230" y1="140" x2="182" y2="44" stroke="#10b981" stroke-width="2"/>
            <circle cx="182" cy="44" r="6" fill="#10b981"/>
            <text x="120" y="44" fill="#10b981" font-size="12" font-weight="700">B\'(-2, 4)</text>
            <!-- Busur Rotasi +90 Derajat (Counter-Clockwise) -->
            <path d="M 288 111 A 65 65 0 0 0 202 83" fill="none" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#rotArrow)"/>
            <text x="256" y="80" fill="#38bdf8" font-size="12" font-weight="800" text-anchor="middle">+90° (Berlawanan Jarum Jam)</text>
            <!-- Siku-siku 90 derajat di Origin -->
            <path d="M 242 134 L 248 122 L 236 128" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
          </svg>
        `,
        mediaCaption: 'Gambar 3. Rotasi titik B(4, 2) sejauh +90° berlawanan arah jarum jam terhadap pusat O(0,0).',
        tier1: {
          key: 'B',
          options: [
            { id: 'A', text: '$B\'(2, -4)$' },
            { id: 'B', text: '$B\'(-2, 4)$' },
            { id: 'C', text: '$B\'(-4, -2)$' },
            { id: 'D', text: '$B\'(2, 4)$' },
            { id: 'E', text: '$B\'(-4, 2)$' }
          ]
        },
        tier2: {
          key: 'B',
          options: [
            { id: 'A', text: 'Sudut rotasi bernilai positif $+90^\\circ$ bermakna putaran searah jarum jam sehingga koordinatnya adalah $(y, -x) = (2, -4)$.' },
            { id: 'B', text: 'Dalam konvensi matematika baku, sudut rotasi bernilai positif bermakna putaran berlawanan arah jarum jam dengan matriks $\\begin{pmatrix} \\cos 90^\\circ & -\\sin 90^\\circ \\\\ \\sin 90^\\circ & \\cos 90^\\circ \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$, sehingga $(x, y) \\to (-y, x) = (-2, 4)$.' },
            { id: 'C', text: 'Rotasi $90^\\circ$ selalu menghasilkan koordinat bayangan yang berlawanan tanda secara simetris mutlak $(-x, -y)$.' },
            { id: 'D', text: 'Rotasi tidak mengubah nilai absis ($x$), melainkan hanya membalikkan nilai ordinat ($y$).' },
            { id: 'E', text: 'Sudut $+90^\\circ$ langsung menukar nilai koordinat tanpa memunculkan tanda minus $(y, x) = (2, 4)$.' }
          ]
        },
        misconceptionNote: 'Miskonsepsi Arah Jarum Jam vs Berlawanan Jarum Jam: Banyak siswa mengira sudut positif $+90^\\circ$ berputar searah jarum jam (clock-wise) sehingga memilih bayangan $(2, -4)$. Padahal dalam trigonometri dan geometri analitik, sudut positif selalu berlawanan arah jarum jam (counter-clockwise).'
      },
      {
        id: 'q4',
        number: 4,
        concept: 'Dilatasi Bangun Datar & Perubahan Luas 2D',
        stem: 'Sebuah segitiga $ABC$ memiliki luas daerah $L = 12\\text{ cm}^2$. Segitiga tersebut didilatasi dengan titik pusat $O(0,0)$ dan faktor skala $k = 3$ menghasilkan segitiga bayangan $A\'B\'C\'. Berapakah luas daerah segitiga bayangan $A\'B\'C\'$ tersebut?',
        mediaSvg: `
          <svg viewBox="0 0 460 220" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPatternQ4" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" stroke-width="0.7" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="460" height="220" fill="#0f172a" rx="8"/>
            <rect width="460" height="220" fill="url(#gridPatternQ4)" rx="8"/>
            <!-- Origin Point -->
            <circle cx="50" cy="180" r="5" fill="#f59e0b"/>
            <text x="35" y="198" fill="#f59e0b" font-size="11" font-family="JetBrains Mono" font-weight="700">O(0,0)</text>
            <!-- Rays from Origin -->
            <line x1="50" y1="180" x2="420" y2="40" stroke="#64748b" stroke-width="1" stroke-dasharray="4 3"/>
            <line x1="50" y1="180" x2="400" y2="180" stroke="#64748b" stroke-width="1" stroke-dasharray="4 3"/>
            <line x1="50" y1="180" x2="270" y2="30" stroke="#64748b" stroke-width="1" stroke-dasharray="4 3"/>
            <!-- Original Triangle ABC (scaled k=1) -->
            <polygon points="110,180 180,180 110,140" fill="rgba(56, 189, 248, 0.35)" stroke="#38bdf8" stroke-width="2"/>
            <text x="135" y="170" fill="#38bdf8" font-size="11" font-weight="800">L = 12 cm²</text>
            <text x="125" y="196" fill="#94a3b8" font-size="10">Segitiga Asal (k = 1)</text>
            <!-- Dilated Triangle A'B'C' (scaled k=3) -->
            <polygon points="230,180 390,180 230,60" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="2.5"/>
            <text x="290" y="140" fill="#10b981" font-size="13" font-weight="800">L\' = k² × L = ?</text>
            <text x="270" y="196" fill="#10b981" font-size="11" font-weight="700">Bayangan Dilatasi [O, k = 3]</text>
          </svg>
        `,
        mediaCaption: 'Gambar 4. Dilatasi bangun segitiga dengan pusat O(0,0) dan faktor skala k = 3.',
        tier1: {
          key: 'C',
          options: [
            { id: 'A', text: '$36\\text{ cm}^2$' },
            { id: 'B', text: '$72\\text{ cm}^2$' },
            { id: 'C', text: '$108\\text{ cm}^2$' },
            { id: 'D', text: '$24\\text{ cm}^2$' },
            { id: 'E', text: '$144\\text{ cm}^2$' }
          ]
        },
        tier2: {
          key: 'B',
          options: [
            { id: 'A', text: 'Luas bangun bayangan berbanding lurus linier dengan faktor skala $k$, sehingga luasnya adalah $k \\times L = 3 \\times 12 = 36\\text{ cm}^2$.' },
            { id: 'B', text: 'Pada dilatasi bangun datar berdimensi dua (2D), alas dan tinggi masing-masing membesar sebanyak $k$ kali, sehingga luas bayangan membesar sebesar $k^2$ kali lipat: $L\' = k^2 \\times L = 3^2 \\times 12 = 9 \\times 12 = 108\\text{ cm}^2$.' },
            { id: 'C', text: 'Faktor skala $k = 3$ hanya memengaruhi keliling sisi luar bangun, sedangkan luas daerah tetap tidak berubah.' },
            { id: 'D', text: 'Luas bangun bayangan dihitung dari $L\' = \\frac{1}{2} \\cdot k \\cdot L = \\frac{1}{2} \\cdot 3 \\cdot 12 = 18\\text{ cm}^2$.' },
            { id: 'E', text: 'Faktor skala harus dipangkatkan tiga ($k^3$) untuk semua jenis perhitungan bangun geometri.' }
          ]
        },
        misconceptionNote: 'Miskonsepsi Skala Linier pada Luas: Siswa berasumsi bahwa karena panjang sisi berlipat 3 kali, maka luasnya juga otomatis berlipat 3 kali ($3 \\times 12 = 36\\text{ cm}^2$). Padahal luas berdimensi dua sehingga dipengaruhi kuadrat faktor skala ($k^2 = 9$).'
      },
      {
        id: 'q5',
        number: 5,
        concept: 'Komposisi Perkalian Matriks $(T_2 \\circ T_1)$',
        stem: 'Sebuah transformasi $T_1$ bersesuaian dengan matriks $M_1 = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$ (refleksi terhadap garis $y = x$) dan $T_2$ bersesuaian dengan matriks $M_2 = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$ (rotasi $+90^\\circ$). Matriks tunggal yang mewakili komposisi transformasi $(T_2 \\circ T_1)$ (transformasi $T_1$ dilanjutkan oleh $T_2$) adalah:',
        mediaSvg: `
          <svg viewBox="0 0 460 220" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="compArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#818cf8"/>
              </marker>
            </defs>
            <rect width="460" height="220" fill="#0f172a" rx="8"/>
            <!-- Stage 1 Box -->
            <rect x="25" y="70" width="100" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.8"/>
            <text x="75" y="100" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle">Objek Awal</text>
            <text x="75" y="125" fill="#94a3b8" font-size="12" font-family="JetBrains Mono" text-anchor="middle">Vektor [x, y]ᵀ</text>
            <!-- Step 1 Arrow -->
            <line x1="130" y1="110" x2="175" y2="110" stroke="#818cf8" stroke-width="2.5" marker-end="url(#compArrow)"/>
            <text x="152" y="98" fill="#a5b4fc" font-size="11" font-weight="700" text-anchor="middle">T₁ (M₁)</text>
            <!-- Stage 2 Box -->
            <rect x="180" y="70" width="100" height="80" rx="8" fill="#1e293b" stroke="#818cf8" stroke-width="1.8"/>
            <text x="230" y="100" fill="#818cf8" font-size="13" font-weight="800" text-anchor="middle">Bayangan 1</text>
            <text x="230" y="125" fill="#cbd5e1" font-size="11" font-family="JetBrains Mono" text-anchor="middle">M₁ · x</text>
            <!-- Step 2 Arrow -->
            <line x1="285" y1="110" x2="330" y2="110" stroke="#818cf8" stroke-width="2.5" marker-end="url(#compArrow)"/>
            <text x="307" y="98" fill="#a5b4fc" font-size="11" font-weight="700" text-anchor="middle">T₂ (M₂)</text>
            <!-- Stage 3 Box -->
            <rect x="335" y="70" width="100" height="80" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
            <text x="385" y="100" fill="#10b981" font-size="13" font-weight="800" text-anchor="middle">Bayangan Akhir</text>
            <text x="385" y="125" fill="#6ee7b7" font-size="11" font-family="JetBrains Mono" text-anchor="middle">M₂ · (M₁ · x)</text>
            <!-- Formula note below -->
            <rect x="50" y="170" width="360" height="34" rx="6" fill="#1e1b4b" stroke="#4f46e5" stroke-width="1"/>
            <text x="230" y="192" fill="#c7d2fe" font-size="12" font-weight="700" text-anchor="middle">Aturan: (T₂ ∘ T₁) mewakili perkalian matriks M = M₂ × M₁ (Kanan ke Kiri)</text>
          </svg>
        `,
        mediaCaption: 'Gambar 5. Alur komposisi T1 dilanjutkan T2 berkorespondensi dengan M2 × M1.',
        tier1: {
          key: 'A',
          options: [
            { id: 'A', text: '$\\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$' },
            { id: 'B', text: '$\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$' },
            { id: 'C', text: '$\\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$' },
            { id: 'D', text: '$\\begin{pmatrix} 0 & -1 \\\\ -1 & 0 \\end{pmatrix}$' },
            { id: 'E', text: '$\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$' }
          ]
        },
        tier2: {
          key: 'B',
          options: [
            { id: 'A', text: 'Komposisi $(T_2 \\circ T_1)$ dihitung dari kiri ke kanan dengan mengalikan matriks $M = M_1 \\times M_2 = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$.' },
            { id: 'B', text: 'Komposisi $(T_2 \\circ T_1)$ bekerja pada vektor sebagai $T_2(T_1(\\vec{x})) = M_2 \\cdot (M_1 \\cdot \\vec{x})$, sehingga matriks komposisinya dikalikan dari kanan ke kiri: $M = M_2 \\times M_1 = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} = \\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$.' },
            { id: 'C', text: 'Perkalian matriks selalu bersifat komutatif ($M_1 \\times M_2 = M_2 \\times M_1$) sehingga urutan perkalian tidak memengaruhi hasil akhir.' },
            { id: 'D', text: 'Matriks komposisi diperoleh dengan menjumlahkan elemen seletak kedua matriks: $M = M_1 + M_2$.' },
            { id: 'E', text: 'Kedua transformasi saling meniadakan karena determinan masing-masing bernilai nol.' }
          ]
        },
        misconceptionNote: 'Miskonsepsi Urutan Komposisi Operasi: Siswa terbiasa membaca dari kiri ke kanan sehingga menghitung $M_1 \\times M_2$, atau beranggapan perkalian matriks bersifat komutatif. Padahal $(T_2 \\circ T_1)$ berarti $T_1$ bekerja lebih dahulu, sehingga matriks pengalinya adalah $M_2 \\times M_1$.'
      },
      {
        id: 'q6',
        number: 6,
        concept: 'Refleksi terhadap Garis Vertikal $x = h$',
        stem: 'Titik $C(1, 4)$ dicerminkan terhadap garis vertikal $x = 3$. Berapakah koordinat bayangan titik $C\'$ yang terbentuk?',
        mediaSvg: `
          <svg viewBox="0 0 460 220" width="100%" height="190" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPatternQ6" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" stroke-width="0.7" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="460" height="220" fill="#0f172a" rx="8"/>
            <rect width="460" height="220" fill="url(#gridPatternQ6)" rx="8"/>
            <!-- Sumbu X dan Y (Origin at 90, 160) -->
            <line x1="30" y1="160" x2="430" y2="160" stroke="#94a3b8" stroke-width="1.8"/>
            <line x1="90" y1="20" x2="90" y2="200" stroke="#94a3b8" stroke-width="1.8"/>
            <text x="430" y="176" fill="#cbd5e1" font-size="12" font-family="JetBrains Mono" font-weight="700">X</text>
            <text x="76" y="24" fill="#cbd5e1" font-size="12" font-family="JetBrains Mono" font-weight="700">Y</text>
            <text x="74" y="176" fill="#64748b" font-size="11" font-family="JetBrains Mono">O(0,0)</text>
            <!-- Garis Cermin x = 3 -> pixel (90 + 3*45 = 225) -->
            <line x1="225" y1="20" x2="225" y2="200" stroke="#818cf8" stroke-width="3" stroke-dasharray="6 4"/>
            <text x="233" y="36" fill="#a5b4fc" font-size="12" font-weight="800" font-family="JetBrains Mono">Cermin x = 3</text>
            <!-- Titik C(1, 4) -> pixel (90 + 1*45 = 135, 160 - 4*25 = 60) -->
            <circle cx="135" cy="60" r="6" fill="#38bdf8"/>
            <text x="100" y="52" fill="#38bdf8" font-size="12" font-weight="700">C(1, 4)</text>
            <!-- Titik Bayangan C'(5, 4) -> pixel (90 + 5*45 = 315, 60) -->
            <circle cx="315" cy="60" r="6" fill="#10b981"/>
            <text x="325" y="52" fill="#10b981" font-size="12" font-weight="700">C\'(5, 4)</text>
            <!-- Garis horizontal jarak simetris -->
            <line x1="135" y1="60" x2="315" y2="60" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="4 3"/>
            <!-- Label jarak d=2 -->
            <text x="180" y="52" fill="#f59e0b" font-size="11" font-weight="700">d = 2</text>
            <text x="270" y="52" fill="#f59e0b" font-size="11" font-weight="700">d = 2</text>
            <text x="225" y="120" fill="#cbd5e1" font-size="11" text-anchor="middle">x\' = 2h - x = 2(3) - 1 = 5</text>
          </svg>
        `,
        mediaCaption: 'Gambar 6. Refleksi titik C(1, 4) terhadap garis vertikal x = 3 dengan jarak simetris d = 2.',
        tier1: {
          key: 'A',
          options: [
            { id: 'A', text: '$C\'(5, 4)$' },
            { id: 'B', text: '$C\'(2, 4)$' },
            { id: 'C', text: '$C\'(1, 2)$' },
            { id: 'D', text: '$C\'(5, -4)$' },
            { id: 'E', text: '$C\'(-1, 4)$' }
          ]
        },
        tier2: {
          key: 'B',
          options: [
            { id: 'A', text: 'Koordinat bayangan terhadap garis $x = h$ dihitung dengan rumus $x\' = h - x = 3 - 1 = 2$, sedangkan ordinat tetap sama sehingga menghasilkan $C\'(2, 4)$.' },
            { id: 'B', text: 'Jarak titik objek ke garis cermin harus sama dengan jarak bayangan ke cermin ($|x - h| = |x\' - h|$), sehingga koordinat bayangan adalah $x\' = 2h - x = 2(3) - 1 = 5$ dan $y\' = y = 4$, menghasilkan $C\'(5, 4)$.' },
            { id: 'C', text: 'Pencerminan terhadap garis $x = 3$ mengubah ordinat menjadi $y\' = 2h - y = 6 - 4 = 2$ sedangkan absis $x$ tetap sama.' },
            { id: 'D', text: 'Pencerminan garis vertikal hanya menegasikan nilai $x$ menjadi $-x$ tanpa terpengaruh posisi konstanta $h$.' },
            { id: 'E', text: 'Koordinat bayangan selalu bergeser sebesar $h$ satuan ke arah sumbu $Y$.' }
          ]
        },
        misconceptionNote: 'Miskonsepsi Rumus $h - x$ vs $2h - x$: Siswa sering keliru hanya menghitung selisih jarak titik ke cermin ($h - x = 3 - 1 = 2$) lalu langsung menuliskannya sebagai absis bayangan ($C\'(2, 4)$), padahal jarak tersebut harus ditambahkan dari posisi garis cermin: $x\' = h + (h - x) = 2h - x = 5$.'
      }
    ]
  },
  'MAT-XI': {
    token: 'MAT-XI',
    title: 'Asesmen Diagnostik Matematika — Kelas XI',
    subject: 'Matematika',
    grade: 'Fase F / Kelas XI',
    school: 'SMAN 7 Banjarmasin',
    developerInstitution: 'Fakultas Keguruan dan Ilmu Pendidikan, Universitas Lambung Mangkurat',
    teacher: 'Bambang Hermanto, S.Pd., M.Si.',
    durationMinutes: 30,
    instructions: 'Asesmen diagnostik matematika three-tier.',
    questions: [] // Uses default fallback
  },
  'MAT-X': {
    token: 'MAT-X',
    title: 'Asesmen Diagnostik Matematika — Kelas X',
    subject: 'Matematika',
    grade: 'Fase E / Kelas X',
    school: 'SMAN 7 Banjarmasin',
    developerInstitution: 'Fakultas Keguruan dan Ilmu Pendidikan, Universitas Lambung Mangkurat',
    teacher: 'Dewi Sartika, S.Pd.',
    durationMinutes: 40,
    instructions: 'Asesmen diagnostik matematika three-tier.',
    questions: []
  },
  'MAT-XII': {
    token: 'MAT-XII',
    title: 'Asesmen Diagnostik Matematika — Kelas XII',
    subject: 'Matematika',
    grade: 'Fase F / Kelas XII',
    school: 'SMAN 7 Banjarmasin',
    developerInstitution: 'Fakultas Keguruan dan Ilmu Pendidikan, Universitas Lambung Mangkurat',
    teacher: 'Dr. Hendra Gunawan, M.Si.',
    durationMinutes: 35,
    instructions: 'Asesmen diagnostik matematika three-tier.',
    questions: []
  }
};

// ============================================================================
// 2. STATE MANAGEMENT & AUTOSAVE
// ============================================================================
const state = {
  currentView: 'gateway', // 'gateway' | 'briefing' | 'exam' | 'results'
  assessment: ASSESSMENTS_DATABASE['DIAGNO-2026'],
  student: {
    name: '',
    class: '',
    roll: '',
    token: 'DIAGNO-2026'
  },
  currentQuestionIndex: 0,
  answers: [], // Array of { tier1: string|null, tier2: string|null, tier3: string|null, flagged: boolean, answeredAt: number }
  timerSecondsLeft: 30 * 60,
  timerInterval: null,
  proctoringViolations: 0,
  isSubmitted: false,
  isOnline: navigator.onLine,
  proctorAlertDismissedCount: 0
};

// ============================================================================
// 3. INISIALISASI SAAT HALAMAN DIMUAT
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initThemeSupport();
  initNetworkListeners();
  initProctoringAntiCheat();
  parseUrlAndSessionData();
  renderAppView();
});

/* --- Theme Support (Sinkron dengan landing page) --- */
function initThemeSupport() {
  const saved = localStorage.getItem('sidag_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.onclick = () => {
      const cur = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sidag_theme', next);
      updateThemeIcon(next);
      notify(`Mode tampilan diubah ke: ${next === 'dark' ? 'Gelap' : 'Terang'}`);
    };
  }
  updateThemeIcon(saved);
}

function updateThemeIcon(mode) {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  if (mode === 'light') {
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  } else {
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
  }
}

/* --- Online / Offline Listener --- */
function initNetworkListeners() {
  window.addEventListener('online', () => {
    state.isOnline = true;
    updateAutosavePill('online');
    notify('Koneksi internet pulih. Jawaban tersimpan otomatis.');
  });
  window.addEventListener('offline', () => {
    state.isOnline = false;
    updateAutosavePill('offline');
    notify('Koneksi internet terputus. Jawaban tetap aman di memori lokal perangkat.');
  });
}

/* --- Anti-Cheat Proctoring: Visibility Change & Window Blur --- */
function initProctoringAntiCheat() {
  // Hanya aktif jika sedang berada di layar pengerjaan (exam) dan belum submit
  document.addEventListener('visibilitychange', () => {
    if (state.currentView === 'exam' && !state.isSubmitted && document.visibilityState === 'hidden') {
      recordProctoringIncident('Pindah Tab / Keluar Halaman Asesmen');
    }
  });

  window.addEventListener('blur', () => {
    if (state.currentView === 'exam' && !state.isSubmitted) {
      recordProctoringIncident('Keluar dari Jendela Asesmen');
    }
  });

  // Cegah pintasan copy / paste saat ujian berlangsung
  document.addEventListener('copy', (e) => {
    if (state.currentView === 'exam' && !state.isSubmitted) {
      e.preventDefault();
      notify('⚠️ Fitur salin teks dinonaktifkan untuk menjaga integritas ujian.');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (state.currentView === 'exam' && !state.isSubmitted) {
      e.preventDefault();
      notify('⚠️ Klik kanan dinonaktifkan selama asesmen diagnostik.');
    }
  });
}

let lastIncidentTime = 0;
function recordProctoringIncident(reason) {
  const now = Date.now();
  if (now - lastIncidentTime < 3500) return; // Debounce duplicate triggers
  lastIncidentTime = now;

  state.proctoringViolations++;
  const incidentCount = state.proctoringViolations;
  
  // Show Proctor Alert Modal
  const modal = document.getElementById('proctorAlertModal');
  const countDisplay = document.getElementById('proctorIncidentCount');
  if (modal && countDisplay) {
    countDisplay.textContent = `Pelanggaran ke-${incidentCount} (${reason})`;
    modal.classList.add('open');
  }

  // Update proctoring badge in navbar if exists
  const proctorPill = document.getElementById('examProctorPill');
  if (proctorPill) {
    proctorPill.textContent = `Integritas: ${incidentCount} Peringatan`;
    proctorPill.classList.add('danger');
  }

  notify(`⚠️ Pelanggaran Integritas Ujian ke-${incidentCount} dicatat dalam log pengawasan guru!`);
  saveProgressToStorage();

  // Sync proctoring violation to Backend API
  if (state.student.attemptId) {
    fetch(`/api/student/exam/${encodeURIComponent(state.student.attemptId)}/proctor-event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'pindah_tab',
        violation_text: reason,
        severity: incidentCount >= 3 ? 'berat' : 'ringan'
      })
    }).catch(err => console.warn('Anti-cheat sync error:', err));
  }
}

function closeProctorModal() {
  const modal = document.getElementById('proctorAlertModal');
  if (modal) {
    modal.classList.remove('open');
  }
}

/* --- Parse URL params & Session Storage --- */
function parseUrlAndSessionData() {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenParam = urlParams.get('token');
  const nameParam = urlParams.get('name');
  const classParam = urlParams.get('class');
  const rollParam = urlParams.get('roll');
  const viewParam = urlParams.get('view'); // 'briefing', 'exam', 'results'

  // Cek sessionStorage dari landing page
  const storedSession = sessionStorage.getItem('sidag_active_session');
  let sessionObj = null;
  if (storedSession) {
    try { sessionObj = JSON.parse(storedSession); } catch (e) {}
  }

  const activeToken = tokenParam || sessionObj?.token || 'DIAGNO-2026';
  const activeName = nameParam || sessionObj?.name || '';
  const activeClass = classParam || sessionObj?.class || '';
  const activeRoll = rollParam || sessionObj?.roll || '';
  const activeAttemptId = urlParams.get('attemptId') || sessionObj?.attemptId || ('att-' + Date.now());

  state.student.token = activeToken;
  state.student.name = activeName;
  state.student.class = activeClass;
  state.student.roll = activeRoll;
  state.student.attemptId = activeAttemptId;

  // Set assessment database
  if (ASSESSMENTS_DATABASE[activeToken]) {
    state.assessment = ASSESSMENTS_DATABASE[activeToken];
    // Fallback questions if empty
    if (!state.assessment.questions || state.assessment.questions.length === 0) {
      state.assessment.questions = ASSESSMENTS_DATABASE['DIAGNO-2026'].questions;
    }
  } else {
    // Default fallback
    state.assessment = ASSESSMENTS_DATABASE['DIAGNO-2026'];
  }

  // Inisialisasi struktur jawaban bila kosong
  initAnswersArray();

  // Load jawaban yang tersimpan di localStorage bila ada
  loadSavedProgress();

  // Tentukan view awal
  if (viewParam === 'results' || state.isSubmitted) {
    state.currentView = 'results';
  } else if (viewParam === 'briefing') {
    state.currentView = 'briefing';
  } else if (activeName && activeClass) {
    // Berikan dulu petunjuk pengerjaan (briefing) sebelum mulai mengerjakan soal
    const hasProgress = state.answers && state.answers.some(a => a.tier1 || a.tier2 || a.tier3);
    if (hasProgress && viewParam === 'exam') {
      state.currentView = 'exam';
    } else {
      // Selalu tampilkan petunjuk pengerjaan ujian terlebih dahulu
      state.currentView = 'briefing';
    }
  } else {
    // Perlu verifikasi identitas / token
    state.currentView = 'gateway';
  }
}

function initAnswersArray() {
  const qCount = state.assessment.questions.length;
  state.answers = [];
  for (let i = 0; i < qCount; i++) {
    state.answers.push({
      tier1: null,
      tier2: null,
      tier3: null,
      flagged: false,
      answeredAt: null
    });
  }
}

function getStorageKey() {
  const token = state.student.token || 'DIAGNO-2026';
  const name = state.student.name || 'ANON';
  return `sidag_exam_${token}_${name.replace(/\\s+/g, '_')}`;
}

function saveProgressToStorage() {
  const key = getStorageKey();
  const payload = {
    student: state.student,
    answers: state.answers,
    currentQuestionIndex: state.currentQuestionIndex,
    timerSecondsLeft: state.timerSecondsLeft,
    proctoringViolations: state.proctoringViolations,
    isSubmitted: state.isSubmitted,
    savedAt: new Date().toLocaleTimeString('id-ID')
  };
  try {
    localStorage.setItem(key, JSON.stringify(payload));
    updateAutosavePill('saved', payload.savedAt);
  } catch (e) {
    console.error('Local storage save error:', e);
  }
}

function loadSavedProgress() {
  const key = getStorageKey();
  const raw = localStorage.getItem(key);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (data.answers && Array.isArray(data.answers)) {
      state.answers = data.answers;
    }
    if (typeof data.currentQuestionIndex === 'number') {
      state.currentQuestionIndex = data.currentQuestionIndex;
    }
    if (typeof data.timerSecondsLeft === 'number' && data.timerSecondsLeft > 0) {
      state.timerSecondsLeft = data.timerSecondsLeft;
    }
    if (typeof data.proctoringViolations === 'number') {
      state.proctoringViolations = data.proctoringViolations;
    }
    if (data.isSubmitted) {
      state.isSubmitted = true;
    }
  } catch (e) {
    console.error('Failed to load saved progress:', e);
  }
}

// ============================================================================
// 4. RENDERING TAMPILAN (VIEW ROUTING)
// ============================================================================
function renderAppView() {
  const appContainer = document.getElementById('studentAppRoot');
  if (!appContainer) return;

  // Bersihkan interval timer bila pindah dari mode ujian
  if (state.currentView !== 'exam' && state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }

  // Render View yang sesuai
  switch (state.currentView) {
    case 'gateway':
      renderGatewayView(appContainer);
      break;
    case 'briefing':
      renderBriefingView(appContainer);
      break;
    case 'exam':
      renderExamView(appContainer);
      startExamTimer();
      break;
    case 'results':
      renderResultsView(appContainer);
      break;
  }

  // KaTeX rendering formula
  renderMathFormulas();
}

/* ==========================================================================
   VIEW 1: GERBANG TOKEN & IDENTITAS SISWA
   ========================================================================== */
function renderGatewayView(container) {
  const verified = Boolean(state.student.token && ASSESSMENTS_DATABASE[state.student.token]);
  const activeTitle = verified ? ASSESSMENTS_DATABASE[state.student.token].title : '';

  container.innerHTML = `
    <header class="exam-navbar">
      <div class="container exam-nav-inner">
        <a href="index.html" class="exam-brand-group">
          <div class="exam-brand-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div class="brand-text-block">
            <span class="exam-brand-title">SiDag</span>
            <span class="exam-brand-sub">Portal Asesmen Siswa</span>
          </div>
        </a>
        <div class="nav-actions">
          <button type="button" class="theme-toggle-btn" id="themeToggleBtn" aria-label="Ganti Tema"></button>
          <a href="index.html" class="btn btn-secondary btn-sm">&larr; Beranda</a>
        </div>
      </div>
    </header>

    <main class="gateway-view-wrap">
      <div class="gateway-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
          <span class="gateway-intro-tag" style="margin-bottom:0;">Akses Pengerjaan Ujian</span>
          <span style="font-size:0.75rem; font-weight:700; color:var(--primary); background:var(--primary-subtle); padding:3px 8px; border-radius:4px;">
            SMAN 7 Banjarmasin &bull; FKIP ULM
          </span>
        </div>
        <h1 class="gateway-heading">Selamat Datang di Portal Asesmen</h1>
        <p class="gateway-subtext">Masukkan token asesmen resmi yang diberikan oleh guru Matematika Anda untuk memulai lembar soal diagnostik tiga tingkat.</p>
        <div style="font-size:0.78rem; color:var(--text-dim); margin-top:-6px; margin-bottom:14px;">
          Dikembangkan oleh <strong>Fakultas Keguruan dan Ilmu Pendidikan, Universitas Lambung Mangkurat</strong> untuk <strong>SMAN 7 Banjarmasin</strong>.
        </div>

        <div class="gateway-step-container">
          <!-- Tahap 1: Verifikasi Token -->
          <form id="studentGatewayTokenForm">
            <div class="input-group-formal">
              <label class="input-label" for="gatewayTokenInput">Token Asesmen Ujian</label>
              <div style="display:flex; gap:10px;">
                <input type="text" class="input-control" id="gatewayTokenInput" placeholder="Contoh: DIAGNO-2026" value="${state.student.token || ''}" required style="text-transform:uppercase; font-family:var(--font-mono); font-weight:700;">
                <button type="submit" class="btn btn-primary" id="btnVerifyGatewayToken">Verifikasi &rarr;</button>
              </div>
            </div>
            
            <div class="token-quick-chips">
              <span class="token-quick-label">Pilihan token aktif:</span>
              <button type="button" class="token-quick-btn" onclick="selectQuickToken('DIAGNO-2026')">DIAGNO-2026 (Matematika XI)</button>
              <button type="button" class="token-quick-btn" onclick="selectQuickToken('MAT-XI')">MAT-XI</button>
              <button type="button" class="token-quick-btn" onclick="selectQuickToken('MAT-X')">MAT-X</button>
            </div>
          </form>

          <!-- Tahap 2: Identitas Diri (Hanya jika lolos verifikasi) -->
          <div id="studentIdentityFormBox" style="${verified ? 'display:block;' : 'display:none;'}">
            <div class="token-verified-badge-row">
              <div class="token-badge-left">
                <span class="token-badge-code">&check; Token Terverifikasi: ${state.student.token}</span>
                <span class="token-badge-name" id="gatewayExamTitleDisplay">${activeTitle}</span>
              </div>
              <button type="button" class="btn-change-token-link" onclick="resetGatewayToken()">&times; Ganti</button>
            </div>

            <form id="gatewayStudentDetailForm">
              <div class="input-group-formal">
                <label class="input-label" for="gStudentName">Nama Lengkap Siswa</label>
                <input type="text" class="input-control" id="gStudentName" placeholder="Masukkan nama lengkap siswa..." value="${state.student.name || ''}" required>
              </div>

              <div class="input-grid-2" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <div class="input-group-formal">
                  <label class="input-label" for="gStudentClass">Kelas / Rombel</label>
                  <input type="text" class="input-control" id="gStudentClass" placeholder="Kelas / Rombel..." value="${state.student.class || ''}" required>
                </div>
                <div class="input-group-formal">
                  <label class="input-label" for="gStudentRoll">Nomor Absen / NISN</label>
                  <input type="text" class="input-control" id="gStudentRoll" placeholder="Nomor absen / NISN" value="${state.student.roll || ''}">
                </div>
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%; margin-top:10px; padding:12px;">
                Mulai Pengerjaan Lembar Soal &rarr;
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  `;

  initThemeSupport();

  // Handle Token Verify Form
  const tokenForm = document.getElementById('studentGatewayTokenForm');
  if (tokenForm) {
    tokenForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('gatewayTokenInput');
      const val = (input?.value || '').trim().toUpperCase();
      if (!val) {
        notify('Ketikkan token asesmen terlebih dahulu.');
        return;
      }
      verifyToken(val);
    });
  }

  // Handle Identity Form
  const detailForm = document.getElementById('gatewayStudentDetailForm');
  if (detailForm) {
    detailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('gStudentName')?.value.trim();
      const sClass = document.getElementById('gStudentClass')?.value.trim();
      const roll = document.getElementById('gStudentRoll')?.value.trim();

      if (!name || !sClass) {
        notify('Lengkapi nama dan kelas Anda.');
        return;
      }

      state.student.name = name;
      state.student.class = sClass;
      state.student.roll = roll;

      // Simpan session
      sessionStorage.setItem('sidag_active_session', JSON.stringify({
        token: state.student.token,
        name,
        class: sClass,
        roll
      }));

      notify(`Identitas terverifikasi: ${name} (${sClass}). Membuka petunjuk pengerjaan...`);
      state.currentView = 'briefing';
      renderAppView();
    });
  }
}

window.selectQuickToken = function(tokenCode) {
  const input = document.getElementById('gatewayTokenInput');
  if (input) {
    input.value = tokenCode;
    verifyToken(tokenCode);
  }
};

window.resetGatewayToken = function() {
  const box = document.getElementById('studentIdentityFormBox');
  if (box) box.style.display = 'none';
  const input = document.getElementById('gatewayTokenInput');
  if (input) {
    input.value = '';
    input.focus();
  }
  state.student.token = '';
};

function verifyToken(tokenCode) {
  if (ASSESSMENTS_DATABASE[tokenCode]) {
    state.student.token = tokenCode;
    state.assessment = ASSESSMENTS_DATABASE[tokenCode];
    if (!state.assessment.questions || state.assessment.questions.length === 0) {
      state.assessment.questions = ASSESSMENTS_DATABASE['DIAGNO-2026'].questions;
    }
    initAnswersArray();

    const box = document.getElementById('studentIdentityFormBox');
    const titleDisp = document.getElementById('gatewayExamTitleDisplay');
    if (box && titleDisp) {
      titleDisp.textContent = state.assessment.title;
      box.style.display = 'block';
      document.getElementById('gStudentName')?.focus();
    }
    notify(`Token '${tokenCode}' terverifikasi untuk mata pelajaran ${state.assessment.subject}!`);
  } else {
    notify('Token tidak valid atau belum terbit. Gunakan contoh DIAGNO-2026.');
  }
}

/* ==========================================================================
   VIEW 2: BRIEFING, PETUNJUK 3-TIER & PAKTA INTEGRITAS
   ========================================================================== */
function renderBriefingView(container) {
  const asm = state.assessment;
  const std = state.student;

  container.innerHTML = `
    <header class="exam-navbar">
      <div class="container exam-nav-inner">
        <a href="#" class="exam-brand-group">
          <div class="exam-brand-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div class="brand-text-block">
            <span class="exam-brand-title">SiDag</span>
            <span class="exam-brand-sub">Petunjuk Pengerjaan</span>
          </div>
        </a>

        <div class="exam-student-badge">
          <div class="exam-student-avatar">${(std.name || 'S').charAt(0)}</div>
          <div class="exam-student-text">
            <span class="exam-student-name">${std.name}</span>
            <span class="exam-student-class">${std.class} • No. ${std.roll || '-'}</span>
          </div>
        </div>

        <div class="nav-actions">
          <button type="button" class="theme-toggle-btn" id="themeToggleBtn" aria-label="Ganti Tema"></button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="returnToGateway()">&larr; Ganti Akun/Token</button>
        </div>
      </div>
    </header>

    <main class="briefing-view-wrap">
      <div class="briefing-container">
        <div class="briefing-card">
          <span class="briefing-header-tag">Petunjuk &amp; Konfirmasi Asesmen</span>
          <h1 class="briefing-title">${asm.title}</h1>

          <!-- Meta Grid -->
          <div class="briefing-meta-grid">
            <div class="meta-item">
              <div class="meta-item-label">Nama Siswa</div>
              <div class="meta-item-value highlight">${std.name || '-'}</div>
            </div>
            <div class="meta-item">
              <div class="meta-item-label">Kelas / Rombel</div>
              <div class="meta-item-value">${std.class || asm.grade}</div>
            </div>
            <div class="meta-item">
              <div class="meta-item-label">Nomor Absen</div>
              <div class="meta-item-value">${std.roll || '-'}</div>
            </div>
            <div class="meta-item">
              <div class="meta-item-label">Token Ujian</div>
              <div class="meta-item-value highlight" style="font-family:var(--font-mono);">${state.student.token}</div>
            </div>
            <div class="meta-item">
              <div class="meta-item-label">Mata Pelajaran</div>
              <div class="meta-item-value">${asm.subject}</div>
            </div>
            <div class="meta-item">
              <div class="meta-item-label">Sekolah Pelaksana</div>
              <div class="meta-item-value highlight" style="color:var(--status-paham);">${asm.school || 'SMAN 7 Banjarmasin'}</div>
            </div>
            <div class="meta-item">
              <div class="meta-item-label">Instansi Pengembang Web</div>
              <div class="meta-item-value">${asm.developerInstitution || 'FKIP Universitas Lambung Mangkurat'}</div>
            </div>
            <div class="meta-item">
              <div class="meta-item-label">Jumlah Butir Soal</div>
              <div class="meta-item-value">${(asm.questions && asm.questions.length) ? asm.questions.length : 4} Butir (3-Tingkat)</div>
            </div>
            <div class="meta-item">
              <div class="meta-item-label">Alokasi Waktu</div>
              <div class="meta-item-value highlight">${asm.durationMinutes} Menit</div>
            </div>
          </div>

          <!-- Petunjuk Pengerjaan 3-Tingkat -->
          <div class="guidance-box">
            <h3 class="guidance-heading">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Petunjuk Cara Menjawab Soal Tiga Tingkat (Three-Tier Diagnostic)
            </h3>
            <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom:14px; line-height:1.5;">
              Asesmen ini bertujuan mendiagnosis pemahaman konsep Anda secara akurat dan objektif. Setiap butir soal terdiri dari <strong>3 tahapan berurutan</strong>:
            </p>
            <div class="guidance-steps-row">
              <div class="guidance-step-col">
                <div class="step-num-badge">1</div>
                <div class="step-title">Tingkat 1: Pilihan Jawaban (A &ndash; E)</div>
                <div class="step-desc">Pilihlah salah satu opsi jawaban (A, B, C, D, atau E) yang Anda yakini benar atas pertanyaan konsep matematika yang disajikan.</div>
              </div>
              <div class="guidance-step-col">
                <div class="step-num-badge">2</div>
                <div class="step-title">Tingkat 2: Pilihan Alasan (A &ndash; E)</div>
                <div class="step-desc">Pilihlah salah satu argumen atau alasan ilmiah (A, B, C, D, atau E) yang menjadi dasar mengapa Anda memilih jawaban pada Tingkat 1.</div>
              </div>
              <div class="guidance-step-col">
                <div class="step-num-badge">3</div>
                <div class="step-title">Tingkat 3: Derajat Keyakinan</div>
                <div class="step-desc">Pilihlah <strong>Yakin</strong> jika Anda benar-benar pasti dengan jawaban &amp; alasan Anda, atau <strong>Tidak Yakin</strong> jika Anda masih ragu-ragu/menebak.</div>
              </div>
            </div>
          </div>

          <!-- Ketentuan & Tata Tertib Pengerjaan -->
          <div class="proctoring-notice-card">
            <div class="proctoring-notice-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Ketentuan &amp; Tata Tertib Pengerjaan Ujian
            </div>
            <ul class="proctoring-notice-list">
              <li>Kerjakan setiap butir soal secara <strong>mandiri, jujur, dan sungguh-sungguh</strong> tanpa bantuan alat hitung otomatis agar profil pemahaman konsep Anda terpetakan secara akurat.</li>
              <li>Alokasi waktu pengerjaan (<strong>${asm.durationMinutes} menit</strong>) akan mulai dihitung mundur saat Anda menekan tombol <strong>Mulai Kerjakan Soal Sekarang</strong> di bawah.</li>
              <li>Seluruh pilihan jawaban Anda akan <strong>tersimpan secara otomatis (autosave)</strong> setiap kali Anda mengklik pilihan opsi.</li>
              <li>Anda dapat berpindah antar-soal secara bebas dan menandai butir yang masih ragu-ragu melalui panel <strong>Navigasi Soal</strong> di sebelah kanan.</li>
              <li>Tetaplah berada pada halaman ujian ini dan hindari menutup peramban atau berpindah tab selama ujian berlangsung untuk menjaga integritas asesmen.</li>
            </ul>
          </div>

          <label class="honor-agreement-label">
            <input type="checkbox" id="honorCheck" required checked>
            <span>Saya telah membaca dan memahami seluruh petunjuk pengerjaan ini serta siap mengerjakan ujian secara mandiri dan jujur.</span>
          </label>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-top:20px;">
            <button type="button" class="btn btn-secondary" onclick="returnToGateway()">&larr; Kembali ke Identitas</button>
            <button type="button" class="btn btn-primary" id="btnStartActualExam" style="padding:14px 32px; font-size:1.02rem; font-weight:700;">
              Mulai Kerjakan Soal Sekarang &rarr;
            </button>
          </div>
        </div>
      </div>
    </main>
  `;

  initThemeSupport();

  const startBtn = document.getElementById('btnStartActualExam');
  const honorCheck = document.getElementById('honorCheck');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (honorCheck && !honorCheck.checked) {
        notify('Harap centang persetujuan petunjuk ujian terlebih dahulu.');
        honorCheck.focus();
        return;
      }
      notify('Memulai lembar soal... Waktu pengerjaan berjalan!');
      state.currentView = 'exam';
      renderAppView();
    });
  }
}

window.returnToGateway = function() {
  if (window.location.search) {
    window.location.href = 'index.html#token-gateway';
  } else {
    state.currentView = 'gateway';
    renderAppView();
  }
};

/* ==========================================================================
   VIEW 3: RUANG UJIAN ASESMEN 3-TINGKAT (ACTIVE EXAM WORKSPACE)
   ========================================================================== */
function renderExamView(container) {
  const asm = state.assessment || { questions: [] };
  const std = state.student || {};
  const totalQ = (asm.questions && asm.questions.length) || 0;
  const curQ = asm.questions && asm.questions[state.currentQuestionIndex];
  const curAns = state.answers[state.currentQuestionIndex] || { tier1: null, tier2: null, tier3: null, flagged: false };

  if (!curQ || totalQ === 0) {
    container.innerHTML = `
      <div id="emptyQuestionsContainer" style="max-width: 680px; margin: 80px auto; text-align: center; padding: 48px 24px; background: var(--bg-surface); border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
        <div style="font-size: 2.5rem; margin-bottom: 16px;">📚</div>
        <h2 id="emptyQuestionsTitle" style="font-size: 1.4rem; margin-bottom: 8px;">Belum Ada Butir Soal Terpasang</h2>
        <p id="emptyQuestionsDesc" style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
          Asesmen ini belum memiliki butir soal atau sedang menunggu sinkronisasi dari database. Silakan hubungi guru pengampu atau muat ulang halaman.
        </p>
        <button type="button" class="btn btn-outline" id="btnReloadEmptyExam" onclick="location.reload()">Muat Ulang Halaman</button>
      </div>
    `;
    return;
  }

  const t1Answered = Boolean(curAns.tier1);
  const t2Answered = Boolean(curAns.tier2);
  const t3Answered = Boolean(curAns.tier3);

  container.innerHTML = `
    <!-- Top Header Bar -->
    <header class="exam-navbar">
      <div class="container exam-nav-inner">
        <div class="exam-brand-group">
          <div class="exam-brand-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div class="brand-text-block">
            <span class="exam-brand-title">SiDag</span>
            <span class="exam-brand-sub">Lembar Asesmen</span>
          </div>
        </div>

        <!-- Meta Assessment -->
        <div class="exam-meta-pill">
          <span class="exam-meta-subject">${asm.subject}</span>
          <span class="exam-meta-title" title="${asm.title}">${asm.title}</span>
          <span style="font-size:0.7rem; font-weight:700; color:var(--status-paham); background:rgba(16,185,129,0.12); padding:2px 6px; border-radius:3px;">SMAN 7 Banjarmasin</span>
        </div>

        <!-- Student Badge -->
        <div class="exam-student-badge">
          <div class="exam-student-avatar">${(std.name || 'S').charAt(0)}</div>
          <div class="exam-student-text">
            <span class="exam-student-name">${std.name}</span>
            <span class="exam-student-class">${std.class}</span>
          </div>
        </div>

        <!-- Timer & Autosave -->
        <div style="display:flex; align-items:center; gap:10px;">
          <div class="autosave-pill ${state.isOnline ? '' : 'offline'}" id="examAutosavePill">
            <span class="autosave-dot"></span>
            <span id="examAutosaveText">Tersimpan otomatis</span>
          </div>

          <div class="exam-timer-pill" id="examTimerBadge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span id="examTimerDisplay">--:--</span>
          </div>

          <button type="button" class="btn btn-primary btn-sm" onclick="promptSubmitConfirmation()" style="padding:7px 14px;">
            Kumpulkan Ujian
          </button>
        </div>
      </div>
    </header>

    <!-- Proctor Alert Modal -->
    <div class="proctor-alert-modal" id="proctorAlertModal">
      <div class="proctor-alert-card">
        <div class="proctor-icon-alert">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h3 class="proctor-alert-title">Peringatan Integritas Ujian!</h3>
        <p class="proctor-alert-body">
          Sistem mendeteksi Anda meninggalkan jendela asesmen atau berpindah tab. Kejadian ini dicatat secara otomatis dalam laporan pengawasan guru (PRD F-24).
        </p>
        <div class="proctor-incident-counter" id="proctorIncidentCount">Pelanggaran ke-1</div>
        <div>
          <button type="button" class="btn btn-primary" onclick="closeProctorModal()" style="width:100%;">
            Saya Mengerti & Kembali ke Soal
          </button>
        </div>
      </div>
    </div>

    <!-- Confirm Submit Modal -->
    <div class="confirm-submit-modal" id="confirmSubmitModal">
      <div class="confirm-submit-card">
        <h3 class="confirm-submit-title">Konfirmasi Pengumpulan Jawaban</h3>
        <p class="confirm-submit-sub">Pastikan Anda telah memeriksa kembali seluruh butir sebelum mengirimkan lembar jawaban ke sistem.</p>
        
        <div class="submit-stats-box" id="submitStatsReviewBox">
          <div>
            <div class="stat-box-val" id="statCompletedCount" style="color:var(--status-paham);">0</div>
            <div class="stat-box-lbl">Lengkap</div>
          </div>
          <div>
            <div class="stat-box-val" id="statPartialCount" style="color:var(--status-miskonsepsi);">0</div>
            <div class="stat-box-lbl">Sebagian</div>
          </div>
          <div>
            <div class="stat-box-val" id="statEmptyCount" style="color:var(--text-muted);">0</div>
            <div class="stat-box-lbl">Kosong</div>
          </div>
        </div>

        <div id="incompleteWarningAlertBox" style="display:none;" class="incomplete-warning-alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span id="incompleteWarningMsg">Perhatian: Masih ada butir yang belum terisi lengkap!</span>
        </div>

        <div class="modal-actions-row">
          <button type="button" class="btn btn-secondary" onclick="closeSubmitModal()">Periksa Kembali</button>
          <button type="button" class="btn btn-primary" onclick="executeFinalSubmit()">Ya, Kumpulkan Sekarang</button>
        </div>
      </div>
    </div>

    <!-- Exam Main Workspace Layout -->
    <div class="container exam-workspace-layout">
      <!-- Left: Active Question -->
      <section class="exam-main-panel" id="examMainPanel">
        <!-- Question Bar -->
        <div class="question-header-card" id="questionHeaderCard">
          <div class="question-index-tag" id="questionIndexTag">
            <span id="questionIndexText">Butir Soal ${curQ.number} dari ${totalQ}</span>
            <span class="question-concept-tag" id="questionConceptTag">${curQ.concept}</span>
          </div>
          <button type="button" class="btn-flag-toggle ${curAns.flagged ? 'flagged' : ''}" id="btnFlagToggle" onclick="toggleQuestionFlag(${state.currentQuestionIndex})">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${curAns.flagged ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
              <line x1="4" y1="22" x2="4" y2="15"></line>
            </svg>
            <span id="flagToggleText">${curAns.flagged ? 'Ragu-ragu' : 'Tandai Ragu-ragu'}</span>
          </button>
        </div>

        <!-- Stem Card -->
        <div class="question-stem-card" id="questionStemCard">
          <div class="stem-text" id="questionStemText">${curQ.stem}</div>
          ${curQ.mediaSvg ? `
            <div class="question-media-wrap" id="questionMediaWrap">
              ${curQ.mediaSvg}
              <div class="media-caption" id="questionMediaCaption">${curQ.mediaCaption || ''}</div>
            </div>
          ` : ''}
        </div>

        <!-- TAHAP 1: JAWABAN (TIER 1) -->
        <div class="tier-section ${t1Answered ? 'completed' : 'active'}" id="tier1Section">
          <div class="tier-header-bar" id="tier1HeaderBar">
            <div class="tier-badge-title">
              <span class="tier-level-num">Tahap 1</span>
              <span class="tier-title-text">Pilihan Jawaban Konseptual</span>
            </div>
            <div class="tier-status-chip ${t1Answered ? 'done' : ''}" id="tier1StatusChip">
              ${t1Answered ? '&check; Terpilih' : 'Wajib Diisi'}
            </div>
          </div>
          <div class="options-list" id="tier1OptionsList">
            ${curQ.tier1.options.map(opt => `
              <div class="option-card ${curAns.tier1 === opt.id ? 'selected' : ''}" id="tier1Opt_${opt.id}" onclick="selectAnswerTier(1, '${opt.id}')">
                <div class="option-letter-badge">${opt.id}</div>
                <div class="option-content-text">${opt.text}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- TAHAP 2: ALASAN ILMIAH (TIER 2) -->
        <div class="tier-section ${!t1Answered ? 'locked' : (t2Answered ? 'completed' : 'active')}" id="tier2Section">
          <div class="tier-header-bar" id="tier2HeaderBar">
            <div class="tier-badge-title">
              <span class="tier-level-num">Tahap 2</span>
              <span class="tier-title-text">Pilihan Alasan / Argumen Ilmiah</span>
            </div>
            <div class="tier-status-chip ${t2Answered ? 'done' : (t1Answered ? '' : 'lock')}" id="tier2StatusChip">
              ${t2Answered ? '&check; Terpilih' : (t1Answered ? 'Wajib Diisi' : '🔒 Terkunci')}
            </div>
          </div>
          ${!t1Answered ? `
            <div class="tier-locked-message" id="tier2LockedMessage">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Pilih salah satu jawaban pada <strong>Tahap 1</strong> terlebih dahulu untuk membuka pilihan alasan ilmiah.</span>
            </div>
          ` : `
            <div class="options-list" id="tier2OptionsList">
              ${curQ.tier2.options.map(opt => `
                <div class="option-card ${curAns.tier2 === opt.id ? 'selected' : ''}" id="tier2Opt_${opt.id}" onclick="selectAnswerTier(2, '${opt.id}')">
                  <div class="option-letter-badge">${opt.id}</div>
                  <div class="option-content-text">${opt.text}</div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- TAHAP 3: TINGKAT KEYAKINAN (TIER 3) -->
        <div class="tier-section ${!t2Answered ? 'locked' : (t3Answered ? 'completed' : 'active')}" id="tier3Section">
          <div class="tier-header-bar" id="tier3HeaderBar">
            <div class="tier-badge-title">
              <span class="tier-level-num">Tahap 3</span>
              <span class="tier-title-text">Tingkat Keyakinan (Certainty)</span>
            </div>
            <div class="tier-status-chip ${t3Answered ? 'done' : (t2Answered ? '' : 'lock')}" id="tier3StatusChip">
              ${t3Answered ? '&check; Terpilih' : (t2Answered ? 'Wajib Diisi' : '🔒 Terkunci')}
            </div>
          </div>
          ${!t2Answered ? `
            <div class="tier-locked-message" id="tier3LockedMessage">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Tentukan pilihan alasan pada <strong>Tahap 2</strong> sebelum menyatakan tingkat keyakinan.</span>
            </div>
          ` : `
            <div class="confidence-cards-grid" id="tier3ConfidenceGrid">
              <div class="confidence-choice-card yakin ${curAns.tier3 === 'yakin' ? 'selected' : ''}" id="tier3ChoiceYakin" onclick="selectAnswerTier(3, 'yakin')">
                <div class="conf-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div class="conf-text-wrap">
                  <span class="conf-label">Yakin</span>
                  <span class="conf-sub">Saya sangat yakin dengan kebenaran jawaban dan alasan yang saya pilih.</span>
                </div>
              </div>

              <div class="confidence-choice-card tidak-yakin ${curAns.tier3 === 'tidak-yakin' ? 'selected' : ''}" id="tier3ChoiceTidakYakin" onclick="selectAnswerTier(3, 'tidak-yakin')">
                <div class="conf-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div class="conf-text-wrap">
                  <span class="conf-label">Tidak Yakin</span>
                  <span class="conf-sub">Saya masih ragu-ragu atau menebak jawaban pada butir ini.</span>
                </div>
              </div>
            </div>
          `}
        </div>

        <!-- Bottom Action Bar -->
        <div class="exam-actions-bar" id="examActionsBar">
          <button type="button" class="btn btn-secondary" id="btnPrevQuestion" onclick="navigateToQuestion(${state.currentQuestionIndex - 1})" ${state.currentQuestionIndex === 0 ? 'disabled style="opacity:0.4; pointer-events:none;"' : ''}>
            &larr; Butir Sebelumnya
          </button>

          <button type="button" class="btn-flag-toggle ${curAns.flagged ? 'flagged' : ''}" id="btnBottomFlagToggle" onclick="toggleQuestionFlag(${state.currentQuestionIndex})">
            <span>${curAns.flagged ? 'Hapus Tanda Ragu-ragu' : 'Tandai Ragu-ragu'}</span>
          </button>

          ${state.currentQuestionIndex === totalQ - 1 ? `
            <button type="button" class="btn btn-primary" id="btnSubmitFromBottom" onclick="promptSubmitConfirmation()">
              Selesai & Kumpulkan &rarr;
            </button>
          ` : `
            <button type="button" class="btn btn-primary" id="btnNextQuestion" onclick="navigateToQuestion(${state.currentQuestionIndex + 1})">
              Butir Selanjutnya &rarr;
            </button>
          `}
        </div>
      </section>

      <!-- Right: Navigator Sidebar -->
      <aside class="exam-sidebar-panel" id="examSidebarPanel">
        <div class="sidebar-sticky-box">
          <div class="navigator-card" id="navigatorCard">
            <div class="navigator-title-row">
              <span class="navigator-heading">Navigasi Butir Soal</span>
              <span class="navigator-stats-summary" id="navigatorStatsSummary">
                ${getAnsweredCount()} / ${totalQ} Terisi
              </span>
            </div>

            <!-- Number Grid -->
            <div class="nav-grid-buttons" id="questionNavGrid">
              ${asm.questions.map((q, idx) => {
                const ans = state.answers[idx];
                const isCurrent = idx === state.currentQuestionIndex;
                let statusClass = '';
                if (ans) {
                  if (ans.tier1 && ans.tier2 && ans.tier3) {
                    statusClass = 'complete';
                  } else if (ans.tier1 || ans.tier2 || ans.tier3) {
                    statusClass = 'partial';
                  }
                  if (ans.flagged) {
                    statusClass += ' flagged';
                  }
                }
                return `
                  <button type="button" class="nav-q-btn ${isCurrent ? 'current' : ''} ${statusClass}" id="navBtn_${idx}" onclick="navigateToQuestion(${idx})" title="Butir ${q.number}">
                    ${q.number}
                  </button>
                `;
              }).join('')}
            </div>

            <!-- Legend -->
            <div class="nav-legend-list">
              <div class="legend-item"><span class="legend-dot complete"></span><span>Lengkap (3 Tier)</span></div>
              <div class="legend-item"><span class="legend-dot partial"></span><span>Belum Lengkap</span></div>
              <div class="legend-item"><span class="legend-dot empty"></span><span>Belum Dijawab</span></div>
              <div class="legend-item"><span class="legend-dot flag"></span><span>Ragu-ragu</span></div>
            </div>
          </div>

          <!-- Quick Test Demo Helpers -->
          <div class="demo-helper-widget">
            <div class="demo-helper-title">Alat Bantu Pengujian Frontend</div>
            <div class="demo-helper-actions">
              <button type="button" class="demo-helper-btn" onclick="fillRealisticSampleAnswers()">
                ⚡ Isi Otomatis Jawaban Demo
              </button>
              <button type="button" class="demo-helper-btn" onclick="viewDirectResultsDemo()">
                📊 Lihat Hasil Langsung
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  `;

  initThemeSupport();
  updateTimerDisplay();
}

function getAnsweredCount() {
  return state.answers.filter(a => a && a.tier1 && a.tier2 && a.tier3).length;
}

window.selectAnswerTier = function(tier, value) {
  const curAns = state.answers[state.currentQuestionIndex];
  if (!curAns) return;

  if (tier === 1) {
    curAns.tier1 = value;
    // Reset tier 2 & 3 if tier 1 changes
    notify(`Tahap 1: Jawaban (${value}) tersimpan. Tahap 2 terbuka!`);
  } else if (tier === 2) {
    curAns.tier2 = value;
    notify(`Tahap 2: Alasan (${value}) tersimpan. Tahap 3 terbuka!`);
  } else if (tier === 3) {
    curAns.tier3 = value;
    notify(`Tahap 3: Keyakinan (${value === 'yakin' ? 'Yakin' : 'Tidak Yakin'}) tersimpan.`);
  }

  curAns.answeredAt = Date.now();
  saveProgressToStorage();
  renderAppView();

  // Sync autosave to backend API
  if (state.student.attemptId && state.assessment && state.assessment.questions) {
    const curQ = state.assessment.questions[state.currentQuestionIndex];
    if (curQ) {
      updateAutosavePill('saving');
      fetch(`/api/student/exam/${encodeURIComponent(state.student.attemptId)}/save-response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: curQ.id,
          tier1: curAns.tier1,
          tier2: curAns.tier2,
          tier3: curAns.tier3,
          flagged: curAns.flagged
        })
      })
      .then(res => res.json())
      .then(d => {
        if (d && d.success) {
          updateAutosavePill('saved', new Date().toLocaleTimeString('id-ID'));
        }
      })
      .catch(err => {
        console.warn('Autosave sync network warning:', err);
        updateAutosavePill('offline');
      });
    }
  }
};

window.toggleQuestionFlag = function(index) {
  const curAns = state.answers[index];
  if (curAns) {
    curAns.flagged = !curAns.flagged;
    notify(curAns.flagged ? `Butir ${index + 1} ditandai ragu-ragu.` : `Tanda ragu-ragu pada butir ${index + 1} dihapus.`);
    saveProgressToStorage();
    renderAppView();
  }
};

window.navigateToQuestion = function(index) {
  if (index >= 0 && index < state.assessment.questions.length) {
    state.currentQuestionIndex = index;
    saveProgressToStorage();
    renderAppView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

/* --- Timer Countdown Engine --- */
function startExamTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval);

  state.timerInterval = setInterval(() => {
    if (state.timerSecondsLeft > 0) {
      state.timerSecondsLeft--;
      updateTimerDisplay();
      // Autosave setiap 30 detik
      if (state.timerSecondsLeft % 30 === 0) {
        saveProgressToStorage();
      }
    } else {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
      notify('Waktu pengerjaan telah habis! Sistem mengumpulkan jawaban secara otomatis...');
      executeFinalSubmit();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const display = document.getElementById('examTimerDisplay');
  const badge = document.getElementById('examTimerBadge');
  if (!display) return;

  const mins = Math.floor(state.timerSecondsLeft / 60);
  const secs = state.timerSecondsLeft % 60;
  const str = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  display.textContent = str;

  if (badge) {
    if (state.timerSecondsLeft < 60) {
      badge.className = 'exam-timer-pill danger';
    } else if (state.timerSecondsLeft < 300) {
      badge.className = 'exam-timer-pill warning';
    } else {
      badge.className = 'exam-timer-pill';
    }
  }
}

function updateAutosavePill(status, timeStr) {
  const pill = document.getElementById('examAutosavePill');
  const txt = document.getElementById('examAutosaveText');
  if (!pill || !txt) return;

  if (status === 'offline') {
    pill.className = 'autosave-pill offline';
    txt.textContent = 'Mode Offline (Disimpan Lokal)';
  } else if (status === 'saving') {
    pill.className = 'autosave-pill saving';
    txt.textContent = 'Menyimpan jawaban...';
  } else {
    pill.className = 'autosave-pill';
    txt.textContent = timeStr ? `Tersimpan (${timeStr})` : 'Tersimpan otomatis';
  }
}

/* --- Submit Confirmation Modal Handling --- */
window.promptSubmitConfirmation = function() {
  const total = state.assessment.questions.length;
  let complete = 0;
  let partial = 0;
  let empty = 0;

  state.answers.forEach(a => {
    if (a.tier1 && a.tier2 && a.tier3) complete++;
    else if (a.tier1 || a.tier2 || a.tier3) partial++;
    else empty++;
  });

  const modal = document.getElementById('confirmSubmitModal');
  const compDisp = document.getElementById('statCompletedCount');
  const partDisp = document.getElementById('statPartialCount');
  const emptyDisp = document.getElementById('statEmptyCount');
  const warnBox = document.getElementById('incompleteWarningAlertBox');
  const warnMsg = document.getElementById('incompleteWarningMsg');

  if (compDisp) compDisp.textContent = complete;
  if (partDisp) partDisp.textContent = partial;
  if (emptyDisp) emptyDisp.textContent = empty;

  if (warnBox && warnMsg) {
    if (partial > 0 || empty > 0) {
      warnBox.style.display = 'flex';
      warnMsg.textContent = `Perhatian: Terdapat ${partial} butir belum lengkap dan ${empty} butir kosong. Yakin ingin mengumpulkan?`;
    } else {
      warnBox.style.display = 'none';
    }
  }

  if (modal) modal.classList.add('open');
};

window.closeSubmitModal = function() {
  const modal = document.getElementById('confirmSubmitModal');
  if (modal) modal.classList.remove('open');
};

window.executeFinalSubmit = async function() {
  closeSubmitModal();
  state.isSubmitted = true;
  saveProgressToStorage();
  notify('Jawaban berhasil dikumpulkan! Mesin diagnostik menganalisis profil pemahaman...');

  if (state.student.attemptId) {
    try {
      const res = await fetch(`/api/student/exam/${encodeURIComponent(state.student.attemptId)}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data && data.success) {
        state.backendEvaluation = data.data;
      }
    } catch (err) {
      console.warn('Backend evaluation network notice:', err);
    }
  }

  setTimeout(() => {
    state.currentView = 'results';
    renderAppView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 400);
};

/* --- Quick Demo Fillers for Testing --- */
window.fillRealisticSampleAnswers = function() {
  // Isi dengan profil contoh realistis:
  // Q1: Paham (T1: C benar, T2: B benar, T3: yakin)
  // Q2: Miskonsepsi (T1: B salah, T2: B salah, T3: yakin - Miskonsepsi refleksi y = -x)
  // Q3: Paham (T1: B benar, T2: B benar, T3: yakin - Rotasi +90 derajat)
  // Q4: Miskonsepsi (T1: A salah, T2: A salah, T3: yakin - Miskonsepsi luas dilatasi linier)
  // Q5: Paham (T1: A benar, T2: B benar, T3: yakin - Komposisi matriks T2 ∘ T1)
  // Q6: Tidak Paham (T1: B salah, T2: A salah, T3: tidak-yakin - Refleksi x = h ragu-ragu)
  const samples = [
    { tier1: 'C', tier2: 'B', tier3: 'yakin', flagged: false },
    { tier1: 'B', tier2: 'B', tier3: 'yakin', flagged: false },
    { tier1: 'B', tier2: 'B', tier3: 'yakin', flagged: false },
    { tier1: 'A', tier2: 'A', tier3: 'yakin', flagged: true },
    { tier1: 'A', tier2: 'B', tier3: 'yakin', flagged: false },
    { tier1: 'B', tier2: 'A', tier3: 'tidak-yakin', flagged: false }
  ];

  state.answers = samples.map((s, idx) => ({
    ...s,
    answeredAt: Date.now() - (idx * 60000)
  }));

  saveProgressToStorage();
  renderAppView();
  notify('Jawaban contoh realistis terisi! Anda dapat menavigasi atau langsung kumpulkan.');
};

window.viewDirectResultsDemo = function() {
  window.fillRealisticSampleAnswers();
  state.isSubmitted = true;
  state.currentView = 'results';
  renderAppView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ============================================================================
// 5. VIEW 4: HASIL ASESMEN & REFLEKSI PEMAHAMAN SISWA (PRD F-17 & Section 4.4)
// ============================================================================
function evaluateThreeTierDiagnostic() {
  const questions = (state.assessment && state.assessment.questions) || [];
  if (questions.length === 0) {
    return {
      itemResults: [],
      pahamCount: 0,
      miskonsepsiCount: 0,
      tidakPahamCount: 0,
      pahamPct: 0,
      miskonsepsiPct: 0,
      tidakPahamPct: 0,
      avgScore: 0,
      totalQ: 0
    };
  }
  let pahamCount = 0;
  let miskonsepsiCount = 0;
  let tidakPahamCount = 0;
  let totalScore = 0;

  const itemResults = questions.map((q, idx) => {
    const ans = state.answers[idx] || { tier1: null, tier2: null, tier3: null };
    const t1Correct = (ans.tier1 === q.tier1.key);
    const t2Correct = (ans.tier2 === q.tier2.key);
    const isConfident = (ans.tier3 === 'yakin');

    let profile = 'tidak-paham'; // default
    let score = 0;

    // Evaluasi aturan PRD 4.4
    if (t1Correct && t2Correct) {
      profile = 'paham';
      score = 100;
      pahamCount++;
    } else {
      score = (t1Correct ? 40 : 0) + (t2Correct ? 40 : 0);
      if (isConfident) {
        profile = 'miskonsepsi';
        miskonsepsiCount++;
      } else {
        profile = 'tidak-paham';
        tidakPahamCount++;
      }
    }

    totalScore += score;

    return {
      question: q,
      studentAnswer: ans,
      t1Correct,
      t2Correct,
      isConfident,
      profile,
      score
    };
  });

  const totalQ = questions.length || 1;
  const avgScore = Math.round(totalScore / totalQ);
  const pahamPct = Math.round((pahamCount / totalQ) * 100);
  const miskonsepsiPct = Math.round((miskonsepsiCount / totalQ) * 100);
  const tidakPahamPct = Math.round((tidakPahamCount / totalQ) * 100);

  return {
    itemResults,
    pahamCount,
    miskonsepsiCount,
    tidakPahamCount,
    pahamPct,
    miskonsepsiPct,
    tidakPahamPct,
    avgScore,
    totalQ
  };
}

let activeReflectionFilter = 'all';

function renderResultsView(container) {
  const asm = state.assessment;
  const std = state.student;
  const evalData = evaluateThreeTierDiagnostic();

  // Tentukan ringkasan kesimpulan diagnostik
  let diagnosticSummaryTitle = '';
  let diagnosticSummaryText = '';

  if (evalData.miskonsepsiCount > 0) {
    diagnosticSummaryTitle = `Ditemukan ${evalData.miskonsepsiCount} Butir Miskonsepsi yang Perlu Diluruskan`;
    diagnosticSummaryText = `Anda memiliki keyakinan tinggi atas beberapa konsep matematika yang secara konseptual keliru. Simak ulasan konseptual di bawah ini untuk merekonstruksi pemahaman Anda.`;
  } else if (evalData.pahamPct >= 80) {
    diagnosticSummaryTitle = 'Pemahaman Konseptual Sangat Kuat (Mastery)';
    diagnosticSummaryText = 'Selamat! Kombinasi jawaban pilihan, alasan ilmiah, dan tingkat keyakinan Anda menunjukkan penguasaan materi matematika yang matang tanpa miskonsepsi mendasar.';
  } else {
    diagnosticSummaryTitle = 'Perlu Pendalaman Konsep Dasar Terarah';
    diagnosticSummaryText = 'Sebagian konsep matematika masih dijawab dengan tingkat keyakinan rendah atau ragu-ragu. Dianjurkan melakukan diskusi terfokus bersama guru pengampu.';
  }

  container.innerHTML = `
    <!-- Results Header -->
    <header class="exam-navbar">
      <div class="container exam-nav-inner">
        <a href="index.html" class="exam-brand-group">
          <div class="exam-brand-badge" style="background:var(--status-paham);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div class="brand-text-block">
            <span class="exam-brand-title">SiDag</span>
            <span class="exam-brand-sub">Hasil & Refleksi Diagnostik</span>
          </div>
        </a>

        <div class="nav-actions">
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.print()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Cetak Refleksi
          </button>
          <button type="button" class="theme-toggle-btn" id="themeToggleBtn" aria-label="Ganti Tema"></button>
          <a href="index.html" class="btn btn-primary btn-sm">&larr; Selesai & Beranda</a>
        </div>
      </div>
    </header>

    <main class="results-view-wrap">
      <!-- Kop Resmi Laporan Diagnostik -->
      <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:16px 20px; margin-bottom:18px; text-align:center; border-top:3px solid var(--primary); box-shadow:var(--shadow-sm);">
        <div style="font-size:0.75rem; letter-spacing:0.08em; text-transform:uppercase; font-weight:700; color:var(--text-dim);">Pemerintah Provinsi Kalimantan Selatan &bull; Dinas Pendidikan dan Kebudayaan</div>
        <div style="font-size:1.15rem; font-weight:800; color:var(--text-main); margin-top:2px;">SMA NEGERI 7 BANJARMASIN</div>
        <div style="font-size:0.82rem; color:var(--primary); font-weight:600; margin-top:3px;">
          Sistem Informasi Asesmen Diagnostik Tiga Tingkat (SiDag) &bull; Kerjasama FKIP Universitas Lambung Mangkurat
        </div>
      </div>

      <!-- Banner Card -->
      <div class="results-banner-card">
        <span class="results-banner-tag">&check; Asesmen Telah Disubmit</span>
        <h1 class="results-banner-title">Laporan Profil Pemahaman Konsep Siswa</h1>
        <p class="results-banner-sub">
          Hasil evaluasi diagnostik instrumen tiga tingkat (three-tier) untuk memetakan pemahaman dan mendeteksi miskonsepsi konsep Matematika secara akurat.
        </p>

        <!-- Student & Assessment Info Strip -->
        <div class="results-info-strip" id="resultsInfoStrip">
          <div>
            <div class="meta-item-label">Nama Siswa</div>
            <div class="meta-item-value highlight" id="resultsStudentName">${std.name || 'Siswa Peserta'}</div>
          </div>
          <div>
            <div class="meta-item-label">Kelas / Rombel</div>
            <div class="meta-item-value" id="resultsStudentClass">${std.class || 'XI MIPA 2'} • No. ${std.roll || '-'}</div>
          </div>
          <div>
            <div class="meta-item-label">Sekolah</div>
            <div class="meta-item-value highlight" style="color:var(--status-paham);" id="resultsExamSchool">${asm.school || 'SMAN 7 Banjarmasin'}</div>
          </div>
          <div>
            <div class="meta-item-label">Instansi Pengembang</div>
            <div class="meta-item-value" style="font-size:0.78rem;" id="resultsExamInstitution">${asm.developerInstitution || 'FKIP ULM'}</div>
          </div>
          <div>
            <div class="meta-item-label">Tanggal Pengerjaan</div>
            <div class="meta-item-value" id="resultsExamDate">${new Date().toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' })}</div>
          </div>
        </div>

        <!-- 3 Diagnostic Metrics Grid -->
        <div class="diagnostic-metrics-grid">
          <!-- Paham -->
          <div class="diag-metric-card paham">
            <span class="metric-label">Paham Konsep</span>
            <div class="metric-big-num">
              <span>${evalData.pahamCount}</span>
              <span class="metric-sub-pct">(${evalData.pahamPct}%)</span>
            </div>
            <p class="metric-desc">Jawaban tepat, alasan ilmiah tepat, dan tingkat keyakinan sesuai kaidah.</p>
          </div>

          <!-- Miskonsepsi -->
          <div class="diag-metric-card miskonsepsi">
            <span class="metric-label">Miskonsepsi</span>
            <div class="metric-big-num">
              <span>${evalData.miskonsepsiCount}</span>
              <span class="metric-sub-pct">(${evalData.miskonsepsiPct}%)</span>
            </div>
            <p class="metric-desc">Jawaban atau alasan keliru, namun dipilih dengan tingkat keyakinan tinggi.</p>
          </div>

          <!-- Tidak Paham -->
          <div class="diag-metric-card tidak-paham">
            <span class="metric-label">Tidak Paham Konsep</span>
            <div class="metric-big-num">
              <span>${evalData.tidakPahamCount}</span>
              <span class="metric-sub-pct">(${evalData.tidakPahamPct}%)</span>
            </div>
            <p class="metric-desc">Jawaban keliru disertai ketidakyakinan (indikasi menebak atau ragu-ragu).</p>
          </div>
        </div>

        <!-- Proportional Stacked Bar -->
        <div class="proportional-bar-card">
          <div class="bar-title-row">
            <span class="bar-title">Distribusi Proporsi Profil Pemahaman</span>
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">Total: ${evalData.totalQ} Butir</span>
          </div>
          <div class="stacked-bar-container">
            <div class="bar-segment paham" style="width: ${evalData.pahamPct}%;" title="Paham: ${evalData.pahamPct}%"></div>
            <div class="bar-segment miskonsepsi" style="width: ${evalData.miskonsepsiPct}%;" title="Miskonsepsi: ${evalData.miskonsepsiPct}%"></div>
            <div class="bar-segment tidak-paham" style="width: ${evalData.tidakPahamPct}%;" title="Tidak Paham: ${evalData.tidakPahamPct}%"></div>
          </div>
          <div class="bar-legend-row">
            <span style="display:flex; align-items:center; gap:6px;">
              <span style="width:10px; height:10px; border-radius:2px; background:var(--status-paham);"></span>
              Paham (${evalData.pahamPct}%)
            </span>
            <span style="display:flex; align-items:center; gap:6px;">
              <span style="width:10px; height:10px; border-radius:2px; background:var(--status-miskonsepsi);"></span>
              Miskonsepsi (${evalData.miskonsepsiPct}%)
            </span>
            <span style="display:flex; align-items:center; gap:6px;">
              <span style="width:10px; height:10px; border-radius:2px; background:var(--status-tidak-paham);"></span>
              Tidak Paham (${evalData.tidakPahamPct}%)
            </span>
          </div>
        </div>

        <!-- Advice Card -->
        <div class="advice-card">
          <h4 class="advice-card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            ${diagnosticSummaryTitle}
          </h4>
          <p class="advice-card-text">${diagnosticSummaryText}</p>
        </div>
      </div>

      <!-- Item-by-Item Detailed Reflection Section -->
      <section class="reflection-section">
        <div class="reflection-filter-bar">
          <h2 class="reflection-heading">Lembar Refleksi Rinci per Butir Soal</h2>
          <div class="reflection-filters">
            <button type="button" class="ref-filter-btn ${activeReflectionFilter === 'all' ? 'active' : ''}" onclick="filterReflectionItems('all')">
              Semua (${evalData.totalQ})
            </button>
            <button type="button" class="ref-filter-btn ${activeReflectionFilter === 'paham' ? 'active' : ''}" onclick="filterReflectionItems('paham')">
              Paham (${evalData.pahamCount})
            </button>
            <button type="button" class="ref-filter-btn ${activeReflectionFilter === 'miskonsepsi' ? 'active' : ''}" onclick="filterReflectionItems('miskonsepsi')">
              Miskonsepsi (${evalData.miskonsepsiCount})
            </button>
            <button type="button" class="ref-filter-btn ${activeReflectionFilter === 'tidak-paham' ? 'active' : ''}" onclick="filterReflectionItems('tidak-paham')">
              Tidak Paham (${evalData.tidakPahamCount})
            </button>
          </div>
        </div>

        <!-- Filtered Items List -->
        <div class="reflection-items-list" id="reflectionItemsContainer">
          ${renderReflectionItemCards(evalData.itemResults, activeReflectionFilter)}
        </div>
      </section>

      <!-- Bottom Actions -->
      <div class="results-bottom-actions">
        <button type="button" class="btn btn-secondary" onclick="window.print()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Unduh / Cetak Lembar Refleksi (PDF)
        </button>
        <button type="button" class="btn btn-secondary" onclick="restartStudentSession()">
          Kerjakan Asesmen Lain
        </button>
        <a href="index.html" class="btn btn-primary">
          Kembali ke Beranda SiDag &rarr;
        </a>
      </div>
    </main>
  `;

  initThemeSupport();
}

function renderReflectionItemCards(itemResults, filter) {
  const filtered = itemResults.filter(item => {
    if (filter === 'all') return true;
    return item.profile === filter;
  });

  if (filtered.length === 0) {
    return `
      <div style="background:var(--bg-surface); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:32px; text-align:center; color:var(--text-muted);">
        Tidak ada butir soal dalam kategori filter ini.
      </div>
    `;
  }

  return filtered.map(item => {
    const q = item.question;
    const ans = item.studentAnswer;
    const profileLabel = item.profile === 'paham' ? 'Paham Konsep' : (item.profile === 'miskonsepsi' ? 'Miskonsepsi' : 'Tidak Paham');

    // Cari opsi teks yang dipilih siswa
    const t1Opt = q.tier1.options.find(o => o.id === ans.tier1);
    const t1KeyOpt = q.tier1.options.find(o => o.id === q.tier1.key);

    const t2Opt = q.tier2.options.find(o => o.id === ans.tier2);
    const t2KeyOpt = q.tier2.options.find(o => o.id === q.tier2.key);

    return `
      <article class="reflection-item-card ${item.profile}" id="reflectionCard_${q.id}" style="margin-bottom:20px;">
        <div class="ref-item-header">
          <div class="ref-item-title-group">
            <span class="ref-q-badge" id="refBadge_${q.id}">Butir Soal #${q.number}</span>
            <span class="question-concept-tag" id="refConcept_${q.id}">${q.concept}</span>
            <span class="ref-profile-badge ${item.profile}" id="refProfileBadge_${q.id}">${profileLabel}</span>
          </div>
          <span style="font-size:0.8rem; font-weight:700; color:var(--text-dim);" id="refScore_${q.id}">Skor: ${item.score}/100</span>
        </div>

        <div class="ref-stem-box" id="refStem_${q.id}">
          <strong>Pertanyaan:</strong> ${q.stem}
        </div>

        <!-- 3 Tier Breakdown -->
        <div class="ref-tier-grid" id="refTierGrid_${q.id}">
          <!-- Tier 1 -->
          <div class="ref-tier-col">
            <span class="ref-tier-label">Tingkat 1: Pilihan Jawaban</span>
            <div class="ref-tier-choice">
              Pilihan Anda: <strong>${ans.tier1 || '-'}</strong> ${t1Opt ? `— ${t1Opt.text}` : ''}
            </div>
            <div class="ref-tier-status ${item.t1Correct ? 'correct' : 'wrong'}">
              ${item.t1Correct ? '&check; Jawaban Benar' : `&cross; Jawaban Keliru (Kunci: ${q.tier1.key})`}
            </div>
          </div>

          <!-- Tier 2 -->
          <div class="ref-tier-col">
            <span class="ref-tier-label">Tingkat 2: Alasan Ilmiah</span>
            <div class="ref-tier-choice">
              Alasan Anda: <strong>${ans.tier2 || '-'}</strong> ${t2Opt ? `— ${t2Opt.text}` : ''}
            </div>
            <div class="ref-tier-status ${item.t2Correct ? 'correct' : 'wrong'}">
              ${item.t2Correct ? '&check; Alasan Benar' : `&cross; Alasan Keliru (Kunci: ${q.tier2.key})`}
            </div>
          </div>

          <!-- Tier 3 -->
          <div class="ref-tier-col">
            <span class="ref-tier-label">Tingkat 3: Keyakinan</span>
            <div class="ref-tier-choice" style="text-transform:capitalize;">
              Tingkat Keyakinan: <strong>${ans.tier3 ? (ans.tier3 === 'yakin' ? 'Yakin' : 'Tidak Yakin') : '-'}</strong>
            </div>
            <div class="ref-tier-status ${item.isConfident ? 'correct' : 'wrong'}">
              ${item.isConfident ? 'Tingkat Keyakinan Tinggi' : 'Ragu-ragu / Kurang Percaya Diri'}
            </div>
          </div>
        </div>

        <!-- Misconception Reflection Box (Jika salah / miskonsepsi) -->
        ${q.misconceptionNote ? `
          <div class="misconception-insight-box">
            <div class="insight-heading">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Penjelasan Diagnostik & Rekonstruksi Konsep
            </div>
            <p class="insight-text">${q.misconceptionNote}</p>
          </div>
        ` : ''}
      </article>
    `;
  }).join('');
}

window.filterReflectionItems = function(filter) {
  activeReflectionFilter = filter;
  const evalData = evaluateThreeTierDiagnostic();
  const container = document.getElementById('reflectionItemsContainer');
  const buttons = document.querySelectorAll('.ref-filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (container) {
    container.innerHTML = renderReflectionItemCards(evalData.itemResults, filter);
    renderMathFormulas();
  }
};

window.restartStudentSession = function() {
  if (confirm('Apakah Anda ingin mereset sesi dan kembali ke halaman token siswa?')) {
    const key = getStorageKey();
    localStorage.removeItem(key);
    sessionStorage.removeItem('sidag_active_session');
    state.isSubmitted = false;
    state.currentView = 'gateway';
    renderAppView();
  }
};

// ============================================================================
// 6. HELPER: RENDERING FORMULA MATEMATIKA (KATEX)
// ============================================================================
function renderMathFormulas(targetEl) {
  const container = targetEl || document.body;
  if (typeof renderMathInElement === 'function') {
    try {
      renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX render error on student exam:', e);
    }
  } else {
    // Retry polling if KaTeX CDN script is still downloading
    if (!window._studentKatexRetry) window._studentKatexRetry = 0;
    if (window._studentKatexRetry < 30) {
      window._studentKatexRetry++;
      setTimeout(() => renderMathFormulas(container), 120);
    } else {
      // Fallback unicode formatter for offline environments
      fallbackStudentRenderMath(container);
    }
  }
}

// Re-render when window load event fires
window.addEventListener('load', () => {
  renderMathFormulas();
});

// Fallback Math Formatter if KaTeX CDN is blocked or offline
function fallbackStudentRenderMath(rootEl) {
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
        .replace(/\\vec\{([^}]+)\}/g, '$1⃗')
        .replace(/\\begin\{pmatrix\}([\s\S]*?)\\end\{pmatrix\}/g, (m, inner) => {
          const rows = inner.trim().split(/\\\\/).map(r => r.trim().split('&').map(cell => cell.trim()));
          return `[${rows.map(r => r.join(' ')).join('; ')}]`;
        })
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

// ============================================================================
// 7. TOAST NOTIFICATION UTILITY
// ============================================================================
let toastTimeout;
function notify(msg) {
  let toast = document.getElementById('sidagStudentToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sidagStudentToast';
    toast.className = 'toast-bar';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 3200);
}
