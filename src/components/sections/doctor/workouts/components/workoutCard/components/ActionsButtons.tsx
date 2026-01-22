import { Edit2 } from 'lucide-react';

function ActionsButtons({ handleEdit, workout }) {
  return (
    <div onClick={(e) => e.stopPropagation()} className="mt-4 flex gap-2">
      {/* Edit Workout */}
      <button
        onClick={(e) => handleEdit(workout)}
        className="hover:bg-beehealth-blue-primary-light flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition active:scale-95"
      >
        <Edit2 className="h-4 w-4" />
        Editar
      </button>
    </div>
  );
}

export default ActionsButtons;
