// UI Components
import Description from './sections/Description';
import Benefits from './sections/Benefits';
import Instructions from './sections/Instructions';
import Ingredients from './sections/Ingredients';
import AllowedFoods from './sections/allowed/AllowedFoods';
import AllowedLiquids from './sections/allowed/AllowedLiquids';
import ForbiddenFoods from './sections/forbidden/ForbiddenFoods';
import ForbiddenLiquids from './sections/forbidden/ForbiddenLiquids';
import Notes from './sections/Notes';

// Enums, Types and Interfaces
import { DietTemplateDTOPresentation } from '@/presentation/types/';

// Prop Types
interface DietSectionsContainerProps {
  dietData: DietTemplateDTOPresentation;
}

function DietSectionsContainer({ dietData }: DietSectionsContainerProps) {
  return (
    <div className="space-y-6">
      {/* Description section */}
      {dietData?.description && <Description diet={dietData} />}

      {/* Benefits section */}
      {dietData?.benefits && <Benefits diet={dietData} />}

      {/* Instructions section */}
      {dietData?.instructions && <Instructions diet={dietData} />}

      {/* Ingredients section */}
      {dietData?.ingredients?.length > 0 && <Ingredients diet={dietData} />}

      {/* Allowed foods section */}
      {dietData?.allowedFoods?.items?.length > 0 && <AllowedFoods diet={dietData} />}

      {/* Allowed liquids section */}
      {dietData?.allowedLiquids?.items?.length > 0 && <AllowedLiquids diet={dietData} />}

      {/* Forbidden foods section */}
      {dietData?.forbiddenFoods?.items?.length > 0 && <ForbiddenFoods diet={dietData} />}

      {/* Forbidden liquids section */}
      {dietData?.forbiddenLiquids?.items?.length > 0 && <ForbiddenLiquids diet={dietData} />}

      {/* Medical notes section */}
      {dietData?.notes && <Notes diet={dietData} />}
    </div>
  );
}

export default DietSectionsContainer;
