'use client';

import { AlertCircle } from 'lucide-react';
import { useGetAllDiets } from '@/hooks/diets/get/useGetAllDiets';

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

export default function PatientDietDetail({ params, role }) {
  const { id } = params;

  const { dietsData, isLoading, error } = useGetAllDiets();
  const diet = dietsData?.find((d) => d._id === id);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-500">Cargando información...</p>
        </div>
      </div>
    );
  }

  if (error || !diet) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="space-y-4 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <p className="text-gray-600">Error al cargar la dieta</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-beehealth-body-main h-full min-h-full overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <GoBackButton role={role} diet={diet} />

        {diet?.images?.[0] && <DietImage diet={diet} />}
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-0">
        {/* Title */}
        <div className="mb-8 flex flex-col gap-6">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{diet?.name}</h1>

          {/* Meta info grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {diet?.category && <Category diet={diet} />}
            {diet?.doctor?.fullName && <DoctorName diet={diet} />}
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
