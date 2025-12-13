import { render, screen, waitFor } from '@testing-library/react';
import Inventory from '../components/Inventory';
import axios from 'axios';

jest.mock('axios');

describe('Inventory Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renderiza la lista de productos del inventario', async () => {
    // PREPARACIÓN: Datos completos simulando tu modelo de Producto
    const mockProducts = [
        { _id: '101', name: 'Advanced Grout - Gray', stock: 50, price: 20000 },
        { _id: '102', name: 'Diamond Grinding Wheel', stock: 15, price: 150000 }
    ];

    axios.get.mockResolvedValue({ data: mockProducts });

    // EJECUCIÓN
    render(<Inventory />);

    // VERIFICACIÓN
    // Si el componente carga datos, usamos waitFor
    await waitFor(() => {
        expect(screen.getByText(/Advanced Grout/i)).toBeInTheDocument();
        expect(screen.getByText(/Diamond Grinding/i)).toBeInTheDocument();
    });
  });
});