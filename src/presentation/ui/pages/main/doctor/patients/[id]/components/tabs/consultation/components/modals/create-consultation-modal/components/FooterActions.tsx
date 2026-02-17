'use client';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Prop Types
interface FooterActionsProps {
  submitLabel: string;
  isSubmitting: boolean;
}

export default function FooterActions({ submitLabel, isSubmitting }: FooterActionsProps) {
  // Modal Management with Store
  const { closeModal } = useActiveModalStore();

  return (
    <div className="mt-6 flex gap-3">
      <button
        type="button"
        onClick={() => closeModal()}
        disabled={isSubmitting}
        className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition active:scale-95 disabled:opacity-50"
      >
        Cancelar
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-beehealth-blue-primary-solid flex-1 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50"
      >
        {isSubmitting ? 'Guardando...' : submitLabel}
      </button>
    </div>
  );
}
