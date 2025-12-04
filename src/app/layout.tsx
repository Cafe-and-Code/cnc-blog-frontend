import type { Metadata } from 'next';
import { Lora } from 'next/font/google';

import '@/styles/globals.scss';
import '@/styles/_variable.scss';

import { AppProviders } from '@/providers/providers';

import MainLayout from './layouts/MainLayout';

import { IRootLayoutProps } from '@/types/layout';
const inter = Lora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'cnc-blog',
  description: 'cnc-blog',
};

export default function RootLayout({ children }: Readonly<IRootLayoutProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <MainLayout>{children}</MainLayout>
        </AppProviders>
      </body>
    </html>
  );
}
