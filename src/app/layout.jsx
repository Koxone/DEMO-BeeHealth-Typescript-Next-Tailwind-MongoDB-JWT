import { cookies } from 'next/headers';
import './globals.css';
import jwt from 'jsonwebtoken';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

import Sidebar from '@/components/shared/nav/sidebar/SideBar';
import Header from '@/components/shared/nav/header/Header';
import ServerRoleGuard from '@/components/sections/auth/ServerRoleGuard';
import ReactQueryProvider from '@/lib/tanstack/ReactQueryProvider';

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

  /* Domain */
  metadataBase: new URL('https://beehealth.app'),

  /* Open Graph */
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

  /* Twitter */
  twitter: {
    card: 'summary',
    title: 'BeeHealth',
    description: 'Gestión de salud y nutrición desde tu dispositivo.',
    site: '@beehealth',
    images: ['/favicon-96x96.png'],
  },

  /* Icons */
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  /* Manifest */
  manifest: '/site.webmanifest',
};

export const viewport = {
  themeColor: '#0e1113',
};

export default function PublicLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-beehealth-body-main min-h-screen">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
