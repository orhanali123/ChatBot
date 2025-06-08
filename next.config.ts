import { strict } from "assert"
import { ESLint } from "eslint"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['localhost'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
}

module.exports = nextConfig