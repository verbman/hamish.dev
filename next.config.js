/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  publicRuntimeConfig: {
    title: 'Hamish Fraser',
    description: "I write bugs, sometimes they write back.",
    url: 'https://hamish.dev',
    twitter_username: "@verbman",
    mastodon_username: "@verbman@mastodon.nz",
    authors: {
      Hamish: {
        name: "Hamish",
        display_name: "Hamish Fraser",
        web: "https://hamish.dev/about",
        mastodon: "https://mastodon.nz/@verbman",
        twitter: "https://twitter.com/verbman",
        description: "Designer (degree), programmer (20yrs), researcher (recently), ex startup, ex paid public servant & ex elected councillor.",
        avatar: "/assets/images/profilepic.jpg"
      }
    }
  },
  async rewrites() {
    return [
      {
        source: '/feed.xml',
        destination: '/api/rss',
      },
      {
        source: '/.well-known/webfinger',
        destination: '/api/webfinger',
      }
    ]
  },
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    }
    return config
  }
}

module.exports = nextConfig
