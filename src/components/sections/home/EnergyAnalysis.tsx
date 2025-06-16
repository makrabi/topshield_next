'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EnergyAnalysis = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('energy');
      if (element) {
        const rect = element.getBoundingClientRect();
        setInView(rect.top < window.innerHeight * 0.75 && rect.bottom >= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="energy"
      className="py-24 px-4 bg-gradient-to-r from-[#0B1D3A] to-[#1C3F63] text-white overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4 drop-shadow-md">
            تحليل الطاقة الذكي
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            اكتشف كيف تساهم تقنيات TOPSHIELD في خفض استهلاك الطاقة بنسبة كبيرة، وتقليل درجة الحرارة الداخلية، مما ينعكس مباشرةً على فاتورتك الشهرية وراحتك اليومية.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* مقارنة الأداء */}
          <motion.div
            className="bg-white/10 rounded-2xl p-6 backdrop-blur-lg border border-white/20 shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-center mb-10 text-cyan-300">
              قبل وبعد استخدام تقنيات TOPSHIELD
            </h3>

            <div className="flex justify-around items-end h-72 mb-12">
              <motion.div
                className="relative w-16 bg-[#E63946] rounded-t-lg"
                style={{ height: '280px' }}
                initial={{ height: 0 }}
                animate={inView ? { height: '280px' } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="absolute -top-10 w-full text-center font-bold text-white">48°C</div>
                <div className="absolute -bottom-10 w-full text-center font-bold">بدون توبشيلد</div>
              </motion.div>

              <motion.div
                className="relative w-16 bg-[#1D3557] rounded-t-lg"
                style={{ height: '160px' }}
                initial={{ height: 0 }}
                animate={inView ? { height: '160px' } : {}}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div className="absolute -top-10 w-full text-center font-bold text-white">22°C</div>
                <div className="absolute -bottom-10 w-full text-center font-bold">مع توبشيلد</div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <motion.div
                className="bg-[#E63946]/20 border border-[#E63946] rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <h4 className="text-xl font-bold mb-3">الفاتورة قبل</h4>
                <div className="text-3xl font-extrabold text-[#E63946] mb-2">1,200 ر.س</div>
                <p className="text-sm opacity-80">متوسط شهري بدون حلول عزل</p>
              </motion.div>

              <motion.div
                className="bg-[#1D3557]/20 border border-[#1D3557] rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <h4 className="text-xl font-bold mb-3">الفاتورة بعد</h4>
                <div className="text-3xl font-extrabold text-cyan-300 mb-2">720 ر.س</div>
                <p className="text-sm opacity-80">مع حلول TOPSHIELD</p>
                <div className="mt-2 text-yellow-300 font-bold">توفير 40% شهريًا</div>
              </motion.div>
            </div>
          </motion.div>

          {/* تتبع درجة الحرارة والتوفير */}
          <motion.div
            className="bg-white/10 rounded-2xl p-6 backdrop-blur-lg border border-white/20 shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-center mb-10 text-cyan-300">
              تتبع درجات الحرارة
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-[#E63946]/20 border border-[#E63946] rounded-xl p-6 text-center">
                <h4 className="text-lg font-bold mb-2">الخارجية</h4>
                <div className="text-4xl font-bold text-[#E63946]">48°C</div>
                <p className="text-sm">درجة الحرارة في الخارج</p>
              </div>

              <div className="bg-[#1D3557]/20 border border-[#1D3557] rounded-xl p-6 text-center">
                <h4 className="text-lg font-bold mb-2">الداخلية</h4>
                <div className="text-4xl font-bold text-cyan-300">22°C</div>
                <p className="text-sm">بعد تركيب العازل</p>
              </div>
            </div>

            {/* مؤشر الحرارة البصري */}
            <div className="mt-8">
              <div className="h-8 bg-gradient-to-r from-[#E63946] to-[#1D3557] rounded-full relative">
                <div className="absolute top-0 bottom-0 w-1 bg-white left-1/3 transform -translate-x-1/2 shadow-lg"></div>
              </div>

              <div className="flex justify-between mt-4 text-sm text-white font-bold">
                <span>22°C</span>
                <span>30°C</span>
                <span>38°C</span>
                <span>46°C</span>
              </div>
            </div>

            {/* الرسم البياني للتوفير */}
            <div className="mt-16">
              <h4 className="text-2xl font-bold text-center mb-6 text-yellow-300">
                التوفير الشهري
              </h4>

              <div className="flex justify-around items-end h-52">
                {[40, 42, 45, 48, 50].map((value, index) => (
                  <motion.div
                    key={index}
                    className="w-12 bg-[#1D3557] rounded-t-lg relative"
                    style={{ height: `${value * 4}px` }}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${value * 4}px` } : {}}
                    transition={{ duration: 1, delay: 0.3 * index }}
                  >
                    <div className="absolute -top-8 w-full text-center font-bold text-yellow-300">
                      {value}%
                    </div>
                    <div className="absolute -bottom-10 w-full text-center font-bold">
                      الشهر {index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnergyAnalysis;
