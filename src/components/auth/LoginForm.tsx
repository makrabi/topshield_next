// src/components/auth/LoginForm.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FiLogIn, FiLock, FiMail, FiEye, FiEyeOff, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { FaGem } from 'react-icons/fa';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useParams(); // ✅ استخدام useParams للوصول إلى locale
  const queryError = searchParams.get('error');
  const { data: session, status } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // ✅ استخدام queryError من URL
  useEffect(() => {
    if (queryError) {
      if (queryError === "CredentialsSignin") {
        setAuthError("البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.");
      } else if (queryError === "OAuthAccountNotLinked") {
        setAuthError("هذا الحساب مسجل بالفعل باستخدام طريقة أخرى. الرجاء تسجيل الدخول بالطريقة الأصلية.");
      } else if (typeof queryError === 'string' && queryError.toLowerCase().includes('user not found')) {
        setAuthError("لم يتم العثور على حساب بهذا البريد الإلكتروني.");
      } else {
        setAuthError("حدث خطأ غير متوقع أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى لاحقًا.");
      }
    }
  }, [queryError]);

  // ✅ التوجيه التلقائي إذا كان المستخدم مسجل الدخول
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push(`/${locale}/customer`);
    }
  }, [session, status, router, locale]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError(null);

    // ✅ استخدام signIn بدون await
    try {
      const result = signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: `/${locale}/customer`,
      });

      // لا حاجة لـ await هنا لأن signIn لا يُرجع Promise
    } catch (err) {
      setIsSubmitting(false);
      console.error('Login error:', err);
      setAuthError("حدث خطأ غير متوقع أثناء تسجيل الدخول.");
    }
  };

  if (status === "loading" || (status === "authenticated" && session)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-topshield-primary-navy text-topshield-white dir-rtl">
        <FaGem className="text-5xl text-topshield-accent-gold animate-pulse mb-4" />
        <p className="text-xl font-medium">جاري التحقق من الجلسة أو توجيهك...</p>
      </div>
    );
  }

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
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-topshield-primary-navy">بوابة العملاء</h1>
          <p className="text-topshield-text-medium mt-2">مرحباً بعودتك! سجل دخولك للمتابعة.</p>
        </div>

        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md flex items-center gap-3"
            role="alert"
          >
            <FiAlertCircle className="text-xl" />
            <p className="text-sm">{authError}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-topshield-text-dark text-right mb-1.5">
              البريد الإلكتروني
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
              كلمة المرور
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
                <FiLock className="text-topshield-text-light" />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none block w-full pr-10 pl-3 py-3.5 border border-topshield-border-subtle rounded-xl shadow-sm placeholder-topshield-text-light focus:outline-none focus:ring-2 focus:ring-topshield-accent-gold focus:border-topshield-accent-gold sm:text-sm transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 pl-3 flex items-center text-sm text-topshield-text-light hover:text-topshield-primary-blue focus:outline-none"
                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end text-sm">
            <div className="font-medium text-topshield-primary-blue hover:text-topshield-accent-gold transition-colors">
              <Link href={`/${locale}/forgot-password`} legacyBehavior>
                <a>هل نسيت كلمة المرور؟</a>
              </Link>
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting || !email || !password}
            className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-topshield-primary-navy bg-topshield-accent-gold hover:bg-topshield-accent-gold-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-topshield-accent-gold-darker transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-topshield-primary-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري تسجيل الدخول...
              </>
            ) : (
              <>
                <FiLogIn className="text-xl" />
                تسجيل الدخول
              </>
            )}
          </motion.button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-sm text-topshield-text-medium">
            ليس لديك حساب بعد؟{' '}
            <Link href={`/${locale}/register`} legacyBehavior>
              <a className="font-bold text-topshield-primary-blue hover:text-topshield-accent-gold hover:underline transition-colors">
                أنشئ حسابًا جديدًا
              </a>
            </Link>
          </p>
        </div>
        <div className="mt-10 text-center">
          <Link href={`/${locale}/store`} legacyBehavior>
            <a className="text-sm text-topshield-text-light hover:text-topshield-primary-blue transition-colors flex items-center justify-center gap-1">
              <FiArrowRight className="mt-px" /> العودة إلى المتجر
            </a>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}