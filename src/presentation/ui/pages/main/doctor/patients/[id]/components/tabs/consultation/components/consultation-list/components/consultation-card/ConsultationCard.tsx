// Next, React and Other Libraries
import { Eye } from 'lucide-react';

// UI Components
import SortableAnswerCard from './components/SortableAnswerCard';
import ActionButtons from './components/ActionButtons';
import DietPlanCard from './components/DietPlanCard';
import WorkoutPlanCard from './components/WorkoutPlanCard';

// Enums, Types and Interfaces
import { ConsultationDTOPresentation } from '@/presentation/types';

// Services, Mappers, Constants and Helpers
import { getCalendarDateMX } from '@/presentation/services/dateFormatter';
import { CATEGORY_ORDER, CATEGORY_BG_MAP } from '@/presentation/constants/consultation';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Prop Types
interface HistoryCardProps {
  consultation: ConsultationDTOPresentation;
}

function HistoryCard({ consultation }: HistoryCardProps) {
  // Modal Management with Store
  const { openModal } = useActiveModalStore();

  const { month, day } = getCalendarDateMX(consultation.createdAt);

  // Sort Answers Based on CATEGORY_ORDER
  const sortedAnswers = [...(consultation?.answers || [])].sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(CATEGORY_BG_MAP[a.questionText] as any);
    const indexB = CATEGORY_ORDER.indexOf(CATEGORY_BG_MAP[b.questionText] as any);

    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });
  return (
    <div className="rounded-xl border border-neutral-300 p-3 shadow-sm transition hover:shadow-md sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
        {/* Date */}
        <div className="text-beehealth-blue-primary-dark bg-beehealth-blue-primary-light flex h-12 w-12 flex-col items-center justify-center rounded-lg sm:h-14 sm:w-14">
          {/* Month */}
          <span className="text-[10px] leading-none font-medium uppercase sm:text-xs">{month}</span>

          {/* Day */}
          <span className="text-base leading-tight font-bold sm:text-lg">{day}</span>
        </div>

        {/* Consultation Answers */}
        <div className="grid w-full grid-cols-6 grid-rows-2 items-center justify-start gap-2">
          {sortedAnswers.map((answer) => (
            <SortableAnswerCard key={answer?.questionText} answer={answer} />
          ))}

          {/* Diets in this Consultation */}
          {consultation?.dietPlans &&
            consultation?.dietPlans?.map((diet) => (
              <DietPlanCard key={diet?.id} dietName={diet?.dietName} dietId={diet?.dietId} />
            ))}

          {/* Workouts in this Consultation */}
          {consultation?.workoutPlans &&
            consultation?.workoutPlans?.map((workout) => (
              <WorkoutPlanCard
                key={workout?.id}
                workoutName={workout?.workoutName}
                workoutId={workout?.workoutId}
              />
            ))}
        </div>
        <button
          onClick={() => openModal('viewConsultation', consultation)}
          className="hover:bg-medtrack-green-solid bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover cursor-pointer self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5"
        >
          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <ActionButtons patientId={consultation.patientId} consultation={consultation} />
      </div>
    </div>
  );
}

export default HistoryCard;
