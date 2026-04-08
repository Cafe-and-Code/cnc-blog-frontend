'use client';

import { useCallback } from 'react';
import { useCookies } from 'react-cookie';

export function useLocale() {
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
