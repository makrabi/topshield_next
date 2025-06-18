'use client';

import { PageProps } from 'next/types';
import { useTranslations } from 'next-intl';
import LoginForm from './LoginForm';

export default function LoginPage({ params }: PageProps<{ locale: string }>) {
  const { locale } = params;
  const t = useTranslations('LoginPage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <LoginForm locale={locale} />
    </div>
  );
}
