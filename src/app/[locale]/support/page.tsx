import { getTranslations } from 'next-intl/server';

export default async function SupportPage() {
  const t = await getTranslations('support');

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-topshield-navy mb-6">
        {t('page_title')}
      </h1>
      <p className="text-gray-700">{t('description')}</p>
    </div>
  );
}
