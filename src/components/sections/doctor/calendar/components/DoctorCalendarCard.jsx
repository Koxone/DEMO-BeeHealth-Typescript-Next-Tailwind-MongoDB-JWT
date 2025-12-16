/* calendar card */
import CalendarHeader from './CalendarHeader';
import WeekdaysRow from './WeekdaysRow';
import DaysGrid from './DaysGrid';
import Legend from './Legend';

export default function DoctorCalendarCard({
  monthName,
  days,
  selectedDate,
  onPrev,
  onNext,
  onSelectDate,
  helpers,
  icons,
}) {
  return (
    <div className="bg-beehealth-body-main rounded-2xl border-2 border-gray-200 p-6 shadow-lg transition hover:shadow-xl lg:col-span-2">
      <CalendarHeader
        monthName={monthName}
        totalAppointmentsThisMonth={null}
        onPrev={onPrev}
        onNext={onNext}
        icons={icons}
        statsText=""
      />
      <WeekdaysRow />
      <DaysGrid
        days={days}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        helpers={helpers}
      />
      <Legend />
    </div>
  );
}
