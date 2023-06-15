/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'flowbite.com',
          port: '',
          pathname: '/docs/images/people/**',
        },
      ],
    },
  }
