'use client';

import { tabs, TabName } from '@/types';

interface TabsNavProps {
  activeTab: TabName;
  onChangeTab: (tab: TabName) => void;
}

export default function TabsNav({ activeTab, onChangeTab }: TabsNavProps) {
  return (
    <div className="flex w-full gap-4 border-b border-gray-200">
      {tabs.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => onChangeTab(name)}
          className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-4 text-sm font-medium ${
            activeTab === name
              ? 'bg-beehealth-blue-primary-solid rounded-lg text-white'
              : 'bg-beehealth-blue-primary-solid/20 hover:bg-beehealth-blue-primary-solid-hover/40 rounded-lg text-gray-500 hover:text-gray-700'
          }`}
        >
          <Icon className="h-4 w-4" />
          <span className="whitespace-nowrap">{name}</span>

          {activeTab === name && (
            <div className="bg-beehealth-blue-primary-dark text-beehealth-blue-primary-solid absolute right-0 bottom-0 left-0 h-0.5" />
          )}
        </button>
      ))}
    </div>
  );
}
