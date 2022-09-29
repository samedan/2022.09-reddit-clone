/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "source.unsplash.com",
      "redditcloneed797960feff4da6bb9ac42f4311e5a6112436-dev.s3.eu-west-2.amazonaws.com",
      "redditcloneed797960feff4da6bb9ac42f4311e5a6112436-dev.s3.redditcloneed797960feff4da6bb9ac42f4311e5a6112436-dev.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
