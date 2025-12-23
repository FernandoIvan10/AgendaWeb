// imports
require('dotenv').config();
const express = require('express');
const path = require('path');
const contactsRoutes = require('./routes/contacts.routes');

// variables
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// PostgreSQL Pool is provided by server/db.js

// API Routes
app.use('/api', contactsRoutes);

// Serve static files from the React frontend (built by the client app)
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(clientBuildPath));
// Serve the React app for all other routes
// Fallback middleware: no route pattern parsing (avoids path-to-regexp errors)
app.use((req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

//start server
app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Server running on port ${process.env.BACKEND_PORT}`);
});