// File: components/TabsHeader.jsx
import { ClipboardPlus, Sparkles, SparklesIcon } from 'lucide-react';

/* Helpers */
function activeBg(id) {
  // Return fixed Tailwind class to avoid dynamic strings
  if (id === 'weight') return 'bg-blue-500 text-white';
  if (id === 'dental') return 'bg-emerald-500 text-white';
  return 'bg-purple-500 text-white';
}

/* Component */
export default function TabsHeader({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'weight', label: 'Control de Peso', icon: SparklesIcon },
    { id: 'dental', label: 'Odontología', icon: SparklesIcon },
    { id: 'stetic', label: 'Tratamiento Estético', icon: SparklesIcon },
  ];

  return (
    <div className="grid grid-cols-1 border-b border-gray-200 md:grid-cols-3">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center justify-center gap-2 px-4 py-4 font-medium transition ${
            activeTab === id
              ? activeBg(id)
              : 'bg-beehealth-body-main text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon className="h-5 w-5" />
          <span className="text-sm md:text-base">{label}</span>
        </button>
      ))}
    </div>
  );
}
