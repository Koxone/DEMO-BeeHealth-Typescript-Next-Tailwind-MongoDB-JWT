'use client';

import { Camera } from 'lucide-react';
import { useRef } from 'react';
import { useChangeAvatar } from '@/hooks/users/useChangeAvatar';
import { useVercelBlobUpload } from '@/hooks/upload/useVercelBlobUpload';

function ChangeAvatar({
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
          await loadUser();
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
      <img
        src={user?.avatar}
        alt="Profile"
        className={`${isEditing ? 'scale-100' : 'scale-90'} h-full w-full rounded-full object-cover`}
      />

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
