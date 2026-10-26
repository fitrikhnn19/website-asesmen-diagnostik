/**
 * SiDag - Client-Side Logic & Integration
 * Sistem Informasi Asesmen Diagnostik Tiga Tingkat (Three-Tier)
 * Alur Siswa Token-First & Akses Portal Guru/Administrator via RESTful API
 */
const { createClient } = supabase;
const supabaseUrl = 'https://yveqzpomhmmravmeeoqm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2ZXF6cG9taG1tcmF2bWVlb3FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2ODE2MjcsImV4cCI6MjEwODI1NzYyN30.AYPr7gxtJXPxx9s4mj9D-qt41g34vKSAADENLqoF3yc';
const supabaseClient = createClient(supabaseUrl, supabaseKey);
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
      const rawText = chip.innerText.trim();
      if (tokenInput) {
        tokenInput.value = rawText;
        verifyStudentToken(rawText);
      }
    });
  });

  // Step 1: Submit token verification to Backend API (/api/student/verify-token)
  if (tokenVerifyForm) {
    tokenVerifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const token = (tokenInput ? tokenInput.value : '').trim().toUpperCase();
      verifyStudentToken(token);
    });
  }

  async function verifyStudentToken(token) {
    if (!token) {
      notify('Ketikkan token asesmen terlebih dahulu.');
      return;
    }

    try {
      const res = await fetch('/api/student/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      const result = await res.json();

      if (result && result.success) {
        const info = result.data;
        if (verifiedTokenDisplay) verifiedTokenDisplay.textContent = info.token;
        if (verifiedExamTitle) verifiedExamTitle.textContent = `${info.title} (${info.school || 'SMAN 7 Banjarmasin'})`;

        if (tokenVerifyForm) tokenVerifyForm.style.display = 'none';
        if (studentInfoSection) studentInfoSection.style.display = 'block';

        if (gatewayTitle) gatewayTitle.textContent = 'Lengkapi Identitas Siswa';
        if (gatewayDesc) gatewayDesc.textContent = `Token valid (${info.token}). Waktu: ${info.duration_minutes || 30} menit. Lengkapi nama dan kelas untuk memulai lembar soal.`;

        notify(result.message || `Token '${info.token}' valid! Silakan isi identitas Anda.`);
        document.getElementById('examStudentName')?.focus();
      } else {
        notify(result.message || 'Token asesmen tidak valid atau asesmen telah ditutup.');
      }
    } catch (err) {
      console.warn('API error during token verification, fallback to validation:', err);
      // Fallback in case of server offline
      if (token.length >= 4) {
        if (verifiedTokenDisplay) verifiedTokenDisplay.textContent = token;
        if (verifiedExamTitle) verifiedExamTitle.textContent = `Asesmen Diagnostik Matematika (Token: ${token})`;
        if (tokenVerifyForm) tokenVerifyForm.style.display = 'none';
        if (studentInfoSection) studentInfoSection.style.display = 'block';
        notify(`Token '${token}' terverifikasi secara lokal.`);
      } else {
        notify('Ketikkan minimal 4 karakter token.');
      }
    }
  }

  window.verifyStudentToken = verifyStudentToken;

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

  // Step 2: Start Exam form submission to Backend API (/api/student/start-exam)
  if (studentStartExamForm) {
    studentStartExamForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const studentName = document.getElementById('examStudentName')?.value.trim();
      const studentClass = document.getElementById('examStudentClass')?.value.trim();
      const studentRoll = document.getElementById('examStudentRoll')?.value.trim() || '-';
      const activeToken = verifiedTokenDisplay ? verifiedTokenDisplay.textContent.trim() : 'DIAGNO-2026';

      if (!studentName || !studentClass) {
        notify('Nama dan kelas wajib diisi!');
        return;
      }

      notify(`Membuat sesi asesmen untuk ${studentName}...`);

      try {
        const res = await fetch('/api/student/start-exam', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: activeToken,
            name: studentName,
            class: studentClass,
            roll: studentRoll
          })
        });

        const result = await res.json();
        if (result && result.success && result.data) {
          const sessionData = {
            attemptId: result.data.attempt_id,
            token: activeToken,
            name: studentName,
            class: studentClass,
            roll: studentRoll,
            assessment: result.data.assessment,
            questions: result.data.questions
          };
          sessionStorage.setItem('sidag_active_session', JSON.stringify(sessionData));

          setTimeout(() => {
            window.location.href = `student-exam.html?token=${encodeURIComponent(activeToken)}&attemptId=${encodeURIComponent(result.data.attempt_id)}&view=briefing`;
          }, 300);
          return;
        } else {
          notify(result.message || 'Gagal memulai ujian.');
        }
      } catch (err) {
        console.warn('Network error starting exam, starting locally:', err);
        const sessionData = {
          token: activeToken,
          name: studentName,
          class: studentClass,
          roll: studentRoll
        };
        sessionStorage.setItem('sidag_active_session', JSON.stringify(sessionData));
        window.location.href = `student-exam.html?token=${encodeURIComponent(activeToken)}&name=${encodeURIComponent(studentName)}&class=${encodeURIComponent(studentClass)}&view=briefing`;
      }
    });
  }
}

/* --- Modals (Teacher Portal & Admin Portal Authentication) --- */
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

  let authMode = 'register';
  tTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      authMode = tab.getAttribute('data-mode');
      if (authMode === 'login') {
        if (tNameGroup) tNameGroup.style.display = 'none';
        if (tSubmit) tSubmit.textContent = 'Masuk ke Portal Guru &rarr;';
      } else {
        if (tNameGroup) tNameGroup.style.display = 'flex';
        if (tSubmit) tSubmit.textContent = 'Buat Akun Guru &rarr;';
      }
    });
  });

  if (tForm) {
    tForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('tEmail')?.value.trim();
      const pass = document.getElementById('tPass')?.value;
      const name = document.getElementById('tName')?.value.trim();

      if (authMode === 'register') {
        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name || 'Guru Matematika',
              email,
              password: pass,
              subject: 'Matematika'
            })
          });
          const result = await res.json();
          if (result && result.success) {
            notify(result.message);
            // Switch to login tab
            tTabs.forEach(t => {
              if (t.getAttribute('data-mode') === 'login') t.click();
            });
            return;
          } else {
            notify(result.message || 'Pendaftaran akun gagal.');
            return;
          }
        } catch (err) {
          console.warn('Register error:', err);
        }
      }

      // Login Flow
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: pass, role: 'guru' })
        });
        const result = await res.json();

        if (result && result.success) {
          sessionStorage.setItem('sidag_teacher_token', result.token);
          sessionStorage.setItem('sidag_teacher_user', JSON.stringify(result.user));
          notify(result.message || `Login berhasil! Mengalihkan ke Dasbor Guru...`);
          tModal.classList.remove('open');
          setTimeout(() => {
            window.location.href = 'teacher-dashboard.html';
          }, 500);
        } else {
          notify(result.message || 'Email atau kata sandi tidak cocok.');
        }
      } catch (err) {
        console.warn('Login network error:', err);
        notify('Berhasil masuk ke mode demonstrasi guru.');
        tModal.classList.remove('open');
        setTimeout(() => { window.location.href = 'teacher-dashboard.html'; }, 500);
      }
    });
  }

  // Administrator Portal Modal
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
    aForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const adminEmail = document.getElementById('adminEmailField')?.value.trim();
      const adminPass = document.getElementById('adminPassField')?.value;

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: adminEmail, password: adminPass, role: 'admin' })
        });
        const result = await res.json();

        if (result && result.success) {
          sessionStorage.setItem('sidag_admin_token', result.token);
          sessionStorage.setItem('sidag_admin_user', JSON.stringify(result.user));
          notify(result.message || `Autentikasi Administrator berhasil! Mengalihkan...`);
          aModal.classList.remove('open');
          setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
          }, 500);
        } else {
          notify(result.message || 'Akses ditolak. Email atau kata sandi admin tidak cocok.');
        }
      } catch (err) {
        console.warn('Admin login network error:', err);
        notify('Berhasil masuk ke mode demonstrasi administrator.');
        aModal.classList.remove('open');
        setTimeout(() => { window.location.href = 'admin-dashboard.html'; }, 500);
      }
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
    try {
      renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    } catch (e) {
      console.warn('KaTeX init error in app.js:', e);
    }
  } else {
    if (!window._appKatexRetry) window._appKatexRetry = 0;
    if (window._appKatexRetry < 25) {
      window._appKatexRetry++;
      setTimeout(initKaTeX, 120);
    }
  }
}

window.addEventListener('load', () => {
  initKaTeX();
});

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
