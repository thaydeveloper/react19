"use client";

import { useActionState, useEffect, startTransition } from "react";
import { DashboardPresentation } from "./dashboard";
import { getCarsAction } from "./actions.dashboard";

const initialState = {
  cars: [],
  error: null,
  success: true,
};

export function DashboardContainer() {
  const [state, dispatch, isPending] = useActionState(
    getCarsAction,
    initialState
  );

  useEffect(() => {
    startTransition(() => {
      dispatch();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardPresentation
      cars={state.cars}
      error={state.error}
      loading={isPending}
    />
  );
}
