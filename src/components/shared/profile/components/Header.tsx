'use client';

import { Edit2, Save, Camera } from 'lucide-react';
import { useRef } from 'react';
import { useChangeAvatar } from '@/hooks/users/useChangeAvatar';
import { useVercelBlobUpload } from '@/hooks/upload/useVercelBlobUpload';

function Header({ currentUser, isEditing, setIsEditing, setShowSuccessModal }) {
  // Refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Hooks
  const { mutate: updateAvatar } = useChangeAvatar();
  const { uploadFile, loading: isUploading } = useVercelBlobUpload();

  // Handlers
  const handleAvatarClick = () => {
    if (!isEditing) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Upload
    const url = await uploadFile(file, 'avatars');
    if (!url) return;

    // Save avatar
    updateAvatar({
      userId: currentUser.id,
      avatar: url,
    });
    // Reload user data

    // Show success modal
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 1000);
  };

  return (
    <div className="bg-beehealth-blue-primary-solid relative overflow-hidden rounded-2xl p-8 shadow-xl">
      <div className="bg-beehealth-body-main/10 absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl" />
      <div className="bg-beehealth-body-main/10 absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl" />

      <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div
            onClick={handleAvatarClick}
            className={[
              'mobile relative flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg ring-4 ring-white/30 backdrop-blur-sm',
              'bg-beehealth-body-main/20',
              isEditing ? 'group cursor-pointer' : '',
            ].join(' ')}
          >
            <img
              src={currentUser?.avatar}
              alt="Profile"
              className="h-full w-full rounded-2xl object-cover"
            />

            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
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

          <div>
            <h1 className="mb-1 text-3xl font-bold text-white md:text-4xl">
              Mi Perfil Profesional
            </h1>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          disabled={isUploading}
          className="group bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-60"
        >
          {isEditing ? (
            <>
              <Save className="h-5 w-5 transition-transform group-hover:scale-110" />
              Guardar Cambios
            </>
          ) : (
            <>
              <Edit2 className="h-5 w-5 transition-transform group-hover:scale-110" />
              Editar Perfil
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Header;
