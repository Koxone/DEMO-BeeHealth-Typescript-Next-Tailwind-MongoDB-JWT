'use client';

import { InventoryCategoriesEnum } from '@/domain/enums';
import { inventoryTabs } from '@/presentation/constants/nav/inventoryTabs.constant';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TabsBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory =
    (searchParams.get('category') as InventoryCategoriesEnum) ?? InventoryCategoriesEnum.MEDS;

  const handleTabChange = (tab: InventoryCategoriesEnum) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2 border-b border-gray-200 p-2">
      {inventoryTabs.map(({ id, label, Icon }) => {
        const active = currentCategory === id;

        return (
          <button
            key={id}
            onClick={() => handleTabChange(id)}
            className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              active
                ? 'text-beehealth-blue-primary-dark border border-blue-200 bg-blue-50'
                : 'hover:bg-beehealth-blue-primary-light border-beehealth-body-main hover:border-beehealth-blue-primary-solid border text-gray-700'
            }`}
          >
            <Icon
              className={`h-4 w-4 ${active ? 'text-beehealth-blue-primary-dark' : 'text-gray-500'}`}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}
