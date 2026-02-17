'use client';

import { useState } from 'react';

import SignupPage from '@/presentation/ui/pages/home/auth/signup/SignupPage';
import HomeHeader from '@/presentation/ui/pages/home/shared/HomeHeader';

export default function SignUpViewRoute() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex w-full flex-1 flex-col">
      <HomeHeader about contact showMenu={showMenu} setShowMenu={setShowMenu} />

      <div className="flex w-full flex-1">
        <SignupPage />
      </div>
    </div>
  );
}
