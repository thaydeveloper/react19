"use client";

import { Suspense, use } from "react";
import { CarService } from "@/api/car.service";
import { DashboardPresentation } from "./dashboard";

async function fetchCars() {
  try {
    return await CarService.getAll();
  } catch (error: any) {
    throw new Error(error.message || "Erro ao buscar carros");
  }
}

export function DashboardContainer() {
  const cars = use(fetchCars());

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPresentation cars={cars} loading={true} error={null} />;
    </Suspense>
  );
}
