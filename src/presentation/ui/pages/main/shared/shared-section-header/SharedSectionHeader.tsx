'use client';

// Next, React and Other Libraries
import {
  Package,
  Calendar,
  ClipboardClock,
  UserPlus,
  Apple,
  Plus,
  DollarSign,
  Activity,
  Bell,
  Dumbbell,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Prop Types
interface GeneralSectionHeaderProps {
  newWorkout?: boolean;
  setShowCreateWorkoutModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingWorkout?: React.Dispatch<React.SetStateAction<any>>;
  role?: string;
  Icon:
    | 'inventory'
    | 'consultas'
    | 'calendar'
    | 'pacientes'
    | 'diets'
    | 'workouts'
    | 'accounting'
    | 'history'
    | 'bell';
  title?: string;
  subtitle?: string;
}

export default function SharedSectionHeader({
  role,
  newWorkout,
  setEditingWorkout,
  setShowCreateWorkoutModal,
  Icon,
  title = '',
  subtitle = '',
}: GeneralSectionHeaderProps) {
  const iconsMap: Record<
    GeneralSectionHeaderProps['Icon'],
    React.ComponentType<{ className?: string }>
  > = {
    inventory: Package,
    consultas: ClipboardClock,
    calendar: Calendar,
    pacientes: UserPlus,
    diets: Apple,
    workouts: Dumbbell,
    accounting: DollarSign,
    history: Activity,
    bell: Bell,
  };

  const SelectedIcon = iconsMap[Icon] ?? Package;

  const router = useRouter();

  return (
    <div className="-mx-4 -mt-4 mb-6 flex w-full items-center justify-between px-4 pt-6 md:rounded-2xl">
      <div>
        <div className="flex items-start gap-4">
          <div className="bg-beehealth-blue-primary-solid rounded-2xl p-3 shadow-lg">
            <SelectedIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-700 md:text-4xl">
              {title}
            </h1>
            <p className="text-base text-gray-600 md:text-lg">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* New Diet Button */}
      {role === 'doctor' && Icon === 'diets' && (
        <div className="flex items-center gap-4">
          {/* Doctor New Diet Button */}
          <Link
            href="/doctor/diets/create-diet"
            className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex items-center gap-2 rounded-lg px-4 py-2 text-white transition active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Nueva Dieta
          </Link>
        </div>
      )}

      {/* New Workout Button */}
      {role === 'doctor' && newWorkout && (
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setEditingWorkout(null);
              router.push('/doctor/workouts/create-workout');
            }}
            className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex items-center gap-2 rounded-lg px-4 py-2 text-white"
          >
            <Plus className="h-5 w-5" /> Nuevo Ejercicio
          </button>
        </div>
      )}
    </div>
  );
}
