import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginPresentation } from '../app/login/login';

describe('LoginPresentation', () => {
  const mockFormAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar corretamente o formulário de login', () => {
    render(
      <LoginPresentation formAction={mockFormAction} isSubmitting={false} />,
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  test('deve exibir estado de carregamento quando isSubmitting for true', () => {
    render(
      <LoginPresentation formAction={mockFormAction} isSubmitting={true} />,
    );

    expect(
      screen.getByRole('button', { name: 'Entrando...' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('deve exibir mensagem de erro quando houver erro', () => {
    const errorMessage = 'Email ou senha inválidos';
    render(
      <LoginPresentation
        formAction={mockFormAction}
        isSubmitting={false}
        error={errorMessage}
      />,
    );

    // Usa o data-testid para encontrar especificamente a mensagem de erro principal
    expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
  });

  test('deve chamar formAction quando o formulário é submetido', () => {
    render(
      <LoginPresentation formAction={mockFormAction} isSubmitting={false} />,
    );

    // Em vez de buscar pelo role 'form', selecionamos o formulário diretamente
    const form = screen.getByTestId('login-form');

    fireEvent.submit(form);

    expect(mockFormAction).toHaveBeenCalled();
  });
});
