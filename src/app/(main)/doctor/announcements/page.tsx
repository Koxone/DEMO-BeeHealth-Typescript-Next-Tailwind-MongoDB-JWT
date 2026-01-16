import SharedNotifications from '@/components/shared/notifications/SharedNotifications';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
export const runtime = 'nodejs';

export default async function DoctorAnnouncementsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();

  return (
    <div>
      <SharedNotifications currentUser={currentUser} />
    </div>
  );
}
