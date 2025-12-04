// src/models/reservation.model.js

const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  clientId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;

