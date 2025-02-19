"use client";

import { useOptimistic } from "react";
import { useFormState } from "react-dom";
import { LoginPresentation } from "./presentation";
import { loginAction } from "./actions";
import { initialState } from "@/constants/login.constants";
import { OptimisticState } from "@/interfaces/login.interfaces";

export function LoginContainer() {
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
    await formAction(formData);
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
