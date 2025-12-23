'use client';
import { useState, useMemo, useEffect } from 'react';
import SearchAddBar from './SearchAddBar';
import ConsultsTable from './ConsultsTable';

// Feedback Components
import EmptyState from './EmptyState';

// Local Helpers
import {
  filterConsults,
  openCreate,
  openEdit,
  askDelete,
  handleCreateAction,
  handleUpdateAction,
  handleDeleteAction,
  todayISO,
} from './utils/helpers';

// Feedback Components
import EmployeeCreateConsultModal from '@/components/sections/employee/consultations/components/modals/employeeCreateConsultModal/EmployeeCreateConsultModal';
import EmployeeEditConsultModal from '@/components/sections/employee/consultations/components/modals/employeeEditConsultModal/EmployeeEditConsultModal';
import EmployeeDeleteConsultModal from '@/components/sections/employee/consultations/components/modals/employeeDeleteConsultModal/EmployeeDeleteConsultModal';

export default function TodayConsultsList({
  totalCost,
  consultsData,
  setShowSuccessModal,
  setSuccessModalMessage,
  setSuccessModalTitle,
  refetch,
}) {
  const [consults, setConsults] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Transaction type for Create Consult or Sale
  const [transactionType, setTransactionType] = useState('consult');

  // Load initial consults data
  useEffect(() => {
    setConsults(consultsData);
  }, [consultsData]);

  // Filter consultas based on search term
  const filteredConsults = useMemo(
    () => filterConsults(consults, searchTerm),
    [consults, searchTerm]
  );

  // Create consult handler
  const handleCreate = (form) => {
    handleCreateAction(form, todayISO, setConsults, setShowModal);
  };

  // Update consult handler
  const handleUpdate = (form) => {
    handleUpdateAction(form, editingItem, setConsults, setShowModal, setEditingItem);
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchAddBar
        value={searchTerm}
        onChange={setSearchTerm}
        onAdd={() => {
          setTransactionType('consult');
          openCreate(setEditingItem, setShowModal);
        }}
        onSale={() => {
          setTransactionType('sale');
          openCreate(setEditingItem, setShowModal);
        }}
      />

      <div className="bg-beehealth-body-main rounded-2xl border-2 border-gray-200">
        <ConsultsTable
          rows={filteredConsults}
          totalCost={totalCost}
          onEdit={(item) => openEdit(item, setEditingItem, setShowModal)}
          onDelete={(item) => askDelete(item, setItemToDelete, setShowDeleteModal)}
        />

        <EmptyState visible={filteredConsults.length === 0} />
      </div>

      {showModal && !editingItem && (
        <EmployeeCreateConsultModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessModalMessage={setSuccessModalMessage}
          setSuccessModalTitle={setSuccessModalTitle}
          refetch={refetch}
          transactionType={transactionType}
        />
      )}

      {showModal && editingItem && (
        <EmployeeEditConsultModal
          editingItem={editingItem}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      {showDeleteModal && itemToDelete && (
        <EmployeeDeleteConsultModal
          item={itemToDelete}
          onClose={() => setShowDeleteModal(false)}
          setShowSuccessModal={setShowSuccessModal}
          setSuccessModalMessage={setSuccessModalMessage}
          setSuccessModalTitle={setSuccessModalTitle}
        />
      )}
    </div>
  );
}
