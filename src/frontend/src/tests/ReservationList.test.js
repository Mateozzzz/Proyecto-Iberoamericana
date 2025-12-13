import { render, screen, waitFor } from '@testing-library/react';
// IMPORTANTE: Corregimos la ruta (quitamos 'src')
import ReservationList from '../components/ReservationList'; 
import axios from 'axios';

// 1. Mockeamos Axios para evitar el error de "import" y no hacer llamadas reales
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  // Puedes agregar otros métodos si los usas (put, delete, etc)
}));

describe('ReservationList Component', () => {
  
  test('debe mostrar las reservaciones obtenidas de la API', async () => {
    // 2. Preparamos los datos falsos que devolverá Axios
    const mockReservations = [
      { _id: '1', item: 'Laptop', user: 'Juan', status: 'Active' },
      { _id: '2', item: 'Proyector', user: 'Maria', status: 'Pending' }
    ];

    // Simulamos que axios.get resuelve exitosamente con nuestros datos
    axios.get.mockResolvedValue({ data: mockReservations });

    // 3. Renderizamos el componente
    render(<ReservationList />);

    // 4. Verificamos que aparezca el título (si tu componente tiene uno)
    // Ajusta este texto según lo que realmente muestra tu componente
    // expect(screen.getByText(/Lista de Reservas/i)).toBeInTheDocument();

    // 5. Esperamos a que se carguen los datos y verificamos que aparezcan
    await waitFor(() => {
      expect(screen.getByText('Laptop')).toBeInTheDocument();
      expect(screen.getByText('Proyector')).toBeInTheDocument();
      expect(screen.getByText('Juan')).toBeInTheDocument();
    });
  });

  test('debe manejar errores de la API', async () => {
    // Simulamos un error
    axios.get.mockRejectedValue(new Error('Error de conexión'));

    render(<ReservationList />);

    // Aquí podrías verificar si tu componente muestra un mensaje de error
    // await waitFor(() => {
    //    expect(screen.getByText(/Error/i)).toBeInTheDocument();
    // });
  });
});