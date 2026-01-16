import { Check, Mail, Pencil, X } from 'lucide-react';
import { useState } from 'react';

function EditableEmailField({ isEditingEmail, setIsEditingEmail, patient }) {
  const [editableEmail, setEditableEmail] = useState(patient?.patient?.email || '');

  return (
    <div className="border-asana-beige/40 group relative flex items-center gap-3 rounded-xl border bg-black/20 p-3 backdrop-blur-sm">
      {/* Is Editing Mode */}
      {isEditingEmail && (
        <div className="absolute -top-9 right-0 space-x-2 rounded-md bg-black/40 p-1 text-xs text-white transition group-hover:block">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => setIsEditingEmail(false)}
            className="bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover rounded-md p-1 text-xs text-white transition"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Save Button */}
          <button
            type="button"
            onClick={() => setIsEditingEmail(false)}
            className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover rounded-md p-1 text-xs text-white transition"
          >
            <Check className="h-4 w-4" />
          </button>
        </div>
      )}

      {!isEditingEmail && (
        <button
          type="button"
          onClick={() => setIsEditingEmail(true)}
          className="absolute top-2 right-2 rounded-md bg-black/40 p-1 text-white transition"
        >
          <Pencil className="h-4 w-4" />
        </button>
      )}

      <div className="bg-beehealth-body-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
        <Mail className="h-5 w-5 text-white" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-blue-100">Correo</p>

        {isEditingEmail ? (
          <input
            type="email"
            value={editableEmail}
            onChange={(e) => setEditableEmail(e.target.value)}
            className="bg-beehealth-red-primary-solid/50 w-fit rounded-lg text-sm font-semibold text-white outline-none"
          />
        ) : (
          <p className="truncate text-sm font-semibold">
            {patient?.patient?.email || 'Paciente sin historial clinico'}
          </p>
        )}
      </div>
    </div>
  );
}

export default EditableEmailField;
