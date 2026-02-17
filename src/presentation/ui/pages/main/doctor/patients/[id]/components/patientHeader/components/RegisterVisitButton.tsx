'use client';

import { Check, BadgeCheck } from 'lucide-react';
import { useState } from 'react';

// Prop types
interface RegisterVisitButtonProps {
  onClick: () => void;
}

export default function RegisterVisitButton({ onClick }: RegisterVisitButtonProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <button
      onClick={onClick}
      className="bg-beehealth-green-secondary-dark hover:bg-beehealth-green-secondary-dark-hover relative flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300"
    >
      {/* Normal state */}
      <span
        className={`flex items-center gap-2 transition-all duration-300 ${
          isChecked ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <BadgeCheck className="h-4 w-4" />
        Check In
      </span>

      {/* Check animation */}
      <span
        className={`absolute flex items-center justify-center transition-all duration-300 ${
          isChecked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <Check className="animate-ping-once h-5 w-5 text-white" />
      </span>
    </button>
  );
}
