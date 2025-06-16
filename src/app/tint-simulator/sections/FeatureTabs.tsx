// الكود الكامل والصحيح لملف: src/app/tint-simulator/sections/FeatureTabs.tsx
'use client';

import React, { useState } from 'react';
// ====> هذا هو السطر الوحيد الذي تم تصحيحه <====
import styles from './FeatureTabs.module.css';

const FEATURE_TABS = [
  { id: 'overview', title: 'نظرة عامة', icon: 'fas fa-globe' },
  { id: 'precision', title: 'القص بالكمبيوتر', icon: 'fas fa-cut' },
  { id: 'specs', title: 'المواصفات التقنية', icon: 'fas fa-microscope' },
  { id: 'benefits', title: 'المزايا', icon: 'fas fa-star' },
];

const FEATURE_CONTENT = {
  overview: {
    title: 'نظرة عامة على منتجاتنا',
    description: 'تقدم شركة Topshield حلولاً متطورة للحماية والتظليل للسيارات، باستخدام أحدث التقنيات العالمية وأعلى جودة من المواد التي تضمن حماية فائقة ومظهرًا جماليًا يدوم.',
    features: [
      { icon: 'fas fa-medal', title: 'جودة عالمية', description: 'منتجاتنا مصنوعة وفق أعلى معايير الجودة العالمية ومرخصة من أفضل المنظمات الدولية.' },
      { icon: 'fas fa-tools', title: 'تركيب احترافي', description: 'فريقنا من الفنيين مدرب على أعلى مستوى لضمان تركيب دقيق ومثالي بدون أي عيوب.' },
      { icon: 'fas fa-shield-alt', title: 'ضمان ممتد', description: 'نثق في جودة منتجاتنا، لذلك نقدم ضمانًا طويل الأمد يمنحك راحة البال التامة.' },
    ]
  },
  precision: {
    title: 'دقة لا تضاهى مع القص بالكمبيوتر',
    description: 'نستخدم أحدث أجهزة القص بالكمبيوتر لقص أفلام الحماية والتظليل بما يتناسب تمامًا مع أبعاد سيارتك، مما يضمن تطابقًا مثاليًا وحوافًا نظيفة.',
    features: [
      { icon: 'fas fa-car', title: 'مطابق لموديل سيارتك', description: 'قاعدة بياناتنا تحتوي على آلاف الموديلات لضمان قص دقيق لسيارتك تحديدًا.' },
      { icon: 'fas fa-tachometer-alt', title: 'سرعة في الإنجاز', description: 'القص بالكمبيوتر يقلل من وقت التركيب بشكل كبير مع زيادة في الدقة والجودة.' },
      { icon: 'far fa-thumbs-up', title: 'بدون شفرات حادة', description: 'لا نستخدم أي شفرات حادة على طلاء أو زجاج سيارتك، مما يضمن سلامتها التامة.' },
    ]
  },
  specs: { title: 'المواصفات التقنية', description: 'محتوى المواصفات التقنية...', features: [] },
  benefits: { title: 'المزايا', description: 'محتوى المزايا...', features: [] },
};

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState('overview');
  const content = FEATURE_CONTENT[activeTab as keyof typeof FEATURE_CONTENT];

  return (
    <section className={styles.featureSection}>
      <div className="container mx-auto px-4">
        <div className={styles.featureTabs}>
          {FEATURE_TABS.map(tab => (
            <div 
              key={tab.id}
              className={`${styles.featureTab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </div>
          ))}
        </div>

        {content && (
           <div className={styles.featureContent}>
            <div className={styles.featureIcon}>
              <i className={FEATURE_TABS.find(t => t.id === activeTab)?.icon}></i>
            </div>
            <h3 className={styles.featureTitle}>{content.title}</h3>
            <p className={styles.featureDescription}>{content.description}</p>

            {content.features.length > 0 && (
              <div className={styles.featureGrid}>
                {content.features.map((feature, index) => (
                  <div key={index} className={styles.featureCard}>
                    <div className={styles.icon}><i className={feature.icon}></i></div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}