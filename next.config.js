/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },

  // ❌ تم حذف i18n لأنها غير مدعومة في App Router
  // تعتمد الترجمة الآن على مكتبة next-intl

  experimental: {
    optimizePackageImports: ['@/components', '@/core', '@/i18n'],
  },
};

module.exports = nextConfig;
