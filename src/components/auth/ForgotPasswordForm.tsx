// src/components/auth/ForgotPasswordForm.tsx

'use client'; // ✅ إضافة هذا السطر في بداية الملف

import React, { useState } from 'react';

// ✅ تعريف النوع الصحيح للخصائص
type ForgotPasswordFormProps = {
  locale: string;
  queryParams?: { [key: string]: string | string[] | undefined };
};

export default function ForgotPasswordForm({ locale, queryParams }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ✅ استخدام queryParams (مثلاً: token, redirect, إلخ)
  React.useEffect(() => {
    if (queryParams?.token) {
      console.log('Token:', queryParams.token); // يمكنك استخدامه لتفعيل الحساب
    }
  }, [queryParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    // ✅ التحقق من البريد الإلكتروني
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('يرجى إدخال بريد إلكتروني صحيح.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'فشل إرسال طلب استعادة كلمة المرور.');
      }

      setSuccess('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.');
      setEmail('');
    } catch (err: any) {
      console.error('Error sending forgot password request:', err);
      setError(err.message || 'حدث خطأ غير متوقع.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">استعادة كلمة المرور</h2>
        <p className="mb-6 text-gray-600 text-center">
          أدخل البريد الإلكتروني المرتبط بحسابك، وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.
        </p>

        {/* نموذج استعادة كلمة المرور */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@example.com"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md transition ${
              isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? 'جاري الإرسال...' : 'إعادة تعيين كلمة المرور'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          تذكرت كلمة المرور؟{' '}
          <a
            href={`/${locale}/login`}
            className="text-blue-600 hover:underline"
            aria-label="العودة إلى صفحة تسجيل الدخول"
          >
            سجل الدخول
          </a>
        </p>
      </div>
    </div>
  );
}