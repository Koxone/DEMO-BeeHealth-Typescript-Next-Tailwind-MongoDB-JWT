'use client';

import { useState } from 'react';
import Header from './components/Header';
import ConsultForm from './components/consultForm/ConsultForm';
import Actions from './components/Actions';
import { useModalClose } from '@/hooks/useModalClose';
import useAuthStore from '@/zustand/useAuthStore';

/* Container */
export default function EmployeeCreateConsultModal({ onClose, onCreate }) {
  // Modal close handler
  const { handleOverlayClick } = useModalClose(onClose);

  // Get user from store
  const { user } = useAuthStore();

  // Local state - Form
  const [form, setForm] = useState({
    patient: '',
    employee: user?.id || '',
    consultType: '',
    speciality: user?.speciality || '',
    consultPrice: '',
    totalItemsSold: 0,
    totalCost: 0,
    paymentMethod: '',
    itemsSold: [],
    notes: '',
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle submit with fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // ===== VALIDATION =====
    // 1. Validate required fields
    if (!form.patient || !form.consultType || !form.consultPrice || !form.paymentMethod) {
      setError('Por favor completa todos los campos obligatorios');
      return;
    }

    // 2. Validate items have inventory
    const hasNullInventory = form.itemsSold.some((item) => !item.inventory);
    if (form.itemsSold.length > 0 && hasNullInventory) {
      setError('Hay medicamentos sin inventario asignado');
      return;
    }

    // 3. Prepare payload
    const payload = {
      patient: form.patient,
      employee: form.employee,
      consultType: form.consultType,
      speciality: form.speciality,
      consultPrice: form.consultPrice,
      paymentMethod: form.paymentMethod.toLowerCase(), // ✅ Convertir a minúsculas
      itemsSold: form.itemsSold,
      notes: form.notes,
    };

    // ===== FETCH =====
    try {
      setIsLoading(true);

      const response = await fetch('/api/consults/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      // Handle error responses
      if (!response.ok) {
        setError(data.error || 'Error al crear la consulta');
        setIsLoading(false);
        return;
      }

      // Success - call parent callback
      onCreate(data.consultation);

      // Close modal
      onClose();
    } catch (err) {
      console.error('Error creating consultation:', err);
      setError('Error de conexión al crear la consulta');
      setIsLoading(false);
    }
  };

  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      {/* Modal */}
      <div className="relative inset-0 z-50 flex w-full max-w-[600px] items-center justify-center p-4">
        <div
          className="bg-beehealth-body-main w-full overflow-hidden rounded-3xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <Header title="Agregar Consulta" onClose={onClose} />

          {/* Error Alert */}
          {error && (
            <div className="mx-6 mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Content */}
          <form onSubmit={handleSubmit} className="max-h-[calc(90vh-160px)] overflow-y-auto p-6">
            <ConsultForm form={form} setForm={setForm} />
            <Actions
              onClose={onClose}
              submitLabel="Guardar"
              isLoading={isLoading}
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
