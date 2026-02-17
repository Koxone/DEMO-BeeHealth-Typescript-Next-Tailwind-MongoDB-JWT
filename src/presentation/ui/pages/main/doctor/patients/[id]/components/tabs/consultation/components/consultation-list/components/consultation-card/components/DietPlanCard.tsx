// Next, React and Other Libraries
import Link from 'next/link';
import { GripVertical } from 'lucide-react';

// Prop Types
interface DietPlanCardProps {
  dietName: string;
  dietId: string;
}

export default function DietPlanCard({ dietName, dietId }: DietPlanCardProps) {
  return (
    <Link
      href={`/doctor/diets/${dietId}?mode=read`}
      className={
        'group bg-beehealth-blue-primary-dark relative h-full rounded-lg p-2 hover:scale-110'
      }
    >
      {/* Drag Handle */}
      <div className="absolute top-1 right-1 cursor-grab rounded bg-white/10 p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/20 active:cursor-grabbing">
        <GripVertical className="h-3 w-3 text-white" />
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-white sm:gap-2">
        <span className="truncate">Dieta:</span>
      </div>

      <p className="text-sm font-medium wrap-break-word text-white">{dietName}</p>
    </Link>
  );
}
