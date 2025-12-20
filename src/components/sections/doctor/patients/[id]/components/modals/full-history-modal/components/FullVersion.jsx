import LoadingState from '@/components/shared/feedback/LoadingState';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { useState, useMemo } from 'react';
import ToggleEditModeButton from './ToggleEditModeButton';

// Custom Hooks
import { useGetAllQuestions } from '@/hooks/clinicalRecords/get/useGetAllQuestions';
import { useGetPatientClinicalRecords } from '@/hooks/clinicalRecords/get/useGetPatientClinicalRecords';

const MONTHS = [
  { value: 1, label: 'Enero' },
  { value: 2, label: 'Febrero' },
  { value: 3, label: 'Marzo' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Mayo' },
  { value: 6, label: 'Junio' },
  { value: 7, label: 'Julio' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Septiembre' },
  { value: 10, label: 'Octubre' },
  { value: 11, label: 'Noviembre' },
  { value: 12, label: 'Diciembre' },
];

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
  'En esta consulta',
];

function GoogleStyleDateInput({ value, isEditing, onChange }) {
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);

  const parseDate = (dateStr) => {
    if (!dateStr) return { day: '', month: '', year: '' };
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return {
        year: parts[0],
        month: parseInt(parts[1]) || '',
        day: parseInt(parts[2]) || '',
      };
    }
    return { day: '', month: '', year: '' };
  };

  const parsed = parseDate(value);
  const selectedMonthLabel = MONTHS.find((m) => m.value === parsed.month)?.label || '';

  const updateDate = (field, newValue) => {
    const newParsed = { ...parsed, [field]: newValue };
    if (newParsed.year && newParsed.month && newParsed.day) {
      const formatted = `${newParsed.year}-${String(newParsed.month).padStart(2, '0')}-${String(newParsed.day).padStart(2, '0')}`;
      onChange(formatted);
    } else {
      const parts = [
        newParsed.year || '',
        newParsed.month ? String(newParsed.month).padStart(2, '0') : '',
        newParsed.day ? String(newParsed.day).padStart(2, '0') : '',
      ];
      onChange(parts.join('-'));
    }
  };

  const baseInputClass = isEditing
    ? 'border-blue-300 bg-white text-gray-700 focus:border-blue-500'
    : 'bg-beehealth-body-main border-gray-300 text-gray-500';

  return (
    <div className="flex gap-2">
      <input
        type="text"
        inputMode="numeric"
        maxLength={2}
        value={parsed.day}
        readOnly={!isEditing}
        disabled={!isEditing}
        onChange={(e) => updateDate('day', e.target.value.replace(/\D/g, ''))}
        placeholder="Día"
        className={`w-16 rounded-xl border-2 px-3 py-3 text-center outline-none ${baseInputClass}`}
      />

      <div className="relative">
        <button
          type="button"
          onClick={() => isEditing && setMonthDropdownOpen(!monthDropdownOpen)}
          disabled={!isEditing}
          className={`flex w-32 items-center justify-between rounded-xl border-2 px-3 py-3 outline-none ${baseInputClass} ${!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className={selectedMonthLabel ? '' : 'text-gray-400'}>
            {selectedMonthLabel || 'Mes'}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>

        {monthDropdownOpen && isEditing && (
          <>
            <div className="fixed inset-0 z-50" onClick={() => setMonthDropdownOpen(false)} />
            <div className="absolute top-full left-0 z-50 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
              {MONTHS.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => {
                    updateDate('month', m.value);
                    setMonthDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  {m.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <input
        type="text"
        inputMode="numeric"
        maxLength={4}
        value={parsed.year}
        readOnly={!isEditing}
        disabled={!isEditing}
        onChange={(e) => updateDate('year', e.target.value.replace(/\D/g, ''))}
        placeholder="Año"
        className={`w-20 rounded-xl border-2 px-3 py-3 text-center outline-none ${baseInputClass}`}
      />
    </div>
  );
}

export default function FullVersion({
  specialty,
  patientId,
  isEditing,
  setIsEditing,
  formData,
  setFormData,
}) {
  const { data: records, isLoading: recordsLoading } = useGetPatientClinicalRecords(patientId);
  const fullRecord = records?.find((r) => r.version === 'full' && r.specialty === specialty);
  const { questions, loading: questionsLoading } = useGetAllQuestions();
  const filtered = questions?.filter((q) => q.version === 'full' && q.specialty === specialty);

  // Agrupar preguntas por categoría
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

    Object.entries(groups).forEach(([category, questions]) => {
      if (questions.length > 0) {
        orderedGroups.push({ category, questions });
      }
    });

    return orderedGroups;
  }, [filtered]);

  if (recordsLoading || questionsLoading) {
    return <LoadingState />;
  }

  if (!fullRecord) {
    return <div className="text-center text-gray-500">No hay registro completo disponible</div>;
  }

  const handleInputChange = (questionId, value) => {
    setFormData((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          {isEditing ? (
            <span className="bg-beehealth-red-primary-solid mb-4 w-fit rounded-lg p-1 text-xs text-white">
              Modo Edición
            </span>
          ) : (
            <span className="bg-beehealth-green-secondary-solid mb-4 w-fit rounded-lg p-1 text-xs text-white">
              Solo Lectura
            </span>
          )}
        </div>

        <ToggleEditModeButton isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>

      {/* Main Content - Agrupado por categorías */}
      {groupedQuestions.map((group) => (
        <div key={group.category} className="mb-8">
          <h2 className="mb-4 border-b border-gray-200 pb-2 text-xl font-bold text-gray-700 uppercase">
            {group.category}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {group.questions.map((q) => {
              const answer = fullRecord.answers?.find((a) => a.question?._id === q._id);
              const currentValue =
                formData[q.questionId] !== undefined ? formData[q.questionId] : answer?.value || '';

              return (
                <div key={q?._id}>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {q?.text}
                  </label>

                  {q?.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={currentValue}
                      readOnly={!isEditing}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange(q.questionId, e.target.value)}
                      className={`w-full resize-none rounded-xl border-2 px-4 py-3 outline-none ${
                        isEditing
                          ? 'border-blue-300 bg-white text-gray-700 focus:border-blue-500'
                          : 'bg-beehealth-body-main border-gray-300 text-gray-500'
                      }`}
                    />
                  ) : q?.type === 'select' ? (
                    <select
                      value={currentValue}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange(q.questionId, e.target.value)}
                      className={`w-full rounded-xl border-2 px-4 py-3 outline-none ${
                        isEditing
                          ? 'border-blue-300 bg-white text-gray-700 focus:border-blue-500'
                          : 'bg-beehealth-body-main border-gray-300 text-gray-500'
                      }`}
                    >
                      <option value="">Seleccionar</option>
                      {q?.options?.map((opt) => (
                        <option key={opt._id} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : q?.type === 'radio' ? (
                    <div className="flex gap-4">
                      {q?.options?.map((opt) => (
                        <label key={opt._id} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={q.questionId}
                            value={opt.value}
                            checked={currentValue === opt.value}
                            disabled={!isEditing}
                            onChange={(e) => handleInputChange(q.questionId, e.target.value)}
                            className="h-4 w-4"
                          />
                          <span className="text-sm text-gray-700">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  ) : q?.type === 'checkbox' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={currentValue === 'true' || currentValue === true}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleInputChange(q.questionId, e.target.checked.toString())
                        }
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">{q?.text}</span>
                    </div>
                  ) : q?.type === 'date' ? (
                    <GoogleStyleDateInput
                      value={currentValue}
                      isEditing={isEditing}
                      onChange={(newValue) => handleInputChange(q.questionId, newValue)}
                    />
                  ) : (
                    <input
                      type={q?.type}
                      value={currentValue}
                      readOnly={!isEditing}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange(q.questionId, e.target.value)}
                      className={`w-full rounded-xl border-2 px-4 py-3 outline-none ${
                        isEditing
                          ? 'border-blue-300 bg-white text-gray-700 focus:border-blue-500'
                          : 'bg-beehealth-body-main border-gray-300 text-gray-500'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
