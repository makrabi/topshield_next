// ✅ الكود الصحيح والنهائي لملف: src/app/[locale]/smart-warranty/layout.tsx

import React from 'react';
import type { Metadata } from 'next';

// لا نستدعي globals.css هنا لأنه موروث من الـ layout الجذري
// لا نستخدم <html> أو <body> هنا لأنهما موجودان في الـ layout الجذري

export const metadata: Metadata = {
  title: 'تسجيل ضمان ذكي | TOPSHIELD',
  description: 'نظام تسجيل الضمان الذكي لخدمات وحماية السيارات من توبشيلد.',
};

export default function SmartWarrantyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // هذا المكون بسيط جدًا، وظيفته فقط هي عرض المحتوى الذي يأتيه
  // يمكن لاحقًا إضافة عناصر هنا لتكون مشتركة بين صفحات هذا القسم فقط
  return <>{children}</>;
}