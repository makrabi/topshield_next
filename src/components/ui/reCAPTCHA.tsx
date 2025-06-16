// components/ui/reCAPTCHA.tsx
'use client';

import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ReCAPTCHAComponent({ onChange }: { onChange: (token: string | null) => void }) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleRecaptchaChange = (token: string | null) => {
    setIsVerified(!!token);
    onChange(token);
  };

  return (
    <div className="mb-6">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={handleRecaptchaChange}
      />
    </div>
  );
}