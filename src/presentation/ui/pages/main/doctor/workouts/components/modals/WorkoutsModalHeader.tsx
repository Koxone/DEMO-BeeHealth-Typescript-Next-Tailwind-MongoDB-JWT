// Next, React and Other Libraries
import { X } from 'lucide-react';

// Enums, Types and Interfaces
import { WorkoutTemplateDTOPresentation } from '@/presentation/types/workout.types';
import { PatientTimelineEventDTOPresentation } from '@/presentation/types';

// Constants, Mappers and Helpers
import { WorkoutActiveModalConstant } from '@/presentation/constants/workout/workout.constants';
import { WORKOUT_MODAL_CONFIG } from '@/presentation/services/workout/workoutModalConfig';

// Prop Types
interface HeaderProps {
  selectedWorkout: WorkoutTemplateDTOPresentation | null;
  selectedEvent?: PatientTimelineEventDTOPresentation;
  setActiveModal: (modal: WorkoutActiveModalConstant | null) => void;
  activeModal: WorkoutActiveModalConstant;
}

export default function WorkoutsModalHeader({
  selectedWorkout,
  selectedEvent,
  setActiveModal,
  activeModal,
}: HeaderProps) {
  const { title, description, Icon } = WORKOUT_MODAL_CONFIG[activeModal];

  const imageSource =
    activeModal === null
      ? `url(${selectedEvent?.snapshot?.dietImages?.[0]})`
      : `url(${selectedWorkout?.images?.[0]})`;

  return (
    <div
      className="bg-beehealth-body-main/80 relative"
      style={{
        backgroundImage: imageSource,
        backgroundColor: 'rgba(0,0,0,0.70)',
        backgroundBlendMode: 'darken',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative px-6 py-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="bg-beehealth-blue-primary-solid absolute inset-0 animate-ping rounded-2xl opacity-20" />
              <div className="bg-beehealth-blue-primary-solid relative rounded-2xl p-3 shadow-lg transition-all duration-300">
                <Icon className="h-7 w-7 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <p className="mt-1 text-sm text-white">{description}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="group hover:bg-beehealth-red-primary-solid cursor-pointer rounded-xl bg-gray-100 p-2 text-gray-600 transition-all duration-300 hover:rotate-90 hover:text-white"
          >
            <X className="h-5 w-5 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
