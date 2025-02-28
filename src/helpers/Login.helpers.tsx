import { RenderResult } from '@testing-library/react';

// Helpers para configuração de testes
export const setupLocalStorageMock = () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    },
    writable: true,
  });
};

export const setupCookies = () => {
  document.cookie = '';
};

// Tipos de mock para reuso
export interface MockAuthServiceReturn {
  success: boolean;
  token?: string;
  error?: string;
}

// Helper para configurar mock de retornos do AuthService
export const mockAuthServiceResponse = (mockReturn: MockAuthServiceReturn) => {
  if (mockReturn.success) {
    return { token: mockReturn.token || 'test-token' };
  } else {
    throw {
      response: {
        data: {
          message: mockReturn.error || 'Erro de autenticação',
        },
      },
    };
  }
};

// Helper para popular formulário de login
export const fillLoginForm = (
  renderResult: RenderResult,
  { email = 'user@example.com', password = 'password123' } = {},
) => {
  const { getByLabelText } = renderResult;
  const emailInput = getByLabelText('Email');
  const passwordInput = getByLabelText('Senha');

  emailInput.setAttribute('value', email);
  passwordInput.setAttribute('value', password);

  return { emailInput, passwordInput };
};
