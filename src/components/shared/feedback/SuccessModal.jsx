'use client';

import { X, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function SuccessModal({ title, message, showSuccessModal, setShowSuccessModal }) {
  if (!showSuccessModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/50 p-4">
      <div className="animate-slideDown bg-beehealth-body-main relative w-full max-w-lg rounded-3xl border-2 border-green-500 p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={() => setShowSuccessModal(false)}
          className="absolute top-4 right-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Icon */}
        <div className="mb-6 flex items-center justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">{title}</h2>

        {/* Subtitle */}
        <p className="mb-6 text-center text-gray-600">{message}</p>
      </div>
    </div>
  );
}

// How to use:
{
  /* <SuccessModal
  title={isEditing ? 'Dieta editada con éxito' : 'Dieta creada con éxito'}
  message="La información fue guardada correctamente."
  showSuccessModal={showSuccessModal}
  setShowSuccessModal={setShowSuccessModal}
/>; */
}
