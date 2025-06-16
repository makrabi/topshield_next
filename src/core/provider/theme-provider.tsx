'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// يمكنك تعريف نوعك مباشرة هنا إذا كنت تريد
interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: string;
  forcedTheme?: string;
  disableTransitionOnChange?: boolean;
  enableSystem?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}