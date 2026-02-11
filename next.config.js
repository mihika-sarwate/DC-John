/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath: process.env.NODE_ENV === 'production' ? '/DC-John' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
