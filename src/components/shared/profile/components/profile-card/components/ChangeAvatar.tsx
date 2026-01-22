'use client';

import { Camera } from 'lucide-react';
import { useRef } from 'react';
import { useChangeAvatar } from '@/@hooks/users/useChangeAvatar';
import { useVercelBlobUpload } from '@/@hooks/upload/useVercelBlobUpload';

// Types
import { CurrentUserData } from '@/@types/user/user.types';

function ChangeAvatar({
  user,
  isEditing,
  refetchCurrentUser,
  setShowSuccessModal,
  setTitle,
  setMessage,
  setIsEditing,
}: {
  user: CurrentUserData;
  isEditing: boolean;
  refetchCurrentUser: () => void;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Hooks
  const { mutate: updateAvatar } = useChangeAvatar();
  const { uploadFile, loading } = useVercelBlobUpload();

  // Handlers
  const handleClick = () => {
    if (!isEditing || loading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadFile(file, 'avatars');
    if (!url) return;

    updateAvatar(
      { userId: user.id, avatar: url },
      {
        onSuccess: async () => {
          await refetchCurrentUser();
          setTitle('¡Éxito!');
          setMessage('Avatar actualizado con éxito');
          setShowSuccessModal(true);
          setIsEditing(false);

          setTimeout(() => {
            setShowSuccessModal(false);
            setTitle('');
            setMessage('');
          }, 1000);
        },
      }
    );
  };

  return (
    <div
      onClick={handleClick}
      className={[
        'relative mb-6 flex h-50 w-50 items-center justify-center rounded-full',
        isEditing
          ? 'group border-beehealth-blue-primary-solid bg-beehealth-blue-primary-solid cursor-pointer border-10'
          : '',
      ].join(' ')}
    >
      {user?.avatar ? (
        <img
          src={user?.avatar}
          alt="Profile"
          className={`${isEditing ? 'scale-100' : 'scale-90'} h-full w-full rounded-full object-cover`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
          <span className="text-3xl font-bold text-gray-500">{user?.fullName?.charAt(0)}</span>
        </div>
      )}

      {isEditing && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <Camera className="h-6 w-6 text-white" />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default ChangeAvatar;
