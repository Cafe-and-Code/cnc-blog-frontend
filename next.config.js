/** @type {import('next').NextConfig} */
/* tslint:disable no-var-requires */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  experimental: {
    typedRoutes: true,
  },
  env: {
    baseApi: process.env.BASE_API || 'https://apitesting.cafencode.ddns.net',
  }
};

module.exports = nextConfig;