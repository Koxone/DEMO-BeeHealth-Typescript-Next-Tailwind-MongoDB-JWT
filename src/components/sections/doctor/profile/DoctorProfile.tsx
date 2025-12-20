'use client';

import { useEffect, useState } from 'react';

import WelcomeCard from './components/WelcomeCard';
import ProfileCard from './components/profile-card/ProfileCard';
import PersonalInfoCard from './components/PersonalInfoCard';
import SecuritySection from './components/SecuritySection';

// Custom Hooks
import { useChangeAvatar } from '@/hooks/users/useChangeAvatar';
import { useChangeUserEmail } from '@/hooks/users/useChangeEmail';
import { useChangeUserPassword } from '@/hooks/users/useChangePassword';

// Zustand Store
import useAuthStore from '@/zustand/useAuthStore';

// Feedback Components
import SuccessModal from '@/components/shared/feedback/SuccessModal';
import LoadingState from '@/components/shared/feedback/LoadingState';
import ChangePasswordModal from './components/ChangePasswordModal';

export default function DoctorProfile() {
  // Zustand Auth Store
  const { user, loadUser } = useAuthStore();

  // Change Email Custom Hook
  const { mutate: changeEmail, isPending } = useChangeUserEmail();

  // Change Password Custom Hook
  const { mutate: changePassword, isPending: isChangingPassword } = useChangeUserPassword();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Local Editing States
  const [isEditing, setIsEditing] = useState(false);

  // Edit Avatar Custom Hook
  const { mutate: updateAvatar } = useChangeAvatar();

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
    <div className="mx-auto h-full space-y-6 overflow-y-auto">
      {/* Header and Edit Profile Button */}
      <WelcomeCard isEditing={isEditing} setIsEditing={setIsEditing} />

      <div className="grid grid-cols-1 gap-6">
        {/* Profile card */}
        <ProfileCard
          user={user}
          isEditing={isEditing}
          loadUser={loadUser}
          setShowSuccessModal={setShowSuccessModal}
          setTitle={setTitle}
          setMessage={setMessage}
          setIsEditing={setIsEditing}
        />

        {/* Personal info */}
        <PersonalInfoCard
          user={user}
          isEditing={isEditing}
          changeEmail={changeEmail}
          setShowSuccessModal={setShowSuccessModal}
          setTitle={setTitle}
          setMessage={setMessage}
          setIsEditing={setIsEditing}
          loadUser={loadUser}
        />
      </div>

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
          onClose={() => setShowPasswordModal(false)}
          changePassword={changePassword}
        />
      )}
    </div>
  );
}
