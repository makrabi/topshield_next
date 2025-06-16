// src/components/sections/home/ServiceRequest.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const ServiceRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: '',
    location: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا سيتم إرسال البيانات إلى الخادم
    console.log('تم إرسال الطلب:', formData);
    alert('تم استلام طلبك بنجاح! سنتواصل معك قريبًا.');
    setFormData({ name: '', phone: '', serviceType: '', location: '' });
  };

  const serviceOptions = [
    { value: 'tinting', label: 'تظليل السيارات' },
    { value: 'ceramic', label: 'طلاء نانو سيراميك' },
    { value: 'protection', label: 'حماية الزجاج' },
    { value: 'building', label: 'عزل المباني' },
    { value: 'other', label: 'خدمة أخرى' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#1a3a5f] to-[#0a192f]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            طلب خدمة
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl max-w-3xl mx-auto opacity-90"
          >
            املأ النموذج وسنتصل بك في أقرب وقت
          </motion.p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="h-1 bg-gradient-to-r from-[#FFD700] to-[#DAA520] rounded-full mx-auto mt-6"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white/5 backdrop-blur-[10px] border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2 text-right">الاسم الكامل</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="ادخل اسمك الكامل"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-lg font-medium mb-2 text-right">رقم الجوال</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="ادخل رقم جوالك"
              />
            </div>
            
            <div>
              <label htmlFor="serviceType" className="block text-lg font-medium mb-2 text-right">نوع الخدمة</label>
              <select
                id="serviceType"
                name="serviceType"
                required
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] appearance-none"
              >
                <option value="">اختر نوع الخدمة</option>
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-lg font-medium mb-2 text-right">الموقع</label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="ادخل موقعك (المدينة والحي)"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#FFD700] to-[#DAA520] text-white font-bold rounded-full hover:from-[#DAA520] hover:to-[#FFD700] transition-all"
            >
              إرسال الطلب
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceRequest;