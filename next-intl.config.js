// next-intl.config.js
const { getRequestConfig } = require('next-intl/server');

module.exports = getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./src/messages/${locale}/index.ts`)).default
}));