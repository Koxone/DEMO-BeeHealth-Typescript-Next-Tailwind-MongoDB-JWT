import { Search, X } from 'lucide-react';

// Types
import { ConfigConsultModalProps } from '@/@types/consults/consults.types';

// Custom Hooks
import { useModalClose } from '@/@hooks/useModalClose';

function ConfigConsultModal({
  selectedQuestions,
  allQuestions,
  filteredQuestions,
  toggleAll,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  CATEGORIES,
  setIsModalOpen,
  groupedQuestions,
  toggleCategory,
  toggleQuestion,
}: ConfigConsultModalProps) {
  // Handle modal close events
  const { handleOverlayClick } = useModalClose(() => setIsModalOpen(false));
  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl rounded-lg bg-white shadow-xl"
      >
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Configurar preguntas visibles</h2>
              <p className="mt-1 text-sm text-gray-500">
                Selecciona qué información quieres ver en todas las consultas
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="group rounded-xl bg-gray-100 p-2 transition-all duration-300 hover:rotate-90 hover:bg-gray-200"
            >
              <X className="h-5 w-5 text-gray-600 transition-colors" />
            </button>
          </div>

          {/* Stats + Search */}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                {selectedQuestions.length} de {allQuestions.length} seleccionadas
              </span>

              <button
                onClick={toggleAll}
                className="text-beehealth-blue-primary-dark text-sm font-medium"
              >
                {filteredQuestions.every((q) => selectedQuestions.includes(q.questionId))
                  ? 'Deseleccionar visibles'
                  : 'Seleccionar visibles'}
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar pregunta..."
                className="focus:border-beehealth-blue-primary-dark focus:ring-beehealth-blue-primary-dark w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:ring-1 focus:outline-none"
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('Todas')}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                selectedCategory === 'Todas'
                  ? 'bg-beehealth-blue-primary-dark text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>

            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  selectedCategory === category
                    ? 'bg-beehealth-blue-primary-dark text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {Object.keys(groupedQuestions).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(groupedQuestions).map(([category, questions]) => {
                const categoryQuestionIds = questions.map((q) => q.questionId);

                const allCategorySelected = categoryQuestionIds.every((id) =>
                  selectedQuestions.includes(id)
                );

                return (
                  <div key={category}>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-700">{category}</h3>

                      <button
                        onClick={() => toggleCategory(category)}
                        className="text-beehealth-blue-primary-dark text-xs font-medium"
                      >
                        {allCategorySelected ? 'Deseleccionar todas' : 'Seleccionar todas'}
                      </button>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {questions.map((question) => (
                        <label
                          key={question.questionId}
                          className="hover:border-beehealth-blue-primary-dark hover:bg-beehealth-blue-primary-light/10 flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3"
                        >
                          <input
                            type="checkbox"
                            checked={selectedQuestions.includes(question.questionId)}
                            onChange={() => toggleQuestion(question.questionId)}
                            className="text-beehealth-blue-primary-dark focus:ring-beehealth-blue-primary-dark mt-0.5 h-4 w-4 rounded border-gray-300"
                          />

                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-700">
                              {question.text}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              #{question.questionId}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm text-gray-500">
                {searchTerm
                  ? 'No se encontraron preguntas que coincidan con tu búsqueda'
                  : 'No hay preguntas disponibles'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 p-6">
          <button
            onClick={() => setIsModalOpen(false)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfigConsultModal;
