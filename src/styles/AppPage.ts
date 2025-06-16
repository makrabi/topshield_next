
/**
 * نوع موحَّد لصفحات الموقع (متوافقة مع Next.js 13+ App Router)
 */
export type AppPageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
};