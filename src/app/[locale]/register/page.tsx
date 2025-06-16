// src/app/[locale]/register/page.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

export default function RegisterPage() {
  const router = useRouter();
  const params = useParams(); // ✅ استخدام useParams للحصول على locale
  const { locale } = params as { locale: string }; // ✅ Type Assertion لأن TypeScript لا يعرف نوع params

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!firstName || !lastName || !invoiceNumber || !mobileNumber || !email || !password || !confirmPassword) {
      setError('يرجى ملء جميع الحقول المميزة بنجمة (*).');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين!');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('يجب أن تكون كلمة المرور 6 أحرف على الأقل.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          mobileNumber,
          invoiceNumber,
          email,
          password,
          name: `${firstName} ${lastName}`.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'فشل إنشاء الحساب. الرجاء المحاولة مرة أخرى.');
      }

      // ✅ النجاح: توجيه المستخدم إلى صفحة تسجيل الدخول
      router.push(`/${locale}/login`);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-topshield-background-light to-slate-200 p-4 font-tajawal">
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="w-full max-w-lg bg-topshield-white rounded-3xl shadow-topshield-xl p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <Link href={`/${locale}/`} legacyBehavior>
            <a className="inline-block mb-6">
              <Image src="/images/categories/topshield_logo.png" alt="TOPSHIELD Logo" width={200} height={65} />
            </a>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-topshield-primary-navy">إنشاء حساب جديد</h1>
          <p className="text-topshield-text-medium mt-2">أدخل بياناتك لإنشاء حسابك في بوابة TOPSHIELD</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md flex items-center gap-3"
            role="alert"
          >
            <FiAlertCircle className="text-xl" />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-topshield-text-dark text-right mb-1.5">
              الاسم الأول <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                <FiUser className="text-topshield-text-light" />
              </span>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                className="appearance-none block w-full pr-10 pl-3 py-3.5 border border-topshield-border-subtle rounded-xl shadow-sm placeholder-topshield-text-light focus:outline-none focus:ring-2 focus:ring-topshield-accent-gold focus:border-topshield-accent-gold sm:text-sm transition-colors"
                placeholder="أحمد"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-topshield-text-dark text-right mb-1.5">
              الاسم الأخير <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                <FiUser className="text-topshield-text-light" />
              </span>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                className="appearance-none block w-full pr-10 pl-3 py-3.5 border border-topshield-border-subtle rounded-xl shadow-sm placeholder-topshield-text-light focus:outline-none focus:ring-2 focus:ring-topshield-accent-gold focus:border-topshield-accent-gold sm:text-sm transition-colors"
                placeholder="محمد"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-topshield-text-dark text-right mb-1.5">
              رقم الجوال <span className="text-red-500">*</span>
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              required
              autoComplete="tel"
              className="appearance-none block w-full pl-3 py-3.5 border border-topshield-border-subtle rounded-xl shadow-sm placeholder-topshield-text-light focus:outline-none focus:ring-2 focus:ring-topshield-accent-gold focus:border-topshield-accent-gold sm:text-sm transition-colors"
              placeholder="05xxxxxxxx"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="invoiceNumber" className="block text-sm font-medium text-topshield-text-dark text-right mb-1.5">
              رقم الفاتورة <span className="text-red-500">*</span>
            </label>
            <input
              id="invoiceNumber"
              name="invoiceNumber"
              type="text"
              required
              className="appearance-none block w-full pl-3 py-3.5 border border-topshield-border-subtle rounded-xl shadow-sm placeholder-topshield-text-light focus:outline-none focus:ring-2 focus:ring-topshield-accent-gold focus:border-topshield-accent-gold sm:text-sm transition-colors"
              placeholder="INV-123456"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-topshield-text-dark text-right mb-1.5">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                <FiMail className="text-topshield-text-light" />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full pr-10 pl-3 py-3.5 border border-topshield-border-subtle rounded-xl shadow-sm placeholder-topshield-text-light focus:outline-none focus:ring-2 focus:ring-topshield-accent-gold focus:border-topshield-accent-gold sm:text-sm transition-colors"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-topshield-text-dark text-right mb-1.5">
              كلمة المرور <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                <FiLock className="text-topshield-text-light" />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="appearance-none block w-full pr-10 pl-3 py-3.5 border border-topshield-border-subtle rounded-xl shadow-sm placeholder-topshield-text-light focus:outline-none focus:ring-2 focus:ring-topshield-accent-gold focus:border-topshield-accent-gold sm:text-sm transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-topshield-text-dark text-right mb-1.5">
              تأكيد كلمة المرور <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                <FiLock className="text-topshield-text-light" />
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                className="appearance-none block w-full pr-10 pl-3 py-3.5 border border-topshield-border-subtle rounded-xl shadow-sm placeholder-topshield-text-light focus:outline-none focus:ring-2 focus:ring-topshield-accent-gold focus:border-topshield-accent-gold sm:text-sm transition-colors"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading || !firstName || !lastName || !email || !password || !confirmPassword}
            className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-topshield-primary-navy bg-topshield-accent-gold hover:bg-topshield-accent-gold-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-topshield-accent-gold-darker transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={!isLoading ? { scale: 1.02, y: -1 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-topshield-primary-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري التسجيل...
              </>
            ) : (
              <>
                <span>إنشاء الحساب</span>
                <FiUser className="text-xl" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-topshield-text-medium">
            هل لديك حساب بالفعل؟{' '}
            <Link href={`/${locale}/login`} legacyBehavior>
              <a className="font-bold text-topshield-primary-blue hover:text-topshield-accent-gold hover:underline transition-colors">
                تسجيل الدخول
              </a>
            </Link>
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link href={`/${locale}/store`} legacyBehavior>
            <a className="text-sm text-topshield-text-light hover:text-topshield-primary-blue transition-colors flex items-center justify-center gap-1">
              <FiArrowLeft className="mt-px" /> العودة إلى المتجر
            </a>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}