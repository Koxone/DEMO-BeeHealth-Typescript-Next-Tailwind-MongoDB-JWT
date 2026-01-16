'use client';
import GoalButton from '@/components/sections/doctor/patients/[id]/components/consults-history/components/GoalButton';
import { FileText } from 'lucide-react';

/* empty */
export default function EmptyState({
  visible,
  goal = false,
  onClickGoal = () => {},
  title = 'No se encontraron consultas',
  subtitle = 'Intenta con otra búsqueda o registra una nueva consulta',
}) {
  if (!visible) return null;
  return (
    <div className="p-12 text-center">
      <div className="bg-beehealth-blue-primary-solid mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
        <FileText className="h-10 w-10 text-white" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-700">{title}</h3>
      <p className="text-gray-600">{subtitle}</p>

      {/* Create Goal Button */}
      {goal && (
        <div className="mx-auto mt-4 w-fit">
          <GoalButton onClick={onClickGoal} />
        </div>
      )}
    </div>
  );
}
