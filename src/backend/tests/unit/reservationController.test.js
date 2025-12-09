const reservationController = require('../../src/controllers/reservationController');
const reservationService = require('../../src/services/reservationService');

jest.mock('../../src/services/reservationService');

describe('ReservationController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should return 201 and created reservation', async () => {
      const req = { body: { user: 'test', productName: 'Item', description: 'Desc', price: 100, quantity: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockReservation = { id: '1', ...req.body };
      reservationService.createReservation.mockResolvedValue(mockReservation);
      await reservationController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockReservation);
    });

    it('should return 400 on error', async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      reservationService.createReservation.mockRejectedValue(new Error('Invalid'));
      await reservationController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
    });
  });

  describe('list', () => {
    it('should return reservations list', async () => {
      const req = {};
      const res = { json: jest.fn() };
      const data = [{ id: '1' }, { id: '2' }];
      reservationService.getAllReservations.mockResolvedValue(data);
      await reservationController.list(req, res);
      expect(res.json).toHaveBeenCalledWith(data);
    });
  });

  describe('getById', () => {
    it('should return a reservation', async () => {
      const req = { params: { id: '1' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const reservation = { id: '1' };
      reservationService.getReservationById.mockResolvedValue(reservation);
      await reservationController.getById(req, res);
      expect(res.json).toHaveBeenCalledWith(reservation);
    });

    it('should return 404 when not found', async () => {
      const req = { params: { id: '1' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      reservationService.getReservationById.mockResolvedValue(null);
      await reservationController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('update', () => {
    it('should update reservation', async () => {
      const req = { params: { id: '1' }, body: { status: 'Confirmada' } };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      const updated = { id: '1', status: 'Confirmada' };
      reservationService.updateReservation.mockResolvedValue(updated);
      await reservationController.update(req, res);
      expect(res.json).toHaveBeenCalledWith(updated);
    });

    it('should return 404 when update fails', async () => {
      const req = { params: { id: '1' }, body: {} };
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
      reservationService.updateReservation.mockResolvedValue(null);
      await reservationController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('delete', () => {
    it('should delete reservation', async () => {
      const req = { params: { id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      reservationService.deleteReservation.mockResolvedValue({ id: '1' });
      await reservationController.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 when deletion fails', async () => {
      const req = { params: { id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      reservationService.deleteReservation.mockResolvedValue(null);
      await reservationController.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});