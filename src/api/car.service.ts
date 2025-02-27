import api from './axios.config';
import { Car } from '../interfaces/car.interfaces';

export class CarService {
  static async getAll(token?: string): Promise<Car[]> {
    try {
      const response = await api.get<Car[]>('car', {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
      throw error;
    }
  }
}
