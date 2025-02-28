import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginContainer } from '../app/login/container';

import { useRouter } from 'next/navigation';
import { loginAction } from '../app/login/actions';

// Mock das dependências
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../api/auth.service', () => ({
  AuthService: {
    login: jest.fn(),
  },
}));

jest.mock('../app/login/actions', () => ({
  loginAction: jest.fn(),
}));

// Não é necessário mockar o React para este teste

describe('LoginContainer Integração', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // Configurar o localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  test('deve realizar login com sucesso e redirecionar para dashboard', async () => {
    const mockToken = 'fake-token-123';

    (loginAction as jest.Mock).mockResolvedValue({
      success: true,
      message: 'Login realizado com sucesso',
      data: { token: mockToken },
      error: null,
    });

    render(<LoginContainer />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByRole('button', { name: 'Entrar' });

    fireEvent.change(emailInput, {
      target: { value: 'thaydeveloper26@gmail.com' },
    });
    fireEvent.change(passwordInput, { target: { value: 'Thay123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('deve exibir erro quando o login falhar devido a credenciais inválidas', async () => {
    const errorMessage = 'Credenciais inválidas';

    (loginAction as jest.Mock).mockResolvedValue({
      success: false,
      message: errorMessage,
      error: new Error(errorMessage),
    });

    render(<LoginContainer />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByRole('button', { name: 'Entrar' });

    fireEvent.change(emailInput, {
      target: { value: 'thaydeveloper26@gmail.com' },
    });
    fireEvent.change(passwordInput, { target: { value: 'senha-errada' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent(errorMessage);
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test('deve validar campos obrigatórios antes de enviar requisição', async () => {
    const errorMessage = 'Email e senha são obrigatórios';

    (loginAction as jest.Mock).mockResolvedValue({
      success: false,
      message: errorMessage,
      error: new Error(errorMessage),
    });

    render(<LoginContainer />);

    const form = screen.getByTestId('login-form');

    // Use submit no formulário em vez de clicar no botão
    fireEvent.submit(form);

    // Não use rerender aqui, aguarde a atualização do componente
    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent(errorMessage);
    });
  });

  test('deve lidar com erros genéricos do servidor', async () => {
    const networkErrorMsg = 'Erro de conexão com o servidor';

    (loginAction as jest.Mock).mockResolvedValue({
      success: false,
      message: networkErrorMsg,
      error: new Error(networkErrorMsg),
    });

    render(<LoginContainer />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const form = screen.getByTestId('login-form');

    fireEvent.change(emailInput, { target: { value: 'teste@exemplo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });

    // Use submit no formulário em vez de clicar no botão
    fireEvent.submit(form);

    // Remova o rerender daqui também
    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent(networkErrorMsg);
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
