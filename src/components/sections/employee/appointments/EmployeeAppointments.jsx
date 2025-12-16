'use client';

import { useEffect, useState } from 'react';
import ControlsBar from './components/ControlsBar';
import AppointmentCard from './components/AppointmentCard';
import EmptyState from './components/EmptyState';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';

// Custom Hooks
import { useAllAppointments } from '@/hooks/appointments/useAllAppointments';
import { useCreateAppointment } from '@/hooks/appointments/useCreateAppointment';

// Feedback Components
import EmployeeCreateAppointmentModal from './components/EmployeeCreateAppointmentModal';

export default function EmployeeAppointments({ role, patients }) {
  const [showModal, setShowModal] = useState(false);
  const [editingCita, setEditingCita] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Hook to create appointment
  const { createAppointment, loading: creating, error: createError } = useCreateAppointment();

  // Hook to get all appointments
  const { data, loading, refetch } = useAllAppointments();
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    if (data?.all) {
      const mapped = data.all.map((item) => ({
        id: item.id,
        fecha: item._dateKey,
        hora: item.hora,
        paciente: item.paciente,
        telefono: item.telefono,
        email: item.email,
        motivo: item.motivo,
        specialty: item.specialty,
        estado: 'Confirmada',
        avatar: item.paciente
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase(),
      }));
      setCitas(mapped);
    }
  }, [data]);

  /* Form state */
  const [citaForm, setCitaForm] = useState({
    fecha: '',
    hora: '',
    paciente: '',
    telefono: '',
    email: '',
    motivo: '',
    specialty: '',
  });

  /* Helpers */
  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pendiente':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Cancelada':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Get today's date in local timezone (America/Mexico_City)
  const now = new Date();
  const offsetDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  const today = offsetDate.toISOString().split('T')[0];

  // Filter only appointments for today
  const citasDeHoy = citas.filter((c) => c.fecha === today);

  /* Filtro por búsqueda */
  const filteredCitas = citasDeHoy.filter((c) => {
    const matchSearch =
      c.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.telefono.includes(searchTerm);
    return matchSearch;
  });

  // Open Modal
  const openCreate = () => {
    setEditingCita(null);
    setCitaForm({ fecha: '', hora: '', paciente: '', telefono: '', email: '', motivo: '' });
    setShowModal(true);
  };

  // Create Appointment
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await createAppointment({
        patientId: citaForm.patientId,
        patientName: citaForm.paciente,
        date: citaForm.fecha,
        time: citaForm.hora,
        phone: citaForm.telefono,
        email: citaForm.email,
        reason: citaForm.motivo,
        specialty: citaForm.specialty,
      });

      setShowModal(false);
      setEditingCita(null);
      setCitaForm({ fecha: '', hora: '', paciente: '', telefono: '', email: '', motivo: '' });

      // Refresh List
      refetch?.();
    } catch (err) {
      console.error('Error al crear cita:', err.message);
    }
  };

  /* Loading */
  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando citas...</div>;
  }

  if (creating) {
    return <div className="p-8 text-center text-gray-500">Creando cita...</div>;
  }

  if (createError) {
    return (
      <div className="p-8 text-center text-red-500">Error al crear la cita: {createError}</div>
    );
  }

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto pb-8">
      {/* Header */}
      <SharedSectionHeader
        role={role}
        Icon="pacientes"
        title="Citas del día de hoy"
        subtitle={`Mostrando todas las especialidades — ${today}`}
      />

      <div className="mx-auto max-w-7xl space-y-6">
        {/* Controls */}
        <ControlsBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onCreate={openCreate} />

        {/* List */}
        {filteredCitas.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 px-4">
            {filteredCitas.map((cita, index) => (
              <AppointmentCard
                key={cita.id}
                index={index}
                cita={cita}
                getEstadoBadge={getEstadoBadge}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <EmployeeCreateAppointmentModal
          patients={patients}
          editingCita={editingCita}
          citaForm={citaForm}
          setCitaForm={setCitaForm}
          onClose={() => setShowModal(false)}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
}
