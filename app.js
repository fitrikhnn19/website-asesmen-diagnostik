/**
 * SiDag - Client-Side Logic
 * Sistem Informasi Asesmen Diagnostik Tiga Tingkat (Three-Tier)
 * Alur Siswa Token-First & Akses Administrator (Pembuat Website)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initStudentTokenGateway();
  initModals();
  initFaq();
  initKaTeX();
});

/* --- Theme Toggle (Formal Dark / Light Mode) --- */
function initTheme() {
  const btn = document.getElementById('themeToggleBtn');
  const saved = localStorage.getItem('sidag_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sidag_theme', next);
      updateThemeIcon(next);
      notify(`Mode tampilan diubah ke: ${next === 'dark' ? 'Gelap' : 'Terang'}`);
    });
  }

  function updateThemeIcon(mode) {
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
}

/* --- Mobile Navigation Drawer --- */
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mobileNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }
}

/* --- Student Token-First Gateway Engine --- */
const VALID_EXAM_TOKENS = {
  'DIAGNO-2026': 'Asesmen Diagnostik Matematika — Transformasi Geometri (Fase F / Kelas XI)',
  'TRANS-GEO': 'Asesmen Diagnostik Matematika — Komposisi Matriks & Transformasi (XI)',
  'MAT-XI': 'Asesmen Diagnostik Matematika — Transformasi Geometri Lanjutan (XI)',
  'MAT-X': 'Asesmen Diagnostik Matematika — Fungsi & Persamaan Aljabar (X)'
};

function initStudentTokenGateway() {
  const tokenVerifyForm = document.getElementById('tokenVerifyForm');
  const tokenInput = document.getElementById('heroTokenInput');
  const studentInfoSection = document.getElementById('studentInfoSection');
  const verifiedTokenDisplay = document.getElementById('verifiedTokenDisplay');
  const verifiedExamTitle = document.getElementById('verifiedExamTitle');
  const btnChangeToken = document.getElementById('btnChangeToken');
  const studentStartExamForm = document.getElementById('studentStartExamForm');
  const gatewayTitle = document.getElementById('gatewayTitle');
  const gatewayDesc = document.getElementById('gatewayDesc');
  const sampleChips = document.querySelectorAll('.sample-token-chip');

  // Sample token chips quick click
  sampleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (tokenInput) {
        tokenInput.value = chip.innerText.trim();
        verifyStudentToken(chip.innerText.trim());
      }
    });
  });

  // Step 1: Submit token verification
  if (tokenVerifyForm) {
    tokenVerifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const token = (tokenInput ? tokenInput.value : '').trim().toUpperCase();
      verifyStudentToken(token);
    });
  }

  function verifyStudentToken(token) {
    if (!token) {
      notify('Ketikkan token asesmen terlebih dahulu.');
      return;
    }

    // Check validity
    const examTitle = VALID_EXAM_TOKENS[token] || (token.length >= 4 ? `Asesmen Terjadwal (Token: ${token})` : null);

    if (examTitle) {
      // Success: Reveal Step 2 (Student Information)
      if (verifiedTokenDisplay) verifiedTokenDisplay.textContent = token;
      if (verifiedExamTitle) verifiedExamTitle.textContent = examTitle;

      if (tokenVerifyForm) tokenVerifyForm.style.display = 'none';
      if (studentInfoSection) studentInfoSection.style.display = 'block';

      if (gatewayTitle) gatewayTitle.textContent = 'Lengkapi Identitas Siswa';
      if (gatewayDesc) gatewayDesc.textContent = 'Token berhasil diverifikasi. Lengkapi nama dan kelas untuk memulai lembar soal.';

      notify(`Token '${token}' valid! Silakan isi identitas Anda.`);
      document.getElementById('examStudentName')?.focus();
    } else {
      notify('Token tidak ditemukan atau kedaluwarsa. Gunakan contoh DIAGNO-2026.');
    }
  }

  // Back / Change Token button
  if (btnChangeToken) {
    btnChangeToken.addEventListener('click', () => {
      if (studentInfoSection) studentInfoSection.style.display = 'none';
      if (tokenVerifyForm) tokenVerifyForm.style.display = 'flex';

      if (gatewayTitle) gatewayTitle.textContent = 'Masukkan Token Asesmen';
      if (gatewayDesc) gatewayDesc.textContent = 'Siswa harus memasukkan token asesmen yang valid dari guru sebelum dapat mengisi identitas diri.';

      if (tokenInput) {
        tokenInput.value = '';
        tokenInput.focus();
      }
    });
  }

  // Step 2: Start Exam form submission
  if (studentStartExamForm) {
    studentStartExamForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const studentName = document.getElementById('examStudentName')?.value.trim();
      const studentClass = document.getElementById('examStudentClass')?.value.trim();
      const studentRoll = document.getElementById('examStudentRoll')?.value.trim() || '';
      const activeToken = verifiedTokenDisplay ? verifiedTokenDisplay.textContent.trim() : 'DIAGNO-2026';

      if (studentName && studentClass) {
        notify(`Menyiapkan lembar ujian untuk ${studentName} (${studentClass})...`);
        const sessionData = {
          token: activeToken,
          name: studentName,
          class: studentClass,
          roll: studentRoll
        };
        sessionStorage.setItem('sidag_active_session', JSON.stringify(sessionData));
        setTimeout(() => {
          window.location.href = `student-exam.html?token=${encodeURIComponent(activeToken)}&name=${encodeURIComponent(studentName)}&class=${encodeURIComponent(studentClass)}&roll=${encodeURIComponent(studentRoll)}`;
        }, 300);
      }
    });
  }
}

/* --- Modals (Teacher Portal & Admin Portal) --- */
function initModals() {
  // Teacher Portal Modal
  const tModal = document.getElementById('teacherModal');
  const tBtns = document.querySelectorAll('.open-teacher-modal');
  const tClose = document.getElementById('closeTeacherModal');
  const tTabs = document.querySelectorAll('.auth-tab-btn');
  const tForm = document.getElementById('teacherAuthForm');
  const tNameGroup = document.getElementById('teacherNameGroup');
  const tSubmit = document.getElementById('authSubmitBtn');

  tBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (tModal) tModal.classList.add('open');
    });
  });

  if (tClose && tModal) {
    tClose.addEventListener('click', () => tModal.classList.remove('open'));
  }

  tTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mode = tab.getAttribute('data-mode');
      if (mode === 'login') {
        if (tNameGroup) tNameGroup.style.display = 'none';
        if (tSubmit) tSubmit.textContent = 'Masuk ke Portal Guru';
      } else {
        if (tNameGroup) tNameGroup.style.display = 'flex';
        if (tSubmit) tSubmit.textContent = 'Buat Akun Guru';
      }
    });
  });

  if (tForm) {
    tForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('tEmail')?.value;
      notify(`Autentikasi Guru berhasil untuk: ${email}. Mengalihkan ke Dasbor Guru...`);
      tModal.classList.remove('open');
      setTimeout(() => {
        window.location.href = 'teacher-dashboard.html';
      }, 700);
    });
  }

  // Administrator Portal Modal (Pembuat Website & Pengelola Sistem)
  const aModal = document.getElementById('adminModal');
  const aBtns = document.querySelectorAll('.open-admin-modal');
  const aClose = document.getElementById('closeAdminModal');
  const aForm = document.getElementById('adminAuthForm');

  aBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (aModal) aModal.classList.add('open');
      document.getElementById('adminEmailField')?.focus();
    });
  });

  if (aClose && aModal) {
    aClose.addEventListener('click', () => aModal.classList.remove('open'));
  }

  if (aForm) {
    aForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const adminEmail = document.getElementById('adminEmailField')?.value;
      notify(`Autentikasi Administrator berhasil (${adminEmail}). Mengalihkan ke Dasbor Admin...`);
      aModal.classList.remove('open');
      setTimeout(() => {
        window.location.href = 'admin-dashboard.html';
      }, 700);
    });
  }

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === tModal) tModal.classList.remove('open');
    if (e.target === aModal) aModal.classList.remove('open');
  });
}

/* --- FAQ Accordion --- */
function initFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* --- KaTeX Mathematical Formula Auto-Renderer --- */
function initKaTeX() {
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

/* --- Toast Notification System --- */
let toastTimer;
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
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
}
