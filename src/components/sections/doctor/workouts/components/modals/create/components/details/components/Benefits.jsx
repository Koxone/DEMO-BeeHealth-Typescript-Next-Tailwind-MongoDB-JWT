import { Award, Info } from 'lucide-react';
import React from 'react';

function Benefits({
  benefitInputs,
  handleBenefitInputChange,
  handleAddBenefitInput,
  handleRemoveBenefitInput,
}) {
  return (
    <div className="border-beehealth-blue-primary-solid space-y-3 rounded-lg border p-4">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Award className="text-beehealth-blue-primary-dark h-4 w-4" />
        Beneficios
      </label>

      {/* Benefits List */}
      <div className="space-y-3">
        {benefitInputs.map((benefit, index) => (
          <div key={index} className="flex gap-2">
            <div className="bg-beehealth-blue-primary-light mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
              <span className="text-beehealth-blue-primary-dark text-xs font-bold">•</span>
            </div>
            <textarea
              value={benefit}
              onChange={(e) => handleBenefitInputChange(index, e.target.value)}
              placeholder={`Beneficio ${index + 1}...`}
              className="bg-beehealth-body-main flex-1 resize-none rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400"
              rows="1"
            />
            {benefitInputs.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveBenefitInput(index)}
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
        onClick={handleAddBenefitInput}
        className="border-beehealth-blue-primary-solid bg-beehealth-blue-primary-light text-beehealth-blue-primary-dark hover:border-beehealth-blue-primary-dark hover:bg-beehealth-blue-primary-light-hover w-full rounded-xl border-2 border-dashed px-4 py-3.5 font-semibold shadow-sm transition-all duration-300 active:scale-95"
      >
        + Agregar beneficio
      </button>

      {/* Info */}
      <div className="bg-beehealth-blue-primary-light flex items-start gap-2 rounded-lg px-3 py-2">
        <Info className="text-beehealth-blue-primary-dark mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-beehealth-blue-primary-dark text-xs">
          Lista los beneficios principales que proporciona este ejercicio.
        </p>
      </div>
    </div>
  );
}

export default Benefits;
