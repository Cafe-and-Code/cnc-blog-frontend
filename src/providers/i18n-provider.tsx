'use client';

import React from 'react';
import { I18nextProvider } from 'react-i18next';

import { I18nClient } from '@/components/I18nClient';

import { initI18n } from '@/plugins/i18n';

export function I18nProviders({ children }: { children: React.ReactNode }) {
  const i18n = initI18n();

  return (
    <I18nextProvider i18n={i18n}>
      <I18nClient>{children}</I18nClient>
    </I18nextProvider>
  );
}
