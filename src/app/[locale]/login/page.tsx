// المسار: src/app/[locale]/login/page.tsx
'use client';

// بما أنه مكون عميل، نستخدم useTranslations
import { useTranslations } from 'next-intl';
import LoginForm from './LoginForm';

// 1. هذا هو التعريف الصحيح للـ props
type Props = {
  params: {
    locale: string;
  };
};

// 2. لاحظ أننا نتعامل مع params ككائن مباشر، وليس Promise
export default function LoginPage({ params: { locale } }: Props) {
  // 3. بما أنه "use client"، يمكننا استخدام hook الترجمة هنا
  const t = useTranslations('LoginPage');

  return (
    <div>
      {/* كمثال، يمكننا إضافة عنوان للصفحة من ملفات الترجمة */}
      <h1>{t('title')}</h1>

      {/* تمرير اللغة إلى مكون الفورم */}
      <LoginForm locale={locale} />
    </div>
  );
}