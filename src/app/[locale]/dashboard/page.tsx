// src/app/[locale]/dashboard/page.tsx

import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const tCommon = useTranslations('common');
  const tDashboard = useTranslations('dashboard');

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{tDashboard('title')}</h1>
      <p>{tDashboard('subtitle')}</p>

      <section>
        <h2>{tDashboard('sections.profile.title')}</h2>
        <p>{tDashboard('sections.profile.description')}</p>
        <button>{tDashboard('buttons.update_profile')}</button>
      </section>

      <section>
        <h2>{tDashboard('sections.services.title')}</h2>
        <p>{tDashboard('sections.services.description')}</p>
        <button>{tDashboard('buttons.manage_services')}</button>
      </section>

      <section>
        <h2>{tDashboard('sections.settings.title')}</h2>
        <p>{tDashboard('sections.settings.description')}</p>
        <button>{tDashboard('buttons.save_settings')}</button>
      </section>
    </main>
  );
}