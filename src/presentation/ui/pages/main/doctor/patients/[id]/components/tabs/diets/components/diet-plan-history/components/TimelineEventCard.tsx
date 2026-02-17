// Services, Mappers, Constants and Helpers
import { DietActiveModalConstant } from '@/presentation/constants/diet';
import { getCalendarDateMX } from '@/presentation/services/dateFormatter';

// Enums, Types and Interfaces
import { PatientTimelineResponseDTO } from '@/application/dto/patient-timeline/PatientTimelineResponseDTO';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';
import { PatientTimelineEventDTOPresentation } from '@/presentation/types/patient-timeline.types';

// Prop Types
interface DietHistoryCardProps {
  record: PatientTimelineEventDTOPresentation;
  badge: {
    className: string;
    label: string;
  };
  BadgeIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function TimelineEventCard({ record, badge, BadgeIcon }: DietHistoryCardProps) {
  // Modal Management with Store
  const { openModal } = useActiveModalStore();
  return (
    <div
      key={record?.id}
      onClick={() => {
        openModal('dietEvent', record);
      }}
      className="bg-beehealth-green-primary-light hover:bg-beehealth-green-primary-light-hover flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 p-4 transition-colors"
    >
      <div className="flex items-center gap-4">
        {/* Date */}
        <div className="border-beehealth-blue-primary-light bg-beehealth-blue-primary-light flex h-12 w-12 flex-col items-center justify-center rounded-lg border text-center">
          <span className="text-beehealth-blue-primary-dark text-xs font-medium uppercase">
            {getCalendarDateMX(record?.createdAt)?.month}
          </span>
          <span className="text-beehealth-blue-primary-dark text-lg font-bold">
            {getCalendarDateMX(record?.createdAt)?.day}
          </span>
        </div>

        {/* Info */}
        <div>
          <p className="font-semibold text-gray-700">
            {record?.snapshot?.dietName || 'Nombre de dieta no disponible'}
          </p>
        </div>
      </div>

      {/* Action badge */}
      <div
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${badge.className}`}
      >
        <BadgeIcon className="h-4 w-4" />
        {badge.label}
      </div>
    </div>
  );
}
