import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  publicExcludes: ['upload/**'],
  runtimeCaching: [
    {
      urlPattern: /^https?:\/\/[^/]+\/upload\/.+$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'dynamic-uploads',
        cacheableResponse: { statuses: [200] },
      },
    },
  ],
  fallbacks: {
    image: '/images/placeholder.jpg',
  },
});

const withNextIntl = createNextIntlPlugin();

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",

  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://mc.yandex.com https://top-fwz1.mail.ru https://privacy-cs.mail.ru https://www.googletagmanager.com https://vk.com https://ok.ru https://api-maps.yandex.ru https://yastatic.net https://core-renderer-tiles.maps.yandex.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api-maps.yandex.ru https://yastatic.net",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://api.mdcard.ru https://mc.yandex.ru https://mc.yandex.com wss://mc.yandex.ru wss://mc.yandex.com https://top-fwz1.mail.ru https://privacy-cs.mail.ru https://api-maps.yandex.ru https://yastatic.net https://api.exchangerate.host https://www.cbr.ru",
  'frame-src https://api-maps.yandex.ru https://vk.com https://mc.yandex.ru https://mc.yandex.com',

  "worker-src 'self' blob:",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), payment=(self)',
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(withPWA(withNextIntl(nextConfig)));
