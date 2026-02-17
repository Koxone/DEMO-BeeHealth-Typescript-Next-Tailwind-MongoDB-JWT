'use client';

// Next, React and Other Libraries
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Custom Hooks and Stores
import { useGoToConsultasTab } from '@/presentation/hooks/shared/useGoToConsultasTab';

export default function AssignedDiets({ assignedDietsData = [] }) {
  // Dropdown state
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeDiets = assignedDietsData?.filter((diet) => diet.isActive);
  const dietsCount = activeDiets?.length || 0;
  const hasAssignedDiets = dietsCount > 0;
  const assignedDiets = activeDiets?.map((item) => item) || [];

  // Go to Consultas Tab and scroll to "Assign Diet" button
  const { goToConsultasTab } = useGoToConsultasTab();

  return (
    <div className="bg-beehealth-green-primary-solid flex h-full flex-col justify-between space-y-2 rounded-lg p-2">
      {/* Title */}
      <p className="text-xs">
        Dietas Activas:
      </p>

      {/* Content */}
      {hasAssignedDiets && dietsCount > 0 ? (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="button-beehealth-confirm button-beehealth-xs"
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
        <button
          type="button"
          onClick={goToConsultasTab}
          className="button-beehealth-confirm button-beehealth-xs cursor-pointer"
        >
          Ninguna
        </button>
      )}
    </div>
  );
}
