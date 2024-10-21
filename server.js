require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

// Middleware question 1 and 2
app.use(express.json()); // Middleware to parse JSON request bodies

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.localhost,
  user: process.env.root,
  password: process.env.Hampty2030,
  database: process.env.hospital_db
});

// Root route (GET /)
app.get('/', (req, res) => {
    res.send('Welcome to the API. Use /patients or /users to access the resources.');
  });

// Fetch all users Question 3
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);  // Send back the users in JSON format
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Insert a new user Question 4
app.post('/users', async (req, res) => {
  const { name, email } = req.body;

  try {
    const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ message: 'User created', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Listen to the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
