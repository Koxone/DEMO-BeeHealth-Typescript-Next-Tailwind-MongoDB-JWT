'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import ProgressSteps from './components/ProgressSteps';
import DoctorsGrid from './components/DoctorsGrid';
import CalendarPicker from './components/CalendarPicker';
import TimeSlots from './components/TimeSlots';
import ReasonField from './components/ReasonField';
import SummaryCard from './components/SummaryCard';
import useSound from 'use-sound';
import SharedSectionHeader from '@/components/shared/headers/SharedSectionHeader';

// Feedback Components
import SuccessModal from './components/SuccessModal';

// Local Helpers
import { isPastDate, getDaysInMonth } from './components/NewAppointmentUtils';
import { getAvailableSlots, doctors } from './services/helpers';

// Custom Hooks
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';

// Feedback Components
import LoadingState from '@/components/shared/feedback/LoadingState';

/* Main component */
export default function NewAppointment() {
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();

  // Library Hooks
  const router = useRouter();

  // Local States
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [play] = useSound('/ping.mp3', { volume: 0.6 });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState('');

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateSelect = (date) => {
    if (!isPastDate(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const getStepStatus = (step) => {
    if (step === 1) return selectedDoctor ? 'complete' : 'current';
    if (step === 2) return selectedDate ? 'complete' : selectedDoctor ? 'current' : 'pending';
    if (step === 3) return selectedTime ? 'complete' : selectedDate ? 'current' : 'pending';
    return 'pending';
  };

  const resetForm = () => {
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setReason('');
    setCurrentMonth(new Date());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    play();

    if (!selectedDoctor || !selectedDate || !selectedTime || !reason) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const doctor = doctors.find((d) => d.id === selectedDoctor);
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const specialty = doctor.nombre === 'Odontología' ? 'dental' : 'weight';

      const res = await fetch('/api/google/calendar/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: currentUser?.id,
          patientName: currentUser?.fullName,
          specialty,
          date: formattedDate,
          time: selectedTime,
          phone: currentUser?.phone,
          email: currentUser?.email,
          reason,
        }),
      });

      if (!res.ok) throw new Error('Error al crear la cita');

      setSuccessData({ doctor, date: selectedDate, time: selectedTime, reason });
      setShowSuccessModal(true);
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Error al crear la cita');
    }
  };

  // Loading State
  if (isLoadingCurrentUser) {
    return <LoadingState />;
  }

  return (
    <div className="mx-auto mb-20 flex h-full max-w-4xl flex-col gap-4 overflow-x-hidden overflow-y-auto md:mb-0">
      <SharedSectionHeader
        Icon="calendar"
        title="Agendar Nueva Cita"
        subtitle="Sigue los pasos para programar tu consulta médica"
      />
      <div>
        <ProgressSteps getStepStatus={getStepStatus} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <DoctorsGrid
            selectedDoctor={selectedDoctor}
            onSelect={(id) => {
              setSelectedDoctor(id);
              setSelectedDate(null);
              setSelectedTime(null);
            }}
          />

          {selectedDoctor && (
            <CalendarPicker
              monthName={monthName}
              days={days}
              onPrev={handlePrevMonth}
              onNext={handleNextMonth}
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
              isDateAvailable={(date) => !isPastDate(date)}
              isPastDate={isPastDate}
            />
          )}

          {selectedDate && (
            <TimeSlots
              dateLabel={selectedDate.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
              })}
              times={getAvailableSlots(
                selectedDate,
                doctors.find((d) => d.id === selectedDoctor).nombre
              )}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />
          )}

          {selectedTime && <ReasonField value={reason} onChange={setReason} />}

          {selectedDoctor && selectedDate && selectedTime && (
            <SummaryCard
              doctor={doctors.find((d) => d.id === selectedDoctor)}
              date={selectedDate}
              time={selectedTime}
            />
          )}

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <button
              type="button"
              onClick={() => router.back()}
              className="hover:bg-beehealth-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-4 font-semibold text-gray-700 transition-all duration-200 hover:shadow-md active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!selectedDoctor || !selectedDate || !selectedTime}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold transition-all duration-300 ${
                selectedDoctor && selectedDate && selectedTime
                  ? 'bg-beehealth-blue-primary-solid text-white shadow-lg shadow-blue-500/30 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95'
                  : 'cursor-not-allowed bg-gray-200 text-gray-400'
              }`}
            >
              Confirmar Cita
            </button>
          </div>
        </form>

        {showSuccessModal && (
          <SuccessModal data={successData} onClose={() => setShowSuccessModal(false)} />
        )}
      </div>
    </div>
  );
}
