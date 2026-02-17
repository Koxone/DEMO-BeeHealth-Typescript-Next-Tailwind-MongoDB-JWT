import { CheckCircle2, User } from 'lucide-react';
import ChangeAvatar from './components/ChangeAvatar';
import SharedPersonalInfoCard from '../SharedPersonalInfoCard';

// Enums and Types
import { CurrentUserFromAuthStoreType } from '@/presentation/store/authStore';

// Prop Types
interface ProfileCardProps {
  currentUser: CurrentUserFromAuthStoreType;
  isEditing: boolean;
  handleSuccessModal: (title: string, message: string) => void;
}

function ProfileCard({ currentUser, isEditing, handleSuccessModal }: ProfileCardProps) {
  return (
    <div className="group bg-beehealth-body-main relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-gray-200 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-beehealth-blue-primary-solid flex h-10 w-10 items-center justify-center rounded-lg">
          <User className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-700">Datos Personales</h3>
          <p className="text-sm text-gray-500">Personaliza tu perfil</p>
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        <ChangeAvatar currentUser={currentUser} isEditing={isEditing} />

        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-center text-xl font-bold text-gray-700">
            {currentUser?.name} {currentUser?.lastName}
          </h2>
          <CheckCircle2 className="text-beehealth-blue-primary-solid h-5 w-5" />
        </div>
      </div>

      <SharedPersonalInfoCard
        currentUser={currentUser}
        isEditing={isEditing}
        handleSuccessModal={handleSuccessModal}
      />
    </div>
  );
}

export default ProfileCard;
