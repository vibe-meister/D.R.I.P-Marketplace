/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/D.R.I.P-Marketplace' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/D.R.I.P-Marketplace' : '',
}

module.exports = nextConfig
