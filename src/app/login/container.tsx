"use client";

import { useOptimistic, useActionState } from "react";
import { LoginPresentation } from "./presentation";
import { loginAction } from "./actions";
import { initialState } from "@/constants/login.constants";
import { OptimisticState } from "@/interfaces/login.interfaces";
import { useRouter } from "next/navigation";

export function LoginContainer() {
  const router = useRouter();
  const [state, , isPending] = useActionState(loginAction, initialState);
  const [optimisticState, addOptimistic] = useOptimistic(
    { isSubmitting: false },
    (state: OptimisticState, newState: Partial<OptimisticState>) => ({
      ...state,
      ...newState,
    })
  );

  async function handleSubmit(formData: FormData) {
    addOptimistic({ isSubmitting: true });

    try {
      const result = await loginAction(initialState, formData);

      if (result?.success && result.data) {
        localStorage.setItem("token", result.data.token);
        router.push("/login");
      }

      console.log("Resposta do login:", result);
    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      addOptimistic({ isSubmitting: false });
    }
  }

  return (
    <LoginPresentation
      formAction={handleSubmit}
      isSubmitting={optimisticState.isSubmitting || isPending}
      error={!state.success ? state.message : null}
    />
  );
}
