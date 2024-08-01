/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.pexels.com", "di-hack.vercel.app", "upload.wikimedia.org", "arweave.net"], // Add the "images" configuration here
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.cdc$/,
      use: "raw-loader", // Change "loader" to "use" and remove the brackets
    });

    return config;
  },
};

module.exports = nextConfig;
