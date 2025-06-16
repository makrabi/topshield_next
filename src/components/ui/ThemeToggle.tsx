'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="ml-4 text-xl p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}
