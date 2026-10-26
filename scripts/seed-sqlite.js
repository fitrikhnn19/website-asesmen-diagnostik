const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'sidag.db');
const jsonPath = path.join(__dirname, '..', 'data', 'database.json');

console.log('Seeding SQLite database from:', jsonPath);
console.log('Target SQLite database:', dbPath);

if (!fs.existsSync(jsonPath)) {
  console.error('database.json not found!');
  process.exit(1);
}

const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

if (fs.existsSync(dbPath)) {
  try {
    fs.unlinkSync(dbPath);
  } catch (e) {
    console.log('Could not unlink existing db, continuing...');
  }
}

const db = new DatabaseSync(dbPath);

// Enable WAL mode
db.exec('PRAGMA journal_mode = WAL;');

// Schema definitions for SQLite tables
const tableSchemas = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL,
      nip TEXT,
      subject TEXT,
      status TEXT DEFAULT 'aktif',
      created_at TEXT
    );
  `,
  classes: `
    CREATE TABLE IF NOT EXISTS classes (
      id TEXT PRIMARY KEY,
      teacher_id TEXT,
      name TEXT NOT NULL,
      grade TEXT,
      academic_year TEXT,
      homeroom TEXT,
      student_count INTEGER DEFAULT 0
    );
  `,
  students: `
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      class_id TEXT,
      name TEXT NOT NULL,
      student_code TEXT,
      roll_no TEXT
    );
  `,
  assessments: `
    CREATE TABLE IF NOT EXISTS assessments (
      id TEXT PRIMARY KEY,
      teacher_id TEXT,
      class_id TEXT,
      title TEXT NOT NULL,
      subject TEXT,
      grade TEXT,
      school TEXT,
      description TEXT,
      token TEXT,
      duration_minutes INTEGER,
      status TEXT,
      published_at TEXT,
      instructions TEXT
    );
  `,
  assessment_participants: `
    CREATE TABLE IF NOT EXISTS assessment_participants (
      id TEXT PRIMARY KEY,
      assessment_id TEXT,
      student_id TEXT,
      access_token TEXT,
      status TEXT,
      score INTEGER,
      profile TEXT,
      started_at TEXT,
      completed_at TEXT
    );
  `,
  concepts: `
    CREATE TABLE IF NOT EXISTS concepts (
      id TEXT PRIMARY KEY,
      subject TEXT NOT NULL,
      name TEXT NOT NULL
    );
  `,
  misconceptions: `
    CREATE TABLE IF NOT EXISTS misconceptions (
      id TEXT PRIMARY KEY,
      concept_id TEXT,
      code TEXT,
      description TEXT
    );
  `,
  questions: `
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      assessment_id TEXT,
      concept_id TEXT,
      order_no INTEGER,
      stem_latex TEXT,
      media_url TEXT,
      media_type TEXT,
      media_caption TEXT
    );
  `,
  question_options: `
    CREATE TABLE IF NOT EXISTS question_options (
      id TEXT PRIMARY KEY,
      question_id TEXT,
      label TEXT,
      content_latex TEXT,
      is_correct INTEGER
    );
  `,
  question_reasons: `
    CREATE TABLE IF NOT EXISTS question_reasons (
      id TEXT PRIMARY KEY,
      question_id TEXT,
      label TEXT,
      content_latex TEXT,
      is_correct INTEGER,
      misconception_id TEXT
    );
  `,
  attempts: `
    CREATE TABLE IF NOT EXISTS attempts (
      id TEXT PRIMARY KEY,
      assessment_id TEXT,
      student_id TEXT,
      started_at TEXT,
      submitted_at TEXT,
      status TEXT,
      total_score INTEGER,
      concept_profile TEXT,
      pCount INTEGER,
      mCount INTEGER,
      tCount INTEGER,
      cheat_count INTEGER
    );
  `,
  responses: `
    CREATE TABLE IF NOT EXISTS responses (
      id TEXT PRIMARY KEY,
      attempt_id TEXT,
      question_id TEXT,
      tier1_option_id TEXT,
      tier2_reason_id TEXT,
      tier3_confidence TEXT,
      is_tier1_correct INTEGER,
      is_tier2_correct INTEGER,
      concept_profile TEXT,
      answered_at TEXT
    );
  `,
  item_analyses: `
    CREATE TABLE IF NOT EXISTS item_analyses (
      id TEXT PRIMARY KEY,
      assessment_id TEXT,
      question_id TEXT,
      difficulty_index REAL,
      difficulty_category TEXT,
      discrimination_index REAL,
      discrimination_category TEXT,
      validity_value REAL,
      validity_category TEXT,
      reliability_value REAL,
      category TEXT,
      recommendation TEXT
    );
  `,
  proctoring_events: `
    CREATE TABLE IF NOT EXISTS proctoring_events (
      id TEXT PRIMARY KEY,
      attempt_id TEXT,
      student_name TEXT,
      class_name TEXT,
      teacher_name TEXT,
      event_type TEXT,
      violation_text TEXT,
      severity TEXT,
      occurred_at TEXT,
      action_taken TEXT
    );
  `,
  follow_up_notes: `
    CREATE TABLE IF NOT EXISTS follow_up_notes (
      id TEXT PRIMARY KEY,
      teacher_id TEXT,
      student_id TEXT,
      student_name TEXT,
      assessment_id TEXT,
      note TEXT,
      status TEXT,
      created_at TEXT
    );
  `,
  email_logs: `
    CREATE TABLE IF NOT EXISTS email_logs (
      id TEXT PRIMARY KEY,
      teacher_id TEXT,
      assessment_id TEXT,
      recipient_email TEXT,
      subject TEXT,
      status TEXT,
      sent_at TEXT,
      notes TEXT
    );
  `,
  audit_logs: `
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      time TEXT,
      time_formatted TEXT,
      actor TEXT,
      role TEXT,
      action TEXT,
      ip TEXT,
      status TEXT
    );
  `
};

// Create tables
for (const [table, sql] of Object.entries(tableSchemas)) {
  db.exec(sql);
}

// Insert rows
let totalInserted = 0;
for (const [table, rows] of Object.entries(rawData)) {
  if (!Array.isArray(rows) || rows.length === 0) continue;

  const sample = rows[0];
  const keys = Object.keys(sample);
  const placeholders = keys.map(() => '?').join(', ');
  const insertSql = `INSERT OR REPLACE INTO ${table} (${keys.join(', ')}) VALUES (${placeholders});`;
  const insertStmt = db.prepare(insertSql);

  for (const row of rows) {
    const values = keys.map(k => {
      const val = row[k];
      if (typeof val === 'boolean') return val ? 1 : 0;
      if (val === null || val === undefined) return null;
      if (typeof val === 'object') return JSON.stringify(val);
      return val;
    });
    insertStmt.run(...values);
    totalInserted++;
  }
  console.log(`Inserted ${rows.length} rows into ${table}`);
}

console.log(`Success! Total ${totalInserted} records seeded into ${dbPath}`);
