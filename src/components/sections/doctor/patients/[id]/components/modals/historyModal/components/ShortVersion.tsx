import { CalendarIcon } from 'lucide-react';
import { useMemo } from 'react';
import FooterActions from './FooterActions';

// Local Helpers
import { CATEGORY_ORDER } from '../services/helpers';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';

// Custom Hooks
import { useGetAllQuestions } from '@/hooks/clinicalRecords/get/useGetAllQuestions';

export default function ShortVersion({
  specialty,
  isReadOnly = true,
  formData,
  setFormData,
  activeTab,
  onClose,
  isSubmitting,
  isCreate,
}) {
  // Fetch questions
  const { questions, loading } = useGetAllQuestions();
  const filtered = questions?.filter((q) => q.version === 'short' && q.specialty === specialty);

  // Group questions by category
  const groupedQuestions = useMemo(() => {
    if (!filtered) return [];

    const groups = {};

    filtered.forEach((question) => {
      const category = question.category;
      if (!category || category.trim() === '') return;

      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(question);
    });

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

    Object.entries(groups).forEach(([category, questions]: [string, typeof filtered]) => {
      if (questions.length > 0) {
        orderedGroups.push({ category, questions });
      }
    });

    return orderedGroups;
  }, [filtered]);

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-700">
          <CalendarIcon className="h-5 w-5 text-blue-600" />
          Información Básica
        </h3>

        <span
          className={`mb-4 w-fit rounded-lg ${
            isReadOnly
              ? 'bg-beehealth-green-secondary-light text-beehealth-green-secondary-dark'
              : 'bg-beehealth-red-primary-light text-beehealth-red-primary-dark'
          } p-1 text-xs`}
        >
          {isReadOnly ? 'Solo Lectura' : 'Modo Edicion'}
        </span>
      </div>

      {/* Main Content */}
      {groupedQuestions.map((group) => (
        <div key={group.category} className="mb-8">
          <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-bold text-gray-700 uppercase">
            {group.category}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {group.questions.map((q) => (
              <div key={q?._id}>
                {/* Label */}
                <label className="mb-2 block text-sm font-semibold text-gray-700">{q?.text}</label>

                {/* Input or Textarea */}
                {q?.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={formData[q.questionId] || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [q.questionId]: e.target.value }))
                    }
                    readOnly={isReadOnly}
                    disabled={isReadOnly}
                    className={`focus:bg-beehealth-body-main bg-beehealth-body-main w-full resize-none rounded-xl border-2 px-4 py-3 outline-none ${
                      isReadOnly ? 'border-gray-300 bg-gray-100 text-gray-500' : 'border-gray-200'
                    }`}
                  />
                ) : q?.type === 'radio' ? (
                  <div className="flex gap-4">
                    {q.options?.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 text-sm ${
                          isReadOnly ? 'text-gray-500' : 'cursor-pointer'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.questionId}`}
                          value={option.value}
                          checked={formData[q.questionId] === option.value}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              [q.questionId]: e.target.value,
                            }))
                          }
                          disabled={isReadOnly}
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input
                    type={q?.type}
                    value={formData[q.questionId] || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [q.questionId]: e.target.value }))
                    }
                    readOnly={isReadOnly}
                    disabled={isReadOnly}
                    className={`focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 px-4 py-3 outline-none ${
                      isReadOnly ? 'border-gray-300 bg-gray-100 text-gray-500' : 'border-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {!isReadOnly && activeTab === 'basico' && (
        <FooterActions
          onCancel={onClose}
          submitLabel={isCreate ? 'Guardar nuevo registro' : 'Guardar cambios'}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
