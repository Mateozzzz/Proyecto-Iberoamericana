import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Reserves from './pages/Reserves';
import ReserveModal from './modals/ReserveModal';
import Header from './components/Header';

// Datos de ejemplo para la modal de detalle (usados en Inventory y Reserves)
const exampleReservationDetails = {
    id: 'BK-2024-002',
    estado: 'Pendiente',
    categoria: 'Maintenance Products',
    nombre: 'Limpiador mesones y superficies - Stronprotec®',
    descripcion: {
        general: 'Limpiador de fácil aplicación para mesones y superficies de:',
        puntos: [
            'Marmol',
            'Granito',
            'Quarztone',
            'Porcelanato',
            'Cerámica',
            'Elimina grasa y suciedad en general.',
            'Actúa contra hongos y bacterias mientras limpia sin dejar rastros.',
            'Libre de enjuague.'
        ]
    },
    precio: '171.960',
    cantidad: 2
};

function App() {
  const [activeView, setActiveView] = useState('Dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Función para abrir la modal
  const handleOpenReserveModal = (data) => {
    // Si la data viene del Inventario, la modal usará los datos de ese producto.
    // Si viene de la tabla de Reservas, la modal usará los detalles completos.
    setModalData(data || exampleReservationDetails);
    setIsModalOpen(true);
  };

  const renderView = () => {
    switch (activeView) {
      case 'Inventory':
        return <Inventory openReserveModal={handleOpenReserveModal} />;
      case 'Reserves':
        return <Reserves openReserveModal={handleOpenReserveModal} />;
      case 'Dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      {/* El Header permite cambiar de vista */}
      <Header activeTab={activeView} setActiveView={setActiveView} />
      
      {renderView()}
      
      <ReserveModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reservationDetails={modalData}
      />
    </div>
  );
}

export default App;

