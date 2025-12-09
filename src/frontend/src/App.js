import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import ReservationList from './components/ReservationList';

/**
 * Main application component containing route definitions and layout. A simple
 * navigation bar is provided to switch between views. In a real application
 * authentication state would be used to protect routes.
 */
function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', backgroundColor: '#f8f9fa' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Inicio</Link>
        <Link to="/inventory" style={{ marginRight: '1rem' }}>Inventario</Link>
        <Link to="/reservations">Reservas</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/reservations" element={<ReservationList />} />
        <Route path="/" element={<Dashboard />} />
        {/* redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;