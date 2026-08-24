/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    typedRoutes: false,
  },
  env: {
    baseApi: process.env.BASE_API || 'https://apitesting.cafencode.ddns.net',
  },
};

module.exports = nextConfig;
