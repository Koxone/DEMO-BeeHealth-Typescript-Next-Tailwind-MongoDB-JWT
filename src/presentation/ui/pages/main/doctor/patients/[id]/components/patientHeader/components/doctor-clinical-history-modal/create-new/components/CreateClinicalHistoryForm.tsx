'use client';

import { useCallback, useEffect, useState } from 'react';

// UI Components
import { LoadingState } from '@/presentation/ui/pages/main/shared/feedback/';

// Config and Constants
import { QuestionComponents } from '@/presentation/ui/config/patient/create-clinical-history/createClinicalHistory';

// Types and Interfaces
import {
  ClinicalHistoryTemplateSectionDTOPresentation,
  ClinicalHistoryQuestionDTOPresentation,
} from '@/presentation/types/';

// Application Layer
import { ClinicalHistoryMapper } from '@/presentation/services/clinicalHistoryMapper';
import { ClinicalHistoryValidator } from '@/presentation/services/clinicalHistoryValidator';

// Services
import { createPatientClinicalHistory } from '@/presentation/services/createPatientClinicalHistory';
import { queryClient } from '@/presentation/providers/tanstackQueryClient';

interface Props {
  patientId: string;
}

export default function CreateClinicalHistoryForm({ patientId }: Props) {
  // State
  const [formData, setFormData] = useState<Record<number, unknown>>({});
  const [questionGroup, setQuestionGroup] = useState<
    ClinicalHistoryTemplateSectionDTOPresentation[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/clinical-history/templates/weight`);
        const data = await res.json();
        setQuestionGroup(data.sections);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleChange = useCallback((id: number, val: unknown) => {
    setFormData((prev) => {
      if (prev[id] === val) return prev;
      return { ...prev, [id]: val };
    });
  }, []);

  const handleSubmit = async () => {
    const validation = ClinicalHistoryValidator.validateRequiredFields(formData, questionGroup);
    if (!validation.isValid) return;
    if (!patientId) return;

    setIsSubmitting(true);

    try {
      const payload = ClinicalHistoryMapper.toCreateDTO(patientId, formData, questionGroup);
      await createPatientClinicalHistory(payload);

      await queryClient.invalidateQueries({
        queryKey: ['patient-clinical-history', patientId],
      });

      setFormData({});
    } catch (error) {
      console.error('Error creating clinical history:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => setFormData({});

  if (isLoading) return <LoadingState />;

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <div className="mx-auto max-w-4xl">
        {/* Card con los mismos estilos originales */}
        <div className="bg-beehealth-body-main overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
          <form
            className="p-4 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
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
                        id={question.questionId}
                        question={question.text}
                        value={formData[question.questionId] ?? ''}
                        onChange={(val: unknown) => handleChange(question.questionId, val)}
                        placeholder={question.placeholder}
                        options={question.options}
                        required={question.required}
                      />
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Actions: Botones con clases originales */}
            <div className="mt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-gray-300 px-6 py-2 text-gray-600 transition-colors hover:bg-gray-100"
                disabled={isSubmitting}
              >
                Limpiar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-amber-500 px-6 py-2 text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Historial'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
