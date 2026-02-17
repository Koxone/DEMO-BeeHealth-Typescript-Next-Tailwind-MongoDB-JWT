'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const useGoToConsultasTab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToConsultasTab = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', 'Consultas');
    params.set('scrollTo', 'assignDietPlanButton');

    router.push(`?${params.toString()}`);

    requestAnimationFrame(() => {
      const el = document.getElementById('assignDietPlanButton');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  return { goToConsultasTab };
};
