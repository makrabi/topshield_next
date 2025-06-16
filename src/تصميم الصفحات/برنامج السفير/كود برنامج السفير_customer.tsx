// src/pages/[locale]/customer.tsx
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { 
  FiUser, 
  FiFileText, 
  FiShield, 
  FiHeadphones, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiChevronRight,
  FiCalendar,
  FiShoppingCart,
  FiDollarSign,
  FiUsers,
  FiClock,
  FiSun,
  FiCar,
  FiHome,
  FiShield as FiProtection,
  FiStar
} from 'react-icons/fi';
import { FaCrown, FaStar, FaGem, FaCar, FaBuilding, FaPaintRoller } from 'react-icons/fa';

type DashboardSection = 'profile' | 'invoices' | 'warranties' | 'support' | 'appointments' | 'new-service' | 'referrals' | 'bank';

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
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('');

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-indigo-700 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-2 bg-indigo-600 rounded-full flex items-center justify-center">
              <FaGem className="text-3xl text-indigo-300" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4">جاري تحميل بوابة العملاء...</h1>
          <div className="w-64 h-2 bg-indigo-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
          </div>
          <p className="mt-3 text-indigo-300">نظام TOPSHIELD الفاخر</p>
        </div>
      </div>
    );
  }
  
  if (!session) {
    return null; 
  }

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: `/${locale}/login` });
    router.push(data.url);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-1 w-32 h-32 shadow-lg">
                  {session.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt="Profile" 
                      width={128} 
                      height={128}
                      className="rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-2xl w-full h-full flex items-center justify-center">
                      <FiUser className="text-4xl text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-2 shadow-lg">
                  <FaCrown className="text-white text-xl" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">ملفي الشخصي</h2>
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <span>العضوية الذهبية</span>
                    <FaStar className="text-yellow-300" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-50">
                    <p className="text-gray-500 mb-1">الاسم الكامل</p>
                    <p className="text-lg font-medium text-gray-800">{session.user?.name || 'غير متوفر'}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-50">
                    <p className="text-gray-500 mb-1">البريد الإلكتروني</p>
                    <p className="text-lg font-medium text-gray-800">{session.user?.email || 'غير متوفر'}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-50">
                    <p className="text-gray-500 mb-1">تاريخ الانضمام</p>
                    <p className="text-lg font-medium text-gray-800">يناير 2023</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-50">
                    <p className="text-gray-500 mb-1">حالة العضوية</p>
                    <p className="text-lg font-medium text-emerald-600">نشطة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'invoices':
        return (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">فواتيري</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <th className="py-3 px-4 rounded-r-lg">رقم الفاتورة</th>
                    <th className="py-3 px-4">التاريخ</th>
                    <th className="py-3 px-4">المبلغ</th>
                    <th className="py-3 px-4">الحالة</th>
                    <th className="py-3 px-4 rounded-l-lg">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((invoice) => (
                    <tr key={invoice} className="border-b border-gray-200 hover:bg-indigo-50 transition-colors">
                      <td className="py-4 px-4 font-medium">INV-20230{invoice}</td>
                      <td className="py-4 px-4">15/0{invoice}/2023</td>
                      <td className="py-4 px-4 font-bold">1,2{invoice * 100} ر.س</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${invoice === 1 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {invoice === 1 ? 'مدفوعة' : 'قيد الانتظار'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors px-4 py-1 rounded-full flex items-center gap-2">
                          التفاصيل
                          <FiChevronRight />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'warranties':
        return (
          <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl shadow-xl p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">ضماناتي</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((warranty) => (
                <div 
                  key={warranty}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className={`h-2 ${warranty === 1 ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : warranty === 2 ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-indigo-400 to-purple-500'}`}></div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800">حماية شاملة {warranty}</h3>
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <FiShield className="text-2xl text-indigo-600" />
                      </div>
                    </div>
                    
                    <div className="mb-5">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">رقم الضمان</span>
                        <span className="font-medium">WRN-00{warranty}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">تاريخ البدء</span>
                        <span className="font-medium">01/0{warranty}/2023</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">تاريخ الانتهاء</span>
                        <span className="font-medium">01/0{warranty}/2024</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-500">الحالة</span>
                        <span className={`font-medium ${warranty === 1 ? 'text-emerald-600' : warranty === 2 ? 'text-amber-600' : 'text-indigo-600'}`}>
                          {warranty === 1 ? 'نشط' : warranty === 2 ? 'قيد المراجعة' : 'منتهي'}
                        </span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'support':
        return (
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">الدعم الفني</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-indigo-100 p-3 rounded-xl">
                    <FiHeadphones className="text-3xl text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">الدعم المباشر</h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  فريق الدعم لدينا متاح على مدار الساعة لمساعدتك في أي استفسارات أو مشاكل تواجهك. 
                  يمكنك التواصل معنا عبر القنوات التالية:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <span className="text-indigo-600 font-medium">واتساب</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">+966 55 123 4567</p>
                      <p className="text-sm text-gray-500">متاح 24/7</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <span className="text-indigo-600 font-medium">البريد</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">support@topshield.com</p>
                      <p className="text-sm text-gray-500">الرد خلال 24 ساعة</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <span className="text-indigo-600 font-medium">الدردشة</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">الدردشة المباشرة</p>
                      <p className="text-sm text-gray-500">متاح من 8 صباحاً إلى 10 مساءً</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <FiFileText className="text-3xl text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">إرسال طلب دعم</h3>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">الموضوع</label>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="ما هو موضوع طلب الدعم؟"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">الوصف</label>
                    <textarea 
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="صف مشكلتك بالتفصيل..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">رفع ملف (اختياري)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <p className="text-gray-500">اسحب الملفات هنا أو انقر للرفع</p>
                      <p className="text-sm text-gray-400 mt-2">الحد الأقصى لحجم الملف: 10MB</p>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity mt-4"
                  >
                    إرسال طلب الدعم
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      
      case 'new-service':
        return (
          <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-xl p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">خدمات جديدة</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className={`bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md transition-all hover:-translate-y-1 hover:shadow-lg ${selectedService === service.id ? 'ring-2 ring-indigo-500' : ''}`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-600 font-bold">{service.price}</span>
                      <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                        شراء الخدمة
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'appointments':
        return (
          <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">حجز موعد</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
                    <FiCalendar className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">جدول المواعيد</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">أوقات العمل:</h4>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FiClock className="text-amber-600" />
                      <span className="font-medium">السبت - الخميس</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-lg flex items-center gap-2">
                        <FiSun className="text-amber-400" />
                        <span>8:00 ص - 11:30 ص</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg flex items-center gap-2">
                        <FiStar className="text-amber-400" />
                        <span>4:00 م - 9:30 م</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">تاريخ الحجز</label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">وقت الحجز</label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                    >
                      <option value="">اختر وقت الحجز</option>
                      <option value="08:00">8:00 صباحاً</option>
                      <option value="09:00">9:00 صباحاً</option>
                      <option value="10:00">10:00 صباحاً</option>
                      <option value="11:00">11:00 صباحاً</option>
                      <option value="16:00">4:00 مساءً</option>
                      <option value="17:00">5:00 مساءً</option>
                      <option value="18:00">6:00 مساءً</option>
                      <option value="19:00">7:00 مساءً</option>
                      <option value="20:00">8:00 مساءً</option>
                      <option value="21:00">9:00 مساءً</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity mt-4"
                    disabled={!appointmentDate || !appointmentTime}
                  >
                    تأكيد الحجز
                  </button>
                </form>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                    <FiCalendar className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">مواعيدي القادمة</h3>
                </div>
                
                <div className="space-y-4">
                  {appointments.map((appointment, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 hover:bg-indigo-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-800">{appointment.service}</h4>
                        <span className={`px-2 py-1 rounded-full text-sm ${appointment.status === 'مؤكد' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{appointment.date}</span>
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'bank':
        return (
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">الحساب البنكي</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-xl font-bold">الحساب البنكي</h3>
                    <p className="text-blue-200">TOPSHIELD للخدمات المتكاملة</p>
                  </div>
                  <FiDollarSign className="text-3xl text-blue-300" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-blue-500 pb-2">
                    <span className="text-blue-200">الاسم الكامل</span>
                    <span className="font-medium">{session.user?.name || 'غير متوفر'}</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-blue-500 pb-2">
                    <span className="text-blue-200">رقم الحساب</span>
                    <span className="font-medium">SA03 8000 1234 5678 9012 3456</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-blue-500 pb-2">
                    <span className="text-blue-200">اسم البنك</span>
                    <span className="font-medium">البنك السعودي الفرنسي</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-blue-500 pb-2">
                    <span className="text-blue-200">IBAN</span>
                    <span className="font-medium">SA0380001234567890123456</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-blue-200">الرصيد الحالي</span>
                    <span className="font-bold text-xl">12,450.75 ر.س</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                    <FiDollarSign className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">آخر المعاملات</h3>
                </div>
                
                <div className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-800">{transaction.description}</h4>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <span className={`font-semibold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount} ر.س
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'referrals':
        return (
          <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">عملائي المحالين</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">إحصائيات الإحالات</h3>
                  <FiUsers className="text-2xl text-green-500" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">عدد العملاء المحالين</span>
                    <span className="font-bold text-green-600">24 عميل</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">الإحالات النشطة</span>
                    <span className="font-bold">18 عميل</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">الإحالات المكتملة</span>
                    <span className="font-bold">6 عملاء</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">المكافآت المستحقة</span>
                    <span className="font-bold text-amber-600">1,200 ر.س</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">قائمة العملاء المحالين</h3>
                  <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    إحالة عميل جديد
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-3 px-4">الاسم</th>
                        <th className="py-3 px-4">تاريخ الإحالة</th>
                        <th className="py-3 px-4">الحالة</th>
                        <th className="py-3 px-4">المكافأة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referrals.map((referral, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-green-50">
                          <td className="py-3 px-4">{referral.name}</td>
                          <td className="py-3 px-4">{referral.date}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${referral.status === 'نشط' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                              {referral.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium">{referral.reward}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold">شارك رابط الإحالة الخاص بك واكسب المكافآت</h3>
                  <p className="mt-2 text-green-100">احصل على 50 ريال لكل عميل يحجز خدمة باستخدام رابطك</p>
                </div>
                <div className="flex items-center gap-3 bg-white/20 p-3 rounded-lg w-full md:w-auto">
                  <span className="truncate">https://topshield.com/refer?code=OMAR2023</span>
                  <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium whitespace-nowrap">
                    نسخ الرابط
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">مرحباً بك</h2>
            <p className="text-gray-600">يرجى اختيار قسم من القائمة الجانبية.</p>
          </div>
        );
    }
  };

  // بيانات الخدمات
  const services = [
    {
      id: 'heat-shielding',
      title: 'التظليل العازل للحرارة',
      description: 'أفلام عازلة للحرارة بنسب عالية مع الحفاظ على الرؤية الواضحة',
      price: '350 ر.س',
      icon: <FiSun className="text-2xl" />
    },
    {
      id: 'paint-protection',
      title: 'أفلام حماية الطلاء والكشافات',
      description: 'حماية متقدمة لطلاء السيارة من الخدوش والتآكل',
      price: '1200 ر.س',
      icon: <FaPaintRoller className="text-2xl" />
    },
    {
      id: 'building-glass',
      title: 'تظليل وحماية زجاج المباني',
      description: 'حلول متكاملة لحماية وتظليل زجاج المباني والواجهات',
      price: '85 ر.س/م²',
      icon: <FaBuilding className="text-2xl" />
    },
    {
      id: 'windshield-protection',
      title: 'حماية الزجاج الأمامي',
      description: 'أفلام حماية عالية المقاومة للزجاج الأمامي',
      price: '450 ر.س',
      icon: <FaCar className="text-2xl" />
    },
    {
      id: 'nano-ceramic',
      title: 'نانو سيراميك',
      description: 'طلاء نانو سيراميك متقدم للحماية الدائمة للسيارة',
      price: '1800 ر.س',
      icon: <FiProtection className="text-2xl" />
    },
    {
      id: 'full-package',
      title: 'الباقة الشاملة',
      description: 'جميع خدمات الحماية والتظليل بخصم خاص',
      price: '3200 ر.س',
      icon: <FiStar className="text-2xl" />
    }
  ];

  // بيانات المواعيد
  const appointments = [
    { service: 'تظليل كامل للسيارة', date: '15 أغسطس 2023', time: '10:00 صباحاً', status: 'مؤكد' },
    { service: 'حماية زجاج أمامي', date: '20 أغسطس 2023', time: '5:00 مساءً', status: 'قيد المراجعة' },
    { service: 'نانو سيراميك', date: '25 أغسطس 2023', time: '7:00 مساءً', status: 'مؤكد' }
  ];

  // بيانات المعاملات
  const transactions = [
    { description: 'دفع خدمة تظليل', date: '12 أغسطس 2023', amount: '350', type: 'withdrawal' },
    { description: 'تحويل مكافأة إحالة', date: '10 أغسطس 2023', amount: '50', type: 'deposit' },
    { description: 'دفع خدمة نانو سيراميك', date: '5 أغسطس 2023', amount: '1800', type: 'withdrawal' },
    { description: 'تحويل مكافأة إحالة', date: '1 أغسطس 2023', amount: '50', type: 'deposit' }
  ];

  // بيانات الإحالات
  const referrals = [
    { name: 'أحمد محمد', date: '15 يوليو 2023', status: 'نشط', reward: '50 ر.س' },
    { name: 'سارة عبدالله', date: '22 يوليو 2023', status: 'مكتمل', reward: '50 ر.س' },
    { name: 'خالد سعيد', date: '30 يوليو 2023', status: 'نشط', reward: 'مستحق' },
    { name: 'لينا فارس', date: '5 أغسطس 2023', status: 'نشط', reward: 'مستحق' },
    { name: 'عمر منصور', date: '10 أغسطس 2023', status: 'مكتمل', reward: '50 ر.س' }
  ];

  const menuItems = [
    { id: 'profile', label: 'ملفي الشخصي', icon: <FiUser className="text-xl" /> },
    { id: 'invoices', label: 'فواتيري', icon: <FiFileText className="text-xl" /> },
    { id: 'warranties', label: 'ضماناتي', icon: <FiShield className="text-xl" /> },
    { id: 'new-service', label: 'خدمات جديدة', icon: <FiShoppingCart className="text-xl" /> },
    { id: 'appointments', label: 'الحجوزات والمواعيد', icon: <FiCalendar className="text-xl" /> },
    { id: 'bank', label: 'الحساب البنكي', icon: <FiDollarSign className="text-xl" /> },
    { id: 'referrals', label: 'عملائي المحالين', icon: <FiUsers className="text-xl" /> },
    { id: 'support', label: 'الدعم الفني', icon: <FiHeadphones className="text-xl" /> },
  ];

  return (
    <>
      <Head>
        <title>بوابة عملاء TOPSHIELD - {session.user?.name || 'لوحة التحكم'}</title>
        <meta name="description" content="لوحة تحكم عملاء TOPSHIELD الفاخرة" />
      </Head>
      
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        {/* شريط الهاتف المحمول العلوي */}
        <div className="lg:hidden bg-gradient-to-r from-indigo-700 to-purple-800 text-white p-4 flex justify-between items-center">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors"
          >
            <FiMenu className="text-xl" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
              {session.user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="font-medium">{session.user?.name || 'مستخدم'}</p>
              <p className="text-xs text-indigo-200">العضوية الذهبية</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-1">
          {/* الشريط الجانبي */}
          <aside 
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-indigo-900 to-purple-900 text-white shadow-2xl lg:relative lg:translate-x-0 lg:shadow-none transition-transform duration-300 transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-indigo-800">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-xl">
                      <FaGem className="text-white text-2xl" />
                    </div>
                    <h1 className="text-xl font-bold">TOPSHIELD</h1>
                  </div>
                  <button 
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-2 rounded-lg bg-indigo-800 hover:bg-indigo-700"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 border-b border-indigo-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xl font-bold">
                      {session.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-1">
                      <FaStar className="text-white text-xs" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{session.user?.name || 'مستخدم'}</p>
                    <p className="text-indigo-300 text-sm">{session.user?.email}</p>
                    <div className="mt-1 flex items-center gap-1 text-amber-300">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-800 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-indigo-200">نقاط الولاء</span>
                  <span className="font-bold text-amber-300">1,250 نقطة</span>
                </div>
              </div>
              
              <nav className="flex-1 py-6 px-3 overflow-y-auto">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className={`flex items-center gap-4 w-full p-4 mb-2 rounded-xl transition-all ${
                      activeSection === item.id 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                        : 'text-indigo-200 hover:bg-indigo-800'
                    }`}
                    onClick={() => {
                      setActiveSection(item.id as DashboardSection);
                      setSidebarOpen(false);
                    }}
                  >
                    <div className={`p-2 rounded-lg ${
                      activeSection === item.id 
                        ? 'bg-white text-cyan-600' 
                        : 'bg-indigo-800 text-indigo-300'
                    }`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
              
              <div className="p-4 border-t border-indigo-800">
                <button
                  className="flex items-center gap-4 w-full p-4 text-red-200 hover:bg-indigo-800 rounded-xl"
                  onClick={handleSignOut}
                >
                  <div className="p-2 rounded-lg bg-indigo-800 text-red-400">
                    <FiLogOut className="text-xl" />
                  </div>
                  <span className="font-medium">تسجيل الخروج</span>
                </button>
              </div>
            </div>
          </aside>
          
          {/* المحتوى الرئيسي */}
          <main className="flex-1 lg:p-8 p-4">
            <div className="bg-white lg:rounded-2xl shadow-xl min-h-[calc(100vh-4rem)] p-6">
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
                  مرحباً بك، <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{session.user?.name || session.user?.email}</span>!
                </h1>
                <p className="text-gray-600 mt-2">إليك ملخص لحسابك وأنشطتك الأخيرة</p>
              </div>
              
              {renderSectionContent()}
              
              <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500">
                <p>© 2023 TOPSHIELD. جميع الحقوق محفوظة.</p>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboardPage;