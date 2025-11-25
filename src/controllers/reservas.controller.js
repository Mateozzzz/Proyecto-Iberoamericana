// HU1 - Correctivo: Validar stock antes de reservar
const db = require('../db/db');

exports.crearReserva = async (req, res) => {
  const { producto_id, cantidad, asesor_id } = req.body;

  try {
    const stockData = await db.query(
      'SELECT stock_total, stock_reservado FROM inventario WHERE id = $1',
      [producto_id]
    );

    if (stockData.rows.length === 0) {
      return res.status(404).json({ error: "Producto no existe" });
    }

    const { stock_total, stock_reservado } = stockData.rows[0];
    const disponible = stock_total - stock_reservado;

    if (cantidad > disponible) {
      return res.status(400).json({
        error: "No hay stock suficiente",
        disponible,
      });
    }

    await db.query(
      'INSERT INTO reservas (producto_id, cantidad, asesor_id) VALUES ($1, $2, $3)',
      [producto_id, cantidad, asesor_id]
    );

    await db.query(
      'UPDATE inventario SET stock_reservado = stock_reservado + $1 WHERE id = $2',
      [cantidad, producto_id]
    );

    res.json({ mensaje: "Reserva creada correctamente" });

  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

