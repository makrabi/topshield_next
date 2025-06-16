// الكود الكامل والصحيح لملف: src/app/tint-simulator/sections/VehicleSelector.tsx
'use client';

import { useState } from 'react';
// ====> هذا هو السطر الوحيد الذي تم تصحيحه <====
import styles from './VehicleSelector.module.css';

const VEHICLE_TYPES = [
  { name: 'رياضية', image: 'https://cdn-icons-png.flaticon.com/512/3202/3202162.png' },
  { name: 'سيدان', image: 'https://cdn-icons-png.flaticon.com/512/3202/3202088.png' },
  { name: 'عائلية/دفع رباعي', image: 'https://cdn-icons-png.flaticon.com/512/3069/3069352.png' },
  { name: 'شاحنة', image: 'https://cdn-icons-png.flaticon.com/512/2942/2942732.png' },
];

// تعريف نوع البيانات المرسلة للخارج
interface SelectedCar {
  type: string;
  previewImage: string;
}

interface VehicleSelectorProps {
  onSelect: (car: SelectedCar) => void;
}

export default function VehicleSelector({ onSelect }: VehicleSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (name: string) => {
    setSelected(name);
    // عند الاختيار، نقوم بإرسال كائن يحتوي على النوع ورابط صورة المعاينة
    onSelect({
      type: name,
      previewImage: `https://www.topshieldksa.com/assets/images/cars/${encodeURIComponent(name.toLowerCase())}.png` // مثال على رابط حقيقي
    });
  };

  return (
    <section className="control-section mb-4">
      <h3 className="text-base font-bold">1. اختر نوع المركبة</h3>
      <div className="vehicle-type-options grid grid-cols-4 gap-2 mt-2.5">
        {VEHICLE_TYPES.map((vehicle) => (
          <div
            key={vehicle.name}
            className={`${styles.vehicleOption} ${selected === vehicle.name ? styles.selectedVehicle : ''}`}
            onClick={() => handleSelect(vehicle.name)}
          >
            <img 
              src={vehicle.image} 
              alt={vehicle.name}
              className="w-16 h-10 object-contain mb-1"
            />
            <span className="vehicle-name text-xs font-semibold">{vehicle.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}