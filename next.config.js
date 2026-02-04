/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  output: 'export',
  distDir: 'docs',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/DC-John' : '',
  assetPrefix: isProd ? '/DC-John/' : '',
  trailingSlash: true,
}

export default nextConfig
