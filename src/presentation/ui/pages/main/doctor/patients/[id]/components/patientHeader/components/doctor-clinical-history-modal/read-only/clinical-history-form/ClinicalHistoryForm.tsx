'use client';

// UI Components
import { LoadingState } from '@/presentation/ui/pages/main/shared/feedback/';

// Config and Constants
import { QuestionComponents } from '@/presentation/ui/config/patient/create-clinical-history/createClinicalHistory';

// Custom Hooks
import { useGetClinicalHistoryQuestions } from '@/presentation/hooks/clinical-history';

// Enums, Types and DTOs
import {
  ClinicalHistoryTemplateSectionDTOPresentation,
  ClinicalHistoryQuestionDTOPresentation,
} from '@/presentation/types/clinical-history.types';
import { ClinicalHistoryDTOPresentation } from '@/presentation/types/clinical-history.types';
import { UserSpecialty } from '@/domain/enums/';

// Prop Types
interface ClinicalHistoryFormProps {
  patientClinicalHistory: ClinicalHistoryDTOPresentation;
}

export default function ClinicalHistoryForm({ patientClinicalHistory }: ClinicalHistoryFormProps) {
  // State
  const activeTab = UserSpecialty.WEIGHT;

  // Fetch Questions from Custom Hook
  const { data: questionGroup = [], isLoading } = useGetClinicalHistoryQuestions(activeTab);

  // Map Answers
  const answersMap =
    (patientClinicalHistory?.answers as any[])?.reduce(
      (acc, curr) => {
        acc[curr.questionId] = curr.value;
        return acc;
      },
      {} as Record<number, string>
    ) || {};

  // Loading State
  if (isLoading) return <LoadingState />;

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <div className="mx-auto max-w-4xl">
        {/* Card */}
        <div className="bg-beehealth-body-main overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
          <form className="p-4 md:p-8">
            {/* Sections */}
            {questionGroup?.map((group: ClinicalHistoryTemplateSectionDTOPresentation) => (
              <div key={group?.category} className="mb-8">
                <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-bold text-gray-700 uppercase">
                  {group?.category}
                </h2>

                <div className="grid grid-cols-2 items-center gap-4">
                  {group?.questions.map((question: ClinicalHistoryQuestionDTOPresentation) => {
                    const Component = QuestionComponents[question.type];
                    if (!Component) return null;

                    return (
                      <Component
                        key={question.questionId}
                        readOnly={true}
                        id={question.questionId}
                        question={question.text}
                        value={answersMap[question.questionId] || ''}
                        placeholder={question.placeholder}
                        options={question.options}
                        required={question.required}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
