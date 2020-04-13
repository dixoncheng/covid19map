const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");

module.exports = withOptimizedImages(
  withPWA({
    env: {
      API:
        process.env.ENV === "development"
          ? "http://localhost:5000"
          : "https://api.covid19map.nz",
    },
    pwa: {
      dest: "public",
    },
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
