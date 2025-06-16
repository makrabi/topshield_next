// src/app/layout.tsx

// استيراد ملف التنسيقات العام
import './globals.css';

import React from 'react';
import { Tajawal, Manrope } from 'next/font/google';

// إعداد الخطوط لتطابق نظام التصميم في ملف الإعدادات
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal'
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading'
});

// معلومات الصفحة الوصفية (Metadata)
export const metadata = {
  title: 'TopShield - حجز موعد',
  description: 'صفحة حجز المواعيد لمنصة TopShield',
};

// مكون التخطيط الأساسي (Root Layout)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        // تطبيق الخطوط والألوان الأساسية من ملف globals.css
        className={`${tajawal.variable} ${manrope.variable} font-tajawal bg-topshield-bg-main text-topshield-text-main`}
      >
        {children}
      </body>
    </html>
  );
}