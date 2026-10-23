/**
 * SiDag - Teacher Dashboard Controller
 * Handles Three-Tier Assessments, Diagnostic Profiles,
 * Psychometric Item Analysis, Student Progression, Proctoring, and Email Recap.
 */

// Global Mock State
const TEACHER_STATE = {
  currentAssessment: 'diagno-2026',
  students: [
    { id: 'S01', name: 'Aditya Pratama', class: 'XI IPA 2', score: 88, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S02', name: 'Ahmad Dahlan', class: 'XI IPA 2', score: 62, profile: 'miskonsepsi', pCount: 5, mCount: 4, tCount: 1, cheatCount: 1, status: '1x Pindah Tab (Ringan)' },
    { id: 'S03', name: 'Aisyah Putri Rahayu', class: 'XI IPA 2', score: 92, profile: 'paham', pCount: 9, mCount: 1, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S04', name: 'Bagas Firmansyah', class: 'XI IPA 2', score: 55, profile: 'miskonsepsi', pCount: 4, mCount: 4, tCount: 2, cheatCount: 0, status: 'Jujur' },
    { id: 'S05', name: 'Budi Pratama', class: 'XI IPA 2', score: 48, profile: 'miskonsepsi', pCount: 3, mCount: 5, tCount: 2, cheatCount: 3, status: '3x Pindah Tab (Berat)' },
    { id: 'S06', name: 'Citra Lestari', class: 'XI IPA 2', score: 38, profile: 'tidak-paham', pCount: 2, mCount: 2, tCount: 6, cheatCount: 0, status: 'Jujur' },
    { id: 'S07', name: 'Dian Anggraini', class: 'XI IPA 2', score: 58, profile: 'miskonsepsi', pCount: 4, mCount: 4, tCount: 2, cheatCount: 0, status: 'Jujur' },
    { id: 'S08', name: 'Dimas Setiawan', class: 'XI IPA 2', score: 85, profile: 'paham', pCount: 8, mCount: 2, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S09', name: 'Eko Prasetyo', class: 'XI IPA 2', score: 35, profile: 'tidak-paham', pCount: 2, mCount: 1, tCount: 7, cheatCount: 1, status: '1x Keluar Fullscreen' },
    { id: 'S10', name: 'Fadhil Muhammad', class: 'XI IPA 2', score: 90, profile: 'paham', pCount: 9, mCount: 0, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S11', name: 'Farah Nabila', class: 'XI IPA 2', score: 82, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S12', name: 'Gilang Ramadhan', class: 'XI IPA 2', score: 65, profile: 'miskonsepsi', pCount: 5, mCount: 3, tCount: 2, cheatCount: 0, status: 'Jujur' },
    { id: 'S13', name: 'Hafiz Surya', class: 'XI IPA 2', score: 78, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S14', name: 'Indah Permata', class: 'XI IPA 2', score: 86, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S15', name: 'Kurnia Sandy', class: 'XI IPA 2', score: 42, profile: 'tidak-paham', pCount: 2, mCount: 3, tCount: 5, cheatCount: 0, status: 'Jujur' },
    { id: 'S16', name: 'Laila Zahra', class: 'XI IPA 2', score: 88, profile: 'paham', pCount: 8, mCount: 2, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S17', name: 'M. Rizky Ramadhan', class: 'XI IPA 2', score: 75, profile: 'paham', pCount: 6, mCount: 3, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S18', name: 'Nadya Safitri', class: 'XI IPA 2', score: 60, profile: 'miskonsepsi', pCount: 4, mCount: 4, tCount: 2, cheatCount: 0, status: 'Jujur' },
    { id: 'S19', name: 'Putri Handayani', class: 'XI IPA 2', score: 84, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S20', name: 'Rahmat Hidayat', class: 'XI IPA 2', score: 58, profile: 'miskonsepsi', pCount: 4, mCount: 4, tCount: 2, cheatCount: 1, status: '1x Pindah Tab (Ringan)' },
    { id: 'S21', name: 'Rian Maulana', class: 'XI IPA 2', score: 90, profile: 'paham', pCount: 9, mCount: 1, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S22', name: 'Rina Kusuma', class: 'XI IPA 2', score: 88, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S23', name: 'Salsabila Putri', class: 'XI IPA 2', score: 74, profile: 'paham', pCount: 6, mCount: 3, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S24', name: 'Taufik Ismail', class: 'XI IPA 2', score: 40, profile: 'tidak-paham', pCount: 2, mCount: 2, tCount: 6, cheatCount: 0, status: 'Jujur' },
    { id: 'S25', name: 'Tiara Anggraini', class: 'XI IPA 2', score: 80, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S26', name: 'Umar Wirahadi', class: 'XI IPA 2', score: 64, profile: 'miskonsepsi', pCount: 5, mCount: 4, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S27', name: 'Vina Panduwinata', class: 'XI IPA 2', score: 86, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S28', name: 'Wahyu Nugroho', class: 'XI IPA 2', score: 59, profile: 'miskonsepsi', pCount: 4, mCount: 4, tCount: 2, cheatCount: 0, status: 'Jujur' },
    { id: 'S29', name: 'Widya Astuti', class: 'XI IPA 2', score: 82, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S30', name: 'Yoga Pratama', class: 'XI IPA 2', score: 76, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S31', name: 'Zahra Amelia', class: 'XI IPA 2', score: 94, profile: 'paham', pCount: 9, mCount: 1, tCount: 0, cheatCount: 0, status: 'Jujur' },
    { id: 'S32', name: 'Zaki Mubarak', class: 'XI IPA 2', score: 85, profile: 'paham', pCount: 8, mCount: 1, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S33', name: 'Alifia Zahran', class: 'XI IPA 2', score: 72, profile: 'paham', pCount: 6, mCount: 3, tCount: 1, cheatCount: 0, status: 'Jujur' },
    { id: 'S34', name: 'Bayu Wicaksono', class: 'XI IPA 2', score: 77, profile: 'paham', pCount: 7, mCount: 2, tCount: 1, cheatCount: 0, status: 'Jujur' }
  ],
  misconceptions: [
    {
      id: 'M01',
      title: 'Percepatan di Titik Puncak Gerak Vertikal',
      percentage: '32.4%',
      count: 11,
      severity: 'high',
      desc: 'Siswa meyakini bahwa saat kecepatan benda mencapai $v = 0$ di titik puncak, percepatan gravitasi ($g$) juga otomatis menjadi nol.',
      questionRef: 'Butir Soal No. 1 & 4'
    },
    {
      id: 'M02',
      title: 'Gaya Gesek Selalu Menghambat Gerak',
      percentage: '23.5%',
      count: 8,
      severity: 'medium',
      desc: 'Siswa tidak membedakan fungsi gaya gesek statis pada benda yang menggelinding atau saat manusia melangkah ke depan.',
      questionRef: 'Butir Soal No. 2'
    },
    {
      id: 'M03',
      title: 'Massa Berubah Seiring Ketinggian / Gravitasi',
      percentage: '17.6%',
      count: 6,
      severity: 'medium',
      desc: 'Mengacaukan konsep massa inersia materi ($m$) dengan gaya berat ($W = mg$) yang dipengaruhi kuat medan gravitasi.',
      questionRef: 'Butir Soal No. 5 & 8'
    }
  ],
  itemsAnalysis: [
    { no: 1, concept: 'Kecepatan & Percepatan Titik Tertinggi', difficulty: 0.52, diffCat: 'Sedang', discrimination: 0.48, discCat: 'Sangat Baik', validity: 0.65, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 2, concept: 'Hukum I & II Newton Kecepatan Konstan', difficulty: 0.64, diffCat: 'Sedang', discrimination: 0.42, discCat: 'Baik', validity: 0.59, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 3, concept: 'Gaya Gesek Statis vs Kinetis Lintasan Miring', difficulty: 0.38, diffCat: 'Sukar', discrimination: 0.35, discCat: 'Baik', validity: 0.52, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 4, concept: 'Vektor Posisi dan Perpindahan Gerak Melingkar', difficulty: 0.78, diffCat: 'Mudah', discrimination: 0.22, discCat: 'Cukup', validity: 0.45, valCat: 'Valid', quality: 'Perlu Revisi', recommendation: 'Revisi Distraktor Tier 2' },
    { no: 5, concept: 'Gaya Gravitasi Newton Antara Dua Massa', difficulty: 0.55, diffCat: 'Sedang', discrimination: 0.51, discCat: 'Sangat Baik', validity: 0.68, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 6, concept: 'Grafik Hubungan $v-t$ GLBB Diperlambat', difficulty: 0.61, diffCat: 'Sedang', discrimination: 0.44, discCat: 'Baik', validity: 0.60, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 7, concept: 'Gaya Normal pada Lift Bergerak Vertikal', difficulty: 0.45, diffCat: 'Sedang', discrimination: 0.49, discCat: 'Sangat Baik', validity: 0.62, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 8, concept: 'Perbedaan Besaran Skalar dan Vektor Fisika', difficulty: 0.88, diffCat: 'Terlalu Mudah', discrimination: 0.16, discCat: 'Jelek', validity: 0.31, valCat: 'Tidak Valid', quality: 'Diganti', recommendation: 'Ganti dengan Konsep Lebih Menantang' },
    { no: 9, concept: 'Impuls dan Teorema Perubahan Momentum', difficulty: 0.50, diffCat: 'Sedang', discrimination: 0.46, discCat: 'Sangat Baik', validity: 0.64, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' },
    { no: 10, concept: 'Hukum Kekekalan Energi Mekanik Gravitasi', difficulty: 0.56, diffCat: 'Sedang', discrimination: 0.47, discCat: 'Sangat Baik', validity: 0.66, valCat: 'Valid', quality: 'Baik', recommendation: 'Pertahankan Butir' }
  ],
  remedialNotes: [
    {
      id: 1,
      studentName: 'Budi Pratama (XI IPA 2)',
      concept: 'Percepatan di Titik Puncak Gerak Vertikal',
      date: '23 Okt 2026, 15:40',
      note: 'Diberikan lembar kerja mandiri interaktif menggunakan simulasi PhET projectile motion. Ditekankan bahwa percepatan gravitasi tidak pernah bernilai nol selama masih di medan gravitasi bumi.',
      teacher: 'Dra. Siti Rahmawati, M.Pd.'
    },
    {
      id: 2,
      studentName: 'Citra Lestari (XI IPA 2)',
      concept: 'Pemahaman Dasar Vektor Perpindahan & Gaya',
      date: '22 Okt 2026, 11:20',
      note: 'Siswa belum menguasai konsep proyeksi vektor trigonometri dasar ($F_x = F \\cos \\theta$). Direkomendasikan bimbingan sebaya bersama Aditya Pratama.',
      teacher: 'Dra. Siti Rahmawati, M.Pd.'
    },
    {
      id: 3,
      studentName: 'Eko Prasetyo (XI IPA 2)',
      concept: 'Dinamika Gaya Gesek Statis dan Kinetis',
      date: '21 Okt 2026, 09:15',
      note: 'Perlu pengulangan demonstrasi balok kayu pada bidang miring. Perjelas perbedaan koefisien $\\mu_s$ dan $\\mu_k$.',
      teacher: 'Dra. Siti Rahmawati, M.Pd.'
    }
  ],
  proctoringLogs: [
    { time: '23 Okt 2026, 10:42', name: 'Budi Pratama', class: 'XI IPA 2', event: 'Pindah Tab Browser (Keluar jendela)', severity: 'berat', warn: 'Peringatan ke-3 Ditampilkan', action: 'Beri Peringatan Lisan' },
    { time: '23 Okt 2026, 10:38', name: 'Budi Pratama', class: 'XI IPA 2', event: 'Pindah Tab Browser', severity: 'sedang', warn: 'Peringatan ke-2 Ditampilkan', action: 'Pantau Layar' },
    { time: '23 Okt 2026, 10:25', name: 'Eko Prasetyo', class: 'XI IPA 2', event: 'Keluar dari Mode Fullscreen', severity: 'ringan', warn: 'Peringatan Otomatis Dikirim', action: 'Kunci Ulang Layar' },
    { time: '23 Okt 2026, 10:19', name: 'Ahmad Dahlan', class: 'XI IPA 2', event: 'Upaya Copy Teks Soal', severity: 'ringan', warn: 'Aksi Dicegah Sistem', action: 'Aman' },
    { time: '23 Okt 2026, 10:14', name: 'Rahmat Hidayat', class: 'XI IPA 2', event: 'Pindah Tab Browser (< 3 detik)', severity: 'ringan', warn: 'Peringatan Otomatis Dikirim', action: 'Aman' }
  ]
};

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initDashboardTheme();
  initSidebarNavigation();
  initAssessmentSelector();
  initStudentProfilesTable();
  initMisconceptionsMap();
  initItemAnalysisTable();
  initAttentionStudents();
  initRemedialNotesTimeline();
  initProctoringLogs();
  initModalsAndActions();
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
    'view-overview': 'Ikhtisar Dasbor Guru',
    'view-assessments': 'Kelola & Susun Asesmen Tiga Tingkat',
    'view-profiles': 'Profil Pemahaman & Peta Miskonsepsi',
    'view-item-analysis': 'Analisis Psikometrik Butir Soal',
    'view-progress': 'Perkembangan Siswa & Remedial',
    'view-proctoring': 'Pengawasan Ujian & Integritas (Anti-Cheat)',
    'view-recap': 'Rekap Hasil & Distribusi Email'
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
      } else if (val === 'fisika-xi') {
        tokenDisplay.textContent = 'FISIKA-XI';
      } else {
        tokenDisplay.textContent = 'DRAFT-TERMO';
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
  const countText = document.getElementById('filteredCountText');

  renderTable();

  if (searchInput) {
    searchInput.addEventListener('input', renderTable);
  }
  if (filterSelect) {
    filterSelect.addEventListener('change', renderTable);
  }

  function renderTable() {
    if (!tbody) return;
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const filter = filterSelect ? filterSelect.value : 'all';

    const filtered = TEACHER_STATE.students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query);
      const matchFilter = filter === 'all' || s.profile === filter;
      return matchSearch && matchFilter;
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
            <button type="button" class="btn btn-outline btn-sm" onclick="openStudentDetail('${s.id}')">
              Lihat 3-Tier
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }
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

  // Generate 4 mock items for detailed response examination
  const sampleItems = [
    {
      no: 1,
      concept: 'Kecepatan & Percepatan di Titik Puncak Gerak Vertikal',
      stem: 'Sebuah bola dilemparkan vertikal ke atas. Pada saat mencapai titik tertinggi lintasannya, percepatan bola bernilai...',
      t1: student.profile === 'paham' ? 'A. $9.8\\text{ m/s}^2$ ke bawah (Benar)' : 'B. $0\\text{ m/s}^2$ (Salah)',
      t1Correct: student.profile === 'paham',
      t2: student.profile === 'paham' ? 'A. Gaya gravitasi bumi terus bekerja (Benar)' : 'B. Karena kecepatan nol, gaya gravitasi hilang (Salah)',
      t2Correct: student.profile === 'paham',
      t3: 'Yakin',
      diagnosis: student.profile === 'paham' ? 'Paham' : 'Miskonsepsi',
      diagClass: student.profile === 'paham' ? 'paham' : 'miskonsepsi'
    },
    {
      no: 2,
      concept: 'Hukum I & II Newton Kecepatan Konstan',
      stem: 'Benda bergerak lurus pada bidang datar licin dengan kelajuan konstan. Besar resultan gaya total adalah...',
      t1: 'A. Resultan gaya $\\sum F = 0$ (Benar)',
      t1Correct: true,
      t2: student.profile === 'tidak-paham' ? 'B. Harus ada dorongan terus-menerus (Salah)' : 'A. Percepatan $a = 0$ menurut Hukum I Newton (Benar)',
      t2Correct: student.profile !== 'tidak-paham',
      t3: student.profile === 'tidak-paham' ? 'Tidak Yakin' : 'Yakin',
      diagnosis: student.profile === 'tidak-paham' ? 'Tidak Paham' : 'Paham',
      diagClass: student.profile === 'tidak-paham' ? 'tidak-paham' : 'paham'
    },
    {
      no: 3,
      concept: 'Gaya Gesek Statis & Arah Gerak',
      stem: 'Saat seseorang berjalan di atas tanah, arah gaya gesek yang diberikan tanah pada sol sepatu orang tersebut adalah...',
      t1: student.score > 70 ? 'A. Searah dengan arah berjalan orang (Benar)' : 'B. Berlawanan dengan arah berjalan orang (Salah)',
      t1Correct: student.score > 70,
      t2: student.score > 70 ? 'A. Sol sepatu mendorong tanah ke belakang, reaksi tanah mendorong ke depan (Benar)' : 'B. Semua gaya gesek selalu menghambat gerak (Salah)',
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

  window.deleteRemedialNote = function(id) {
    TEACHER_STATE.remedialNotes = TEACHER_STATE.remedialNotes.filter(n => n.id !== id);
    renderNotes();
    notify('Catatan remedial telah dihapus.');
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

  document.getElementById('remedialNoteForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const student = document.getElementById('remedialStudentSelect')?.value;
    const concept = document.getElementById('remedialFocusConcept')?.value;
    const content = document.getElementById('remedialNoteContent')?.value;

    const newNote = {
      id: Date.now(),
      studentName: student,
      concept: concept,
      date: 'Baru saja',
      note: content,
      teacher: 'Dra. Siti Rahmawati, M.Pd.'
    };

    TEACHER_STATE.remedialNotes.unshift(newNote);
    initRemedialNotesTimeline();
    rModal?.classList.remove('open');
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
  document.getElementById('btnSaveDraft')?.addEventListener('click', () => {
    notify('Draf asesmen berhasil disimpan ke penyimpanan lokal.');
  });

  document.getElementById('btnPublishAssessment')?.addEventListener('click', () => {
    notify('Asesmen berhasil diterbitkan! Token DIAGNO-2026 kini dapat digunakan siswa.');
  });

  document.getElementById('btnAddNewQuestion')?.addEventListener('click', () => {
    notify('Formulir butir soal baru (Tier 1, Tier 2, Tier 3) ditambahkan ke antrian editor.');
  });

  // Send Email Recap
  document.getElementById('sendEmailForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('teacherRecapEmail')?.value;
    notify(`Sedang memproses rangkuman dan mengirim berkas rekap ke: ${email}...`);
    setTimeout(() => {
      notify(`Email rekap berhasil dikirim ke ${email}! Berkas lampiran: rekap_diagnostik_XI_IPA_2.pdf`);
    }, 1200);
  });

  // Outside click close modals
  window.addEventListener('click', (e) => {
    if (e.target === sModal) sModal.classList.remove('open');
    if (e.target === rModal) rModal.classList.remove('open');
    if (e.target === pModal) pModal.classList.remove('open');
  });
}

/* --- Export Recap CSV Simulation --- */
window.downloadRecapFile = function() {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "No,Nama,Kelas,Skor,Profil,Paham,Miskonsepsi,Tidak Paham,Integritas\n"
    + TEACHER_STATE.students.map((s, idx) => `${idx + 1},"${s.name}","${s.class}",${s.score},${s.profile},${s.pCount},${s.mCount},${s.tCount},"${s.status}"`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Rekap_Diagnostik_XI_IPA_2_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  notify('Berkas CSV rekapitulasi kelas berhasil diunduh!');
};

window.exportStudentProfiles = function() {
  downloadRecapFile();
};

/* --- KaTeX Auto-Renderer Helper --- */
function renderKaTeXFormulas() {
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
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
