'use client';

import { useMemo, useState } from 'react';
import ControlsBar from './components/ControlsBar';
import AppointmentCard from './components/AppointmentCard';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';

// Custom Hooks
import { useAllAppointments } from '@/@hooks/appointments/useAllAppointments';
import { useCreateAppointment } from '@/@hooks/appointments/useCreateAppointment';
import { useGetAllPatients } from '@/@hooks/patients/get/useGetAllPatients';

// Feedback Components
import EmployeeCreateAppointmentModal from './components/EmployeeCreateAppointmentModal';
import EmptyState from '@/components/shared/feedback/EmptyState';
import LoadingState from '@/components/shared/feedback/LoadingState';
import ErrorState from '@/components/shared/feedback/ErrorState';

type AppointmentStatus = 'Confirmada' | 'Pendiente' | 'Cancelada';

interface Appointment {
  id: string;
  fecha: string;
  hora: string;
  paciente: string;
  telefono: string;
  email: string;
  motivo: string;
  specialty: string;
  estado: AppointmentStatus;
  avatar: string;
}

interface EmployeeAppointmentsProps {
  role: 'admin' | 'employee' | 'doctor';
}

export default function EmployeeAppointments({ role }: EmployeeAppointmentsProps) {
  // UI state
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Hooks
  const { createAppointment, loading: creating, error: createError } = useCreateAppointment();

  const { data, loading, refetch } = useAllAppointments() as {
    data?: { all: any[] };
    loading: boolean;
    refetch?: () => void;
  };

  // Gett all patients from Custom Hook
  const {
    patients: patientsData,
    isLoading,
    error,
    refetch: refetchPatients,
  } = useGetAllPatients();

  // Appointments (derivado de data)
  const citas = useMemo<Appointment[]>(() => {
    if (!data?.all) return [];

    return data.all.map((item) => ({
      id: item.id,
      fecha: item._dateKey,
      hora: item.hora,
      paciente: item.paciente,
      telefono: item.telefono,
      email: item.email,
      motivo: item.motivo,
      specialty: item.specialty,
      estado: 'Confirmada' as AppointmentStatus,
      avatar: item.paciente
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase(),
    }));
  }, [data?.all]);

  // Form state
  const [citaForm, setCitaForm] = useState<{
    fecha: string;
    hora: string;
    paciente: string;
    telefono: string;
    email: string;
    motivo: string;
    specialty: string;
    patientId?: string;
  }>({
    fecha: '',
    hora: '',
    paciente: '',
    telefono: '',
    email: '',
    motivo: '',
    specialty: '',
  });

  // Today local (Mexico)
  const now = new Date();
  const offsetDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  const today = offsetDate.toISOString().split('T')[0];

  const citasDeHoy = citas.filter((c) => c.fecha === today);

  const filteredCitas = citasDeHoy.filter((c) => {
    const term = searchTerm.toLowerCase();
    return c.paciente.toLowerCase().includes(term) || c.telefono.includes(term);
  });

  // Handlers
  const openCreate = () => {
    setCitaForm({
      fecha: '',
      hora: '',
      paciente: '',
      telefono: '',
      email: '',
      motivo: '',
      specialty: '',
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setCitaForm({
        fecha: '',
        hora: '',
        paciente: '',
        telefono: '',
        email: '',
        motivo: '',
        specialty: '',
      });

      refetch?.();
    } catch (err) {
      console.error('Error al crear cita:', err);
    }
  };

  // Loading State
  if (loading || isLoading) {
    return <LoadingState />;
  }

  if (creating) {
    return <LoadingState />;
  }

  // Error State
  if (createError || error) {
    return <ErrorState />;
  }

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto pb-8">
      <SharedSectionHeader
        role={role}
        Icon="pacientes"
        title="Citas del día de hoy"
        subtitle={`Mostrando todas las especialidades — ${today}`}
      />

      <div className="mx-auto max-w-7xl space-y-6">
        <ControlsBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onCreate={openCreate} />

        {filteredCitas.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 px-4">
            {filteredCitas.map((cita, index) => (
              <AppointmentCard key={cita.id} index={index} cita={cita} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No hay citas para hoy"
            subtitle="No se encontraron citas para la fecha seleccionada."
          />
        )}
      </div>

      {showModal && (
        <EmployeeCreateAppointmentModal
          patients={patientsData}
          citaForm={citaForm}
          setCitaForm={setCitaForm}
          onClose={() => setShowModal(false)}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
}
