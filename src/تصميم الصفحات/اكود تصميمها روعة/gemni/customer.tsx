// src/pages/[locale]/customer.tsx
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link'; // 🟢 تأكد من استيراد Link
import { FiUser, FiFileText, FiShield, FiHeadphones, FiLogOut, FiMenu, FiX, FiEdit3, FiChevronRight } from 'react-icons/fi'; // أضفت FiEdit3 و FiChevronRight
import { FaCrown, FaStar, FaGem } from 'react-icons/fa';

type DashboardSection = 'profile' | 'invoices' | 'warranties' | 'support';

const CustomerDashboardPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login'); 
    },
  });
  const router = useRouter();
  const { locale } = router.query;
  const [activeSection, setActiveSection] = useState<DashboardSection>('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (status === "loading") {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 150); 
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(100); 
    }
  }, [status]);

  // تطبيق اتجاه RTL على body لهذه الصفحة إذا لم يكن مطبقًا عالميًا بشكل كافٍ
  useEffect(() => {
    document.documentElement.dir = 'rtl'; // أو document.body.dir
    // إذا كنت قد وضعت اتجاه rtl في globals.css على body، قد لا تحتاج لهذا
    return () => {
      document.documentElement.dir = ''; // إزالته عند مغادرة الصفحة
    };
  }, []);


  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white text-right">
        <Head><title>جاري التحميل... - بوابة عملاء TOPSHIELD</title></Head>
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-indigo-700 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-2 bg-indigo-600 rounded-full flex items-center justify-center">
              <FaGem className="text-3xl text-indigo-300" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">جاري تحميل بوابة العملاء...</h1>
          <div className="w-64 h-2 bg-indigo-700 rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-200 ease-linear" // animate-pulse كان هنا، تم تعديل لـ transition
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="mt-3 text-indigo-300">نظام TOPSHIELD الفاخر</p>
        </div>
      </div>
    );
  }
  
  if (!session) {
    return <p>يجب تسجيل الدخول لعرض هذه الصفحة.</p>; 
  }

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: `/${locale}/login` });
    router.push(data.url);
  };

  const renderSectionContent = () => {
    const cardBaseClass = "bg-gradient-to-br rounded-2xl shadow-xl p-6 md:p-8"; // نمط البطاقة الموحد

    switch (activeSection) {
      case 'profile':
        return (
          <div className={`${cardBaseClass} from-white to-indigo-50`}>
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              <div className="relative self-center md:self-start">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-1 w-32 h-32 shadow-lg">
                  {session.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt="صورة الملف الشخصي" 
                      width={120}
                      height={120}
                      className="rounded-[14px] object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed border-gray-300 rounded-[14px] w-full h-full flex items-center justify-center">
                      <FiUser className="text-5xl text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-2 shadow-lg">
                  <FaCrown className="text-white text-xl" />
                </div>
              </div>
              
              <div className="flex-1 text-right">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">ملفي الشخصي</h2>
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2 self-start sm:self-center">
                    <span>العضوية الذهبية</span>
                    <FaStar className="text-yellow-300" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                    <p className="text-sm text-gray-500 mb-1">الاسم الكامل</p>
                    <p className="text-lg font-semibold text-gray-900">{session.user?.name || 'غير متوفر'}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                    <p className="text-sm text-gray-500 mb-1">البريد الإلكتروني</p>
                    <p className="text-lg font-semibold text-gray-900">{session.user?.email || 'غير متوفر'}</p>
                  </div>
                   <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                     <p className="text-sm text-gray-500 mb-1">تاريخ الانضمام (مثال)</p>
                     <p className="text-lg font-semibold text-gray-900">يناير 2023</p>
                   </div>
                   <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                     <p className="text-sm text-gray-500 mb-1">حالة العضوية (مثال)</p>
                     <p className="text-lg font-semibold text-emerald-600">نشطة</p>
                   </div>
                </div>
                <div className="mt-6 text-left">
                  <Link href={`/${locale}/customer/edit-profile`} legacyBehavior>
                    <a className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <FiEdit3 />
                      تعديل الملف الشخصي
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      // ... (باقي الحالات لـ invoices, warranties, support كما أرسلتها أنت، فهي تبدو جيدة كهياكل أولية) ...
      // سأقوم بنسخها كما هي من الكود الذي أرسلته
      case 'invoices':
        return (
          <div className={`${cardBaseClass} from-white to-blue-50`}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">فواتيري</h2>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="w-full text-right min-w-[600px]"> {/* إضافة min-width */}
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-700">
                  <tr>
                    <th className="py-3 px-4 text-white font-semibold text-sm rounded-tr-lg">رقم الفاتورة</th>
                    <th className="py-3 px-4 text-white font-semibold text-sm">التاريخ</th>
                    <th className="py-3 px-4 text-white font-semibold text-sm">المبلغ</th>
                    <th className="py-3 px-4 text-white font-semibold text-sm">الحالة</th>
                    <th className="py-3 px-4 text-white font-semibold text-sm rounded-tl-lg">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {[1, 2, 3].map((invoice, index) => (
                    <tr key={invoice} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-indigo-50/50' : 'bg-white'} hover:bg-indigo-100 transition-colors`}>
                      <td className="py-4 px-4 font-medium text-gray-700">INV-2023-00{invoice}</td>
                      <td className="py-4 px-4 text-gray-600">15/0{invoice}/2023</td>
                      <td className="py-4 px-4 font-semibold text-gray-800">SAR 1,2{invoice * 100}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${invoice === 1 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {invoice === 1 ? 'مدفوعة' : 'بانتظار الدفع'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-md flex items-center gap-1 transition-colors">
                          عرض <FiChevronRight className="-mr-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
             <p className="text-center text-gray-500 mt-6">سيتم ربط هذه القائمة بالفواتير الحقيقية قريبًا.</p>
          </div>
        );
      case 'warranties':
        return (
          <div className={`${cardBaseClass} from-white to-cyan-50`}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">ضماناتي</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((warranty) => (
                <div key={warranty} className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-2xl transform hover:-translate-y-1">
                  <div className={`h-3 ${warranty % 2 === 0 ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-sky-500 to-cyan-600'}`}></div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">ضمان المنتج {warranty}</h3>
                      <FiShield className="text-3xl text-indigo-500" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="flex justify-between"><span className="text-gray-500">تاريخ الشراء:</span> <span className="font-medium text-gray-700">01/01/2023</span></p>
                      <p className="flex justify-between"><span className="text-gray-500">تاريخ الانتهاء:</span> <span className="font-medium text-gray-700">01/01/2025</span></p>
                      <p className="flex justify-between"><span className="text-gray-500">الحالة:</span> <span className="font-semibold text-green-600">ساري المفعول</span></p>
                    </div>
                    <button className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity">
                      تفاصيل الضمان
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-6">سيتم ربط هذه القائمة بالضمانات الحقيقية قريبًا.</p>
          </div>
        );
      case 'support':
        return (
          <div className={`${cardBaseClass} from-white to-purple-50`}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">الدعم الفني</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-100 p-3 rounded-lg"><FiHeadphones className="text-2xl text-indigo-600" /></div>
                  <h3 className="text-lg font-semibold text-gray-700">تواصل معنا مباشرة</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">فريقنا جاهز لمساعدتك. اختر طريقة التواصل المناسبة لك:</p>
                <ul className="space-y-2 text-sm">
                  <li><strong>واتساب:</strong> <a href="tel:+966551234567" className="text-indigo-600 hover:underline">+966 55 123 4567</a> (24/7)</li>
                  <li><strong>البريد الإلكتروني:</strong> <a href="mailto:support@topshield.com" className="text-indigo-600 hover:underline">support@topshield.com</a> (الرد خلال 24 ساعة)</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg"><FiFileText className="text-2xl text-purple-600" /></div>
                  <h3 className="text-lg font-semibold text-gray-700">أرسل طلب دعم</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">صف مشكلتك وسنعاود الاتصال بك في أقرب وقت.</p>
                <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  فتح تذكرة دعم جديدة
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={`${cardBaseClass} from-white to-gray-50`}>
            <h2 className="text-2xl font-semibold">مرحباً بك في بوابة عملاء TOPSHIELD</h2>
            <p className="text-gray-600">يرجى اختيار قسم من القائمة الجانبية.</p>
          </div>
        );
    }
  };

  const menuItems = [
    { id: 'profile', label: 'ملفي الشخصي', icon: <FiUser /> }, // تم تعديل حجم الأيقونة عبر الكلاس في JSX
    { id: 'invoices', label: 'فواتيري', icon: <FiFileText /> },
    { id: 'warranties', label: 'ضماناتي', icon: <FiShield /> },
    { id: 'support', label: 'الدعم الفني', icon: <FiHeadphones /> },
  ];

  return (
    <>
      <Head>
        <title>بوابة عملاء TOPSHIELD - {session.user?.name || 'لوحة التحكم'}</title>
        <meta name="description" content="لوحة تحكم عملاء TOPSHIELD الفاخرة" />
      </Head>
      
      <div className="min-h-screen bg-slate-100"> {/* لون خلفية بسيط للـ body */}
        {/* شريط الهاتف المحمول العلوي */}
        <div className="lg:hidden bg-gradient-to-r from-slate-800 to-slate-900 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-sky-500 to-cyan-500 p-1.5 rounded-lg">
              <FaGem className="text-white text-xl" />
            </div>
            <h1 className="text-lg font-bold">TOPSHIELD</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          >
            {sidebarOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
        
        <div className="flex"> {/* تم إزالة flex-1 من هنا */}
          {/* الشريط الجانبي */}
          <aside 
            className={`fixed inset-y-0 right-0 z-40 w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 shadow-2xl transform transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-none
                        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0`}
          >
            <div className="h-full flex flex-col">
              {/* رأس الشريط الجانبي (للحواسيب الكبيرة) */}
              <div className="hidden lg:flex items-center justify-between p-6 border-b border-slate-700">
                 <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-sky-500 to-cyan-500 p-2 rounded-xl">
                      <FaGem className="text-white text-2xl" />
                    </div>
                    <h1 className="text-xl font-bold">TOPSHIELD</h1>
                  </div>
                {/* زر الإغلاق في الشريط الجانبي للجوال - يمكن إزالته إذا كان زر القائمة في الهيدر كافيًا */}
                {/* <button 
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-1 rounded-md hover:bg-slate-700"
                >
                  <FiX className="text-xl" />
                </button> */}
              </div>
              
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                      {session.user?.image ? 
                        <Image src={session.user.image} alt="User" width={64} height={64} className="rounded-full object-cover" /> :
                        session.user?.name?.charAt(0).toUpperCase() || 'U'
                      }
                    </div>
                    <div className="absolute -bottom-1 -left-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-1.5 shadow">
                      <FaStar className="text-white text-xs" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-white">{session.user?.name || 'مستخدم مميز'}</p>
                    <p className="text-slate-400 text-sm">{session.user?.email}</p>
                  </div>
                </div>
                <div className="bg-slate-700/50 rounded-xl p-3 flex items-center justify-between text-sm">
                  <span className="text-slate-300">نقاط الولاء (مثال):</span>
                  <span className="font-bold text-amber-400">1,250 نقطة</span>
                </div>
              </div>
              
              <nav className="flex-1 py-4 px-3 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className={`flex items-center gap-x-3.5 w-full p-3.5 mb-1 rounded-lg text-base transition-all duration-200 ease-in-out group
                                ${activeSection === item.id 
                                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md scale-105' 
                                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                }`}
                    onClick={() => {
                      setActiveSection(item.id as DashboardSection);
                      if(sidebarOpen) setSidebarOpen(false);
                    }}
                  >
                    <div className={`p-1.5 rounded-md transition-colors duration-200 ease-in-out 
                                    ${activeSection === item.id 
                                      ? 'bg-white/20 text-white' 
                                      : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600 group-hover:text-sky-300'
                                    }`}>
                      {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
              
              <div className="p-4 mt-auto border-t border-slate-700">
                <button
                  className="flex items-center gap-x-3.5 w-full p-3.5 text-red-300 hover:bg-red-700/20 hover:text-red-200 rounded-lg transition-colors duration-200 ease-in-out group"
                  onClick={handleSignOut}
                >
                  <div className="p-1.5 rounded-md bg-slate-700 text-red-400 group-hover:bg-red-700/30 group-hover:text-red-300">
                     <FiLogOut className="w-5 h-5" />
                  </div>
                  <span className="font-medium">تسجيل الخروج</span>
                </button>
              </div>
            </div>
          </aside>
          
          {sidebarOpen && (
            <div 
              className="fixed inset-0 z-30 bg-black/50 lg:hidden" // z-index أقل من الشريط الجانبي
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
          
          <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
             {/* تم إزالة الهيدر الداخلي من هنا، يمكنك إضافته إذا أردت عنوانًا لكل قسم */}
            <div className="max-w-5xl mx-auto"> 
              {renderSectionContent()}
            </div>
            
            <footer className="mt-12 pt-8 border-t border-gray-300 text-center text-gray-600 text-sm">
              <p>© {new Date().getFullYear()} TOPSHIELD. جميع الحقوق محفوظة.</p>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboardPage;