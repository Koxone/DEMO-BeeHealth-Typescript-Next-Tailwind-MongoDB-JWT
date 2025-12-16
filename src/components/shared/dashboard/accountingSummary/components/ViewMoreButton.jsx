'use client';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

function ViewMoreButton({ role, route = '' }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/${role}/${route}`)}
      className="group hover:bg-beehealth-body-main/20 flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 active:scale-95"
    >
      <span>Ver más</span>
      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </button>
  );
}

export default ViewMoreButton;
