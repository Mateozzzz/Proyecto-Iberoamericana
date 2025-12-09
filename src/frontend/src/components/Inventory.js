import React from 'react';
import axios from 'axios';

/**
 * Inventory component displays a catalog of products available for reservation. A
 * button allows the user to reserve a product which triggers a POST call
 * against the backend API.
 */
function Inventory() {
  // Hard-coded product list; in real app fetch from backend
  const products = [
    {
      id: 'P001',
      name: 'Advanced Grout - Gray',
      price: 115960,
      description: 'Premium grout for tile and stone applications, stain‑resistant and easy to apply.',
      stock: 42,
    },
    {
      id: 'P002',
      name: 'Advanced Grout - White',
      price: 115960,
      description: 'Premium grout for tile and stone applications, stain‑resistant and easy to apply.',
      stock: 48,
    },
    {
      id: 'P003',
      name: 'Diamond Grinding Wheel - Premium',
      price: 519960,
      description: 'Professional diamond grinding wheel for stone surfaces, ideal for granite, marble and concrete finishing.',
      stock: 22,
    },
    {
      id: 'P004',
      name: 'Jabón Líquido – Stonprotec®',
      price: 159960,
      description: 'Jabón líquido pH neutro concentrado para una limpieza diaria de superficies de piedra. Fórmula suave que protege y mantiene el brillo natural.',
      stock: 62,
    },
    {
      id: 'P005',
      name: 'Limpia Fachadas y Terrazas – Stonprotec®',
      price: 211960,
      description: 'Limpiador especializado para fachadas y terrazas de piedra. Elimina suciedad, moho y contaminación ambiental sin dañar las superficies.',
      stock: 28,
    },
    {
      id: 'P006',
      name: 'Limpiador Ácido – Stonprotec®',
      price: 187960,
      description: 'Limpiador ácido profesional para eliminación de residuos de cemento, sarro y eflorescencia en superficies de piedra. Uso profesional.',
      stock: 12,
    },
    {
      id: 'P007',
      name: 'Limpiador mesones y superficies - Stonprotec®',
      price: 183960,
      description: 'Limpiador de fácil aplicación para mesones y superficies de mármol y granito.',
      stock: 45,
    },
    {
      id: 'P008',
      name: 'Limpiador mesones y superficies - Stonprotec®',
      price: 171960,
      description: 'Limpiador de fácil aplicación para mesones y superficies de mármol y granito.',
      stock: 38,
    },
    {
      id: 'P009',
      name: 'Limpiador mesones y superficies - Stonprotec®',
      price: 179960,
      description: 'Limpiador de fácil aplicación para mesones y superficies de mármol y granito.',
      stock: 52,
    },
    {
      id: 'P010',
      name: 'Limpiador mesones y superficies - Stonprotec®',
      price: 175960,
      description: 'Limpiador de fácil aplicación para mesones y superficies de mármol y granito.',
      stock: 48,
    },
    {
      id: 'P011',
      name: 'Limpieza Intensiva - Stonprotec®',
      price: 195960,
      description: 'Limpiador de alta potencia para limpieza profunda de superficies de piedra natural y artificial. Elimina manchas difíciles y suciedad acumulada.',
      stock: 35,
    },
    {
      id: 'P012',
      name: 'Premium Mortar Mix - 25kg',
      price: 139960,
      description: 'High‑quality mortar mix for stone and tile installation, perfect for indoor and outdoor applications.',
      stock: 65,
    },
  ];

  const reserveProduct = async (product) => {
    try {
      const payload = {
        user: 'demo', // In a real app, use authenticated user id
        productName: product.name,
        description: product.description,
        price: product.price,
        quantity: 1,
      };
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/reservations';
      const response = await axios.post(apiUrl, payload);
      alert(`Reserva creada con ID ${response.data._id}`);
    } catch (error) {
      console.error(error);
      alert('Error al crear la reserva');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Inventario</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '1rem',
              flex: '1 0 21%',
              boxSizing: 'border-box',
            }}
          >
            {/* Placeholder image */}
            <img
              src={`https://via.placeholder.com/150?text=${encodeURIComponent(product.name)}`}
              alt={product.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '0.5rem' }}
            />
            <h4>{product.name}</h4>
            <p style={{ fontSize: '0.9rem', minHeight: '40px' }}>{product.description}</p>
            <p style={{ fontWeight: 'bold' }}>$ {product.price.toLocaleString('es-CO')}</p>
            <p>Stock: {product.stock} unidades</p>
            <button onClick={() => reserveProduct(product)} style={{ padding: '0.5rem', width: '100%' }}>
              Reservar Ahora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;