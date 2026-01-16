import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import NotificationsManager from './components/NotificationsManager';

function SharedNotifications({ currentUser }) {
  return (
    <div>
      <SharedSectionHeader
        title="Notificaciones y Anuncios"
        subtitle="En esta seccion puedes gestionar las notificaciones y anuncios de la clínica."
        newPatient={false}
        role={currentUser?.role}
        Icon="bell"
      />

      <NotificationsManager currentUser={currentUser} />
    </div>
  );
}

export default SharedNotifications;
