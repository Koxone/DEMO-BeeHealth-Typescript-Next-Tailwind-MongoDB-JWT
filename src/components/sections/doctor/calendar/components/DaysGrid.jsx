'use client';

export default function DaysGrid({ days, selectedDate, onSelectDate, helpers }) {
  const { hasAppointments, getAppointmentsForDate, formatDate } = helpers;
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((date, index) => {
        if (!date) return <div key={`empty-${index}`} className="aspect-square" />;
        const hasApts = hasAppointments(date);
        const isSelected = selectedDate && formatDate(selectedDate) === formatDate(date);
        const isToday = formatDate(date) === formatDate(new Date());
        const aptCount = getAppointmentsForDate(date).length;
        return (
          <button
            key={index}
            onClick={() => onSelectDate(date)}
            className={`group relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-semibold transition ${
              isSelected
                ? 'bg-beehealth-blue-primary-solid z-10 scale-110 text-white shadow-lg'
                : hasApts
                  ? 'border-beehealth-green-primary-dark/50 border-2 bg-linear-to-br from-blue-50 to-indigo-50 text-gray-900 hover:scale-105 hover:from-blue-100 hover:to-indigo-100 hover:shadow-md'
                  : 'bg-beehealth-body-main text-gray-600 hover:scale-105 hover:bg-gray-100'
            } ${isToday && !isSelected ? 'ring-beehealth-green-primary-dark ring-2 ring-offset-1' : ''} active:scale-95`}
          >
            <span className="mb-1">{date.getDate()}</span>
            {hasApts && (
              <div
                className={`flex items-center gap-1 ${isSelected ? 'text-white' : 'text-blue-600'}`}
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-beehealth-body-main' : 'bg-blue-600'}`}
                />
                <span className="text-xs font-bold">{aptCount}</span>
              </div>
            )}
            {isToday && !isSelected && (
              <div className="absolute -top-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-red-600" />
            )}
          </button>
        );
      })}
    </div>
  );
}
