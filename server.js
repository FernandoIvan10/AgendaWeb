// imports
const express = require('express');
const path = require('path');
const {Pool} = require('pg');
const cors = require('cors');
require('dotenv').config();

// variables
const app = express();
const port = 4000;

app.use(cors({
  origin: 'http://localhost:3000'
}));

// Middleware to parse JSON bodies
app.use(express.json());

// PostgreSQL Pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// API Routes
// Get all contacts
app.get('/contacts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacts');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Server Error');
  }
});

// Add a new contact
app.post('/contacts', async (req, res) => {
  const { name, phone, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO contacts (name, phone, description) VALUES ($1, $2, $3) RETURNING *',
      [name, phone, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).send('Server Error');
  }
});

// Update a contact
app.put('/contacts/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, phone, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE contacts SET name = $1, phone = $2, description = $3 WHERE id = $4 RETURNING *',
      [name, phone, description, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).send('Server Error');
  }
});

// Delete a contact
app.delete('/contacts/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).send('Server Error');
  }
});

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, 'build')));
// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});