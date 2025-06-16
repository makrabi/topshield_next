'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

type LanguageOption = {
  code: string;
  label: string;
};

const LANGUAGES: LanguageOption[] = [
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '中文' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ur', label: 'اردو' },
  { code: 'ru', label: 'Русский' },
  { code: 'uk', label: 'Українська' },
  { code: 'it', label: 'Italiano' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = useMemo(() => {
    const segments = pathname?.split('/') || [];
    return segments[1] || 'en'; // fallback to 'en' if not found
  }, [pathname]);

  const handleLanguageChange = (lang: string) => {
    if (lang === currentLocale) return;

    const segments = pathname?.split('/') || [];
    segments[1] = lang;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="text-sm p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      aria-label="Select Language"
    >
      {LANGUAGES.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
