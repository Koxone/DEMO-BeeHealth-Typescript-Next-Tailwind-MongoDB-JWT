import Link from 'next/link';
import { Eye, Edit, User } from 'lucide-react';

export default function DietCardActions({ id, onClickAssign }) {
  return (
    <div className="flex gap-2">
      {/* View button */}
      {/* <button
        onClick={onClickAssign}
        className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition active:scale-95"
      >
        <User className="h-4 w-4" />
        Asignar
      </button> */}
      <Link
        href={`/doctor/diets/${id}?mode=read`}
        className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition active:scale-95"
      >
        <Eye className="h-4 w-4" />
        Ver
      </Link>

      {/* Edit button */}
      <Link
        href={`/doctor/diets/${id}?mode=edit`}
        className="hover:bg-beehealth-body-main flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition active:scale-95"
      >
        <Edit className="h-4 w-4" />
        Editar
      </Link>
    </div>
  );
}
