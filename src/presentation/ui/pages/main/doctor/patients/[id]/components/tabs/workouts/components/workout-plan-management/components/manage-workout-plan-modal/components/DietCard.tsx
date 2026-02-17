// Next, React and Other Libraries
import { Power, PowerOff } from 'lucide-react';

// Mappers, Services, Constants and Helpers
import { formatDateToMXShort } from '@/presentation/services/dateFormatter';
import { DietPlanResponseDTOPresentation } from '@/presentation/types';

// Prop Types
interface DietCardProps {
  selectedDiet: DietPlanResponseDTOPresentation;
  isDeactivating: boolean;
}

function DietCard({ selectedDiet, isDeactivating }: DietCardProps) {
  return (
    <div className="bg-beehealth-body-main mb-6 overflow-hidden rounded-2xl border-2 border-gray-200 shadow-sm">
      <div className="bg-linear-to-br from-gray-50 to-gray-100 px-4 py-2">
        <p className="text-xs font-semibold tracking-wide text-gray-600 uppercase">
          Dieta seleccionada
        </p>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`rounded-lg p-2 ${isDeactivating ? 'bg-red-100' : 'bg-green-100'}`}>
            {isDeactivating ? (
              <PowerOff className="h-5 w-5 text-red-600" />
            ) : (
              <Power className="h-5 w-5 text-green-600" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-700">{selectedDiet?.dietSnapshot?.name}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {selectedDiet?.dietSnapshot?.category}
              </span>

              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  selectedDiet?.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {selectedDiet?.status === 'active' ? 'Activa' : 'Inactiva'}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Asignada: {formatDateToMXShort(selectedDiet?.startDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DietCard;
