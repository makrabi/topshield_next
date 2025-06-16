// src/core/provider/Providers.tsx
'use client';

import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import type { AbstractIntlMessages } from 'next-intl'; // <-- الخطوة 1: إضافة الاستيراد

export interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages; // <-- الخطوة 2: تغيير النوع
}

export default function Providers({
  children,
  locale,
  messages
}: ProvidersProps) {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}