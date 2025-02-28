/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure server actions properly
  experimental: {
    serverActions: {
      enabled: true
    }
  },
  // Configure image domains for OpenGraph images
  images: {
    domains: ['fonts.gstatic.com'],
  }
};

module.exports = nextConfig;
