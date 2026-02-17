'use client';

import HomeHeader from '@/presentation/ui/pages/home/shared/HomeHeader';
import { useState } from 'react';
import AboutPage from '@/presentation/ui/pages/home/about/AboutPage';

export default function AboutViewRoute() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex w-full flex-1 flex-col">
      <HomeHeader about={false} contact={true} showMenu={showMenu} setShowMenu={setShowMenu} />

      <AboutPage />
    </div>
  );
}
