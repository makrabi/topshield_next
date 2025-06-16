// app/tint-simulator/layout.tsx
import type { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'TOPSHIELD - متجر التظليل الرائد',
  description: 'محاكي تظليل السيارات من توب شيلد',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css" />
      </Head>
      <body>{children}</body>
    </html>
  );
}