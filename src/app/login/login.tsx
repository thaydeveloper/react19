'use client';

import React from 'react';

interface LoginPresentationProps {
  formAction: (formData: FormData) => void;
  isSubmitting: boolean;
  error: string | null;
}

export function LoginPresentation({
  formAction,
  isSubmitting,
  error,
}: LoginPresentationProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Login
        </h2>

        {error && (
          <div
            className="mb-4 rounded-md bg-red-50 p-4 text-red-700"
            role="alert"
            data-testid="error-message"
          >
            {error}
          </div>
        )}

        <form
          className="space-y-4"
          action={formAction}
          data-testid="login-form"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Digite seu email"
              className="mt-2 block w-full h-[50px] p-[10px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Digite sua senha"
              className="mt-1 block w-full h-[50px] p-[10px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
