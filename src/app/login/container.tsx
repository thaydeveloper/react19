'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginPresentation } from './login';
import { loginAction } from './actions';
import { LoginState } from '../../interfaces/login.interfaces';

export function LoginContainer() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialState: LoginState = {
    success: false,
    message: '',
    error: null,
  };

  const handleFormAction = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await loginAction(initialState, formData);

      if (result.success) {
        // Guardar token
        if (result.data?.token) {
          localStorage.setItem('token', result.data.token);
        }
        router.push('/dashboard');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Erro inesperado ao fazer login',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginPresentation
      formAction={handleFormAction}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
}
