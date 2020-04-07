const withOptimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");
// const defaultCache = require("next-pwa/cache");
// defaultCache.splice(4, 1);

module.exports = withOptimizedImages(
  withPWA({
    pwa: {
      dest: "public",
      disable: process.env.ENV === "development",
      runtimeCaching: [],
    },
  })
);
