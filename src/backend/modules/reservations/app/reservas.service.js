// HU3 - Adaptativo: usar tiempo máximo configurable por tienda
const db = require('src/analytics/powerbi/datasets');

exports.esReservaExpirada = async (reservaId) => {
  const query = `
    SELECT r.fecha_creada, t.tiempo_max_reserva_minutos
    FROM reservas r
    JOIN tiendas t ON r.tienda_id = t.id
    WHERE r.id = $1
  `;

  const result = await db.query(query, [reservaId]);
  if (result.rows.length === 0) return false;

  const { fecha_creada, tiempo_max_reserva_minutos } = result.rows[0];
  const ahora = new Date();
  const creada = new Date(fecha_creada);

  const minutosPasados = (ahora - creada) / 1000 / 60;
  return minutosPasados > tiempo_max_reserva_minutos;
};

