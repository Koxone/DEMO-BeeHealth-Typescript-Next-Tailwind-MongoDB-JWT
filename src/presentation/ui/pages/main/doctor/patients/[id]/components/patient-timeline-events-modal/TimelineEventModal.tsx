'use client';

// Next, React and Other Libraries
import { Apple, CircleEllipsis, Clipboard, Star } from 'lucide-react';

// UI Components
import DietTabModalHeader from '@/presentation/ui/pages/main/doctor/patients/[id]/components/tabs/diets/components/DietTabModalHeader';

// Custom Hooks and Stores
import { useModalClose } from '@/presentation/hooks/shared';
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Constants, Mappers, Services and Helpers
import { complianceColorMap, getRatingText } from './services/helpers';
import { formatDateToMXShort } from '@/presentation/services/dateFormatter';
import { dietComplianceLabelMapConstant } from '@/presentation/constants/diet';

// Enums, Types and Interfaces
import { ComplianceStatusEnum, TimelineCategoryEnum, TimelineEventTypeEnum } from '@/domain/enums/';
import TabsModalHeader from '@/presentation/ui/pages/main/shared/modals/TabsModalHeader';
import { PatientTimelineEventDTOPresentation } from '@/presentation/types';

// Prop Types
interface PatientTimelineEventsModalProps {
  selectedTimelineEventCard: PatientTimelineEventDTOPresentation;
}

export default function TimelineEventModal({
  selectedTimelineEventCard,
}: PatientTimelineEventsModalProps) {
  // Modal Management with Store
  const { activeModal, data, openModal, closeModal } = useActiveModalStore();

  const { handleOverlayClick } = useModalClose(() => closeModal());

  const snapshot = selectedTimelineEventCard?.snapshot;
  const eventType = selectedTimelineEventCard?.eventType;
  const compliance = snapshot?.compliance;
  const category = selectedTimelineEventCard?.category;
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
          <TabsModalHeader selectedEvent={selectedTimelineEventCard} />

          <div className="relative h-full overflow-y-auto p-6">
            <div className="bg-beehealth-body-main mb-6 overflow-hidden rounded-2xl border-2 border-gray-200 shadow-sm">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-lg bg-blue-100 p-3">
                    <Apple className="text-beehealth-blue-primary-dark h-8 w-8" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-xl font-bold text-gray-700">
                      {category === TimelineCategoryEnum.DIET
                        ? snapshot?.dietName
                        : snapshot?.workoutName}
                    </p>
                    <div className="text-sm text-gray-600">
                      <p className="flex items-center">
                        <span className="w-24 font-medium text-gray-700">
                          {eventType === TimelineEventTypeEnum.DIET_CANCELLED
                            ? 'Cancelada:'
                            : eventType === TimelineEventTypeEnum.DIET_COMPLETED ||
                                eventType === TimelineEventTypeEnum.DIET_ASSIGNED
                              ? 'Asignada:'
                              : 'Renovada:'}
                        </span>
                        <span>{formatDateToMXShort(selectedTimelineEventCard?.createdAt)}</span>
                      </p>

                      {eventType === TimelineEventTypeEnum.DIET_COMPLETED &&
                        snapshot?.completedAt && (
                          <p className="flex items-center">
                            <span className="w-24 font-medium text-gray-700">Completada:</span>
                            <span>{formatDateToMXShort(snapshot.completedAt)}</span>
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Buttons */}
            {compliance?.status && compliance.status !== ComplianceStatusEnum.PENDING && (
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                  <Clipboard className="h-5 w-5 text-gray-600" />
                  <p className="text-sm font-semibold text-gray-800">Cumplimiento del paciente</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(ComplianceStatusEnum)
                    .filter((s) => s !== ComplianceStatusEnum.PENDING)
                    .map((status) => {
                      const isSelected = compliance.status === status;
                      return (
                        <button
                          key={status}
                          disabled
                          className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all ${
                            isSelected
                              ? `${complianceColorMap[status]} scale-105 shadow-md`
                              : 'border-gray-200 bg-gray-50 text-gray-400'
                          }`}
                        >
                          {dietComplianceLabelMapConstant[status]}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Rating Stars */}
            {compliance?.rating > 0 && (
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-gray-600" />
                  <p className="text-sm font-semibold text-gray-800">Calificación de adherencia</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-8 w-8 ${
                          star <= compliance.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-300 text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {getRatingText(compliance.rating)}
                  </p>
                </div>
              </div>
            )}

            {/* Doctor Notes */}
            {(compliance?.doctorNotes || snapshot?.reason) && (
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                  <CircleEllipsis className="h-5 w-5 text-gray-600" />
                  <p className="text-sm font-semibold text-gray-800">
                    {eventType === TimelineEventTypeEnum.DIET_CANCELLED
                      ? 'Motivo de cancelación'
                      : 'Notas del doctor'}
                  </p>
                </div>
                <div className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 p-3 text-sm text-gray-800">
                  {compliance?.doctorNotes || snapshot?.reason}
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => closeModal()}
                className="bg-beehealth-body-main hover:bg-beehealth-body-main flex-1 cursor-pointer rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-800 shadow-sm transition-all duration-300 hover:border-gray-400 hover:shadow-md active:scale-95"
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
