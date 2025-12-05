'use client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { i18nConfig } from '@/i18n/config';
import en from '@/locales/en.json';
import ja from '@/locales/ja.json';
import vi from '@/locales/vi.json';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
  ja: { translation: ja },
};

export function initI18n() {
  if (!i18next.isInitialized) {
    i18next.use(initReactI18next).init({
      resources,
      // lng: i18nConfig.defaultLocale,
      fallbackLng: i18nConfig.defaultLocale,
      supportedLngs: i18nConfig.locales,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
      detection: {
        order: ['path', 'cookie', 'localStorage', 'navigator'],
      },
    });
  }
  return i18next;
}
