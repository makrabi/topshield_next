import { PageProps } from 'next/types';
import { useTranslations } from 'next-intl';
import LoginForm from './LoginForm';

// جعل المكون غير متزامن
export default async function LoginPage({ params }: PageProps<{ locale: string }>) {
  // استخراج المتغير 'locale' من الـ params باستخدام await
  const { locale } = await params;

  const t = useTranslations('LoginPage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <LoginForm locale={locale} />
    </div>
  );
}
