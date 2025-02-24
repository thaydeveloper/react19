import api from "./axios.config";
import { Car } from "@/interfaces/car.interfaces";

export class CarService {
  static async getAll(): Promise<Car[]> {
    try {
      const response = await api.get<Car[]>("cars");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
      throw error;
    }
  }
}
