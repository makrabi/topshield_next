// src/app/[locale]/forgot-password/page.tsx

import { AppPageProps } from '@/types/AppPage';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export default async function ForgotPasswordPage({ params, searchParams }: AppPageProps) {
  const { locale } = await params;
  const queryParams = await searchParams;

  return <ForgotPasswordForm locale={locale} queryParams={queryParams} />;
}