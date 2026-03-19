/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    // Allow production builds to succeed with ESLint warnings present.
    // Linting is run separately via `npm run lint`.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
