import { Check, Phone, Pencil, X } from 'lucide-react';
import { useState } from 'react';

function EditablePhoneField({ isEditingPhone, setIsEditingPhone, patient }) {
  const [editablePhone, setEditablePhone] = useState(patient?.patient?.phone || '');

  return (
    <div className="border-asana-beige/40 group relative flex items-center gap-3 rounded-xl border bg-black/20 p-3 backdrop-blur-sm">
      {/* Is Editing Mode */}
      {isEditingPhone && (
        <div className="absolute -top-9 right-0 space-x-2 rounded-md bg-black/40 p-1 text-xs text-white transition group-hover:block">
          {/* Cancel */}
          <button
            type="button"
            onClick={() => {
              setEditablePhone(patient?.patient?.phone || '');
              setIsEditingPhone(false);
            }}
            className="bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover rounded-md p-1 text-xs text-white transition"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Save */}
          <button
            type="button"
            onClick={() => setIsEditingPhone(false)}
            className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover rounded-md p-1 text-xs text-white transition"
          >
            <Check className="h-4 w-4" />
          </button>
        </div>
      )}

      {!isEditingPhone && (
        <button
          type="button"
          onClick={() => setIsEditingPhone(true)}
          className="absolute top-2 right-2 rounded-md bg-black/40 p-1 text-white transition"
        >
          <Pencil className="h-4 w-4" />
        </button>
      )}

      {/* Icon */}
      <div className="bg-beehealth-body-main/20 flex h-10 w-10 items-center justify-center rounded-lg">
        <Phone className="h-5 w-5 text-white" />
      </div>

      {/* Content */}
      <div>
        <p className="text-xs text-blue-100">Teléfono</p>

        {isEditingPhone ? (
          <input
            type="tel"
            value={editablePhone}
            onChange={(e) => setEditablePhone(e.target.value)}
            className="bg-beehealth-red-primary-solid/50 rounded-lg text-sm font-semibold text-white outline-none"
          />
        ) : (
          <p className="text-sm font-semibold">
            {patient?.patient?.phone || 'Paciente sin historial clinico'}
          </p>
        )}
      </div>
    </div>
  );
}

export default EditablePhoneField;
