'use client';

// Next, React and Other Libraries
import { Play, Info, AlertCircle, Target, Dumbbell, Clock } from 'lucide-react';

// Enums, Types and Interfaces
import { WorkoutTemplateDTOPresentation } from '@/presentation/types/workout.types';

// Constants, Mappers and Helpers
import { WorkoutActiveModalConstant } from '@/presentation/constants/workout/workout.constants';
import { getYoutubeEmbedUrl } from '@/presentation/services/workout/getYoutubeEmbedUrl';

// Custom Hooks
import { useModalClose } from '@/presentation/hooks/shared';

// UI Components
import WorkoutsModalHeader from '../WorkoutsModalHeader';

// Prop types
interface ViewWorkoutModalProps {
  workout: WorkoutTemplateDTOPresentation | null;
  setActiveModal: (modal: WorkoutActiveModalConstant | null) => void;
}

export default function ViewWorkoutModal({ workout, setActiveModal }: ViewWorkoutModalProps) {
  // Close handler
  const { handleOverlayClick } = useModalClose(() => setActiveModal(null));

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
          <WorkoutsModalHeader
            selectedWorkout={workout}
            activeModal="view"
            setActiveModal={setActiveModal}
          />

          <div className="space-y-6 p-6">
            {/* Carousel */}
            <div className="relative">
              <div className="relative h-64 overflow-hidden rounded-xl bg-gray-200 md:h-96">
                <img
                  src={workout?.images[0]}
                  alt={`${workout?.name} - Imagen 1`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Video */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Play className="h-5 w-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-700">Video Tutorial</h3>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                {getYoutubeEmbedUrl(workout?.video) && (
                  <iframe
                    src={getYoutubeEmbedUrl(workout?.video)}
                    className="absolute top-0 left-0 h-full w-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4">
              <Clock className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Duración</p>
                <p className="font-semibold text-gray-700">{workout?.duration} minutos</p>
              </div>
            </div>

            {/* About */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-700">Explicación</h3>
              </div>
              <p className="leading-relaxed text-gray-700">{workout?.about}</p>
            </div>

            {/* Instructions */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-700">Instrucciones</h3>
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

            {/* Benefits */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-700">Beneficios</h3>
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

            {/* Cautions */}
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-700">Precauciones</h3>
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
