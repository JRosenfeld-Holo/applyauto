import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', '@prisma/adapter-pg', 'pg'],
  webpack: (config) => {
    // react-pdf uses canvas which isn't available in Next.js SSR
    config.resolve.alias.canvas = false
    return config
  },
  turbopack: {},
}

export default nextConfig
