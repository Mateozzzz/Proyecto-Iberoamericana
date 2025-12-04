// src/services/reservation.service.js

const reservationRepository = require('../repositories/reservation.repository');

class ReservationService {
  async createReservation(data) {
    // aquí podrías validar stock, fechas, lógica de reserva, etc.
    const { productId, clientId, startDate, endDate, total } = data;
    // validaciones simples como ejemplo
    if (!productId || !clientId || !startDate || !endDate || !total) {
      throw new Error('Missing required fields');
    }
    if (startDate > endDate) {
      throw new Error('Invalid date range');
    }
    const reservation = await reservationRepository.create(data);
    return reservation;
  }

  async getReservationById(id) {
    return await reservationRepository.findById(id);
  }

  async getActiveReservationsForProduct(productId) {
    return await reservationRepository.findActiveByProduct(productId);
  }

  // otros métodos de lógica...
}

module.exports = new ReservationService();

