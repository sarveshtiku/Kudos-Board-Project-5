const express = require('express');
const cors = require('cors');
const app = express();

// CORS middleware - this must be before any routes!
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

module.exports = app;