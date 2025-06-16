import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const t = await getTranslations('about');

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-topshield-navy mb-6">{t('page_title')}</h1>
      <p className="text-gray-700 leading-relaxed">{t('company_description')}</p>
    </div>
  );
}
