'use client';

import { useState } from 'react';

import SharedEditProfileButton from './components/SharedEditProfileButton';
import ProfileCard from './components/profile-card/SharedProfileCard';
import SharedSecuritySection from './components/SharedSecuritySection';

// Custom Hooks
import { useAuth } from '@/presentation/hooks/auth';

// Feedback Components
import SuccessModal from '../modals/SuccessModal';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import LoadingState from '../feedback/LoadingState';

export default function SharedUserProfilePage() {
  // Get Current User Data from Custom Hook
  const { currentUser, refreshSession, isLoading } = useAuth();

  // Change Password Modal States
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Local Editing States
  const [isEditing, setIsEditing] = useState(false);

  // Success Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  // Success Modal Handler
  const handleSuccessModal = (title: string, message: string) => {
    setTitle(title);
    setMessage(message);
    setShowSuccessModal(true);
    refreshSession();

    setTimeout(() => {
      setShowSuccessModal(false);
      setTitle('');
      setMessage('');
    }, 1000);
  };

  // Loading State
  if (isLoading || !currentUser) {
    return <LoadingState />;
  }

  return (
    <div className="mx-auto grid h-full max-w-7xl items-center">
      {/* Header and Edit Profile Button */}
      <SharedEditProfileButton isEditing={isEditing} setIsEditing={setIsEditing} />

      {/* Profile card */}
      <ProfileCard
        currentUser={currentUser}
        isEditing={isEditing}
        handleSuccessModal={handleSuccessModal}
      />

      {/* Security Section */}
      <SharedSecuritySection setShowPasswordModal={setShowPasswordModal} />

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
          currentUser={currentUser}
          setShowPasswordModal={setShowPasswordModal}
          handleSuccessModal={handleSuccessModal}
        />
      )}
    </div>
  );
}
