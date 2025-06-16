'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

export default function AccountPortalPage() {
  const t = useTranslations('Account');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ تم إصلاح الخطأ هنا باستخدام Optional Chaining
  useEffect(() => {
    if (searchParams?.get('mode') === 'signup') {
      setIsLogin(false);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isLogin && password !== confirmPassword) {
      setError(t('passwordMismatch'));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isLogin ? { email, password } : { name, email, password }
        ),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data?.message || t(isLogin ? 'loginError' : 'signupError'));
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError(t('serverError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-2">
        {isLogin ? t('title') : t('signupTitle')}
      </h1>
      <p className="text-gray-600 mb-6">
        {isLogin ? t('subtitle') : t('signupSubtitle')}
      </p>

      {error && (
        <div className="mb-4 text-red-600 text-sm font-medium">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <label className="block">
            <span className="text-sm font-medium">{t('nameLabel')}</span>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
            />
          </label>
        )}

        <label className="block">
          <span className="text-sm font-medium">{t('emailLabel')}</span>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('emailPlaceholder')}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">{t('passwordLabel')}</span>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {!isLogin && (
          <label className="block">
            <span className="text-sm font-medium">{t('confirmPasswordLabel')}</span>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        )}

        <Button
          type="submit"
          isLoading={loading}
          variant="primary"
          size="md"
          className="w-full"
        >
          {isLogin ? t('loginButton') : t('signupButton')}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-blue-600 hover:underline"
        >
          {isLogin ? t('signupButton') : t('loginNow')}
        </button>
      </div>
    </div>
  );
}