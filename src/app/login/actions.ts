'use server';

import { AuthService } from '../../api/auth.service';
import { LoginState } from '../../interfaces/login.interfaces';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
}

export async function loginAction(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      return {
        success: false,
        message: 'Email e senha são obrigatórios',
        error: null,
      };
    }

    const result = await AuthService.login({
      email: email as string,
      password: password as string,
    });
    console.log('Resposta recebida: no action', result);

    return {
      success: true,
      message: 'Login realizado com sucesso',
      data: result,
    };
  } catch (error: unknown) {
    const errorMessage =
      (error as ApiError).response?.data?.message ||
      (error as Error).message ||
      'Erro ao realizar login';

    console.error('LoginAction - Erro completo:', {
      message: errorMessage,
      // Se você tiver mais informações no erro, você pode acessá-las aqui
    });

    return {
      success: false,
      message: errorMessage,
      error: error as Error,
    };
  }
}
