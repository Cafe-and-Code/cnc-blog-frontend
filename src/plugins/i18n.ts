import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import ja from '@/locales/ja.json';
import vi from '@/locales/vi.json';

let initialized = false;

const resources = {
  en: { translation: en },
  vi: { translation: vi },
  ja: { translation: ja },
};

export function initI18n() {
  if (!initialized) {
    i18next.use(initReactI18next).init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
      detection: {
        order: ['cookie', 'localStorage', 'navigator'],
      },
    });
    initialized = true;
  }
  return i18next;
}
