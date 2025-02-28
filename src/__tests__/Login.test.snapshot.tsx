import React from 'react';
import { render } from '@testing-library/react';
import { LoginPresentation } from '../app/login/login';

describe('LoginPresentation Snapshots', () => {
  const mockFormAction = jest.fn();

  test('deve corresponder ao snapshot no estado inicial', () => {
    const { container } = render(
      <LoginPresentation
        formAction={mockFormAction}
        isSubmitting={false}
        error={null}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('deve corresponder ao snapshot no estado de carregamento', () => {
    const { container } = render(
      <LoginPresentation
        formAction={mockFormAction}
        isSubmitting={true}
        error={null}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  test('deve corresponder ao snapshot quando há erro', () => {
    const { container } = render(
      <LoginPresentation
        formAction={mockFormAction}
        isSubmitting={false}
        error="Email ou senha inválidos"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
