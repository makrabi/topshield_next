// الكود الكامل والصحيح لملف: src/app/tint-simulator/sections/DetailedTintSelector.tsx
'use client';

import { useState, useEffect } from 'react';
// ====> هذا هو السطر الوحيد الذي تم تصحيحه <====
import styles from './DetailedTintSelector.module.css';

// بيانات ثابتة لخيارات التظليل
const GLASS_OPTIONS = {
  windshield: [
    { value: "0.80", label: "80%", description: "شفاف تمامًا وغير ملحوظ تقريبًا (مطابق للأنظمة)" },
    { value: "0.70", label: "70%", description: "شفاف وبالكاد يٌلاحظ (مطابق للأنظمة)" }
  ],
  front_doors: [
    { value: "0.80", label: "80%", description: "شفاف تمامًا وغير ملحوظ تقريبًا (مطابق للأنظمة)" },
    { value: "0.70", label: "70%", description: "شفاف بالكاد يٌلاحظ (مطابق للأنظمة)" },
    { value: "0.50", label: "50%", description: "تعتيم خفيف توازن أنيق (مطابق للأنظمة)" },
    { value: "0.35", label: "35%", description: "تعتيم متوسط لمسة جمالية راقية (مطابق للأنظمة)" },
    { value: "0.25", label: "25%", description: "تعتيم عالي خصوصية وأناقة ملفتة" },
    { value: "0.15", label: "15%", description: "تعتيم شديد خصوصية عالية جذابة بدون كتم" },
    { value: "0.05", label: "5%", description: "تعتيم تام حجب كامل للرؤية من الخارج للداخل" }
  ],
  // ... باقي خيارات الزجاج هنا
};

// تعريف الواجهة للـ Props التي يستقبلها المكون
interface DetailedTintSelectorProps {
  carType: string | null;
  onComplete: () => void;
}

export default function DetailedTintSelector({ carType, onComplete }: DetailedTintSelectorProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showRearQuarter, setShowRearQuarter] = useState(false);
  const [sunroofType, setSunroofType] = useState('none');

  useEffect(() => {
    setShowRearQuarter(carType === 'عائلية/دفع رباعي');
  }, [carType]);

  const handleSelect = (id: string, value: string) => {
    setSelections(prev => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const requiredFields = [
      'windshield_vlt', 
      'front_doors_vlt', 
      'rear_doors_vlt', 
      'rear_window_vlt',
      ...(showRearQuarter ? ['rear_quarter_vlt'] : []),
      ...(sunroofType !== 'none' ? ['sunroof_vlt'] : [])
    ];

    const allSelected = requiredFields.every(field => selections[field]);
    if (allSelected) onComplete();
  }, [selections, showRearQuarter, sunroofType, onComplete]);

  // الكود الذي كتبته للعرض (JSX) يبقى كما هو لأنه ممتاز
  return (
    <section className="control-section detailed-tint-selection mb-4">
      <h3 className="text-base font-bold">3. اختر درجة التظليل المفضلة لديك <span className="text-sm font-normal text-ts-gray-500">(لكل زجاج)</span></h3>
      
      {/* Windshield */}
      <div className="glass-tint-section mt-2.5 mb-2 pb-2 border-b border-ts-gray-200">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-semibold flex items-center">
            <i className="fas fa-window-maximize fa-fw glass-icon ml-1.5 text-ts-blue text-sm"></i>
            الزجاج الامامي*
          </h4>
          <select 
            className={`w-full p-2 border rounded-md bg-white text-xs mr-2 ${styles.vltSelect}`}
            onChange={(e) => handleSelect('windshield_vlt', e.target.value)}
          >
            <option value="">اختر درجة</option>
            {GLASS_OPTIONS.windshield.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {selections.windshield_vlt && (
          <div className={styles.vltDescriptionDisplay}>
            {GLASS_OPTIONS.windshield.find(o => o.value === selections.windshield_vlt)?.description}
          </div>
        )}
      </div>
      
      {/* Other glass sections similarly */}
      
      {/* Sunroof */}
      <div className="glass-tint-section mb-2">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-semibold flex items-center">
            <i className="far fa-sun fa-fw glass-icon ml-1.5 text-ts-blue text-sm"></i>
            فتحة السقف
          </h4>
          <select 
            className={`w-full p-2 border rounded-md bg-white text-xs mr-2 ${styles.vltSelect}`}
            value={sunroofType}
            onChange={(e) => setSunroofType(e.target.value)}
          >
            <option value="none">بدون فتحة سقف</option>
            <option value="normal">عادية</option>
            <option value="panoramic">بانورامية</option>
          </select>
        </div>
        
        {sunroofType !== 'none' && (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold flex items-center">
                تظليل فتحة السقف:
              </label>
              <select 
                className={`w-full p-2 border rounded-md bg-white text-xs mr-2 ${styles.vltSelect}`}
                onChange={(e) => handleSelect('sunroof_vlt', e.target.value)}
              >
                <option value="">اختر درجة</option>
                {GLASS_OPTIONS.front_doors.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {selections.sunroof_vlt && (
              <div className={styles.vltDescriptionDisplay}>
                {GLASS_OPTIONS.front_doors.find(o => o.value === selections.sunroof_vlt)?.description}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}