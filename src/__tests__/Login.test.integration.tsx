import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginContainer } from '../app/login/container';
import { AuthService } from '../api/auth.service';
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

// Mock específico para o loginAction
jest.mock('../app/login/actions', () => ({
  loginAction: jest.fn(),
}));

jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useOptimistic: jest.fn().mockImplementation((initialState, reducer) => {
      const [state, setState] = originalReact.useState(initialState);
      const dispatch = action => {
        setState(reducer(state, action));
      };
      return [state, dispatch];
    }),
    useActionState: jest.fn().mockImplementation((action, initialState) => {
      const [state, setState] = originalReact.useState(initialState);
      const isPending = false;
      const dispatch = async formData => {
        const result = await action(initialState, formData);
        setState(result);
        return result;
      };
      return [state, dispatch, isPending];
    }),
  };
});

describe('LoginContainer Integração', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
    document.cookie = '';
  });

  test('deve realizar login com sucesso e redirecionar para dashboard', async () => {
    const mockToken = 'fake-token-123';
    (AuthService.login as jest.Mock).mockResolvedValue({ token: mockToken });
    (loginAction as jest.Mock).mockImplementation(
      async (prevState, formData) => {
        return {
          success: true,
          message: 'Login realizado com sucesso',
          data: { token: mockToken },
        };
      },
    );

    render(<LoginContainer />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByRole('button');

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
    (AuthService.login as jest.Mock).mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });

    (loginAction as jest.Mock).mockImplementation(
      async (prevState, formData) => {
        return {
          success: false,
          message: errorMessage,
          error: new Error(errorMessage),
        };
      },
    );

    const { rerender } = render(<LoginContainer />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByRole('button');

    fireEvent.change(emailInput, {
      target: { value: 'thaydeveloper26@gmail.com' },
    });
    fireEvent.change(passwordInput, { target: { value: 'senha-errada' } });
    fireEvent.click(submitButton);

    // Re-renderiza o componente com o estado atualizado para simular a atualização após a chamada da API
    rerender(<LoginContainer />);

    // Força a renderização da mensagem de erro
    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent(errorMessage);
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  test('deve validar campos obrigatórios antes de enviar requisição', async () => {
    const errorMessage = 'Email e senha são obrigatórios';

    (loginAction as jest.Mock).mockImplementation(
      async (prevState, formData) => {
        return {
          success: false,
          message: errorMessage,
          error: new Error(errorMessage),
        };
      },
    );

    const { rerender } = render(<LoginContainer />);

    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);

    // Re-renderiza o componente com o estado atualizado
    rerender(<LoginContainer />);

    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent(errorMessage);
      expect(AuthService.login).not.toHaveBeenCalled();
    });
  });

  test('deve lidar com erros genéricos do servidor', async () => {
    const networkErrorMsg = 'Erro de conexão com o servidor';
    (AuthService.login as jest.Mock).mockRejectedValue(
      new Error(networkErrorMsg),
    );

    (loginAction as jest.Mock).mockImplementation(
      async (prevState, formData) => {
        return {
          success: false,
          message: networkErrorMsg,
          error: new Error(networkErrorMsg),
        };
      },
    );

    const { rerender } = render(<LoginContainer />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Senha');
    const submitButton = screen.getByRole('button');

    fireEvent.change(emailInput, { target: { value: 'teste@exemplo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123' } });
    fireEvent.click(submitButton);

    // Re-renderiza o componente com o estado atualizado
    rerender(<LoginContainer />);

    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent(networkErrorMsg);
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
