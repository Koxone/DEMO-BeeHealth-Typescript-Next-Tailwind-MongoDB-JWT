'use client';
import { useState, useMemo, useEffect } from 'react';
import SearchAddBar from './SearchAddBar';
import ConsultsTable from './ConsultsTable';
import ConsultationsMobile from './ConsultationsMobile';
import EmptyState from './EmptyState';
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

export default function TodayConsultsList({ totals, consultsData }) {
  const [consults, setConsults] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  // Delete consult handler
  const handleDelete = () => {
    handleDeleteAction(itemToDelete, setConsults, setShowDeleteModal, setItemToDelete);
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchAddBar
        value={searchTerm}
        onChange={setSearchTerm}
        onAdd={() => openCreate(setEditingItem, setShowModal)}
      />

      <div className="bg-beehealth-body-main overflow-hidden rounded-2xl border-2 border-gray-200 shadow-lg">
        <ConsultsTable
          rows={filteredConsults}
          totals={totals}
          onEdit={(item) => openEdit(item, setEditingItem, setShowModal)}
          onDelete={(item) => askDelete(item, setItemToDelete, setShowDeleteModal)}
        />

        <ConsultationsMobile
          rows={filteredConsults}
          onEdit={(item) => openEdit(item, setEditingItem, setShowModal)}
          onDelete={(item) => askDelete(item, setItemToDelete, setShowDeleteModal)}
        />

        <EmptyState visible={filteredConsults.length === 0} />
      </div>

      {showModal && !editingItem && (
        <EmployeeCreateConsultModal onClose={() => setShowModal(false)} onCreate={handleCreate} />
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
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
