'use client';

import { useEffect } from 'react';

import { initI18n } from '@/plugins/i18n';

import { II18nClient } from '@/types/i18n';

const i18n = initI18n();

export function I18nClient({ children, locale }: II18nClient) {
  useEffect(() => {
    const savedLang = localStorage.getItem('locale');
    const finalLang = savedLang || locale;
    if (i18n.language !== finalLang) {
      i18n.changeLanguage(finalLang);
    }
    console.log(finalLang);

    localStorage.setItem('locale', finalLang);
  }, [locale]);

  return children;
}
