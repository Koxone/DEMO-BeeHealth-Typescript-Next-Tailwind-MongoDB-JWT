'use client';

import LoginForm from '@/components/sections/auth/login/LoginForm';
import HomeHeader from '@/components/sections/home/components/HomeHeader';
import { useState } from 'react';

function LoginPage() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] overflow-hidden">
      <HomeHeader setShowMenu={setShowMenu} showMenu={showMenu} />

      <LoginForm />
    </div>
  );
}

export default LoginPage;
