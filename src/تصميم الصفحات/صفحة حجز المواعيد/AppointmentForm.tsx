// src/app/appointments/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCar, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCheck, FaTimes } from 'react-icons/fa';

export default function AppointmentForm() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    carBrand: '',
    carType: '',
    carColor: '',
    carYear: '',
    plateNumber: '',
    service: '',
    date: '',
    time: '',
    branch: '',
    notes: '',
  });

  const [timeSlots, setTimeSlots] = useState<{time: string, display: string, available: boolean}[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedStep, setSelectedStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (name === 'date') {
      setSelectedDate(value);
      generateTimeSlots();
    }
  };

  const generateTimeSlots = () => {
    const morningSlots = [];
    const eveningSlots = [];
    
    // Generate morning slots (8:00 AM to 11:30 AM)
    for (let hour = 8; hour <= 11; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const display = `${hour}:${minute === 0 ? '00' : '30'} صباحاً`;
        
        // Simulate some booked slots (randomly)
        const available = Math.random() > 0.3;
        
        morningSlots.push({ time, display, available });
      }
    }
    
    // Generate evening slots (4:00 PM to 9:30 PM)
    for (let hour = 16; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 21 && minute === 30) break;
        
        const displayHour = hour > 12 ? hour - 12 : hour;
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const display = `${displayHour}:${minute === 0 ? '00' : '30'} مساءً`;
        
        // Simulate some booked slots (randomly)
        const available = Math.random() > 0.4;
        
        eveningSlots.push({ time, display, available });
      }
    }
    
    setTimeSlots([...morningSlots, ...eveningSlots]);
  };

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    // Generate next 14 days
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    setAvailableDates(dates);
    setSelectedDate(dates[0]);
    setForm(prev => ({ ...prev, date: dates[0] }));
  };

  useEffect(() => {
    generateAvailableDates();
    generateTimeSlots();
  }, []);

  const handleTimeSelect = (time: string) => {
    setForm({ ...form, time });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('تم إرسال الموعد:', form);
    
    // Show success animation
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const carBrands = [
    'تويوتا', 'نيسان', 'هيونداي', 'كيا', 'فورد', 
    'شيفروليه', 'مرسيدس', 'بي إم دبليو', 'أودي', 'فولكس فاجن'
  ];

  const carTypes = [
    'سيدان', 'SUV', 'كروس أوفر', 'هايبرد', 'كهربائي',
    'هاتشباك', 'كوبيه', 'بيك أب', 'فان', 'رياضية'
  ];

  const services = [
    { value: 'nano-ceramic', label: 'عازل حراري نانو سيراميك' },
    { value: 'front-protection', label: 'الحماية الأمامية' },
    { value: 'partial-protection', label: 'الحماية النصفية' },
    { value: 'full-protection', label: 'الحماية الكاملة' },
    { value: 'combined-front', label: 'العازل والحماية الأمامية' },
    { value: 'combined-partial', label: 'العازل والحماية النصفية' },
    { value: 'combined-full', label: 'العازل والحماية الكاملة' },
    { value: 'nano-only', label: 'نانو سيراميك فقط' },
    { value: 'maintenance', label: 'الصيانة الدورية' },
  ];

  const branches = [
    { value: 'dammam', label: 'الدمام' },
    { value: 'riyadh', label: 'الرياض' },
    { value: 'jeddah', label: 'جدة' },
    { value: 'khobar', label: 'الخبر' },
    { value: 'medina', label: 'المدينة المنورة' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2a53] to-[#0c3263] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="text-[#4da6ff]">احجز موعد تركيب</span> الخدمات الآن
          </h1>
          <p className="text-[#a8c6ff] max-w-2xl mx-auto">
            تمتع بأفضل خدمات حماية وتجميل السيارات مع توبشيلد. احجز موعدك الآن واستفد من عروضنا الحصرية وخدمة العملاء المميزة
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="flex bg-gray-100 p-2">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => setSelectedStep(step)}
                className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-all ${
                  selectedStep === step 
                    ? 'bg-[#0a2a53] text-white shadow-md' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {step === 1 && 'معلومات العميل'}
                {step === 2 && 'بيانات المركبة'}
                {step === 3 && 'تفاصيل الحجز'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8" dir="rtl">
            {isSubmitted ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <FaCheck className="text-green-600 text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">تم الحجز بنجاح!</h3>
                <p className="text-gray-600 mb-6">
                  شكراً لحجزك مع توبشيلد. سيتصل بك فريقنا قريباً لتأكيد الموعد
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[#0a2a53] text-white py-2 px-6 rounded-lg hover:bg-[#0c3263] transition"
                >
                  حجز جديد
                </button>
              </motion.div>
            ) : (
              <>
                {/* Step 1: Customer Info */}
                {selectedStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-100 p-3 rounded-full mr-3">
                        <FaMapMarkerAlt className="text-blue-600 text-xl" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">معلومات العميل</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">الاسم الكامل</label>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="أدخل اسمك بالكامل"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={form.fullName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">رقم الجوال</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="05XXXXXXXX"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={form.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2">العنوان</label>
                        <input
                          type="text"
                          name="address"
                          placeholder="أدخل عنوانك بالتفصيل"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={form.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition"
                        disabled
                      >
                        السابق
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedStep(2)}
                        className="bg-[#0a2a53] text-white py-2 px-6 rounded-lg hover:bg-[#0c3263] transition flex items-center"
                      >
                        التالي
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 2: Vehicle Info */}
                {selectedStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-100 p-3 rounded-full mr-3">
                        <FaCar className="text-blue-600 text-xl" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">بيانات المركبة</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">ماركة السيارة</label>
                        <select
                          name="carBrand"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={form.carBrand}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- اختر الماركة --</option>
                          {carBrands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">نوع السيارة</label>
                        <select
                          name="carType"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={form.carType}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- اختر النوع --</option>
                          {carTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">لون السيارة</label>
                        <input
                          type="text"
                          name="carColor"
                          placeholder="أدخل لون السيارة"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={form.carColor}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">سنة الصنع</label>
                        <input
                          type="number"
                          name="carYear"
                          placeholder="سنة الصنع"
                          min="1990"
                          max={new Date().getFullYear()}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={form.carYear}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">رقم اللوحة</label>
                        <input
                          type="text"
                          name="plateNumber"
                          placeholder="أدخل رقم اللوحة"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={form.plateNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={() => setSelectedStep(1)}
                        className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        السابق
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedStep(3)}
                        className="bg-[#0a2a53] text-white py-2 px-6 rounded-lg hover:bg-[#0c3263] transition flex items-center"
                      >
                        التالي
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 3: Appointment Details */}
                {selectedStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-100 p-3 rounded-full mr-3">
                        <FaCalendarAlt className="text-blue-600 text-xl" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">تفاصيل الحجز</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">الخدمة المطلوبة</label>
                        <select
                          name="service"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={form.service}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- اختر الخدمة --</option>
                          {services.map((service) => (
                            <option key={service.value} value={service.value}>{service.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">الفرع</label>
                        <select
                          name="branch"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={form.branch}
                          onChange={handleChange}
                          required
                        >
                          <option value="">-- اختر الفرع --</option>
                          {branches.map((branch) => (
                            <option key={branch.value} value={branch.value}>{branch.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2 flex items-center">
                          <FaCalendarAlt className="ml-2 text-gray-500" />
                          التاريخ
                        </label>
                        <select
                          name="date"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={form.date}
                          onChange={handleChange}
                          required
                        >
                          {availableDates.map(date => (
                            <option key={date} value={date}>
                              {new Date(date).toLocaleDateString('ar-SA', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2 flex items-center">
                          <FaClock className="ml-2 text-gray-500" />
                          الأوقات المتاحة
                        </label>
                        
                        {/* Time Slot Grid */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                          <h3 className="text-center font-bold text-gray-700 mb-4">
                            الأوقات المتاحة ليوم {selectedDate && new Date(selectedDate).toLocaleDateString('ar-SA')}
                          </h3>
                          
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {timeSlots.map((slot) => (
                              <button
                                key={slot.time}
                                type="button"
                                onClick={() => handleTimeSelect(slot.time)}
                                disabled={!slot.available}
                                className={`p-3 rounded-lg text-center transition-all transform hover:scale-105 ${
                                  form.time === slot.time
                                    ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                                    : slot.available
                                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                              >
                                <div className="flex flex-col items-center">
                                  <span className="font-medium">{slot.display}</span>
                                  {!slot.available && (
                                    <span className="text-xs text-red-500 mt-1 flex items-center">
                                      <FaTimes className="mr-1" /> محجوز
                                    </span>
                                  )}
                                  {form.time === slot.time && (
                                    <span className="text-xs mt-1 flex items-center">
                                      <FaCheck className="mr-1" /> محجوز لك
                                    </span>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                          
                          <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                            <div className="flex items-center mr-6">
                              <div className="w-4 h-4 bg-blue-100 rounded mr-2"></div>
                              <span>متاح</span>
                            </div>
                            <div className="flex items-center mr-6">
                              <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
                              <span>محدد</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                              <span>محجوز</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2">ملاحظات إضافية</label>
                        <textarea
                          name="notes"
                          placeholder="ملاحظات إضافية (اختياري)"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                          value={form.notes}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
                      <h3 className="font-bold text-blue-800 mb-2">معلومات الحجز</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex">
                          <span className="text-gray-600 w-28">الاسم:</span>
                          <span className="font-medium">{form.fullName || '--'}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-600 w-28">الجوال:</span>
                          <span className="font-medium">{form.phone || '--'}</span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-600 w-28">المركبة:</span>
                          <span className="font-medium">
                            {form.carBrand && form.carType ? `${form.carBrand} - ${form.carType}` : '--'}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-600 w-28">الخدمة:</span>
                          <span className="font-medium">
                            {services.find(s => s.value === form.service)?.label || '--'}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-600 w-28">الموعد:</span>
                          <span className="font-medium">
                            {form.date && form.time ? `${form.date} - ${form.time}` : '--'}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="text-gray-600 w-28">الفرع:</span>
                          <span className="font-medium">
                            {branches.find(b => b.value === form.branch)?.label || '--'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={() => setSelectedStep(2)}
                        className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        السابق
                      </button>
                      <button
                        type="submit"
                        disabled={!form.time}
                        className={`py-3 px-8 rounded-lg transition shadow-lg flex items-center ${
                          form.time
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        تأكيد الحجز
                        <FaCheck className="mr-2" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </form>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-900 bg-opacity-30 p-5 rounded-xl border border-blue-700 border-opacity-30">
            <div className="flex items-center mb-3">
              <div className="bg-blue-500 bg-opacity-20 p-2 rounded-lg mr-3">
                <FaCalendarAlt className="text-blue-300 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-white">مواعيد مرنة</h3>
            </div>
            <p className="text-blue-100">
              اختر الموعد الذي يناسبك من 8 صباحاً حتى 11:30 ظهراً، ومن 4 عصراً حتى 9:30 مساءً
            </p>
          </div>
          
          <div className="bg-blue-900 bg-opacity-30 p-5 rounded-xl border border-blue-700 border-opacity-30">
            <div className="flex items-center mb-3">
              <div className="bg-blue-500 bg-opacity-20 p-2 rounded-lg mr-3">
                <FaCar className="text-blue-300 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-white">خدمة احترافية</h3>
            </div>
            <p className="text-blue-100">
              فريق فني مدرب بأعلى المعايير لتركيب خدماتنا بجودة ودقة عالية
            </p>
          </div>
          
          <div className="bg-blue-900 bg-opacity-30 p-5 rounded-xl border border-blue-700 border-opacity-30">
            <div className="flex items-center mb-3">
              <div className="bg-blue-500 bg-opacity-20 p-2 rounded-lg mr-3">
                <FaCheck className="text-blue-300 text-xl" />
              </div>
              <h3 className="text-lg font-bold text-white">ضمان الجودة</h3>
            </div>
            <p className="text-blue-100">
              نضمن لك جودة الخدمات المقدمة مع شهادة ضمان معتمدة لمدة عام كامل
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}