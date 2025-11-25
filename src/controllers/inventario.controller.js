// HU2 - Perfectivo: agregar filtros al inventario
const db = require('../db/db');

exports.obtenerInventario = async (req, res) => {
  const { tienda, categoria, estado } = req.query;

  let query = 'SELECT * FROM inventario WHERE 1=1 ';
  const params = [];

  if (tienda) {
    params.push(tienda);
    query += ` AND tienda = $${params.length}`;
  }

  if (categoria) {
    params.push(categoria);
    query += ` AND categoria = $${params.length}`;
  }

  if (estado) {
    if (estado === 'disponible') {
      query += ' AND stock_total > stock_reservado ';
    } else if (estado === 'reservado') {
      query += ' AND stock_reservado > 0 ';
    }
  }

  try {
    const resultado = await db.query(query, params);
    res.json(resultado.rows);
  } catch (err) {
    res.status(500).json({ error: "Error cargando inventario" });
  }
};

