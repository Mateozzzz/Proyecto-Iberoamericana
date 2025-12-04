// src/controllers/reservation.controller.js

const reservationService = require('../services/reservation.service');

async function createReservation(req, res) {
  try {
    const reservation = await reservationService.createReservation(req.body);
    return res.status(201).json(reservation);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function getReservation(req, res) {
  try {
    const reservation = await reservationService.getReservationById(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(reservation);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { createReservation, getReservation };

