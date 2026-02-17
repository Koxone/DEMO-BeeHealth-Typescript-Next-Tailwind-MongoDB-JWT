import type { ReactNode } from 'react';
import '@/presentation/ui/styles/globals.css';

import { AuthProvider } from '@/presentation/providers/AuthProvider';
import ReactQueryProvider from '@/presentation/providers/ReactQueryProvider';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-beehealth-body-main min-h-screen w-full">
        <AuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
