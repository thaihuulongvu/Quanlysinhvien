require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const { initDB } = require('./initDB');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: process.env.APP_NAME });
});

// GET all students
app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET student by code
app.get('/students/code/:code', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students WHERE student_code = $1', [req.params.code]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new student
app.post('/students', async (req, res) => {
  const { student_code, full_name, class_name, email } = req.body;
  if (!student_code || !full_name || !class_name || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO students (student_code, full_name, class_name, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [student_code, full_name, class_name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Student code or email already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update student
app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { student_code, full_name, class_name, email } = req.body;
  if (!student_code || !full_name || !class_name || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const result = await pool.query(
      'UPDATE students SET student_code=$1, full_name=$2, class_name=$3, email=$4 WHERE id=$5 RETURNING *',
      [student_code, full_name, class_name, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Student code or email already exists' });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE student
app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM students WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted', student: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Start Server ─────────────────────────────────────────────────────────────
async function startServer() {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`[SERVER] ${process.env.APP_NAME} running on port ${PORT}`);
    });
  } catch (err) {
    console.error('[SERVER] Failed to start:', err.message);
    process.exit(1);
  }
}

startServer();
