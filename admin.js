/**
 * SiDag - Administrator Dashboard Controller
 * Full Control: Teacher Accounts Management (CRUD, Activate/Deactivate, Reset Password, Delete),
 * Global Anti-Cheat Integrity, System Audit Trail, Master Data (Classes & Students), and Server Health Monitoring.
 * Integrated with RESTful backend endpoints (/api/admin/*).
 */

// Global In-Memory Cache (synchronized with Backend API)
const ADMIN_STATE = {
  teachers: [],
  auditLogs: [],
  globalProctoring: [],
  masterClasses: [],
  masterStudents: []
};

// API Helper
async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (sessionStorage.getItem('sidag_admin_token') || 'sidag-admin-token')
    }
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(endpoint, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`API Error on ${method} ${endpoint}:`, err);
    return { success: false, message: 'Gagal terhubung ke server SiDag API.' };
  }
}

// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', async () => {
  initAdminTheme();
  initAdminNav();
  initAdminModals();

  // Load all data from API asynchronously
  await Promise.all([
    loadAdminOverview(),
    loadTeachersData(),
    loadSystemAuditLogs(),
    loadGlobalProctoring(),
    loadMasterData()
  ]);
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
      const href = item.getAttribute('href');
      const viewId = item.getAttribute('data-view');
      if (viewId) {
        e.preventDefault();
        adminSwitchView(viewId);
        if (window.innerWidth <= 768 && sidebar) {
          sidebar.classList.remove('mobile-open');
        }
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

  // Refresh view specific data
  if (viewId === 'admin-view-overview') loadAdminOverview();
  if (viewId === 'admin-view-teachers') loadTeachersData();
  if (viewId === 'admin-view-master') loadMasterData();
  if (viewId === 'admin-view-proctoring') loadGlobalProctoring();
  if (viewId === 'admin-view-audit') loadSystemAuditLogs();
};

/* --- 1. OVERVIEW & KPI METRICS --- */
async function loadAdminOverview() {
  const res = await apiRequest('/api/admin/overview');
  if (res && res.success && res.data) {
    const d = res.data;
    const kpiTeachers = document.getElementById('kpiTotalTeachers');
    if (kpiTeachers) {
      kpiTeachers.textContent = `${d.teachers.total} Guru`;
    }

    const sidebarTeachers = document.getElementById('sidebarTeachersCount');
    if (sidebarTeachers) {
      sidebarTeachers.textContent = d.teachers.total;
    }
  }
}

/* --- 2. TEACHERS MANAGEMENT (CRUD) --- */
async function loadTeachersData() {
  const searchInput = document.getElementById('searchTeacherInput');
  const filterStatus = document.getElementById('filterTeacherStatus');
  const filterSubject = document.getElementById('filterTeacherSubject');

  const q = searchInput ? encodeURIComponent(searchInput.value.trim()) : '';
  const status = filterStatus ? filterStatus.value : 'all';
  const subj = filterSubject ? encodeURIComponent(filterSubject.value) : 'all';

  const res = await apiRequest(`/api/admin/teachers?search=${q}&status=${status}&subject=${subj}`);
  if (res && res.success && Array.isArray(res.data)) {
    ADMIN_STATE.teachers = res.data;
    renderTeachersTable();
    renderOverviewTeachers();
  }
}

function renderTeachersTable() {
  const tbody = document.getElementById('teachersTableBody');
  const badgeCount = document.getElementById('teachersCountBadge');
  const kpiTeachers = document.getElementById('kpiTotalTeachers');
  const sidebarBadge = document.getElementById('sidebarTeachersCount');

  if (!tbody) return;

  const teachers = ADMIN_STATE.teachers;

  if (badgeCount) badgeCount.textContent = `Menampilkan ${teachers.length} akun`;
  if (kpiTeachers) kpiTeachers.textContent = `${teachers.length} Guru`;
  if (sidebarBadge) sidebarBadge.textContent = teachers.length;

  if (teachers.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center; padding:32px; color:var(--text-muted);">
          Tidak ditemukan akun guru yang cocok dengan kata kunci pencarian.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = teachers.map((t, idx) => {
    const isAktif = t.status === 'aktif';
    return `
      <tr>
        <td>${idx + 1}</td>
        <td>
          <strong>${escapeHtml(t.name)}</strong>
          <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">NIP: ${escapeHtml(t.nip || '-')}</div>
        </td>
        <td>${escapeHtml(t.email)}</td>
        <td><span class="status-badge paham" style="font-size:0.75rem;">${escapeHtml(t.subject || 'Matematika')}</span></td>
        <td style="font-size:0.8rem;">${escapeHtml(t.classes || 'Belum Ditugaskan')}</td>
        <td style="text-align:center;"><strong>${t.assessmentsCount || 0}</strong></td>
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
            <button type="button" class="btn btn-text btn-sm" title="Hapus Akun Guru" onclick="confirmDeleteTeacher('${t.id}')" style="padding:4px 8px; color:var(--status-tidak-paham);">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderOverviewTeachers() {
  const overviewTbody = document.getElementById('overviewTeachersTbody');
  if (!overviewTbody) return;

  overviewTbody.innerHTML = ADMIN_STATE.teachers.slice(0, 4).map(t => `
    <tr>
      <td><strong>${escapeHtml(t.name)}</strong></td>
      <td><span class="status-badge paham" style="font-size:0.72rem;">${escapeHtml(t.subject || 'Matematika')}</span></td>
      <td style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(t.email)}</td>
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

// Search and filter listeners
const sInput = document.getElementById('searchTeacherInput');
const fStatus = document.getElementById('filterTeacherStatus');
const fSubject = document.getElementById('filterTeacherSubject');
if (sInput) sInput.addEventListener('input', () => loadTeachersData());
if (fStatus) fStatus.addEventListener('change', () => loadTeachersData());
if (fSubject) fSubject.addEventListener('change', () => loadTeachersData());

/* --- Toggle Teacher Status --- */
window.toggleTeacherStatus = async function(teacherId) {
  const res = await apiRequest(`/api/admin/teachers/${teacherId}/status`, 'PATCH');
  if (res && res.success) {
    notify(res.message);
    await loadTeachersData();
    loadSystemAuditLogs();
  } else {
    notify(res ? res.message : 'Gagal memperbarui status guru.');
  }
};

/* --- Delete Teacher --- */
window.confirmDeleteTeacher = async function(teacherId) {
  const teacher = ADMIN_STATE.teachers.find(t => t.id === teacherId);
  const name = teacher ? teacher.name : 'guru ini';
  if (confirm(`Apakah Anda yakin ingin menghapus akun pengajar '${name}' dari sistem? Tindakan ini tidak dapat dibatalkan.`)) {
    const res = await apiRequest(`/api/admin/teachers/${teacherId}`, 'DELETE');
    if (res && res.success) {
      notify(res.message);
      await loadTeachersData();
      loadSystemAuditLogs();
    } else {
      notify(res ? res.message : 'Gagal menghapus akun guru.');
    }
  }
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

/* --- 3. SYSTEM AUDIT TRAIL --- */
async function loadSystemAuditLogs() {
  const tbody = document.getElementById('systemAuditTbody');
  if (!tbody) return;

  const res = await apiRequest('/api/admin/audit-logs');
  if (res && res.success && Array.isArray(res.data)) {
    ADMIN_STATE.auditLogs = res.data;
    tbody.innerHTML = res.data.map(l => `
      <tr>
        <td style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dim);">${escapeHtml(l.time_formatted || l.time)}</td>
        <td><strong>${escapeHtml(l.actor)}</strong></td>
        <td><span class="portal-role-pill ${l.role === 'Admin' ? 'admin' : 'teacher'}">${escapeHtml(l.role)}</span></td>
        <td style="font-size:0.84rem;">${escapeHtml(l.action)}</td>
        <td style="font-family:var(--font-mono); font-size:0.78rem; color:var(--text-muted);">${escapeHtml(l.ip || '127.0.0.1')}</td>
        <td><span class="status-badge active-status">&check; ${escapeHtml(l.status || 'Sukses')}</span></td>
      </tr>
    `).join('');
  }
}

window.clearAuditLogs = async function() {
  if (confirm('Apakah Anda yakin ingin mengosongkan seluruh rekaman log audit sistem?')) {
    const res = await apiRequest('/api/admin/audit-logs', 'DELETE');
    if (res && res.success) {
      notify(res.message);
      loadSystemAuditLogs();
    }
  }
};

/* --- 4. GLOBAL PROCTORING --- */
async function loadGlobalProctoring() {
  const tbody = document.getElementById('adminProctoringTbody');
  if (!tbody) return;

  const res = await apiRequest('/api/admin/proctoring');
  if (res && res.success && Array.isArray(res.data)) {
    ADMIN_STATE.globalProctoring = res.data;
    tbody.innerHTML = res.data.map(p => `
      <tr>
        <td style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dim);">${escapeHtml(p.occurred_at || p.time || 'Baru saja')}</td>
        <td><strong>${escapeHtml(p.student_name || p.student)}</strong></td>
        <td>${escapeHtml(p.class_name || p.class)}</td>
        <td style="font-size:0.82rem; color:var(--text-muted);">${escapeHtml(p.teacher_name || p.teacher || 'Bambang Hermanto')}</td>
        <td>${escapeHtml(p.violation_text || p.violation)}</td>
        <td>
          <span class="cheat-badge-severity ${p.severity}">
            ${p.severity}
          </span>
        </td>
        <td style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(p.action_taken || p.action || 'Tercatat')}</td>
      </tr>
    `).join('');
  }
}

window.clearProctoringLogs = async function() {
  if (confirm('Kosongkan seluruh riwayat rekaman anti-cheat global?')) {
    const res = await apiRequest('/api/admin/proctoring', 'DELETE');
    if (res && res.success) {
      notify(res.message);
      loadGlobalProctoring();
    }
  }
};

window.exportAdminProctoringLogs = function() {
  const logs = ADMIN_STATE.globalProctoring;
  const csvContent = "data:text/csv;charset=utf-8,"
    + "Waktu,Siswa,Kelas,Guru Pengawas,Pelanggaran,Keparahan,Tindakan\n"
    + logs.map(p => `"${p.occurred_at || p.time || ''}","${p.student_name || p.student}","${p.class_name || p.class}","${p.teacher_name || p.teacher}","${p.violation_text || p.violation}","${p.severity}","${p.action_taken || p.action}"`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Log_AntiCheat_Global_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  notify('Log Integritas Global berhasil diekspor ke CSV.');
};

/* --- 5. MASTER DATA (CLASSES & STUDENTS CRUD) --- */
async function loadMasterData() {
  const classesTbody = document.getElementById('masterClassesTableBody');
  const studentsTbody = document.getElementById('masterStudentsTableBody');

  const [classesRes, studentsRes] = await Promise.all([
    apiRequest('/api/admin/master/classes'),
    apiRequest('/api/admin/master/students')
  ]);

  if (classesRes && classesRes.success && classesTbody) {
    ADMIN_STATE.masterClasses = classesRes.data;
    classesTbody.innerHTML = classesRes.data.map(cls => `
      <tr>
        <td><strong style="font-family:var(--font-mono);">${escapeHtml(cls.id)}</strong></td>
        <td><strong>${escapeHtml(cls.name)}</strong></td>
        <td>${escapeHtml(cls.grade)}</td>
        <td>${escapeHtml(cls.homeroom || '-')}</td>
        <td><span class="status-badge paham">${cls.student_count || 0} Siswa</span></td>
        <td>
          <button type="button" class="btn btn-text btn-sm" onclick="deleteMasterClass('${cls.id}')" style="color:var(--status-tidak-paham);">Hapus</button>
        </td>
      </tr>
    `).join('');
  }

  if (studentsRes && studentsRes.success && studentsTbody) {
    ADMIN_STATE.masterStudents = studentsRes.data;
    studentsTbody.innerHTML = studentsRes.data.map(s => `
      <tr>
        <td><code style="font-family:var(--font-mono);">${escapeHtml(s.id)}</code></td>
        <td><strong>${escapeHtml(s.name)}</strong></td>
        <td><span class="status-badge paham">${escapeHtml(s.class || 'XI MIPA 2')}</span></td>
        <td style="font-size:0.82rem; color:var(--text-muted);">${escapeHtml(s.email || '-')}</td>
        <td>
          <button type="button" class="btn btn-text btn-sm" onclick="deleteMasterStudent('${s.id}')" style="color:var(--status-tidak-paham);">Hapus</button>
        </td>
      </tr>
    `).join('');
  }
}

window.deleteMasterClass = async function(classId) {
  if (confirm(`Hapus rombel master '${classId}'?`)) {
    const res = await apiRequest(`/api/admin/master/classes/${classId}`, 'DELETE');
    if (res && res.success) {
      notify(res.message);
      loadMasterData();
    }
  }
};

window.deleteMasterStudent = async function(studentId) {
  if (confirm(`Hapus siswa master '${studentId}'?`)) {
    const res = await apiRequest(`/api/admin/master/students/${studentId}`, 'DELETE');
    if (res && res.success) {
      notify(res.message);
      loadMasterData();
    }
  }
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
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('addTName')?.value.trim();
      const nip = document.getElementById('addTNIP')?.value.trim();
      const email = document.getElementById('addTEmail')?.value.trim();
      const subj = document.getElementById('addTSubject')?.value;
      const status = document.getElementById('addTStatus')?.value;

      const payload = {
        name,
        nip,
        email,
        subject: subj,
        classes: 'Belum Ditugaskan',
        status: status || 'aktif',
        password: 'guru123'
      };

      const res = await apiRequest('/api/admin/teachers', 'POST', payload);
      if (res && res.success) {
        notify(res.message);
        addModal?.classList.remove('open');
        addForm.reset();
        await loadTeachersData();
        loadSystemAuditLogs();
        loadAdminOverview();
      } else {
        notify(res ? res.message : 'Gagal menambahkan akun guru.');
      }
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
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('editTeacherId')?.value;
      const name = document.getElementById('editTName')?.value.trim();
      const email = document.getElementById('editTEmail')?.value.trim();
      const subj = document.getElementById('editTSubject')?.value;
      const status = document.getElementById('editTStatus')?.value;

      const payload = { name, email, subject: subj, status };
      const res = await apiRequest(`/api/admin/teachers/${id}`, 'PUT', payload);
      if (res && res.success) {
        notify(res.message);
        editModal?.classList.remove('open');
        await loadTeachersData();
        loadSystemAuditLogs();
      } else {
        notify(res ? res.message : 'Gagal memperbarui data guru.');
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
    resetForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('resetPassTeacherId')?.value;
      const newPass = document.getElementById('newTempPassField')?.value;

      const res = await apiRequest(`/api/admin/teachers/${id}/reset-password`, 'POST', { new_password: newPass });
      if (res && res.success) {
        notify(res.message);
        resetModal?.classList.remove('open');
        loadSystemAuditLogs();
      } else {
        notify(res ? res.message : 'Gagal mereset kata sandi.');
      }
    });
  }

  // Master Class Modal
  const mClassModal = document.getElementById('addMasterClassModal');
  const btnOpenMClass = document.getElementById('btnOpenAddMasterClassModal');
  const closeMClass = document.getElementById('closeAddMasterClassModal');
  const cancelMClass = document.getElementById('btnCancelAddMasterClass');
  const mClassForm = document.getElementById('addMasterClassForm');

  if (btnOpenMClass && mClassModal) {
    btnOpenMClass.addEventListener('click', () => mClassModal.classList.add('open'));
  }
  [closeMClass, cancelMClass].forEach(btn => {
    btn?.addEventListener('click', () => mClassModal?.classList.remove('open'));
  });

  if (mClassForm) {
    mClassForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('addMClassName')?.value.trim();
      const grade = document.getElementById('addMClassGrade')?.value;
      const homeroom = document.getElementById('addMClassHomeroom')?.value.trim();

      const res = await apiRequest('/api/admin/master/classes', 'POST', { name, grade, homeroom });
      if (res && res.success) {
        notify(res.message);
        mClassModal?.classList.remove('open');
        mClassForm.reset();
        loadMasterData();
        loadSystemAuditLogs();
      }
    });
  }

  // Master Student Modal
  const mStudentModal = document.getElementById('addMasterStudentModal');
  const btnOpenMStudent = document.getElementById('btnOpenAddMasterStudentModal');
  const closeMStudent = document.getElementById('closeAddMasterStudentModal');
  const cancelMStudent = document.getElementById('btnCancelAddMasterStudent');
  const mStudentForm = document.getElementById('addMasterStudentForm');

  if (btnOpenMStudent && mStudentModal) {
    btnOpenMStudent.addEventListener('click', () => mStudentModal.classList.add('open'));
  }
  [closeMStudent, cancelMStudent].forEach(btn => {
    btn?.addEventListener('click', () => mStudentModal?.classList.remove('open'));
  });

  if (mStudentForm) {
    mStudentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('addMStudentName')?.value.trim();
      const className = document.getElementById('addMStudentClass')?.value;
      const roll = document.getElementById('addMStudentRoll')?.value.trim();

      const res = await apiRequest('/api/admin/master/students', 'POST', { name, class: className, roll });
      if (res && res.success) {
        notify(res.message);
        mStudentModal?.classList.remove('open');
        mStudentForm.reset();
        loadMasterData();
        loadSystemAuditLogs();
      }
    });
  }

  // Click outside close
  window.addEventListener('click', (e) => {
    if (e.target === addModal) addModal.classList.remove('open');
    if (e.target === editModal) editModal.classList.remove('open');
    if (e.target === resetModal) resetModal.classList.remove('open');
    if (e.target === mClassModal) mClassModal.classList.remove('open');
    if (e.target === mStudentModal) mStudentModal.classList.remove('open');
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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
