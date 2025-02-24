interface DashboardProps {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

export function DashboardPresentation({
  cars,
  loading,
  error,
}: DashboardProps) {
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Carros</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Modelo</th>
              <th className="px-4 py-2 border">Marca</th>
              <th className="px-4 py-2 border">Ano</th>
              <th className="px-4 py-2 border">Cor</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{car.model}</td>
                <td className="px-4 py-2 border">{car.brand}</td>
                <td className="px-4 py-2 border">{car.year}</td>
                <td className="px-4 py-2 border">{car.color}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
