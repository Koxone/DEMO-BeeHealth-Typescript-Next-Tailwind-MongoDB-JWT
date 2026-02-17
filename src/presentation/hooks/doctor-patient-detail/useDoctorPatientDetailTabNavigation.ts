import { Tab, TabName } from '@/presentation/types/';
import { useSearchParams } from 'next/navigation';

export function useDoctorPatientDetailTabNavigation(
  validTabs: readonly Tab[],
  defaultTab: TabName
) {
  const searchParams = useSearchParams();
  const rawTab = searchParams.get('tab');

  const activeTab: TabName = validTabs.some((t) => t.name === rawTab)
    ? (rawTab as TabName)
    : defaultTab;

  return { activeTab };
}
