"use server";

import { CarService } from "@/api/car.service";
import { cookies } from "next/headers";
import { Car } from "@/interfaces/car.interfaces";

interface DashboardState {
  cars: Car[];
  error: string | null;
  success: boolean;
}

export async function getCarsAction(
  state: DashboardState
): Promise<DashboardState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");

    if (!token) {
      return {
        cars: [],
        error: "Não autorizado",
        success: false,
      };
    }

    const cars = await CarService.getAll(token.value);

    return {
      cars,
      error: null,
      success: true,
    };
  } catch (error) {
    return {
      cars: [],
      error: error instanceof Error ? error.message : "Erro desconhecido",
      success: false,
    };
  }
}
