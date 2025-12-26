'use client';

import SignupForm from '@/components/sections/auth/signup/SignupForm';
import HomeHeader from '@/components/sections/home/components/HomeHeader';
import { useState } from 'react';

function SignUpPage() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div>
      <HomeHeader about contact showMenu={showMenu} setShowMenu={setShowMenu} />
      <SignupForm />
    </div>
  );
}

export default SignUpPage;
