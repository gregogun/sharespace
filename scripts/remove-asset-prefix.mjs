import fs from "fs";

async function main() {
  const file = "next.config.js";

    // removes assetPrefix after build to ensure otherwise it breaks HMR - issue here: https://github.com/vercel/next.js/issues/41377
  const CONFIG_ASSET_PREFIX = `
  /** @type {import('next').NextConfig} */
  const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    domains: ["arweave.net"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};
module.exports = nextConfig;
  `

  fs.writeFileSync(file, CONFIG_ASSET_PREFIX, "utf-8", (err) => {
    if (err) {
      console.log(error);
    } else {
      console.log('write successful');
    }
  });
}

main();