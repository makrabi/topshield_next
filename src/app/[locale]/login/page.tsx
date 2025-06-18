'use client';

import { useTranslations } from 'next-intl';
import LoginForm from './LoginForm'; // تأكد أن هذا المكون موجود لديك

type Props = {
  params: {
    locale: string;
  };
};

export default function LoginPage({ params: { locale } }: Props) {
  const t = useTranslations('LoginPage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <LoginForm locale={locale} />
    </div>
  );
}