require('dotenv').config();

const express = require('express');
const cors = require('cors');
// No necesitamos connectDB aquí adentro para la definición de la app, 
// pero si lo dejas importado no pasa nada, aunque es mejor quitarlo si no se usa.
// const connectDB = require('./config/db'); 
const reservationRoutes = require('./routes/reservationRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint (Línea 17)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api/reservations', reservationRoutes);

// Eliminamos el bloque "if (require.main === module)..." porque ya está en server.js

module.exports = app;