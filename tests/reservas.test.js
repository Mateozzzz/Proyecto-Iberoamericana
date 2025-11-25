// HU4 - Preventivo: pruebas Jest básicas para reservas
const request = require('supertest');
const app = require('../src/app');

describe('Pruebas del módulo de reservas', () => {

  test('Debe rechazar reserva si no hay stock suficiente', async () => {
    const res = await request(app)
      .post('/api/reservas')
      .send({ producto_id: 1, cantidad: 9999, asesor_id: 7 });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/No hay stock suficiente/);
  });

  test('Debe crear una reserva válida', async () => {
    const res = await request(app)
      .post('/api/reservas')
      .send({ producto_id: 1, cantidad: 1, asesor_id: 7 });

    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toBe('Reserva creada correctamente');
  });

});

