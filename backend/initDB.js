const pool = require('./db');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    student_code VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const seedDataQuery = `
  INSERT INTO students (student_code, full_name, class_name, email)
  VALUES
    ('SV001', 'Nguyen Van An', 'CNTT01', 'an.nguyen@email.com'),
    ('SV002', 'Tran Thi Binh', 'CNTT01', 'binh.tran@email.com'),
    ('SV003', 'Le Minh Cuong', 'CNTT02', 'cuong.le@email.com'),
    ('SV004', 'Pham Thi Dung', 'CNTT02', 'dung.pham@email.com'),
    ('SV005', 'Hoang Van Em', 'CNTT03', 'em.hoang@email.com')
  ON CONFLICT (student_code) DO NOTHING;
`;

async function initDB() {
  try {
    await pool.query(createTableQuery);
    console.log('[DB] Table "students" is ready');
    await pool.query(seedDataQuery);
    console.log('[DB] Seed data inserted (skipped if already exists)');
  } catch (err) {
    console.error('[DB] Error initializing database:', err.message);
    throw err;
  }
}

module.exports = { initDB };
