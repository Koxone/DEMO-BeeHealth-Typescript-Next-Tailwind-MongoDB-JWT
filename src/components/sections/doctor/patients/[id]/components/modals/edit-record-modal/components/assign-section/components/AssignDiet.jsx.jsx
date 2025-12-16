'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { useGetAllDiets } from '@/hooks/diets/get/useGetAllDiets';
import { useParams } from 'next/navigation';

export default function AssignDiet({ onSelectDiet }) {
  const { id: patientId } = useParams();
  const { dietsData, refetch: fetchDiets } = useGetAllDiets();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Force single selection
  const toggleItem = (id) => {
    setSelected((prev) => (prev.includes(id) ? [] : [id]));
  };

  // Assign Handler
  const handleAssign = () => {
    if (selected.length === 0) return;
    return selected[0];
  };

  useEffect(() => {
    if (!dietsData) return;

    const alreadyAssigned = dietsData
      .filter((diet) => diet.patients.some((p) => String(p.patient._id) === patientId))
      .map((diet) => diet._id);

    setAssigned([]);
  }, [dietsData, patientId]);

  const removeAssigned = (id) => {
    setAssigned((prev) => prev.filter((x) => x !== id));
  };

  return (
    <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-400 p-4">
      {/* Title */}
      <label className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
        Asignar dieta
      </label>

      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-beehealth-body-main flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-900 hover:border-gray-400"
      >
        <span>
          {selected.length === 0 && 'Seleccionar dieta'}
          {selected.length === 1 && '1 seleccionada'}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-600" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="bg-beehealth-body-main mt-2 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-400 shadow-md">
          <div className="bg-beehealth-body-main sticky top-0 p-2 shadow-sm">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
            />
          </div>

          <ul className="divide-y divide-gray-100">
            {dietsData?.map((item) => {
              const isAssigned = dietsData.some(
                (diet) =>
                  diet._id === item._id &&
                  diet.patients.some((p) => String(p.patient._id) === patientId)
              );

              return (
                <li
                  key={item._id}
                  className="hover:bg-beehealth-body-main flex cursor-pointer items-center gap-3 px-3 py-2"
                  onClick={() => {
                    if (!isAssigned) toggleItem(item._id);
                  }}
                >
                  <input
                    type="checkbox"
                    onChange={() => toggleItem(item._id)}
                    className="text-beehealth-blue-primary-solid h-4 w-4 rounded border-gray-300"
                  />

                  <span className="text-sm text-gray-700">{item.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Assign button */}
      <button
        type="button"
        onClick={() => {
          const id = handleAssign();
          if (id) onSelectDiet(id);
          setOpen(false);
        }}
        disabled={selected.length === 0}
        className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mt-2 rounded-md px-3 py-2 text-sm text-white disabled:opacity-50"
      >
        Asignar dieta
      </button>

      {/* Success */}
      {showSuccess && (
        <div className="mt-2 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
          <Check className="h-4 w-4" />
          <span>Asignación completada</span>
        </div>
      )}

      {/* Assigned badges */}
      {assigned.map((dietId) => {
        const diet = dietsData.find((d) => d._id === dietId);
        return (
          <div
            key={dietId}
            className="bg-beehealth-blue-secondary-solid mt-2 flex items-center gap-2 rounded-lg px-3 py-1 text-xs font-medium text-white"
          >
            {diet?.name}
            <button onClick={() => removeAssigned(dietId)} className="hover:text-red-300">
              <X className="h-3 w-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
