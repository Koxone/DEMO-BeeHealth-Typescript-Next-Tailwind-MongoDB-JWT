import PatientDietDetail from '@/components/sections/patient/diets/[id]/PatientDietDetail';
export const runtime = 'nodejs';

export default async function PatientDietDetailPage({ params }) {
  const resolvedParams = await params;
  return (
    <div>
      <PatientDietDetail params={resolvedParams} />
    </div>
  );
}
