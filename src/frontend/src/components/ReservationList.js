import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * ReservationList fetches and displays all reservations. Users can view
 * reservation details and delete reservations. Status values mirror the
 * backend enumeration.
 */
function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/reservations';

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.get(apiBase);
        setReservations(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [apiBase]);

  const deleteReservation = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta reserva?')) return;
    try {
      await axios.delete(`${apiBase}/${id}`);
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert('No se pudo eliminar la reserva');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Reservas</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : reservations.length === 0 ? (
        <p>No hay reservas.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>ID</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>Descripción</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>Precio</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>Cantidad</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>Estado</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: '0.5rem' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res._id}>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>{res._id}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>{res.description}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                  $ {res.price.toLocaleString('es-CO')}
                </td>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>{res.quantity}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>{res.status}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '0.5rem' }}>
                  {/* View action could open modal in full implementation */}
                  <button onClick={() => alert(JSON.stringify(res, null, 2))} style={{ marginRight: '0.5rem' }}>
                    Ver
                  </button>
                  <button onClick={() => deleteReservation(res._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReservationList;