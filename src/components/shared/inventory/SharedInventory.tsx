'use client';

import { useState, useMemo } from 'react';

import TabsBar from './components/TabsBar';
import SearchAddBar from './components/SearchAddBar';
import StatsBar from './components/StatsBar';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';
import SharedInventoryAlerts from '@/components/shared/dashboard/InventoryAlerts/SharedInventoryAlerts';

// Helpers
import { getStockStatus } from './utils/helpers';

// Tables
import MedsTable from './components/MedsTable';
import SuppliesTable from './components/SuppliesTable';
import RecetasGrid from './components/PrescriptionsTable';

// Custom Hooks
import { useGetFullInventory } from '@/hooks/inventory/useGetFullInventory';
import { toggleProductStatus } from './components/modals/toggleProductModal/services/toggleProductStatus';
import { fetchProductHistory } from './components/modals/transactionHistoryModal/services/fetchProductHistory';

// Feedback Components
import RestockProductModal from './components/modals/restockProductModal/RestockProductModal';
import CreateProductModal from './components/modals/addProductModal/CreateProductModal';
import EditProductModal from './components/modals/editProductModal/EditProductModal';
import DeleteProductModal from './components/modals/deleteProductModal/DeleteProductModal';
import ToggleProductModal from './components/modals/toggleProductModal/ToggleProductModal';
import TransactionHistoryModal from './components/modals/transactionHistoryModal/TransactionHistoryModal';
import SuccessModal from '../feedback/SuccessModal';
import LoadingState from '../feedback/LoadingState';

export default function SharedInventory({ role, showButton = true }) {
  // Fetch Full Inventory Items
  const {
    inventory,
    isLoading: isLoadingGetFullInventory,
    setInventory,
    error,
    refetch,
  } = useGetFullInventory();

  // States
  const [activeTab, setActiveTab] = useState('medicamentos');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [itemToToggle, setItemToToggle] = useState(null);

  // Modal Render States
  const [isLoading, setIsLoading] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductHistory, setSelectedProductHistory] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const successRefresh = () => {
    refetch();
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 1500);
  };

  // Create Product Modal Handler
  const openAddModal = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  // Edit Product Modal Handler
  const openEditModal = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  // Restock Product Modal Handler
  const openRestockModal = (item) => {
    setShowRestockModal(true);
  };

  // Toggle Product Modal Handler
  const requestToggle = (item) => {
    setItemToToggle(item);
    setShowToggleModal(true);
  };

  // Transaction History Modal Handler and Backend Call
  const openHistoryModal = async (item) => {
    setSelectedProductHistory(item);
    setShowHistoryModal(true);

    try {
      setIsLoading(true);
      const data = await fetchProductHistory(item?.product?._id);
      setHistoryData(data.history);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching history:', err);
      setHistoryData([]);
      setIsLoading(false);
    }
  };

  // Toggle Product Backend Call
  const confirmToggle = async () => {
    if (!itemToToggle) return;

    try {
      const data = await toggleProductStatus({
        inventoryId: itemToToggle._id,
        inStock: !itemToToggle.product.inStock,
      });

      setInventory((prev) =>
        prev.map((i) =>
          i._id === data.inventory._id
            ? { ...i, product: { ...i.product, inStock: data.inventory.product.inStock } }
            : i
        )
      );
      successRefresh();
    } catch (err) {
      console.error('Error toggling item:', err);
    } finally {
      setShowToggleModal(false);
      setItemToToggle(null);
    }
  };

  // Filtered Items based on Active Tab
  const filteredInventory = useMemo(() => {
    if (!inventory.length) return [];

    return inventory.filter((item) => {
      if (activeTab === 'medicamentos') return item.product?.type === 'medicamento';
      if (activeTab === 'recetas') return item.product?.type === 'receta';
      if (activeTab === 'suministros') return item.product?.type === 'suministro';
      return false;
    });
  }, [inventory, activeTab]);

  // Further filter by search term
  const filteredItems = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return filteredInventory.filter(
      (item) =>
        item.product?.name.toLowerCase().includes(q) ||
        item.product?.category?.toLowerCase().includes(q)
    );
  }, [filteredInventory, searchTerm]);

  // Loading State
  if (isLoadingGetFullInventory) {
    return <LoadingState />;
  }

  return (
    <div className="h-full space-y-6 overflow-x-hidden overflow-y-auto">
      {/* Success Modal */}
      <SuccessModal
        title="Inventario actualizado con éxito"
        message="La información fue guardada correctamente."
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />

      {/* Header */}
      <SharedSectionHeader
        role={role}
        Icon="inventory"
        title="Gestión de Inventario"
        subtitle="Control de medicamentos, recetas y suministros"
      />

      {/* Tabs & Actions */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 shadow-sm">
        <TabsBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchAddBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAdd={openAddModal}
          onRestock={openRestockModal}
        />
      </div>

      {/* Stats */}
      <StatsBar inventory={inventory} />

      {/* Content */}
      <div className="bg-beehealth-body-main rounded-xl border border-gray-200 shadow-sm">
        {activeTab === 'medicamentos' && (
          <MedsTable
            rows={filteredItems}
            getStockStatus={getStockStatus}
            onEdit={openEditModal}
            onDelete={requestToggle}
            onHistory={openHistoryModal}
          />
        )}

        {activeTab === 'recetas' && (
          <RecetasGrid
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
      </div>

      {/* Inventory Alerts */}
      <SharedInventoryAlerts role={role} inventory={inventory} showButton={showButton} />

      {/* Create New Product Modal */}
      {showModal && !editingItem && (
        <CreateProductModal
          activeTab={activeTab}
          role={role}
          onClose={() => setShowModal(false)}
          successRefresh={successRefresh}
        />
      )}

      {/* Edit Product Modal */}
      {showModal && editingItem && (
        <EditProductModal
          successRefresh={successRefresh}
          activeTab={activeTab}
          item={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSubmit={(payload) => {
            setInventory((prev) => prev.map((i) => (i._id === payload._id ? payload : i)));
            setShowModal(false);
            setEditingItem(null);
          }}
        />
      )}

      {/* Toggle Product Modal */}
      {showToggleModal && (
        <ToggleProductModal
          item={itemToToggle}
          onClose={() => setShowToggleModal(false)}
          onConfirm={confirmToggle}
        />
      )}

      {/* Restock Product Modal */}
      {showRestockModal && (
        <RestockProductModal
          activeTab={activeTab}
          successRefresh={successRefresh}
          onClose={() => setShowRestockModal(false)}
          filteredItems={filteredItems}
          onRestock={(updatedItem) => {
            setInventory((prev) =>
              prev.map((i) =>
                i._id === updatedItem._id ? { ...i, quantity: updatedItem.quantity } : i
              )
            );
          }}
        />
      )}

      {/* Transaction History Modal */}
      {showHistoryModal && (
        <TransactionHistoryModal
          item={selectedProductHistory}
          history={historyData}
          isLoading={isLoading}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
    </div>
  );
}
