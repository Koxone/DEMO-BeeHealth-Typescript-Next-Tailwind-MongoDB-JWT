'use client';

/* calendar header */
export default function CalendarHeader({ monthName, onPrev, onNext, icons }) {
  const { ChevronLeft, ChevronRight } = icons;
  return (
    <div className="mb-6 flex items-center justify-between border-b-2 border-gray-200 pb-4">
      <button
        onClick={onPrev}
        className="group rounded-xl border border-gray-200 p-3 transition hover:border-blue-300 hover:bg-blue-50 active:scale-95"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600 transition group-hover:-translate-x-1 group-hover:text-blue-600" />
      </button>
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 capitalize md:text-2xl">{monthName}</h2>
      </div>
      <button
        onClick={onNext}
        className="group rounded-xl border border-gray-200 p-3 transition hover:border-blue-300 hover:bg-blue-50 active:scale-95"
      >
        <ChevronRight className="h-5 w-5 text-gray-600 transition group-hover:translate-x-1 group-hover:text-blue-600" />
      </button>
    </div>
  );
}
