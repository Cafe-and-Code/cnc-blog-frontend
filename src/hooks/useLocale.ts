'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

export function useLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const [cookies, setCookie] = useCookies(['locale']);

  const changeLanguage = useCallback(
    (value: string) => {
      if (value === cookies.locale) return;
      setCookie('locale', value, { path: '/' });
    },
    [cookies.locale, setCookie],
  );

  return {
    changeLanguage,
    currentLocale: cookies.locale,
  };
}
