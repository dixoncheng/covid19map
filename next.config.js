const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");

module.exports = withOptimizedImages(
  withPWA({
    env: {
      API:
        process.env.DATA === "dev"
          ? "http://localhost:5000"
          : "https://api.covid19map.nz",
      GA: process.env.ENV === "development" ? "UA-93113-29" : "UA-93113-28",
    },
    pwa: {
      dest: "public",
    },
    optimizeImagesInDev: true,

    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          fs: "empty",
        };
      }
      return config;
    },
  })
);
