import { X } from 'lucide-react';
import { useModalClose } from '@/@hooks/useModalClose';

function EditAvailableTimesModal({ editingSchedule, setEditingSchedule, handleSaveSchedule }) {
  // Modal close handler
  const { handleOverlayClick } = useModalClose(() => setEditingSchedule(null));
  return (
    <div
      id="overlay"
      onClick={handleOverlayClick}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">Editar Horario</h3>
          {/* Close Modal Button */}
          <button
            onClick={() => setEditingSchedule(null)}
            className="group hover:bg-beehealth-red-primary-solid rounded-lg bg-gray-100 p-2 text-gray-500 hover:text-white"
          >
            <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">Día</label>
            <input
              type="text"
              value={editingSchedule.day}
              disabled
              className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Hora Inicio</label>
              <input
                type="time"
                value={editingSchedule.startTime}
                onChange={(e) =>
                  setEditingSchedule({ ...editingSchedule, startTime: e.target.value })
                }
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-2 focus:border-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Hora Fin</label>
              <input
                type="time"
                value={editingSchedule.endTime}
                onChange={(e) =>
                  setEditingSchedule({ ...editingSchedule, endTime: e.target.value })
                }
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-2 focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setEditingSchedule(null)}
              className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveSchedule}
              className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover flex-1 rounded-xl px-4 py-2 font-semibold text-white transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAvailableTimesModal;
