// tests/unit/reservation.repository.unit.test.js

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Reservation = require('../../src/models/reservation.model');
const reservationRepository = require('../../src/repositories/reservation.repository');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Reservation.deleteMany({});
});

test('create reservation and retrieve by id', async () => {
  const data = {
    productId: 'prod-1',
    clientId: 'client-1',
    startDate: new Date('2025-12-10'),
    endDate: new Date('2025-12-15'),
    total: 100.0
  };
  const saved = await reservationRepository.create(data);
  const found = await reservationRepository.findById(saved._id);
  expect(found).not.toBeNull();
  expect(found.productId).toBe(data.productId);
  expect(found.clientId).toBe(data.clientId);
  expect(found.total).toBe(data.total);
});

