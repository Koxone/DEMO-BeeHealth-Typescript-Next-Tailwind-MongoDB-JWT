'use client';

import { Edit2, Save } from 'lucide-react';

function WelcomeCard({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => setIsEditing((prev) => !prev)}
      className="group bg-beehealth-blue-primary-solid flex scale-90 items-center gap-2 justify-self-end rounded-xl px-6 py-3 font-semibold text-white transition-all hover:scale-100"
    >
      {isEditing ? (
        <>
          <Save className="h-5 w-5" />
          Guardar
        </>
      ) : (
        <>
          <Edit2 className="h-5 w-5" />
          Editar Perfil
        </>
      )}
    </button>
  );
}

export default WelcomeCard;
