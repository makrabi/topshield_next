import { getTranslations } from 'next-intl/server';

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-topshield-navy mb-6">{t('page_title')}</h1>
      <p className="mb-4 text-gray-600">{t('description')}</p>

      <form className="space-y-4">
        <input type="text" placeholder={t('name')} className="w-full border p-2 rounded" />
        <input type="email" placeholder={t('email')} className="w-full border p-2 rounded" />
        <textarea placeholder={t('message')} className="w-full border p-2 rounded h-32" />
        <button type="submit" className="bg-topshield-navy text-white px-4 py-2 rounded">
          {t('send')}
        </button>
      </form>
    </div>
  );
}
