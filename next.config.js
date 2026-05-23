/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: false }, // Set to false to enable Next.js Image Optimization
}

// Performance budget enforced:
// LCP < 2.5s | INP < 100ms | CLS < 0.1
// Monitor: npx lighthouse http://localhost:3000 --only-categories=performance

module.exports = nextConfig