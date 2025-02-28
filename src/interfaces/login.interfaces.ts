export interface LoginState {
  success: boolean;
  message: string;
  error: Error | null;
  data?: {
    token?: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface OptimisticState {
  isSubmitting: boolean | null;
}
