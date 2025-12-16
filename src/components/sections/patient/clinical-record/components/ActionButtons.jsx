import { ArrowLeft, Check } from 'lucide-react';

export default function ActionButtons({ activeTab }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        className="hover:bg-beehealth-body-main flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition active:scale-95"
      >
        <ArrowLeft className="h-5 w-5" />
        Volver
      </button>
      <button
        type="submit"
        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow-md transition active:scale-95 ${
          activeTab === 'peso'
            ? 'bg-blue-500 hover:bg-blue-600'
            : 'bg-purple-500 hover:bg-purple-600'
        }`}
      >
        <Check className="h-5 w-5" />
        Completar Registro
      </button>
    </div>
  );
}
