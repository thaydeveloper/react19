import api from "./axios.config";

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
      const response = await api.post<LoginResponse>("login", credentials);
      console.log("auth response", response.data);

      return response.data;
    } catch (error: any) {
      console.error("AuthService - Erro detalhado:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  }

  static logout(): void {
    localStorage.removeItem("token");
  }

  static isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static getToken(): string | null {
    return localStorage.getItem("token");
  }
}
