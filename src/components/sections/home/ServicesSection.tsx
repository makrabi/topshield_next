'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServicesSection = () => {
  const services: ServiceItem[] = [
    {
      icon: '🚗',
      title: 'السيارات',
      description: 'حلول حماية شاملة للسيارات ضد الخدوش والتآكل.',
    },
    {
      icon: '🏠',
      title: 'المباني',
      description: 'عزل حراري وحماية زجاج للمباني السكنية والتجارية.',
    },
    {
      icon: '✈️',
      title: 'الطائرات',
      description: 'طلاءات حماية متقدمة لهياكل الطائرات.',
    },
    {
      icon: '⛵',
      title: 'البحرية',
      description: 'حماية مقاومة للتآكل للقوارب واليخوت الفاخرة.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const, // ✅ تم التصحيح هنا
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a192f] to-[#1a3a5f]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
          >
            خدماتنا المتكاملة
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xl max-w-3xl mx-auto opacity-90"
          >
            نقدم حلولًا مبتكرة تناسب كل القطاعات.
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-[10px] border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
            >
              <div className="text-4xl mb-5">{service.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-white/80">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;