const pool = require('../config/db'); // Import the database pool

// Find a user by email
const findByEmail = (email, callback) => {
  pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return callback(new Error('Database error: ' + err.message));
    }
    callback(null, results);
  });
};

// Create a new user
const create = (userData, callback) => {
  const { fullname, email, role, password } = userData;
  pool.query(
    'INSERT INTO users (fullname, email, role, password) VALUES (?, ?, ?, ?)',
    [fullname, email, role, password],
    (err, results) => {
      if (err) {
        return callback(new Error('Database error: ' + err.message));
      }
      callback(null, results);
    }
  );
};

// Update password
const updatePassword = (userId, hashedPassword, callback) => {
  const sql = 'UPDATE users SET password = ? WHERE id = ?';
  pool.query(sql, [hashedPassword, userId], (err, results) => {
    if (err) {
      return callback(new Error('Database error: ' + err.message));
    }
    callback(null, results);
  });
};

// Find a user by ID
const findById = (userId, callback) => {
  pool.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return callback(new Error('Database error: ' + err.message));
    }
    callback(null, results);
  });
};

module.exports = {
  findByEmail,
  create,
  updatePassword,
  findById,
};