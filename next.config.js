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
    baseApi: process.env.BASE_API || 'http://localhost:5057',
  },
  axios: {
    baseUrl: process.env.BASE_API,
    credentials: true,
    init(axios) {
      axios.defaults.withCredentials = true
    },
  },
  modules: [
    "axios"
  ],
};

module.exports = nextConfig;