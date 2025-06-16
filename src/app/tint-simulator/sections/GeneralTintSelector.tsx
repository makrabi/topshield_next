// الكود الكامل والصحيح لملف: src/app/tint-simulator/sections/GeneralTintSelector.tsx
'use client';

// ====> 1. قمنا بإضافة استيراد useState هنا <====
import { useState } from 'react'; 
// ====> 2. قمنا بتصحيح مسار الأنماط هنا <====
import styles from './GeneralTintSelector.module.css';

const TINT_OPTIONS = [
  { value: 0.05, label: '5%', color: 'rgba(20, 20, 20, 0.95)' },
  { value: 0.15, label: '15%', color: 'rgba(30, 30, 30, 0.85)' },
  { value: 0.25, label: '25%', color: 'rgba(40, 40, 40, 0.75)' },
  { value: 0.35, label: '35%', color: 'rgba(50, 50, 50, 0.65)' },
  { value: 0.50, label: '50%', color: 'rgba(60, 60, 60, 0.50)' },
  { value: 0.70, label: '70%', color: 'rgba(80, 80, 80, 0.30)' },
  { value: 0.80, label: '80%', color: 'rgba(100, 100, 100, 0.20)' },
  { value: 1.00, label: 'بدون', color: 'rgba(255, 255, 255, 0.1)' },
];

interface GeneralTintSelectorProps {
  onSelect: (vlt: number) => void;
}

export default function GeneralTintSelector({ onSelect }: GeneralTintSelectorProps) {
  const [selected, setSelected] = useState(TINT_OPTIONS[0].value); // قيمة افتراضية أولى

  const handleSelect = (vlt: number) => {
    setSelected(vlt);
    onSelect(vlt);
  };

  return (
    <section className="control-section mb-4">
      <h3 className="text-base font-bold">2. اختر المظهر العام <span className="text-sm font-normal text-ts-gray-500">(VLT)</span></h3>
      <p className="text-xs text-ts-gray-600 mt-1.5 mb-2 text-center">
        {selected === 1 ? 'التظليل العام المختار: بدون' : `التظليل العام المختار: ${selected * 100}% VLT`}
      </p>
      
      <div className="tint-percentage-options flex flex-row flex-nowrap gap-1.5 overflow-x-auto py-1.5 no-scrollbar">
        {TINT_OPTIONS.map((tint) => (
          <div
            key={tint.value}
            className={`${styles.tintButton} ${selected === tint.value ? styles.selectedTint : ''}`}
            onClick={() => handleSelect(tint.value)}
          >
            <div 
              className={styles.tintSquare} 
              style={{ backgroundColor: tint.color }}
            ></div>
            <span className="tint-value text-xs">{tint.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}