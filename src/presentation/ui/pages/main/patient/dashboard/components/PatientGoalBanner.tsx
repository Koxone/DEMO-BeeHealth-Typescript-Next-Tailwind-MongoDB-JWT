import { Weight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PatientGoalBanner({ goalsData = [], currentUser }) {
  // Library hooks
  const router = useRouter();

  // Active goal
  const activeGoal = goalsData?.find((goal) => goal.isActive === true);

  // State flags
  const hasActiveGoal = !!activeGoal;
  const hasCurrentWeight = currentUser?.currentWeight != null;

  // Difference to goal
  const weightDifference =
    hasActiveGoal && hasCurrentWeight ? currentUser.currentWeight - activeGoal.goal : null;

  // Goal achieved
  const goalAchieved = weightDifference != null && weightDifference <= 0;

  // Goal close (within 2kg)
  const goalClose = weightDifference != null && weightDifference > 0 && weightDifference <= 2;

  // Remaining kg
  const remainingKg = weightDifference != null ? Math.abs(weightDifference).toFixed(1) : null;

  return (
    <div
      className={`${goalAchieved ? 'bg-beehealth-green-secondary-solid' : 'bg-beehealth-blue-primary-solid'} rounded-xl p-4 text-white shadow-sm md:p-6`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-15 w-15 items-center justify-center rounded-full bg-white/20">
          <Weight className="h-8 w-8" />
        </div>

        <div className="flex-1">
          {!hasActiveGoal && (
            <>
              <h3 className="mb-2 text-lg font-semibold">Aún no tienes una meta</h3>
              <p className="text-sm text-blue-50">
                Pídele a tu médico que establezca tu meta nutricional en tu próxima consulta.
              </p>
            </>
          )}

          {hasActiveGoal && goalAchieved && (
            <>
              <h3 className="mb-2 text-lg font-semibold">¡Meta alcanzada! 🎉</h3>
              <p className="mb-3 text-sm text-blue-50">
                Has alcanzado tu objetivo de {activeGoal.goal} kg. Excelente trabajo.
              </p>
              <p className="mb-3 text-xs text-blue-50">
                Pide a tu medico que establezca una nueva meta para ti en tu próxima consulta.
              </p>
            </>
          )}

          {hasActiveGoal && goalClose && !goalAchieved && (
            <>
              <h3 className="mb-2 text-lg font-semibold">¡Ya casi lo logras!</h3>
              <p className="mb-3 text-sm text-blue-50">
                Te faltan solo <strong>{remainingKg} kg</strong> para llegar a tu meta.
              </p>
            </>
          )}

          {hasActiveGoal && !goalClose && !goalAchieved && (
            <>
              <h3 className="mb-2 text-lg font-semibold">Meta: Llegar a {activeGoal.goal} kg</h3>
              <h4 className="mb-2 text-sm font-semibold">
                Peso inicial: {activeGoal.initialWeight} kg
              </h4>
              <p className="mb-3 text-sm text-blue-50">{activeGoal.notes}</p>
            </>
          )}

          {hasActiveGoal && (
            <button
              onClick={() => router.push('/patient/history')}
              className="bg-beehealth-body-main text-beehealth-blue-primary-solid rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-blue-50 active:scale-95"
            >
              Ver mi progreso
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
