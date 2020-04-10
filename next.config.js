const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");
// const defaultCache = require("next-pwa/cache");
// defaultCache.splice(4, 1);

module.exports = withOptimizedImages(
  withPWA({
    pwa: {
      dest: "public",
      disable: true, //process.env.ENV === "development",
      runtimeCaching: [],
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
