'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function AssignedDiets({ assignedDietsData }) {
  // Dropdown state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeDiets = assignedDietsData?.filter((diet) => diet.isActive);
  const dietsCount = activeDiets?.length || 0;
  const hasAssignedDiets = dietsCount > 0;
  const assignedDiets = activeDiets?.map((item) => item) || [];

  return (
    <div className="bg-beehealth-green-primary-solid flex h-full flex-col justify-between space-y-2 rounded-lg p-2">
      {/* Title */}
      <p className="text-xs">
        {hasAssignedDiets ? 'Dietas activas a este paciente:' : 'Ninguna dieta activa'}
      </p>

      {/* Content */}
      {hasAssignedDiets && dietsCount > 0 ? (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex w-full appearance-none items-center justify-between rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
          >
            {dietsCount === 1 ? assignedDiets[0]?.diet?.name : `${dietsCount} dietas activas`}
            <ChevronDown
              size={18}
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full right-0 left-0 z-10 mt-1 max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {assignedDiets.map((diet) => (
                <Link
                  key={diet._id}
                  href={`/doctor/diets/${diet?.diet?._id}`}
                  className="block w-full px-3 py-2 text-sm text-gray-800 transition first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100"
                >
                  {diet?.diet?.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          href="/doctor/diets"
          className="bg-beehealth-blue-secondary-solid hover:bg-beehealth-blue-secondary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
        >
          Ir a asignar dieta
        </Link>
      )}
    </div>
  );
}
