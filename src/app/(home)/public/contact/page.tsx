'use client';

import HomeHeader from '@/presentation/ui/pages/home/shared/HomeHeader';
import { useState } from 'react';
import ContactPage from '@/presentation/ui/pages/home/contact/ContactPage';

export default function ContactViewRoute() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex w-full flex-1 flex-col">
      <HomeHeader about={true} contact={false} showMenu={showMenu} setShowMenu={setShowMenu} />

      <ContactPage />
    </div>
  );
}
