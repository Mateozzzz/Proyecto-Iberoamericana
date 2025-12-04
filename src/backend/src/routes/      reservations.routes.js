// src/routes/reservation.routes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservation.controller');

router.post('/reservations', controller.createReservation);
router.get('/reservations/:id', controller.getReservation);

module.exports = router;

