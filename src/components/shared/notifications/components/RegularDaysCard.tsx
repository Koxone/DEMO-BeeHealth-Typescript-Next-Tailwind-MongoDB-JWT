import { Power, PowerOff, Settings } from 'lucide-react';
import { daysMap } from '../helpers';

function RegularDaysCard({ schedule, handleToggleDay, handleEditSchedule, currentUser }) {
  const role = currentUser?.role;

  return (
    <div
      key={schedule.id}
      className={`rounded-xl border-2 p-4 transition-all ${
        schedule.isOpen
          ? 'border-beehealth-green-secondary-solid'
          : 'border-gray-200 bg-gray-50 opacity-60'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          {role === 'doctor' && (
            <button
              onClick={() => handleToggleDay(schedule.id)}
              className="group/toggle relative rounded-lg bg-green-300 p-2 transition-all duration-200 hover:bg-green-500 hover:shadow-md active:scale-95"
            >
              {schedule.isOpen ? (
                <Power className="text-beehealth-blue-primary-dark-hover h-5 w-5" />
              ) : (
                <PowerOff className="h-5 w-5 text-red-400" />
              )}
            </button>
          )}

          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{daysMap[schedule.day]}</h3>
            {schedule.isOpen ? (
              <p className="text-sm text-gray-600">
                De{' '}
                {schedule.timeRanges.length > 0
                  ? schedule.timeRanges.map((range) => `${range.start} a ${range.end}`).join(' y ')
                  : 'Cerrado'}
              </p>
            ) : (
              <p className="text-sm text-gray-500">Cerrado</p>
            )}
          </div>
        </div>

        {schedule.isOpen && role === 'doctor' && (
          <div
            title="Proximamente"
            className="group cursor-not-allowed rounded-lg p-2 transition-colors hover:bg-blue-100"
          >
            <Settings className="text-beehealth-blue-primary-dark h-5 w-5 transform duration-300 group-hover:rotate-90" />
          </div>
          // <button
          //   onClick={() => handleEditSchedule(schedule)}
          //   className="group rounded-lg p-2 transition-colors hover:bg-blue-100"
          // >
          //   <Settings className="text-beehealth-blue-primary-dark h-5 w-5 transform duration-300 group-hover:rotate-90" />
          // </button>
        )}
      </div>
    </div>
  );
}

export default RegularDaysCard;
