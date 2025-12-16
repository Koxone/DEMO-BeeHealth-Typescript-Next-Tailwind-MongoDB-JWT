'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderBar from './components/HeaderBar';
import ProgressSteps from './components/ProgressSteps';
import DoctorsGrid from './components/DoctorsGrid';
import CalendarPicker from './components/CalendarPicker';
import TimeSlots from './components/TimeSlots';
import ReasonField from './components/ReasonField';
import SummaryCard from './components/SummaryCard';
import SuccessModal from './components/SuccessModal';
import useSound from 'use-sound';
import { isPastDate, getDaysInMonth } from './components/NewAppointmentUtils';
import useAuthStore from '@/zustand/useAuthStore';

/* Slots helper */
function getAvailableSlots(date, tipo) {
  if (!date) return [];
  const day = date.getDay();
  const slots = [];
  const addSlots = (startHour, endHour) => {
    for (let h = startHour; h < endHour; h++) {
      slots.push(`${String(h).padStart(2, '0')}:00`);
      slots.push(`${String(h).padStart(2, '0')}:30`);
    }
  };
  if (tipo === 'Odontología') {
    if (day === 0) addSlots(11, 17);
    return slots;
  }
  switch (day) {
    case 1:
      addSlots(8, 14);
      addSlots(16, 19);
      break;
    case 2:
    case 3:
      addSlots(10, 14);
      addSlots(16, 19);
      break;
    case 4:
      addSlots(16, 19);
      break;
    case 5:
      addSlots(8, 14);
      addSlots(16, 19);
      break;
    case 6:
      return [];
    case 0:
      addSlots(10, 13);
      break;
  }
  return slots;
}

/* Doctors list */
const doctors = [
  { id: 1, nombre: 'Control de Peso', especialidad: 'Nutrición y Metabolismo' },
  { id: 2, nombre: 'Odontología', especialidad: 'Periodoncia' },
  { id: 3, nombre: 'Tratamientos Estéticos', especialidad: 'Medicina Estética' },
];

/* Main component */
export default function NewAppointment() {
  // Zustand
  const { user } = useAuthStore();

  // Custom Hooks
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
          patientId: user?.id,
          patientName: user?.fullName,
          specialty,
          date: formattedDate,
          time: selectedTime,
          phone: user?.phone,
          email: user?.email,
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

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto pb-40">
      <HeaderBar onBack={() => router.back()} />
      <div className="mx-auto max-w-4xl">
        <ProgressSteps
          getStepStatus={getStepStatus}
          selectedDoctor={selectedDoctor}
          selectedDate={!!selectedDate}
          selectedTime={!!selectedTime}
        />

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
