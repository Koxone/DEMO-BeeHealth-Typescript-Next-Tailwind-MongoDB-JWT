'use client';

// Next, React and Other Libraries
import { useRouter } from 'next/navigation';

// Types and config
import { tabs, TabName } from '@/presentation/types/';

// Prop Types
interface TabsNavProps {
  activeTab: TabName | null;
}

export default function TabsNav({ activeTab }: TabsNavProps) {
  const router = useRouter();

  const handleTabChange = (tab: TabName) => {
    const params = new URLSearchParams();
    params.set('tab', tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex w-full gap-4">
      {tabs.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => {
            handleTabChange(name);
          }}
          className={`relative flex flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-4 text-sm font-medium ${
            activeTab === name
              ? 'bg-beehealth-blue-primary-solid rounded-lg text-white'
              : 'bg-beehealth-blue-primary-solid/20 hover:bg-beehealth-blue-primary-solid-hover/40 rounded-lg text-gray-500 hover:text-gray-700'
          }`}
        >
          <Icon className="h-4 w-4" />
          <span className="whitespace-nowrap">{name}</span>
        </button>
      ))}
    </div>
  );
}
