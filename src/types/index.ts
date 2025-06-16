// src/types/index.ts

/**
 * نوع موحَّد لصفحات الموقع (متوافقة مع Next.js 13+ App Router)
 */
export type AppPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * نوع موحَّد للكومبوننتات التي تتلقى locale و queryParams
 */
export type AuthFormProps = {
  locale: string;
  queryParams?: { [key: string]: string | string[] | undefined };
};