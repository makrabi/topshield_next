import React from 'react';
import { LABEL_TEXT_COLOR_CONST } from './formConstants'; // استيراد الثابت

export const FieldRow: React.FC<{
  label: string;
  htmlFor: string;
  colSpan?: number;
  labelWidthClass?: string;
  inputWidthClass?: string;
  children: React.ReactNode;
  className?: string;
  isOptional?: boolean;
}> = ({ label, htmlFor, colSpan = 6, labelWidthClass = 'sm:w-1/3', inputWidthClass = 'sm:w-2/3', children, className, isOptional }) => {
  return (
    <div className={`sm:col-span-${colSpan} ${className || ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:flex-row-reverse mb-4 sm:mb-3">
        <label htmlFor={htmlFor} className={`block text-sm font-medium leading-6 ${LABEL_TEXT_COLOR_CONST} ${labelWidthClass} sm:text-left sm:mr-3 mb-1 sm:mb-0 whitespace-nowrap`}>
          {label}{isOptional && <span className="text-xs text-gray-500 mr-1">(اختياري)</span>}:
        </label>
        <div className={`w-full ${inputWidthClass}`}>
          {children}
        </div>
      </div>
    </div>
  );
};