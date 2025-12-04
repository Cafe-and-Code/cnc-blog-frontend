'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/store/auth.store';

import { I18nProviders } from '@/providers/i18n-provider';
import { ThemeProvider } from '@/providers/theme-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <I18nProviders>{children}</I18nProviders>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
