import DietCardActions from '@/components/shared/diets/DietCardActions';
import Link from 'next/link';

export default function DoctorDietCard({ diet, onClickAssign }) {
  return (
    <div className="group border-beehealth-green-primary-light group hover:border-beehealth-blue-primary-solid bg-beehealth-body-main flex flex-col rounded-xl border-2 p-4 shadow-sm transition-all duration-200 hover:shadow-lg md:p-6">
      {/* Diet Image */}
      <Link
        href={`/doctor/diets/${diet?._id}?mode=read`}
        className="relative mb-4 flex h-32 w-full scale-90 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-green-100 to-blue-100 transition-transform duration-250 group-hover:scale-100"
      >
        <img src={diet?.images?.[0]} alt={diet?.name} />
      </Link>

      {/* Diet Name */}
      <Link href={`/doctor/diets/${diet?._id}?mode=read`} className="mb-4 space-y-2 text-sm">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
          {diet?.name}
        </h3>
      </Link>

      {/* Doctor Diet Stats */}
      <Link href={`/doctor/diets/${diet?._id}?mode=read`} className="mb-4 space-y-2 text-sm">
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Asignado a:</span> {diet?.patients?.length}{' '}
          Pacientes
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Categoria:</span> {diet?.category}
        </p>
      </Link>

      {/* Doctor Actions */}
      <DietCardActions id={diet?._id} onClickAssign={onClickAssign} />
    </div>
  );
}
