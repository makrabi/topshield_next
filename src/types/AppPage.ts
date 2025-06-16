// src/types/AppPage.ts

/**
 * نوع موحَّد لصفحات الموقع (متوافقة مع Next.js 13+ App Router)
 */
export type AppPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * نوع موحَّد للـ Layout
 */
export type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};