'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import ConsultaForm from './components/ConsultaForm';
import Actions from './components/Actions';

/* Container */
export default function EmployeeEditConsultModal({ editingItem, onClose, onUpdate }) {
  // Local state
  const [form, setForm] = useState({
    hora: '',
    paciente: '',
    tipo: '',
    costo: '',
    pagado: true,
  });

  // Init from editing
  useEffect(() => {
    if (!editingItem) return;
    setForm({
      hora: editingItem.hora || '',
      paciente: editingItem.paciente || '',
      tipo: editingItem.tipo || '',
      costo: String(editingItem.costo ?? ''),
      pagado: Boolean(editingItem.pagado),
    });
  }, [editingItem]);

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 h-screen bg-black/70 backdrop-blur-md" onClick={onClose} />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-beehealth-body-main w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <Header title="Editar Consulta" onClose={onClose} />
          {/* Content */}
          <form onSubmit={handleSubmit} className="max-h-[calc(90vh-160px)] overflow-y-auto p-6">
            <ConsultaForm form={form} setForm={setForm} />
            <Actions onClose={onClose} submitLabel="Actualizar" />
          </form>
        </div>
      </div>
    </>
  );
}
