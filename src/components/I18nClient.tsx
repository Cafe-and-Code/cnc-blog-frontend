'use client';

import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { initI18n } from '@/plugins/i18n';

import { II18nClient } from '@/types/i18n';

const i18n = initI18n();

export function I18nClient({ children }: { children: React.ReactNode }) {
  const [cookies] = useCookies(['locale']);
  useEffect(() => {
    if (i18n.language !== cookies.locale) {
      i18n.changeLanguage(cookies.locale);
    }
  }, [cookies.locale]);

  return children;
}
