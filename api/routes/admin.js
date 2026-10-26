/**
 * SiDag - Administrator API Routes
 * PRD 2.1 A (F-05, F-06), 4.3 Alur Admin, 6.1-6.2 Schema
 * Full Control: Teacher Management CRUD, System Audit Trail, Global Proctoring, Master Data
 */

const store = require('../db/store');

function handleAdminRoutes(req, res, pathParts, query, body) {
  const method = req.method;
  const resource = pathParts[0]; // overview, teachers, proctoring, audit-logs, master
  const subId = pathParts[1];    // teacher ID or sub-resource
  const subAction = pathParts[2]; // status, reset-password, etc.

  // 1. GET /api/admin/overview or GET /api/admin/stats
  if (method === 'GET' && (resource === 'overview' || resource === 'stats')) {
    const users = store.getTable('users').filter(u => u.role === 'guru');
    const assessments = store.getTable('assessments');
    const attempts = store.getTable('attempts');
    const proctorEvents = store.getTable('proctoring_events');

    const totalTeachers = users.length;
    const activeTeachers = users.filter(u => u.status === 'aktif').length;
    const inactiveTeachers = users.filter(u => u.status === 'nonaktif').length;
    const runningAssessments = assessments.filter(a => a.status === 'terbit').length;
    const totalAttempts = attempts.length;
    const totalViolations = proctorEvents.length;

    return res.json(200, {
      success: true,
      data: {
        teachers: {
          total: totalTeachers,
          active: activeTeachers,
          inactive: inactiveTeachers
        },
        assessments: {
          total: assessments.length,
          running: runningAssessments,
          draft: assessments.filter(a => a.status === 'draf').length
        },
        attempts: {
          total: totalAttempts,
          completed: attempts.filter(a => a.status === 'selesai').length
        },
        proctoring: {
          total_violations: totalViolations,
          high_severity: proctorEvents.filter(p => p.severity === 'berat').length
        },
        system: {
          status: 'Optimal',
          uptime: Math.round(process.uptime()) + ' detik',
          node_version: process.version,
          memory_usage: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB'
        }
      }
    });
  }

  // 2. TEACHERS MANAGEMENT
  if (resource === 'teachers') {
    const users = store.getTable('users');
    const assessments = store.getTable('assessments');

    // GET /api/admin/teachers (List with search & filter)
    if (method === 'GET' && !subId) {
      const search = (query.search || '').toLowerCase();
      const statusFilter = query.status || 'all';
      const subjectFilter = query.subject || 'all';

      let teachers = users.filter(u => u.role === 'guru');

      if (statusFilter !== 'all') {
        teachers = teachers.filter(t => t.status === statusFilter);
      }

      if (subjectFilter !== 'all') {
        teachers = teachers.filter(t => (t.subject || '').toLowerCase().includes(subjectFilter.toLowerCase()));
      }

      if (search) {
        teachers = teachers.filter(t =>
          (t.name || '').toLowerCase().includes(search) ||
          (t.email || '').toLowerCase().includes(search) ||
          (t.nip || '').includes(search)
        );
      }

      // Append assessmentsCount
      const result = teachers.map(t => {
        const count = assessments.filter(a => a.teacher_id === t.id).length;
        const safe = { ...t, assessmentsCount: count || t.assessmentsCount || 0 };
        delete safe.password_hash;
        return safe;
      });

      return res.json(200, {
        success: true,
        count: result.length,
        data: result
      });
    }

    // POST /api/admin/teachers (Create new teacher)
    if (method === 'POST' && !subId) {
      const { name, nip, email, subject, classes, password } = body || {};
      if (!name || !email) {
        return res.json(400, { success: false, message: 'Nama lengkap dan email wajib diisi.' });
      }

      const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.json(409, { success: false, message: 'Email guru ini sudah terdaftar dalam sistem.' });
      }

      const newId = 'T' + String(users.length + 1).padStart(2, '0');
      const newTeacher = {
        id: newId,
        name,
        nip: nip || '-',
        email,
        password_hash: password || 'guru123',
        role: 'guru',
        subject: subject || 'Matematika',
        classes: classes || 'Kelas XI',
        status: 'aktif',
        created_at: new Date().toISOString()
      };

      users.push(newTeacher);
      store.persist();
      store.logAudit('Administrator SiDag', 'Admin', `Menambahkan akun guru baru: ${name}`);

      const safe = { ...newTeacher };
      delete safe.password_hash;

      return res.json(201, {
        success: true,
        message: `Akun guru ${name} berhasil ditambahkan.`,
        data: safe
      });
    }

    // GET /api/admin/teachers/:id
    if (method === 'GET' && subId) {
      const teacher = users.find(u => u.id === subId && u.role === 'guru');
      if (!teacher) {
        return res.json(404, { success: false, message: 'Akun guru tidak ditemukan.' });
      }
      const count = assessments.filter(a => a.teacher_id === teacher.id).length;
      const safe = { ...teacher, assessmentsCount: count };
      delete safe.password_hash;
      return res.json(200, { success: true, data: safe });
    }

    // PUT /api/admin/teachers/:id (Update)
    if (method === 'PUT' && subId) {
      const teacher = users.find(u => u.id === subId && u.role === 'guru');
      if (!teacher) {
        return res.json(404, { success: false, message: 'Akun guru tidak ditemukan.' });
      }

      const { name, nip, email, subject, classes, status } = body || {};
      if (name) teacher.name = name;
      if (nip) teacher.nip = nip;
      if (email) teacher.email = email;
      if (subject) teacher.subject = subject;
      if (classes) teacher.classes = classes;
      if (status) teacher.status = status;

      store.persist();
      store.logAudit('Administrator SiDag', 'Admin', `Mengubah data akun guru: ${teacher.name}`);

      const safe = { ...teacher };
      delete safe.password_hash;
      return res.json(200, {
        success: true,
        message: `Data guru ${teacher.name} berhasil diperbarui.`,
        data: safe
      });
    }

    // PATCH /api/admin/teachers/:id/status (Toggle Status Aktif/Nonaktif)
    if (method === 'PATCH' && subId && subAction === 'status') {
      const teacher = users.find(u => u.id === subId && u.role === 'guru');
      if (!teacher) {
        return res.json(404, { success: false, message: 'Akun guru tidak ditemukan.' });
      }

      const nextStatus = body && body.status ? body.status : (teacher.status === 'aktif' ? 'nonaktif' : 'aktif');
      teacher.status = nextStatus;

      store.persist();
      store.logAudit(
        'Administrator SiDag',
        'Admin',
        `${nextStatus === 'aktif' ? 'Mengaktifkan' : 'Menonaktifkan'} akun guru: ${teacher.name}`
      );

      return res.json(200, {
        success: true,
        message: `Status akun guru ${teacher.name} diubah menjadi ${nextStatus}.`,
        status: nextStatus
      });
    }

    // POST /api/admin/teachers/:id/reset-password
    if (method === 'POST' && subId && subAction === 'reset-password') {
      const teacher = users.find(u => u.id === subId && u.role === 'guru');
      if (!teacher) {
        return res.json(404, { success: false, message: 'Akun guru tidak ditemukan.' });
      }

      const newPass = (body && body.new_password) || 'guru123';
      teacher.password_hash = newPass;

      store.persist();
      store.logAudit('Administrator SiDag', 'Admin', `Mereset password akun guru: ${teacher.name}`);

      return res.json(200, {
        success: true,
        message: `Password guru ${teacher.name} berhasil direset ke password standar.`
      });
    }

    // DELETE /api/admin/teachers/:id
    if (method === 'DELETE' && subId) {
      const idx = users.findIndex(u => u.id === subId && u.role === 'guru');
      if (idx === -1) {
        return res.json(404, { success: false, message: 'Akun guru tidak ditemukan.' });
      }

      const deleted = users.splice(idx, 1)[0];
      store.persist();
      store.logAudit('Administrator SiDag', 'Admin', `Menghapus akun guru: ${deleted.name}`);

      return res.json(200, {
        success: true,
        message: `Akun guru ${deleted.name} berhasil dihapus dari sistem.`
      });
    }
  }

  // 3. PROCTORING LOGS
  if (resource === 'proctoring') {
    const events = store.getTable('proctoring_events');
    if (method === 'DELETE') {
      events.length = 0;
      store.persist();
      store.logAudit('Administrator SiDag', 'Admin', 'Mengosongkan log integritas anti-cheat global');
      return res.json(200, { success: true, message: 'Log proctoring berhasil dikosongkan.' });
    }
    const search = (query.search || '').toLowerCase();
    const severity = query.severity || 'all';

    let filtered = [...events];
    if (severity !== 'all') {
      filtered = filtered.filter(e => e.severity === severity);
    }
    if (search) {
      filtered = filtered.filter(e =>
        (e.student_name || '').toLowerCase().includes(search) ||
        (e.class_name || '').toLowerCase().includes(search) ||
        (e.violation_text || '').toLowerCase().includes(search)
      );
    }

    return res.json(200, {
      success: true,
      count: filtered.length,
      data: filtered
    });
  }

  // 4. AUDIT LOGS
  if (resource === 'audit-logs') {
    const logs = store.getTable('audit_logs');
    if (method === 'DELETE') {
      logs.length = 0;
      store.persist();
      return res.json(200, { success: true, message: 'Log audit sistem berhasil dikosongkan.' });
    }
    const search = (query.search || '').toLowerCase();
    const role = query.role || 'all';

    let filtered = [...logs];
    if (role !== 'all') {
      filtered = filtered.filter(l => l.role.toLowerCase() === role.toLowerCase());
    }
    if (search) {
      filtered = filtered.filter(l =>
        (l.actor || '').toLowerCase().includes(search) ||
        (l.action || '').toLowerCase().includes(search) ||
        (l.ip || '').includes(search)
      );
    }

    return res.json(200, {
      success: true,
      count: filtered.length,
      data: filtered
    });
  }

  // 5. MASTER DATA (Classes & Students Full CRUD)
  if (resource === 'master') {
    const subMaster = pathParts[1]; // classes | students
    const masterId = pathParts[2];  // ID for single item operations

    if (subMaster === 'classes') {
      const classes = store.getTable('classes');
      const students = store.getTable('students');

      if (method === 'GET' && !masterId) {
        const enriched = classes.map(cls => ({
          ...cls,
          student_count: students.filter(s => s.class_id === cls.id || s.class === cls.name).length || cls.student_count || 0
        }));
        return res.json(200, { success: true, count: enriched.length, data: enriched });
      }

      if (method === 'POST' && !masterId) {
        const { name, grade, academic_year, homeroom } = body || {};
        if (!name) return res.json(400, { success: false, message: 'Nama kelas wajib diisi.' });
        const newClass = {
          id: 'CLS-' + String(classes.length + 1).padStart(2, '0'),
          teacher_id: 'T01',
          name,
          grade: grade || 'Kelas XI',
          academic_year: academic_year || '2026/2027 Ganjil',
          homeroom: homeroom || 'Belum Ditugaskan',
          student_count: 0
        };
        classes.push(newClass);
        store.persist();
        store.logAudit('Administrator SiDag', 'Admin', `Menambahkan data master rombel: ${name}`);
        return res.json(201, { success: true, message: `Kelas ${name} berhasil dibuat.`, data: newClass });
      }

      if (method === 'PUT' && masterId) {
        const cls = classes.find(c => c.id === masterId);
        if (!cls) return res.json(404, { success: false, message: 'Kelas tidak ditemukan.' });
        const { name, grade, academic_year, homeroom } = body || {};
        if (name) cls.name = name;
        if (grade) cls.grade = grade;
        if (academic_year) cls.academic_year = academic_year;
        if (homeroom) cls.homeroom = homeroom;
        store.persist();
        store.logAudit('Administrator SiDag', 'Admin', `Memperbarui data master kelas: ${cls.name}`);
        return res.json(200, { success: true, message: 'Data kelas berhasil diperbarui.', data: cls });
      }

      if (method === 'DELETE' && masterId) {
        const idx = classes.findIndex(c => c.id === masterId);
        if (idx === -1) return res.json(404, { success: false, message: 'Kelas tidak ditemukan.' });
        const deleted = classes.splice(idx, 1)[0];
        store.persist();
        store.logAudit('Administrator SiDag', 'Admin', `Menghapus master rombel: ${deleted.name}`);
        return res.json(200, { success: true, message: `Kelas ${deleted.name} berhasil dihapus.` });
      }
    }

    if (subMaster === 'students') {
      const students = store.getTable('students');

      if (method === 'GET' && !masterId) {
        const classFilter = query.class || 'all';
        let list = [...students];
        if (classFilter !== 'all') {
          list = list.filter(s => s.class_id === classFilter || s.class === classFilter);
        }
        return res.json(200, { success: true, count: list.length, data: list });
      }

      if (method === 'POST' && !masterId) {
        const { name, class_id, class: className, roll, email } = body || {};
        if (!name) return res.json(400, { success: false, message: 'Nama siswa wajib diisi.' });
        const newStudent = {
          id: 'S' + String(students.length + 1).padStart(2, '0'),
          name,
          class_id: class_id || 'CLS-01',
          class: className || 'XI MIPA 2',
          roll: roll || '-',
          email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@siswa.sman7banjarmasin.sch.id`,
          created_at: new Date().toISOString()
        };
        students.push(newStudent);
        store.persist();
        store.logAudit('Administrator SiDag', 'Admin', `Menambahkan master siswa: ${name}`);
        return res.json(201, { success: true, message: `Siswa ${name} berhasil ditambahkan.`, data: newStudent });
      }

      if (method === 'PUT' && masterId) {
        const s = students.find(st => st.id === masterId);
        if (!s) return res.json(404, { success: false, message: 'Siswa tidak ditemukan.' });
        const { name, class_id, class: className, roll, email } = body || {};
        if (name) s.name = name;
        if (class_id) s.class_id = class_id;
        if (className) s.class = className;
        if (roll) s.roll = roll;
        if (email) s.email = email;
        store.persist();
        store.logAudit('Administrator SiDag', 'Admin', `Memperbarui master siswa: ${s.name}`);
        return res.json(200, { success: true, message: 'Data siswa berhasil diperbarui.', data: s });
      }

      if (method === 'DELETE' && masterId) {
        const idx = students.findIndex(st => st.id === masterId);
        if (idx === -1) return res.json(404, { success: false, message: 'Siswa tidak ditemukan.' });
        const deleted = students.splice(idx, 1)[0];
        store.persist();
        store.logAudit('Administrator SiDag', 'Admin', `Menghapus master siswa: ${deleted.name}`);
        return res.json(200, { success: true, message: `Siswa ${deleted.name} berhasil dihapus.` });
      }
    }
  }

  return res.json(404, { success: false, message: 'Endpoint admin tidak ditemukan.' });
}

module.exports = handleAdminRoutes;
