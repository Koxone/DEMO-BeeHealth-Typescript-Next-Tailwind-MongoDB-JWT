import { List, Info, Award, AlertCircle } from 'lucide-react';
import React from 'react';
import Cautions from './components/Cautions';
import Benefits from './components/Benefits';
import Instructions from './components/Instructions';

function DetailsSection({
  form,
  setForm,
  instructionInputs,
  handleInstructionInputChange,
  handleAddInstructionInput,
  handleRemoveInstructionInput,
  benefitInputs,
  handleBenefitInputChange,
  handleAddBenefitInput,
  handleRemoveBenefitInput,
  cautionInputs,
  handleCautionInputChange,
  handleAddCautionInput,
  handleRemoveCautionInput,
}) {
  return (
    <div className="group bg-beehealth-body-main/80 border-beehealth-blue-primary-solid rounded-2xl border p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-beehealth-blue-primary-solid rounded-xl p-2.5">
          <List className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Descripción Completa</h3>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            Explicación General
          </label>
          <textarea
            value={form.about}
            onChange={(e) => setForm({ ...form, about: e.target.value })}
            placeholder="Describe el ejercicio, qué músculos trabaja y sus características principales..."
            className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-gray-900 shadow-sm transition-all duration-300 outline-none placeholder:text-gray-400"
            rows="3"
          />
        </div>

        {/* Instructions */}
        <Instructions
          instructionInputs={instructionInputs}
          handleInstructionInputChange={handleInstructionInputChange}
          handleAddInstructionInput={handleAddInstructionInput}
          handleRemoveInstructionInput={handleRemoveInstructionInput}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Benefits */}
          <Benefits
            benefitInputs={benefitInputs}
            handleBenefitInputChange={handleBenefitInputChange}
            handleAddBenefitInput={handleAddBenefitInput}
            handleRemoveBenefitInput={handleRemoveBenefitInput}
          />

          {/* Cautions */}
          <Cautions
            cautionInputs={cautionInputs}
            handleCautionInputChange={handleCautionInputChange}
            handleRemoveCautionInput={handleRemoveCautionInput}
            handleAddCautionInput={handleAddCautionInput}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsSection;
