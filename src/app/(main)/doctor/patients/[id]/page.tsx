import DoctorPatientDetail from '@/components/sections/doctor/patients/[id]/DoctorPatientDetail';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { connectDB } from '@/lib/mongodb';
import User, { IUser } from '@/models/User';

export const runtime = 'nodejs';

interface DoctorPatientDetailPageProps {
  params: {
    id: string;
  };
}

export default async function DoctorPatientDetailPage(props: DoctorPatientDetailPageProps) {
  const params = await props.params;
  const { id } = params;

  await connectDB();

  const patient = await User.findById(id, '-password -resetToken').lean<IUser>();

  if (!patient) {
    return <p className="p-8 text-center text-gray-600">Paciente no encontrado</p>;
  }

  // Convertir ObjectIds a strings
  const serializedPatient = {
    ...patient,
    _id: (patient._id as any).toString(),
    diets: ((patient.diets as any) || []).map((diet: any) => ({
      ...diet,
      _id: (diet._id as any).toString(),
      diet: (diet.diet as any).toString(),
    })),
    workouts: ((patient.workouts as any) || []).map((workout: any) => ({
      ...workout,
      _id: (workout._id as any).toString(),
      workout: (workout.workout as any).toString(),
    })),
  };

  const currentUser = await getCurrentUser();
  const specialty = currentUser?.specialty;

  return (
    <div>
      <DoctorPatientDetail patient={serializedPatient} specialty={specialty} />
    </div>
  );
}
