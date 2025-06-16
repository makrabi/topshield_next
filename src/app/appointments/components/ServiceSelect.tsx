// src/app/appointments/page.tsx
'use client';

import React, { useState } from 'react';

export default function AppointmentForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    carType: '',
    carModel: '',
    branch: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('تم إرسال الموعد:', form);
    // ضع هنا منطق الإرسال إلى API أو السيرفر
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1D3A] to-[#0E2B5A] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl text-right"
        dir="rtl"
      >
        <h2 className="text-2xl font-bold text-ts-blue-dark mb-2">احجز موعدك</h2>
        <p className="text-gray-500 mb-6">املأ النموذج التالي لتحديد موعدك بكل سهولة.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="الاسم الكامل"
            className="p-3 border border-gray-300 rounded-md"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="رقم الجوال"
            className="p-3 border border-gray-300 rounded-md"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            className="p-3 border border-gray-300 rounded-md"
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            className="p-3 border border-gray-300 rounded-md"
            value={form.time}
            onChange={handleChange}
            required
          />

          <select
            name="service"
            className="p-3 border border-gray-300 rounded-md"
            value={form.service}
            onChange={handleChange}
            required
          >
            <option value="">-- اختر الخدمة --</option>
            <option value="nano-ceramic">عازل حراري نانو سيراميك</option>
            <option value="front-protection">الحماية الأمامية</option>
            <option value="partial-protection">الحماية النصفية</option>
            <option value="full-protection">الحماية الكاملة</option>
            <option value="combined-front">العازل والحماية الأمامية</option>
            <option value="combined-partial">العازل والحماية النصفية</option>
            <option value="combined-full">العازل والحماية الكاملة</option>
            <option value="nano-only">نانو سيراميك فقط</option>
            <option value="maintenance">الصيانة الدورية</option>
          </select>

          <input
            type="text"
            name="carType"
            placeholder="نوع السيارة (مثال: SUV)"
            className="p-3 border border-gray-300 rounded-md"
            value={form.carType}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="carModel"
            placeholder="موديل السيارة (مثال: 2023)"
            className="p-3 border border-gray-300 rounded-md"
            value={form.carModel}
            onChange={handleChange}
            required
          />

          <select
            name="branch"
            className="p-3 border border-gray-300 rounded-md"
            value={form.branch}
            onChange={handleChange}
            required
          >
            <option value="">-- اختر الفرع --</option>
            <option value="dammam">الدمام</option>
            <option value="riyadh">الرياض</option>
            <option value="jeddah">جدة</option>
          </select>

          <textarea
            name="notes"
            placeholder="ملاحظات إضافية (اختياري)"
            className="p-3 border border-gray-300 rounded-md md:col-span-2"
            rows={3}
            value={form.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-6 bg-ts-blue-dark text-white py-3 px-6 rounded-md w-full hover:bg-ts-blue"
        >
          تأكيد الحجز
        </button>
      </form>
    </div>
  );
}
