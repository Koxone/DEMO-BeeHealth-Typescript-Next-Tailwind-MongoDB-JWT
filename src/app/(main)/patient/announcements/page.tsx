import SharedNotifications from '@/components/shared/notifications/SharedNotifications';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { redirect } from 'next/navigation';

export const runtime = 'nodejs';
export default async function AnnouncementsPage() {
  // Get current User info
  const currentUser = await getCurrentUser();

  if (currentUser?.hasRecord === false) {
    redirect('/patient/clinical-record');
  }
  return (
    <div>
      <SharedNotifications currentUser={currentUser} />
    </div>
  );
}
