'use client';

import { AlertCircle } from 'lucide-react';

import AllowedFoods from './components/sections/allowed/AllowedFoods';
import AllowedLiquids from './components/sections/allowed/AllowedLiquids';
import ForbiddenFoods from './components/sections/forbidden/ForbiddenFoods';
import ForbiddenLiquids from './components/sections/forbidden/ForbiddenLiquids';
import Ingredients from './components/sections/Ingredients';
import Duration from './components/sections/Duration';
import Notes from './components/sections/Notes';
import Instructions from './components/sections/Instructions';
import Benefits from './components/sections/Benefits';
import Description from './components/sections/Description';
import AssignedDate from './components/sections/AssignedDate';
import DoctorName from './components/sections/DoctorName';
import Category from './components/sections/Category';
import GoBackButton from '@/components/shared/diets/GoBackButton';
import DietImage from './components/sections/DietImage';

// Custom Hooks
import { useGetAllDiets } from '@/@hooks/diets/get/useGetAllDiets';
import LoadingState from '@/components/shared/feedback/LoadingState';
import ErrorState from '@/components/shared/feedback/ErrorState';

export default function PatientDietDetail({ params }) {
  const { id } = params;

  const { dietsData, isLoading, error } = useGetAllDiets();
  const diet = dietsData?.find((d) => d._id === id);

  // Loading State
  if (isLoading) {
    return <LoadingState />;
  }

  // Error State
  if (error || !diet) {
    return <ErrorState />;
  }
  return (
    <div className="bg-beehealth-body-main mb-20 h-full min-h-full overflow-auto md:mb-0">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <GoBackButton />

        {diet?.images?.[0] && <DietImage diet={diet} />}
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-0">
        {/* Title */}
        <div className="mb-8 flex flex-col gap-6">
          <h1 className="mb-4 text-3xl font-bold text-gray-700 md:text-4xl">{diet?.name}</h1>

          {/* Meta info grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {diet?.category && <Category diet={diet} />}
            <DoctorName diet={diet} />
            {diet?.createdAt && <AssignedDate diet={diet} />}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {diet?.description && <Description diet={diet} />}
          {diet?.benefits && <Benefits diet={diet} />}
          {diet?.instructions && <Instructions diet={diet} />}
          {diet?.ingredients?.length > 0 && <Ingredients diet={diet} />}
          {diet?.allowedFoods?.items?.length > 0 && <AllowedFoods diet={diet} />}
          {diet?.allowedLiquids?.items?.length > 0 && <AllowedLiquids diet={diet} />}
          {diet?.forbiddenFoods?.items?.length > 0 && <ForbiddenFoods diet={diet} />}
          {diet?.forbiddenLiquids?.items?.length > 0 && <ForbiddenLiquids diet={diet} />}
          {diet?.duration && <Duration diet={diet} />}
          {diet?.notes && <Notes diet={diet} />}
        </div>

        <div className="h-8"></div>
      </div>
    </div>
  );
}
