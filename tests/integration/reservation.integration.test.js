// tests/integration/reservation.integration.test.js

const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Reservation = require('../../src/models/reservation.model');

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

describe('Reservation API', () => {
  it('should create a reservation via POST /api/reservations', async () => {
    const data = {
      productId: 'prod-xyz',
      clientId: 'client-xyz',
      startDate: '2025-12-10',
      endDate: '2025-12-12',
      total: 200
    };

    const res = await request(app)
      .post('/api/reservations')
      .send(data)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.productId).toBe(data.productId);
    expect(res.body.clientId).toBe(data.clientId);
  });

  it('should return 400 if missing fields', async () => {
    const res = await request(app)
      .post('/api/reservations')
      .send({})  
      .expect(400);
    expect(res.body).toHaveProperty('error');
  });
});

