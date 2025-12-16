'use client';

import { useMemo, useState, useCallback } from 'react';
import ActionButtons from './components/ActionButtons';

// Inputs
import Text from './components/inputs/Text';
import Number from './components/inputs/Number';
import DateInput from './components/inputs/Date';
import Select from './components/inputs/Select';
import Radio from './components/inputs/Radio';

// Feedback components
import SuccessModal from '@/components/shared/feedback/SuccessModal';

// Custom Hooks
import { useGetAllQuestions } from '@/hooks/clinicalRecords/get/useGetAllQuestions';
import { useCreateFirstRecordDoctor } from '@/hooks/clinicalRecords/create/useCreateFirstRecordDoctor';
import LoadingState from '@/components/shared/feedback/LoadingState';

export default function CreateFirstRecordForm({
  specialty,
  patientId,
  showSuccessModal,
  setShowSuccessModal,
  setShowCreateFirstRecordModal,
  fetchRecord,
}) {
  // Local state
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState(specialty);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch questions
  const { questions, loading: isLoadingQuestions } = useGetAllQuestions();

  // Filter questions
  const activeQuestions = useMemo(() => {
    const list = questions || [];
    return list
      .filter((q) => q.specialty === activeTab && q.version === 'full')
      .sort((a, b) => a.questionId - b.questionId);
  }, [questions, activeTab]);

  // Map question IDs
  const questionIdMap = useMemo(() => {
    const map = {};
    activeQuestions.forEach((q) => {
      map[q._id] = q.questionId;
    });
    return map;
  }, [activeQuestions]);

  // Setter
  const handleChange = useCallback((id, val) => {
    setFormData((prev) => ({ ...prev, [id]: val }));
  }, []);

  // Custom hook for doctors
  const { submit: createFullRecord, isSubmitting: loadingCreate } = useCreateFirstRecordDoctor();

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format answers
    const answersArray = Object.entries(formData).map(([id, value]) => ({
      id,
      questionId: questionIdMap[id],
      value,
    }));

    const result = await createFullRecord({
      patientId,
      specialty: activeTab,
      answers: answersArray,
    });

    if (!result.ok) {
      console.error('Error creating Clinical Record:', result.error);
      setIsSubmitting(false);
      return;
    }

    setShowCreateFirstRecordModal(false);
    fetchRecord();
    setShowSuccessModal(true);
    setFormData({});
    setIsSubmitting(false);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 500);
  };

  // Components mapping
  const QuestionComponents = {
    text: Text,
    date: DateInput,
    number: Number,
    select: Select,
    radio: Radio,
  };

  if (isLoadingQuestions) {
    return <LoadingState />;
  }
  return (
    <form className="grid grid-cols-2 items-center space-x-4 p-4 md:p-8" onSubmit={handleSubmit}>
      {/* Questions */}
      {activeQuestions?.map((question) => {
        const Component = QuestionComponents[question?.type];
        if (!Component) return null;
        return (
          <Component
            key={question?._id}
            id={question?._id}
            placeholder={question?.placeholder || ''}
            question={question?.text}
            value={formData[question?._id] || ''}
            onChange={(val) => handleChange(question?._id, val)}
            options={question?.options}
            required={question?.required || false}
          />
        );
      })}

      {/* Action buttons */}
      <div className="col-span-2 mt-4 flex justify-end">
        <ActionButtons activeTab={activeTab} isSubmitting={isSubmitting || loadingCreate} />
      </div>
    </form>
  );
}
