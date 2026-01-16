import { X } from 'lucide-react';

import { getClosureColor, eventMap } from '../services/helpers';

export default function NotificationCard({
  notification,
  role,
  markAsRead,
  deactivateNotification,
}) {
  return (
    <div
      key={notification?._id}
      className={`rounded-xl border-2 p-4 ${getClosureColor(notification?.category)}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 gap-3">
          <div className="flex-1">
            <p className="font-semibold text-gray-700">{eventMap[notification?.type]}</p>
            <p className="font-semibold text-gray-800">{notification?.message}</p>
            <p className="mt-1 text-lg font-semibold capitalize">
              {notification?.relatedDate &&
                new Date(notification?.relatedDate).toLocaleDateString('es-MX', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </p>
          </div>
        </div>

        {/* Cancel Closure */}
        {role === 'doctor' && (
          <button
            onClick={() => deactivateNotification({ notificationId: notification._id })}
            className="border-beehealth-red-primary-dark/20 group hover:bg-beehealth-red-secondary-dark text-beehealth-red-primary-dark rounded-lg border p-1 transition-colors hover:text-white"
          >
            <X className="h-4 w-4 transform duration-300 group-hover:rotate-90" />
          </button>
        )}

        {/* Cancel Closure */}
        {role === 'patient' && (
          <button
            onClick={() => markAsRead({ notificationId: notification._id })}
            className="border-beehealth-red-primary-dark/20 group hover:bg-beehealth-red-secondary-dark text-beehealth-red-primary-dark rounded-lg border p-1 text-xs transition-colors hover:text-white"
          >
            Marcar como leído
          </button>
        )}
      </div>
    </div>
  );
}
