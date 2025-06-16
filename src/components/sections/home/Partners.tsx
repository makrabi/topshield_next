'use client';

import React from 'react';

export default function Partners() {
  const partners = [
    { name: 'أرامكو', logo: '🛢️' },
    { name: 'سابك', logo: '🧪' },
    { name: 'STC', logo: '📡' },
    { name: 'المراعي', logo: '🥛' },
    { name: 'الخطوط السعودية', logo: '✈️' },
    { name: 'وزارة الدفاع', logo: '🛡️' },
  ];

  return (
    <section id="partners" className="py-20 md:py-28 bg-gradient-to-b from-[#0a192f] to-[#1a3a5f] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            شركاؤنا الاستراتيجيون
          </h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            نفتخر بثقة أكبر المؤسسات والشركات الوطنية التي اختارت توبشيلد كشريك للحماية والتميز
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center h-36 hover:scale-105 hover:shadow-yellow-400/20 transition-transform duration-300"
            >
              <div className="text-4xl mb-2">{partner.logo}</div>
              <h3 className="text-lg font-semibold text-center">{partner.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
