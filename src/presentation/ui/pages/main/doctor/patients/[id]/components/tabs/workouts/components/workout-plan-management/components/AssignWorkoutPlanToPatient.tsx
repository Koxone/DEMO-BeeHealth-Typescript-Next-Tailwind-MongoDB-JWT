'use client';

// Next, React and Other Libraries
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Enums, Types and Interfaces
import { UserSpecialty } from '@/domain/enums/';
import { GetAllDietTemplatesResponse } from '@/application/use-cases/diet/GetAllDietTemplatesUseCase';
import { DietPlanResponseDTOPresentation } from '@/presentation/types';

// Custom Hooks and Stores
import { useAssignDietPlanFiltersForUi } from '@/presentation/hooks/diet-plan/ui/useAssignDietPlanFiltersForUi';
import { AssignDietMutate } from '@/presentation/hooks/diet-plan';
import { useActiveModalStore } from '@/presentation/store/useActiveModalStore';

// Prop Types
interface AssignDietPlanToPatientProps {
  consultationId: string;
  assignDiet: AssignDietMutate;
  allDietsData: GetAllDietTemplatesResponse;
  patientDietPlansData: DietPlanResponseDTOPresentation[];
}

export default function AssignDietPlanToPatient({
  consultationId,
  allDietsData,
  assignDiet,
  patientDietPlansData,
}: AssignDietPlanToPatientProps) {
  // Modal Management with Store
  const { activeModal, data, openModal, closeModal } = useActiveModalStore();

  // Local States
  const [openDropdown, setDropdownOpen] = useState(false);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const { filteredDiets, isDietBlocked, isDietChecked } = useAssignDietPlanFiltersForUi({
    allDietsData,
    patientDietPlansData,
    selectedDiets,
    search,
  });

  const toggleDiet = (id: string) => {
    setSelectedDiets((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Handle Assign Diets to Patient
  const handleAssign = async () => {
    try {
      await Promise.all(
        selectedDiets.map((dietTemplateId) =>
          assignDiet({
            consultationId,
            specialty: UserSpecialty.WEIGHT,
            dietTemplateId,
            durationDays: 30,
          })
        )
      );

      // Success
      openModal('success', {
        title: 'Dietas asignadas',
        message: 'Las dietas han sido asignadas exitosamente al paciente.',
      });
      setTimeout(() => {
        closeModal();
      }, 1200);

      setSelectedDiets([]);
      setDropdownOpen(false);
    } catch (error) {
      // Error
      console.error('Error asignando dietas', error);
    }
  };

  return (
    <div className="bg-beehealth-body-main flex flex-col rounded-lg border border-gray-400 p-4">
      <label className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
        Asignar dietas al paciente
      </label>
      <label className="mb-2 text-xs tracking-wide text-gray-500">
        Selecciona las dietas que deseas asignar al paciente y guarda los cambios.
      </label>

      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setDropdownOpen(!openDropdown)}
        className="bg-beehealth-body-main flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:border-gray-400"
      >
        <span>
          {selectedDiets.length === 0 && 'Seleccionar dietas'}
          {selectedDiets.length === 1 && '1 dieta seleccionada'}
          {selectedDiets.length > 1 && `${selectedDiets.length} dietas asignadas`}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-600 transition-transform ${openDropdown ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`mt-2 w-full overflow-hidden transition-all duration-300 ease-out ${
          openDropdown ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-beehealth-body-main h-56 overflow-y-auto rounded-lg border border-gray-400 shadow-md">
          <div className="bg-beehealth-body-main sticky top-0 p-2 shadow-sm">
            <input
              maxLength={250}
              type="text"
              placeholder="Buscar dieta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:border-beehealth-blue-primary-solid w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:outline-none"
            />
          </div>

          <ul className="divide-y divide-gray-100">
            {filteredDiets.map((diet) => {
              const blocked = isDietBlocked(diet.id);
              const checked = isDietChecked(diet.id);

              return (
                <li
                  key={diet.id}
                  onClick={() => {
                    if (blocked) return;
                    toggleDiet(diet.id);
                  }}
                  className={`flex items-center gap-3 px-3 py-2 ${
                    blocked ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'
                  }`}
                >
                  <input
                    maxLength={250}
                    type="checkbox"
                    checked={checked}
                    disabled={blocked}
                    readOnly
                    className="text-beehealth-blue-primary-solid pointer-events-none h-4 w-4 rounded border-gray-300"
                  />

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">{diet.name}</span>
                    {diet.category && (
                      <span className="text-xs text-gray-500">{diet.category}</span>
                    )}
                  </div>
                </li>
              );
            })}

            {filteredDiets.length === 0 && (
              <li className="px-3 py-4 text-center text-sm text-gray-500">
                No se encontraron dietas
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Assign button */}
      {openDropdown && (
        <button
          type="button"
          onClick={handleAssign}
          disabled={selectedDiets.length === 0}
          className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mt-3 cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Asignar a Paciente
        </button>
      )}
    </div>
  );
}
