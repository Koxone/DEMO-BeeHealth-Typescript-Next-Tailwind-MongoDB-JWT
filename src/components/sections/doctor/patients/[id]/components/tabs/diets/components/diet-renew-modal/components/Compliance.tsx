import { ClipboardCheck } from 'lucide-react';

import { ComplianceStatus } from '@/types/diet/diet.types';

const complianceOptions: { value: ComplianceStatus; label: string; color: string }[] = [
  { value: 'completed', label: 'Cumplió', color: 'bg-green-100 text-green-700 border-green-300' },
  {
    value: 'partial',
    label: 'Parcial',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  },
  {
    value: 'not_completed',
    label: 'No cumplió',
    color: 'bg-red-100 text-red-700 border-red-300',
  },
  { value: 'pending', label: 'Pendiente', color: 'bg-gray-100 text-gray-800 border-gray-300' },
];

function Compliance({
  complianceStatus,
  setComplianceStatus,
}: {
  complianceStatus: ComplianceStatus;
  setComplianceStatus: (value: ComplianceStatus) => void;
}) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <ClipboardCheck className="h-5 w-5 text-gray-600" />
        <p className="text-sm font-semibold text-gray-800">¿El paciente cumplió con la dieta?</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {complianceOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setComplianceStatus(option.value)}
            className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
              complianceStatus === option.value
                ? `${option.color} scale-105 shadow-md`
                : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Compliance;
