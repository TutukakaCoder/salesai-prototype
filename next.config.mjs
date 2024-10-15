/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`,
  },
};

export default nextConfig;