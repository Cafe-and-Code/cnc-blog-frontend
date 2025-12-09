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
      const path = pathname.split('/').slice(2).join('/');
      setCookie('locale', value, { path: '/' });
      router.replace(`/${value}/${path}`, { scroll: false });
    },
    [pathname, cookies.locale, router, setCookie],
  );

  return {
    changeLanguage,
    currentLocale: cookies.locale,
  };
}
