import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TopBar({ label = 'Volver' }) {
  return (
    <Link
      href="/doctor/diets"
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
    >
      <ArrowLeft className="h-5 w-5" />
      Volver a Dietas
    </Link>
  );
}
