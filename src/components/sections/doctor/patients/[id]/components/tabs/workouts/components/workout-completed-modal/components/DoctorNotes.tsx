import { MessageSquare } from 'lucide-react';

function DoctorNotes({
  doctorNotes,
  setDoctorNotes,
}: {
  doctorNotes: string;
  setDoctorNotes: (notes: string) => void;
}) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-gray-600" />
        <p className="text-sm font-semibold text-gray-800">
          Notas del doctor
          <span className="ml-1 text-xs font-normal text-gray-700">(Opcional)</span>
        </p>
      </div>
      <textarea
        value={doctorNotes}
        onChange={(e) => setDoctorNotes(e.target.value)}
        placeholder="Escribe observaciones sobre el cumplimiento del paciente..."
        rows={3}
        className="focus:border-beehealth-blue-primary-solid w-full resize-none rounded-xl border-2 border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 transition-colors focus:bg-white focus:outline-none"
      />
    </div>
  );
}

export default DoctorNotes;
