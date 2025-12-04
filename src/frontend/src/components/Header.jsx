import React from 'react';
// Este componente usaría estilos globales o CSS Modules
// Iconos simulados
const CartIcon = '🛒';
const DashboardIcon = '🏠';
const InventoryIcon = '📦';
const ReservesIcon = '📅';
const UserIcon = '👤';

const Header = ({ activeTab, setActiveView }) => {
  const navItems = [
    { name: 'Inicio', view: 'Dashboard', icon: DashboardIcon },
    { name: 'Inventario', view: 'Inventory', icon: InventoryIcon },
    { name: 'Reservas', view: 'Reserves', icon: ReservesIcon },
  ];

  return (
    <header className="app-header">
      <div className="logo">
        <span className="logo-icon">{CartIcon}</span> Stonprotec
      </div>
      <nav className="main-nav">
        {navItems.map(item => (
          <button
            key={item.name}
            className={`nav-item ${activeTab === item.view ? 'active' : ''}`}
            onClick={() => setActiveView(item.view)}
          >
            {item.icon} {item.name}
          </button>
        ))}
      </nav>
      <div className="user-controls">
        <button className="control-btn">JP</button>
        <button className="control-btn profile-btn">{UserIcon}</button>
      </div>
    </header>
  );
};

export default Header;
// **NOTA:** Los estilos para este componente (Header) deben ir en src/index.css
// para que estén disponibles globalmente.
