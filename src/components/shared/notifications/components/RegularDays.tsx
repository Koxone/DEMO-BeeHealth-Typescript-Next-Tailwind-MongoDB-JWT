import { Calendar } from 'lucide-react';
import RegularDaysCard from './RegularDaysCard';

function RegularDays({ schedules, handleToggleDay, handleEditSchedule, currentUser }) {
  return (
    <div className="bg-beehealth-body-main rounded-2xl border border-gray-300 shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Calendar className="text-beehealth-blue-primary-solid h-5 w-5" />
          Horario Regular
        </h2>
      </div>

      <div className="space-y-3 p-6">
        {schedules.map((schedule) => (
          <RegularDaysCard
            key={schedule.id}
            currentUser={currentUser}
            schedule={schedule}
            handleToggleDay={handleToggleDay}
            handleEditSchedule={handleEditSchedule}
          />
        ))}
      </div>
    </div>
  );
}

export default RegularDays;
