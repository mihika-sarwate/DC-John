/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/DC-John',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  trailingSlash: true,
}

export default nextConfig
