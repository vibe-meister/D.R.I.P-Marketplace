/** @type {import('next').NextConfig} */
const nextConfig = {
  // For GitHub Pages, we need to use static export but this breaks API routes
  // We'll need to use a different hosting solution for full functionality
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Remove static export for now to maintain API functionality
  // output: 'export', // This breaks API routes
  // trailingSlash: true,
  // assetPrefix: '/D.R.I.P-Marketplace',
  // basePath: '/D.R.I.P-Marketplace',
}

module.exports = nextConfig