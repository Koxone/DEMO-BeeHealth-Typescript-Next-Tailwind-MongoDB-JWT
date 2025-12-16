'use client';

import { useMemo, useState, useCallback } from 'react';
import TabsHeader from './components/TabsHeader';
import ActionButtons from './components/ActionButtons';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/get/useGetAllQuestions';

// Inputs to render
import Text from './components/inputs/Text';
import Number from './components/inputs/Number';
import Date from './components/inputs/Date';
import Select from './components/inputs/Select';
import Radio from './components/inputs/Radio';
import { useCreateClinicalRecordPatient } from '@/hooks/clinicalRecords/create/useCreateClinicalRecordPatient';

export default function CreateClinicalRecord() {
  // Local States
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('weight');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all questions
  const { questions } = useGetAllQuestions();

  // Active Questions filter by active tab
  const activeQuestions = useMemo(() => {
    const list = questions || [];
    return list
      .filter((q) => q.specialty === activeTab && q.version === 'full')
      .sort((a, b) => a.questionId - b.questionId);
  }, [questions, activeTab]);

  // setter
  const handleChange = useCallback((id, val) => {
    setFormData((prev) => {
      if (prev[id] === val) return prev;
      return { ...prev, [id]: val };
    });
  }, []);

  // Custom Hook Create Clinical Record
  const { submit, isSubmitting: loadingCreate } = useCreateClinicalRecordPatient();

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const answersArray = Object.entries(formData).map(([questionId, value]) => ({
      questionId,
      value,
    }));

    const result = await submit({
      specialty: activeTab,
      answers: answersArray,
    });

    if (!result.ok) {
      console.error('Error creating Clinical Record:', result.error);
      setIsSubmitting(false);
      return;
    }

    setFormData({});
    setIsSubmitting(false);
  };

  // Render helper
  const QuestionComponents = {
    text: Text,
    date: Date,
    number: Number,
    select: Select,
    radio: Radio,
  };

  return (
    <div className="h-full overflow-y-auto p-4 py-6 md:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
            Crea tu primer Historial Clinico
          </h1>
          <p className="text-sm text-gray-600 md:text-base">Selecciona el tipo de consulta</p>
        </div>

        {/* Card */}
        <div className="bg-beehealth-body-main overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
          <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          <form
            className="grid grid-cols-2 items-center space-x-4 p-4 md:p-8"
            onSubmit={handleSubmit}
          >
            {/* Fields to render */}
            {activeQuestions?.map((question) => {
              const Component = QuestionComponents[question.type];
              if (!Component) return null;

              return (
                <Component
                  key={question?._id}
                  id={question?._id}
                  question={question?.text}
                  value={formData[question?._id] || ''}
                  onChange={(val) => handleChange(question?._id, val)}
                  options={question?.options}
                />
              );
            })}

            {/* Actions */}
            <div className="col-span-2 mt-4 flex justify-end">
              <ActionButtons activeTab={activeTab} isSubmitting={isSubmitting || loadingCreate} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
