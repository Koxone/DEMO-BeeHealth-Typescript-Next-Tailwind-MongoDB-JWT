// Next, React and Other Libraries
import Link from 'next/link';
import { GripVertical } from 'lucide-react';

// Prop Types
interface WorkoutPlanCardProps {
  workoutName: string;
  workoutId: string;
}

export default function WorkoutPlanCard({ workoutName, workoutId }: WorkoutPlanCardProps) {
  return (
    <Link
      href={`/doctor/workouts/`}
      className={
        'group bg-beehealth-orange-primary-dark relative h-full rounded-lg p-2 hover:scale-110'
      }
    >
      {/* Drag Handle */}
      <div className="absolute top-1 right-1 cursor-grab rounded bg-white/10 p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/20 active:cursor-grabbing">
        <GripVertical className="h-3 w-3 text-white" />
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-white sm:gap-2">
        <span className="truncate">Entrenamiento:</span>
      </div>

      <p className="text-sm font-medium wrap-break-word text-white">{workoutName}</p>
    </Link>
  );
}
