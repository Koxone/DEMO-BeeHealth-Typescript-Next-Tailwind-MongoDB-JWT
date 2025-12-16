'use client';
import { useState } from 'react';
import { FileText } from 'lucide-react';

export default function MockVentaMedicamentos() {
  // lista base mock
  const medicamentosMock = [
    'Paracetamol 500mg',
    'Ibuprofeno 400mg',
    'Amoxicilina 875mg',
    'Omeprazol 20mg',
    'Metformina 850mg',
    'Losartán 50mg',
    'Atorvastatina 40mg',
    'Diclofenaco 50mg',
  ];

  // estado local (solo mock)
  const [medicamentos, setMedicamentos] = useState([]);

  // agregar medicamento
  const handleAddMedicamento = (e) => {
    const selected = e.target.value;
    if (selected && !medicamentos.includes(selected)) {
      setMedicamentos([...medicamentos, selected]);
    }
  };

  // eliminar medicamento
  const handleRemoveMedicamento = (med) => {
    setMedicamentos(medicamentos.filter((m) => m !== med));
  };

  return (
    <div>
      <label className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
        <FileText className="h-4 w-4 text-indigo-600" />
        Venta de Medicamento(s)
      </label>

      {/* selector */}
      <select
        onChange={handleAddMedicamento}
        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-medium transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
        defaultValue=""
      >
        <option value="">Seleccionar Medicamento</option>
        {medicamentosMock.map((med, index) => (
          <option key={index} value={med}>
            {med}
          </option>
        ))}
      </select>

      {/* lista seleccionada */}
      {medicamentos.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {medicamentos.map((med) => (
            <div
              key={med}
              className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
            >
              <span>{med}</span>
              <button
                type="button"
                onClick={() => handleRemoveMedicamento(med)}
                className="text-indigo-500 hover:text-indigo-700"
                title="Eliminar"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
