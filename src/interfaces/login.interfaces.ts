export interface LoginState {
  message: string | null;
  success: boolean;
  error?: Error | null;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}
export interface OptimisticState {
  isSubmitting: boolean | null;
}
