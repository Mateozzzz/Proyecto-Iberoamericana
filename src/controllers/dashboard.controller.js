// HU5 - Perfectivo: generar datos del dashboard
const db = require('../db/db');

exports.dashboardData = async (req, res) => {
  try {
    const inventario = await db.query(`
      SELECT 
        tienda,
        SUM(stock_total) AS total_stock,
        SUM(stock_reservado) AS total_reservado,
        SUM(stock_total - stock_reservado) AS total_disponible
      FROM inventario
      GROUP BY tienda
    `);

    res.json({
      actualizado: new Date(),
      resumen: inventario.rows
    });

  } catch (err) {
    res.status(500).json({ error: "Error generando dashboard" });
  }
};

