import { Weight } from 'lucide-react';

export default function PatientMotivationalBanner({ goalsData }) {
  const hasActiveGoals = goalsData && goalsData?.some((goal) => goal.isActive === true);

  return (
    <div className="bg-beehealth-blue-primary-solid rounded-xl p-4 text-white shadow-sm md:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-15 w-15 items-center justify-center rounded-full bg-white/20">
          <Weight className="h-8 w-8" />
        </div>
        <div className="flex-1">
          {hasActiveGoals ? (
            <>
              <h3 className="mb-2 text-lg font-semibold">Meta: Llegar a {goalsData[0].goal}kg</h3>
              <h4 className="mb-2 text-sm font-semibold">
                Peso inicial: {goalsData[0].initialWeight}kg
              </h4>
              <p className="mb-3 text-sm text-blue-50">{goalsData[0].notes}</p>
              <button className="bg-beehealth-body-main rounded-lg px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 active:scale-95">
                Ver mi progreso
              </button>
            </>
          ) : (
            <>
              <h3 className="mb-2 text-lg font-semibold">Aún no tienes una meta</h3>
              <p className="text-sm text-blue-50">
                Pídele a tu médico que establezca tu meta nutricional en tu próxima consulta.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
