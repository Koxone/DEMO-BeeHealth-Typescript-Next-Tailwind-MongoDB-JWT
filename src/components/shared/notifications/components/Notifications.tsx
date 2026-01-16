import { AlertTriangle, Plus } from 'lucide-react';
import NotificationCard from './NotificationCard';

function Notifications({
  setShowAddClosure,
  currentUser,
  massiveNotifications = [],
  personalNotifications = [],
  markAsRead,
  deactivateNotification,
}) {
  const role = currentUser?.role;

  const hasAnyNotifications = massiveNotifications.length > 0 || personalNotifications.length > 0;

  return (
    <div className="bg-beehealth-body-main rounded-2xl border border-gray-300 shadow-sm lg:col-span-2">
      <div className="flex items-center justify-between border-b border-gray-200 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          {role === 'doctor' || role === 'employee'
            ? 'Gestión de Notificaciones'
            : 'Tus Notificaciones'}
        </h2>

        {role === 'doctor' && (
          <button
            onClick={() => setShowAddClosure(true)}
            className="bg-beehealth-green-secondary-solid group hover:bg-beehealth-green-secondary-solid-hover rounded-lg p-2 transition-colors"
          >
            <Plus className="h-5 w-5 transform text-white duration-300 group-hover:rotate-90" />
          </button>
        )}
      </div>

      <div className="space-y-3 overflow-y-auto p-6">
        {!hasAnyNotifications && (
          <div className="py-10 text-center">
            <AlertTriangle className="mx-auto mb-3 h-12 w-12 text-gray-300" />
            <p className="text-sm text-gray-500">No hay notificaciones disponibles</p>
          </div>
        )}

        {massiveNotifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            role={role}
            notification={notification}
            markAsRead={markAsRead}
            deactivateNotification={deactivateNotification}
          />
        ))}

        {personalNotifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            role={role}
            notification={notification}
            markAsRead={markAsRead}
            deactivateNotification={deactivateNotification}
          />
        ))}
      </div>
    </div>
  );
}

export default Notifications;
