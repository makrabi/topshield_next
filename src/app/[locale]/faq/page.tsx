import { getTranslations } from 'next-intl/server';

export default async function FAQPage() {
  const t = await getTranslations('faq');

  const faqs = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
  ];

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-topshield-navy mb-6">
        {t('page_title')}
      </h1>
      <ul className="space-y-4">
        {faqs.map((faq, index) => (
          <li key={index} className="bg-white p-4 rounded shadow">
            <strong className="block text-lg">{faq.question}</strong>
            <span className="text-gray-600">{faq.answer}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
