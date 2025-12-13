import { render, screen, waitFor } from '@testing-library/react';
import ReservationList from '../components/ReservationList'; // Ajusta la ruta si es necesario
import axios from 'axios';

// PRINCIPIO DIP (Dependency Inversion): 
// No dependemos de la implementación real de Axios, sino de una abstracción (mock).
jest.mock('axios');

describe('ReservationList Component', () => {
  
  // Setup: Limpiar mocks antes de cada test para asegurar aislamiento (SRP)
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renderiza correctamente y muestra datos de la API', async () => {
    // PREPARACIÓN (Arrange)
    // Creamos datos dummy que CUMPLEN con la estructura real (evita errores de undefined)
    const mockReservations = [
      { 
        _id: '1', 
        item: 'Laptop Dell', 
        user: 'Juan Perez', 
        status: 'Active', 
        price: 1500000, // Importante: Número para toLocaleString
        quantity: 1 
      },
      { 
        _id: '2', 
        item: 'Video Beam', 
        user: 'Maria Gomez', 
        status: 'Pending', 
        price: 450000, 
        quantity: 2 
      }
    ];

    // Configuramos el mock para este caso específico
    axios.get.mockResolvedValue({ data: mockReservations });

    // EJECUCIÓN (Act)
    render(<ReservationList />);

    // VERIFICACIÓN (Assert)
    // Usamos waitFor para manejar la asincronía del useEffect
    await waitFor(() => {
      // Verificamos textos clave
      expect(screen.getByText('Laptop Dell')).toBeInTheDocument();
      expect(screen.getByText('Maria Gomez')).toBeInTheDocument();
      
      // Verificamos formato de moneda (expresión regular para ser flexible con el símbolo)
      // Busca "1.500.000" o "1,500,000"
      expect(screen.getByText(/1[.,]500[.,]000/)).toBeInTheDocument();
    });
  });

  test('Maneja correctamente errores de la API', async () => {
    // PREPARACIÓN
    // Silenciamos console.error para no ensuciar el output del test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValue(new Error('Error de conexión'));

    // EJECUCIÓN
    render(<ReservationList />);

    // VERIFICACIÓN
    await waitFor(() => {
        // Verificamos que se intentó llamar a la API
        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    // Restauramos la consola
    consoleSpy.mockRestore();
  });
});