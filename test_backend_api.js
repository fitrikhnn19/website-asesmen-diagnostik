const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const TEST_PORT = parseInt(process.env.TEST_PORT || process.env.PORT || '3000', 10);
const TEST_HOST = process.env.TEST_HOST || '127.0.0.1';

function request(method, reqPath, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const reqHeaders = { ...headers };
    let postData = null;
    if (body) {
      postData = typeof body === 'string' ? body : JSON.stringify(body);
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(postData);
    }

    const options = {
      hostname: TEST_HOST,
      port: TEST_PORT,
      path: reqPath,
      method,
      headers: reqHeaders
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch(e) {
          json = data;
        }
        resolve({ status: res.statusCode, data: json });
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function waitForServer(maxAttempts = 20, delayMs = 250) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await request('GET', '/api/health');
      if (res.status === 200) return true;
    } catch (e) {
      // Waiting for server to boot
    }
    await new Promise(r => setTimeout(r, delayMs));
  }
  return false;
}

const server = require('./serve.js');

async function runTests() {
  console.log('--- STARTING COMPREHENSIVE BACKEND INTEGRATION & CRUD TESTS ---');
  let passed = 0;
  let failed = 0;
  let startedLocally = false;

  try {
    // Check if server is already running
    let serverReady = await waitForServer(2, 100);
    if (!serverReady) {
      console.log(`[INFO] Server not running on ${TEST_HOST}:${TEST_PORT}. Starting in-process server...`);
      await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(TEST_PORT, TEST_HOST, () => {
          startedLocally = true;
          console.log(`[INFO] In-process server listening on http://${TEST_HOST}:${TEST_PORT}`);
          resolve();
        });
      });
    }

  function assert(condition, testName, extraInfo = '') {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} - ${extraInfo}`);
      failed++;
    }
  }

  // 1. Static file check
  const rRoot = await request('GET', '/');
    assert(rRoot.status === 200 && typeof rRoot.data === 'string', 'GET / serves HTML index');

    // 2. Auth tests
    const rAdminLogin = await request('POST', '/api/auth/login', {
      email: 'admin@sidag.sch.id',
      password: 'admin123',
      role: 'admin'
    });
    assert(rAdminLogin.status === 200 && rAdminLogin.data.success, 'POST /api/auth/login (Admin Login)');

    const rTeacherLogin = await request('POST', '/api/auth/login', {
      email: 'guru@sidag.sch.id',
      password: 'guru123',
      role: 'guru'
    });
    assert(rTeacherLogin.status === 200 && rTeacherLogin.data.success, 'POST /api/auth/login (Teacher Login)');

    // 3. Admin CRUD
    // Teachers CRUD
    const rCreateTeacher = await request('POST', '/api/admin/teachers', {
      name: 'Ibu Rahmawati, M.Pd.',
      email: 'rahma@sidag.sch.id',
      nip: '198501012010012001',
      subject: 'Matematika Peminatan',
      classes: ['XI MIPA 1', 'XI MIPA 2']
    });
    assert(rCreateTeacher.status === 201 && rCreateTeacher.data.success, 'POST /api/admin/teachers (Create Teacher)');
    const newTeacherId = rCreateTeacher.data?.data?.id;

    if (newTeacherId) {
      const rUpdateTeacher = await request('PUT', `/api/admin/teachers/${newTeacherId}`, {
        name: 'Ibu Rahmawati, M.Pd. (Revisi)',
        subject: 'Matematika Tingkat Lanjut'
      });
      assert(rUpdateTeacher.status === 200 && rUpdateTeacher.data.success, 'PUT /api/admin/teachers/:id (Update Teacher)');

      const rToggleStatus = await request('PATCH', `/api/admin/teachers/${newTeacherId}/status`);
      assert(rToggleStatus.status === 200 && rToggleStatus.data.success, 'PATCH /api/admin/teachers/:id/status (Toggle Status)');

      const rResetPwd = await request('POST', `/api/admin/teachers/${newTeacherId}/reset-password`);
      assert(rResetPwd.status === 200 && rResetPwd.data.success, 'POST /api/admin/teachers/:id/reset-password');

      const rDelTeacher = await request('DELETE', `/api/admin/teachers/${newTeacherId}`);
      assert(rDelTeacher.status === 200 && rDelTeacher.data.success, 'DELETE /api/admin/teachers/:id (Delete Teacher)');
    }

    // Master Classes CRUD
    const rCreateMasterClass = await request('POST', '/api/admin/master/classes', {
      name: 'XI MIPA 9',
      grade: 'Kelas XI',
      academic_year: '2026/2027 Ganjil',
      homeroom: 'Guru Pembina',
      student_count: 32
    });
    assert(rCreateMasterClass.status === 201 && rCreateMasterClass.data.success, 'POST /api/admin/master/classes (Create Master Class)');
    const masterClassId = rCreateMasterClass.data?.data?.id;

    if (masterClassId) {
      const rUpdMasterClass = await request('PUT', `/api/admin/master/classes/${masterClassId}`, {
        homeroom: 'Wali Kelas Definitif'
      });
      assert(rUpdMasterClass.status === 200 && rUpdMasterClass.data.success, 'PUT /api/admin/master/classes/:id (Update Master Class)');

      const rDelMasterClass = await request('DELETE', `/api/admin/master/classes/${masterClassId}`);
      assert(rDelMasterClass.status === 200 && rDelMasterClass.data.success, 'DELETE /api/admin/master/classes/:id (Delete Master Class)');
    }

    // Master Students CRUD
    const rCreateMasterStudent = await request('POST', '/api/admin/master/students', {
      nis: 'NIS-9999',
      name: 'Siswa Percobaan Admin',
      class_name: 'XI MIPA 2'
    });
    assert(rCreateMasterStudent.status === 201 && rCreateMasterStudent.data.success, 'POST /api/admin/master/students (Create Master Student)');
    const masterStudentId = rCreateMasterStudent.data?.data?.id;

    if (masterStudentId) {
      const rUpdMasterStudent = await request('PUT', `/api/admin/master/students/${masterStudentId}`, {
        name: 'Siswa Percobaan Terupdate'
      });
      assert(rUpdMasterStudent.status === 200 && rUpdMasterStudent.data.success, 'PUT /api/admin/master/students/:id (Update Master Student)');

      const rDelMasterStudent = await request('DELETE', `/api/admin/master/students/${masterStudentId}`);
      assert(rDelMasterStudent.status === 200 && rDelMasterStudent.data.success, 'DELETE /api/admin/master/students/:id (Delete Master Student)');
    }

    // 4. Teacher CRUD
    const rTeacherOverview = await request('GET', '/api/teacher/overview');
    assert(rTeacherOverview.status === 200 && rTeacherOverview.data.success, 'GET /api/teacher/overview');

    // Teacher Classes CRUD
    const rTCreateClass = await request('POST', '/api/teacher/classes', {
      name: 'XI MIPA 8',
      grade: 'Kelas XI',
      academicYear: '2026/2027 Ganjil',
      homeroom: 'Guru Pengampu'
    });
    assert(rTCreateClass.status === 201 && rTCreateClass.data.success, 'POST /api/teacher/classes');
    const tClassId = rTCreateClass.data?.data?.id;

    if (tClassId) {
      const rTUpdClass = await request('PUT', `/api/teacher/classes/${tClassId}`, {
        homeroom: 'Wali Kelas Baru'
      });
      assert(rTUpdClass.status === 200 && rTUpdClass.data.success, 'PUT /api/teacher/classes/:id');

      const rTDelClass = await request('DELETE', `/api/teacher/classes/${tClassId}`);
      assert(rTDelClass.status === 200 && rTDelClass.data.success, 'DELETE /api/teacher/classes/:id');
    }

    // Teacher Students CRUD
    const rTCreateStudent = await request('POST', '/api/teacher/students', {
      nis: 'S9999',
      name: 'Murid Guru Test',
      class_name: 'XI MIPA 2',
      status: 'Aktif'
    });
    assert(rTCreateStudent.status === 201 && rTCreateStudent.data.success, 'POST /api/teacher/students');

    const rTUpdStudent = await request('PUT', '/api/teacher/students/S9999', {
      name: 'Murid Guru Diperbarui',
      class_name: 'XI MIPA 2',
      status: 'Jujur'
    });
    assert(rTUpdStudent.status === 200 && rTUpdStudent.data.success, 'PUT /api/teacher/students/:id');

    const rTDelStudent = await request('DELETE', '/api/teacher/students/S9999');
    assert(rTDelStudent.status === 200 && rTDelStudent.data.success, 'DELETE /api/teacher/students/:id');

    // Teacher Questions CRUD
    const rTCreateQ = await request('POST', '/api/teacher/questions', {
      topic: 'Transformasi Geometri',
      difficulty: 'Sedang',
      stem_latex: 'Sebuah segitiga $ABC$ diputar $90^\\circ$ searah jarum jam...',
      tier1_options: [
        { letter: 'A', text: 'Bayangan A', is_correct: true },
        { letter: 'B', text: 'Bayangan B', is_correct: false }
      ],
      tier2_reasons: [
        { letter: 'A', text: 'Menggunakan matriks rotasi standar', is_correct: true },
        { letter: 'B', text: 'Miskonsepsi arah rotasi', is_correct: false, misconception_id: 'M01' }
      ]
    });
    assert(rTCreateQ.status === 201 && rTCreateQ.data.success, 'POST /api/teacher/questions');
    const createdQId = rTCreateQ.data?.data?.id;

    if (createdQId) {
      const rTUpdQ = await request('PUT', `/api/teacher/questions/${createdQId}`, {
        stem_latex: 'Sebuah segitiga $ABC$ diputar $180^\\circ$...'
      });
      assert(rTUpdQ.status === 200 && rTUpdQ.data.success, 'PUT /api/teacher/questions/:id');

      const rTDelQ = await request('DELETE', `/api/teacher/questions/${createdQId}`);
      assert(rTDelQ.status === 200 && rTDelQ.data.success, 'DELETE /api/teacher/questions/:id');
    }

    // Teacher Follow-up Notes CRUD
    const rCreateNote = await request('POST', '/api/teacher/follow-up-notes', {
      student_id: 'S01',
      student_name: 'Aditya Pratama (XI MIPA 2)',
      concept: 'Refleksi Matriks',
      note: 'Diberikan latihan soal penguatan konsep perkalian matriks.'
    });
    assert(rCreateNote.status === 201 && rCreateNote.data.success, 'POST /api/teacher/follow-up-notes');
    const noteId = rCreateNote.data?.data?.id;

    if (noteId) {
      const rUpdNote = await request('PUT', `/api/teacher/follow-up-notes/${noteId}`, {
        note: 'Siswa telah menyelesaikan latihan penguatan dengan nilai sempurna.'
      });
      assert(rUpdNote.status === 200 && rUpdNote.data.success, 'PUT /api/teacher/follow-up-notes/:id');

      const rDelNote = await request('DELETE', `/api/teacher/follow-up-notes/${noteId}`);
      assert(rDelNote.status === 200 && rDelNote.data.success, 'DELETE /api/teacher/follow-up-notes/:id');
    }

    // 5. Student Workflow Tests
    const rVerifyToken = await request('POST', '/api/student/verify-token', {
      token: 'DIAGNO-2026'
    });
    assert(rVerifyToken.status === 200 && rVerifyToken.data.success, 'POST /api/student/verify-token (Valid Token)');

    const rStartExam = await request('POST', '/api/student/start-exam', {
      token: 'DIAGNO-2026',
      nis: 'S01',
      name: 'Aditya Pratama'
    });
    assert(rStartExam.status === 201 && rStartExam.data.success, 'POST /api/student/start-exam (Start Exam Attempt)');
    const attemptId = rStartExam.data?.data?.attempt_id || rStartExam.data?.data?.attempt?.id;
    const firstQ = rStartExam.data?.data?.questions?.[0];

    if (attemptId && firstQ) {
      // Autosave response
      const rSaveResp = await request('POST', `/api/student/exam/${attemptId}/save-response`, {
        question_id: firstQ.id,
        tier1_answer: 'A',
        tier2_reason: 'A',
        tier3_certainty: 'yakin'
      });
      assert(rSaveResp.status === 200 && rSaveResp.data.success, 'POST /api/student/exam/:attemptId/save-response');

      // Record proctor incident
      const rProctor = await request('POST', `/api/student/exam/${attemptId}/proctor-event`, {
        event_type: 'tab_switch',
        violation_text: 'Pindah Tab Browser (1 detik)',
        severity: 'ringan'
      });
      assert((rProctor.status === 200 || rProctor.status === 201) && rProctor.data.success, 'POST /api/student/exam/:attemptId/proctor-event');

      // Submit exam
      const rSubmit = await request('POST', `/api/student/exam/${attemptId}/submit`, {
        responses: [
          {
            question_id: firstQ.id,
            tier1_answer: 'A',
            tier2_reason: 'A',
            tier3_certainty: 'yakin'
          }
        ]
      });
      assert(rSubmit.status === 200 && rSubmit.data.success && rSubmit.data.data?.concept_profile, 'POST /api/student/exam/:attemptId/submit (3-Tier Engine Evaluation)');

      // Get exam result
      const rResult = await request('GET', `/api/student/exam/${attemptId}/result`);
      assert(rResult.status === 200 && rResult.data.success, 'GET /api/student/exam/:attemptId/result');
    }

    console.log(`\n========================================`);
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================`);

    if (startedLocally && server.listening) {
      console.log('[INFO] Closing in-process test server...');
      await new Promise(resolve => server.close(resolve));
    }

    process.exit(failed > 0 ? 1 : 0);
  } catch(err) {
    console.error('Test execution error:', err);
    if (startedLocally && server.listening) {
      await new Promise(resolve => server.close(resolve));
    }
    process.exit(1);
  }
}

runTests();
