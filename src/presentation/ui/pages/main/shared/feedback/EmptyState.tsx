'use client';

// Next, React and Other Libraries
import { FileText } from 'lucide-react';
import { ReactNode } from 'react';

// Prop Types
interface EmptyStateProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export default function EmptyState({ title, subtitle, children }: EmptyStateProps) {
  return (
    <div className="bg-beehealth-body-main w-full rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
      <div className="bg-beehealth-blue-primary-solid mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
        <FileText className="h-10 w-10 text-white" />
      </div>

      <h3 className="mb-2 text-xl font-bold text-gray-700">{title}</h3>
      <p className="mb-6 text-gray-600">{subtitle}</p>

      {/* Actions */}
      {children}
    </div>
  );
}
