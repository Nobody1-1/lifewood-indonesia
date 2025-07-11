import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Optimasi untuk Vercel
  experimental: {
    optimizePackageImports: ['react-icons', 'react-leaflet'],
  },
  
  // Kompresi dan caching
  compress: true,
  
  // Optimasi images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['https://cunbadlzavpnzlnjmlj.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  
  // Optimasi bundle
  webpack: (config, { dev, isServer }) => {
    // Optimasi untuk production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  // Optimasi untuk Vercel
  poweredByHeader: false,
  
  serverExternalPackages: ['mongoose'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
