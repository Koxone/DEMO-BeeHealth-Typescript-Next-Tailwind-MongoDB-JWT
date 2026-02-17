'use client';

// React and Library Imports
import { useCallback, useEffect, useState } from 'react';

// UI Components
import TabsHeader from '@/presentation/ui/pages/main/patient/create-clinical-history/components/TabsHeader';
import { LoadingState } from '@/presentation/ui/pages/main/shared/feedback/';
import { SuccessModal } from '@/presentation/ui/pages/main/shared/feedback/';

// Config and Constants
import { QuestionComponents } from '@/presentation/ui/config/patient/create-clinical-history/createClinicalHistory';

// Types and Interfaces
import {
  ClinicalHistoryTemplateSectionDTOPresentation,
  ClinicalHistoryQuestionDTOPresentation,
} from '@/presentation/types/clinical-history.types';

// Custom Hooks
import { useAuth } from '@/presentation/hooks/auth';

// Application Layer
import { ClinicalHistoryMapper } from '@/presentation/services/clinicalHistoryMapper';
import { ClinicalHistoryValidator } from '@/presentation/services/clinicalHistoryValidator';

// Services
import { createPatientClinicalHistory } from '@/presentation/services/createPatientClinicalHistory';
import { UserSpecialty } from '@/domain/enums/';

export default function PatientCreateClinicalHistoryPage() {
  const { currentUser } = useAuth();

  // State
  const [formData, setFormData] = useState<Record<number, unknown>>({});
  const [activeTab, setActiveTab] = useState<UserSpecialty>(UserSpecialty.WEIGHT);
  const [questionGroup, setQuestionGroup] = useState<
    ClinicalHistoryTemplateSectionDTOPresentation[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch questions from API
  const fetchQuestions = async (specialty: UserSpecialty) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/clinical-history/templates/${specialty}`);
      const data = await res.json();
      setQuestionGroup(data.sections);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch questions on tab change
  //? Future-proof: when multiple tabs exist, dependency can be activeTab
  useEffect(() => {
    fetchQuestions(activeTab);
    setFormData({});
  }, [activeTab]);

  const handleChange = useCallback((id: number, val: unknown) => {
    setFormData((prev) => {
      if (prev[id] === val) return prev;
      return { ...prev, [id]: val };
    });
  }, []);

  // Submit Form Handler
  const handleSubmit = async () => {
    const validation = ClinicalHistoryValidator.validateRequiredFields(formData, questionGroup);
    if (!validation.isValid) return;

    if (!currentUser?.id) return;

    setIsSubmitting(true);

    try {
      const payload = ClinicalHistoryMapper.toCreateDTO(currentUser.id, formData, questionGroup);
      await createPatientClinicalHistory(payload);
      setShowSuccessModal(true);
      setFormData({});
    } catch (error) {
      console.error('Error creating clinical history:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset formData Handler
  const handleReset = () => setFormData({});

  // Loading State
  if (isLoading) return <LoadingState />;

  return (
    <div className="h-full space-y-4 overflow-y-auto md:space-y-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-700 md:text-3xl">
            Crea tu primer Historial Clínico
          </h1>
          <p className="text-sm text-gray-600 md:text-base">Selecciona el tipo de consulta</p>
        </div>

        {/* Card */}
        <div className="bg-beehealth-body-main overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
          <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

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

            {/* Actions */}
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

      {showSuccessModal && (
        <SuccessModal
          title="Historial Clínico Creado"
          message="El historial clínico ha sido creado exitosamente."
        />
      )}
    </div>
  );
}
