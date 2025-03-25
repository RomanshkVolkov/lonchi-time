import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['[::1]']
  /* config options here */
};

export default nextConfig;
