import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/routing';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
});

export const config = {
  // **هذا هو صمام الأمان**
  // قم بتطبيق هذا النظام فقط على الصفحة الرئيسية، والروابط التي تبدأ بـ /ar/ أو /en/
  matcher: ['/', '/(ar|en)/:path*']
};