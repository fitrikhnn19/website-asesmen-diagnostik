/**
 * SiDag - Administrator Dashboard Controller
 * Full Control: Teacher Accounts Management (CRUD, Activate/Deactivate, Reset Password),
 * Global Anti-Cheat Integrity, System Audit Trail, and Server Health Monitoring.
 */

// Global Admin State
const ADMIN_STATE = {
  teachers: [
    { id: 'T01', name: 'Dra. Siti Rahmawati, M.Pd.', nip: '19750312 200003 2 004', email: 'siti.rahmawati@sman1.sch.id', subject: 'Fisika', classes: 'XI IPA 1, XI IPA 2', assessmentsCount: 4, status: 'aktif', joined: '10 Jan 2026' },
    { id: 'T02', name: 'Bambang Hermanto, S.Pd.', nip: '19810415 200604 1 012', email: 'bambang.hermanto@sman1.sch.id', subject: 'Matematika', classes: 'X-A, X-B', assessmentsCount: 6, status: 'aktif', joined: '12 Jan 2026' },
    { id: 'T03', name: 'Dr. Hendra Gunawan, M.Si.', nip: '19690822 199512 1 001', email: 'hendra.gunawan@sman1.sch.id', subject: 'Kimia', classes: 'XII MIPA 1, XII MIPA 2', assessmentsCount: 3, status: 'aktif', joined: '15 Jan 2026' },
    { id: 'T04', name: 'Nurul Hidayati, S.Si., M.Pd.', nip: '19840210 200801 2 009', email: 'nurul.hidayati@sman1.sch.id', subject: 'Biologi', classes: 'XI IPA 3, XI IPA 4', assessmentsCount: 5, status: 'aktif', joined: '18 Jan 2026' },
    { id: 'T05', name: 'Agus Santoso, M.Pd.', nip: '19790614 200501 1 007', email: 'agus.santoso@sman1.sch.id', subject: 'Fisika', classes: 'X-C, X-D', assessmentsCount: 2, status: 'aktif', joined: '22 Jan 2026' },
    { id: 'T06', name: 'Dewi Sartika, S.Pd.', nip: '19881105 201402 2 003', email: 'dewi.sartika@sman1.sch.id', subject: 'Matematika', classes: 'XI IPS 1', assessmentsCount: 1, status: 'nonaktif', joined: '02 Feb 2026' },
    { id: 'T07', name: 'Rahmat Kurniawan, S.Kom.', nip: '19920518 201903 1 005', email: 'rahmat.kurniawan@sman1.sch.id', subject: 'Informatika', classes: 'X-A, X-B, X-C', assessmentsCount: 3, status: 'aktif', joined: '05 Feb 2026' },
    { id: 'T08', name: 'Endang Purwanti, M.Pd.', nip: '19730919 199802 2 002', email: 'endang.purwanti@sman1.sch.id', subject: 'Kimia', classes: 'XI IPA 1', assessmentsCount: 0, status: 'nonaktif', joined: '12 Feb 2026' }
  ],
  auditLogs: [
    { time: '23 Okt 2026, 21:15', actor: 'Dra. Siti Rahmawati, M.Pd.', role: 'Guru', action: 'Mengirim email rekap asesmen XI IPA 2', ip: '192.168.1.45', status: 'Sukses' },
    { time: '23 Okt 2026, 20:30', actor: 'Administrator SiDag', role: 'Admin', action: 'Login ke Portal Administrator', ip: '192.168.1.2', status: 'Sukses' },
    { time: '23 Okt 2026, 14:10', actor: 'Bambang Hermanto, S.Pd.', role: 'Guru', action: 'Menerbitkan asesmen Matematika MAT-X', ip: '192.168.1.52', status: 'Sukses' },
    { time: '22 Okt 2026, 16:45', actor: 'Administrator SiDag', role: 'Admin', action: 'Menonaktifkan akun guru: Dewi Sartika, S.Pd.', ip: '192.168.1.2', status: 'Sukses' },
    { time: '22 Okt 2026, 11:20', actor: 'Budi Pratama (Siswa)', role: 'Siswa', action: 'Terdeteksi 3x pindah tab pada asesmen DIAGNO-2026', ip: '192.168.1.108', status: 'Tercatat' }
  ],
  globalProctoring: [
    { time: '23 Okt 2026, 10:42', student: 'Budi Pratama', class: 'XI IPA 2', teacher: 'Dra. Siti Rahmawati, M.Pd.', violation: 'Pindah Tab Browser (Keluar jendela)', severity: 'berat', action: 'Peringatan ke-3 & Notifikasi Pengawas' },
    { time: '23 Okt 2026, 10:25', student: 'Eko Prasetyo', class: 'XI IPA 2', teacher: 'Dra. Siti Rahmawati, M.Pd.', violation: 'Keluar dari Mode Fullscreen', severity: 'ringan', action: 'Layar Terkunci & Kembali Otomatis' },
    { time: '23 Okt 2026, 09:14', student: 'Rangga Wijaya', class: 'X-A', teacher: 'Bambang Hermanto, S.Pd.', violation: 'Membuka DevTools / Inspect Element', severity: 'berat', action: 'Sesi Ujian Ditangguhkan Sementara' },
    { time: '23 Okt 2026, 08:50', student: 'Farhan Maulana', class: 'XII MIPA 1', teacher: 'Dr. Hendra Gunawan, M.Si.', violation: 'Upaya Copy-Paste Teks Soal', severity: 'ringan', action: 'Blokir Clipboard Otomatis' }
  ]
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initAdminTheme();
  initAdminNav();
  initTeachersManagement();
  initSystemAuditLogs();
  initGlobalProctoring();
  initAdminModals();
});

/* --- Theme Management --- */
function initAdminTheme() {
  const btn = document.getElementById('adminThemeBtn');
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

/* --- View & Navigation --- */
function initAdminNav() {
  const navItems = document.querySelectorAll('.dash-nav-item');
  const mobileBtn = document.getElementById('adminMobileBtn');
  const sidebar = document.getElementById('adminSidebar');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = item.getAttribute('data-view');
      adminSwitchView(viewId);
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

window.adminSwitchView = function(viewId) {
  document.querySelectorAll('.dash-view-section').forEach(sec => {
    sec.style.display = 'none';
    sec.classList.remove('active');
  });

  const target = document.getElementById(viewId);
  if (target) {
    target.style.display = 'block';
    target.classList.add('active');
  }

  document.querySelectorAll('.dash-nav-item').forEach(item => {
    if (item.getAttribute('data-view') === viewId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  const titles = {
    'admin-view-overview': 'Ikhtisar Sistem Administrator',
    'admin-view-teachers': 'Manajemen Akun Guru',
    'admin-view-master': 'Data Master Kelas & Siswa',
    'admin-view-proctoring': 'Log Pengawasan & Integritas Global',
    'admin-view-audit': 'Log Audit Aktivitas Sistem',
    'admin-view-settings': 'Pengaturan & Konfigurasi Global'
  };

  const breadcrumb = document.getElementById('adminBreadcrumb');
  if (breadcrumb && titles[viewId]) {
    breadcrumb.textContent = titles[viewId];
  }
};

/* --- Teacher Accounts Management (CRUD & Status) --- */
function initTeachersManagement() {
  const tbody = document.getElementById('teachersTableBody');
  const overviewTbody = document.getElementById('overviewTeachersTbody');
  const searchInput = document.getElementById('searchTeacherInput');
  const filterStatus = document.getElementById('filterTeacherStatus');
  const filterSubject = document.getElementById('filterTeacherSubject');
  const badgeCount = document.getElementById('teachersCountBadge');
  const kpiTeachers = document.getElementById('kpiTotalTeachers');
  const sidebarBadge = document.getElementById('sidebarTeachersCount');

  renderTeachersTable();
  renderOverviewTeachers();

  if (searchInput) searchInput.addEventListener('input', renderTeachersTable);
  if (filterStatus) filterStatus.addEventListener('change', renderTeachersTable);
  if (filterSubject) filterSubject.addEventListener('change', renderTeachersTable);

  function renderTeachersTable() {
    if (!tbody) return;
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const status = filterStatus ? filterStatus.value : 'all';
    const subj = filterSubject ? filterSubject.value : 'all';

    const filtered = ADMIN_STATE.teachers.filter(t => {
      const matchQ = t.name.toLowerCase().includes(q) || t.email.toLowerCase().includes(q) || t.nip.includes(q);
      const matchStatus = status === 'all' || t.status === status;
      const matchSubj = subj === 'all' || t.subject === subj;
      return matchQ && matchStatus && matchSubj;
    });

    if (badgeCount) badgeCount.textContent = `Menampilkan ${filtered.length} dari ${ADMIN_STATE.teachers.length} akun`;
    if (kpiTeachers) kpiTeachers.textContent = `${ADMIN_STATE.teachers.length} Guru`;
    if (sidebarBadge) sidebarBadge.textContent = ADMIN_STATE.teachers.length;

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding:32px; color:var(--text-muted);">
            Tidak ditemukan akun guru yang cocok dengan kata kunci pencarian.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map((t, idx) => {
      const isAktif = t.status === 'aktif';
      return `
        <tr>
          <td>${idx + 1}</td>
          <td>
            <strong>${t.name}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">NIP: ${t.nip}</div>
          </td>
          <td>${t.email}</td>
          <td><span class="status-badge paham" style="font-size:0.75rem;">${t.subject}</span></td>
          <td style="font-size:0.8rem;">${t.classes}</td>
          <td style="text-align:center;"><strong>${t.assessmentsCount}</strong></td>
          <td>
            <span class="status-badge ${isAktif ? 'active-status' : 'inactive-status'}">
              &bull; ${isAktif ? 'Aktif' : 'Nonaktif'}
            </span>
          </td>
          <td>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button type="button" class="btn btn-outline btn-sm" onclick="openEditTeacherModal('${t.id}')">
                Ubah
              </button>
              <button type="button" class="btn ${isAktif ? 'btn-secondary' : 'btn-primary'} btn-sm" onclick="toggleTeacherStatus('${t.id}')">
                ${isAktif ? 'Nonaktifkan' : 'Aktifkan'}
              </button>
              <button type="button" class="btn btn-text btn-sm" title="Reset Kata Sandi" onclick="openResetPasswordModal('${t.id}')" style="padding:4px 8px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderOverviewTeachers() {
    if (!overviewTbody) return;
    overviewTbody.innerHTML = ADMIN_STATE.teachers.slice(0, 4).map(t => `
      <tr>
        <td><strong>${t.name}</strong></td>
        <td><span class="status-badge paham" style="font-size:0.72rem;">${t.subject}</span></td>
        <td style="font-size:0.8rem; color:var(--text-muted);">${t.email}</td>
        <td>
          <span class="status-badge ${t.status === 'aktif' ? 'active-status' : 'inactive-status'}">
            &bull; ${t.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
          </span>
        </td>
        <td>
          <button type="button" class="btn btn-outline btn-sm" onclick="adminSwitchView('admin-view-teachers')">Detail</button>
        </td>
      </tr>
    `).join('');
  }
}

/* --- Toggle Teacher Status (Aktif / Nonaktif) --- */
window.toggleTeacherStatus = function(teacherId) {
  const teacher = ADMIN_STATE.teachers.find(t => t.id === teacherId);
  if (!teacher) return;

  const prev = teacher.status;
  teacher.status = prev === 'aktif' ? 'nonaktif' : 'aktif';

  // Log in Audit Trail
  ADMIN_STATE.auditLogs.unshift({
    time: 'Baru saja',
    actor: 'Administrator SiDag',
    role: 'Admin',
    action: `${teacher.status === 'aktif' ? 'Mengaktifkan' : 'Menonaktifkan'} akun guru: ${teacher.name}`,
    ip: '192.168.1.2',
    status: 'Sukses'
  });

  initTeachersManagement();
  initSystemAuditLogs();

  const msg = teacher.status === 'aktif' 
    ? `Akun ${teacher.name} berhasil DIAKTIFKAN. Guru sekarang dapat login ke portal.`
    : `Akun ${teacher.name} DINONAKTIFKAN. Guru tidak lagi dapat login ke sistem.`;
  notify(msg);
};

/* --- Edit Teacher Modal --- */
window.openEditTeacherModal = function(teacherId) {
  const teacher = ADMIN_STATE.teachers.find(t => t.id === teacherId);
  if (!teacher) return;

  const modal = document.getElementById('editTeacherModal');
  const idField = document.getElementById('editTeacherId');
  const nameField = document.getElementById('editTName');
  const emailField = document.getElementById('editTEmail');
  const subjField = document.getElementById('editTSubject');
  const statusField = document.getElementById('editTStatus');

  if (idField) idField.value = teacher.id;
  if (nameField) nameField.value = teacher.name;
  if (emailField) emailField.value = teacher.email;
  if (subjField) subjField.value = teacher.subject;
  if (statusField) statusField.value = teacher.status;

  if (modal) modal.classList.add('open');
};

/* --- Reset Password Modal --- */
window.openResetPasswordModal = function(teacherId) {
  const teacher = ADMIN_STATE.teachers.find(t => t.id === teacherId);
  if (!teacher) return;

  const modal = document.getElementById('resetPassModal');
  const idField = document.getElementById('resetPassTeacherId');
  const title = document.getElementById('resetPassTitle');
  const sub = document.getElementById('resetPassSub');

  if (idField) idField.value = teacher.id;
  if (title) title.textContent = `Reset Kata Sandi: ${teacher.name}`;
  if (sub) sub.textContent = `Atur kata sandi baru untuk akun email (${teacher.email}).`;

  if (modal) modal.classList.add('open');
};

/* --- System Audit Trail --- */
function initSystemAuditLogs() {
  const tbody = document.getElementById('systemAuditTbody');
  if (!tbody) return;

  tbody.innerHTML = ADMIN_STATE.auditLogs.map(l => `
    <tr>
      <td style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dim);">${l.time}</td>
      <td><strong>${l.actor}</strong></td>
      <td><span class="portal-role-pill ${l.role === 'Admin' ? 'admin' : 'teacher'}">${l.role}</span></td>
      <td style="font-size:0.84rem;">${l.action}</td>
      <td style="font-family:var(--font-mono); font-size:0.78rem; color:var(--text-muted);">${l.ip}</td>
      <td><span class="status-badge active-status">&check; ${l.status}</span></td>
    </tr>
  `).join('');
}

/* --- Global Proctoring Surveillance --- */
function initGlobalProctoring() {
  const tbody = document.getElementById('adminProctoringTbody');
  if (!tbody) return;

  tbody.innerHTML = ADMIN_STATE.globalProctoring.map(p => `
    <tr>
      <td style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dim);">${p.time}</td>
      <td><strong>${p.student}</strong></td>
      <td>${p.class}</td>
      <td style="font-size:0.82rem; color:var(--text-muted);">${p.teacher}</td>
      <td>${p.violation}</td>
      <td>
        <span class="cheat-badge-severity ${p.severity}">
          ${p.severity}
        </span>
      </td>
      <td style="font-size:0.8rem; color:var(--text-muted);">${p.action}</td>
    </tr>
  `).join('');
}

window.exportAdminProctoringLogs = function() {
  const csvContent = "data:text/csv;charset=utf-8,"
    + "Waktu,Siswa,Kelas,Guru Pengawas,Pelanggaran,Keparahan,Tindakan\n"
    + ADMIN_STATE.globalProctoring.map(p => `"${p.time}","${p.student}","${p.class}","${p.teacher}","${p.violation}","${p.severity}","${p.action}"`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Log_AntiCheat_Global_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  notify('Log Integritas Global berhasil diekspor ke CSV.');
};

/* --- Modals and Submissions --- */
function initAdminModals() {
  // Add Teacher Modal
  const addModal = document.getElementById('addTeacherModal');
  const btnOpenAdd = document.getElementById('btnOpenAddTeacherModal');
  const btnOpenAddTable = document.getElementById('btnAddNewTeacherTable');
  const closeAdd = document.getElementById('closeAddTeacherModal');
  const cancelAdd = document.getElementById('btnCancelAddTeacher');
  const addForm = document.getElementById('addTeacherForm');

  [btnOpenAdd, btnOpenAddTable].forEach(btn => {
    btn?.addEventListener('click', () => {
      if (addModal) addModal.classList.add('open');
      document.getElementById('addTName')?.focus();
    });
  });

  [closeAdd, cancelAdd].forEach(btn => {
    btn?.addEventListener('click', () => addModal?.classList.remove('open'));
  });

  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('addTName')?.value.trim();
      const nip = document.getElementById('addTNIP')?.value.trim();
      const email = document.getElementById('addTEmail')?.value.trim();
      const subj = document.getElementById('addTSubject')?.value;
      const status = document.getElementById('addTStatus')?.value;

      // Add to State
      const newTeacher = {
        id: 'T' + String(ADMIN_STATE.teachers.length + 1).padStart(2, '0'),
        name: name,
        nip: nip,
        email: email,
        subject: subj,
        classes: 'Belum Ditugaskan',
        assessmentsCount: 0,
        status: status,
        joined: 'Hari ini'
      };

      ADMIN_STATE.teachers.unshift(newTeacher);

      // Audit log
      ADMIN_STATE.auditLogs.unshift({
        time: 'Baru saja',
        actor: 'Administrator SiDag',
        role: 'Admin',
        action: `Menambahkan akun guru baru: ${name} (${email})`,
        ip: '192.168.1.2',
        status: 'Sukses'
      });

      initTeachersManagement();
      initSystemAuditLogs();
      addModal.classList.remove('open');
      addForm.reset();
      notify(`Akun guru untuk ${name} berhasil ditambahkan!`);
    });
  }

  // Edit Teacher Modal Form
  const editModal = document.getElementById('editTeacherModal');
  const closeEdit = document.getElementById('closeEditTeacherModal');
  const cancelEdit = document.getElementById('btnCancelEditTeacher');
  const editForm = document.getElementById('editTeacherForm');

  [closeEdit, cancelEdit].forEach(btn => {
    btn?.addEventListener('click', () => editModal?.classList.remove('open'));
  });

  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('editTeacherId')?.value;
      const name = document.getElementById('editTName')?.value.trim();
      const email = document.getElementById('editTEmail')?.value.trim();
      const subj = document.getElementById('editTSubject')?.value;
      const status = document.getElementById('editTStatus')?.value;

      const teacher = ADMIN_STATE.teachers.find(t => t.id === id);
      if (teacher) {
        teacher.name = name;
        teacher.email = email;
        teacher.subject = subj;
        teacher.status = status;

        ADMIN_STATE.auditLogs.unshift({
          time: 'Baru saja',
          actor: 'Administrator SiDag',
          role: 'Admin',
          action: `Memperbarui profil akun guru: ${name}`,
          ip: '192.168.1.2',
          status: 'Sukses'
        });

        initTeachersManagement();
        initSystemAuditLogs();
        editModal?.classList.remove('open');
        notify(`Data akun guru ${name} berhasil diperbarui!`);
      }
    });
  }

  // Reset Password Modal Form
  const resetModal = document.getElementById('resetPassModal');
  const closeReset = document.getElementById('closeResetPassModal');
  const cancelReset = document.getElementById('btnCancelResetPass');
  const resetForm = document.getElementById('resetPassForm');

  [closeReset, cancelReset].forEach(btn => {
    btn?.addEventListener('click', () => resetModal?.classList.remove('open'));
  });

  if (resetForm) {
    resetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('resetPassTeacherId')?.value;
      const teacher = ADMIN_STATE.teachers.find(t => t.id === id);
      const newPass = document.getElementById('newTempPassField')?.value;

      if (teacher) {
        ADMIN_STATE.auditLogs.unshift({
          time: 'Baru saja',
          actor: 'Administrator SiDag',
          role: 'Admin',
          action: `Reset kata sandi akun guru: ${teacher.name}`,
          ip: '192.168.1.2',
          status: 'Sukses'
        });

        initSystemAuditLogs();
        resetModal?.classList.remove('open');
        notify(`Kata sandi untuk ${teacher.name} berhasil diubah! Email pemberitahuan telah dikirimkan.`);
      }
    });
  }

  // Click outside close
  window.addEventListener('click', (e) => {
    if (e.target === addModal) addModal.classList.remove('open');
    if (e.target === editModal) editModal.classList.remove('open');
    if (e.target === resetModal) resetModal.classList.remove('open');
  });
}

/* --- Toast Bar Notification --- */
let adminToastTimeout;
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
  clearTimeout(adminToastTimeout);
  adminToastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}
