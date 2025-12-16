import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import SharedInventory from '@/components/shared/inventory/SharedInventory';
export const runtime = 'nodejs';

export default async function DoctorInventoryPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;

  return (
    <div>
      <SharedInventory role={role} showButton={false} />
    </div>
  );
}
