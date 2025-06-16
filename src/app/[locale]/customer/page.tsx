// =================================================================
// src/app/[locale]/customer/page.tsx
// =================================================================

import CustomerDashboard from '@/components/account/CustomerDashboard';

// Next 15 Page Props: كلا الحقلين أصبحا Promise
type CustomerPageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CustomerDashboardPage({
  params,
}: CustomerPageProps) {
  // نفكّ الـ Promise لنحصل على القيمة الفعلية
  const { locale } = await params;

  return <CustomerDashboard locale={locale} />;
}
