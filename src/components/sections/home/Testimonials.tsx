'use client';

import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'جابر الأحمد',
      role: 'مالك شركة نقل',
      content:
        'بعد تركيب أفلام توبشيلد لأسطول الشركة، انخفض استهلاك الوقود بنسبة 25%. تجربة الركاب تحسّنت والراحة ارتفعت بشكل ملحوظ.',
      rating: 5,
    },
    {
      name: 'نورة الفهد',
      role: 'مديرة مدرسة',
      content:
        'الفصول أصبحت أكثر راحة وهدوءًا بفضل حلول العزل الحراري من توبشيلد. الطلاب والمعلمات لاحظوا الفرق من أول أسبوع.',
      rating: 5,
    },
    {
      name: 'خالد الرشيد',
      role: 'مدير عقارات',
      content:
        'قللنا فواتير الكهرباء في المجمع بنسبة 40% بعد تركيب العزل من توبشيلد. جودة، احترافية، ونتائج ملموسة.',
      rating: 4,
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gradient-to-b from-[#1a3a5f] to-[#0a192f] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">آراء عملائنا</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            تجارب حقيقية تثبت نجاحنا في تقديم حلول فعّالة ونتائج ملموسة
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-yellow-500/20 transition duration-300"
            >
              <div className="absolute text-6xl opacity-10 -top-2 left-4">❝</div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-white/30'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-white/90 mb-6 leading-relaxed">{testimonial.content}</p>
              <div>
                <h3 className="text-xl font-bold">{testimonial.name}</h3>
                <p className="text-white/60">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
