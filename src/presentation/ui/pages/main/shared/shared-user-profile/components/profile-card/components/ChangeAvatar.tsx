'use client';

import { Camera } from 'lucide-react';

// Enums and Types
import { CurrentUserFromAuthStoreType } from '@/presentation/store/authStore';

// Prop Types
interface ProfileCardProps {
  currentUser: CurrentUserFromAuthStoreType;
  isEditing: boolean;
}

function ChangeAvatar({ currentUser, isEditing }: ProfileCardProps) {
  // FullName constructor
  const fullName = currentUser?.name + ' ' + currentUser?.lastName;

  return (
    <div
      className={[
        'relative mb-6 flex h-50 w-50 items-center justify-center rounded-full',
        isEditing
          ? 'group border-beehealth-blue-primary-solid bg-beehealth-blue-primary-solid cursor-pointer border-10'
          : '',
      ].join(' ')}
    >
      {currentUser?.avatar ? (
        <img
          src={currentUser.avatar}
          alt="Profile"
          className={`${isEditing ? 'scale-100' : 'scale-90'} h-full w-full rounded-full object-cover`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
          <span className="text-3xl font-bold text-gray-500">{fullName.charAt(0)}</span>
        </div>
      )}

      {isEditing && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Camera className="h-6 w-6 text-white" />
        </div>
      )}

      <input type="file" accept="image/*" className="hidden" />
    </div>
  );
}

export default ChangeAvatar;
