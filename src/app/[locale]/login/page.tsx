'use client'; 

import { useTranslations } from 'next-intl';
import LoginForm from './LoginForm';

// تعريف Props صحيح للمكون العميل (params هو كائن)
type Props = {
  params: {
    locale: string;
  };
};

// الدالة لا تحتاج أن تكون async ولا تحتاج await لـ params
export default function LoginPage({ params: { locale } }: Props) {
  const t = useTranslations('LoginPage'); // استخدام hook الترجمة هنا

  return (
    <div>
      <h1>{t('title')}</h1>
      <LoginForm locale={locale} />
    </div>
  );
}
