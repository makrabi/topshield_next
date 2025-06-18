/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },

  // إلغاء i18n لأن الترجمة تتم الآن باستخدام next-intl
  // i18n: { locales: ['en', 'ar'], defaultLocale: 'en' },

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@sections': path.resolve(__dirname, 'src/components/sections'),
      '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
    };
    return config;
  },
};

module.exports = nextConfig;
