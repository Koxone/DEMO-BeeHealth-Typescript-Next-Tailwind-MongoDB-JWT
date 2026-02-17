// Next, React and Other Libraries
import { Utensils } from 'lucide-react';

// UI Components
import ManageDietPlanCard from './components/ManageDietPlanCard';

// Enums, Types and Interfaces
import { DietPlanResponseDTOPresentation } from '@/presentation/types';
import { useSearchParams } from 'next/navigation';

// Prop Types
interface DietPlanManagementProps {
  patientDietPlansData?: DietPlanResponseDTOPresentation[];
}

export default function DietPlanManagement({ patientDietPlansData }: DietPlanManagementProps) {
  // Get Consultation ID from URL Search Params
  const searchParams = useSearchParams();
  const consultationId = searchParams.get('consultationId');
  
  return (
    <div className="space-y-6">
      {/* Assigned diets */}
      <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-4 shadow-sm">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="bg-beehealth-blue-primary-solid rounded-xl p-2">
            <Utensils className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-700">Gestion de Dietas</h3>
            <p className="text-sm text-gray-500">
              {consultationId
                ? 'Click en una dieta para activar o desactivar del plan nutricional de este paciente.'
                : 'Es necesario seleccionar una consulta para poder asignar o remover una dieta del plan de un paciente'}
            </p>
          </div>
        </div>

        {/* Diet Card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {patientDietPlansData?.map((diet) => (
            <ManageDietPlanCard diet={diet} key={diet?.id} consultationId={consultationId} />
          ))}
        </div>
      </div>
    </div>
  );
}
