// Next, React and Other Libraries
import { ClipboardCheck } from 'lucide-react';

// Enums, Types and Interfaces
import { ComplianceStatusEnum } from '@/domain/enums/';

// Constants and Helpers
import { dietComplianceStylesConstant } from '@/presentation/constants/diet';

// Prop Types
interface ComplianceProps {
  complianceStatus: ComplianceStatusEnum;
  setComplianceStatus: (value: ComplianceStatusEnum) => void;
}

function Compliance({ complianceStatus, setComplianceStatus }: ComplianceProps) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <ClipboardCheck className="h-5 w-5 text-gray-600" />
        <p className="text-sm font-semibold text-gray-800">¿El paciente cumplió con la dieta?</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {dietComplianceStylesConstant.map((option) => (
          <button
            key={option.value}
            onClick={() => setComplianceStatus(option.value)}
            className={`cursor-pointer rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
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
