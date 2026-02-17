'use client';

import LoginPage from '@/presentation/ui/pages/home/auth/login/LoginPage';
import HomeHeader from '@/presentation/ui/pages/home/shared/HomeHeader';
import { useState } from 'react';

export default function LoginViewRoute() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex w-full flex-1 flex-col">
      <HomeHeader setShowMenu={setShowMenu} showMenu={showMenu} />

      <div className="flex w-full flex-1">
        <LoginPage />
      </div>
    </div>
  );
}
