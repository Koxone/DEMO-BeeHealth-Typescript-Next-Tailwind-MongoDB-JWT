import PatientDietDetail from '@/components/sections/patient/diets/[id]/PatientDietDetail';

export default async function PatientDietDetailPage({ params }) {
  const resolvedParams = await params;

  return (
    <div className="h-screen overflow-hidden pb-40">
      <PatientDietDetail params={resolvedParams} />
    </div>
  );
}
