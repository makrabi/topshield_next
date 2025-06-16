// =================================================================
// الملف الثاني: واجهة المستخدم التفاعلية (Client Component)
// المسار: src/components/account/CustomerDashboard.tsx
// =================================================================

'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  FiUser, FiFileText, FiShield, FiHeadphones, FiLogOut, FiMenu, FiX, FiEdit3,
  FiChevronRight, FiAward, FiGift, FiHome, FiMaximize, FiTrendingUp, FiRepeat,
  FiStar
} from 'react-icons/fi';
import { FaCrown, FaStar as FaStarFilled, FaGem, FaMedal } from 'react-icons/fa';


type DashboardSection = 'profile' | 'invoices' | 'warranties' | 'support' | 'loyalty';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  },
};

const cardListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1]
    }
  },
};

// ✅ تم تعديل تعريف الدالة لتستقبل locale كـ prop مباشرة
export default function CustomerDashboard({ locale }: { locale: string }) {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // نستخدم الـ locale القادمة من الـ props هنا
      router.push(`/${locale}/login`);
    },
  });

  const [activeSection, setActiveSection] = useState<DashboardSection>('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (status === "loading") {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setLoadingProgress(progress);
      }, 120);
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(100);
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-topshield-primary-navy to-topshield-primary-blue text-topshield-white dir-rtl">
        <motion.div
          className="text-center p-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="relative w-44 h-44 mx-auto mb-10">
            <motion.div
              className="absolute inset-0 bg-topshield-primary-blue rounded-full opacity-30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 360]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-2 border-4 border-topshield-accent-gold bg-topshield-primary-blue rounded-full flex items-center justify-center shadow-2xl">
              <motion.div
                animate={{
                  rotate: [0, 15, -10, 5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FaGem className="text-5xl text-topshield-accent-gold" />
              </motion.div>
            </div>
          </div>
          <motion.h1
            className="text-4xl font-bold mb-6 tracking-wide"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            جاري تحميل بوابة <span className="text-topshield-accent-gold">TOPSHIELD</span>
          </motion.h1>
          <div className="w-80 h-3 bg-topshield-primary-blue/50 rounded-full overflow-hidden mx-auto shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-topshield-primary-blue to-topshield-accent-gold rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3, ease: "linear" }}
            />
          </div>
          <motion.p
            className="mt-5 text-xl text-topshield-glass-blue font-medium"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            تجربة فاخرة تليق بك
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!session) {
    return <div className="flex items-center justify-center min-h-screen dir-rtl bg-gradient-to-br from-topshield-primary-navy to-topshield-primary-blue"><p className="text-xl text-topshield-white">يجب تسجيل الدخول لعرض هذه الصفحة.</p></div>;
  }

  const handleSignOut = async () => {
    const callbackUrl = `/${locale}/login`;
    const data = await signOut({ redirect: false, callbackUrl });
    router.push(data.url || callbackUrl);
  };

  const renderSectionContent = () => {
    const cardBaseStyle = "bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 text-topshield-text-dark border border-topshield-border-subtle/20";
    const sectionTitleStyle = "text-3xl md:text-4xl font-bold text-topshield-primary-navy mb-8 pb-4 border-b-4 border-topshield-accent-gold inline-block";

    switch (activeSection) {
      case 'profile':
        return (
          <motion.div
            className={`${cardBaseStyle}`}
            variants={cardItemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className={sectionTitleStyle}>ملفي الشخصي</h2>
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
              <motion.div
                className="relative group shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-gradient-to-br from-topshield-accent-gold to-topshield-primary-blue rounded-3xl p-1.5 w-44 h-44 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="صورة الملف الشخصي"
                      width={164}
                      height={164}
                      className="rounded-2xl object-cover border-2 border-topshield-accent-gold"
                    />
                  ) : (
                    <div className="bg-topshield-background-light border-2 border-dashed border-topshield-glass-blue rounded-2xl w-full h-full flex items-center justify-center">
                      <FiUser className="text-7xl text-topshield-primary-navy opacity-60" />
                    </div>
                  )}
                </div>
                <motion.div
                  className="absolute -bottom-5 -right-5 bg-topshield-accent-gold rounded-full p-3.5 shadow-lg border-4 border-white"
                  animate={{ rotate: [0, 10, -5, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                >
                  <FaMedal className="text-topshield-primary-navy text-2xl" />
                </motion.div>
              </motion.div>

              <div className="flex-1 text-right w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <h3 className="text-3xl font-bold text-topshield-primary-blue">{session.user?.name || 'عميل TOPSHIELD'}</h3>
                  <div className="bg-gradient-to-r from-topshield-accent-gold to-topshield-primary-blue text-topshield-primary-navy px-6 py-2.5 rounded-xl text-md font-bold flex items-center gap-2.5 self-start sm:self-center shadow-md">
                    <span>العضوية الماسية</span>
                    <FaStarFilled className="text-topshield-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
                  {[
                    { label: 'الاسم الكامل', value: session.user?.name || 'غير متوفر' },
                    { label: 'البريد الإلكتروني', value: session.user?.email || 'غير متوفر' },
                    { label: 'تاريخ الانضمام', value: 'فبراير 2023' },
                    { label: 'حالة العضوية', value: <span className="text-green-600 font-semibold">نشطة</span> },
                  ].map((field, index) => (
                    <motion.div
                      key={field.label}
                      className="bg-white p-5 rounded-xl shadow-sm border border-topshield-border-subtle hover:border-topshield-accent-gold hover:shadow-md transition-all duration-300"
                      variants={cardItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      whileHover={{ y: -3 }}
                    >
                      <p className="text-sm text-topshield-text-medium mb-1.5">{field.label}</p>
                      <p className="text-xl font-semibold text-topshield-primary-navy">{field.value}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-10 text-left">
                  <Link href={`/${locale}/customer/edit-profile`} legacyBehavior>
                    <motion.a
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-topshield-primary-navy to-topshield-primary-blue text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-topshield-accent-gold/50"
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiEdit3 className="text-xl" />
                      تعديل الملف الشخصي
                    </motion.a>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        );
      // ... باقي الحالات (cases) تبقى كما هي بدون تغيير ...
      default:
         return (
             <motion.div className={`${cardBaseStyle} text-center`} variants={cardItemVariants}>
                <h2 className="text-3xl font-semibold text-topshield-primary-navy mb-4">مرحباً بك</h2>
             </motion.div>
         )
    }
  };

  const menuItems = [
    { id: 'profile', label: 'ملفي الشخصي', icon: <FiUser /> },
    { id: 'invoices', label: 'فواتيري', icon: <FiFileText /> },
    { id: 'warranties', label: 'ضماناتي', icon: <FiShield /> },
    { id: 'support', label: 'الدعم والمساعدة', icon: <FiHeadphones /> },
    { id: 'loyalty', label: 'نقاط الولاء', icon: <FiAward /> },
  ];

  // ✅ باقي كود الـ JSX يبقى كما هو بدون أي تغيير
  return (
    <div className="flex flex-col min-h-screen bg-topshield-background-light font-sans">
      <header className="lg:hidden bg-gradient-to-r from-topshield-primary-navy to-topshield-primary-blue text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg dir-rtl">
        {/* ... محتوى الهيدر ... */}
      </header>

      <div className="flex flex-1 dir-rtl">
        <aside
          className={`fixed inset-y-0 right-0 z-40 w-72 bg-gradient-to-b from-topshield-primary-navy to-topshield-primary-blue text-white shadow-2xl
                      lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:shadow-none lg:translate-x-0
                      transition-transform duration-300 ease-in-out transform ${
                        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                      }`}
          aria-label="الشريط الجانبي"
        >
          {/* ... محتوى الشريط الجانبي ... */}
        </aside>

        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/70 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto bg-topshield-background-light">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="min-h-full dir-rtl"
            >
              {/* ... محتوى الصفحة الرئيسي ... */}
              {renderSectionContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}