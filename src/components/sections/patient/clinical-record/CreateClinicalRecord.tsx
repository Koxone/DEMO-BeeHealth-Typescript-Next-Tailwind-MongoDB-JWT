'use client';

import { useMemo, useState, useCallback } from 'react';
import TabsHeader from './components/TabsHeader';
import ActionButtons from './components/ActionButtons';

// Inputs to render
import Text from './components/inputs/Text';
import Number from './components/inputs/Number';
import Date from './components/inputs/Date';
import Select from './components/inputs/Select';
import Radio from './components/inputs/Radio';

// Custom Hooks
import { useCreateClinicalRecordPatient } from '@/hooks/clinicalRecords/create/useCreateClinicalRecordPatient';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/get/useGetAllQuestions';

// Orden de categorías
const CATEGORY_ORDER = [
  'Datos Generales',
  'Antropometria',
  'Antecedentes Personales',
  'Patologias',
  'Antecedentes Personales No Patologicos',
  'Medicamentos',
  'Informacion',
  'Antecedentes Heredofamiliares',
  'Alimentacion',
  'Inmunizaciones',
  'Signos Vitales',
];

export default function CreateClinicalRecord() {
  // Local States
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('weight');
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(formData);

  // Fetch all questions
  const { questions } = useGetAllQuestions();

  // Active Questions filter by active tab
  const activeQuestions = useMemo(() => {
    const list = questions || [];
    return list
      .filter((q) => q.specialty === activeTab && q.version === 'full')
      .sort((a, b) => a.questionId - b.questionId);
  }, [questions, activeTab]);

  // Agrupar preguntas por categoría
  const groupedQuestions = useMemo(() => {
    const groups = {};

    activeQuestions.forEach((question) => {
      const category = question.category || 'Sin categoría';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(question);
    });

    // Ordenar según CATEGORY_ORDER
    const orderedGroups = [];
    CATEGORY_ORDER.forEach((categoryName) => {
      if (groups[categoryName]) {
        orderedGroups.push({
          category: categoryName,
          questions: groups[categoryName],
        });
        delete groups[categoryName];
      }
    });

    // Agregar categorías restantes que no estén en el orden definido
    Object.entries(groups).forEach(([category, questions]: [string, any[]]) => {
      if (category && category !== 'Sin categoría' && questions.length > 0) {
        orderedGroups.push({ category, questions });
      }
    });

    return orderedGroups.filter(
      (group) => group.category !== 'En esta consulta' && group.category !== 'Signos Vitales'
    );
  }, [activeQuestions]);

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

    const answersArray = Object.entries(formData).map(([id, value]) => ({
      id,
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
          <h1 className="mb-2 text-2xl font-bold text-gray-700 md:text-3xl">
            Crea tu primer Historial Clinico
          </h1>
          <p className="text-sm text-gray-600 md:text-base">Selecciona el tipo de consulta</p>
        </div>

        {/* Card */}
        <div className="bg-beehealth-body-main overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
          <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          <form className="p-4 md:p-8" onSubmit={handleSubmit}>
            {/* Fields agrupados por categoría */}
            {groupedQuestions.map((group) => (
              <div key={group.category} className="mb-8">
                {/* Título de categoría */}
                <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-bold text-gray-700 uppercase">
                  {group.category}
                </h2>

                {/* Grid de preguntas */}
                <div className="grid grid-cols-2 items-center gap-4">
                  {group.questions.map((question) => {
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
                        required={question?.required}
                      />
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="mt-4 flex justify-end">
              <ActionButtons activeTab={activeTab} loadingCreate={loadingCreate} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
