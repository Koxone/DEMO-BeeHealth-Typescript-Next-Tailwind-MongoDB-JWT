'use client';

// Next, React and Other Libraries
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Apple, Dumbbell, Edit2, Flag, Plus, Trash2 } from 'lucide-react';

// Custom Hooks and Stores
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';
import { ConsultationDTOPresentation } from '@/presentation/types';

// Prop Types
interface ActionButtonsProps {
  consultation: ConsultationDTOPresentation;
  patientId: string;
}

function ActionButtons({ consultation, patientId }: ActionButtonsProps) {
  // Modal Management with Store
  const { openModal } = useActiveModalStore();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get questionId value from Consultation
  const currentWeightValue = consultation?.answers?.find(
    (answer) => answer?.questionId === 7
  )?.value;

  const [animateDietButton, setAnimateDietButton] = useState(false);

  // Animate Assign Buttons when coming from other tabs
  useEffect(() => {
    if (!containerRef.current) return;
    const shouldAnimate = searchParams.get('scrollTo') === 'assignDietPlanButton';
    if (!shouldAnimate) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateDietButton(true);
          const params = new URLSearchParams(searchParams.toString());
          params.delete('scrollTo');
          router.replace(`?${params.toString()}`, { scroll: false });
          setTimeout(() => {
            setAnimateDietButton(false);
          }, 3000);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [searchParams, router]);

  return (
    <div ref={containerRef} className="flex flex-col justify-start gap-2">
      {/* Add Diets Button */}
      <Link
        href={`/doctor/patients/${patientId}?tab=Dietas&consultationId=${consultation.id}`}
        title="Agregar Dieta a esta consulta"
        className={`bg-beehealth-blue-primary-dark hover:bg-beehealth-blue-primary-dark-hover flex items-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5 ${
          animateDietButton ? 'bg-beehealth-green-secondary-dark animate-bounce' : ''
        }`}
      >
        <Plus className="h-4 w-4" />
        <Apple className="h-4 w-4 sm:h-5 sm:w-5" />
      </Link>

      {/* Add Workouts Button */}
      <Link
        href={`/doctor/patients/${patientId}?tab=Ejercicios&consultationId=${consultation.id}`}
        title="Agregar Ejercicio a esta consulta"
        className={`bg-beehealth-blue-primary-dark hover:bg-beehealth-blue-primary-dark-hover flex items-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5 ${
          animateDietButton ? 'bg-beehealth-green-secondary-dark animate-bounce' : ''
        }`}
      >
        <Plus className="h-4 w-4" />
        <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5" />
      </Link>

      {/* Add Goal Button */}
      <Link
        href={`/doctor/patients/${patientId}?tab=Metas&consultationId=${consultation.id}&currentWeight=${currentWeightValue}`}
        onClick={() => {
          openModal('confirm', consultation);
        }}
        title="Agregar Meta a esta consulta"
        className={`bg-beehealth-blue-primary-dark hover:bg-beehealth-blue-primary-dark-hover flex items-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5 ${
          animateDietButton ? 'bg-beehealth-green-secondary-dark animate-bounce' : ''
        }`}
      >
        <Plus className="h-4 w-4" />
        <Flag className="h-4 w-4 sm:h-5 sm:w-5" />
      </Link>

      {/* Edit Record Button */}
      <button className="bg-beehealth-yellow-secondary-solid hover:bg-beehealth-yellow-secondary-solid-hover flex cursor-pointer items-center justify-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5">
        <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Delete Record Button */}
      <button className="bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover flex cursor-pointer justify-center self-start rounded-lg p-2 text-white active:scale-95 sm:self-auto sm:p-2.5">
        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}

export default ActionButtons;
