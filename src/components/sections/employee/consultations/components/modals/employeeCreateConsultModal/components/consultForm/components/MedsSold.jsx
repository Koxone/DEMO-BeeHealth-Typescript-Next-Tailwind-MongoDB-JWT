'use client';

import { useEffect, useState } from 'react';
import { Pill } from 'lucide-react';
import { useGetMeds } from '@/hooks/inventory/useGetMeds';
import { handleSelect, handleQuantity, handleRemove } from '../utils/helpers';

export default function MedsSold({ form, setForm }) {
  // Get Patients list call
  const { meds, isLoading, error } = useGetMeds('medicamento');

  // Enable meds sold section
  const [enabled, setEnabled] = useState(false);

  // Selected medicines with quantity
  const [selected, setSelected] = useState([]);

  // Sync selected meds with parent form
  useEffect(() => {
    setForm({ ...form, itemsSold: selected });
  }, [selected, setForm]);

  return (
    <div className="space-y-3">
      {/* Checkbox */}
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="h-5 w-5 rounded border-gray-300 text-blue-600"
        />
        Venta de medicamentos
      </label>

      {enabled && (
        <div className="space-y-4">
          {/* Label select */}
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Pill className="h-4 w-4 text-red-600" />
            Seleccionar medicamento
          </label>

          {/* Select */}
          <select
            value=""
            onChange={(e) => handleSelect(e.target.value, meds, selected, setSelected)}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3"
          >
            <option value="">Seleccionar</option>

            {meds.map((med) => (
              <option key={med._id} value={med?._id}>
                {med?.name}
              </option>
            ))}
          </select>

          {/* Selected list */}
          {selected.length > 0 && (
            <div className="space-y-3">
              {selected.map((item) => (
                <div
                  key={item.product}
                  className="bg-beehealth-body-main space-y-2 rounded-xl border border-gray-200 p-3"
                >
                  {/* Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">{item.name}</span>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.product, selected, setSelected)}
                      className="text-sm font-semibold text-red-600"
                    >
                      Quitar
                    </button>
                  </div>

                  {/* Quantity input */}
                  <div className="grid gap-1">
                    <label className="text-xs font-semibold text-gray-500">Cantidad</label>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantity(item.product, e.target.value, setSelected)}
                      className="w-full rounded-xl border-2 border-gray-200 px-3 py-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
