'use client';

/* Tabs navigation */
export default function TabsNav({ activeTab, setActiveTab }) {
  return (
    <div className="bg-beehealth-blue-primary-solid relative overflow-hidden px-6 py-6">
      {/* Decorative halo */}
      <div className="bg-beehealth-body-main/10 absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl" />

      {/* Tabs */}
      <div className="relative flex gap-2">
        {/* Basic info tab */}
        <button
          type="button"
          onClick={() => setActiveTab('basico')}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
            activeTab === 'basico'
              ? 'bg-beehealth-body-main text-blue-600 shadow-lg'
              : 'bg-beehealth-body-main/20 hover:bg-beehealth-body-main/30 text-white'
          }`}
        >
          Información Básica
        </button>

        {/* Full history tab */}
        <button
          type="button"
          onClick={() => setActiveTab('completo')}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
            activeTab === 'completo'
              ? 'bg-beehealth-body-main text-blue-600 shadow-lg'
              : 'bg-beehealth-body-main/20 hover:bg-beehealth-body-main/30 text-white'
          }`}
        >
          Historial Completo
        </button>
      </div>
    </div>
  );
}
