'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export const useScrollToTopOnTabChange = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab');

  useEffect(() => {
    if (!activeTab) return;

    const container = document.getElementById('patientDetailScrollContainer');
    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }, [activeTab]);
};
