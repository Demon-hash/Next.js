const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  ...nextConfig,
  i18n,
  images: {
    domains: ["m.media-amazon.com", "www.google.com"]
  }
}
