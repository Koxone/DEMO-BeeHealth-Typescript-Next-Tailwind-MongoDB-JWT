import { Mail, Phone, CalendarIcon, Stethoscope } from 'lucide-react';
import moment from 'moment';
import CreateAppointmentButton from './components/CreateAppointmentButton';
import AssignedDiets from '@/components/sections/doctor/patients/[id]/components/patientHeader/components/AssignedDiets';
import AssignedWorkouts from '@/components/sections/doctor/patients/[id]/components/patientHeader/components/AssignedWorkouts';
import FullHistoryButton from './components/FullHistoryButton';
import EditPatientInfoButton from './components/EditPatientInfoButton';

export default function PatientHeader({
  onClickNew,
  patientRecord,
  onClickFullHistory,
  onCreateNew,
  dietsData,
  workoutsData,
  setShowEditPatientModal,
}) {
  // Specialty map
  const specialtyLabels = {
    weight: 'Control de Peso',
    dental: 'Odontología',
    stetic: 'Tratamiento Estético',
  };

  const filteredRecords = patientRecord?.filter((record) => record?.version === 'full') || [];
  const patient = filteredRecords?.[0] || null;

  const specialtyName = specialtyLabels[patient?.specialty] || 'Sin especialidad';

  function getAnswer(questionId) {
    const answers = patient?.answers;

    // Handle both object and array formats
    let answersArray = [];
    if (Array.isArray(answers)) {
      answersArray = answers;
    } else if (answers && typeof answers === 'object') {
      answersArray = Object.values(answers);
    }

    const answerObj = answersArray.find((ans) => ans?.question?.questionId === questionId);

    if (!answerObj) return 'Sin respuesta';
    if (answerObj.question?.options?.length > 0) {
      const option = answerObj.question.options.find((o) => o.value === answerObj.value);
      return option ? option.label : answerObj.value;
    }
    if (answerObj.value === 'true') return 'Sí';
    if (answerObj.value === 'false') return 'No';
    return answerObj.value;
  }

  return (
    <div className="bg-beehealth-green-primary-dark relative overflow-hidden rounded-2xl p-8 shadow-xl">
      <div className="bg-beehealth-body-main/10 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl" />
      <div className="bg-beehealth-body-main/10 absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl" />

      <div className="relative flex justify-between gap-6">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Avatar */}
          <div className="group relative">
            <div className="bg-beehealth-body-main absolute inset-0 rounded-full opacity-75 blur-xl transition-opacity group-hover:opacity-100" />

            <div className="bg-beehealth-body-main relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full shadow-2xl ring-4 ring-white/30 transition-transform duration-300 group-hover:scale-105">
              <img src={patient?.patient?.avatar || '/oochel.jpg'} alt="" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-2">
            {/* Check In */}
            {/* <RegisterVisitButton /> */}

            {/* Edit Patient Info Button */}
            <EditPatientInfoButton onClick={() => setShowEditPatientModal(true)} />

            {/* Create Appointment */}
            <CreateAppointmentButton onClickNew={onClickNew} />
          </div>
        </div>

        <div className="flex-1 text-white">
          <div className="flex items-center justify-between">
            <div className="border-asana-beige/40 mb-3 inline-flex items-center gap-2 rounded-full border bg-black/20 px-4 py-1.5 backdrop-blur-sm">
              <Stethoscope className="h-4 w-4" />
              <span className="text-sm font-medium capitalize">
                Paciente de: {specialtyName || 'Paciente sin historial clinico'}
              </span>
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              {/* Full Clinical History */}
              <FullHistoryButton
                onClickFullHistory={onClickFullHistory}
                patientRecord={patientRecord}
                onCreateNew={onCreateNew}
              />

              {/* Assigned Diets */}
              <AssignedDiets assignedDietsData={dietsData} />

              {/* Assigned Workouts */}
              <AssignedWorkouts assignedWorkoutsData={workoutsData} />
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold capitalize">
              {patient?.patient?.fullName || 'Paciente sin historial clinico'}
            </h1>
            <p className="text-sm">
              {patientRecord?.length > 0 ? getAnswer(4) : 'Paciente sin historial clinico'}{' '}
              {patientRecord?.length > 0 ? 'años' : ''}
            </p>
            <p className="mb-4 text-sm">
              {patientRecord?.length > 0 ? getAnswer(5) : 'Paciente sin historial clinico'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="border-asana-beige/40 flex items-center gap-3 rounded-xl border bg-black/20 p-3 backdrop-blur-sm">
              <div className="bg-beehealth-body-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-blue-100">Correo</p>
                <p className="truncate text-sm font-semibold">
                  {patient?.patient?.email || 'Paciente sin historial clinico'}
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
                  {patient?.patient?.phone || 'Paciente sin historial clinico'}
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
                  {patient?.createdAt
                    ? moment(patient.createdAt).format('DD/MM/YYYY')
                    : 'Paciente sin historial clinico'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
