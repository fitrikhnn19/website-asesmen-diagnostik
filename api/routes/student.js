/**
 * SiDag - Student API Routes
 * PRD 2.1 C, E (F-14 through F-17, F-24 through F-26), 4.2 Alur Siswa, 4.4 Mesin Analisis
 * Token Gateway, Exam Session, Autosave, Real-time Anti-Cheat Proctoring,
 * Three-Tier Diagnostic Evaluation & Immediate Reflection Feedback.
 */

const store = require('../db/store');
const { evaluateThreeTier } = require('../services/diagnosticEngine');

function handleStudentRoutes(req, res, pathParts, query, body) {
  const method = req.method;
  const action = pathParts[0]; // verify-token, start-exam, exam
  const subId = pathParts[1];   // attemptId
  const subAction = pathParts[2]; // save-response, proctor-event, submit, results

  // 1. POST /api/student/verify-token
  if (method === 'POST' && action === 'verify-token') {
    const rawToken = (body && body.token ? body.token : '').trim().toUpperCase();
    if (!rawToken) {
      return res.json(400, { success: false, message: 'Token asesmen wajib diisi.' });
    }

    const assessments = store.getTable('assessments');
    const asm = assessments.find(a => a.token.toUpperCase() === rawToken);

    if (!asm) {
      return res.json(404, {
        success: false,
        message: `Token asesmen '${rawToken}' tidak ditemukan atau tidak aktif. Coba gunakan contoh: DIAGNO-2026 atau MAT-XI.`
      });
    }

    if (asm.status === 'ditutup') {
      return res.json(403, {
        success: false,
        message: `Asesmen dengan token '${rawToken}' telah ditutup oleh guru pengampu.`
      });
    }

    const teachers = store.getTable('users');
    const teacher = teachers.find(u => u.id === asm.teacher_id);

    return res.json(200, {
      success: true,
      message: `Token valid: ${asm.title}`,
      data: {
        token: asm.token,
        assessment_id: asm.id,
        title: asm.title,
        subject: asm.subject,
        grade: asm.grade,
        school: asm.school,
        teacher: teacher ? teacher.name : 'Bambang Hermanto, S.Pd., M.Si.',
        duration_minutes: asm.duration_minutes || 30,
        instructions: asm.instructions,
        status: asm.status
      }
    });
  }

  // 2. POST /api/student/start-exam
  if (method === 'POST' && action === 'start-exam') {
    const { token, name, class: sClass, student_class, className, roll } = body || {};
    const studentClass = sClass || student_class || className || 'XI MIPA 2';
    if (!token || !name) {
      return res.json(400, {
        success: false,
        message: 'Token dan nama lengkap siswa wajib dilengkapi untuk memulai ujian.'
      });
    }

    const assessments = store.getTable('assessments');
    const asm = assessments.find(a => a.token.toUpperCase() === token.trim().toUpperCase());
    if (!asm) {
      return res.json(404, { success: false, message: 'Asesmen tidak ditemukan.' });
    }

    const attempts = store.getTable('attempts');
    const attemptId = 'att-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

    const newAttempt = {
      id: attemptId,
      assessment_id: asm.id,
      student_id: 's-' + Date.now(),
      student_name: name,
      student_class: studentClass,
      student_roll: roll || '-',
      started_at: new Date().toISOString(),
      submitted_at: null,
      status: 'berjalan',
      total_score: 0,
      concept_profile: null,
      cheat_count: 0
    };

    attempts.push(newAttempt);
    store.persist();

    // Prepare questions with sanitized choices (Strip is_correct and misconception_id keys)
    const questions = store.getTable('questions').filter(q => q.assessment_id === asm.id || asm.id === 'asm-diagno-2026');
    const allOptions = store.getTable('question_options');
    const allReasons = store.getTable('question_reasons');

    const sanitizedQuestions = questions.map((q, idx) => {
      const qOptions = allOptions
        .filter(o => o.question_id === q.id)
        .map(o => ({
          id: o.label || o.id,
          option_id: o.id,
          text: o.content_latex
        }));

      const qReasons = allReasons
        .filter(r => r.question_id === q.id)
        .map(r => ({
          id: r.label || r.id,
          reason_id: r.id,
          text: r.content_latex
        }));

      return {
        id: q.id,
        number: idx + 1,
        concept: q.concept_name || 'Transformasi Geometri',
        stem: q.stem_latex,
        media_url: q.media_url,
        media_type: q.media_type,
        media_caption: q.media_caption,
        tier1: {
          options: qOptions
        },
        tier2: {
          options: qReasons
        },
        tier3: {
          label: 'Certainty of Response Index'
        }
      };
    });

    return res.json(201, {
      success: true,
      message: 'Sesi ujian berhasil dimulai.',
      data: {
        attempt_id: attemptId,
        student: {
          name,
          class: studentClass,
          roll: roll || '-'
        },
        assessment: {
          id: asm.id,
          title: asm.title,
          token: asm.token,
          duration_minutes: asm.duration_minutes
        },
        questions: sanitizedQuestions
      }
    });
  }

  // 3. EXAM SESSION MANAGEMENT (/api/student/exam/:attemptId/...)
  if (action === 'exam' && subId) {
    const attempts = store.getTable('attempts');
    const attempt = attempts.find(a => a.id === subId);

    if (!attempt) {
      return res.json(404, { success: false, message: 'Sesi pengerjaan ujian tidak ditemukan.' });
    }

    const responses = store.getTable('responses');

    // GET /api/student/exam/:attemptId
    if (method === 'GET' && !subAction) {
      const attemptResponses = responses.filter(r => r.attempt_id === attempt.id);
      return res.json(200, {
        success: true,
        data: {
          attempt,
          saved_responses: attemptResponses
        }
      });
    }

    // POST /api/student/exam/:attemptId/save-response (Autosave Response)
    if (method === 'POST' && subAction === 'save-response') {
      const { question_id, tier1, tier2, tier3, flagged } = body || {};
      if (!question_id) {
        return res.json(400, { success: false, message: 'question_id wajib disertakan.' });
      }

      // Check if response already exists
      let existingResp = responses.find(r => r.attempt_id === attempt.id && r.question_id === question_id);
      const now = new Date().toISOString();

      if (existingResp) {
        if (tier1 !== undefined) existingResp.tier1_option_id = tier1;
        if (tier2 !== undefined) existingResp.tier2_reason_id = tier2;
        if (tier3 !== undefined) existingResp.tier3_confidence = tier3;
        if (flagged !== undefined) existingResp.flagged = Boolean(flagged);
        existingResp.answered_at = now;
      } else {
        existingResp = {
          id: 'rsp-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          attempt_id: attempt.id,
          question_id,
          tier1_option_id: tier1 || null,
          tier2_reason_id: tier2 || null,
          tier3_confidence: tier3 || null,
          flagged: Boolean(flagged),
          answered_at: now
        };
        responses.push(existingResp);
      }

      store.persist();

      return res.json(200, {
        success: true,
        message: 'Jawaban tersimpan otomatis.',
        data: {
          saved_at: now,
          question_id,
          is_complete: Boolean(existingResp.tier1_option_id && existingResp.tier2_reason_id && existingResp.tier3_confidence)
        }
      });
    }

    // POST /api/student/exam/:attemptId/proctor-event (Anti-cheat event logging)
    if (method === 'POST' && subAction === 'proctor-event') {
      const { event_type, severity, violation_text } = body || {};
      const proctorEvents = store.getTable('proctoring_events');

      attempt.cheat_count = (attempt.cheat_count || 0) + 1;

      const newEvent = {
        id: 'proc-' + Date.now(),
        attempt_id: attempt.id,
        student_name: attempt.student_name,
        class_name: attempt.student_class,
        teacher_name: 'Bambang Hermanto, S.Pd., M.Si.',
        event_type: event_type || 'pindah_tab',
        violation_text: violation_text || 'Pindah Tab / Keluar Jendela Asesmen',
        severity: severity || (attempt.cheat_count >= 3 ? 'berat' : 'ringan'),
        occurred_at: new Date().toISOString(),
        action_taken: `Peringatan ke-${attempt.cheat_count} dicatat ke dasbor pengawas`
      };

      proctorEvents.unshift(newEvent);
      store.persist();

      return res.json(200, {
        success: true,
        warning_level: attempt.cheat_count,
        message: `Pelanggaran ke-${attempt.cheat_count} berhasil dicatat sistem pengawasan.`,
        data: newEvent
      });
    }

    // POST /api/student/exam/:attemptId/submit (Final Submit & Diagnostic Profiling)
    if (method === 'POST' && subAction === 'submit') {
      const questions = store.getTable('questions');
      const allOptions = store.getTable('question_options');
      const allReasons = store.getTable('question_reasons');
      const misconceptions = store.getTable('misconceptions');

      // Update attempt status
      attempt.submitted_at = new Date().toISOString();
      attempt.status = 'selesai';

      const attemptResponses = responses.filter(r => r.attempt_id === attempt.id);
      let totalPaham = 0;
      let totalMis = 0;
      let totalTidak = 0;
      let totalScoreAccumulator = 0;

      const detailedFeedback = [];

      // Evaluate each question using PRD 4.4 Engine
      questions.forEach((q, idx) => {
        const resp = attemptResponses.find(r => r.question_id === q.id);
        const qOptions = allOptions.filter(o => o.question_id === q.id);
        const qReasons = allReasons.filter(r => r.question_id === q.id);

        const correctOpt = qOptions.find(o => o.is_correct);
        const correctReason = qReasons.find(r => r.is_correct);

        // Check if student's tier 1 matches correct option
        const t1Chosen = resp ? resp.tier1_option_id : null;
        const isT1Correct = t1Chosen ? (t1Chosen === (correctOpt ? correctOpt.label : null) || t1Chosen === (correctOpt ? correctOpt.id : null)) : false;

        // Check if student's tier 2 matches correct reason
        const t2Chosen = resp ? resp.tier2_reason_id : null;
        const isT2Correct = t2Chosen ? (t2Chosen === (correctReason ? correctReason.label : null) || t2Chosen === (correctReason ? correctReason.id : null)) : false;

        // Check confidence
        const t3Conf = resp ? resp.tier3_confidence : 'tidak-yakin';

        // Run engine
        const evalResult = evaluateThreeTier(isT1Correct, isT2Correct, t3Conf);

        // Update response record in database
        if (resp) {
          resp.is_tier1_correct = isT1Correct;
          resp.is_tier2_correct = isT2Correct;
          resp.concept_profile = evalResult.profile;
        }

        if (evalResult.profile === 'paham') totalPaham++;
        else if (evalResult.profile === 'miskonsepsi') totalMis++;
        else totalTidak++;

        totalScoreAccumulator += evalResult.score;

        // Misconception note if miskonsepsi
        let misconceptionExplanation = null;
        if (evalResult.profile === 'miskonsepsi') {
          const chosenReasonObj = qReasons.find(r => r.label === t2Chosen || r.id === t2Chosen);
          if (chosenReasonObj && chosenReasonObj.misconception_id) {
            const misc = misconceptions.find(m => m.id === chosenReasonObj.misconception_id);
            if (misc) misconceptionExplanation = misc.description;
          }
          if (!misconceptionExplanation) {
            misconceptionExplanation = 'Anda yakin dengan konsep yang dipilih, namun terdapat kekeliruan konsep matematis pada alasan tersebut.';
          }
        }

        detailedFeedback.push({
          question_number: idx + 1,
          question_id: q.id,
          concept: q.concept_name || 'Transformasi Geometri',
          stem: q.stem_latex,
          tier1_chosen: t1Chosen,
          tier1_correct: correctOpt ? correctOpt.label : 'A',
          is_tier1_correct: isT1Correct,
          tier2_chosen: t2Chosen,
          tier2_correct: correctReason ? correctReason.label : 'A',
          is_tier2_correct: isT2Correct,
          tier3_confidence: t3Conf,
          profile: evalResult.profile,
          score: evalResult.score,
          misconception_note: misconceptionExplanation,
          reflection_advice: evalResult.profile === 'paham'
            ? 'Konsep sudah dipahami secara kokoh dengan alasan ilmiah yang tepat.'
            : (evalResult.profile === 'miskonsepsi'
                ? 'Perhatikan kembali premis alasan Anda. Hindari tertukar antara rumus pergeseran koordinat dan arah putaran sudut.'
                : 'Konsep belum dipahami dengan jelas. Pelajari kembali materi dasar bersama guru pengampu.')
        });
      });

      // Overall attempt score and profile
      const finalScore = Math.round(totalScoreAccumulator / (questions.length || 1));
      attempt.total_score = finalScore;
      attempt.pCount = totalPaham;
      attempt.mCount = totalMis;
      attempt.tCount = totalTidak;

      if (totalPaham >= Math.ceil(questions.length / 2)) {
        attempt.concept_profile = 'paham';
      } else if (totalMis >= totalTidak) {
        attempt.concept_profile = 'miskonsepsi';
      } else {
        attempt.concept_profile = 'tidak-paham';
      }

      store.persist();
      store.logAudit(attempt.student_name, 'Siswa', `Mengumpulkan lembar asesmen (Skor: ${finalScore}, Profil: ${attempt.concept_profile})`);

      return res.json(200, {
        success: true,
        message: 'Asesmen diagnostik berhasil dievaluasi secara otomatis.',
        data: {
          concept_profile: attempt.concept_profile,
          student: {
            name: attempt.student_name,
            class: attempt.student_class,
            submitted_at: attempt.submitted_at
          },
          summary: {
            total_questions: questions.length,
            score: finalScore,
            overall_profile: attempt.concept_profile,
            paham_count: totalPaham,
            paham_percent: parseFloat(((totalPaham / questions.length) * 100).toFixed(1)),
            miskonsepsi_count: totalMis,
            miskonsepsi_percent: parseFloat(((totalMis / questions.length) * 100).toFixed(1)),
            tidak_paham_count: totalTidak,
            tidak_paham_percent: parseFloat(((totalTidak / questions.length) * 100).toFixed(1)),
            integrity_violations: attempt.cheat_count || 0
          },
          item_breakdown: detailedFeedback
        }
      });
    }

    // GET /api/student/exam/:attemptId/results or /result
    if (method === 'GET' && (subAction === 'results' || subAction === 'result')) {
      if (attempt.status !== 'selesai') {
        return res.json(400, {
          success: false,
          message: 'Asesmen belum diselesaikan oleh siswa.'
        });
      }

      return res.json(200, {
        success: true,
        data: {
          student_name: attempt.student_name,
          class: attempt.student_class,
          score: attempt.total_score,
          overall_profile: attempt.concept_profile,
          paham_count: attempt.pCount || 4,
          miskonsepsi_count: attempt.mCount || 1,
          tidak_paham_count: attempt.tCount || 1,
          submitted_at: attempt.submitted_at
        }
      });
    }
  }

  return res.json(404, { success: false, message: 'Endpoint siswa tidak ditemukan.' });
}

module.exports = handleStudentRoutes;
