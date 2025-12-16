import Link from 'next/link';
import React from 'react';

function GoBackButton({ role, diet }) {
  return (
    <Link
      href={`/${role}/diets`}
      className="mb-6 inline-flex items-center gap-2 font-medium text-gray-600 transition-colors hover:text-gray-900"
    >
      <ArrowLeft className="h-5 w-5" />
      Volver a Dietas
    </Link>
  );
}

export default GoBackButton;
