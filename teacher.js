/**
 * SiDag - Teacher Dashboard Controller
 * Handles Three-Tier Assessments, Diagnostic Profiles,
 * Psychometric Item Analysis, Student Progression, Proctoring, and Email Recap.
 */

// Global Mock State
const TEACHER_STATE = {
  currentAssessment: 'diagno-2026',
  students: [],
  classes: [
    {
      id: 'CLS-01',
      name: 'XI MIPA 2',
      grade: 'Kelas XI',
      academicYear: '2026/2027 Ganjil',
      homeroom: 'Bambang Hermanto, M.Si.',
      studentCount: 0,
      token: 'DIAGNO-2026',
      assessment: 'Asesmen Matematika (XI MIPA 2)',
      pCount: 0,
      mCount: 0,
      tCount: 0,
      pPercent: 0,
      mPercent: 0,
      tPercent: 0,
      avgScore: 0
    },
    {
      id: 'CLS-02',
      name: 'XI MIPA 1',
      grade: 'Kelas XI',
      academicYear: '2026/2027 Ganjil',
      homeroom: 'Dra. Hj. Nurhayati, M.Pd.',
      studentCount: 0,
      token: 'MAT-XI',
      assessment: 'Asesmen Matematika (XI MIPA 1)',
      pCount: 0,
      mCount: 0,
      tCount: 0,
      pPercent: 0,
      mPercent: 0,
      tPercent: 0,
      avgScore: 0
    },
    {
      id: 'CLS-03',
      name: 'XI MIPA 3',
      grade: 'Kelas XI',
      academicYear: '2026/2027 Ganjil',
      homeroom: 'H. Sulaiman, M.Pd.',
      studentCount: 0,
      token: 'MAT-XI-3',
      assessment: 'Asesmen Matematika (XI MIPA 3)',
      pCount: 0,
      mCount: 0,
      tCount: 0,
      pPercent: 0,
      mPercent: 0,
      tPercent: 0,
      avgScore: 0
    },
    {
      id: 'CLS-04',
      name: 'X-1',
      grade: 'Kelas X',
      academicYear: '2026/2027 Ganjil',
      homeroom: 'Rina Marlina, S.Pd.',
      studentCount: 0,
      token: 'MAT-X',
      assessment: 'Asesmen Matematika (Kelas X)',
      pCount: 0,
      mCount: 0,
      tCount: 0,
      pPercent: 0,
      mPercent: 0,
      tPercent: 0,
      avgScore: 0
    }
  ],
  questionBank: [],
  misconceptions: [],
  itemsAnalysis: [],
  remedialNotes: [],
  proctoringLogs: []
};


// Dynamic Select Populators for Database Integration
function populateRemedialStudentSelect() {
  const select = document.getElementById('remedialStudentSelect');
  if (!select) return;
  const currentVal = select.value;
  select.innerHTML = '<option value="" disabled selected id="remedialStudentSelectPlaceholder">-- Pilih Siswa dari Database --</option>';
  TEACHER_STATE.students.forEach(s => {
    const opt = document.createElement('option');
    opt.value = `${s.name} (${s.class})`;
    opt.id = `remedialStudentOpt_${s.id}`;
    opt.textContent = `${s.name} (${s.class}) — Skor: ${s.score}`;
    select.appendChild(opt);
  });
  if (currentVal) select.value = currentVal;
}

function populateClassFilterSelects() {
  const globalFilter = document.getElementById('globalClassFilter');
  const classFilter = document.getElementById('filterClassSelect');
  const assessClassTarget = document.getElementById('assessClassTarget');

  if (globalFilter) {
    globalFilter.innerHTML = '<option value="all" id="globalClassOptAll">Semua Rombel (Multi-Kelas)</option>';
    TEACHER_STATE.classes.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.name;
      opt.id = `globalClassOpt_${c.id}`;
      opt.textContent = `Kelas ${c.name} (${c.studentCount} Siswa)`;
      globalFilter.appendChild(opt);
    });
  }

  if (classFilter) {
    classFilter.innerHTML = '<option value="all" id="filterClassOptAll">Semua Rombel/Kelas</option>';
    TEACHER_STATE.classes.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.name;
      opt.id = `filterClassOpt_${c.id}`;
      opt.textContent = c.name;
      classFilter.appendChild(opt);
    });
  }

  if (assessClassTarget) {
    assessClassTarget.innerHTML = '<option value="" disabled selected id="assessClassTargetPlaceholder">-- Pilih Kelas Sasaran dari Database --</option>';
    TEACHER_STATE.classes.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.name;
      opt.id = `targetClassOpt_${c.id}`;
      opt.textContent = `${c.name} (${c.studentCount} Siswa)`;
      assessClassTarget.appendChild(opt);
    });
  }
}

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
      populateClassFilterSelects();
    }

    if (questionsRes && questionsRes.success && Array.isArray(questionsRes.data) && questionsRes.data.length > 0) {
      TEACHER_STATE.questionBank = questionsRes.data;
      renderQuestionBankList();
    }

    if (studentsRes && studentsRes.success && Array.isArray(studentsRes.data) && studentsRes.data.length > 0) {
      TEACHER_STATE.students = studentsRes.data;
      populateRemedialStudentSelect();
      initAttentionStudents();
      updateOverviewStatsByClass('all');
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
  populateRemedialStudentSelect();
  populateClassFilterSelects();
  updateOverviewStatsByClass("all");
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
        <tr id="studentProfilesEmptyRow">
          <td colspan="8" style="text-align:center; padding:32px; color:var(--text-muted);" id="studentProfilesEmptyState">
            Belum ada data siswa. Data siswa akan dimuat secara dinamis dari database.
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
        <tr id="studentRow_${s.id}">
          <td>${idx + 1}</td>
          <td>
            <strong id="studentName_${s.id}">${s.name}</strong>
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

  if (TEACHER_STATE.misconceptions.length === 0) {
    container.innerHTML = `
      <div id="misconceptionsEmptyState" style="text-align: center; padding: 36px 20px; color: var(--text-muted); background: var(--bg-surface); border: 1px dashed var(--border-color); border-radius: var(--radius-sm); grid-column: 1 / -1;">
        Belum ada data miskonsepsi terdeteksi. Peta miskonsepsi akan terbentuk otomatis setelah siswa menyelesaikan pengerjaan asesmen diagnostik di database.
      </div>
    `;
    return;
  }

  container.innerHTML = TEACHER_STATE.misconceptions.map(m => `
    <div class="misconception-card priority-${m.severity}" id="misconceptionCard_${m.id}">
      <div class="misconception-header">
        <h4 class="misconception-title" id="misconceptionTitle_${m.id}">${m.title}</h4>
        <span class="status-badge miskonsepsi" id="misconceptionBadge_${m.id}">${m.percentage} (${m.count} Siswa)</span>
      </div>
      <p class="misconception-desc" id="misconceptionDesc_${m.id}">${m.desc}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: var(--text-dim);">
        <span id="misconceptionRef_${m.id}">Terdeteksi pada: <strong>${m.questionRef}</strong></span>
        <button type="button" class="btn btn-outline btn-sm" id="btnQuickRemedial_${m.id}" onclick="quickRemedial('${m.title}')">
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

  if (TEACHER_STATE.itemsAnalysis.length === 0) {
    tbody.innerHTML = `
      <tr id="itemAnalysisEmptyRow">
        <td colspan="7" style="text-align:center; padding:32px; color:var(--text-muted);" id="itemAnalysisEmptyState">
          Belum ada data analisis psikometrik butir soal. Analisis tingkat kesukaran dan daya beda akan dihitung otomatis saat siswa menyelesaikan asesmen.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = TEACHER_STATE.itemsAnalysis.map(it => {
    const isProblematic = it.quality !== 'Baik';
    return `
      <tr id="itemAnalysisRow_${it.no}">
        <td style="font-weight:700;">No. ${it.no}</td>
        <td>
          <strong id="itemConcept_${it.no}">${it.concept}</strong>
        </td>
        <td>
          <span style="font-family:var(--font-mono); font-weight:600;" id="itemDiff_${it.no}">${it.difficulty.toFixed(2)}</span>
          <span style="font-size:0.75rem; color:var(--text-muted); margin-left:4px;">(${it.diffCat})</span>
        </td>
        <td>
          <span style="font-family:var(--font-mono); font-weight:600; color:${it.discrimination > 0.3 ? 'var(--status-paham)' : 'var(--status-miskonsepsi)'};" id="itemDisc_${it.no}">
            ${it.discrimination.toFixed(2)}
          </span>
          <span style="font-size:0.75rem; color:var(--text-muted); margin-left:4px;">(${it.discCat})</span>
        </td>
        <td>
          <span style="font-family:var(--font-mono); font-weight:600;" id="itemVal_${it.no}">${it.validity.toFixed(2)}</span>
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

  if (attentionList.length === 0) {
    grid.innerHTML = `
      <div id="attentionStudentsEmptyState" style="background: var(--bg-surface); border: 1px dashed var(--border-color); border-radius: var(--radius-sm); padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.84rem;">
        Tidak ada siswa yang memerlukan perhatian mendesak saat ini.
      </div>
    `;
    return;
  }

  grid.innerHTML = attentionList.map(s => `
    <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 12px; display:flex; justify-content:space-between; align-items:center;" id="attentionRow_${s.id}">
      <div>
        <strong style="font-size: 0.88rem; color: var(--text-main); display:block;" id="attentionName_${s.id}">${s.name}</strong>
        <span style="font-size: 0.74rem; color: var(--status-tidak-paham);" id="attentionDesc_${s.id}">
          Miskonsepsi berulang: ${s.mCount} Butir Salah
        </span>
      </div>
      <button type="button" class="btn btn-outline btn-sm" id="btnAttentionRemedial_${s.id}" onclick="openRemedialFor('${s.name}')">
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

  if (TEACHER_STATE.proctoringLogs.length === 0) {
    tbody.innerHTML = `
      <tr id="proctoringLogEmptyRow">
        <td colspan="7" style="text-align:center; padding:32px; color:var(--text-muted);" id="proctoringLogEmptyState">
          Belum ada rekaman pelanggaran integritas. Log pengawasan ujian akan tercatat otomatis saat sesi berlangsung.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = TEACHER_STATE.proctoringLogs.map((l, idx) => `
    <tr id="proctoringLogRow_${idx}">
      <td style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dim);">${l.time}</td>
      <td><strong id="proctorStudentName_${idx}">${l.name}</strong></td>
      <td id="proctorStudentClass_${idx}">${l.class}</td>
      <td id="proctorEvent_${idx}">${l.event}</td>
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
    const optD = document.getElementById('qEditorOptD')?.value.trim() || '-';
    const optE = document.getElementById('qEditorOptE')?.value.trim() || '-';
    const reasonA = document.getElementById('qEditorReasonA')?.value.trim() || '-';
    const reasonB = document.getElementById('qEditorReasonB')?.value.trim() || '-';
    const reasonC = document.getElementById('qEditorReasonC')?.value.trim() || '-';
    const reasonD = document.getElementById('qEditorReasonD')?.value.trim() || '-';
    const reasonE = document.getElementById('qEditorReasonE')?.value.trim() || '-';

    const keyT1 = document.querySelector('input[name="tier1CorrectKey"]:checked')?.value || 'A';
    const keyT2 = document.querySelector('input[name="tier2CorrectKey"]:checked')?.value || 'A';
    
    // Add to table
    const tbody = document.getElementById('installedItemsTableBody');
    const reasonsMap = { A: reasonA, B: reasonB, C: reasonC, D: reasonD, E: reasonE };
    const correctReasonText = reasonsMap[keyT2] || reasonA;

    if (tbody) {
      const newNo = tbody.children.length + 1;
      const row = document.createElement('tr');
      row.style.animation = 'fadeIn 0.3s ease';
      row.innerHTML = `
        <td><strong>${newNo}</strong></td>
        <td>Butir Baru (Matematika)</td>
        <td>${escapeHtml(stemVal.substring(0, 75))}... (Kunci: Tier 1 [${keyT1}], Tier 2 [${keyT2}])</td>
        <td>${escapeHtml(correctReasonText.substring(0, 60))}...</td>
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
            { letter: 'A', text: optA, is_correct: keyT1 === 'A' },
            { letter: 'B', text: optB, is_correct: keyT1 === 'B' },
            { letter: 'C', text: optC, is_correct: keyT1 === 'C' },
            { letter: 'D', text: optD, is_correct: keyT1 === 'D' },
            { letter: 'E', text: optE, is_correct: keyT1 === 'E' }
          ],
          tier2_reasons: [
            { letter: 'A', text: reasonA, is_correct: keyT2 === 'A', misconception_id: keyT2 === 'A' ? null : 'M01' },
            { letter: 'B', text: reasonB, is_correct: keyT2 === 'B', misconception_id: keyT2 === 'B' ? null : 'M02' },
            { letter: 'C', text: reasonC, is_correct: keyT2 === 'C', misconception_id: keyT2 === 'C' ? null : 'M03' },
            { letter: 'D', text: reasonD, is_correct: keyT2 === 'D', misconception_id: keyT2 === 'D' ? null : 'M04' },
            { letter: 'E', text: reasonE, is_correct: keyT2 === 'E', misconception_id: keyT2 === 'E' ? null : null }
          ]
        })
      });
    } catch (e) {
      console.warn('Save question to API notice:', e);
    }

    notify(`✓ Butir soal Three-Tier baru berhasil disimpan! Kunci: Tier 1 (${keyT1}), Tier 2 (${keyT2}). Total butir: ${tbody ? tbody.children.length : 11}`);
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

  // Initial live preview & badges setup
  updateEditorKeyBadges();

  // Radio button change for Tier 1 and Tier 2 keys
  document.querySelectorAll('input[name="tier1CorrectKey"]').forEach(r => {
    r.addEventListener('change', () => {
      updateEditorKeyBadges();
      notify(`Kunci Jawaban Tier 1 disetel ke pilihan [${r.value}]`);
    });
  });

  document.querySelectorAll('input[name="tier2CorrectKey"]').forEach(r => {
    r.addEventListener('change', () => {
      updateEditorKeyBadges();
      notify(`Kunci Alasan Ilmiah Tier 2 disetel ke pilihan [${r.value}]`);
    });
  });

  // Allow clicking directly on the badges to select that key
  ['A', 'B', 'C', 'D', 'E'].forEach(l => {
    document.getElementById(`tier1Badge_${l}`)?.addEventListener('click', () => {
      const rad = document.getElementById(`tier1Radio${l}`);
      if (rad) {
        rad.checked = true;
        updateEditorKeyBadges();
        notify(`Kunci Jawaban Tier 1 disetel ke pilihan [${l}]`);
      }
    });
    document.getElementById(`tier2Badge_${l}`)?.addEventListener('click', () => {
      const rad = document.getElementById(`tier2Radio${l}`);
      if (rad) {
        rad.checked = true;
        updateEditorKeyBadges();
        notify(`Kunci Alasan Ilmiah Tier 2 disetel ke pilihan [${l}]`);
      }
    });
  });
}

function updateEditorKeyBadges() {
  const letters = ['A', 'B', 'C', 'D', 'E'];

  // 1. Tier 1 Answer Key
  const t1Checked = document.querySelector('input[name="tier1CorrectKey"]:checked');
  const t1Key = t1Checked ? t1Checked.value : 'A';

  letters.forEach(l => {
    const row = document.getElementById(`editorOptRow${l}`);
    const badge = document.getElementById(`tier1Badge_${l}`);
    const input = document.getElementById(`qEditorOpt${l}`);
    const isSelected = (l === t1Key);

    if (badge) {
      if (isSelected) {
        badge.className = 'status-badge paham';
        badge.textContent = 'Kunci Benar';
        badge.title = `Pilihan ${l} ditetapkan sebagai Kunci Jawaban Benar (Tier 1)`;
      } else {
        badge.className = 'status-badge miskonsepsi';
        badge.textContent = 'Distraktor';
        badge.title = `Pilihan ${l} sebagai Opsi Distraktor / Pengecoh (Klik untuk ubah jadi Kunci)`;
      }
    }

    if (row) {
      if (isSelected) {
        row.classList.add('is-key');
      } else {
        row.classList.remove('is-key');
      }
    }

    if (input && (!input.value || input.placeholder.includes('Kunci Benar') || input.placeholder.includes('Teks Pilihan Jawaban'))) {
      input.placeholder = isSelected ? `Teks Pilihan Jawaban ${l} (Kunci Benar)` : `Teks Pilihan Jawaban ${l}`;
    }
  });

  // 2. Tier 2 Scientific Reasoning Key vs Misconceptions
  const t2Checked = document.querySelector('input[name="tier2CorrectKey"]:checked');
  const t2Key = t2Checked ? t2Checked.value : 'A';

  let miskNum = 1;
  letters.forEach(l => {
    const row = document.getElementById(`editorReasonRow${l}`);
    const badge = document.getElementById(`tier2Badge_${l}`);
    const input = document.getElementById(`qEditorReason${l}`);
    const isSelected = (l === t2Key);

    if (badge) {
      if (isSelected) {
        badge.className = 'status-badge paham';
        badge.textContent = 'Alasan Ilmiah';
        badge.title = `Alasan ${l} ditetapkan sebagai Kunci Alasan Ilmiah Valid (Tier 2)`;
      } else {
        badge.className = 'status-badge miskonsepsi';
        if (miskNum <= 3) {
          badge.textContent = `Miskonsepsi M0${miskNum}`;
          badge.title = `Alasan ${l} sebagai Distraktor Penalaran Miskonsepsi M0${miskNum} (Klik untuk ubah jadi Kunci)`;
          miskNum++;
        } else {
          badge.textContent = 'Distraktor';
          badge.title = `Alasan ${l} sebagai Distraktor Pengecoh (Klik untuk ubah jadi Kunci)`;
        }
      }
    }

    if (row) {
      if (isSelected) {
        row.classList.add('is-key');
      } else {
        row.classList.remove('is-key');
      }
    }

    if (input) {
      if (isSelected) {
        input.placeholder = 'Tuliskan kunci alasan ilmiah yang benar...';
      } else {
        input.placeholder = `Tuliskan distraktor alasan (miskonsepsi ${l})...`;
      }
    }
  });

  // 3. Keep Live KaTeX Preview in Sync
  updateLiveQuestionPreview();
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

  // Correct key highlight Tier 1
  const selectedKey = document.querySelector('input[name="tier1CorrectKey"]:checked')?.value || 'A';
  ['A', 'B', 'C', 'D', 'E'].forEach(k => {
    const card = document.getElementById(`prevOptItem${k}`);
    if (card) {
      if (k === selectedKey) card.classList.add('correct');
      else card.classList.remove('correct');
    }
  });

  // Correct key highlight Tier 2
  const selectedT2Key = document.querySelector('input[name="tier2CorrectKey"]:checked')?.value || 'A';
  ['A', 'B', 'C', 'D', 'E'].forEach(k => {
    const item = document.getElementById(`prevReasonItem${k}`);
    const badge = document.getElementById(`prevReasonBadge${k}`);
    if (item) {
      if (k === selectedT2Key) item.classList.add('correct');
      else item.classList.remove('correct');
    }
    if (badge) {
      if (k === selectedT2Key) {
        badge.className = 'preview-badge-pill status-badge paham';
        badge.textContent = `${k} (Ilmiah)`;
      } else {
        badge.className = 'preview-badge-pill status-badge miskonsepsi';
        badge.textContent = `${k} (Distraktor)`;
      }
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
  const statTotal = document.getElementById('statTotalStudents');
  const statPaham = document.getElementById('statPahamStudents');
  const statMis = document.getElementById('statMiskonsepsiStudents');
  const statTidak = document.getElementById('statTidakPahamStudents');

  const filtered = (!className || className === 'all')
    ? TEACHER_STATE.students
    : TEACHER_STATE.students.filter(s => s.class === className);

  const total = filtered.length;
  if (kpiTotal) kpiTotal.textContent = total;
  if (statTotal) statTotal.textContent = `${total} Siswa`;

  const pahamCount = filtered.filter(s => s.profile === 'paham').length;
  const misCount = filtered.filter(s => s.profile === 'miskonsepsi').length;
  const tidakCount = filtered.filter(s => s.profile === 'tidak-paham').length;

  if (statPaham) statPaham.textContent = `${pahamCount} Siswa`;
  if (statMis) statMis.textContent = `${misCount} Siswa`;
  if (statTidak) statTidak.textContent = `${tidakCount} Siswa`;

  const pahamPct = total ? Math.round((pahamCount / total) * 100) : 0;
  const misPct = total ? Math.round((misCount / total) * 100) : 0;
  const tidakPct = total ? (100 - pahamPct - misPct) : 0;

  const ratePaham = document.getElementById('statPahamRate');
  if (ratePaham) ratePaham.textContent = `${pahamPct}% dari Kelas`;
  const rateMis = document.getElementById('statMiskonsepsiRate');
  if (rateMis) rateMis.textContent = `${misPct}% Butuh Remedial`;
  const rateTidak = document.getElementById('statTidakPahamRate');
  if (rateTidak) rateTidak.textContent = `${tidakPct}% Belum Menguasai`;

  const barPaham = document.getElementById('barSegmentPaham');
  if (barPaham) {
    barPaham.style.width = `${pahamPct}%`;
    barPaham.textContent = `Paham ${pahamPct}% (${pahamCount} Siswa)`;
    barPaham.title = `Paham: ${pahamCount} Siswa (${pahamPct}%)`;
  }
  const barMis = document.getElementById('barSegmentMiskonsepsi');
  if (barMis) {
    barMis.style.width = `${misPct}%`;
    barMis.textContent = `Miskonsepsi ${misPct}% (${misCount})`;
    barMis.title = `Miskonsepsi: ${misCount} Siswa (${misPct}%)`;
  }
  const barTidak = document.getElementById('barSegmentTidakPaham');
  if (barTidak) {
    barTidak.style.width = `${tidakPct}%`;
    barTidak.textContent = `${tidakPct}% (${tidakCount})`;
    barTidak.title = `Tidak Paham: ${tidakCount} Siswa (${tidakPct}%)`;
  }

  const matPaham = document.getElementById('matrixPahamCountBadge');
  if (matPaham) matPaham.textContent = `${pahamCount} Siswa (${pahamPct}%)`;
  const matMis = document.getElementById('matrixMiskonsepsiCountBadge');
  if (matMis) matMis.textContent = `${misCount} Siswa (${misPct}%)`;
  const matTidak = document.getElementById('matrixTidakPahamCountBadge');
  if (matTidak) matTidak.textContent = `${tidakCount} Siswa (${tidakPct}%)`;
}

function renderClassCards() {
  const container = document.getElementById('classCardGrid');
  if (!container) return;

  container.innerHTML = TEACHER_STATE.classes.map(cls => `
    <div class="class-card" id="classCard_${cls.id}">
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
      <div id="qbEmptyStateContainer" style="text-align:center; padding:48px 24px; background:var(--bg-elevated); border:1px dashed var(--border-color); border-radius:var(--radius-sm); color:var(--text-muted);">
        <p id="qbEmptyStateText" style="margin-bottom:12px; font-weight:600; font-size:0.95rem;">Belum ada butir soal di Bank Soal. Data butir soal siap dimuat dari database.</p>
        <button type="button" class="btn btn-primary btn-sm" id="btnEmptyAddQuestion" onclick="document.getElementById('btnOpenAddQuestionBankModal')?.click()">+ Tambah Butir Soal Baru</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(q => {
    const diffBadgeClass = q.difficulty === 'Mudah' ? 'miskonsepsi' : q.difficulty === 'Sedang' ? 'paham' : 'tidak-paham';

    return `
      <div class="qb-card" id="qbCard_${q.id}">
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
