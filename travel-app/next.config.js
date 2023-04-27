/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
module.exports = withPlugins([], {});
module.exports = withImages();
module.exports = nextConfig
