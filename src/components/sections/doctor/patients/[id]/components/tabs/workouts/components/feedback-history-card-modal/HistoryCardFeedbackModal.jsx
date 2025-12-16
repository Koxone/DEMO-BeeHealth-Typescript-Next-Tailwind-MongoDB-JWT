'use client';
import { useModalClose } from '@/hooks/useModalClose';
import { Apple, History, X } from 'lucide-react';

const complianceMap = {
  completed: 'Completado',
  partial: 'Parcial',
  not_completed: 'No completado',
  pending: 'Pendiente',
};

const complianceColorMap = {
  completed: 'bg-green-100 text-green-700 border-green-300',
  partial: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  not_completed: 'bg-red-100 text-red-700 border-red-300',
  pending: 'bg-gray-100 text-gray-800 border-gray-300',
};

const complianceButtonMap = {
  completed: { label: 'Cumplió' },
  partial: { label: 'Parcial' },
  not_completed: { label: 'No cumplió' },
  pending: { label: 'Pendiente' },
};

const getRatingText = (rating) => {
  const texts = {
    1: 'Muy bajo cumplimiento',
    2: 'Bajo cumplimiento',
    3: 'Cumplimiento regular',
    4: 'Buen cumplimiento',
    5: 'Excelente cumplimiento',
  };
  return texts[rating] || '';
};

export default function HistoryCardFeedbackModal({ onClose, selectedHistoryCard }) {
  /* Block comment: Close handler */
  const { handleOverlayClick } = useModalClose(onClose);

  const { compliance, patient, doctor, diet, snapshot, startDate, completedDate, createdAt } =
    selectedHistoryCard;

  const status = compliance?.status || 'pending';
  const rating = compliance?.rating || 0;
  const doctorNotes = compliance?.doctorNotes || '';
  const reviewedBy = doctor?.fullName || 'No asignado';

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div
        className="relative inset-0 z-50 flex w-full max-w-2xl items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="animate-in fade-in zoom-in-95 relative w-full overflow-hidden rounded-3xl bg-linear-to-br from-white via-blue-50/30 to-indigo-50/30 shadow-2xl duration-300">
          {/* Header */}
          <div
            className="bg-beehealth-body-main/80 relative border-b border-blue-100 backdrop-blur-xl"
            style={{
              backgroundColor: 'rgba(0,0,0,0.70)',
              backgroundBlendMode: 'darken',
            }}
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-indigo-500 opacity-5" />
            <div className="relative px-6 py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-2xl bg-blue-500 opacity-20" />
                    <div className="relative rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 p-3 shadow-lg transition-all duration-300">
                      <History className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Dieta {complianceMap[status]}</h2>
                    <p className="mt-1 text-sm text-white">Revisado por {reviewedBy}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-gray-200"
                >
                  <X className="h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-gray-800" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative h-full overflow-y-auto p-6">
            {/* Diet Card */}
            <div className="bg-beehealth-body-main mb-6 overflow-hidden rounded-2xl border-2 border-gray-200 shadow-sm">
              <div className="bg-linear-to-br from-gray-50 to-gray-100 px-4 py-2">
                <p className="text-xs font-semibold tracking-wide text-gray-600 uppercase">Dieta</p>
              </div>

              {/* Diet Info */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-lg bg-blue-100 p-3">
                    <Apple className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-xl font-bold text-gray-900">
                      {snapshot?.dietName || diet?.name}
                    </p>
                    <div className="text-sm text-gray-600">
                      <p className="flex items-center">
                        <span className="w-24 font-medium text-gray-700">Asignada:</span>
                        <span>{formatDate(startDate)}</span>
                      </p>
                      <p className="flex items-center">
                        <span className="w-24 font-medium text-gray-700">Completada:</span>
                        <span>{formatDate(completedDate)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Status */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p className="text-sm font-semibold text-gray-800">
                  ¿El paciente cumplió con la dieta?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(complianceButtonMap).map(([key, config]) => {
                  const isSelected = status === key;
                  return (
                    <button
                      key={key}
                      disabled
                      className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                        isSelected
                          ? `${complianceColorMap[key]} scale-105 shadow-md`
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {config.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <p className="text-sm font-semibold text-gray-800">Calificación de adherencia</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} disabled className="transition-transform hover:scale-110">
                    <svg
                      className={`h-8 w-8 ${
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-300 text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-2 text-center text-sm font-medium text-gray-700">
                  {getRatingText(rating)}
                </p>
              )}
            </div>

            {/* Doctor Notes */}
            {doctorNotes && (
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm font-semibold text-gray-800">Notas del doctor</p>
                </div>
                <textarea
                  disabled
                  value={doctorNotes}
                  rows={3}
                  className="focus:border-beehealth-blue-primary-solid w-full resize-none rounded-xl border-2 border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 transition-colors focus:bg-white focus:outline-none"
                />
              </div>
            )}

            {/* Close Button */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
