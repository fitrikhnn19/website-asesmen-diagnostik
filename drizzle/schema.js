const { sqliteTable, text, integer, real } = require('drizzle-orm/sqlite-core');

// Table 1: users (PRD 6.2)
const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password_hash: text('password_hash').notNull(),
  role: text('role').notNull(),
  nip: text('nip'),
  subject: text('subject'),
  status: text('status').default('aktif'),
  created_at: text('created_at')
});

// Table 2: classes (PRD 6.2)
const classes = sqliteTable('classes', {
  id: text('id').primaryKey(),
  teacher_id: text('teacher_id'),
  name: text('name').notNull(),
  grade: text('grade'),
  academic_year: text('academic_year'),
  homeroom: text('homeroom'),
  student_count: integer('student_count').default(0)
});

// Table 3: students (PRD 6.2)
const students = sqliteTable('students', {
  id: text('id').primaryKey(),
  class_id: text('class_id'),
  name: text('name').notNull(),
  student_code: text('student_code'),
  roll_no: text('roll_no')
});

// Table 4: assessments (PRD 6.2)
const assessments = sqliteTable('assessments', {
  id: text('id').primaryKey(),
  teacher_id: text('teacher_id'),
  class_id: text('class_id'),
  title: text('title').notNull(),
  subject: text('subject'),
  grade: text('grade'),
  school: text('school'),
  description: text('description'),
  token: text('token'),
  duration_minutes: integer('duration_minutes'),
  status: text('status'),
  published_at: text('published_at'),
  instructions: text('instructions')
});

// Table 5: assessment_participants (PRD 6.2)
const assessment_participants = sqliteTable('assessment_participants', {
  id: text('id').primaryKey(),
  assessment_id: text('assessment_id'),
  student_id: text('student_id'),
  access_token: text('access_token'),
  status: text('status'),
  score: integer('score'),
  profile: text('profile'),
  started_at: text('started_at'),
  completed_at: text('completed_at')
});

// Table 6: concepts (PRD 6.2)
const concepts = sqliteTable('concepts', {
  id: text('id').primaryKey(),
  subject: text('subject').notNull(),
  name: text('name').notNull()
});

// Table 7: misconceptions (PRD 6.2)
const misconceptions = sqliteTable('misconceptions', {
  id: text('id').primaryKey(),
  concept_id: text('concept_id'),
  code: text('code'),
  description: text('description')
});

// Table 8: questions (PRD 6.2)
const questions = sqliteTable('questions', {
  id: text('id').primaryKey(),
  assessment_id: text('assessment_id'),
  concept_id: text('concept_id'),
  order_no: integer('order_no'),
  stem_latex: text('stem_latex'),
  media_url: text('media_url'),
  media_type: text('media_type'),
  media_caption: text('media_caption')
});

// Table 9: question_options (PRD 6.2)
const question_options = sqliteTable('question_options', {
  id: text('id').primaryKey(),
  question_id: text('question_id'),
  label: text('label'),
  content_latex: text('content_latex'),
  is_correct: integer('is_correct', { mode: 'boolean' })
});

// Table 10: question_reasons (PRD 6.2)
const question_reasons = sqliteTable('question_reasons', {
  id: text('id').primaryKey(),
  question_id: text('question_id'),
  label: text('label'),
  content_latex: text('content_latex'),
  is_correct: integer('is_correct', { mode: 'boolean' }) ,
  misconception_id: text('misconception_id')
});

// Table 11: attempts (PRD 6.2)
const attempts = sqliteTable('attempts', {
  id: text('id').primaryKey(),
  assessment_id: text('assessment_id'),
  student_id: text('student_id'),
  started_at: text('started_at'),
  submitted_at: text('submitted_at'),
  status: text('status'),
  total_score: integer('total_score'),
  concept_profile: text('concept_profile'),
  pCount: integer('pCount'),
  mCount: integer('mCount'),
  tCount: integer('tCount'),
  cheat_count: integer('cheat_count')
});

// Table 12: responses (PRD 6.2)
const responses = sqliteTable('responses', {
  id: text('id').primaryKey(),
  attempt_id: text('attempt_id'),
  question_id: text('question_id'),
  tier1_option_id: text('tier1_option_id'),
  tier2_reason_id: text('tier2_reason_id'),
  tier3_confidence: text('tier3_confidence'),
  is_tier1_correct: integer('is_tier1_correct', { mode: 'boolean' }),
  is_tier2_correct: integer('is_tier2_correct', { mode: 'boolean' }),
  concept_profile: text('concept_profile'),
  answered_at: text('answered_at')
});

// Table 13: item_analyses (PRD 6.2)
const item_analyses = sqliteTable('item_analyses', {
  id: text('id').primaryKey(),
  assessment_id: text('assessment_id'),
  question_id: text('question_id'),
  difficulty_index: real('difficulty_index'),
  difficulty_category: text('difficulty_category'),
  discrimination_index: real('discrimination_index'),
  discrimination_category: text('discrimination_category'),
  validity_value: real('validity_value'),
  validity_category: text('validity_category'),
  reliability_value: real('reliability_value'),
  category: text('category'),
  recommendation: text('recommendation')
});

// Table 14: proctoring_events (PRD 6.2)
const proctoring_events = sqliteTable('proctoring_events', {
  id: text('id').primaryKey(),
  attempt_id: text('attempt_id'),
  student_name: text('student_name'),
  class_name: text('class_name'),
  teacher_name: text('teacher_name'),
  event_type: text('event_type'),
  violation_text: text('violation_text'),
  severity: text('severity'),
  occurred_at: text('occurred_at'),
  action_taken: text('action_taken')
});

// Table 15: follow_up_notes (PRD 6.2)
const follow_up_notes = sqliteTable('follow_up_notes', {
  id: text('id').primaryKey(),
  teacher_id: text('teacher_id'),
  student_id: text('student_id'),
  student_name: text('student_name'),
  assessment_id: text('assessment_id'),
  note: text('note'),
  status: text('status'),
  created_at: text('created_at')
});

// Table 16: email_logs (PRD 6.2)
const email_logs = sqliteTable('email_logs', {
  id: text('id').primaryKey(),
  teacher_id: text('teacher_id'),
  assessment_id: text('assessment_id'),
  recipient_email: text('recipient_email'),
  subject: text('subject'),
  status: text('status'),
  sent_at: text('sent_at'),
  notes: text('notes')
});

// Table 17: audit_logs (PRD 6.2)
const audit_logs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(),
  time: text('time'),
  time_formatted: text('time_formatted'),
  actor: text('actor'),
  role: text('role'),
  action: text('action'),
  ip: text('ip'),
  status: text('status')
});

module.exports = {
  users,
  classes,
  students,
  assessments,
  assessment_participants,
  concepts,
  misconceptions,
  questions,
  question_options,
  question_reasons,
  attempts,
  responses,
  item_analyses,
  proctoring_events,
  follow_up_notes,
  email_logs,
  audit_logs
};
