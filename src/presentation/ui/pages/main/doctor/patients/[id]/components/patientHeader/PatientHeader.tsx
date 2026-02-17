// React, Next and Other Libraries
import { CalendarIcon, Mail, Pencil, Phone, Plus, Stethoscope } from 'lucide-react';

// UI Components
import AssignedWorkouts from './components/AssignedWorkouts';
import AssignedDiets from './components/AssignedDiets';
import FullHistoryButton from './components/FullHistoryButton';
import { ButtonSm } from '@/presentation/ui/pages/main/shared/buttons/Buttons';

// Feedback Components
import ViewClinicalHistoryModal from './components/doctor-clinical-history-modal/ViewClinicalHistoryModal';
import CreateClinicalHistoryModal from './components/doctor-clinical-history-modal/create-new/CreateClinicalHistoryModal';

// Enums, DTO and Types
import { UserSpecialty } from '@/domain/enums/';
import {
  UserDTOPresentation,
  ClinicalHistoryDTOPresentation,
  WeightClinicalSummaryDTOPresentation,
} from '@/presentation/types';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';
import { useParams } from 'next/dist/client/components/navigation';

// Prop types
interface PatientHeaderProps {
  patientUserData: UserDTOPresentation;
  patientSpecialty: UserSpecialty;
  patientClinicalHistory: ClinicalHistoryDTOPresentation;
  patientWeightSummary?: WeightClinicalSummaryDTOPresentation;
}

export default function PatientHeader({
  patientUserData,
  patientSpecialty,
  patientClinicalHistory,
  patientWeightSummary,
}: PatientHeaderProps) {
  // Modal Management with Store
  const { activeModal } = useActiveModalStore();

  // Patient ID from URL Params
  const { id: patientId } = useParams<{ id: string }>();

  // Specialty map
  const specialtyLabels = {
    weight: 'Control de Peso',
    dental: 'Odontología',
    stetic: 'Tratamiento Estético',
  };

  const specialtyName = specialtyLabels[patientSpecialty] || null;

  return (
    <div className="rounded-2xl bg-[#9aa9a0] p-8 shadow-xl">
      <div className="flex gap-8">
        {/* Left */}
        <div className="flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="group relative">
            <div className="bg-beehealth-body-main absolute inset-0 rounded-full opacity-75 blur-xl transition-opacity group-hover:opacity-100" />
            <div className="bg-beehealth-body-main relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full shadow-2xl ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-105">
              <img src={patientUserData?.avatar || '/oochel.jpg'} alt="" />
            </div>
          </div>

          {/* Open Edit Patient Modal */}
          <ButtonSm action="edit" onClick={() => {}}>
            <Pencil className="h-4 w-4" />
            Editar Paciente
          </ButtonSm>

          {/* Open Create Appointment Modal */}
          <ButtonSm action="confirm" onClick={() => {}}>
            <Plus className="h-4 w-4" />
            Nueva Cita
          </ButtonSm>
        </div>

        {/* Right */}
        <div className="flex flex-1 flex-col space-y-6 text-white">
          {/* Top row */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-transparent bg-black/20 px-4 py-1.5 backdrop-blur-sm">
                <Stethoscope className="h-4 w-4" />
                <span className="text-sm font-medium capitalize">
                  Paciente de: {specialtyName || 'Paciente sin historial clinico'}
                </span>
              </div>

              <h1 className="text-4xl font-bold">
                {patientUserData?.name} {patientUserData?.lastName}
              </h1>

              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                <p>Edad: {patientWeightSummary?.metrics.age ?? '--'} años</p>
                <p>Peso Inicial: {patientWeightSummary?.metrics.initialWeight ?? '--'} kg</p>
                <p>Peso Objetivo: {patientWeightSummary?.metrics.weightGoal ?? '--'} kg</p>
                <p>Talla Inicial: {patientWeightSummary?.metrics.initialSize ?? '--'} cm</p>
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              {/* Full Clinical History */}
              <FullHistoryButton patientClinicalHistory={patientClinicalHistory} />

              {/* Assigned Diets */}
              <AssignedDiets />

              {/* Assigned Workouts */}
              <AssignedWorkouts />
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border-asana-beige/40 flex items-center gap-3 rounded-xl border bg-black/20 p-3 backdrop-blur-sm">
              <div className="bg-beehealth-body-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-blue-100">Correo</p>
                <p className="truncate text-sm font-semibold">
                  {patientUserData?.email || 'Paciente sin historial clinico'}
                </p>
              </div>
            </div>

            <div className="border-asana-beige/40 flex items-center gap-3 rounded-xl border bg-black/20 p-3 backdrop-blur-sm">
              <div className="bg-beehealth-body-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-100">Teléfono</p>
                <p className="text-sm font-semibold">
                  {patientUserData?.phone || 'Paciente sin historial clinico'}
                </p>
              </div>
            </div>

            <div className="border-asana-beige/40 flex items-center gap-3 rounded-xl border bg-black/20 p-3 backdrop-blur-sm">
              <div className="bg-beehealth-body-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
                <CalendarIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-blue-100">Registro</p>
                <p className="text-sm font-semibold">
                  {patientUserData?.updatedAt
                    ? new Date(patientUserData.updatedAt).toLocaleDateString('es-MX', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })
                    : 'Paciente sin historial clínico'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Clinical History Modal */}
      {activeModal === 'viewClinicalHistory' && (
        <ViewClinicalHistoryModal patientClinicalHistory={patientClinicalHistory} />
      )}

      {/* Doctor Create Patient Clinical History Modal */}
      {activeModal === 'createClinicalHistory' && (
        <CreateClinicalHistoryModal patientId={patientId} />
      )}
    </div>
  );
}
