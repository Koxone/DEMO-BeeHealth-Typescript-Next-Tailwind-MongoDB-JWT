'use client';

// Next, React and Other Libraries
import { CalendarIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

// UI Components
import FooterActions from './FooterActions';
import { QuestionComponents } from '@/presentation/ui/config/patient/create-clinical-history/createClinicalHistory';

// Feedback Components
import { LoadingState } from '@/presentation/ui/pages/main/shared/feedback/';

// Enums, Types and Interfaces
import {
  ClinicalHistoryQuestionDTOPresentation,
  LatestConsultationResponseDTOPresentation,
  ConsultationAnswerDTOPresentation,
} from '@/presentation/types/';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';
import { useGetConsultationTemplates } from '@/presentation/hooks/consultation/useGetConsultationTemplate';
import { useCreateConsultation } from '@/presentation/hooks/consultation/useCreateConsultation';
import { ConsultationAnswerDTO } from '@/application/dto/consultation/GetConsultationResponse';

// Prop Types
interface CreateConsultationPropTypes {
  patientId: string;
  isReadOnly?: boolean;
  latestConsultation: LatestConsultationResponseDTOPresentation;
}

export default function CreateConsultationForm({
  patientId,
  isReadOnly = false,
  latestConsultation,
}: CreateConsultationPropTypes) {
  // Modal Management with Store
  const { openModal, closeModal } = useActiveModalStore();

  // Fetch Consultation Template based on patient's specialty
  const { data: questionGroups = [], isLoading, isError } = useGetConsultationTemplates('weight');

  // Mutation for creating consultation
  const { mutateAsync: createConsultation, isPending } = useCreateConsultation(patientId);

  // Local States
  const [formData, setFormData] = useState<Record<number, unknown>>({});

  // Feed form data if latest consultation is provided
  useEffect(() => {
    const answersList = latestConsultation?.props?.answers?.answers;

    if (answersList && Array.isArray(answersList)) {
      const initialData: Record<number, unknown> = {};
      answersList.forEach((ans: ConsultationAnswerDTOPresentation) => {
        initialData[ans.questionId] = ans.value;
      });
      setFormData(initialData);
    }
  }, [latestConsultation]);

  // Handle Input Changes
  const handleChange = useCallback(
    (id: number, val: unknown) => {
      if (isReadOnly) return;
      setFormData((prev) => ({ ...prev, [id]: val }));
    },
    [isReadOnly]
  );

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;

    try {
      const allQuestions = questionGroups.flatMap((g) => g.questions);

      const answers: ConsultationAnswerDTO[] = Object.entries(formData).map(([id, value]) => {
        const questionInfo = allQuestions.find((q) => q.questionId === Number(id));

        if (!questionInfo) {
          throw new Error(`Pregunta con id ${id} no encontrada`);
        }

        return {
          questionId: Number(id),
          questionText: questionInfo.text,
          questionType: questionInfo.type,
          value,
        };
      });

      await createConsultation(answers);

      openModal('success', {
        title: 'Consulta guardada',
        message: 'La consulta se ha guardado exitosamente.',
      });

      setTimeout(() => {
        closeModal();
      }, 1200);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  // Loading State
  if (isLoading) return <LoadingState />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-1">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
          <CalendarIcon className="text-beehealth-blue-primary-dark h-5 w-5" />
          Nueva Consulta Médica
        </h3>
        <span
          className={`w-fit rounded-lg px-2 py-1 text-xs font-medium ${
            isReadOnly
              ? 'bg-beehealth-green-secondary-light text-beehealth-green-secondary-dark'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {isReadOnly ? 'Modo: Solo Lectura' : 'Modo: Registro de Consulta'}
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
                  onChange={(val: unknown) => handleChange(question.questionId, val)}
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

      {!isReadOnly && <FooterActions submitLabel="Guardar Consulta" isSubmitting={isPending} />}
    </form>
  );
}
