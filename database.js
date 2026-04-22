const sqlite3 = require('sqlite3').verbose();

// Create / Open DB file
const db = new sqlite3.Database('./kyc.db', (err) => {
  if (err) return console.error(err);
  console.log("✅ Connected to SQLite database");
});

// Create tables if not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS kyc_docs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      doc_type TEXT,
      extracted_name TEXT,
      extracted_age TEXT,
      extracted_gender TEXT,
      extracted_city TEXT,
      extracted_salary TEXT,
      extracted_profession TEXT,
      file_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS selfies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      file_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
});

module.exports = db;

