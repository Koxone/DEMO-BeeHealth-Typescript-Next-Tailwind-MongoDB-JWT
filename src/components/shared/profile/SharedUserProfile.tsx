'use client';

import { useState } from 'react';

import EditProfileButton from './components/EditProfileButton';
import ProfileCard from './components/profile-card/ProfileCard';
import SecuritySection from './components/SecuritySection';

// Custom Hooks
import { useChangeUserEmail } from '@/@hooks/users/useChangeEmail';
import { useChangeUserPassword } from '@/@hooks/users/useChangePassword';
import { useChangeUserPhone } from '@/@hooks/users/useChangePhone';
import { useGetCurrentUser } from '@/@hooks/users/useGetCurrentUser';

// Feedback Components
import SuccessModal from '@/components/shared/feedback/SuccessModal';
import LoadingState from '@/components/shared/feedback/LoadingState';
import ChangePasswordModal from './components/ChangePasswordModal';

export default function SharedUserProfile() {
  // Get current user
  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    refetch: refetchCurrentUser,
  } = useGetCurrentUser();

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

  // Change Password Modal States
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Local Editing States
  const [isEditing, setIsEditing] = useState(false);

  // Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  // Change Phone Custom Hook
  const { mutate: changePhone } = useChangeUserPhone();

  if (!currentUser || isPending || isLoadingCurrentUser) {
    return <LoadingState />;
  }

  return (
    <div className="mx-auto mb-20 flex max-w-5xl flex-col gap-4 md:mb-0">
      {/* Header and Edit Profile Button */}
      <EditProfileButton isEditing={isEditing} setIsEditing={setIsEditing} />

      {/* Profile card */}
      <ProfileCard
        user={currentUser}
        isEditing={isEditing}
        refetchCurrentUser={refetchCurrentUser}
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
          userId={currentUser?.id}
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
