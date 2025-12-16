import { ArrowLeft, Check } from 'lucide-react';

export default function ActionButtons({ activeTab, isSubmitting }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {/* Back */}
      <button
        type="button"
        className="hover:bg-beehealth-body-main flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition active:scale-95"
      >
        <ArrowLeft className="h-5 w-5" />
        Volver
      </button>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow-md transition active:scale-95 ${
          activeTab === 'weight'
            ? 'bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-dark'
            : 'bg-purple-500 hover:bg-purple-600'
        } ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
      >
        {/* Loading state */}
        {isSubmitting ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        ) : (
          <Check className="h-5 w-5" />
        )}

        {isSubmitting ? 'Guardando...' : 'Completar Registro'}
      </button>
    </div>
  );
}
