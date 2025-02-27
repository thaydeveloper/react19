import { Suspense } from 'react';
import { DashboardContainer } from './dashboard.container';
import { LoadingSpinner } from '../../components/loading';

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p>Carregando...</p>
          <LoadingSpinner />
        </div>
      }
    >
      <DashboardContainer />
    </Suspense>
  );
}
