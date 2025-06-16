// src/app/[locale]/layout.tsx

// ✅ تم تعديل هذا السطر ليشير إلى الملف الصحيح
import '../globals.css';

import type { Metadata } from 'next';
import { getMessages, getTranslations } from 'next-intl/server';
import React from 'react';

import { Locale, locales as appLocales } from '@/i18n/routing';
import { Tajawal, Manrope } from 'next/font/google';
import Providers from '@/core/provider/Providers';

/* ✅ إعداد الخطوط */
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-base'
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display'
});

/* ✅ النوع الصحيح في Next.js 15: params عبارة عن Promise */
type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

/* ✅ مكون layout يجب أن يكون async */
export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${tajawal.variable} ${manrope.variable} font-sans bg-topshield-background-light text-topshield-text-dark`}
      >
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}

/* ✅ ثابتة لإنشاء الصفحات */
export function generateStaticParams(): { locale: Locale }[] {
  return appLocales.map((locale) => ({ locale }));
}

/* ✅ metadata باستخدام params كـ Promise */
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  try {
    const t = await getTranslations({ locale, namespace: 'LayoutMetadata' });

    return {
      title: t('pageTitle'),
      description: t('pageDescription')
    };
  } catch (err) {
    console.error(`[Metadata Error] locale ${locale}:`, err);

    return {
      title: 'Error',
      description: 'Could not load metadata.'
    };
  }
}