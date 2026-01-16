import { User, Users } from 'lucide-react';

function ScopeSelection({
  notificationScope,
  setNotificationScope,
  setEventCategory,
  setEventType,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        Alcance de Notificación
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setNotificationScope('massive');
            setEventCategory('');
            setEventType('');
          }}
          className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-semibold transition-all ${
            notificationScope === 'massive'
              ? 'border-beehealth-blue-primary-solid text-beehealth-blue-primary-dark bg-blue-50'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <Users className="h-5 w-5" />
          <span>Masiva</span>
        </button>
        <button
          onClick={() => {
            setNotificationScope('personal');
            setEventCategory('');
            setEventType('');
          }}
          className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 font-semibold transition-all ${
            notificationScope === 'personal'
              ? 'border-beehealth-green-secondary-solid text-beehealth-green-secondary-dark bg-green-50'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <User className="h-5 w-5" />
          <span>Personal</span>
        </button>
      </div>
    </div>
  );
}

export default ScopeSelection;
