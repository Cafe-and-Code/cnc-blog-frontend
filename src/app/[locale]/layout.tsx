import type { Metadata } from 'next';
import { Lora } from 'next/font/google';

import '@/styles/globals.scss';
import '@/styles/_variable.scss';

import { I18nClient } from '@/components/I18nClient';

import MainLayout from '@/layouts/MainLayout';
import { AppProviders } from '@/providers/providers';

import { IRootLayoutProps } from '@/types/layout';
const inter = Lora({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'cnc-blog',
  description: 'cnc-blog',
};

export default function RootLayout({
  children,
  params,
}: Readonly<IRootLayoutProps>) {
  const { locale } = params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>
          <I18nClient locale={locale}>
            <MainLayout>{children}</MainLayout>
          </I18nClient>
        </AppProviders>
      </body>
    </html>
  );
}
