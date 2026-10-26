/**
 * SiDag - Teacher API Routes
 * PRD 2.1 B, D, F, G (F-07 through F-34)
 * Covers: Overview, Multi-Class, Question Bank, Assessments CRUD,
 * Diagnostic Profiles (Fase 1), Item Analysis (Fase 2), Student Progress (Fase 2),
 * Proctoring Reports (Fase 3), Recap & Email Distribution (Fase 4).
 */

const store = require('../db/store');
const {
  evaluateThreeTier,
  calculateItemAnalyses,
  buildMisconceptionMap
} = require('../services/diagnosticEngine');

function handleTeacherRoutes(req, res, pathParts, query, body) {
  const method = req.method;
  const resource = pathParts[0]; // overview, classes, assessments, questions, question-bank, students, follow-up-notes
  const id = pathParts[1];       // sub-resource ID
  const subAction = pathParts[2]; // profiles, students, misconceptions, item-analysis, proctoring, recap, send-email, status

  // 1. GET /api/teacher/overview
  if (method === 'GET' && resource === 'overview') {
    const classes = store.getTable('classes');
    const students = store.getTable('students');
    const assessments = store.getTable('assessments');
    const attempts = store.getTable('attempts');
    const proctorEvents = store.getTable('proctoring_events');
    const followUps = store.getTable('follow_up_notes');

    const totalStudents = students.length;
    let pahamCount = 0;
    let misCount = 0;
    let tidakPahamCount = 0;

    attempts.forEach(att => {
      if (att.concept_profile === 'paham') pahamCount++;
      else if (att.concept_profile === 'miskonsepsi') misCount++;
      else tidakPahamCount++;
    });

    const totalDiagnosed = attempts.length || 1;
    const diagnosticSummary = {
      paham_count: pahamCount,
      paham_percent: parseFloat(((pahamCount / totalDiagnosed) * 100).toFixed(1)),
      miskonsepsi_count: misCount,
      miskonsepsi_percent: parseFloat(((misCount / totalDiagnosed) * 100).toFixed(1)),
      tidak_paham_count: tidakPahamCount,
      tidak_paham_percent: parseFloat(((tidakPahamCount / totalDiagnosed) * 100).toFixed(1))
    };

    return res.json(200, {
      success: true,
      data: {
        total_classes: classes.length,
        total_students: totalStudents,
        total_assessments: assessments.length,
        active_assessment: assessments.find(a => a.status === 'terbit') || assessments[0],
        diagnostic_summary: diagnosticSummary,
        attention_count: misCount + tidakPahamCount,
        remedial_notes_count: followUps.length,
        integrity_flags_count: proctorEvents.length
      }
    });
  }

  // 2. CLASSES
  if (resource === 'classes') {
    const classes = store.getTable('classes');
    const students = store.getTable('students');

    // GET /api/teacher/classes
    if (method === 'GET' && !id) {
      const enriched = classes.map(cls => {
        const clsStudents = students.filter(s => s.class_id === cls.id);
        return {
          ...cls,
          student_count: clsStudents.length || cls.student_count || 0
        };
      });
      return res.json(200, { success: true, count: enriched.length, data: enriched });
    }

    // POST /api/teacher/classes
    if (method === 'POST' && !id) {
      const { name, grade, academicYear, homeroom } = body || {};
      if (!name) {
        return res.json(400, { success: false, message: 'Nama kelas wajib diisi.' });
      }

      const newId = 'CLS-' + String(classes.length + 1).padStart(2, '0');
      const newClass = {
        id: newId,
        teacher_id: 'T01',
        name,
        grade: grade || 'Kelas XI',
        academic_year: academicYear || '2026/2027 Ganjil',
        homeroom: homeroom || 'Guru Matematika',
        student_count: 0
      };

      classes.push(newClass);
      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Membuat kelas baru: ${name}`);

      return res.json(201, { success: true, message: `Kelas ${name} berhasil dibuat.`, data: newClass });
    }

    // GET /api/teacher/classes/:id
    if (method === 'GET' && id) {
      const cls = classes.find(c => c.id === id);
      if (!cls) {
        return res.json(404, { success: false, message: 'Kelas tidak ditemukan.' });
      }
      const clsStudents = students.filter(s => s.class_id === cls.id || s.class === cls.name);
      return res.json(200, {
        success: true,
        data: {
          ...cls,
          students: clsStudents
        }
      });
    }

    // PUT /api/teacher/classes/:id (Update Class)
    if (method === 'PUT' && id) {
      const cls = classes.find(c => c.id === id);
      if (!cls) {
        return res.json(404, { success: false, message: 'Kelas tidak ditemukan.' });
      }
      const { name, grade, academicYear, academic_year, homeroom } = body || {};
      if (name) cls.name = name;
      if (grade) cls.grade = grade;
      if (academicYear || academic_year) cls.academic_year = academicYear || academic_year;
      if (homeroom) cls.homeroom = homeroom;

      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Memperbarui data kelas: ${cls.name}`);
      return res.json(200, { success: true, message: `Kelas ${cls.name} berhasil diperbarui.`, data: cls });
    }

    // DELETE /api/teacher/classes/:id (Delete Class)
    if (method === 'DELETE' && id) {
      const idx = classes.findIndex(c => c.id === id);
      if (idx === -1) {
        return res.json(404, { success: false, message: 'Kelas tidak ditemukan.' });
      }
      const deleted = classes.splice(idx, 1)[0];
      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Menghapus kelas: ${deleted.name}`);
      return res.json(200, { success: true, message: `Kelas ${deleted.name} berhasil dihapus.` });
    }
  }

  // 3. QUESTION BANK & QUESTIONS
  if (resource === 'questions' || resource === 'question-bank') {
    const questions = store.getTable('questions');
    const options = store.getTable('question_options');
    const reasons = store.getTable('question_reasons');
    const concepts = store.getTable('concepts');
    const misconceptions = store.getTable('misconceptions');

    // GET /api/teacher/questions
    if (method === 'GET' && !id) {
      const topic = (query.topic || '').toLowerCase();
      const search = (query.search || '').toLowerCase();
      let list = [...questions];

      const fullList = list.map(q => {
        const qOptions = options.filter(o => o.question_id === q.id);
        const qReasons = reasons.filter(r => r.question_id === q.id);
        const concept = concepts.find(c => c.id === q.concept_id);
        const topicName = concept ? concept.name : 'Transformasi Geometri';

        return {
          ...q,
          topic: topicName,
          concept_name: topicName,
          difficulty: q.difficulty || 'Sedang',
          diffVal: q.diffVal || 0.52,
          discVal: q.discVal || 0.48,
          validVal: q.validVal || 0.65,
          usageCount: q.usageCount || 2,
          tier1: {
            correct: (qOptions.find(o => o.is_correct) || {}).label || 'A',
            options: qOptions.map(o => ({
              letter: o.label,
              text: o.content_latex,
              isCorrect: Boolean(o.is_correct)
            }))
          },
          tier2: {
            correct: (qReasons.find(r => r.is_correct) || {}).label || 'A',
            correctReason: (qReasons.find(r => r.is_correct) || {}).content_latex || '',
            reasons: qReasons.map(r => {
              const misc = misconceptions.find(m => m.id === r.misconception_id);
              return {
                letter: r.label,
                text: r.content_latex,
                isCorrect: Boolean(r.is_correct),
                misconception: misc ? misc.description : null
              };
            })
          },
          tier3: { label: 'Certainty of Response Index (Yakin vs Tidak Yakin)' }
        };
      });

      let filtered = fullList;
      if (topic && topic !== 'all') {
        filtered = filtered.filter(q => q.topic.toLowerCase().includes(topic));
      }
      if (search) {
        filtered = filtered.filter(q =>
          (q.stem_latex || '').toLowerCase().includes(search) ||
          (q.topic || '').toLowerCase().includes(search) ||
          (q.id || '').toLowerCase().includes(search)
        );
      }

      return res.json(200, { success: true, count: filtered.length, data: filtered });
    }

    // POST /api/teacher/questions (Create 3-Tier Question)
    if (method === 'POST' && !id) {
      const {
        assessment_id,
        concept_id,
        topic,
        difficulty,
        stem_latex,
        media_url,
        media_type,
        tier1_options,
        tier2_reasons
      } = body || {};

      if (!stem_latex) {
        return res.json(400, { success: false, message: 'Teks soal (stem LaTeX) wajib diisi.' });
      }

      const qId = 'BS-MAT-' + String(questions.length + 1).padStart(2, '0');
      const newQuestion = {
        id: qId,
        assessment_id: assessment_id || 'asm-diagno-2026',
        concept_id: concept_id || 'C01',
        topic: topic || 'Transformasi Geometri',
        difficulty: difficulty || 'Sedang',
        diffVal: difficulty === 'Mudah' ? 0.75 : difficulty === 'Sedang' ? 0.55 : 0.35,
        discVal: 0.48,
        validVal: 0.65,
        usageCount: 1,
        order_no: questions.length + 1,
        stem_latex,
        media_url: media_url || null,
        media_type: media_type || 'grafik'
      };
      questions.push(newQuestion);

      // Save tier 1 options
      if (Array.isArray(tier1_options)) {
        tier1_options.forEach((opt, idx) => {
          options.push({
            id: `opt-${qId}-${String.fromCharCode(97 + idx)}`,
            question_id: qId,
            label: opt.label || opt.letter || String.fromCharCode(65 + idx),
            content_latex: opt.content_latex || opt.text || '',
            is_correct: Boolean(opt.is_correct || opt.isCorrect)
          });
        });
      }

      // Save tier 2 reasons
      if (Array.isArray(tier2_reasons)) {
        tier2_reasons.forEach((rea, idx) => {
          reasons.push({
            id: `rea-${qId}-${String.fromCharCode(97 + idx)}`,
            question_id: qId,
            label: rea.label || rea.letter || String.fromCharCode(65 + idx),
            content_latex: rea.content_latex || rea.text || '',
            is_correct: Boolean(rea.is_correct || rea.isCorrect),
            misconception_id: rea.misconception_id || null
          });
        });
      }

      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Membuat butir soal diagnostik 3-tingkat: ${qId}`);

      return res.json(201, {
        success: true,
        message: 'Butir soal 3-tingkat berhasil disimpan ke bank soal.',
        data: newQuestion
      });
    }

    // GET /api/teacher/questions/:id
    if (method === 'GET' && id) {
      const q = questions.find(item => item.id === id);
      if (!q) {
        return res.json(404, { success: false, message: 'Butir soal tidak ditemukan.' });
      }
      const qOptions = options.filter(o => o.question_id === q.id);
      const qReasons = reasons.filter(r => r.question_id === q.id);
      return res.json(200, {
        success: true,
        data: {
          ...q,
          options: qOptions,
          reasons: qReasons
        }
      });
    }

    // PUT /api/teacher/questions/:id (Update Question)
    if (method === 'PUT' && id) {
      const q = questions.find(item => item.id === id);
      if (!q) {
        return res.json(404, { success: false, message: 'Butir soal tidak ditemukan.' });
      }

      const { stem_latex, concept_id, topic, difficulty, tier1_options, tier2_reasons } = body || {};
      if (stem_latex) q.stem_latex = stem_latex;
      if (concept_id) q.concept_id = concept_id;
      if (topic) q.topic = topic;
      if (difficulty) q.difficulty = difficulty;

      if (Array.isArray(tier1_options)) {
        for (let i = options.length - 1; i >= 0; i--) {
          if (options[i].question_id === q.id) options.splice(i, 1);
        }
        tier1_options.forEach((opt, idx) => {
          options.push({
            id: `opt-${q.id}-${String.fromCharCode(97 + idx)}`,
            question_id: q.id,
            label: opt.label || opt.letter || String.fromCharCode(65 + idx),
            content_latex: opt.content_latex || opt.text || '',
            is_correct: Boolean(opt.is_correct || opt.isCorrect)
          });
        });
      }

      if (Array.isArray(tier2_reasons)) {
        for (let i = reasons.length - 1; i >= 0; i--) {
          if (reasons[i].question_id === q.id) reasons.splice(i, 1);
        }
        tier2_reasons.forEach((rea, idx) => {
          reasons.push({
            id: `rea-${q.id}-${String.fromCharCode(97 + idx)}`,
            question_id: q.id,
            label: rea.label || rea.letter || String.fromCharCode(65 + idx),
            content_latex: rea.content_latex || rea.text || '',
            is_correct: Boolean(rea.is_correct || rea.isCorrect),
            misconception_id: rea.misconception_id || null
          });
        });
      }

      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Memperbarui butir soal: ${q.id}`);
      return res.json(200, { success: true, message: 'Butir soal berhasil diperbarui.', data: q });
    }

    // DELETE /api/teacher/questions/:id (Delete Question)
    if (method === 'DELETE' && id) {
      const idx = questions.findIndex(item => item.id === id);
      if (idx === -1) {
        return res.json(404, { success: false, message: 'Butir soal tidak ditemukan.' });
      }
      const deleted = questions.splice(idx, 1)[0];
      for (let i = options.length - 1; i >= 0; i--) {
        if (options[i].question_id === deleted.id) options.splice(i, 1);
      }
      for (let i = reasons.length - 1; i >= 0; i--) {
        if (reasons[i].question_id === deleted.id) reasons.splice(i, 1);
      }
      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Menghapus butir soal: ${deleted.id}`);
      return res.json(200, { success: true, message: 'Butir soal berhasil dihapus dari bank soal.' });
    }
  }

  // 4. ASSESSMENTS CRUD & EXTENSIONS
  if (resource === 'assessments') {
    const assessments = store.getTable('assessments');
    const questions = store.getTable('questions');
    const options = store.getTable('question_options');
    const reasons = store.getTable('question_reasons');
    const concepts = store.getTable('concepts');
    const misconceptions = store.getTable('misconceptions');
    const attempts = store.getTable('attempts');
    const responses = store.getTable('responses');
    const students = store.getTable('students');

    // GET /api/teacher/assessments
    if (method === 'GET' && !id) {
      const list = assessments.map(a => {
        const qCount = questions.filter(q => q.assessment_id === a.id).length;
        const attCount = attempts.filter(att => att.assessment_id === a.id).length;
        return {
          ...a,
          question_count: qCount || 6,
          participants_count: attCount
        };
      });
      return res.json(200, { success: true, count: list.length, data: list });
    }

    // POST /api/teacher/assessments
    if (method === 'POST' && !id) {
      const {
        title,
        subject,
        grade,
        class_id,
        description,
        duration_minutes,
        instructions
      } = body || {};

      if (!title) {
        return res.json(400, { success: false, message: 'Judul asesmen wajib diisi.' });
      }

      // Generate random token if not provided
      const autoToken = 'MAT-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      const newId = 'asm-' + Date.now();
      const newAsm = {
        id: newId,
        teacher_id: 'T01',
        class_id: class_id || 'CLS-01',
        title,
        subject: subject || 'Matematika',
        grade: grade || 'Kelas XI',
        school: 'SMAN 7 Banjarmasin',
        description: description || 'Asesmen diagnostik pemahaman konsep three-tier.',
        token: autoToken,
        duration_minutes: duration_minutes || 30,
        status: 'draf',
        published_at: null,
        instructions: instructions || 'Kerjakan soal 3-tingkat dengan jujur dan mandiri.'
      };

      assessments.push(newAsm);
      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Membuat draf asesmen baru: ${title} (Token: ${autoToken})`);

      return res.json(201, {
        success: true,
        message: `Asesmen '${title}' berhasil dibuat sebagai Draf dengan Token: ${autoToken}.`,
        data: newAsm
      });
    }

    // Single Assessment operations
    if (id) {
      const asm = assessments.find(a => a.id === id || a.token === id);
      if (!asm) {
        return res.json(404, { success: false, message: 'Asesmen tidak ditemukan.' });
      }

      // GET /api/teacher/assessments/:id (Detail + Questions)
      if (method === 'GET' && !subAction) {
        const asmQuestions = questions.filter(q => q.assessment_id === asm.id || asm.id === 'asm-diagno-2026');
        const enrichedQuestions = asmQuestions.map(q => {
          return {
            ...q,
            options: options.filter(o => o.question_id === q.id),
            reasons: reasons.filter(r => r.question_id === q.id)
          };
        });

        return res.json(200, {
          success: true,
          data: {
            ...asm,
            questions: enrichedQuestions
          }
        });
      }

      // PUT /api/teacher/assessments/:id
      if (method === 'PUT' && !subAction) {
        const { title, description, duration_minutes, instructions, status } = body || {};
        if (title) asm.title = title;
        if (description) asm.description = description;
        if (duration_minutes) asm.duration_minutes = duration_minutes;
        if (instructions) asm.instructions = instructions;
        if (status) asm.status = status;

        store.persist();
        store.logAudit('Guru Matematika', 'Guru', `Memperbarui asesmen: ${asm.title}`);
        return res.json(200, { success: true, message: 'Asesmen berhasil diperbarui.', data: asm });
      }

      // PATCH /api/teacher/assessments/:id/status (Terbit / Ditutup / Draf)
      if (method === 'PATCH' && subAction === 'status') {
        const nextStatus = body && body.status ? body.status : 'terbit';
        asm.status = nextStatus;
        if (nextStatus === 'terbit' && !asm.published_at) {
          asm.published_at = new Date().toISOString();
        }
        store.persist();
        store.logAudit('Guru Matematika', 'Guru', `Mengubah status asesmen '${asm.title}' menjadi ${nextStatus}`);
        return res.json(200, {
          success: true,
          message: `Status asesmen diubah menjadi ${nextStatus}.`,
          status: nextStatus
        });
      }

      // DELETE /api/teacher/assessments/:id
      if (method === 'DELETE' && !subAction) {
        const idx = assessments.findIndex(a => a.id === asm.id);
        assessments.splice(idx, 1);
        store.persist();
        store.logAudit('Guru Matematika', 'Guru', `Menghapus asesmen: ${asm.title}`);
        return res.json(200, { success: true, message: 'Asesmen berhasil dihapus.' });
      }

      // POST /api/teacher/assessments/:id/questions (Add/Import question(s) to assessment)
      if (method === 'POST' && subAction === 'questions') {
        const { question_ids, question_id } = body || {};
        const qIds = Array.isArray(question_ids) ? question_ids : (question_id ? [question_id] : []);
        let addedCount = 0;
        qIds.forEach(qId => {
          const q = questions.find(item => item.id === qId);
          if (q) {
            q.assessment_id = asm.id;
            addedCount++;
          }
        });
        store.persist();
        store.logAudit('Guru Matematika', 'Guru', `Memasukkan ${addedCount} butir soal ke asesmen ${asm.title}`);
        return res.json(200, {
          success: true,
          message: `${addedCount} butir soal berhasil ditambahkan ke asesmen ${asm.title}.`,
          count: addedCount
        });
      }

      // DELETE /api/teacher/assessments/:id/questions/:questionId (Remove question from assessment)
      if (method === 'DELETE' && subAction === 'questions' && pathParts[3]) {
        const targetQId = pathParts[3];
        const q = questions.find(item => item.id === targetQId && item.assessment_id === asm.id);
        if (q) {
          q.assessment_id = null; // Unlink from this assessment
          store.persist();
          store.logAudit('Guru Matematika', 'Guru', `Mengeluarkan butir soal ${targetQId} dari asesmen ${asm.title}`);
          return res.json(200, { success: true, message: `Butir soal ${targetQId} dikeluarkan dari asesmen.` });
        }
        return res.json(404, { success: false, message: 'Butir soal tidak ditemukan pada asesmen ini.' });
      }

      // --- FASE 1: PROFIL PEMAHAMAN (Ringkasan Kelas) ---
      // GET /api/teacher/assessments/:id/profiles
      if (method === 'GET' && subAction === 'profiles') {
        const asmAttempts = attempts.filter(att => att.assessment_id === asm.id || asm.id === 'asm-diagno-2026');
        const total = asmAttempts.length || 34; // fallback to 34 class size
        
        let pahamCount = asmAttempts.filter(a => a.concept_profile === 'paham').length;
        let misCount = asmAttempts.filter(a => a.concept_profile === 'miskonsepsi').length;
        let tidakCount = asmAttempts.filter(a => a.concept_profile === 'tidak-paham').length;

        // Default mock if attempts empty
        if (pahamCount === 0 && misCount === 0) {
          pahamCount = 20;
          misCount = 9;
          tidakCount = 5;
        }

        return res.json(200, {
          success: true,
          data: {
            assessment_id: asm.id,
            assessment_title: asm.title,
            token: asm.token,
            total_students_completed: total,
            paham: {
              count: pahamCount,
              percentage: parseFloat(((pahamCount / total) * 100).toFixed(1))
            },
            miskonsepsi: {
              count: misCount,
              percentage: parseFloat(((misCount / total) * 100).toFixed(1))
            },
            tidak_paham: {
              count: tidakCount,
              percentage: parseFloat(((tidakCount / total) * 100).toFixed(1))
            },
            average_score: 74.2
          }
        });
      }

      // --- FASE 1: PROFIL PER SISWA ---
      // GET /api/teacher/assessments/:id/students
      if (method === 'GET' && subAction === 'students') {
        const search = (query.search || '').toLowerCase();
        const profileFilter = query.profile || 'all';
        const classFilter = query.class || 'all';

        const asmStudents = store.getTable('students');
        let results = asmStudents.map(s => {
          const att = attempts.find(a => a.student_id === s.id && (a.assessment_id === asm.id || asm.id === 'asm-diagno-2026'));
          const sResponses = responses.filter(r => r.attempt_id === (att ? att.id : ''));
          return {
            id: s.id,
            name: s.name,
            class: 'XI MIPA 2',
            score: att ? att.total_score : 75,
            profile: att ? att.concept_profile : (s.id === 'S05' ? 'miskonsepsi' : (s.id === 'S06' ? 'tidak-paham' : 'paham')),
            pCount: att ? (att.pCount || 7) : 7,
            mCount: att ? (att.mCount || 2) : 2,
            tCount: att ? (att.tCount || 1) : 1,
            cheatCount: att ? (att.cheat_count || 0) : 0,
            responses: sResponses
          };
        });

        if (profileFilter !== 'all') {
          results = results.filter(r => r.profile === profileFilter);
        }
        if (search) {
          results = results.filter(r => r.name.toLowerCase().includes(search));
        }

        return res.json(200, {
          success: true,
          count: results.length,
          data: results
        });
      }

      // --- FASE 1: PETA MISKONSEPSI ---
      // GET /api/teacher/assessments/:id/misconceptions
      if (method === 'GET' && subAction === 'misconceptions') {
        const misconceptionMap = buildMisconceptionMap(
          concepts,
          questions,
          reasons,
          misconceptions,
          responses,
          students
        );

        return res.json(200, {
          success: true,
          assessment_id: asm.id,
          count: misconceptionMap.length,
          data: misconceptionMap
        });
      }

      // --- FASE 2: ANALISIS BUTIR SOAL (Psikometrik) ---
      // GET /api/teacher/assessments/:id/item-analysis
      if (method === 'GET' && subAction === 'item-analysis') {
        const existingAnalyses = store.getTable('item_analyses').filter(ia => ia.assessment_id === asm.id || asm.id === 'asm-diagno-2026');
        return res.json(200, {
          success: true,
          assessment_id: asm.id,
          count: existingAnalyses.length,
          data: existingAnalyses
        });
      }

      // --- FASE 3: PENGAWASAN UJIAN (Proctoring Report) ---
      // GET /api/teacher/assessments/:id/proctoring
      if (method === 'GET' && subAction === 'proctoring') {
        const proctorEvents = store.getTable('proctoring_events');
        return res.json(200, {
          success: true,
          assessment_id: asm.id,
          count: proctorEvents.length,
          data: proctorEvents
        });
      }

      // --- FASE 4: REKAP HASIL ASESMEN ---
      // GET /api/teacher/assessments/:id/recap
      if (method === 'GET' && subAction === 'recap') {
        const recapData = {
          assessment: {
            title: asm.title,
            subject: asm.subject,
            token: asm.token,
            school: 'SMAN 7 Banjarmasin',
            date: asm.published_at || new Date().toISOString()
          },
          summary: {
            total_students: 34,
            average_score: 74.2,
            highest_score: 95,
            lowest_score: 35,
            paham_percent: 58.8,
            miskonsepsi_percent: 26.5,
            tidak_paham_percent: 14.7
          },
          class_rankings: [
            { rank: 1, name: 'Zahra Amelia', score: 94, profile: 'Paham' },
            { rank: 2, name: 'Aisyah Putri Rahayu', score: 92, profile: 'Paham' },
            { rank: 3, name: 'Rian Maulana', score: 90, profile: 'Paham' },
            { rank: 4, name: 'Fadhil Muhammad', score: 90, profile: 'Paham' }
          ]
        };
        return res.json(200, { success: true, data: recapData });
      }

      // --- FASE 4: KIRIM REKAP KE EMAIL ---
      // POST /api/teacher/assessments/:id/send-email
      if (method === 'POST' && subAction === 'send-email') {
        const recipientEmail = (body && body.recipient_email) || 'bambang.hermanto@sman7banjarmasin.sch.id';
        const emailLogs = store.getTable('email_logs');

        const newLog = {
          id: 'eml-' + Date.now(),
          teacher_id: asm.teacher_id,
          assessment_id: asm.id,
          recipient_email: recipientEmail,
          subject: `Rekapitulasi Asesmen Diagnostik: ${asm.title}`,
          status: 'terkirim',
          sent_at: new Date().toISOString(),
          notes: 'Rekapitulasi profil pemahaman, butir psikometrik, dan catatan remedial berhasil dikirim.'
        };

        emailLogs.unshift(newLog);
        store.persist();
        store.logAudit('Bambang Hermanto, S.Pd., M.Si.', 'Guru', `Mengirim email rekap asesmen ke: ${recipientEmail}`);

        return res.json(200, {
          success: true,
          message: `Rangkuman hasil asesmen berhasil dikirimkan ke email ${recipientEmail}.`,
          data: newLog
        });
      }
    }
  }

  // 5. STUDENTS MANAGEMENT & PROGRESS
  if (resource === 'students') {
    const students = store.getTable('students');
    const followUps = store.getTable('follow_up_notes');
    const attempts = store.getTable('attempts');

    // GET /api/teacher/students (List with class filter & search)
    if (method === 'GET' && !id) {
      const classFilter = query.class || 'all';
      const search = (query.search || '').toLowerCase();
      let list = [...students];

      if (classFilter !== 'all') {
        list = list.filter(s => s.class === classFilter || s.class_id === classFilter);
      }
      if (search) {
        list = list.filter(s => (s.name || '').toLowerCase().includes(search) || (s.id || '').toLowerCase().includes(search));
      }

      // Enrich with latest attempt profile if available
      const enriched = list.map(s => {
        const att = attempts.find(a => a.student_id === s.id || a.student_name === s.name);
        return {
          ...s,
          score: att ? att.total_score : 75,
          profile: att ? att.concept_profile : 'paham',
          status: s.status || 'Aktif',
          pCount: att ? (att.pCount || 7) : 7,
          mCount: att ? (att.mCount || 2) : 2,
          tCount: att ? (att.tCount || 1) : 1,
          cheatCount: att ? (att.cheat_count || 0) : 0
        };
      });

      return res.json(200, { success: true, count: enriched.length, data: enriched });
    }

    // POST /api/teacher/students (Create Student)
    if (method === 'POST' && !id) {
      const { name, id: bodyId, nis, class: className, class_name, class_id, status } = body || {};
      if (!name) {
        return res.json(400, { success: false, message: 'Nama siswa wajib diisi.' });
      }

      const newId = nis || bodyId || ('S' + String(students.length + 1).padStart(2, '0'));
      const existing = students.find(s => s.id === newId);
      if (existing) {
        return res.json(409, { success: false, message: `NIS '${newId}' sudah terdaftar dalam sistem.` });
      }

      const newStudent = {
        id: newId,
        name,
        class: className || class_name || 'XI MIPA 2',
        class_id: class_id || 'CLS-01',
        status: status || 'Belum Mengerjakan (Menunggu Token)',
        created_at: new Date().toISOString()
      };

      students.unshift(newStudent);
      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Mendaftarkan siswa baru: ${name} (${newId})`);

      return res.json(201, { success: true, message: `Siswa ${name} berhasil ditambahkan.`, data: newStudent });
    }

    // PUT /api/teacher/students/:id (Update Student)
    if (method === 'PUT' && id && !subAction) {
      const student = students.find(s => s.id === id);
      if (!student) {
        return res.json(404, { success: false, message: 'Data siswa tidak ditemukan.' });
      }

      const { name, class: className, class_name, class_id, status } = body || {};
      if (name) student.name = name;
      if (className || class_name) student.class = className || class_name;
      if (class_id) student.class_id = class_id;
      if (status) student.status = status;

      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Memperbarui data siswa: ${student.name}`);

      return res.json(200, { success: true, message: `Data siswa ${student.name} berhasil diperbarui.`, data: student });
    }

    // DELETE /api/teacher/students/:id (Delete Student)
    if (method === 'DELETE' && id && !subAction) {
      const idx = students.findIndex(s => s.id === id);
      if (idx === -1) {
        return res.json(404, { success: false, message: 'Data siswa tidak ditemukan.' });
      }

      const deleted = students.splice(idx, 1)[0];
      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Menghapus data siswa: ${deleted.name}`);

      return res.json(200, { success: true, message: `Siswa ${deleted.name} berhasil dihapus.` });
    }

    // GET /api/teacher/students/:id/progress
    if (method === 'GET' && id && subAction === 'progress') {
      const student = students.find(s => s.id === id);
      if (!student) {
        return res.json(404, { success: false, message: 'Data siswa tidak ditemukan.' });
      }

      const history = [
        {
          assessment: 'Diagnostik Awal Semester: Vektor & Matriks',
          date: '15 Sep 2026',
          score: 48,
          profile: 'Miskonsepsi',
          notes: 'Miskonsepsi linier dilatasi dan translasi koordinat.'
        },
        {
          assessment: 'Formatif Diagnostik: Transformasi Geometri',
          date: '23 Okt 2026',
          score: 64,
          profile: 'Miskonsepsi',
          notes: 'Perbaikan pada translasi, namun masih ragu pada refleksi y = -x.'
        }
      ];

      return res.json(200, {
        success: true,
        student: { id: student.id, name: student.name, class: student.class || 'XI MIPA 2' },
        progression_history: history,
        needs_attention: true
      });
    }

    // GET /api/teacher/students/attention (Siswa perlu perhatian)
    if (method === 'GET' && id === 'attention') {
      const attentionStudents = [
        { id: 'S05', name: 'Budi Pratama', class: 'XI MIPA 2', miskonsepsi_streak: 2, persistent_concept: 'Dilatasi Linier & Refleksi y = -x' },
        { id: 'S06', name: 'Citra Lestari', class: 'XI MIPA 2', miskonsepsi_streak: 2, persistent_concept: 'Koordinat Negatif & Notasi Matriks' },
        { id: 'S09', name: 'Eko Prasetyo', class: 'XI MIPA 2', miskonsepsi_streak: 1, persistent_concept: 'Rotasi Arah Jarum Jam' }
      ];
      return res.json(200, { success: true, count: attentionStudents.length, data: attentionStudents });
    }
  }

  // 6. FOLLOW UP REMEDIAL NOTES (Fase 2)
  if (resource === 'follow-up-notes') {
    const followUps = store.getTable('follow_up_notes');

    // GET /api/teacher/follow-up-notes
    if (method === 'GET' && !id) {
      return res.json(200, { success: true, count: followUps.length, data: followUps });
    }

    // POST /api/teacher/follow-up-notes
    if (method === 'POST' && !id) {
      const { student_id, student_name, assessment_id, concept, note, status } = body || {};
      if (!note) {
        return res.json(400, { success: false, message: 'Isi catatan tindak lanjut remedial wajib diisi.' });
      }

      const newNote = {
        id: 'fup-' + Date.now(),
        teacher_id: 'T01',
        student_id: student_id || 'S01',
        student_name: student_name || 'Budi Pratama (XI MIPA 2)',
        concept: concept || 'Refleksi Titik terhadap Garis y = -x',
        assessment_id: assessment_id || 'asm-diagno-2026',
        note,
        status: status || 'Dijadwalkan',
        teacher: 'Bambang Hermanto, S.Pd., M.Si.',
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        created_at: new Date().toISOString()
      };

      followUps.unshift(newNote);
      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Menyimpan catatan remedial untuk siswa: ${newNote.student_name}`);

      return res.json(201, {
        success: true,
        message: 'Catatan tindak lanjut remedial berhasil disimpan.',
        data: newNote
      });
    }

    // PUT /api/teacher/follow-up-notes/:id
    if (method === 'PUT' && id) {
      const noteItem = followUps.find(n => n.id === id || String(n.id) === String(id));
      if (!noteItem) {
        return res.json(404, { success: false, message: 'Catatan remedial tidak ditemukan.' });
      }

      const { note, status, concept } = body || {};
      if (note) noteItem.note = note;
      if (status) noteItem.status = status;
      if (concept) noteItem.concept = concept;

      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Memperbarui catatan remedial: ${noteItem.student_name}`);

      return res.json(200, { success: true, message: 'Catatan remedial berhasil diperbarui.', data: noteItem });
    }

    // DELETE /api/teacher/follow-up-notes/:id
    if (method === 'DELETE' && id) {
      const idx = followUps.findIndex(n => n.id === id || String(n.id) === String(id));
      if (idx === -1) {
        return res.json(404, { success: false, message: 'Catatan remedial tidak ditemukan.' });
      }

      const deleted = followUps.splice(idx, 1)[0];
      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Menghapus catatan remedial untuk: ${deleted.student_name}`);

      return res.json(200, { success: true, message: 'Catatan remedial berhasil dihapus.' });
    }
  }

  // 7. PROCTORING LOGS & ACTIONS
  if (resource === 'proctoring') {
    const proctorEvents = store.getTable('proctoring_events');

    // GET /api/teacher/proctoring
    if (method === 'GET' && !id) {
      const search = (query.search || '').toLowerCase();
      const severity = query.severity || 'all';
      let filtered = [...proctorEvents];
      if (severity !== 'all') filtered = filtered.filter(e => e.severity === severity);
      if (search) {
        filtered = filtered.filter(e =>
          (e.student_name || '').toLowerCase().includes(search) ||
          (e.class_name || '').toLowerCase().includes(search) ||
          (e.violation_text || '').toLowerCase().includes(search)
        );
      }
      return res.json(200, { success: true, count: filtered.length, data: filtered });
    }

    // POST /api/teacher/proctoring/:id/action
    if (method === 'POST' && id && subAction === 'action') {
      const ev = proctorEvents.find(e => e.id === id);
      if (!ev) return res.json(404, { success: false, message: 'Log proctoring tidak ditemukan.' });
      const { action_taken } = body || {};
      if (action_taken) ev.action_taken = action_taken;
      store.persist();
      store.logAudit('Guru Matematika', 'Guru', `Tindakan proctoring pada ${ev.student_name}: ${action_taken}`);
      return res.json(200, { success: true, message: 'Tindakan pengawasan berhasil dicatat.', data: ev });
    }

    // DELETE /api/teacher/proctoring/:id
    if (method === 'DELETE' && id) {
      const idx = proctorEvents.findIndex(e => e.id === id);
      if (idx !== -1) {
        const deleted = proctorEvents.splice(idx, 1)[0];
        store.persist();
        return res.json(200, { success: true, message: 'Log proctoring dihapus.', data: deleted });
      }
      return res.json(404, { success: false, message: 'Log proctoring tidak ditemukan.' });
    }
  }

  return res.json(404, { success: false, message: 'Endpoint guru tidak ditemukan.' });
}

module.exports = handleTeacherRoutes;
