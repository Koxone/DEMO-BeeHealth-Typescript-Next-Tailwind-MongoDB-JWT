'use client';

// React and Libraries
import { Edit2, Save } from 'lucide-react';

// Prop Types
interface SharedEditProfileButtonProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SharedEditProfileButton({
  isEditing,
  setIsEditing,
}: SharedEditProfileButtonProps) {
  return (
    <div className={`${isEditing ? 'flex gap-4 justify-self-start' : ''} `}>
      <button onClick={() => setIsEditing((prev) => !prev)} className="button-beehealth-edit">
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

      {isEditing && (
        <button onClick={() => setIsEditing(false)} className="button-beehealth-cancel">
          Cancelar
        </button>
      )}
    </div>
  );
}
