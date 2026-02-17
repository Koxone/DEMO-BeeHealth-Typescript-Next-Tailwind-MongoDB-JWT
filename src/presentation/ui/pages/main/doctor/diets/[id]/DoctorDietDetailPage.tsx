'use client';

// Next, React and Other Libraries
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// UI Components
import AllowedFoods from './components/sections/allowed/AllowedFoods';
import AllowedLiquids from './components/sections/allowed/AllowedLiquids';
import ForbiddenFoods from './components/sections/forbidden/ForbiddenFoods';
import ForbiddenLiquids from './components/sections/forbidden/ForbiddenLiquids';
import Ingredients from './components/sections/Ingredients';
import Notes from './components/sections/Notes';
import Instructions from './components/sections/Instructions';
import Benefits from './components/sections/Benefits';
import Description from './components/sections/Description';
import Category from './components/sections/Category';
import DietImage from './components/sections/DietImage';
import Name from './components/sections/Name';
import Images from './components/sections/Images';
import { ButtonGoBack, ButtonSm } from '../../../shared/buttons/Buttons';

// Feedback Components
import LoadingState from '../../../shared/feedback/LoadingState';

// Custom Hooks
import { useGetDietTemplate } from '@/presentation/hooks/diet/';
import DietSectionsContainer from './components/DietSectionsContainer';

//TODO - Implement Edit and Delete functionality for doctors

export default function DoctorDietDetailPage() {
  // Router and Params
  const router = useRouter();

  // Fetch dietId from URL params
  const params = useParams();
  const dietId = params?.dietId as string;

  // Fetch diet details using custom hook
  const { data: dietData, isLoading, error } = useGetDietTemplate(dietId);

  const [isEditing, setIsEditing] = useState(false);
  const [isReading, setIsReading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Loading State
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="bg-beehealth-body-main h-full min-h-full overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          {/* Go Back Button */}
          <div>
            <ButtonGoBack onClick={() => router.back()}>Volver a Dietas</ButtonGoBack>
          </div>

          {/* Delete Diet Button */}
          <div>
            <ButtonSm action="delete" onClick={() => {}}>
              Borrar Dieta
            </ButtonSm>
          </div>
        </div>

        {/* Hero section with image */}
        {dietData?.images?.[0] && <DietImage diet={dietData} />}
        {isEditing && <Images diet={dietData} />}
      </div>

      {/* Main content */}
      <div className="mx-auto px-0 pb-8">
        {/* Title section */}
        <div className="mb-8 flex flex-col gap-6">
          <Name diet={dietData} />

          {/* Meta info grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {dietData?.category && <Category diet={dietData} />}
          </div>
        </div>

        {/* Collapse toggle */}
        {isReading && (
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mb-6 rounded-lg px-4 py-2 text-white"
          >
            {isCollapsed ? 'Ocultar dieta' : 'Mostrar dieta'}
          </button>
        )}

        {/* Content sections */}
        {(isEditing || isCollapsed) && <DietSectionsContainer dietData={dietData} />}
      </div>
    </div>
  );
}
