import { Edit2, Trash2, User } from 'lucide-react';
import React from 'react';

function ActionsButtons({ handleEdit, workout, onClickAssign }) {
  return (
    <div onClick={(e) => e.stopPropagation()} className="mt-4 flex gap-2">
      {/* Assign Button */}
      {/* <button
        onClick={onClickAssign}
        className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition active:scale-95"
      >
        <User className="h-4 w-4" />
        Asignar
      </button> */}

      {/* Edit Workout */}
      <button
        onClick={(e) => handleEdit(workout)}
        className="hover:bg-beehealth-blue-primary-light flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition active:scale-95"
      >
        <Edit2 className="h-4 w-4" />
        Editar
      </button>

      {/* Delete Workout */}
      {/* <button
        onClick={(e) => {
          setWorkoutToDelete(workout);
          setShowDeleteModal(true);
        }}
        className="bg-beehealth-red-primary-solid hover:bg-beehealth-red-primary-solid-hover flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-white transition active:scale-95"
      >
        <Trash2 className="h-4 w-4" />
        Eliminar
      </button> */}
    </div>
  );
}

export default ActionsButtons;
