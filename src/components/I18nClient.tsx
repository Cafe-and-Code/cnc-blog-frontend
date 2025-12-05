'use client';

import { useEffect } from 'react';

import { initI18n } from '@/plugins/i18n';

import { II18nClient } from '@/types/i18n';

const i18n = initI18n();

export function I18nClient({ children, locale }: II18nClient) {
  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
  }, [locale]);

  return children;
}
