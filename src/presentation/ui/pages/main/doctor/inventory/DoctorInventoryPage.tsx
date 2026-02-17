'use client';

import { useAuth } from '@/presentation/hooks';
import { SharedSectionHeader } from '../patients/components';
import TabsBar from './components/TabsBar';
import SearchAddBar from './components/SearchAddBar';
import StatsBar from './components/StatsBar';

export default function DoctorInventoryPage() {
  // Get cuerrent User data from Custom hook
  const { currentUser, specialty, role } = useAuth();

  return (
    <div className="h-full space-y-4 md:space-y-6">
      {/* Header */}
      <SharedSectionHeader
        role={currentUser?.role}
        Icon="inventory"
        title="Gestión de Inventario"
        subtitle="Control de medicamentos, recetas y suministros"
      />

      {/* Tabs & Actions */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 shadow-sm">
        <TabsBar />
        <SearchAddBar
          searchTerm=""
          setSearchTerm={() => {}}
          onAdd={() => {}}
          onRestock={() => {}}
        />
      </div>

      {/* Stats */}
      <StatsBar inventory={[]} />

      {/* Content */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 shadow-sm">
        {/* {activeTab === 'medicamentos' && (
          <MedsTable
            rows={filteredItems}
            getStockStatus={getStockStatus}
            onEdit={openEditModal}
            onDelete={requestToggle}
            onHistory={openHistoryModal}
          />
        )}

        {activeTab === 'recetas' && (
          <PrescriptionsTable
            rows={filteredItems}
            getStockStatus={getStockStatus}
            onEdit={openEditModal}
            onHistory={openHistoryModal}
            onDelete={requestToggle}
          />
        )}

        {activeTab === 'suministros' && (
          <SuppliesTable
            rows={filteredItems}
            getStockStatus={getStockStatus}
            onEdit={openEditModal}
            onDelete={requestToggle}
            onHistory={openHistoryModal}
          />
        )}
       */}
      </div>

      {/* Inventory Alerts */}
      {/* <SharedInventoryAlerts
        role={currentUser?.role}
        inventory={inventory}
        showButton={showButton}
      /> */}
    </div>
  );
}
