import { Check, Pencil, X } from 'lucide-react';
import { useState } from 'react';

export default function EditableNameField({ patient, isEditingName, setIsEditingName }) {
  // Local State
  const [editableFullName, setEditableFullName] = useState(patient?.patient?.fullName || '');

  return (
    <div className="group relative w-fit">
      {/* Is Editing Mode */}
      {isEditingName && (
        <div className="absolute -top-10 right-0 space-x-2 rounded-md bg-black/40 p-1">
          <button
            type="button"
            onClick={() => {
              setEditableFullName(patient?.patient?.fullName || '');
              setIsEditingName(false);
            }}
            className="bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover rounded-md p-1 text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsEditingName(false)}
            className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover rounded-md p-1 text-white"
          >
            <Check className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Regular Mode */}
      {!isEditingName && (
        <button
          type="button"
          onClick={() => setIsEditingName(true)}
          className="absolute top-3 -right-10 rounded-md bg-black/40 p-1 text-white"
        >
          <Pencil className="h-4 w-4" />
        </button>
      )}

      {isEditingName ? (
        <input
          type="text"
          value={editableFullName}
          onChange={(e) => setEditableFullName(e.target.value)}
          className="bg-beehealth-red-primary-solid/50 rounded-lg text-4xl font-bold text-white capitalize outline-none"
        />
      ) : (
        <h1 className="text-4xl font-bold capitalize">
          {patient?.patient?.fullName || 'Paciente sin historial clinico'}
        </h1>
      )}
    </div>
  );
}
