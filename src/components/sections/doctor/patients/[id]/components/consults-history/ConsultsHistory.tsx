'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Plus, ClipboardList, ChevronLeft, ChevronRight, Settings } from 'lucide-react';

import AddHistoryButton from './components/AddHistoryButton';
import ConsultCard from './components/consult-card/ConsultCard';
import GoalButton from './components/GoalButton';
import CreateFirstRecordButton from './components/CreateFirstRecordButton';
import InitialDataButton from './components/InitialDataButton';

// Custom Hooks
import { useConsultViewConfig } from '@/@hooks/config/useConsultViewConfig';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';
import ErrorState from '@/components/shared/feedback/ErrorState';
import ConfigConsultModal from './components/config-modal/ConfigConsultModal';

// Local Helpers
import { CATEGORIES } from './components/consult-card/services/helpers';

// Pagination Constants
const RECORDS_PER_PAGE = 4;

export default function ConsultsHistory({
  onAdd,
  onEdit,
  onOpen,
  events,
  onDelete,
  questions,
  patientId,
  specialty,
  fetchRecord,
  refetchUser,
  onCreateNew,
  patientRecord,
  hasInitialSize,
  hasInitialWeight,
  setShowHistoryModal,
  setShowCreateGoalModal,
  setShowEditWeightAndSizeModal,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Doctor Config Custom Hook
  const {
    selectedQuestions,
    questionsOrder,
    setSelectedQuestions: setSelectedQuestionsLocal,
    setQuestionsOrder: setQuestionsOrderLocal,
    saveConfig,
    isLoading,
    isSaving,
  } = useConsultViewConfig();

  // All Questions from patient records
  const allQuestions = useMemo(() => {
    if (!patientRecord || patientRecord.length === 0) return [];

    const questionsMap = new Map();

    patientRecord.forEach((record) => {
      if (!record?.answers || !Array.isArray(record.answers)) return;

      record.answers.forEach((answer) => {
        if (!answer) return;
        if (!answer.question) return;
        if (!answer.question.text) return;

        const questionId = answer.questionId || answer.question.questionId;
        if (!questionId) return;

        if (!questionsMap.has(questionId)) {
          questionsMap.set(questionId, {
            questionId: questionId,
            text: answer.question.text,
            category: answer.question.category || 'Sin categoría',
            type: answer.question.type || 'text',
          });
        }
      });
    });

    return Array.from(questionsMap.values()).sort((a, b) => a.questionId - b.questionId);
  }, [patientRecord]);

  const bootstrappedRef = useRef(false);
  const knownIdsRef = useRef<number[]>([]);

  // Sync config with available questions
  useEffect(() => {
    if (isLoading) return;
    if (allQuestions.length === 0) return;

    const allIds = allQuestions.map((q) => q.questionId);

    // First load only
    if (!bootstrappedRef.current) {
      bootstrappedRef.current = true;
      knownIdsRef.current = allIds;

      const isFirstTimeConfig = selectedQuestions.length === 0 && questionsOrder.length === 0;

      if (isFirstTimeConfig) {
        setQuestionsOrderLocal(allIds);
        setSelectedQuestionsLocal(allIds);
        return;
      }

      // Only fix missing order on first load
      const missingInOrder = allIds.filter((id) => !questionsOrder.includes(id));
      if (missingInOrder.length > 0) {
        setQuestionsOrderLocal([...questionsOrder, ...missingInOrder]);
      }

      // Important: Do NOT auto-fill selectedQuestions here
      return;
    }

    // After first load: only append truly new questions
    const prevKnown = knownIdsRef.current;
    const newIds = allIds.filter((id) => !prevKnown.includes(id));
    if (newIds.length === 0) return;

    knownIdsRef.current = allIds;

    setQuestionsOrderLocal((prev) => [...new Set([...prev, ...newIds])]);
    setSelectedQuestionsLocal((prev) => [...new Set([...prev, ...newIds])]);
  }, [
    isLoading,
    allQuestions,
    selectedQuestions,
    questionsOrder,
    setQuestionsOrderLocal,
    setSelectedQuestionsLocal,
  ]);

  // Save config on changes with debounce
  useEffect(() => {
    if (isLoading) return;

    const timeoutId = setTimeout(() => {
      saveConfig(selectedQuestions, questionsOrder);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [selectedQuestions, questionsOrder, isLoading, saveConfig]);

  // Filter questions based on search term and selected category
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((question) => {
      const matchesSearch = question.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Todas' || question.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allQuestions, searchTerm, selectedCategory]);

  // Group questions by category
  const groupedQuestions = useMemo(() => {
    const groups: Record<string, typeof filteredQuestions> = {};

    filteredQuestions.forEach((question) => {
      const category = question.category || 'Sin categoría';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(question);
    });

    return groups;
  }, [filteredQuestions]);

  const totalRecords = patientRecord?.length || 0;
  const totalPages = Math.ceil(totalRecords / RECORDS_PER_PAGE);

  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const endIndex = startIndex + RECORDS_PER_PAGE;
  const visibleRecords = patientRecord?.slice(startIndex, endIndex) || [];

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Handlers for question selection
  const toggleQuestion = (questionId: number) => {
    setSelectedQuestionsLocal((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  const toggleAll = () => {
    const visibleQuestionIds = filteredQuestions.map((q) => q.questionId);
    const allVisible = visibleQuestionIds.every((id) => selectedQuestions.includes(id));

    if (allVisible) {
      setSelectedQuestionsLocal((prev) => prev.filter((id) => !visibleQuestionIds.includes(id)));
    } else {
      setSelectedQuestionsLocal((prev) => [...new Set([...prev, ...visibleQuestionIds])]);
    }
  };

  const toggleCategory = (category: string) => {
    const categoryQuestionIds = (groupedQuestions[category] || []).map((q) => q.questionId);
    const allSelected = categoryQuestionIds.every((id) => selectedQuestions.includes(id));

    if (allSelected) {
      setSelectedQuestionsLocal((prev) => prev.filter((id) => !categoryQuestionIds.includes(id)));
    } else {
      setSelectedQuestionsLocal((prev) => [...new Set([...prev, ...categoryQuestionIds])]);
    }
  };

  const handleOrderChange = (newOrder: number[]) => {
    setQuestionsOrderLocal(newOrder);
  };

  // Loading State
  if (isLoading) {
    return <LoadingState />;
  }

  // Error State
  if (!patientRecord) {
    return <ErrorState />;
  }

  return (
    <>
      <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-4 shadow-sm sm:p-6">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-beehealth-blue-primary-solid flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12">
              <ClipboardList className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-(--med-text-dark) sm:text-xl">
                Historial de Consultas para este paciente
              </h2>
              <p className="text-xs text-(--med-text-muted) sm:text-sm">
                Registros médicos del paciente
              </p>
            </div>
          </div>

          {hasInitialWeight && hasInitialSize && (
            <div className="flex items-center gap-2">
              {patientRecord?.length > 0 && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-beehealth-blue-primary-dark hover:bg-beehealth-blue-primary-dark/90 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Configurar vista</span>
                </button>
              )}
              {patientRecord?.length > 0 ? (
                <AddHistoryButton onAdd={onAdd} />
              ) : (
                <CreateFirstRecordButton onCreateNew={onCreateNew} />
              )}
              <GoalButton onClick={() => setShowCreateGoalModal(true)} />
            </div>
          )}

          {/* Initial Weight and Size */}
          {!hasInitialWeight ||
            (!hasInitialSize && (
              <InitialDataButton onClick={() => setShowEditWeightAndSizeModal(true)} />
            ))}
        </div>

        {/* Records */}
        {patientRecord?.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {visibleRecords.map((r, index) => {
              const bgColors = [
                'bg-beehealth-green-primary-light',
                'bg-beehealth-blue-primary-light',
              ];
              const bgColorClass = bgColors[index % bgColors.length];

              return (
                <div
                  key={r._id}
                  className={`${bgColorClass} rounded-xl p-3 shadow-sm transition hover:shadow-md sm:p-4`}
                  style={{
                    animation: `fadeIn 0.3s ease-out ${index * 100}ms forwards`,
                  }}
                >
                  <ConsultCard
                    selectedQuestions={selectedQuestions}
                    patientRecord={patientRecord}
                    questionsOrder={questionsOrder}
                    onOrderChange={handleOrderChange}
                    r={r}
                    questions={questions}
                    setShowHistoryModal={setShowHistoryModal}
                    onOpen={(record, readOnly) => onOpen(record, readOnly)}
                    onEdit={(record, readOnly) => onEdit(record, readOnly)}
                    specialty={specialty}
                    fetchRecord={fetchRecord}
                    onDelete={onDelete}
                    patientId={patientId}
                    events={events}
                  />
                </div>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-beehealth-blue-primary-solid bg-beehealth-body-main flex w-fit items-center gap-6 justify-self-center rounded-xl px-4 py-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="hover:bg-beehealth-blue-primary-solid flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </button>

                <span className="text-sm text-gray-700">
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="hover:bg-beehealth-blue-primary-solid flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-700"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-beehealth-body-main flex flex-col items-center justify-center rounded-xl border border-(--med-gray-border) py-12 text-center sm:py-16">
            <ClipboardList className="mb-3 h-10 w-10 text-gray-400 sm:h-12 sm:w-12" />
            <p className="mb-1 text-sm font-medium text-(--med-text-dark) sm:text-base">
              Sin registros clínicos
            </p>
            <p className="mb-4 text-xs text-(--med-text-muted) sm:text-sm">
              Comienza agregando el primer registro
            </p>
            <button
              onClick={onAdd}
              className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Agregar Registro
            </button>
          </div>
        )}
      </div>

      {/* Modal de Configuración por Pregunta */}
      {isModalOpen && (
        <ConfigConsultModal
          CATEGORIES={CATEGORIES}
          allQuestions={allQuestions}
          filteredQuestions={filteredQuestions}
          selectedQuestions={selectedQuestions}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          setSearchTerm={setSearchTerm}
          setSelectedCategory={setSelectedCategory}
          setIsModalOpen={setIsModalOpen}
          groupedQuestions={groupedQuestions}
          toggleCategory={toggleCategory}
          toggleQuestion={toggleQuestion}
          toggleAll={toggleAll}
        />
      )}
    </>
  );
}
