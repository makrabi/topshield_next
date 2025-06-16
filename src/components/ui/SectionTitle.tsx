// components/ui/SectionTitle.tsx
import React from 'react';
// import styles from './SectionTitle.module.css'; // إذا استخدمت CSS Modules

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className }) => {
  return (
    <div className={`section-title ${className || ''}`}> {/* الأنماط في globals.css */}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;