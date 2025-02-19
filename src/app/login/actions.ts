"use server";

import { LoginState } from "@/interfaces/login.interfaces";

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);

    // Implemente sua lógica de autenticação aqui
    // const result = await authenticate(email, password)

    return {
      success: true,
      message: "Login realizado com sucesso",
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro ao realizar login",
    };
  }
}
