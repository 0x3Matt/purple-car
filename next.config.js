/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable static optimization where possible
  swcMinify: true,
  // Ensure proper handling of API routes
  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig;
