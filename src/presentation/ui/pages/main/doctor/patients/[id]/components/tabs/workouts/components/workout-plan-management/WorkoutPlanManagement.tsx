// Next, React and Other Libraries
import { Utensils } from 'lucide-react';

// UI Components
import ManageWorkoutPlanCard from './components/ManageWorkoutPlanCard';

// Enums, Types and Interfaces
import { WorkoutPlanDTOPresentation } from '@/presentation/types/';

// Prop Types
interface WorkoutPlanManagementProps {
  patientWorkoutPlansData: WorkoutPlanDTOPresentation[];
  consultationId: string | null;
}

export default function WorkoutPlanManagement({
  patientWorkoutPlansData,
  consultationId,
}: WorkoutPlanManagementProps) {
  return (
    <div className="space-y-6">
      {/* Assigned workouts */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <Utensils className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-700">Gestion de Entrenamientos</h3>
            <p className="text-sm text-gray-500">
              {consultationId
                ? 'Click en un entrenamiento para activar o desactivar del plan de este paciente.'
                : 'Es necesario seleccionar una consulta para poder asignar o remover un entrenamiento del plan de un paciente'}
            </p>
          </div>
        </div>

        {/* Workout Card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {patientWorkoutPlansData?.map((workout) => (
            <ManageWorkoutPlanCard
              workout={workout}
              key={workout?.workoutId}
              consultationId={consultationId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
