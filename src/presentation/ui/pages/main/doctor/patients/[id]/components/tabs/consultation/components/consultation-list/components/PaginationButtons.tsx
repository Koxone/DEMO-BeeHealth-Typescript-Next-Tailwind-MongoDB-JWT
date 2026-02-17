// Next, React and Other Libraries
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Prop Types
interface ConsultationHistoryProps {
  onClickPrev: () => void;
  onClickNext: () => void;
  currentPage: number;
  totalPages: number;
}

function PaginationButtons({
  onClickPrev,
  onClickNext,
  currentPage,
  totalPages,
}: ConsultationHistoryProps) {
  return (
    <div className="border-beehealth-blue-primary-solid bg-beehealth-body-main flex w-fit items-center gap-6 justify-self-center rounded-xl px-4 py-3">
      <button
        onClick={onClickPrev}
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
        onClick={onClickNext}
        disabled={currentPage === totalPages}
        className="hover:bg-beehealth-blue-primary-solid flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-700"
      >
        Siguiente
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default PaginationButtons;
