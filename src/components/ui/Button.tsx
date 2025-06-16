import React from 'react';

// تعريف الأحجام المدعومة
type ButtonSize = 'sm' | 'md' | 'lg';

// تعريف أنواع الزر - تمت إضافة 'danger'
type ButtonVariant = 'primary' | 'outline' | 'secondary' | 'danger';

// تعريف props المكون
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant; // الآن يدعم primary / outline / secondary / danger
  href?: string;
  className?: string;
  size?: ButtonSize;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  className,
  size = 'md',
  isLoading = false,
  onClick,
  ...props
}) => {
  const baseClasses = 'btn transition-all duration-200 flex items-center justify-center gap-2 rounded-md';
  
  // كلاسات لكل نوع من الـ variant
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  // كلاسات لكل حجم
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // إذا كان الزر قيد التحميل
  const loadingClasses = isLoading ? 'opacity-70 cursor-not-allowed' : '';

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loadingClasses} ${className || ''}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        onClick={isLoading ? (e) => e.preventDefault() : onClick as React.MouseEventHandler<HTMLAnchorElement>}
        rel="noopener noreferrer"
      >
        {isLoading && (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        )}
        {children}
      </a>
    );
  }

  return (
    <button
      className={combinedClassName}
      onClick={isLoading ? undefined : onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      )}
      {children}
    </button>
  );
};

export default Button;