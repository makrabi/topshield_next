// src/components/localized-link.tsx

import Link from 'next/link';
import { ReactNode } from 'react';

type LocalizedLinkProps = {
  href: string;
  children: ReactNode;
  locale: string;
};

export default function LocalizedLink({ href, children, locale }: LocalizedLinkProps) {
  const localizedHref = `/${locale}${href.startsWith('/') ? href : `/${href}`}`;

  return (
    <Link href={localizedHref}>
      {children}
    </Link>
  );
}