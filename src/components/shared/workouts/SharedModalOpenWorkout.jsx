'use client';

import { useModalClose } from '@/hooks/useModalClose';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Info,
  AlertCircle,
  Target,
  Dumbbell,
  Clock,
} from 'lucide-react';

const getNivelColor = (nivel) => {
  const map = {
    Principiante: 'bg-green-100 text-green-800',
    Intermedio: 'bg-yellow-100 text-yellow-800',
    Avanzado: 'bg-red-100 text-red-800',
  };
  return map[nivel] || 'bg-gray-100 text-gray-800';
};

export default function SharedModalOpenWorkout({
  workout,
  currentImageIndex,
  setCurrentImageIndex,
  onClose,
}) {
  // Close handler
  const { handleOverlayClick } = useModalClose(onClose);

  // Carousel Handlers
  const nextImage = () =>
    setCurrentImageIndex((prev) =>
      workout?.images?.length ? (prev === workout.images.length - 1 ? 0 : prev + 1) : 0
    );
  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      workout?.images?.length ? (prev === 0 ? workout.images.length - 1 : prev - 1) : 0
    );

  // Convert video URL to embed format
  const getEmbedUrl = (url) => {
    const match = url.match(/v=([^&]+)/);
    const id = match ? match[1] : null;
    return id ? `https://www.youtube.com/embed/${id}` : url;
  };
  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div className="pointer-events-none relative inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="animate-slideUp bg-beehealth-body-main pointer-events-auto max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-beehealth-body-main sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{workout?.name}</h2>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${getNivelColor(workout?.difficulty)}`}
                >
                  {workout?.difficulty}
                </span>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                  {workout?.type}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-gray-100 active:scale-95"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="space-y-6 p-6">
            {/* Carousel */}
            <div className="relative">
              <div className="relative h-64 overflow-hidden rounded-xl bg-gray-200 md:h-96">
                <img
                  src={workout?.images[currentImageIndex]}
                  alt={`${workout?.name} - Imagen ${currentImageIndex + 1}`}
                  className="h-full w-full object-cover"
                />
                {workout?.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 active:scale-95"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 active:scale-95"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                      {workout?.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 w-2 rounded-full transition ${
                            index === currentImageIndex
                              ? 'bg-beehealth-body-main w-6'
                              : 'bg-beehealth-body-main/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Video */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Play className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Video Tutorial</h3>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={getEmbedUrl(workout?.video)}
                  className="absolute top-0 left-0 h-full w-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Duración */}
            <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
              <Clock className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Duración</p>
                <p className="font-semibold text-gray-900">{workout?.duration} minutos</p>
              </div>
            </div>

            {/* Explicación */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Explicación</h3>
              </div>
              <p className="leading-relaxed text-gray-700">{workout?.about}</p>
            </div>

            {/* Instrucciones */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Instrucciones</h3>
              </div>
              <ol className="space-y-2">
                {workout?.instructions?.map((inst, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-gray-700">{inst}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Beneficios */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Beneficios</h3>
              </div>
              <ul className="space-y-2">
                {workout?.benefits?.map((ben, index) => (
                  <li key={index} className="flex gap-2 text-gray-700">
                    <span className="font-bold text-green-600">✓</span>
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Precauciones */}
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">Precauciones</h3>
              </div>
              <ul className="space-y-2">
                {workout?.cautions?.map((prec, index) => (
                  <li key={index} className="flex gap-2 text-gray-700">
                    <span className="font-bold text-yellow-600">⚠</span>
                    <span>{prec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
