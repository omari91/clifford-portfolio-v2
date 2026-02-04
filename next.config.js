/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" }
        ]
      }
    ];
  },
  async rewrites() {
    return [
      // EN pages
      { source: '/about', destination: '/about.html' },
      { source: '/blog', destination: '/blog.html' },
      { source: '/contact', destination: '/contact.html' },
      { source: '/ev', destination: '/ev.html' },
      { source: '/philosophy', destination: '/philosophy.html' },
      { source: '/privacy-policy', destination: '/privacy-policy.html' },
      { source: '/projects', destination: '/projects.html' },

      // DE pages (matches existing file names)
      { source: '/about-de', destination: '/about-de.html' },
      { source: '/blog-de', destination: '/blog-de.html' },
      { source: '/contact-de', destination: '/contact-de.html' },
      { source: '/ev-de', destination: '/ev-de.html' },
      { source: '/philosophy-de', destination: '/philosophy-de.html' },
      { source: '/privacy-policy-de', destination: '/privacy-policy-de.html' },
      { source: '/projects-de', destination: '/projects-de.html' },

      // Home pages
      { source: '/index-de', destination: '/index-de.html' },
      { source: '/de', destination: '/index-de.html' }

      // Optional: make the old static homepage the root
      // { source: '/', destination: '/index.html' }
    ];
  }
};

module.exports = nextConfig;
