// src/app/layout.tsx

import './globals.css';
import React from 'react';
import { Tajawal, Manrope } from 'next/font/google';

// استيراد مكون الترويسة
import Header from '@/components/layout/Header';

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

// تم تحديث البيانات الوصفية (metadata) هنا
export const metadata = {
  title: {
    default: 'TOPSHIELD | الشركة الأمريكية الرائدة في تصنيع أفلام العازل الحراري وأفلام حماية الطلاء',
    template: '%s | TOPSHIELD',
  },
  description: {
    default: 'TOPSHIELD | The Leading American Company in Manufacturing Window Films and Paint Protection',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${tajawal.variable} ${manrope.variable} font-tajawal bg-topshield-bg-main text-topshield-text-main`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}