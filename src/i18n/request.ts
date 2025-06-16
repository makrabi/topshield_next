// src/i18n/request.ts

import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// تأكد من أن هذا المسار صحيح ويؤدي إلى ملفك الذي يحتوي على اللغات
import { locales } from './routing'; 

export default getRequestConfig(async ({ locale }) => {
  // التحقق من أن اللغة القادمة في الرابط هي لغة يدعمها الموقع
  if (!locales.includes(locale as any)) {
    notFound(); // إذا لم تكن مدعومة، اعرض صفحة 404
  }

  return {
    // تحميل ملف الترجمة المناسب للغة بشكل ديناميكي
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});