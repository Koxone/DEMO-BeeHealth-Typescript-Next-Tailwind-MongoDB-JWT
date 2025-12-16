import LoginForm from '@/components/sections/auth/login/LoginForm';
import HomeHeader from '@/components/sections/home/components/HomeHeader';
import React from 'react';

function LoginPage() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] overflow-hidden">
      <HomeHeader />

      <LoginForm />
    </div>
  );
}

export default LoginPage;
