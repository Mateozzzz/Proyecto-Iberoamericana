import React from 'react';

/**
 * Dashboard displays high level KPIs and charts. Data is static for this
 * prototype; integrate real backend calls in a production environment.
 */
function Dashboard() {
  // Static data to mirror the example dashboard
  const totalSales = 223390000;
  const stockCount = 486;
  const topProducts = [
    { name: 'Advanced Grout - Gray', quantity: 340 },
    { name: 'Advanced Grout - White', quantity: 300 },
    { name: 'Diamond Grinding Wheel', quantity: 270 },
    { name: 'Limpiador Ácido', quantity: 200 },
  ];
  const categories = [
    { name: 'Maintenance Products', percent: 42 },
    { name: 'Diamond Grinding Tools', percent: 28 },
    { name: 'Grout', percent: 12 },
    { name: 'Mortars', percent: 18 },
  ];
  const regions = [
    { name: 'Bogotá Centro', percent: 40, sales: 4520 },
    { name: 'Bogotá Norte', percent: 34, sales: 3850 },
    { name: 'Soacha', percent: 17, sales: 1890 },
    { name: 'Chía', percent: 9, sales: 1040 },
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Total Sales */}
        <div style={{ flex: '1', minWidth: '250px', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem' }}>
          <h3>Ventas Totales</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            $ {totalSales.toLocaleString('es-CO')}
          </p>
          <p style={{ color: 'green' }}>+1.9%</p>
        </div>
        {/* Products in stock */}
        <div style={{ flex: '1', minWidth: '250px', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem' }}>
          <h3>Productos en Stock</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stockCount}</p>
          <p style={{ color: 'green' }}>+12 nuevos</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
          {/* Top Products bar chart placeholder */}
          <div style={{ flex: '1', minWidth: '300px', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem' }}>
            <h4>Productos Más Vendidos</h4>
            {topProducts.map((item) => (
              <div key={item.name} style={{ marginBottom: '0.5rem' }}>
                <span>{item.name}</span>
                <div style={{ background: '#e7e7e7', height: '10px', borderRadius: '3px' }}>
                  <div
                    style={{
                      width: `${(item.quantity / topProducts[0].quantity) * 100}%`,
                      height: '100%',
                      background: '#4a90e2',
                      borderRadius: '3px',
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          {/* Category breakdown pie chart placeholder */}
          <div style={{ flex: '1', minWidth: '300px', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem' }}>
            <h4>Desglose de Mercado por Categoría</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {categories.map((cat) => (
                <li key={cat.name} style={{ marginBottom: '0.5rem' }}>
                  <span>
                    {cat.name}: {cat.percent}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
      </div>
      {/* Regional breakdown */}
      <div style={{ marginTop: '1rem', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem' }}>
        <h4>Bogotá Regional Sales</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {regions.map((reg) => (
            <li key={reg.name} style={{ marginBottom: '0.5rem' }}>
              <strong>{reg.name}</strong> - {reg.percent}% (ventas: {reg.sales.toLocaleString('es-CO')})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;