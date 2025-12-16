import { X, Calendar, Sparkles } from 'lucide-react';

/* Header */
export default function Header({ title, onClose }) {
  return (
    <div className="bg-beehealth-body-main relative border-b border-gray-100">
      <div className="relative px-6 py-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-indigo-600 p-3 shadow-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                Actualiza la información de la consulta
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-gray-100 p-2 transition-all duration-200 hover:bg-red-500"
          >
            <X className="h-5 w-5 text-gray-600 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
