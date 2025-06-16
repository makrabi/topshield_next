'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';

type IntlProviderProps = {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
};

/**
 * IntlProviderWrapper: يغلف المحتوى بدعم الترجمة عبر next-intl
 */
export default function IntlProviderWrapper({
  children,
  locale,
  messages,
}: IntlProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
