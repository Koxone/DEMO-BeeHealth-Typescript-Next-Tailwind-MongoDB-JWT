import { Info, List } from 'lucide-react';
import React from 'react';

function Instructions({
  instructionInputs,
  handleInstructionInputChange,
  handleAddInstructionInput,
  handleRemoveInstructionInput,
}) {
  return (
    <div className="border-beehealth-blue-primary-light space-y-3 rounded-lg border p-4">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <List className="h-4 w-4 text-blue-500" />
        Instrucciones Paso a Paso
      </label>

      {/* Instructions List */}
      <div className="space-y-3">
        {instructionInputs.map((instruction, index) => (
          <div key={index} className="flex gap-2">
            <div className="bg-beehealth-blue-primary-light border-beehealth-blue-primary-solid flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
              <span className="text-beehealth-blue-primary-solid text-sm font-bold">
                {index + 1}
              </span>
            </div>
            <textarea
              value={instruction}
              onChange={(e) => handleInstructionInputChange(index, e.target.value)}
              placeholder={`Paso ${index + 1}: Describe la instrucción...`}
              className="bg-beehealth-body-main flex-1 resize-none rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400 focus:shadow-md focus:outline-none"
              rows="1"
            />
            {instructionInputs.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveInstructionInput(index)}
                className="h-fit rounded-xl border-2 border-red-300 bg-red-50 px-3 py-3.5 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:border-red-400 hover:bg-red-100 active:scale-95"
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAddInstructionInput}
        className="bg-beehealth-blue-primary-light border-beehealth-blue-primary-solid hover:border-beehealth-blue-primary-solid-hover hover:bg-beehealth-blue-primary-light-hover w-full rounded-xl border-2 border-dashed px-4 py-3.5 font-semibold text-blue-600 shadow-sm transition-all duration-300 active:scale-95"
      >
        + Agregar paso
      </button>

      {/* Info */}
      <div className="bg-beehealth-blue-primary-light flex items-start gap-2 rounded-lg px-3 py-2">
        <Info className="text-beehealth-blue-primary-solid mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-beehealth-blue-primary-dark text-xs">
          Cada paso se mostrará numerado para el usuario. Sé claro y conciso en cada instrucción.
        </p>
      </div>
    </div>
  );
}

export default Instructions;
