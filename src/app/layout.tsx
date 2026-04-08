import type { Metadata } from 'next';
import { Lora } from 'next/font/google';

import '@/styles/globals.scss';
import '@/styles/_variable.scss';

import MainLayout from '@/layouts/MainLayout';
import { AppProviders } from '@/providers/providers';

import { IRootLayoutProps } from '@/types/layout';
const inter = Lora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'cnc-blog',
  description: 'cnc-blog',
};

export default function RootLayout({ children }: Readonly<IRootLayoutProps>) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <MainLayout>{children}</MainLayout>
        </AppProviders>
      </body>
    </html>
  );
}
