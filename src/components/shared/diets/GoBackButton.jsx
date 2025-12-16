'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-gray-600 transition hover:text-gray-900 active:scale-95"
    >
      <ArrowLeft className="h-5 w-5" />
      Volver a Dietas
    </button>
  );
}
