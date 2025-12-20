export default function HeaderWelcome({
  role,
  fullName,
  specialty,
}: {
  role: string;
  fullName?: string;
  specialty?: string;
}) {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      {role === 'doctor' && (
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          {specialty === 'weight' ? 'Control de Peso' : `Bienvenida Dra ${fullName}`}
        </h1>
      )}
      {role === 'patient' && (
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          Bienvenido(a), {fullName}
        </h1>
      )}
      {role === 'employee' && (
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          Bienvenido(a), {fullName}
        </h1>
      )}
      <p className="text-sm text-gray-600 md:text-base">{today}</p>
    </div>
  );
}
