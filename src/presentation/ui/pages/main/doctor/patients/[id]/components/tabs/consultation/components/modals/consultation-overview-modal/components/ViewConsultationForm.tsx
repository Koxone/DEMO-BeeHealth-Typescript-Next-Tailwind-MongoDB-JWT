'use client';

// Next, React and Other Libraries
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

// UI Components
import { LoadingState } from '@/presentation/ui/pages/main/shared/feedback/';

// Config
import { QuestionComponents } from '@/presentation/ui/config/patient/create-clinical-history/createClinicalHistory';

// Custom Hooks and Stores
import { useGetConsultationTemplates } from '@/presentation/hooks/consultation/';

// Enums, Types and Interfaces
import {
  ClinicalHistoryQuestionDTOPresentation,
  ConsultationAnswerDTOPresentation,
  ConsultationDTOPresentation,
} from '@/presentation/types/';

// Prop Types
interface ViewConsultationFormProps {
  isReadOnly?: boolean;
  consultation: ConsultationDTOPresentation;
}

export default function ViewConsultationForm({
  isReadOnly = true,
  consultation,
}: ViewConsultationFormProps) {
  const [formData, setFormData] = useState<Record<number, unknown>>({});

  // Fetch templates to build the structure
  const { data: questionGroups = [], isLoading } = useGetConsultationTemplates('weight');

  // Feed form data with the provided consultation
  useEffect(() => {
    const answersList = consultation?.answers;

    if (answersList && Array.isArray(answersList)) {
      const initialData: Record<number, unknown> = {};
      answersList.forEach((ans: ConsultationAnswerDTOPresentation) => {
        initialData[ans.questionId] = ans.value;
      });
      setFormData(initialData);
    }
  }, [consultation]);

  // Loading State
  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
          <Eye className="text-beehealth-blue-primary-dark h-5 w-5" />
          Detalle de Consulta Médica
        </h3>
        <span className="bg-beehealth-green-secondary-light text-beehealth-green-secondary-dark w-fit rounded-lg px-2 py-1 text-xs font-medium">
          Modo: Solo Lectura
        </span>
      </div>

      {questionGroups.map((group) => (
        <div key={group.category} className="space-y-4">
          <h2 className="border-b border-gray-200 pb-2 text-xl font-bold text-gray-700 uppercase">
            {group.category}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {group.questions.map((question: ClinicalHistoryQuestionDTOPresentation) => {
              const Component = QuestionComponents[question.type];
              if (!Component) return null;

              return (
                <Component
                  key={question.questionId}
                  id={question.questionId}
                  question={question.text}
                  value={formData[question.questionId] ?? ''}
                  onChange={() => {}}
                  placeholder={question.placeholder}
                  options={question.options}
                  required={question.required}
                  disabled={isReadOnly}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
