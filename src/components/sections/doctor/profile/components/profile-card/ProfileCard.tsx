import { CheckCircle2 } from 'lucide-react';
import React from 'react';
import ChangeAvatar from './components/ChangeAvatar';

function ProfileCard({
  user,
  isEditing,
  loadUser,
  setShowSuccessModal,
  setTitle,
  setMessage,
  setIsEditing,
}: {
  user: any;
  isEditing: boolean;
  loadUser: () => Promise<void>;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="group bg-beehealth-body-main relative overflow-hidden rounded-2xl border border-gray-200 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="absolute -top-5 -right-5 h-32 w-32 rounded-full bg-linear-to-br from-green-100 to-emerald-50 opacity-50 blur-2xl"></div>

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
          <h2 className="text-center text-xl font-bold text-gray-900">Dr(a). {user?.fullName}</h2>
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5">
          <p className="text-sm font-medium text-green-700">
            {user?.role === 'doctor' && user?.specialty === 'weight' && 'Control de Peso'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
