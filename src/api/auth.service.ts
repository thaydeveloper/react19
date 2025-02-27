import api from './axios.config';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('login', credentials);
      console.log('auth response', response.data);

      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('AuthService - Erro detalhado:', {
          message: error.message,
        });
      } else {
        console.error('AuthService - Erro inesperado:', error);
      }
      throw error;
    }
  }

  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  static isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
}
