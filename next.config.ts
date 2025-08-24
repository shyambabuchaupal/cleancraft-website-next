import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Simple config for Tailwind CSS v4.0
  // The PostCSS configuration in postcss.config.ts handles Tailwind processing
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Disable React Strict Mode to avoid legacy warnings during development
  reactStrictMode: false,

  // ✅ Configure allowed image domains for Next.js Image component
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inviting-gem-d91a69b7bc.media.strapiapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.cleancraftapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.strapiapp.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
