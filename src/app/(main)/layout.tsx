'use client';

import '@/presentation/ui/styles/globals.css';

import Sidebar from '@/presentation/ui/pages/main/shared/nav/sidebar/SideBar';
import Header from '@/presentation/ui/pages/main/shared/nav/header/Header';
import ReactQueryProvider from '@/presentation/providers/ReactQueryProvider';
import MobileBottomBar from '@/presentation/ui/pages/main/shared/nav/bottom-bar/MobileBottomBar';

import { useAuth } from '@/presentation/hooks/auth';

export default function MainRootLayout({ children }) {
  const { currentUser } = useAuth();

  const role = currentUser?.role;
  const specialty = currentUser?.specialty;

  return (
    <div className="bg-beehealth-body-main grid h-screen w-full grid-rows-[90px_1fr] overflow-hidden">
      {/* Header */}
      <header className="h-fit w-full">
        <Header currentUser={currentUser} />
      </header>

      {/* Body */}
      <div className="grid h-full w-full grid-cols-[18rem_1fr] overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden h-full md:block">
          <Sidebar role={role} specialty={specialty} />
        </aside>

        {/* Main */}
        <main className="mx-auto h-full w-full overflow-hidden px-10 pt-4 pb-27">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </main>
      </div>

      {/* Mobile bottom bar */}
      <MobileBottomBar />
    </div>
  );
}
