import { Award, Briefcase, Calendar, CheckCircle2, Edit2 } from 'lucide-react';

function SharedProfessionalSection({ isEditing }: { isEditing: boolean }) {
  return (
    <div className="bg-beehealth-body-main rounded-2xl border border-gray-200 p-6 shadow-lg">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
          <Briefcase className="h-5 w-5 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-700">Información Profesional</h3>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Edit2 className="h-4 w-4" />
            Biografía Profesional
          </label>
          <textarea
            maxLength={250}
            rows={4}
            defaultValue="Especialista en nutrición clínica con más de 10 años de experiencia ayudando a pacientes a alcanzar sus objetivos de salud."
            disabled={!isEditing}
            className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-700 transition-all duration-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
          ></textarea>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl bg-linear-to-br from-blue-50 to-blue-100 p-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-xs text-blue-600">Años de experiencia</p>
              <p className="text-2xl font-bold text-blue-900">10+</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-linear-to-br from-purple-50 to-purple-100 p-4">
            <Award className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-xs text-purple-600">Certificaciones</p>
              <p className="text-2xl font-bold text-purple-900">5</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-linear-to-br from-green-50 to-green-100 p-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-xs text-green-600">Estado</p>
              <p className="text-lg font-bold text-green-900">Activo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharedProfessionalSection;
