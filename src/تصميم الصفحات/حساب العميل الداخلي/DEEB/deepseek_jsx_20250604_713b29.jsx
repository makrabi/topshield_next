// src/pages/[locale]/customer.tsx
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser, FiFileText, FiShield, FiHeadphones, FiLogOut, FiMenu, FiX, FiEdit3, 
  FiChevronRight, FiAward, FiGift, FiHome, FiMaximize, FiTrendingUp, FiRepeat,
} from 'react-icons/fi';
import { FaCrown, FaStar, FaGem, FaMedal } from 'react-icons/fa';

type DashboardSection = 'profile' | 'invoices' | 'warranties' | 'support' | 'loyalty';

const sectionVariants = {
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

const cardListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4,
      ease: "backOut"
    } 
  },
};

const CustomerDashboardPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      if (router.isReady) {
        const targetLocale = router.query.locale || 'ar';
        router.push(`/${String(targetLocale)}/login`);
      } else {
        router.push('/login');
      }
    },
  });
  const router = useRouter();
  const { locale } = router.query;
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

  useEffect(() => {
    document.documentElement.dir = 'rtl';
  }, []);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-topshield-primary-navy to-topshield-primary-blue text-topshield-white dir-rtl">
        <Head><title>جاري التحميل... - بوابة عملاء TOPSHIELD</title></Head>
        <motion.div
          className="text-center p-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
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
    const targetLocale = locale || 'ar';
    const callbackUrl = `/${String(targetLocale)}/login`;
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
                    <FaStar className="text-topshield-white" />
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
                  {router.isReady && locale && (
                    <Link href={`/${String(locale)}/customer/edit-profile`} legacyBehavior>
                      <motion.a
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-topshield-primary-navy to-topshield-primary-blue text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-topshield-accent-gold/50"
                        whileHover={{ 
                          scale: 1.05, 
                          y: -2, 
                          background: "linear-gradient(to right, var(--topshield-primary-blue), var(--topshield-accent-gold))" 
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiEdit3 className="text-xl" />
                        تعديل الملف الشخصي
                      </motion.a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'invoices':
        const invoicesData = [
            { id: 'INV-2023-001', date: '15/03/2023', amount: '1,250 ر.س', status: 'مدفوعة' },
            { id: 'INV-2023-002', date: '22/02/2023', amount: '850 ر.س', status: 'بانتظار الدفع' },
            { id: 'INV-2023-003', date: '10/01/2023', amount: '2,100 ر.س', status: 'مدفوعة' },
            { id: 'INV-2023-004', date: '05/04/2023', amount: '3,750 ر.س', status: 'مدفوعة' },
            { id: 'INV-2023-005', date: '18/03/2023', amount: '1,500 ر.س', status: 'ملغية' },
        ];
        return (
          <motion.div 
            className={`${cardBaseStyle}`} 
            variants={cardItemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className={sectionTitleStyle}>فواتيري</h2>
            <div className="overflow-x-auto rounded-xl shadow-sm border border-topshield-border-subtle">
              <table className="w-full text-right min-w-[700px]">
                <thead className="bg-gradient-to-r from-topshield-primary-blue to-topshield-primary-navy text-white">
                  <tr>
                    {['رقم الفاتورة', 'التاريخ', 'المبلغ', 'الحالة', 'الإجراءات'].map(header => (
                      <th key={header} className="py-4 px-5 font-semibold text-sm first:rounded-tr-lg last:rounded-tl-lg tracking-wider">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-topshield-border-subtle">
                  {invoicesData.map((invoice, index) => (
                    <motion.tr
                        key={invoice.id}
                        className="hover:bg-topshield-background-light transition-colors"
                        variants={cardItemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                    >
                      <td className="py-4 px-5 font-medium text-topshield-primary-blue">{invoice.id}</td>
                      <td className="py-4 px-5 text-topshield-text-medium">{invoice.date}</td>
                      <td className="py-4 px-5 font-semibold text-topshield-text-dark">{invoice.amount}</td>
                      <td className="py-4 px-5">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide ${
                          invoice.status === 'مدفوعة' 
                            ? 'bg-green-100 text-green-700' 
                            : invoice.status === 'بانتظار الدفع'
                              ? 'bg-yellow-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <motion.button
                            className="bg-gradient-to-r from-topshield-primary-blue to-topshield-primary-navy hover:from-topshield-primary-navy hover:to-topshield-primary-blue text-white text-sm px-5 py-2 rounded-md flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                          عرض <FiChevronRight className="-mr-1" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 flex justify-between items-center">
              <p className="text-topshield-text-light">عرض 5 من 12 فاتورة</p>
              <button className="bg-gradient-to-r from-topshield-primary-blue to-topshield-primary-navy text-white px-5 py-2.5 rounded-lg flex items-center gap-2">
                عرض جميع الفواتير
                <FiChevronRight />
              </button>
            </div>
          </motion.div>
        );
      case 'warranties':
        const warrantiesData = [
            { id: 1, product: 'حماية النانو سيراميك للسيارة', startDate: '01/01/2023', endDate: '01/01/2028', status: 'ساري المفعول', statusColor: 'text-green-600', icon: <FiShield className="text-3xl text-topshield-primary-blue" /> },
            { id: 2, product: 'تظليل حراري فاخر للمنزل', startDate: '15/06/2022', endDate: '15/06/2027', status: 'ساري المفعول', statusColor: 'text-green-600', icon: <FiHome className="text-3xl text-topshield-primary-blue" /> },
            { id: 3, product: 'حماية الزجاج الأمامي للسيارة', startDate: '10/11/2023', endDate: '10/11/2024', status: 'على وشك الانتهاء', statusColor: 'text-amber-600', icon: <FiMaximize className="text-3xl text-topshield-primary-blue" /> },
            { id: 4, product: 'حماية المقاعد الجلدية', startDate: '05/03/2023', endDate: '05/03/2026', status: 'ساري المفعول', statusColor: 'text-green-600', icon: <FiTrendingUp className="text-3xl text-topshield-primary-blue" /> },
            { id: 5, product: 'حماية الإطارات', startDate: '20/01/2022', endDate: '20/01/2025', status: 'ساري المفعول', statusColor: 'text-green-600', icon: <FiRepeat className="text-3xl text-topshield-primary-blue" /> },
        ];
        return (
          <motion.div 
            className={`${cardBaseStyle}`} 
            variants={cardItemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className={sectionTitleStyle}>ضماناتي</h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" 
              variants={cardListVariants} 
              initial="hidden" 
              animate="visible"
            >
              {warrantiesData.map((warranty, index) => (
                <motion.div
                    key={warranty.id}
                    className="bg-white border border-topshield-border-subtle rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-lg transform flex flex-col"
                    variants={cardItemVariants}
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`h-3.5 bg-gradient-to-r from-topshield-primary-blue to-topshield-primary-navy`}></div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-topshield-primary-navy leading-tight">{warranty.product}</h3>
                      <div className="p-2 bg-topshield-glass-blue/10 rounded-lg">{warranty.icon}</div>
                    </div>
                    <div className="space-y-2.5 text-sm mb-6 flex-grow">
                      <p className="flex justify-between"><span className="text-topshield-text-medium">تاريخ البدء:</span> <span className="font-medium text-topshield-text-dark">{warranty.startDate}</span></p>
                      <p className="flex justify-between"><span className="text-topshield-text-medium">تاريخ الانتهاء:</span> <span className="font-medium text-topshield-text-dark">{warranty.endDate}</span></p>
                      <p className="flex justify-between"><span className="text-topshield-text-medium">الحالة:</span> <span className={`font-bold ${warranty.statusColor}`}>{warranty.status}</span></p>
                    </div>
                    <motion.button
                        className="mt-auto w-full bg-gradient-to-r from-topshield-primary-navy to-topshield-primary-blue hover:from-topshield-primary-blue hover:to-topshield-primary-navy text-white py-3 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                      تفاصيل الضمان
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-8 flex justify-center">
              <button className="bg-gradient-to-r from-topshield-primary-blue to-topshield-primary-navy text-white px-6 py-3 rounded-lg flex items-center gap-2">
                عرض جميع الضمانات
                <FiChevronRight />
              </button>
            </div>
          </motion.div>
        );
      case 'support':
        return (
          <motion.div 
            className={`${cardBaseStyle}`} 
            variants={cardItemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className={sectionTitleStyle}>الدعم والمساعدة</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm border border-topshield-border-subtle" 
                variants={cardItemVariants}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-topshield-primary-blue to-topshield-primary-navy p-4 rounded-xl text-white">
                    <FiHeadphones className="text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-topshield-primary-navy">تواصل معنا مباشرة</h3>
                </div>
                <p className="text-topshield-text-medium mb-6 text-base leading-relaxed">فريقنا المتخصص جاهز لخدمتك والإجابة على كافة استفساراتك. لا تتردد في التواصل.</p>
                <ul className="space-y-4 text-base">
                  {[
                    { method: 'واتساب', detail: '+966 55 123 4567', note: '(24/7)', href: 'tel:+966551234567' },
                    { method: 'البريد الإلكتروني', detail: 'support@topshield.com', note: '(الرد خلال 24 ساعة)', href: 'mailto:support@topshield.com' },
                    { method: 'الدعم الفني', detail: '9200 12345', note: '(من 8 صباحاً إلى 10 مساءً)', href: 'tel:920012345' },
                  ].map(contact => (
                     <li key={contact.method} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-xs border border-topshield-border-subtle">
                        <span className="font-semibold text-topshield-primary-blue w-24">{contact.method}:</span>
                        <a href={contact.href} className="text-topshield-primary-blue hover:text-topshield-accent-gold font-medium hover:underline transition-colors">{contact.detail}</a>
                        <span className="text-xs text-topshield-text-light mr-auto">{contact.note}</span>
                     </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-sm border border-topshield-border-subtle" 
                variants={cardItemVariants}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-topshield-accent-gold to-topshield-primary-blue p-4 rounded-xl text-white">
                    <FiFileText className="text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-topshield-primary-navy">أرسل طلب دعم</h3>
                </div>
                <p className="text-topshield-text-medium text-base mb-6">هل لديك مشكلة أو استفسار محدد؟ قم بتعبئة النموذج وسنتواصل معك في أقرب وقت.</p>
                <motion.button
                    className="w-full bg-gradient-to-r from-topshield-accent-gold to-topshield-primary-blue hover:from-topshield-primary-blue hover:to-topshield-accent-gold text-white py-3.5 px-8 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                    whileTap={{ scale: 0.95 }}
                >
                  فتح تذكرة دعم جديدة
                </motion.button>
                <div className="mt-6 bg-topshield-background-light p-4 rounded-lg">
                  <h4 className="font-bold text-topshield-primary-navy mb-2">أسئلة شائعة</h4>
                  <ul className="space-y-2 text-topshield-text-medium">
                    <li className="flex items-center gap-2"><FiChevronRight className="text-topshield-accent-gold" />كيف يمكنني تجديد الضمان؟</li>
                    <li className="flex items-center gap-2"><FiChevronRight className="text-topshield-accent-gold" />ما هي خطوات المطالبة بالضمان؟</li>
                    <li className="flex items-center gap-2"><FiChevronRight className="text-topshield-accent-gold" />كيف يمكنني تحديث بياناتي؟</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      case 'loyalty':
        return (
          <motion.div 
            className={`${cardBaseStyle}`} 
            variants={cardItemVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className={sectionTitleStyle}>نقاط الولاء</h2>
            <div className="bg-gradient-to-br from-topshield-primary-navy to-topshield-primary-blue text-white p-8 md:p-10 rounded-3xl shadow-xl mb-10 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-topshield-accent-gold/10 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-topshield-glass-blue/10 rounded-full opacity-60 animate-pulse animation-delay-2000"></div>

              <motion.div
                className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                  <div className="text-center md:text-right">
                    <p className="text-xl text-topshield-glass-blue mb-2">رصيدك الفاخر من النقاط</p>
                    <div className="flex items-baseline justify-center md:justify-start gap-2.5">
                        <span className="text-6xl font-bold text-topshield-accent-gold tracking-tight">1,250</span>
                        <span className="text-3xl font-medium text-topshield-accent-gold">نقطة</span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -5, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                  >
                    <FaAward className="text-8xl text-topshield-accent-gold opacity-40 md:opacity-70" />
                  </motion.div>
              </motion.div>
              <p className="relative z-10 text-topshield-border-subtle mt-6 text-center md:text-right text-lg">
                استمر في تفاعلك معنا لجمع المزيد من النقاط واستبدالها بمكافآت قيمة وخصومات حصرية!
              </p>
            </div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={cardListVariants} initial="hidden" animate="visible">
                <motion.div className="bg-white p-8 rounded-2xl shadow-md border border-topshield-border-subtle" variants={cardItemVariants}>
                    <h3 className="text-2xl font-bold text-topshield-primary-blue mb-5 flex items-center gap-3">
                      <div className="bg-gradient-to-br from-topshield-accent-gold to-topshield-primary-blue p-3 rounded-lg text-white">
                        <FiStar className="text-xl"/>
                      </div>
                      كيف تكسب النقاط؟
                    </h3>
                    <ul className="space-y-4 text-topshield-text-medium text-base">
                        <li className="flex items-start gap-3"><div className="bg-topshield-accent-gold/10 p-1.5 rounded-full mt-1"><FiChevronRight className="text-topshield-accent-gold-darker"/></div><span>مقابل كل 10 ريال تنفقها على خدماتنا، تحصل على نقطة واحدة.</span></li>
                        <li className="flex items-start gap-3"><div className="bg-topshield-accent-gold/10 p-1.5 rounded-full mt-1"><FiChevronRight className="text-topshield-accent-gold-darker"/></div><span>قم بإحالة صديق ناجحة واحصل على 50 نقطة مكافأة.</span></li>
                        <li className="flex items-start gap-3"><div className="bg-topshield-accent-gold/10 p-1.5 rounded-full mt-1"><FiChevronRight className="text-topshield-accent-gold-darker"/></div><span>شارك تجربتك معنا على منصات التواصل الاجتماعي واحصل على نقاط إضافية.</span></li>
                    </ul>
                </motion.div>
                <motion.div className="bg-white p-8 rounded-2xl shadow-md border border-topshield-border-subtle" variants={cardItemVariants}>
                    <h3 className="text-2xl font-bold text-topshield-primary-blue mb-5 flex items-center gap-3">
                      <div className="bg-gradient-to-br from-topshield-accent-gold to-topshield-primary-blue p-3 rounded-lg text-white">
                        <FiGift className="text-xl"/>
                      </div>
                      استبدال النقاط
                    </h3>
                    <p className="text-topshield-text-medium mb-5 text-base">يمكنك استبدال نقاطك بالخصومات التالية (أمثلة):</p>
                    <ul className="space-y-3.5 text-topshield-text-medium text-base">
                        <li className="flex justify-between items-center p-4 bg-topshield-background-light rounded-xl shadow-sm"><span className="font-medium">خصم 25 ريال</span> <span className="font-bold text-topshield-accent-gold-darker">500 نقطة</span></li>
                        <li className="flex justify-between items-center p-4 bg-topshield-background-light rounded-xl shadow-sm"><span className="font-medium">خصم 50 ريال</span> <span className="font-bold text-topshield-accent-gold-darker">950 نقطة</span></li>
                        <li className="flex justify-between items-center p-4 bg-topshield-background-light rounded-xl shadow-sm"><span className="font-medium">هدية تذكارية فاخرة</span> <span className="font-bold text-topshield-accent-gold-darker">1,500 نقطة</span></li>
                    </ul>
                     <motion.button
                        className="mt-8 w-full bg-gradient-to-r from-topshield-accent-gold to-topshield-primary-blue hover:from-topshield-primary-blue hover:to-topshield-accent-gold text-white py-3.5 px-8 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.03, y: -2, filter: "brightness(1.1)"}}
                        whileTap={{ scale: 0.97 }}
                     >
                        تصفح متجر المكافآت
                    </motion.button>
                </motion.div>
            </motion.div>
          </motion.div>
        );
      default:
        return (
          <motion.div className={`${cardBaseStyle} text-center`} variants={cardItemVariants}>
            <h2 className="text-3xl font-semibold text-topshield-primary-navy mb-4">مرحباً بك في قسم {menuItems.find(item => item.id === activeSection)?.label}</h2>
            <p className="text-topshield-text-medium text-lg">هذا القسم قيد التطوير ليعكس أحدث معايير التصميم الفاخرة لـ TOPSHIELD.</p>
            <p className="text-topshield-text-light mt-2">يرجى اختيار قسم آخر أو العودة لاحقًا.</p>
            <div className="mt-8">
                <motion.div
                  animate={{ rotate: [0, 15, -10, 5, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                >
                  <FaGem className="text-6xl text-topshield-accent-gold opacity-30 mx-auto"/>
                </motion.div>
            </div>
          </motion.div>
        );
    }
  };

  const menuItems = [
    { id: 'profile', label: 'ملفي الشخصي', icon: <FiUser /> },
    { id: 'invoices', label: 'فواتيري', icon: <FiFileText /> },
    { id: 'warranties', label: 'ضماناتي', icon: <FiShield /> },
    { id: 'support', label: 'الدعم والمساعدة', icon: <FiHeadphones /> },
    { id: 'loyalty', label: 'نقاط الولاء', icon: <FiAward /> },
  ];

  return (
    <>
      <Head>
        <title>{`${menuItems.find(item => item.id === activeSection)?.label || 'لوحة التحكم'} - بوابة عملاء TOPSHIELD`}</title>
        <meta name="description" content={`بوابة عملاء TOPSHIELD الفاخرة - ${menuItems.find(item => item.id === activeSection)?.label || 'إدارة حسابك'}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen bg-topshield-background-light font-sans">
        <header className="lg:hidden bg-gradient-to-r from-topshield-primary-navy to-topshield-primary-blue text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg dir-rtl">
          <motion.button
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 rounded-lg hover:bg-topshield-primary-blue/30 transition-colors"
            aria-label="فتح القائمة"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiMenu className="text-2xl" />
          </motion.button>
          <div className="text-lg font-bold">
            {menuItems.find(item => item.id === activeSection)?.label}
          </div>
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-topshield-accent-gold to-topshield-primary-blue flex items-center justify-center text-white font-bold text-lg shadow-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {session.user?.name?.charAt(0).toUpperCase() || 'U'}
          </motion.div>
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
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-topshield-primary-blue/30">
                <Link 
                    href={router.isReady && locale ? `/${String(locale)}/customer` : `/customer`} 
                    passHref 
                    legacyBehavior 
                >
                    <a className="flex items-center gap-3.5 group">
                        <motion.div
                            className="bg-gradient-to-br from-topshield-accent-gold to-topshield-primary-blue p-2.5 rounded-xl shadow-md transform transition-transform duration-300 group-hover:scale-110"
                            whileHover={{ rotate: -5, scale: 1.15 }}
                        >
                          <div className="bg-white p-1 rounded-lg">
                            <Image 
                              src="/images/categories/topshield_logo.png" 
                              alt="شعار TOPSHIELD" 
                              width={32} 
                              height={32} 
                              objectFit="contain" 
                            />
                          </div>
                        </motion.div>
                        <h1 className="text-2xl font-bold tracking-wide text-white group-hover:text-topshield-accent-gold transition-colors">TOPSHIELD</h1>
                    </a>
                </Link>
              </div>

              <div className="p-6 border-b border-topshield-primary-blue/30 text-center">
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <motion.div
                    className="w-full h-full rounded-full bg-gradient-to-br from-topshield-accent-gold to-topshield-primary-blue p-1 shadow-lg"
                    animate={{ rotateY: [0, 15, -15, 0]}}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
                  >
                    {session.user?.image ? (
                      <Image 
                        src={session.user.image} 
                        alt="صورة المستخدم" 
                        width={104} 
                        height={104} 
                        className="rounded-full object-cover border-2 border-white" 
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-bold text-topshield-primary-blue border-2 border-white">
                        {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </motion.div>
                  <div className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-topshield-accent-gold rounded-full p-1.5 border-2 border-white shadow-md">
                    <FaCrown className="text-topshield-primary-navy text-md" />
                  </div>
                </div>
                <p className="font-bold text-xl text-white">{session.user?.name || 'عميل مميز'}</p>
                <p className="text-topshield-glass-blue text-sm mb-2">{session.user?.email}</p>
                <div className="flex items-center justify-center gap-1 text-topshield-accent-gold">
                  {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
              </div>

              <nav className="flex-1 py-5 px-3 overflow-y-auto flex flex-col space-y-1.5" aria-label="القائمة الرئيسية">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    className={`flex items-center gap-3.5 w-full p-3.5 rounded-xl transition-all duration-200 ease-in-out group focus:outline-none ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-topshield-accent-gold to-topshield-primary-blue text-topshield-primary-navy shadow-lg font-semibold'
                        : 'text-topshield-border-subtle hover:bg-topshield-primary-blue/40 hover:text-white'
                    }`}
                    onClick={() => {
                      setActiveSection(item.id as DashboardSection);
                      if (sidebarOpen) setSidebarOpen(false);
                    }}
                    whileHover={{ x: activeSection === item.id ? 0 : -4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <motion.div
                      className={`p-2.5 rounded-lg transition-colors duration-200 ease-in-out ${
                        activeSection === item.id
                          ? 'bg-topshield-primary-navy/80 text-topshield-accent-gold'
                          : 'bg-topshield-primary-blue/30 text-topshield-glass-blue group-hover:text-white'
                      }`}
                      whileHover={{scale: activeSection === item.id ? 1 : 1.1, rotate: activeSection === item.id ? 0 : -3 }}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="text-base">{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              <div className="p-4 mt-auto border-t border-topshield-primary-blue/30">
                <motion.button
                  className="flex items-center gap-3.5 w-full p-3.5 text-red-300 hover:bg-red-500/20 hover:text-red-200 rounded-xl transition-colors duration-200 ease-in-out group focus:outline-none"
                  onClick={handleSignOut}
                  whileHover={{ scale: 1.03, x: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="p-2.5 rounded-lg bg-topshield-primary-blue/20 text-red-400 group-hover:bg-red-500/30 group-hover:text-red-300">
                    <FiLogOut className="text-xl" />
                  </div>
                  <span className="font-medium text-base">تسجيل الخروج</span>
                </motion.button>
              </div>
            </div>
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
                <div className="mb-10 text-right">
                  <motion.h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-topshield-primary-navy"
                    initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    مرحباً بك، <span className="text-transparent bg-clip-text bg-gradient-to-r from-topshield-primary-blue to-topshield-accent-gold">{session.user?.name?.split(' ')[0] || session.user?.email}</span>!
                  </motion.h1>
                  <motion.p
                    className="text-topshield-text-medium text-lg mt-3"
                    initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    هنا يمكنك إدارة كل ما يتعلق بخدمات TOPSHIELD الخاصة بك بكل سهولة ويُسر.
                  </motion.p>
                  
                  <motion.div 
                    className="mt-6 flex flex-wrap gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="bg-gradient-to-r from-green-100 to-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      عضو منذ: فبراير 2023
                    </div>
                    <div className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      نقاط الولاء: 1,250 نقطة
                    </div>
                    <div className="bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                      3 ضمانات نشطة
                    </div>
                  </motion.div>
                </div>
                {renderSectionContent()}
                <footer className="mt-16 pt-10 border-t-2 border-topshield-border-subtle text-center text-topshield-text-light text-sm">
                  <p>© {new Date().getFullYear()} TOPSHIELD. جميع الحقوق محفوظة.</p>
                  <p className="mt-1">تصميم وتطوير <a href="#" className="text-topshield-primary-blue hover:text-topshield-accent-gold font-semibold transition-colors">Mokhtar Tech</a>.</p>
                </footer>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboardPage;