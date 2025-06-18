// المسار: src/app/[locale]/layout.tsx
import '../globals.css';
import type { Metadata } from 'next';
import { getMessages, getTranslations } from 'next-intl/server';
import React from 'react';
import { Locale, locales as appLocales } from '@/i18n/routing';
import { Tajawal, Manrope } from 'next/font/google';
import Providers from '@/core/provider/Providers';

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

// ✅ تم تعديل Props: params هو كائن مباشر
type Props = {
  children: React.ReactNode;
  params: { locale: Locale }; // لا يوجد Promise هنا
};

// ✅ الدالة async ولكنها تستقبل params مباشرة
export default async function LocaleLayout({ children, params: { locale } }: Props) {
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

export function generateStaticParams(): { locale: Locale }[] {
  return appLocales.map((locale) => ({ locale }));
}

// ✅ تم تعديل metadata: params هو كائن مباشر
export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
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