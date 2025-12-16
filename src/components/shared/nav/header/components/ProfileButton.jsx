'use client';

import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

function ProfileButton({ role, currentUser }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/${role}/profile`)}
      className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95"
    >
      {currentUser?.avatar ? (
        <img
          src={currentUser?.avatar}
          alt="Profile"
          className="h-full w-full rounded-lg object-cover"
        />
      ) : (
        <User className="h-6 w-6 text-white" />
      )}
      <div className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
    </button>
  );
}

export default ProfileButton;
