"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا تضع منطق إرسال البيانات إلى الـ backend
    console.log("Registering user:", formData);
  };

  return (
    <section className="min-h-screen bg-[url('/images/topshield-login-bg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-topshield-navy mb-1">إنشاء حساب جديد</h1>
          <p className="text-sm text-gray-600">يرجى تعبئة البيانات التالية لإتمام التسجيل</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
            placeholder="اسم المستخدم"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-topshield-gold-accent focus:outline-none"
          />
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-topshield-gold-accent focus:outline-none"
          />
          <input
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="رقم الجوال"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-topshield-gold-accent focus:outline-none"
          />
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="كلمة المرور"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-topshield-gold-accent focus:outline-none"
          />
          <input
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="تأكيد كلمة المرور"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-topshield-gold-accent focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-topshield-navy hover:bg-topshield-navy-hover text-white font-semibold py-2 px-4 rounded-md transition"
          >
            تسجيل
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          لديك حساب بالفعل؟{" "}
          <Link href="/account" className="text-topshield-gold-accent hover:underline font-medium">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </section>
  );
}
