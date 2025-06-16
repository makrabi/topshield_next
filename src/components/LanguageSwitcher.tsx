// src/components/LanguageSwitcher.tsx

'use client';

import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const { locales, asPath } = useRouter();

  return (
    <div>
      {locales?.map((locale) => (
        <Link
          key={locale}
          href={asPath}
          locale={locale}
          className="mx-2 p-2 hover:underline"
          onClick={() => window.location.reload()}
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}