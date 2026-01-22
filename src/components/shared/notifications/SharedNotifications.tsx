'use client';

import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import NotificationsManager from './components/NotificationsManager';

// Custom Hooks
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';

function SharedNotifications() {
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();
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
