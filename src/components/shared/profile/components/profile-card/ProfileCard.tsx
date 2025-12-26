import { CheckCircle2, User } from 'lucide-react';
import ChangeAvatar from './components/ChangeAvatar';
import PersonalInfoCard from '../PersonalInfoCard';

// Types
import { CurrentUserData } from '@/types/user/user.types';
import { useChangeUserEmail } from '@/hooks/users/useChangeEmail';
import { useChangeUserPhone } from '@/hooks/users/useChangePhone';

function ProfileCard({
  user,
  isEditing,
  loadUser,
  setShowSuccessModal,
  setTitle,
  setMessage,
  setIsEditing,
  changeEmail,
  changePhone,
}: {
  user: CurrentUserData;
  isEditing: boolean;
  loadUser: () => Promise<void>;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  changeEmail: ReturnType<typeof useChangeUserEmail>['mutate'];
  changePhone: ReturnType<typeof useChangeUserPhone>['mutate'];
}) {
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
        <ChangeAvatar
          user={user}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          loadUser={loadUser}
          setShowSuccessModal={setShowSuccessModal}
          setTitle={setTitle}
          setMessage={setMessage}
        />

        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-center text-xl font-bold text-gray-700">{user?.fullName}</h2>
          <CheckCircle2 className="text-beehealth-blue-primary-solid h-5 w-5" />
        </div>
      </div>

      <PersonalInfoCard
        user={user}
        isEditing={isEditing}
        changeEmail={changeEmail}
        changePhone={changePhone}
        setShowSuccessModal={setShowSuccessModal}
        setTitle={setTitle}
        setMessage={setMessage}
        setIsEditing={setIsEditing}
        loadUser={loadUser}
      />
    </div>
  );
}

export default ProfileCard;
