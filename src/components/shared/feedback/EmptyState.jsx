'use client';

import { FileText, Plus } from 'lucide-react';
import Link from 'next/link';

export default function EmptyState({
  title,
  subtitle,
  button = '',
  href = '#',
  showButton = false,
}) {
  return (
    <div className="w-full rounded-2xl border-2 border-dashed border-gray-300 bg-linear-to-br from-gray-50 to-purple-50 p-12 text-center">
      <div className="bg-beehealth-blue-primary-solid mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
        <FileText className="h-10 w-10 text-white" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-700">{title}</h3>
      <p className="mb-6 text-gray-600">{subtitle}</p>
      {showButton && (
        <Link
          href={href}
          className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200"
        >
          <Plus className="h-5 w-5" />
          {button}
        </Link>
      )}
    </div>
  );
}
