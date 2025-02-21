"use client";

import { useOptimistic } from "react";
import { useFormState } from "react-dom";
import { LoginPresentation } from "./presentation";
import { loginAction } from "./actions";
import { initialState } from "@/constants/login.constants";
import { OptimisticState } from "@/interfaces/login.interfaces";
import { useRouter } from "next/navigation";

export function LoginContainer() {
  const router = useRouter();
  const [state, formAction] = useFormState(loginAction, initialState);
  const [optimisticState, addOptimistic] = useOptimistic(
    { isSubmitting: false },
    (state: OptimisticState, newState: Partial<OptimisticState>) => ({
      ...state,
      ...newState,
    })
  );

  async function handleSubmit(formData: FormData) {
    addOptimistic({ isSubmitting: true });
    const response = await formAction(formData);
    console.log("Resposta recebida: no container", response);

    // if (response?.data) {
    //   // Salvamos o token no localStorage aqui no cliente
    //   localStorage.setItem("token", response.data.token);
    //   router.push("/dashboard"); // ou para onde você quiser redirecionar após o login
    // }

    addOptimistic({ isSubmitting: false });
  }

  return (
    <LoginPresentation
      formAction={handleSubmit}
      isSubmitting={optimisticState.isSubmitting}
      error={!state.success ? state.message : null}
    />
  );
}
