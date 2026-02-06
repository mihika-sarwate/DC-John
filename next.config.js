/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath: '/DC-John',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
