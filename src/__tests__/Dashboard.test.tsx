import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { DashboardPresentation } from '../app/dashboard/dashboard';
import { Car } from '../interfaces/car.interfaces';

describe('DashboardPresentation', () => {
  const mockCars: Car[] = [
    {
      id: 1,
      modelo: 'Fusca',
      marca: 'Volkswagen',
      ano: 1970,
      cor: 'azul',
      valor: 15000,
    },
    {
      id: 2,
      modelo: 'Civic',
      marca: 'Honda',
      ano: 2020,
      cor: 'preto',
      valor: 90000,
    },
  ];
  afterEach(() => {
    cleanup();
  });

  it('deve exibir o carregando e o spinner quando loading é true', () => {
    render(<DashboardPresentation cars={[]} loading={true} error={null} />);
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('deve exibir uma mensagem de erro quando error não é null', () => {
    render(
      <DashboardPresentation
        cars={[]}
        loading={false}
        error="Erro ao carregar carros"
      />,
    );
    expect(screen.getByText(/erro ao carregar carros/i)).toBeInTheDocument();
  });

  it('deve exibir a lista de carros quando loading é false e não há erro', () => {
    render(
      <DashboardPresentation cars={mockCars} loading={false} error={null} />,
    );
    expect(screen.getByText(/dashboard de carros/i)).toBeInTheDocument();
    expect(screen.getByText(/fusca/i)).toBeInTheDocument();
    expect(screen.getByText(/civic/i)).toBeInTheDocument();
  });
});
