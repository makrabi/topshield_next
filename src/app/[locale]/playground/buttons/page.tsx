'use client';

import Button from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

export default function ButtonsDemo() {
  const t = useTranslations('Demo');
  const { theme, setTheme } = useTheme();

  const handleClick = () => alert(t('clicked'));

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-gray-100 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 dark:text-white shadow-lg rounded-lg p-8 space-y-6 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('title')}</h1>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="border rounded p-1 text-sm dark:bg-zinc-700"
          >
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="system">🖥 System</option>
          </select>
        </div>

        <Button variant="primary" size="md" onClick={handleClick}>
          {t('create')}
        </Button>

        <Button variant="outline" size="sm" isLoading>
          {t('saving')}
        </Button>

        <Button variant="secondary" size="lg" onClick={() => alert(t('edit'))}>
          {t('edit')}
        </Button>

        <Button variant="danger" size="md" onClick={() => alert(t('deleted'))}>
          {t('delete')}
        </Button>

        <Button variant="primary" size="md" disabled>
          {t('disabled')}
        </Button>
      </div>
    </div>
  );
}
