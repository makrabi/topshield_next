declare module 'react-google-recaptcha' {
  import React from 'react';

  interface ReCAPTCHAProps {
    ref?: React.Ref<ReCAPTCHA>;
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    onErrored?: () => void;
    size?: 'compact' | 'normal' | 'invisible';
    theme?: 'light' | 'dark';
  }

  class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {
    reset(): void;
    execute(): void;
    executeAsync(): Promise<string | null>;
  }

  export default ReCAPTCHA;
}