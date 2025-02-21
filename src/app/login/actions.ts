"use server";

import { AuthService } from "@/api/auth.service";
import { LoginState } from "@/interfaces/login.interfaces";

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return {
        success: false,
        message: "Email e senha são obrigatórios",
        error: null,
      };
    }

    const result = await AuthService.login({
      email: email as string,
      password: password as string,
    });
    console.log("Resposta recebida: no action", result);

    return {
      success: true,
      message: "Login realizado com sucesso",
      data: result,
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Erro ao realizar login";

    console.error("LoginAction - Erro completo:", {
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });

    return {
      success: false,
      message: errorMessage,
      error: error as Error,
    };
  }
}
