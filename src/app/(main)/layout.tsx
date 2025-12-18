import '../globals.css';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

import Sidebar from '@/components/shared/nav/sidebar/SideBar';
import Header from '@/components/shared/nav/header/Header';
import ServerRoleGuard from '@/components/sections/auth/ServerRoleGuard';
import ReactQueryProvider from '@/lib/tanstack/ReactQueryProvider';
import MobileBottomBar from '@/components/shared/nav/bottom-bar/MobileBottomBar';

export const runtime = 'nodejs';

export const metadata = {
  title: 'BeeHealth',
  description:
    'Plataforma de gestión de salud y nutrición con herramientas modernas para el registro, seguimiento y control del bienestar.',
  applicationName: 'BeeHealth',
  generator: 'Next.js',
  keywords: [
    'salud',
    'nutrición',
    'bienestar',
    'seguimiento médico',
    'control nutricional',
    'app de salud',
    'BeeHealth',
  ],

  metadataBase: new URL('https://beehealth.app'),

  openGraph: {
    title: 'BeeHealth',
    description: 'Gestión avanzada de salud y nutrición en una sola plataforma.',
    url: 'https://beehealth.app',
    siteName: 'BeeHealth',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/apple-touch-icon.png',
        width: 180,
        height: 180,
        alt: 'BeeHealth Logo',
      },
    ],
  },

  twitter: {
    card: 'summary',
    title: 'BeeHealth',
    description: 'Gestión de salud y nutrición desde tu dispositivo.',
    site: '@beehealth',
    images: ['/favicon-96x96.png'],
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  manifest: '/site.webmanifest',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f3ed' },
    { media: '(prefers-color-scheme: dark)', color: '#f8f3ed' },
  ],
};

export default async function MainRootLayout({ children }) {
  // Get current User info
  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  const specialty = currentUser?.specialty;

  return (
    <ServerRoleGuard allowedRoles={['doctor', 'employee', 'patient']}>
      <div className="bg-beehealth-body-main h-screen overflow-hidden">
        <header className="fixed top-0 right-0 left-0 z-50 h-16">
          <Header />
        </header>

        <div className="flex h-screen pt-16">
          <aside className="top-21 bottom-0 left-0 hidden w-64 md:fixed md:flex">
            <Sidebar role={role} specialty={specialty} />
          </aside>

          <MobileBottomBar />

          <main className="flex-1 overflow-y-auto p-4 md:ml-64 md:p-0 md:py-10 md:pr-6 md:pl-14">
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </main>
        </div>
      </div>
    </ServerRoleGuard>
  );
}
