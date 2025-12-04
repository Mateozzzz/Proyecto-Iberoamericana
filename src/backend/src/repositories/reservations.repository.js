// src/repositories/reservation.repository.js

const Reservation = require('../models/reservation.model');

class ReservationRepository {
  async create(data) {
    const reservation = new Reservation(data);
    return await reservation.save();
  }

  async findById(id) {
    return await Reservation.findById(id).exec();
  }

  async findActiveByProduct(productId) {
    return await Reservation.find({ productId, status: 'active' }).exec();
  }

  // otros métodos que necesites...
}

module.exports = new ReservationRepository();

