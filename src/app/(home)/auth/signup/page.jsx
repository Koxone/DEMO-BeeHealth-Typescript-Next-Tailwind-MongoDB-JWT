import SignupForm from '@/components/sections/auth/signup/SignupForm';
import HomeHeader from '@/components/sections/home/components/HomeHeader';
import React from 'react';

function SignUpPage() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] overflow-hidden">
      <HomeHeader />
      <SignupForm />
    </div>
  );
}

export default SignUpPage;
