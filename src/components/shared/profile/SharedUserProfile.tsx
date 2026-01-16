'use client';

import { useEffect, useState } from 'react';

import EditProfileButton from './components/EditProfileButton';
import ProfileCard from './components/profile-card/ProfileCard';
import SecuritySection from './components/SecuritySection';

// Custom Hooks
import { useChangeUserEmail } from '@/@hooks/users/useChangeEmail';
import { useChangeUserPassword } from '@/@hooks/users/useChangePassword';
import { useChangeUserPhone } from '@/@hooks/users/useChangePhone';

// Zustand Store
import useAuthStore from '@/zustand/useAuthStore';

// Feedback Components
import SuccessModal from '@/components/shared/feedback/SuccessModal';
import LoadingState from '@/components/shared/feedback/LoadingState';
import ChangePasswordModal from './components/ChangePasswordModal';

export default function SharedUserProfile() {
  // Zustand Auth Store
  const { user, loadUser } = useAuthStore();

  // Change Email Custom Hook
  const { mutate: changeEmail, isPending } = useChangeUserEmail();

  // Change Password Custom Hook
  const {
    mutate: changePassword,
    isPending: isChangingPassword,
    isError: isErrorChangePassword,
    isSuccess: isSuccessChangePassword,
    reset,
    error,
  } = useChangeUserPassword();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Local Editing States
  const [isEditing, setIsEditing] = useState(false);

  // Change Phone Custom Hook
  const { mutate: changePhone } = useChangeUserPhone();

  // Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  // Loading or Error States
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (!user || isPending) {
    return <LoadingState />;
  }

  return (
    <div className="mx-auto mb-20 flex max-w-5xl flex-col gap-4 md:mb-0">
      {/* Header and Edit Profile Button */}
      <EditProfileButton isEditing={isEditing} setIsEditing={setIsEditing} />

      {/* Profile card */}
      <ProfileCard
        user={user}
        isEditing={isEditing}
        loadUser={loadUser}
        setShowSuccessModal={setShowSuccessModal}
        changeEmail={changeEmail}
        changePhone={changePhone}
        setTitle={setTitle}
        setMessage={setMessage}
        setIsEditing={setIsEditing}
      />

      {/* Security Section */}
      <SecuritySection setShowPasswordModal={setShowPasswordModal} />

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          setShowSuccessModal={setShowSuccessModal}
          showSuccessModal={showSuccessModal}
          message={message}
          title={title}
        />
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <ChangePasswordModal
          userId={user?.id}
          isSubmitting={isChangingPassword}
          isError={isErrorChangePassword}
          isSuccess={isSuccessChangePassword}
          error={error}
          reset={reset}
          onClose={() => setShowPasswordModal(false)}
          changePassword={changePassword}
          setTitle={setTitle}
          setMessage={setMessage}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
    </div>
  );
}
