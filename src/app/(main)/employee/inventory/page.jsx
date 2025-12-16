import React from 'react';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import SharedInventory from '@/components/shared/inventory/SharedInventory';

export const runtime = 'nodejs';

export default async function EmployeeInventoryPage() {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  return (
    <div className="h-screen overflow-hidden pb-40">
      <SharedInventory role={role} showButton={false} />
    </div>
  );
}
