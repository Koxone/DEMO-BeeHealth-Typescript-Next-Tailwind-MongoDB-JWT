// Next, React and Other Libraries
import { X } from 'lucide-react';

// Enums, Types and Interfaces
import { WorkoutPlanDTOPresentation } from '@/presentation/types';
import { PatientTimelineEventDTOPresentation } from '@/presentation/types/';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';
import { WORKOUT_PLAN_MODAL_CONFIG } from '@/presentation/services/workout-plan/workoutPlanModalConfig';

// Prop Types
interface HeaderProps {
  selectedWorkout: WorkoutPlanDTOPresentation;
  selectedEvent?: PatientTimelineEventDTOPresentation;
}

export default function ModalHeader({ selectedWorkout, selectedEvent }: HeaderProps) {
  // Modal Management with Store
  const { activeModal, closeModal } = useActiveModalStore();

  const { title, description, Icon } = WORKOUT_PLAN_MODAL_CONFIG[activeModal];

  const imageSource =
    activeModal === 'dietEvent'
      ? `url(${selectedEvent?.snapshot?.dietImages?.[0]})`
      : `url(${selectedWorkout.workoutSnapshot?.images?.[0]})`;

  return (
    <div
      className="bg-beehealth-body-main/80 relative backdrop-blur-xl"
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
            onClick={() => closeModal()}
            className="group hover:bg-beehealth-red-primary-solid cursor-pointer rounded-xl bg-gray-100 p-2 text-gray-600 transition-all duration-300 hover:rotate-90 hover:text-white"
          >
            <X className="h-5 w-5 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
